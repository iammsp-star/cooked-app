# Cooked: High-Stakes Ego Destruction

**🔥 [Play Now / Live Demo](https://cooked-app.vercel.app) 🔥**

A web application designed to generate AI-driven roasts based on user data from Spotify and Valorant. The goal is to provide a brutally honest humorous critique of your personality through media consumption and gaming performance, wrapped in a "Hellfire Terminal" aesthetic.

## Features
- **The Pit**: A massive glowing landing page that sets the tone for destruction.
- **The Sacrificial Selection**: Choose between Spotify or Valorant as your sacrifice.
- **The Burn**: Watch the progress bar fill with fire as data is extracted.
- **The Reveal**: Get brutally roasted by an AI insult comedian persona, complete with dramatic typing animations and screen shake effects.
- **Social Sharing**: Share your roasted verdict directly to X (Twitter).

## How to use it

### Prerequisites
Make sure you have Node.js 18+ installed.

### Setup locally

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd cooked-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root of the project to add your API keys.
   ```bash
   touch .env.local
   ```
   Add the following variables to your `.env.local`:
   ```env
   # Spotify OAuth (Pending Integration)
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

   # Riot Games API (Pending Integration)
   RIOT_API_KEY=your_riot_dev_api_key

   # AI Inference (Together AI / Groq) (Pending Integration)
   GROQ_API_KEY=your_groq_api_key
   # or
   TOGETHER_API_KEY=your_together_api_key
   ```
   *Note: The current version uses Mock Data for demonstration. You can swap out the mock responses in `app/api/roast/route.ts` once your keys are ready.*

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the App:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment
You can deploy this application seamlessly on Vercel:
```bash
npx vercel --prod
```

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: JetBrains Mono & Inter

---
*Created from the Cooked Master Blueprint.*
