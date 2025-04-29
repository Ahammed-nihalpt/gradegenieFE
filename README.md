# GradeGenie Frontend

This is the frontend for **GradeGenie**, a fullstack AI-powered assistant for educators. It connects to the backend API for authentication, file uploads, and content generation powered by Gemini 2.0.

---

## 🌐 Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Axios (API integration)
- NextAuth.js (authentication)
- Radix UI (component library)
- Recharts (data visualizations)
- React-PDF (PDF viewing)

---

## ✅ Features

- 🔐 Secure login via NextAuth (JWT strategy)
- 🧠 AI content generation via Gemini
- 📤 File upload using FormData to backend
- ☁️ Cloudinary integration for document hosting
- 💾 Session memory view via Zustand and API calls
- 📊 Analytics and charts with Recharts
- 📚 PDF file viewing with React-PDF

---

## 🎨 UI Customizations

- Based on [v0.dev base UI](https://v0.dev/chat/m32-ai-fast-track-test-Ofv775QacWF)
- Extended with:
  - Assignment creation panel
  - File upload & preview section
  - Session history management
  - Dynamic content generation dashboard
- Designed with responsive layouts using Radix components

---

## 📁 Folder Structure

```
app/
├── actions/ # Client-side utility actions
├── admin/ # Admin-specific dashboard routes
├── api/ # Optional API routes (if used by Next.js)
├── auth/ # Authentication logic
├── checkout/ # Payment/Stripe integration
├── dashboard/ # User dashboards
├── forgot-password/ # Forgot password flow
├── login/ # Login page
├── pricing/ # Pricing plans UI
├── reset-password/ # Password reset UI
├── signup/ # Signup page
├── student-portal/ # Student-facing dashboard
├── upgrade/ # Upgrade plans or tier changes
├── utils/ # Global utilities and config
├── globals.css # Tailwind/global styling
├── layout.tsx # Layout wrapper
├── page.tsx # Entry point (e.g. landing page)
│
└── providers.tsx # App-wide providers (Auth, Theme, etc.)

components/ # Reusable UI components
hooks/ # Custom React hooks (e.g. Zustand stores)
lib/ # Backend integration helpers
middleware/ # Middleware (e.g. auth protection)
public/ # Static assets
styles/ # Additional CSS or Tailwind configs
types/ # TypeScript types
utils/ # Additional shared utilities
```

---

## 🔑 Environment Variables

Create a `.env.local` file with:

```env
# API base URL (used by Axios or fetch)
NEXT_PUBLIC_API_URL=<Backend_API_URL>

# JWT secret used by NextAuth for session encryption
NEXTAUTH_SECRET=<your_super_secret>
```

## 🚀 Getting Started

### 1. Install dependencies

```bash
yarn install
```

### 2. Start in development

```bash
yarn dev
```

### 2. Build and run production

```bash
yarn build
yarn start
```

## 🌍 Deployment

Hosting:
CI/CD: Integrated with GitHub for auto-deployment

## ⚠️ Notes

Some features mentioned in the original project brief were intentionally not implemented due to limited available time caused by ongoing commitments at my current job. These include:

- LMS integrations (e.g., Moodle, Google Classroom)
- Agentic workflows using frameworks like LangChain or CrewAI
- Full API documentation (e.g., Swagger/Postman)
- End-to-end testing coverage

I prioritized building the core functionality — authentication, AI content generation, session persistence, and file handling — to demonstrate fullstack engineering and product thinking within the available development window.

Further enhancements may be considered after submission.

## 🌐 Deployed Links

- **Frontend:** [https://gradegenie-delta.vercel.app/](https://gradegenie-delta.vercel.app/)
- **Backend:** [https://gradegeniebe.onrender.com](https://gradegeniebe.onrender.com)
