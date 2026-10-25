import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  Maximize2,
  Minimize2,
  Briefcase,
  Rocket
} from "lucide-react";
import { CHAT_MODES } from "../data/aiKnowledge";

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeMode, setActiveMode] = useState("recruiter"); // 'recruiter' | 'client'
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: CHAT_MODES.recruiter.greeting,
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isThinking, isStreaming]);

  // Keyboard shortcut (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Switch between Recruiter and Client modes
  const handleModeChange = (newMode) => {
    if (newMode === activeMode || isStreaming || isThinking) return;
    setActiveMode(newMode);
    setMessages([
      {
        role: "assistant",
        content: CHAT_MODES[newMode].greeting,
      },
    ]);
  };

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isStreaming || isThinking) return;

    setInput("");
    const newMessages = [...messages, { role: "user", content: query }];
    setMessages(newMessages);

    // Natural slight thinking delay before responding
    setIsThinking(true);
    await new Promise((resolve) => setTimeout(resolve, 850));
    setIsThinking(false);

    setIsStreaming(true);
    const assistantMessageIndex = newMessages.length;
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    try {
      // 1. Try Vercel Serverless Function first
      let response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          mode: activeMode,
          stream: true,
        }),
      }).catch(() => null);

      // 2. Direct client fallback for local dev if /api/chat not routed
      if (!response || !response.ok) {
        const groqApiKey = process.env.REACT_APP_GROQ_API_KEY;
        const model = process.env.REACT_APP_GROQ_MODEL || "qwen/qwen3.8-27b";

        response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${groqApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: "system", content: CHAT_MODES[activeMode].systemPrompt },
              ...newMessages.slice(-6).map((m) => ({ role: m.role, content: m.content })),
            ],
            stream: true,
            temperature: 0.6,
            max_tokens: 650,
          }),
        });
      }

      if (!response.ok) {
        throw new Error("Unable to reach AI service. Please try again.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ") && !line.includes("[DONE]")) {
            try {
              const parsed = JSON.parse(line.slice(6));
              const delta = parsed.choices?.[0]?.delta?.content || "";
              if (delta) {
                fullContent += delta;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[assistantMessageIndex] = {
                    role: "assistant",
                    content: fullContent,
                  };
                  return updated;
                });
              }
            } catch (err) {
              // Ignore partial JSON parsing errors during stream
            }
          }
        }
      }

      if (!fullContent) {
        setMessages((prev) => {
          const updated = [...prev];
          updated[assistantMessageIndex] = {
            role: "assistant",
            content: "I didn't receive an answer. Please try asking again.",
          };
          return updated;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[assistantMessageIndex] = {
          role: "assistant",
          content: error.message || "Unable to reach the assistant. Please try again.",
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: CHAT_MODES[activeMode].greeting,
      },
    ]);
  };

  const renderMessageContent = (rawContent) => {
    if (!rawContent) return null;

    // Normalize inline asterisks that should be line items
    let cleaned = rawContent
      .replace(/([^\n])\s*\*\s+([A-Z])/g, "$1\n* $2")
      .replace(/([^\n])\s*-\s+([A-Z])/g, "$1\n- $2");

    // Split into structural blocks
    const lines = cleaned.split("\n").map((l) => l.trim()).filter(Boolean);
    const blocks = [];
    let currentList = null;

    for (const line of lines) {
      if (line.startsWith("* ") || line.startsWith("- ")) {
        const itemText = line.replace(/^[*-\s]+/, "").trim();
        if (!currentList) {
          currentList = [];
          blocks.push({ type: "list", items: currentList });
        }
        currentList.push(itemText);
      } else {
        currentList = null;
        blocks.push({ type: "paragraph", text: line });
      }
    }

    return (
      <div className="space-y-2 text-[13.5px] leading-relaxed text-[#D4D9E2] font-sans">
        {blocks.map((block, idx) => {
          if (block.type === "list") {
            return (
              <ul key={idx} className="space-y-1.5 my-1.5 pl-3 border-l border-[#2B313B]">
                {block.items.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="text-[#CFD5E0]"
                    dangerouslySetInnerHTML={{ __html: formatInline(item) }}
                  />
                ))}
              </ul>
            );
          }
          return (
            <p
              key={idx}
              className="last:mb-0"
              dangerouslySetInnerHTML={{ __html: formatInline(block.text) }}
            />
          );
        })}
      </div>
    );
  };

  const formatInline = (text) => {
    return text
      // Bold **text**
      .replace(/\*\*(.*?)\*\*/g, "<strong class='text-white font-semibold'>$1</strong>")
      // Inline code
      .replace(
        /`([^`]+)`/g,
        "<code class='bg-[#222731] text-[#93A2FF] px-1 py-0.5 rounded text-xs font-mono'>$1</code>"
      )
      // Remove any lingering single asterisks
      .replace(/(^|[^\*])\*([^\*]|$)/g, "$1$2");
  };

  const isRecruiter = activeMode === "recruiter";

  return (
    <>
      {/* Floating Launcher Trigger */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="group relative flex items-center cursor-pointer"
            >
              {/* Vibrant ambient glow ring */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#7C8CFF] via-[#9B7CFF] to-[#38BDF8] opacity-80 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse" />

              {/* Surface Container */}
              <div className="relative flex items-center gap-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#171B28] via-[#1D2235] to-[#151926] border-2 border-[#7C8CFF] shadow-[0_0_25px_rgba(124,140,255,0.45)] backdrop-blur-xl transition-all duration-300 group-hover:border-[#A5B4FC]">
                {/* Glowing Icon Badge */}
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-[#7C8CFF] to-[#5969F6] text-white shadow-md shadow-[#7C8CFF]/50">
                  <Sparkles className="w-4 h-4" />
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#56F0A0] opacity-85"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#56F0A0]"></span>
                  </span>
                </div>

                <div className="text-left pr-1">
                  <div className="text-xs font-semibold tracking-wider text-white">
                    Ask Aashay AI
                  </div>
                  <div className="text-[10px] text-[#AAB7CE] font-medium">
                    Recruiter & Client Modes
                  </div>
                </div>

                <div className="hidden sm:flex items-center px-1.5 py-0.5 rounded-md bg-[#252D42] text-[10px] font-mono font-medium text-[#C5D0E6] border border-[#3B4668]">
                  Ctrl K
                </div>
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className={`fixed bottom-6 right-6 z-50 flex flex-col bg-[#12151B]/95 border border-[#262B33] rounded-2xl shadow-2xl backdrop-blur-2xl overflow-hidden transition-all duration-300 ${
              isExpanded
                ? "w-[94vw] sm:w-[620px] h-[84vh] max-w-[700px]"
                : "w-[94vw] sm:w-[440px] h-[600px] max-w-[480px]"
            }`}
          >
            {/* Header */}
            <div className="px-4 py-3 bg-[#161A22] border-b border-[#262B33]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors border ${
                      isRecruiter
                        ? "bg-[#7C8CFF]/15 border-[#7C8CFF]/30 text-[#7C8CFF]"
                        : "bg-[#56F0A0]/15 border-[#56F0A0]/30 text-[#56F0A0]"
                    }`}
                  >
                    {isRecruiter ? <Briefcase className="w-4 h-4" /> : <Rocket className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-[#F2F4F7]">Aashay AI</span>
                      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#56F0A0]/10 text-[#56F0A0] border border-[#56F0A0]/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#56F0A0]"></span>
                        Online
                      </span>
                    </div>
                    <p className="text-[10px] text-[#7E8694]">
                      {isRecruiter ? "Technical Architecture & Hiring" : "Business ROI & Project Solutions"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleClearChat}
                    title="Reset Conversation"
                    className="p-1.5 rounded-lg text-[#7E8694] hover:text-[#F2F4F7] hover:bg-[#1F242D] transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    title={isExpanded ? "Collapse" : "Expand"}
                    className="hidden sm:inline-flex p-1.5 rounded-lg text-[#7E8694] hover:text-[#F2F4F7] hover:bg-[#1F242D] transition-colors"
                  >
                    {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close Assistant"
                    className="p-1.5 rounded-lg text-[#7E8694] hover:text-[#F2F4F7] hover:bg-[#1F242D] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mode Switcher Pills */}
              <div className="mt-2.5 p-1 bg-[#0F1116] rounded-xl border border-[#232832] flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleModeChange("recruiter")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                    isRecruiter
                      ? "bg-[#7C8CFF] text-white shadow-sm"
                      : "text-[#8E96A4] hover:text-[#F2F4F7] hover:bg-[#171B22]"
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Recruiter Mode</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleModeChange("client")}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                    !isRecruiter
                      ? "bg-[#1E8A5A] text-white shadow-sm"
                      : "text-[#8E96A4] hover:text-[#F2F4F7] hover:bg-[#171B22]"
                  }`}
                >
                  <Rocket className="w-3.5 h-3.5" />
                  <span>Freelance & Client</span>
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#262B33]">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-md bg-[#1C2029] border border-[#2B313D] flex items-center justify-center flex-shrink-0 text-[#7C8CFF] mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`rounded-xl px-3.5 py-2.5 max-w-[85%] ${
                      msg.role === "user"
                        ? isRecruiter
                          ? "bg-[#7C8CFF] text-white font-medium"
                          : "bg-[#1E8A5A] text-white font-medium"
                        : "bg-[#181C24] border border-[#262B33] shadow-md"
                    }`}
                  >
                    {msg.role === "user" ? (
                      <div className="text-sm">{msg.content}</div>
                    ) : (
                      renderMessageContent(msg.content)
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="w-6 h-6 rounded-md bg-[#2B313D] border border-[#3A4252] flex items-center justify-center flex-shrink-0 text-[#A1A7B3] mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Natural Thinking Indicator */}
              {isThinking && (
                <div className="flex items-center gap-2.5 text-xs text-[#9DA4B0] pl-9 py-1">
                  <span className="flex space-x-1">
                    <span className="w-1.5 h-1.5 bg-[#7C8CFF] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#7C8CFF] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-[#7C8CFF] rounded-full animate-bounce"></span>
                  </span>
                  <span className="font-mono text-[11px]">
                    {isRecruiter ? "Analyzing technical background..." : "Formulating solution & ROI scoping..."}
                  </span>
                </div>
              )}

              {/* Streaming Indicator */}
              {isStreaming && (
                <div className="flex items-center gap-2 text-xs font-mono text-[#7C8CFF] pl-9">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C8CFF] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C8CFF]"></span>
                  </span>
                  Streaming response...
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            {messages.length <= 2 && !isThinking && (
              <div className="px-4 py-2 border-t border-[#1F242D] bg-[#14171E]/60">
                <div className="text-[10px] font-mono text-[#69717D] uppercase tracking-wider mb-1.5">
                  Suggested Questions
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {CHAT_MODES[activeMode].suggestions.map((question, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(question)}
                      className="text-left text-xs text-[#A1A7B3] hover:text-[#F2F4F7] bg-[#1A1E26] hover:bg-[#222731] border border-[#262B33] hover:border-[#7C8CFF]/40 rounded-lg px-2.5 py-1 transition-all"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3 bg-[#161A22] border-t border-[#262B33]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    isRecruiter
                      ? "Ask about technical stack, LangGraph, roles..."
                      : "Ask about project scoping, pricing, ROI, turnaround..."
                  }
                  disabled={isStreaming || isThinking}
                  className="flex-1 bg-[#0F1116] border border-[#262B33] focus:border-[#7C8CFF] focus:outline-none rounded-xl px-3.5 py-2.5 text-sm text-[#F2F4F7] placeholder-[#5A6270] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming || isThinking}
                  className={`p-2.5 rounded-xl text-white transition-all flex items-center justify-center flex-shrink-0 disabled:opacity-40 ${
                    isRecruiter ? "bg-[#7C8CFF] hover:bg-[#6879F7]" : "bg-[#1E8A5A] hover:bg-[#1b7a50]"
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <div className="text-[10px] text-center text-[#5A6270] mt-2 font-mono">
                {isRecruiter
                  ? "Evaluating Aashay Soni • Press Enter to send"
                  : "Discussing Freelance & Projects • Press Enter to send"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
