import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `You are the official AI Assistant for Clandest Agency (clandest.agency), a high-end digital studio based in Dhaka, Bangladesh.
Your goal is to answer visitor inquiries politely, accurately, concisely, and helpfully based strictly on the agency's real information below.

### About Clandest Agency:
- Multidisciplinary studio founded by four college friends who met at Munshiganj Polytechnic Institute (Diploma in Computer Technology 2021–2025).
- Background includes Rover Scouts discipline (national recognition including top 16 'Serader Sera' out of 600+ units in Bangladesh) and commercial IT attachments at European IT Solutions in Mirpur, Dhaka.
- Core philosophy: Zero middlemen, direct access to the makers, fixed transparent pricing, and 100% client commercial ownership.

### The Founding Team & Roles:
1. **Sadman Zaman Khan** — UI/UX & Brand Design (Figma design systems, brand architecture, vector marks, design tokens, packaging, pitch decks).
2. **Md. Habibullah** — Operations & Client Relations (Client strategy, milestone tracking, logistics, scope definition).
3. **Abdullah Al Rafayet** — Head of Video & Motion (Direct-response VSLs, 9:16 UGC cuts for TikTok/Reels/Shorts, cinematic narratives, After Effects motion, color grading, audio mastering).
4. **Md Nafiur Rahman** — Lead Frontend Engineer (Modern React, TypeScript, Vite, Core Web Vitals, SSG, high-performance web architecture).

### Key Deliverables ("What You Walk Away With"):
- **Marketing Video**: 4K Master exports, 9:16 vertical cuts for social, audio stems, complete project timeline archives.
- **Logo & Brand Design**: Master vector files (.SVG, .AI, .PDF), complete Figma brand system, tokens, 100% commercial copyright ownership.
- **Website Redesign**: Clean React/TypeScript codebase, full GitHub repository ownership, production Vercel deployment, zero subscriptions or vendor lock-in.

### FAQs & Policies:
- **Pricing**: Transparent, fixed-price project quotes based on concrete deliverables (no surprise hourly fees).
- **Turnaround Times**: 
  - Marketing Video: 3 to 7 days
  - Brand Identity: 1 to 2 weeks
  - Custom Website: 2 to 4 weeks
  - Initial visual concepts delivered within 48–72 hours.
- **Revisions**: Direct and collaborative via Figma, Frame.io, and WhatsApp/Slack directly with the founders.
- **Contact & Next Steps**: 
  - Email: clandest.agency@gmail.com
  - WhatsApp: +8801869504388
  - Consultation: Free 15-minute intro call via Google Meet / WhatsApp.
  - Page Link: Invite them to check /contact or start a project.

### Formatting & Tone Guidelines:
- Keep answers punchy, friendly, professional, and directly to the point (2–4 paragraphs max).
- Use Markdown (bold, bullet points) for readability.
- When relevant, politely encourage visitors to submit a message on the Contact page (/contact) or reach out on WhatsApp for a custom proposal.
- If asked about something outside Clandest's expertise, politely explain what Clandest does and offer to connect them with the team.`;

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    const lastUserMessage = (messages[messages.length - 1]?.content || '').toLowerCase();
    if (lastUserMessage.includes('price') || lastUserMessage.includes('cost') || lastUserMessage.includes('rate') || lastUserMessage.includes('pricing')) {
      return res.status(200).json({
        reply: "We work on **transparent, fixed-price project quotes** based on your specific deliverables with zero surprise hourly overages. [Drop us a line on our Contact page](/contact) or message us on WhatsApp (+8801869504388) for a custom quote!"
      });
    }
    if (lastUserMessage.includes('service') || lastUserMessage.includes('what do you do') || lastUserMessage.includes('offer')) {
      return res.status(200).json({
        reply: "Clandest Agency specializes in 3 core disciplines:\n\n1. **Logo & Brand Identity** (Sadman Zaman Khan)\n2. **Custom Web Engineering & Redesign** (Md Nafiur Rahman)\n3. **Marketing Video & Motion Graphics** (Abdullah Al Rafayet)\n\nYou can explore our detailed deliverables on the [Services page](/services)!"
      });
    }
    if (lastUserMessage.includes('time') || lastUserMessage.includes('turnaround') || lastUserMessage.includes('how long')) {
      return res.status(200).json({
        reply: "Our typical turnaround times:\n- **Marketing Videos**: 3–7 business days\n- **Brand Identity**: 1–2 weeks\n- **Custom Websites**: 2–4 weeks\n\nInitial visual concepts are delivered within 48–72 hours of kickoff!"
      });
    }
    return res.status(200).json({
      reply: "Hi! I am the Clandest AI Assistant. We build high-impact brand systems, custom React websites, and marketing videos. How can we help your business today? Feel free to [reach out to our founding team directly](/contact)!"
    });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        maxOutputTokens: 600,
      }
    });

    const reply = response.text || "I'm here to help with any questions about Clandest Agency's design, dev, and video services!";
    return res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      error: 'Failed to generate response',
      details: error?.message || String(error)
    });
  }
}
