<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=JetBrains+Mono&size=13&duration=3000&pause=1000&color=00BCD4&center=true&vCenter=true&width=600&lines=%24+./fatima-noor-portfolio+--start;+Initializing+starfield...+%E2%9C%93;+Loading+AI+chatbot...+%E2%9C%93;+Deploying+to+production...+%E2%9C%93;+Portfolio+is+live.+%F0%9F%9A%80" alt="Typing SVG" />

```
  ███████╗ █████╗ ████████╗██╗███╗   ███╗ █████╗     ███╗   ██╗ ██████╗  ██████╗ ██████╗ 
  ██╔════╝██╔══██╗╚══██╔══╝██║████╗ ████║██╔══██╗    ████╗  ██║██╔═══██╗██╔═══██╗██╔══██╗
  █████╗  ███████║   ██║   ██║██╔████╔██║███████║    ██╔██╗ ██║██║   ██║██║   ██║██████╔╝
  ██╔══╝  ██╔══██║   ██║   ██║██║╚██╔╝██║██╔══██║    ██║╚██╗██║██║   ██║██║   ██║██╔══██╗
  ██║     ██║  ██║   ██║   ██║██║ ╚═╝ ██║██║  ██║    ██║ ╚████║╚██████╔╝╚██████╔╝██║  ██║
  ╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝    ╚═╝  ╚═══╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝
```

*Bold Software Engineer · AI/ML Specialist · Caffeine-Fueled Builder*

<br/>

[![Live](https://img.shields.io/badge/▶_Live_Portfolio-00BCD4?style=for-the-badge&logoColor=0e0c18)](https://www.fatimanoor.me/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0e0c18?style=for-the-badge&logo=linkedin&logoColor=00BCD4)](https://www.linkedin.com/in/fatimanooor/)
[![GitHub](https://img.shields.io/badge/GitHub-0e0c18?style=for-the-badge&logo=github&logoColor=00BCD4)](https://github.com/fatiima-noor/)
[![Email](https://img.shields.io/badge/Email-0e0c18?style=for-the-badge&logo=gmail&logoColor=00BCD4)](mailto:fatimanoor.se22@gmail.com)

</div>

<br/>

---

## `$ cat overview.md`

An AI-powered personal portfolio — built from scratch with vanilla HTML, CSS, and JavaScript. It ships a live chatbot, a scrolling dev timeline, animated project cards, and a starfield canvas that runs at all times because why not. Every section is responsive, every interaction is intentional, and the whole thing runs on Vercel.

---

## `$ ls features/`

<table>
<tr>
<td width="50%" valign="top">

**🤖 &nbsp;AI Chatbot**

Groq's LLaMA 3.1 handles everything. Multi-turn conversation, a handcrafted system prompt with Fatima's full context, IP-based rate limiting, and a typing indicator that actually looks good. Ask it anything.

</td>
<td width="50%" valign="top">

**🌠 &nbsp;Hero Section**

Animated starfield on canvas, floating planets, smooth entrance animations, and a stats counter that only triggers when you scroll to it. The scroll-down arrow judges you silently.

</td>
</tr>
<tr>
<td width="50%" valign="top">

**📜 &nbsp;Dev Timeline**

A terminal that types real bash commands on loop. Life milestones rendered as commit messages. GSAP ScrollTrigger handles the reveals. Humor included at no extra cost.

</td>
<td width="50%" valign="top">

**🚀 &nbsp;Projects & Stack**

Six project cards with hover-reveal overlays. Tech stack tags that stagger-animate into view on scroll. A debug log section full of quotes that are uncomfortably relatable.

</td>
</tr>
</table>

---

## `$ cat stack.txt`

```
 ┌──────────────────────────────────────────────────────────┐
 │  Frontend          │  HTML5 · CSS3 · Vanilla JavaScript  │
 │  Styling           │  Tailwind CSS · Font Awesome 6      │
 │  Animations        │  GSAP · ScrollTrigger · Canvas API  │
 │  AI / Chatbot      │  Groq SDK · LLaMA 3.1-8b-instant    │
 │  Backend           │  Node.js · TypeScript               │
 │  Deployment        │  Vercel (frontend + serverless API) │
 └──────────────────────────────────────────────────────────┘
```

---

## `$ tree Portfolio-Website/`

```
Portfolio-Website/
├── .gitignore
├── README.md
│
├── backend/
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── api/
│       ├── chat.ts           ← Groq LLM endpoint
│       ├── contact.ts        ← Email handler
│       └── vercel.json
│
└── frontend/
    ├── index.html            ← Main portfolio page
    ├── contactme.html        ← Contact form
    ├── js/
    │   └── scripts.js        ← All interactivity + chatbot logic
    ├── images/
    └── css/
        ├── style.css
        ├── heroSection.css
        ├── navbar.css
        ├── background.css
        ├── chatbot.css
        ├── timeline.css
        ├── projects.css
        ├── about.css
        ├── stack.css
        ├── testimonial.css
        ├── counter.css
        ├── footer.css
        ├── animation.css
        ├── scrollbar.css
        ├── achievements.css
        └── contactme.css
```

---

## `$ ./setup.sh`

**Prerequisites**

```bash
node >= 18.x
A Groq API key  →  https://console.groq.com
```

**Clone & run**

```bash
git clone https://github.com/fatiima-noor/Portfolio-Website.git
cd Portfolio-Website

# Backend
cd backend
npm install
cp .env.example .env
# Fill in your keys

# Run locally
npm i -g vercel
vercel dev
```

> The frontend is plain HTML — open `frontend/index.html` directly for a static preview. The chatbot and contact form need the Vercel dev server running.

---

## `$ cat .env.example`

```env
GROQ_API_KEY=your_groq_key_here
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

## `$ vercel --prod`

Push to GitHub. Connect to Vercel. Add env variables under **Settings → Environment Variables**. Done. The API routes in `backend/api/` are picked up automatically via `vercel.json`.

---

## `$ cat chatbot-flow.txt`

```
  User message
      │
      ▼
  handleUserMessage()        ←  scripts.js
      │
      ▼
  POST /api/chat  { messages: [...history] }
      │
      ▼
  chat.ts
  ├── Rate limit check  (20 req / 15 min per IP)
  ├── Input validation
  └── Groq SDK  →  llama-3.1-8b-instant
                        │
                        ▼
               System prompt with
               Fatima's full context
                        │
                        ▼
               reply  →  showBotMessage()
```

---

## `$ cat breakpoints.txt`

```
  ≤ 640px      Mobile      Single column · hamburger nav · simplified layout
  768–1024px   Tablet      Adjusted margins · tablet about section
  1180–1450px  Laptop      Full spacing · tweaked component sizing
  > 1450px     Desktop     Everything visible · full layout
```

---

## `$ grep -r "details" ./ --interesting-only`

- The terminal in the timeline types actual bash commands on loop and never gets tired
- Four planets float independently in the hero with their own animation timings
- The stats counter only animates when scrolled into view — not a millisecond before
- Every tech stack tag stagger-fades in when the section enters the viewport
- The chatbot typing indicator is an animated three-dot bounce. Plain `...` was not an option

---

<div align="center">

<br/>

```
╔══════════════════════════════════════════════════════════╗
║   Built by Fatima Noor  ·  Lahore, Pakistan  ·  2026     ║
║   "If it runs without breaking everything, I'm pushing." ║
╚══════════════════════════════════════════════════════════╝
```

[![Stars](https://img.shields.io/github/stars/fatiima-noor/Portfolio-Website?style=social)](https://github.com/fatiima-noor/Portfolio-Website)

</div>
