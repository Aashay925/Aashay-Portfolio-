# Aashay Soni Portfolio — Local Setup

This archive contains the existing frontend source, local assets, components,
configuration, package.json and Yarn lockfiles. Existing application files are
copied without changes. This guide and frontend/.env.example are export-only
additions.

## Requirements

- Node.js 22 LTS
- Yarn Classic 1.22.22 (the version recorded in package.json)
- An internet connection for dependency installation and externally hosted fonts
  and scripts referenced by the existing application

If Yarn is not installed, install Yarn Classic using your preferred Node.js
package-manager setup before running the commands below.

## Run locally

Extract the ZIP, then open a terminal in the extracted folder:

```sh
cd aashay-soni-portfolio/frontend
yarn install --frozen-lockfile
yarn start
```

Open http://localhost:3000 in your browser (or the address printed by the dev
server if that port is already in use).

The portfolio is frontend-only: no backend, database, authentication or API keys
are required. The original hosted .env is deliberately excluded. Optionally
copy frontend/.env.example to frontend/.env before starting to disable optional
preview health checks and the development error overlay. The default React
development-server configuration handles local URLs and its websocket port.

## Production build

From the frontend directory:

```sh
yarn build
```

The generated static files are written to frontend/build/.

## Project map

- frontend/src/: all React components, CSS, utilities and editable content
- frontend/src/data/content.js: portfolio copy, examples, links and email
- frontend/public/: favicon and HTML template
- frontend/plugins/: plugins referenced by the existing CRACO configuration
- frontend/package.json and frontend/yarn.lock: dependencies and scripts
- frontend/craco.config.js, tailwind.config.js, postcss.config.js,
  jsconfig.json, components.json: original configuration
- design_guidelines.json: existing visual design reference
- SHA256SUMS.txt: integrity hashes of the exported files

## Existing behaviour and export exclusions

The contact form opens a mailto link; it does not send email through a server.
Portfolio data, social links and agent simulations remain the existing
placeholders/MOCKED demonstrations. Google Fonts and the external scripts in
public/index.html remain externally referenced, exactly as in the source.

Installed dependencies (node_modules), generated builds/caches, logs, Git
history, private environment files and platform-only internal files are not
included. Yarn installs dependencies using the included manifest and lockfile.
No backend service is needed or included.
