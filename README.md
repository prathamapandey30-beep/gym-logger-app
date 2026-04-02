# 💪 Gym Logger App

A minimal, high-performance, and mobile-first gym workout logger built for the **AI in Practice** course. 

Designed for efficiency at the gym, this app allows you to log sets in under 5 seconds with a premium dark-mode interface.

## 🚀 Live Demo
[Live Vercel Deployment](https://gym-logger-app-bedw.vercel.app/) | [GitHub Repository](https://github.com/prathamapandey30-beep/gym-logger-app)

---

## ✨ Features

### Premium Tracking Experience
- **🚀 Ultra-Fast Entry**: Minimal taps to log exercise, reps, and weight.
- **🔄 Auto Set Counter**: Detects and displays the current set number for your movement in real-time.
- **📝 Per-Set Notes**: Add technique cues or feelings for each individual set.
- **↩️ Quick-Add Last Set**: One-tap duplication of your previous set (movement/reps/weight).
- **⚖️ Unit Toggle**: Switch seamlessly between **kg** and **lbs** (auto-calculates for storage).

### Tooling & Design
- **⏱️ Floating Rest Timer**: Adjustable, interactive countdown to keep your recovery periods consistent.
- **🔍 Movement Autocomplete**: Learns from your history to suggest exercise names as you type.
- **📱 PWA Support**: Mobile-friendly glassmorphism UI that feels like a native app on your home screen.
- **📊 History Browser**: Grouped sessions by date to track your long-term progress.

## 🛠️ Tech Stack
- **Framework**: Next.js 15 (App Router / Turbopack)
- **Styling**: Tailwind CSS v4
- **Database**: Firebase Firestore
- **State**: React Hooks (useState/useCallback/useEffect)
- **Deployment**: Vercel

---

## 🏗️ Getting Started

### 1. Prerequisites
- Node.js (Latest LTS)
- Firebase Project at [console.firebase.google.com](https://console.firebase.google.com)

### 2. Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/prathamapandey30-beep/gym-logger-app.git
   cd gym-logger-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=gym-logger-eada7
   ... (see .env.local for full keys)
   ```

### 3. Database
- Enable **Cloud Firestore** in your Firebase project.
- Provision a database in the `eur3` region.
- Ensure Firestore Security Rules are set (see `firestore.rules`).

### 4. Run Development Server
```bash
npm run dev
```

---

## 📂 Project Structure
```text
src/app/          # App Router (pages and layouts)
src/components/    # Reusable UI components (NavBar, Timer, Forms)
src/lib/          # Firebase configuration and helpers
src/types/        # TypeScript interfaces
public/           # Static assets and PWA manifest
```

## 👩‍💻 Assignment Information
- **Course**: AI in Practice (Xamk)
- **Student**: Prathama Pandey
- **Objective**: Build a robust, agent-informed web application using modern full-stack tools.
- **Submission Details**: [View Assignment Submission](./ASSIGNMENT_SUBMISSION.md)
