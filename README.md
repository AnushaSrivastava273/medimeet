# MediMeet

Stop guessing which doctor you need. MediMeet uses conversational AI to instantly analyze your symptoms and route you to the exact clinical specialist you need.

## 🚀 Live Demo
Experience the platform in action: [Watch Demo](your-loom-link-here)

## 🧠 The AI Triage Hero
At the core of MediMeet is our intelligent **AI Symptom Triage Chatbot**. Powered by `gemini-1.5-flash`, this advanced multi-turn agent conducts clinical-style patient conversations to analyze symptoms, map them to **16 distinct medical specialties**, and recommend the exact doctor before booking—virtually eliminating misallocated appointments and scheduling friction.

## 🌟 Key Features
* 🤖 **AI Symptom Triage** — Multi-turn Gemini chatbot covering 16 specialties, embedded as a global floating widget
* 🔍 **Doctor Discovery** — Advanced specialty-based filtering and comprehensive profile pages for licensed doctors
* 📅 **Smart Scheduling** — Credit-based appointment booking (2 credits/session) with real-time overlap prevention
* 📹 **HD Video Consultations** — Seamless, in-app virtual appointments powered by the Vonage Video API
* 🩺 **Physician Dashboard** — Specialized portal for doctors to configure availability calendars and track earnings
* 🛡️ **Admin Command Center** — Secure workspace for doctor credential verification and automated payout processing
* 🔑 **Patient Portal** — Centralized dashboard to track past visits, active appointments, and remaining credits

## 💻 Tech Stack
| Component | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 15 App Router | React Server Components & API routes |
| **Styling** | Tailwind CSS + shadcn/ui | Modern, responsive component library |
| **Database** | Prisma + NeonDB (PostgreSQL) | Fully serverless database & modern ORM |
| **Authentication** | Clerk | Secure multi-tenant user authentication |
| **AI Engine** | Gemini API (`gemini-1.5-flash`) | Context-aware, multi-turn clinical triage |
| **Video API** | Vonage Video API | WebRTC-based low-latency video rooms |

## ⚙️ Getting Started

1. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=
   GEMINI_API_KEY=
   VONAGE_API_KEY=
   VONAGE_API_SECRET=
   ```

2. **Install & Launch**
   ```bash
   git clone https://github.com/AnushaSrivastava273/medimeet.git
   npm install && npx prisma db push && npm run dev
   ```

---
Built by [Anusha Srivastava](https://github.com/AnushaSrivastava273) — [LinkedIn](https://linkedin.com/in/anusha-srivastava) | [GitHub](https://github.com/AnushaSrivastava273)
