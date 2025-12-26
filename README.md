## 📖 Project Summary
Voyager Elite is a world-class, AI-driven travel orchestration system designed to transform vague travel desires into professional-grade, high-fidelity itineraries. Moving beyond simple list generation, Voyager Elite acts as a digital travel concierge, leveraging the advanced reasoning of AI to synthesize real-time market data, cultural nuances, and logistical complexities into a single, cohesive "Expedition Dossier."

## 🌟 The Core Vision
The platform is built for the modern traveler who demands more than just a schedule. It bridges the gap between automated planning and premium human curation by focusing on:
Intelligence Grounding: Using Google Search to fetch actual flight names, train numbers, and real-time pricing from providers like MakeMyTrip.
Insider Protocol: Identifying "Secret Spots" and explicitly flagging "Tourist Traps" to ensure an authentic local experience.
Logistical Precision: Calculating travel time buffers, providing dietary translation guides, and generating precise budget breakdowns.

## 🛠️ Key Technical Pillars
AI Orchestration: Deep integration with the @google/genai SDK for complex reasoning and structured JSON output.
Aesthetic Engineering: A premium UI built with React 19 and Tailwind CSS, featuring high-fidelity glassmorphism, fluid animations, and a dedicated "Elite" visual language.
Utility & Portability: One-click PDF Export (via html2pdf.js) that transforms the digital plan into a print-ready document, plus Voice Input for hands-free planning.
Data Persistence: A secure, localized authentication system and trip archive, allowing users to build a personal library of past and future expeditions.

## 🧩 How It Works

1. **Authentication**: Access the secure Voyager Elite portal.
2. **Parameters**: Define your departure/destination hubs, budget, and travel party (Adults, Children, Seniors).
3. **Themes**: Select from 15+ curated travel themes (Eco-Tourism, Luxury, Culinary, etc.).
4. **Execution**: Review your day-by-day schedule, book via integrated MMT links, and export your professional PDF dossier.

##Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `API_KEY` in [.env.local](.env.local) to your API key
3. Run the app:
   `npm run dev`
