# Next.js sofa store

*Automatically synced with your [v0.dev](https://v0.dev) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/nuttapongs-projects-6ab11a57/v0-next-js-sofa-store)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.dev-black?style=for-the-badge)](https://v0.dev/chat/projects/C3QiCxGkPjB)

## Overview

This repository will stay in sync with your deployed chats on [v0.dev](https://v0.dev).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.dev](https://v0.dev).

## Deployment

Your project is live at:

**[https://vercel.com/nuttapongs-projects-6ab11a57/v0-next-js-sofa-store](https://vercel.com/nuttapongs-projects-6ab11a57/v0-next-js-sofa-store)**

## Build your app

Continue building your app on:

**[https://v0.dev/chat/projects/C3QiCxGkPjB](https://v0.dev/chat/projects/C3QiCxGkPjB)**

## How It Works

1. Create and modify your project using [v0.dev](https://v0.dev)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Environment Variables

Real data is fetched from Supabase when the following variables are provided:

- `NEXT_PUBLIC_SUPABASE_URL` – your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – the project's anon key
- `NEXT_PUBLIC_CHATWOOT_URL` – URL of your Chatwoot instance (defaults to `http://localhost:3000`)
- `CHATWOOT_PORT` – port to expose the Chatwoot Rails server (defaults to `3000`)

If these variables are absent, the app falls back to built-in mock data.

## Chatwoot

The store now uses [Chatwoot](https://www.chatwoot.com/) for the customer chat
system. The source for Chatwoot is included under the `chatwoot/` directory.
To run Chatwoot locally:

```bash
cd chatwoot
cp .env.example .env
# Optionally change CHATWOOT_PORT in `.env` if 3000 is in use
docker-compose build
docker-compose up -d
```

Chatwoot will be available at `http://localhost:${CHATWOOT_PORT}` (3000 by default). The admin dashboard
includes a button to open Chatwoot in a new browser tab.

## Testing

Run unit tests with:

```bash
pnpm test
```

For watch mode during development:

```bash
pnpm test:watch
```

## License

This project is licensed under the [MIT License](LICENSE).
