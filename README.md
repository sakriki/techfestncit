#THIS MAY NOT WORK PERFECTLY LOCALLY BECAUSE I HAVE REMOVED ALL THE SENSITIVE API KEYS AND CODES. FOR THE FULL WORKING VERSION, PLEASE VISIT : www.gafadichat.com

# Gafadi Chat

Gafadi Chat is a next-generation, privacy-focused chat platform designed for college students. It enables secure, anonymous text and voice communication, making campus life more vibrant and inclusive.

## Features

- **Anonymous Chat:** Chat without revealing your identity.
- **Voice Chat:** Real-time voice rooms using WebRTC.
- **Privacy First:** End-to-end encryption and strong privacy policies.
- **Modern UI:** Responsive, mobile-friendly design.
- **Theming:** Customizable themes for a personalized experience.
- **Static Info Pages:** About, Privacy, Terms, and more.

## Technology Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 18)
- **Frontend:** React, TypeScript, Tailwind CSS
- **Real-time Database:** Firebase
- **Voice Chat:** WebRTC (peer-to-peer audio)
- **UI Components:** Custom and reusable React components

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/Gafadi_Chat.git
   cd Gafadi_Chat
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```
3. **Configure Firebase:**
   - Add your Firebase config to `lib/firebase.ts` as per your project settings.
4. **Run the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```
5. **Open in your browser:**
   - Visit [http://localhost:3000](http://localhost:3000)

## Usage

- **Anonymous Chat:** Navigate to the Anonymous Chat section to start chatting instantly.
- **Voice Chat:** Join a voice room and talk in real-time. Allow microphone access when prompted.
- **Static Pages:** Learn more about the platform via About, Privacy, and Terms pages.

## Browser Compatibility

- **Fully supported:** Chrome, Edge, Firefox, Brave (Desktop & Android)
- **Apple/iOS Browsers:**
  - All browsers on iOS (Safari, Chrome, Brave, etc.) use WebKit and have strict autoplay/audio policies.
  - **Voice Chat:** Users may need to tap "Enable Audio" if playback is blocked. A prompt will appear automatically.
  - Always allow microphone access when prompted.

## Contribution Guidelines

1. Fork the repository and create your branch.
2. Make your changes and test thoroughly.
3. Submit a pull request with a clear description of your changes.
4. For major features or bug fixes, please open an issue first to discuss.

## License

This project is licensed under the MIT License.

---

**Gafadi Chat** – Connect. Share. Grow. Anonymously and securely. 