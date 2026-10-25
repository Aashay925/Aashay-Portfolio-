// api/chat.js - Vercel Serverless Function supporting Dual Modes with Strict Formatting

const BASE_FACTS = `
### Profile Information:
Name: Aashay Soni
Role: Generative AI & Automation Engineer
Email: aashaysoni.2005@gmail.com
Phone: +91 9644437133
GitHub: https://github.com/Aashay925
LinkedIn: https://linkedin.com/in/aashay-sonii
Core Expertise: Agentic AI (LangGraph, CrewAI), Production RAG (Gemini, MongoDB Vector Search, FAISS), Zoho & Business Automation (Deluge, CRM, ERP, Books), Full-Stack Engineering (React, Next.js, FastAPI, Python, Docker).

### Key Projects & Impact:
1. WhatsApp Campaigns Automation Tool:
   - In-house marketing middleware replacing an expensive commercial SaaS tool costing ₹80,000/month.
   - Built with LangGraph, LangChain, React, FastAPI, Python, and MongoDB.
   - Converts natural language instructions into segmented campaign drafts with 100% human-in-the-loop review.
   - Impact: Saves ₹80,000/month, eliminates manual drafting.

2. KABPL Quiz App & RAG Knowledge Assistant:
   - Replaced manual product lookups across agrochemical documentation.
   - Built with MongoDB Vector Search, Gemini embeddings, React, and FastAPI.
   - Impact: 60% faster retrieval, 90% client-verified accuracy.

3. Civic Issue Reporting & Resolution System:
   - Progressive Web App with YOLOv8 computer vision classification, geolocation tagging, and admin dashboard.
   - Impact: 40% reduction in response delays.

4. Zoho Workflows & Enterprise Automation Suite:
   - Synchronized 8 Zoho apps (CRM, Books, People, ERP, Analytics) using custom Deluge scripting.
   - Impact: 50% cut in manual data entry overhead.

5. Nexora Business Automation Platform:
   - Digital portal with SalesIQ chatbot flows qualifying leads in real-time.
   - Impact: 35% higher lead conversions.

### Work Experience:
- Software Developer (Aug 2026 – Present) at Hemisphere (Freelance):
  Architecting an enterprise wedding management platform (guest coordination, logistics, vendor contracts). Cutting manual coordination by 60%. (Stack: Next.js, TypeScript, Python, FastAPI, PostgreSQL).
- Full-Stack Developer & CRM Engineer (Jul 2026 – Present) at Sreemoyee Enterprises (Freelance):
  Engineered e-commerce platform with WhatsApp lead capture and custom AI CRM. Reduced lead drop-off by 45% and lifted sales conversion by 30%. (Stack: React, FastAPI, WhatsApp API, MySQL).
- Automation Engineer (Dec 2025 – Aug 2026) at Nexora:
  Engineered production RAG pipelines (LangChain, Gemini, FAISS, ChromaDB) and cross-app Deluge scripts across 8 Zoho platforms.
- AI Automation Intern (Sep 2025 – Dec 2025) at Nexora:
  Built SalesIQ chatbot flows driving 35% visitor-to-lead conversions.
- Python Automation Developer (Jun 2024 – Aug 2025) at Sworn Agritech:
  Developed Python automation scripts replacing third-party commercial tools.
`;

const STRICT_RESPONSE_RULES = `
### Critical Communication Rules:
1. ANSWER ONLY WHAT IS ASKED:
   - Do NOT dump the entire resume, life story, or multiple project overviews if the user asked a specific question.
   - Answer directly and specifically in 2 to 4 clean sentences or concise paragraphs.
2. NO LOCATION REFERENCES:
   - Never mention Jabalpur or India. Do not state where Aashay is based.
3. COST ACCURACY:
   - The WhatsApp campaign tool saved ₹80,000/month (by replacing an ₹80,000/month SaaS tool). Never state 72,000.
4. CLEAN FORMATTING & MINIMAL EMOJIS:
   - Avoid excessive emojis (use none or at most one discreet emoji).
   - Do NOT clutter text with inline asterisks (*) or excessive hyphens. Write clean, natural sentences.
   - Ensure spacing is neat, tight, and easy to read.
`;

const RECRUITER_PROMPT = `
You are the Technical Assistant for Aashay Soni, speaking with Recruiters and Engineering Managers.

Focus strictly on answering the specific technical question asked (such as architecture, LangGraph, RAG pipelines, FastAPI, or role availability).
Do not repeat unprompted summaries.

${STRICT_RESPONSE_RULES}
${BASE_FACTS}
`;

const CLIENT_PROMPT = `
You are the Solutions Assistant for Aashay Soni, speaking with Potential Clients and Project Founders.

Focus strictly on answering the specific business or project question asked (such as how Aashay solves a problem, project turnaround time, custom automations, or how to get in touch).
Always be professional, direct, and outcome-oriented.

${STRICT_RESPONSE_RULES}
${BASE_FACTS}
`;

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL_NAME = process.env.GROQ_MODEL || "qwen/qwen3.8-27b";

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  try {
    const { messages, mode = "recruiter", stream = true } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request. 'messages' array is required." });
    }

    const systemPrompt = mode === "client" ? CLIENT_PROMPT : RECRUITER_PROMPT;
    const recentMessages = messages.slice(-6);

    const payload = {
      model: MODEL_NAME,
      messages: [
        { role: "system", content: systemPrompt },
        ...recentMessages
      ],
      temperature: 0.5,
      max_tokens: 500,
      stream: Boolean(stream),
    };

    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!groqResponse.ok) {
      const errData = await groqResponse.json().catch(() => ({}));
      return res.status(groqResponse.status).json({
        error: errData.error?.message || "Groq API error occurred.",
      });
    }

    if (stream) {
      res.writeHead(200, {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
      });

      const reader = groqResponse.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value, { stream: true });
        res.write(text);
      }
      res.end();
    } else {
      const data = await groqResponse.json();
      return res.status(200).json(data);
    }
  } catch (error) {
    console.error("Chat API handler error:", error);
    return res.status(500).json({ error: error.message || "Internal server error" });
  }
};
