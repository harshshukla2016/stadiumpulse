# 🏟️ StadiumPulse | The Kinetic Horizon

<p align="center">
  <img src=".gemini/antigravity/brain/407ea050-5cbb-494e-80b4-d960b8e8b5f5/stadiumpulse_hero_banner_1776691586433.png" alt="StadiumPulse Hero Banner" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" alt="React">
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css" alt="Tailwind">
  <img src="https://img.shields.io/badge/TypeScript-Ready-blue?logo=typescript" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vibe_Engine-2.0-blueviolet" alt="Vibe Engine">
  <img src="https://img.shields.io/badge/License-MIT-green" alt="MIT License">
</p>

---

**StadiumPulse** is an intelligent, high-density venue logistics engine designed to orchestrate chaos with the precision of a spotlight. Designed for massive events (IPL Cricket, Concerts, Comedy Sets), it merges real-time spatial modeling, AI-driven autonomous logic, and environmental intelligence into a "Command Center" experience.

## ✨ Core Features

### 📡 Pulse View: Live Arena Intelligence
Experience the stadium like never before with a real-time, WebXR-ready density map.
- **Dynamic Heat Zones**: Real-time visualization of crowd pressure points.
- **Acoustic Intelligence**: Live microphone noise sensing (dB) calibrated for high-density environments.
- **Spatial Wayfinding**: Adaptive routing that reacts to current aisle density.

<p align="center">
  <img src=".gemini/antigravity/brain/407ea050-5cbb-494e-80b4-d960b8e8b5f5/stadiumpulse_homepage_1776645433182.png" alt="Pulse View Dashboard" width="80%">
</p>

### 🤖 Pulse Agent: The Autonomous Supervisor
At the heart of the platform is an **Agentic Logic Layer** powered by Gemini.
- **Proactive Compensation**: Automatically issues staff alerts or fan discounts if friction (e.g., long queue times) is detected.
- **Aisles Locking Logic**: Intelligent entry/exit point control based on game clock and crowd flow.
- **Predictive Bottlenecks**: AI identifies potential issues 5-10 minutes before they occur.

### 🌊 Echo Feed: The Crowd Mesh
A live event mesh that bridges the gap between official data and fan sentiment.
- **Acoustic Narration**: Inclusive design featuring AI-narrated audio cues for visually impaired fans.
- **Fan Echoes**: Real-time community sentiment tracking integrated with venue logistics.

<p align="center">
  <img src=".gemini/antigravity/brain/407ea050-5cbb-494e-80b4-d960b8e8b5f5/stadiumpulse_echo_view_1776645470762.png" alt="Echo Feed" width="80%">
</p>

### ♻️ Eco-Symmetry Dashboard
Sustainability isn't an afterthought. StadiumPulse tracks and gamifies environmental impact.
- **Carbon Displacement**: Tracks the CO₂ savings of fan-driven "Green Actions."
- **Eco-Gamification**: Fans earn points for sustainable choices directly within the command center.

## 🏗️ Technical Architecture

```mermaid
graph TD
    A[Venue Sensors] -->|Mic/Crowd Data| B(Pulse Agent - Gemini)
    C[External APIs] -->|Weather/Navigation| B
    B -->|Predictive Logic| D{Action Engine}
    D -->|Rerouting| E[UI - Pulse View]
    D -->|Logistics Alerts| F[Echo Feed]
    D -->|Rewards| G[Eco Dashboard]
    E -->|User Gesture| H[Live Mic Analysis]
```

## 🛠️ Tech Stack & Philosophy

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4.
- **State Management**: React Context API with persistent `EventStateController`.
- **Audio Processing**: Web Audio API for real-time RMS-to-dB conversion.
- **Inclusive Design**: ARIA-optimized high-density visual components.

## 🚀 Getting Started

Ensure you have Node.js 18+ installed.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/harshshukla2016/stadiumpulse.git
   cd stadiumpulse
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Experience the Pulse**:
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```text
├── public/                 # Static assets (Hero, Profile, Logos)
├── src/
│   ├── app/                # Next.js App Router (API Routes & Pages)
│   ├── components/         # Professional UI Components
│   │   ├── views/          # Module pages (Pulse, Echo, Hub, Eco)
│   │   └── PulseAgent.tsx  # Central AI Logic Component
│   ├── context/            # Global Event State Control
│   └── lib/                # API Integrations & Utilities
```

## 👨‍💻 Creator

Built with passion by **Harsh Kumar Shukla** — SAP SD Consultant & Full-Stack Developer.

[![Portfolio](https://img.shields.io/badge/Portfolio-Harsh_Shukla-blue?style=for-the-badge&logo=vercel)](https://harsh-kumar-shukla-portfolio.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-stadiumpulse-black?style=for-the-badge&logo=github)](https://github.com/harshshukla2016/stadiumpulse)

---
*StadiumPulse: Orchestrating the Kinetic Horizon.*
