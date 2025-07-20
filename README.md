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

Copy `.env.example` to `.env` and provide real values for these variables.

Real data is fetched from Supabase when the following variables are provided:

- `NEXT_PUBLIC_SUPABASE_URL` – your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` – the project's anon key
- `NEXT_PUBLIC_CHATWOOT_URL` – URL of your Chatwoot instance (defaults to `http://localhost:3000`)

If these variables are absent, the app falls back to built-in mock data.

The notification service uses additional variables:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` – SMTP settings for email
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER` – Twilio SMS credentials
- `LINE_NOTIFY_TOKEN` – token for sending Line notifications

## Chatwoot

The store now uses [Chatwoot](https://www.chatwoot.com/) for the customer chat
system. The source for Chatwoot is included under the `chatwoot/` directory.
To run Chatwoot locally:

```bash
cd chatwoot
cp .env.example .env
docker-compose build
docker-compose up -d
```

Chatwoot will be available at `http://localhost:3000`. The admin dashboard
includes a button to open Chatwoot in a new browser tab.

## Testing

Before running tests, make sure dependencies are installed:

```bash
pnpm install
```

Then run unit tests with:

```bash
pnpm test
```

For watch mode during development:

```bash
pnpm test:watch
```

## License

This project is licensed under the [MIT License](LICENSE).

---

## 🧱 Block-Based Dev Flow Guideline (SYSTEM_NOTES.md)

This project uses block-based feature development.

Each feature must be tracked in `SYSTEM_NOTES.md` using the Dev Block format:

### Block XXX–XXX | [Feature Name] | route: /your/feature/path

1. Clear task description  
2. ...  
3. ...  
4. ...  
5. ...

Status: planned | in progress | done

### 🔒 Required Before PR

Before submitting any PR:

✅ Update `SYSTEM_NOTES.md` with the Block(s) you worked on  
✅ Follow the format exactly  
✅ Commit the file with your code

Failure to do so may result in PR rejection or rework request.

---

Status: planned
