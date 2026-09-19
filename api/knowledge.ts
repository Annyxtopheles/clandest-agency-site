/**
 * PRIVATE SERVER-SIDE KNOWLEDGE BASE
 * -----------------------------------
 * This file is NEVER shipped to client browsers or web scrapers.
 * It is only accessed on the secure serverless backend by api/chat.ts
 * to give the Gemini AI Assistant deep, rich context about each founder,
 * their specific skills, workflows, tools, and agency background.
 */

export const PRIVATE_KNOWLEDGE_BASE = `
### In-Depth Team Profiles & Private Context:

#### 1. Sadman Zaman Khan — UI/UX & Brand Identity Design
- **Core Strengths**: Design system architecture in Figma, vector mark craftsmanship, design tokens (typography hierarchies, color palettes, spacing variables), interactive prototyping, pitch deck visual design, and commercial packaging.
- **Experience & Background**: Diploma in Computer Technology from Munshiganj Polytechnic Institute (2021–2025). Commercial IT industrial attachment at European IT Solutions in Mirpur, Dhaka.
- **Portfolio & Aesthetic Style**: Focuses on clean, high-impact digital experiences with intentional whitespace, subtle micro-interactions, dark/light contrast mastery, and strict accessibility standards.
- **Tools**: Figma, Adobe Illustrator, Photoshop, Spline 3D, After Effects.
- **Client Collaboration**: Works directly with clients inside Figma files and video walkthroughs, iterating with rapid turnaround on brand concepts.

#### 2. Abdullah Al Rafayet — Head of Video Post-Production & Motion
- **Core Strengths**: Direct-response Video Sales Letters (VSLs), high-retention 9:16 vertical cuts for TikTok, Instagram Reels, and YouTube Shorts, cinematic documentary brand narratives, After Effects motion graphics, color grading, and studio audio mastering.
- **Experience & Background**: Munshiganj Polytechnic Institute graduate. Commercial video editing and motion graphics attachment at European IT Solutions.
- **Editing Philosophy**: Dynamic pacing and visual hooks within the first 3 seconds, kinetic typography, Foley and sound design that amplifies viewer retention, and color science calibrated for mobile OLED screens and 4K desktop viewing.
- **Tools**: Adobe Premiere Pro, After Effects, DaVinci Resolve, Audition.

#### 3. Md Nafiur Rahman — Lead Frontend Engineer
- **Core Strengths**: Modern React (v18/19), TypeScript, Vite, Core Web Vitals optimization, semantic HTML5, zero-bloat modular CSS, static site generation (SSG), accessible ARIA patterns, and high-performance fluid animations (Motion/Framer Motion).
- **Leadership & Background**: Munshiganj Polytechnic Institute graduate. Senior Rover Mate in Bangladesh Rover Scouts, leading the campus unit to the national 'Serader Sera' Top 16 award out of 600+ units nationwide in Bangladesh.
- **Engineering Philosophy**: Zero unnecessary dependencies, semantic architecture, clean component reusability, lightning-fast TTFB (Time to First Byte), and sub-second page loads.
- **Tools**: React, TypeScript, Vite, Tailwind/Modern CSS, Git, Node.js, Vercel edge infrastructure.

### Agency Operational Policies & Client Assurance:
- **Zero Middlemen**: Clients communicate directly with the three partners executing the work. No account executives, interns, or junior contractors.
- **100% Commercial Ownership**: Upon final milestone payment, clients receive full commercial copyright and all raw master files (Figma files with vector assets, 4K ProRes video timelines + audio stems, and clean GitHub repository transfer).
- **Fixed-Price Transparency**: Every project is scoped with a clear, fixed quote based on concrete deliverables. Zero hidden hourly fees or unexpected invoices.
- **Turnaround Benchmarks**:
  - Marketing Videos / UGC cuts: 3 to 7 business days
  - Logo & Brand Identity: 1 to 2 weeks
  - Custom Web Engineering & Redesign: 2 to 4 weeks
  - Initial visual concepts are delivered within 48 to 72 hours of kickoff.
`;
