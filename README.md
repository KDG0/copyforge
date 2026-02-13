# CopyForge ✨

AI-powered content generator built with Claude API. Generate professional emails, LinkedIn posts, product descriptions, and more — in seconds.

**[Try it live →](https://copyforge-one.vercel.app)**

## What it does

Select a content type, describe what you need, choose a tone, and CopyForge generates ready-to-use professional content. Supports English and Spanish automatically.

## Built with

- **Next.js** (App Router)
- **Claude API** (Haiku 4.5) — Anthropic's fast, cost-efficient model
- **React** — Frontend UI
- **Vercel** — Deployment

## How it works

1. User selects content type (email, LinkedIn post, product description, etc.)
2. Frontend sends request to a Next.js API route
3. API route calls Claude with a crafted system prompt
4. Claude generates the content and returns it to the user
5. User copies the result — done

## Run locally
```bash
git clone https://github.com/KDG0/copyforge.git
cd copyforge
npm install
```

Create a `.env.local` file:
```
ANTHROPIC_API_KEY=your-api-key-here
```
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Key

Get your API key at [console.anthropic.com](https://console.anthropic.com). This project uses Claude Haiku 4.5, Anthropic's most cost-efficient model.

## License

MIT