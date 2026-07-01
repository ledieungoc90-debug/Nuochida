# Nuochida

Nuochida is a B2B custom hat manufacturer website built with Next.js for Vercel deployment and prepared for a Directus CMS backend.

## Stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Directus-ready inquiry API integration
- Vercel frontend deployment

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Checks

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

## Environment

Copy `.env.example` and configure the Directus values before production deployment:

```bash
cp .env.example .env.local
```

Required production variables:

- `DIRECTUS_URL`
- `DIRECTUS_TOKEN`
- `DIRECTUS_INQUIRIES_COLLECTION`

