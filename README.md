# MediVoice AI

This Project is the AI Medical Voice Agent Nextjs Website. There are 2 Version (Free, Pro). User can find ai doctor based on symptom description, ai will provide some doctor, and can conduct in conversation Page. In conversation page, can conduct and get suggestion from AI Medical Doctor. After consultation, AI will give you report based on conversation in below format:

## Medical Report Format

```
1. sessionId: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician AI")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate or severe
10. medicationsMentioned: list of any medicines mentioned
11. recommendations: list of AI suggestions (e.g., rest, see a doctor)
```

Return the result in this JSON format:

```json
{
  "sessionId": "string",
  "agent": "string",
  "user": "string",
  "timestamp": "ISO Date string",
  "chiefComplaint": "string",
  "summary": "string",
  "symptoms": ["symptom1", "symptom2"],
  "duration": "string",
  "severity": "string",
  "medicationsMentioned": ["med1", "med2"],
  "recommendations": ["rec1", "rec2"]
}
```

## Features

### Free Version

- Only 1 free AI Medical Doctor Agent
- 10 Credits (only have 10 time Consultation)

### Pro Version / Month

- Have 10 Different AI Medical Doctor Agent
- Have unlimited Consultation based on Pro Version Period

## Installation

```bash
npm install
npm run dev
```

## Tech Stack Used

- **Next.js** - For both frontend and backend
- **motion** - for animation
- **next-theme** - for day & light mode
- **react-icons** - for icon
- **Shadcn + tailwind** - for UI component
- **moment** - for date & time format
- **Drizzle ORM + NeonDB + PostgreSQL** - Database
- **Clerk** - Authentication
- **axios** - for data fetching
- **context api** - for state management
- **openRouter using OpenAi SDK** - Model gpt-3.5-turbo
- **Vapi + AssemblyAI** - for Voice Conversation

## Project Images

### Authentication Pages

**Register Page**
<img width="686" height="582" alt="Image" src="https://github.com/user-attachments/assets/0b363ef8-4b8f-428c-b298-bad7b28c71e4" />

**Login Page** (User can Login with OAuth - Google or Email)
<img width="526" height="493" alt="Image" src="https://github.com/user-attachments/assets/93f15f8a-4cfd-43f7-984b-3a6fcea9f121" />

**Enter Password Page** (if User Login with Email)
<img width="601" height="467" alt="Image" src="https://github.com/user-attachments/assets/fb9c92e1-9c65-475e-a3f1-6185ecebe9bd" />

**OTPEmail Page**
<img width="524" height="520" alt="Image" src="https://github.com/user-attachments/assets/1f552f19-e8a7-4ade-87cf-b2c19536c7ed" />

### Free Version

**Home Page**
![Image](https://github.com/user-attachments/assets/038a0963-b1bc-4278-ac23-727431f484f9)

**UserProfile**
<img width="1048" height="388" alt="Image" src="https://github.com/user-attachments/assets/aebb714c-7925-44cd-b80a-49df5e63f260" />

**Profile Model Tag**
<img width="1012" height="629" alt="Image" src="https://github.com/user-attachments/assets/59824fa8-3036-4b02-8d15-a59278d5b011" />

**Update Profile & Add New Email**
<img width="655" height="528" alt="Image" src="https://github.com/user-attachments/assets/5df1dca3-9823-440f-88eb-1f8e6c719bae" />

**Update Password**
<img width="657" height="513" alt="Image" src="https://github.com/user-attachments/assets/38908e0e-4c8e-4671-bafa-1b428862f15f" />

**Billing For Free User**
<img width="655" height="518" alt="Image" src="https://github.com/user-attachments/assets/37290714-f76a-49d4-9fac-1140b0638e72" />

**Dashboard Home Page** => Free Version
![Image](https://github.com/user-attachments/assets/8f1c5bf8-488c-44b2-bfd1-96c83a83f69e)

**New Consultation Model**
<img width="1019" height="578" alt="Image" src="https://github.com/user-attachments/assets/66529d3d-8d1b-47a1-bb54-e13ef361b034" />

**Selected Doctor**
<img width="983" height="550" alt="Image" src="https://github.com/user-attachments/assets/9414b0cf-a93b-46f1-bf5c-9b09a2f624d3" />

**Direct Consultation With Conduct Button in Doctor Lists**
<img width="962" height="535" alt="Image" src="https://github.com/user-attachments/assets/451ba739-9580-4b2e-9778-9837b68fef80" />

**Conversation Page**
![Image](https://github.com/user-attachments/assets/6d140ac3-035b-488d-851c-02a10c0a0007)

**Talk With AI Medical Doctor Agent**
![Image](https://github.com/user-attachments/assets/9ff523c6-37d0-423f-9410-d64656e19c45)

**Consultation History**
<img width="962" height="533" alt="Image" src="https://github.com/user-attachments/assets/5be73e4f-a269-4352-9419-b617f70571db" />

**View Report Dialog**
<img width="950" height="592" alt="Image" src="https://github.com/user-attachments/assets/d1f171c1-bfa4-46ab-badf-d48ad7ff4112" />

**History Page With Data**
<img width="986" height="581" alt="Image" src="https://github.com/user-attachments/assets/c5554934-8d4b-4b57-85ae-4a1edbe65cbd" />

**History Page with No Data Yet**
![Image](https://github.com/user-attachments/assets/4d565e54-ab07-43df-bf2e-75f21e4d44a7)

**Pricing Page**
![Image](https://github.com/user-attachments/assets/9b7dfdf9-fa76-4fee-88f8-c2dcc9aa0143)

### Pro Version

**Buying Pro Version**
<img width="1039" height="644" alt="Image" src="https://github.com/user-attachments/assets/a6a480ab-c2c0-494d-a7cf-75143f1ac7b1" />

**Pricing Page with Pro Active**
![Image](https://github.com/user-attachments/assets/83caa1a3-73e9-4d8c-ad15-1abfc33982b9)

**Billing Pro Version & Renew Date**
<img width="657" height="517" alt="Image" src="https://github.com/user-attachments/assets/754b0f7a-df55-466f-8233-9653901f4ac5" />

**Billing Transaction**
<img width="652" height="517" alt="Image" src="https://github.com/user-attachments/assets/e6395da3-0f02-4b88-8312-62b83bfe346a" />

**Dashboard Home Page - Pro Version**
![Image](https://github.com/user-attachments/assets/fc754284-d5c7-440d-bd41-4ed43ba6277d)
