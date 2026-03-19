# 🏥 MediVoice AI

<div align="center">

![MediVoice AI Logo](public/MediVoiceAI.jpeg)

**AI-Powered Medical Voice Assistant for Smart Healthcare Consultations**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white)](https://clerk.com/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)](https://github.com/NaingMinThant77/Next-AI-Medical-Agent)

</div>

---

## 🌟 Overview

**MediVoice AI** is a cutting-edge AI Medical Voice Agent built with Next.js that revolutionizes healthcare consultations. Users can describe their symptoms, get matched with specialized AI doctors, and conduct voice conversations for medical advice. After each consultation, users receive comprehensive medical reports in structured JSON format.

### ✨ Key Features

- 🤖 **AI-Powered Symptom Analysis**
- 🎙️ **Voice Conversation Support**
- 📋 **Detailed Medical Reports**
- 👥 **Multiple AI Medical Specialists**
- 💳 **Flexible Pricing Plans**
- 🔐 **Secure Authentication**
- 📱 **Responsive Design**

---

## 💎 Pricing Plans

### 🆓 Free Plan

- **1 AI Medical Doctor Agent**
- **10 Consultation Credits**
- Basic medical consultations
- Standard report generation

### 💎 Pro Plan - $9.99/month

- **10 Different AI Medical Doctor Agents** including:
  - General Physician AI
  - Cardiologist AI
  - Neurologist AI
  - Pediatrician AI
  - Dermatologist AI
  - Orthopedic AI
  - Psychiatrist AI
  - Gynecologist AI
  - ENT Specialist AI
  - Gastroenterologist AI
- **Unlimited Consultations**
- **Priority Support**
- **Advanced Report Features**
- **Voice Conversation History**

<div align="center">

**Upgrade to Pro for unlimited access to specialized medical AI assistants!**

</div>

---

## 📋 Medical Report Format

Each consultation generates a comprehensive medical report in JSON format:

```json
{
  "sessionId": "unique_session_identifier",
  "agent": "Medical_Specialist_AI",
  "user": "Patient_Name_or_Anonymous",
  "timestamp": "2024-03-19T10:42:00.000Z",
  "chiefComplaint": "Brief summary of main health concern",
  "summary": "2-3 sentence summary of consultation",
  "symptoms": ["symptom1", "symptom2", "symptom3"],
  "duration": "Duration of symptoms",
  "severity": "mild|moderate|severe",
  "medicationsMentioned": ["medication1", "medication2"],
  "recommendations": ["recommendation1", "recommendation2"]
}
```

### 📊 Report Fields Explained

| Field                  | Description                    | Type     |
| ---------------------- | ------------------------------ | -------- |
| `sessionId`            | Unique consultation identifier | `string` |
| `agent`                | AI medical specialist name     | `string` |
| `user`                 | Patient name or "Anonymous"    | `string` |
| `timestamp`            | Consultation date/time (ISO)   | `string` |
| `chiefComplaint`       | Main health concern summary    | `string` |
| `summary`              | Consultation overview          | `string` |
| `symptoms`             | List of reported symptoms      | `array`  |
| `duration`             | How long symptoms persisted    | `string` |
| `severity`             | Symptom severity level         | `string` |
| `medicationsMentioned` | Current medications            | `array`  |
| `recommendations`      | AI-generated advice            | `array`  |

---

## 🚀 Quick Start

### 📋 Prerequisites

- Node.js 18+
- npm or yarn package manager
- PostgreSQL database (NeonDB recommended)

### ⚙️ Installation

```bash
# Clone the repository
git clone https://github.com/NaingMinThant77/Next-AI-Medical-Agent.git
cd Next-AI-Medical-Agent

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run the development server
npm run dev
```

### 🔧 Environment Setup

Configure your `.env.local` file with the following variables:

```bash
# Database
DATABASE_URL=your_postgresql_database_url

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# OpenRouter API
OPEN_ROUTER_API_KEY=your_openrouter_api_key

# Vapi Voice Assistant
NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID=your_vapi_assistant_id
NEXT_PUBLIC_VAPI_PUBLIC_KEY=your_vapi_public_key
```

🌐 **Open [http://localhost:3000](http://localhost:3000) to view the application**

---

## 🛠️ Tech Stack

<div align="center">

### 🎨 Frontend Technologies

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Shadcn](https://img.shields.io/badge/Shadcn_UI-000000?style=flat-square&logo=shadcnui&logoColor=white)](https://ui.shadcn.com/)

### 🎯 UI/UX Libraries

[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0085FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![React Icons](https://img.shields.io/badge/React_Icons-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react-icons.github.io/react-icons/)
[![Next Theme](https://img.shields.io/badge/Next_Theme-000000?style=flat-square&logo=nextdotjs&logoColor=white)](https://github.com/pacocoursey/next-themes)

### 🗄️ Backend & Database

[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat-square&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![NeonDB](https://img.shields.io/badge/Neon_DB-0A0A0A?style=flat-square&logo=neondatabase&logoColor=white)](https://neon.tech/)

### 🔐 Authentication & APIs

[![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat-square&logo=clerk&logoColor=white)](https://clerk.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)](https://openai.com/)
[![Vapi](https://img.shields.io/badge/Vapi-FF6B6B?style=flat-square&logo=vapi&logoColor=white)](https://vapi.dev/)
[![AssemblyAI](https://img.shields.io/badge/AssemblyAI-1E88E5?style=flat-square&logo=assemblyai&logoColor=white)](https://www.assemblyai.com/)

</div>

### 📦 Core Dependencies

| Category             | Technologies               |
| -------------------- | -------------------------- |
| **Framework**        | Next.js 14+                |
| **Language**         | TypeScript                 |
| **Styling**          | Tailwind CSS + Shadcn UI   |
| **Database**         | Drizzle ORM + NeonDB       |
| **Authentication**   | Clerk                      |
| **AI/ML**            | OpenRouter (GPT-3.5-turbo) |
| **Voice**            | Vapi + AssemblyAI          |
| **State Management** | React Context API          |
| **HTTP Client**      | Axios                      |
| **Date/Time**        | Moment.js                  |
| **Animations**       | Framer Motion              |

---

## 🖼️ Project Showcase

### 🔐 Authentication Flow

<div align="center">

**Register & Login System**

</div>

**📝 Register Page**
<img width="686" height="582" alt="Register Page" src="https://github.com/user-attachments/assets/0b363ef8-4b8f-428c-b298-bad7b28c71e4" />

**🔑 Login Page** (OAuth Google & Email support)
<img width="526" height="493" alt="Login Page" src="https://github.com/user-attachments/assets/93f15f8a-4cfd-43f7-984b-3a6fcea9f121" />

**🔐 Password Entry**
<img width="601" height="467" alt="Password Page" src="https://github.com/user-attachments/assets/fb9c92e1-9c65-475e-a3f1-6185ecebe9bd" />

**✉️ Email Verification**
<img width="524" height="520" alt="OTP Page" src="https://github.com/user-attachments/assets/1f552f19-e8a7-4ade-87cf-b2c19536c7ed" />

---

### 🆓 Free Version Features

<div align="center">

**Experience AI Medical Consultations with Basic Features**

</div>

**🏠 Home Dashboard**
![Home Page](https://github.com/user-attachments/assets/038a0963-b1bc-4278-ac23-727431f484f9)

**👤 User Profile Management**
<img width="1048" height="388" alt="User Profile" src="https://github.com/user-attachments/assets/aebb714c-7925-44cd-b80a-49df5e63f260" />

**💳 Profile Model Tag**

<img width="1012" height="629" alt="Image" src="https://github.com/user-attachments/assets/59824fa8-3036-4b02-8d15-a59278d5b011" />

**💳 Update Profile & Add New Email**

<img width="655" height="528" alt="Image" src="https://github.com/user-attachments/assets/5df1dca3-9823-440f-88eb-1f8e6c719bae" />

**💳 Update Password**

<img width="657" height="513" alt="Image" src="https://github.com/user-attachments/assets/38908e0e-4c8e-4671-bafa-1b428862f15f" />

**💳 Billing & Subscription**
<img width="655" height="518" alt="Billing" src="https://github.com/user-attachments/assets/37290714-f76a-49d4-9fac-1140b0638e72" />

**🩺 Consultation Flow**
<img width="1019" height="578" alt="New Consultation" src="https://github.com/user-attachments/assets/66529d3d-8d1b-47a1-bb54-e13ef361b034" />

**🩺 Selected Doctor**

<img width="983" height="550" alt="Image" src="https://github.com/user-attachments/assets/9414b0cf-a93b-46f1-bf5c-9b09a2f624d3" />

**🩺 Direct Consultation With Conduct Button in Doctor Lists**

<img width="962" height="535" alt="Image" src="https://github.com/user-attachments/assets/451ba939-9580-4b2e-9778-9837b68fef80" />

**💬 AI Conversation Interface**
![Conversation Page](https://github.com/user-attachments/assets/6d140ac3-035b-488d-851c-02a10c0a0007)

**💬 Talk With AI Medical Doctor Agent**

![Image](https://github.com/user-attachments/assets/9ff523c6-37d0-423f-9410-d64656e19c45)

**📊 Medical Reports**
<img width="950" height="592" alt="Medical Report" src="https://github.com/user-attachments/assets/d1f171c1-bfa4-46ab-badf-d48ad7ff4112" />

**📊 History Page With Data**

<img width="986" height="581" alt="Image" src="https://github.com/user-attachments/assets/c5554934-8d4b-4b57-85ae-4a1edbe65cbd" />

**📊 History Page with No Data Yet**

![Image](https://github.com/user-attachments/assets/4d565e54-ab07-43df-bf2e-75f21e4d44a7)

**📊 Pricing Page**

![Image](https://github.com/user-attachments/assets/9b7dfdf9-fa76-4fee-88f8-c2dcc9aa0143)

---

### 💎 Pro Version Features

<div align="center">

**Unlock Unlimited Access to Specialized Medical AI**

</div>

**💎 Buying Pro Version**

<img width="1039" height="644" alt="Image" src="https://github.com/user-attachments/assets/a6a480ab-c2c0-494d-a7cf-75143f1ac7b1" />

**💎 Pricing Page with Pro Active**

![Image](https://github.com/user-attachments/assets/83caa1a3-73e9-4d8c-ad15-1abfc33982b9)

**💎 Billing Pro Version & Renew Date**

<img width="657" height="517" alt="Image" src="https://github.com/user-attachments/assets/754b0f7a-df55-466f-8233-9653901f4ac5" />

**💎 Billing Transaction**

<img width="652" height="517" alt="Image" src="https://github.com/user-attachments/assets/e6395da3-0f02-4b88-8312-62b83bfe346a" />

**💎 Dashboard Home Page - Pro Version**

![Image](https://github.com/user-attachments/assets/fc754284-d5c7-440d-bd41-4ed43ba6277d)

---
