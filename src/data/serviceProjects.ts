export interface ProjectGalleryImage {
  url: string;
  caption: string;
}

export interface ServiceProjectItem {
  id: string;
  slug: string;
  title: string;
  category: 'branding' | 'web';
  categoryLabel: string;
  year: string;
  summary: string;
  coverImage: string;
  galleryImages: ProjectGalleryImage[];
  tags: string[];
  deliverables: string[];
  caseStudyUrl: string;
  liveUrl?: string;
  author: string;
}

export const BRANDING_PROJECTS: ServiceProjectItem[] = [
  {
    id: 'noborangi',
    slug: 'noborangi',
    title: 'Noborangi Brand Identity',
    category: 'branding',
    categoryLabel: 'Brand Identity & Packaging',
    year: '2024',
    summary: 'High-contrast editorial serif logotype, luxury crimson & cream palette, bespoke retail packaging, boutique architectural signage, and split-tone merchandise.',
    coverImage: '/assets/projects/noborangi/noborangi-banner-cover.webp',
    galleryImages: [
      { url: '/assets/projects/noborangi/noborangi-banner-cover.webp', caption: 'Noborangi Brand Overview & Editorial Banner' },
      { url: '/assets/projects/noborangi/noborangi-01-logo-tagline.webp', caption: 'Custom Logotype with Star Accent & Brand Philosophy' },
      { url: '/assets/projects/noborangi/noborangi-02-business-cards.webp', caption: 'Minimalist Editorial Corporate Stationery & Business Cards' },
      { url: '/assets/projects/noborangi/noborangi-05-storefront-facade.webp', caption: 'Boutique Storefront Architecture & Exterior Facade Signage' },
      { url: '/assets/projects/noborangi/noborangi-06-luxury-shopping-bag.webp', caption: 'Luxury Retail Packaging & Sustainable Shopping Bags' }
    ],
    tags: ['Logotype Design', 'Editorial Typography', 'Retail Packaging', 'Storefront Architecture'],
    deliverables: [
      'Primary wordmark with custom four-pointed star',
      'Luxury retail packaging and shopping bag suite',
      'Boutique architectural storefront blade signage',
      'Editorial stationery, business cards, and merchandise'
    ],
    caseStudyUrl: 'https://sadmanportfolio.vercel.app/work/noborangi',
    author: 'Designed by Sadman Zaman Khan'
  },
  {
    id: 'nexura-brand-system',
    slug: 'nexura-brand-system',
    title: 'NEXURA Corporate Identity & Design System',
    category: 'branding',
    categoryLabel: 'Corporate Identity & Guidelines',
    year: '2025',
    summary: 'Complete brand guidelines manual featuring geometric logo construction, clearspace alignment grids, brand color architecture, typography standards, and corporate collateral.',
    coverImage: '/assets/projects/nexura/nexura-guidelines-01-cover.webp',
    galleryImages: [
      { url: '/assets/projects/nexura/nexura-guidelines-01-cover.webp', caption: 'NEXURA Brand Guidelines Manual Cover' },
      { url: '/assets/projects/nexura/nexura-guidelines-02-construction.webp', caption: 'Geometric Logo Construction, Mathematical Grids & Clearspace' },
      { url: '/assets/projects/nexura/nexura-guidelines-03-symbolism.webp', caption: 'Logo Symbolism, Monogram Geometry & Icon Alignment' },
      { url: '/assets/projects/nexura/nexura-guidelines-04-palette-typography.webp', caption: 'Brand Color Architecture & Typography Standards' }
    ],
    tags: ['Corporate Identity', 'Logo Construction', 'Brand Guidelines', 'Design Tokens'],
    deliverables: [
      'Mathematical logo construction grids & clearspace rules',
      'Comprehensive digital brand manual & guidelines',
      'Typography hierarchy and verified color tokens',
      'Corporate stationery, apparel, and merchandise specifications'
    ],
    caseStudyUrl: 'https://sadmanportfolio.vercel.app/work/nexura-brand-system',
    author: 'Designed by Sadman Zaman Khan'
  },
  {
    id: 'control-tower-products',
    slug: 'control-tower-products',
    title: 'Control Tower Enterprise AI Product Identities',
    category: 'branding',
    categoryLabel: 'Multi-Product Brand Architecture',
    year: '2025 – 2026',
    summary: 'Full brand identities, custom logo marks, and domain palettes for 10+ vertical AI enterprise products including Agency Control Tower, ePhysician, and Mortgage AI.',
    coverImage: '/assets/projects/control-tower/og-agency-control-tower.webp',
    galleryImages: [
      { url: '/assets/projects/control-tower/og-agency-control-tower.webp', caption: 'Agency Control Tower — Enterprise Identity & OpenGraph Card' },
      { url: '/assets/projects/control-tower/og-ephysician-control-tower.webp', caption: 'ePhysician Control Tower — Clinical Command Brand Identity' },
      { url: '/assets/projects/control-tower/og-marketing-control-tower.webp', caption: 'Marketing Control Tower — High-Velocity Growth Brand Identity' },
      { url: '/assets/projects/control-tower/og-mortgage-ai.webp', caption: 'Mortgage AI — Fintech Underwriting Brand Identity' }
    ],
    tags: ['Enterprise AI Branding', 'Multi-Brand Architecture', 'Logo Marks', 'Digital Design Systems'],
    deliverables: [
      '10+ unified domain-specific product logo marks',
      'Modular enterprise color architecture and dark UI tokens',
      'Commercial sales enablement presentation decks',
      'High-impact social OpenGraph visual cards'
    ],
    caseStudyUrl: 'https://sadmanportfolio.vercel.app/work/control-tower-products',
    author: 'Designed by Sadman Zaman Khan'
  }
];

export const WEB_PROJECTS: ServiceProjectItem[] = [
  {
    id: 'collabai-platform',
    slug: 'collabai-platform',
    title: 'CollabAI — Multi-Agent Workspace Redesign',
    category: 'web',
    categoryLabel: 'AI Workspace & Product Redesign',
    year: '2025 – 2026',
    summary: 'Full UI/UX redesign of CollabAI\'s multi-agent collaboration platform, replacing a cluttered neon interface with a minimal dark workspace featuring multi-model streaming and orchestration.',
    coverImage: '/assets/projects/collabai-mockup.webp',
    galleryImages: [
      { url: '/assets/projects/collabai-mockup.webp', caption: 'CollabAI Multi-Agent Workspace — Minimal Dark UI & Global Composer' },
      { url: '/assets/projects/collabai/collabai-dashboard-after.webp', caption: 'Redesigned Core Dashboard — Multi-Model Streamer & Context Tools' },
      { url: '/assets/projects/collabai/collabai-chat-after.webp', caption: 'High-Density Chat & Real-Time Agent Streamer Interface' },
      { url: '/assets/projects/collabai/collabai-dashboard-before.webp', caption: 'Legacy Interface Before Redesign (Cluttered Neon POC)' }
    ],
    tags: ['Multi-Agent UX', 'Real-Time Streaming', 'Global Composer', 'Dark Minimal UI'],
    deliverables: [
      'Global quick composer with @agent and #tag routing',
      'Multi-model switcher supporting low-latency Groq and Gemini',
      'Ergonomic workspace navigation and token streaming UI',
      'Full TypeScript/React design system & interactive prototype'
    ],
    caseStudyUrl: 'https://sadmanportfolio.vercel.app/work/collabai-platform',
    liveUrl: 'https://collabai-redesign.onrender.com/',
    author: 'UI/UX by Sadman Zaman Khan'
  },
  {
    id: 'ephysician-redesign',
    slug: 'ephysician-redesign',
    title: 'ePhysician — AI Healthcare Platform Redesign',
    category: 'web',
    categoryLabel: 'Enterprise SaaS & Landing Page',
    year: '2026',
    summary: 'Comprehensive landing page and product UI/UX redesign for an enterprise AI front-desk automation platform serving US medical and dental clinics.',
    coverImage: '/assets/projects/ephysician/ephysician-cover.webp',
    galleryImages: [
      { url: '/assets/projects/ephysician/ephysician-cover.webp', caption: 'ePhysician Clinical Command Center & Enterprise Landing Page' },
      { url: '/assets/projects/ephysician/ephysician-hero-after.webp', caption: 'Redesigned Hero Section with Live Clinical Intake Interactive Simulator' },
      { url: '/assets/projects/ephysician/ephysician-footer-after.webp', caption: 'Conversion Footer, HIPAA Badges & Enterprise ROI Calculator' }
    ],
    tags: ['Healthcare SaaS', 'High-Conversion Landing Page', 'HIPAA Compliance', 'Design Tokens'],
    deliverables: [
      'High-contrast accessible clinical design system',
      'Interactive phone intake simulator and ROI calculator',
      'Clear HIPAA and PCI compliance validation trust badges',
      'High-converting responsive landing page architecture'
    ],
    caseStudyUrl: 'https://sadmanportfolio.vercel.app/work/ephysician-redesign',
    author: 'UI/UX by Sadman Zaman Khan'
  },
  {
    id: 'nagae-studio',
    slug: 'nagae-studio',
    title: 'NAGAE Studio — Luxury Bridal Ecosystem',
    category: 'web',
    categoryLabel: 'Luxury Retail & Admin Intelligence',
    year: '2025 – 2026',
    summary: 'Multi-surface retailer ecosystem uniting gown catalog CMS management, B2B boutique CRM pipeline tracking, showroom performance analytics, and a Stylist Mobile App with AI fitting guidance.',
    coverImage: '/assets/projects/nagae-studio/nagae-studio-cover-banner.webp',
    galleryImages: [
      { url: '/assets/projects/nagae-studio/nagae-studio-cover-banner.webp', caption: 'NAGAE Studio Luxury Bridal Platform & Ecosystem Overview' },
      { url: '/assets/projects/nagae-studio/nagae-admin-01-performance-analytics.webp', caption: 'Admin Intelligence Console — Showroom Analytics & Revenue Metrics' },
      { url: '/assets/projects/nagae-studio/nagae-crm-02-boutique-pipeline.webp', caption: 'B2B Wholesale Boutique CRM Pipeline & Order Processing' }
    ],
    tags: ['Luxury E-Commerce', 'B2B Wholesale CRM', 'Showroom Analytics', 'Stylist Mobile App'],
    deliverables: [
      'High-fashion digital showroom gown catalog',
      'B2B boutique wholesale pipeline and invoice tracking',
      'Stylist mobile application with AI-augmented bridal fitting',
      'Real-time showroom revenue analytics and admin dashboard'
    ],
    caseStudyUrl: 'https://sadmanportfolio.vercel.app/work/nagae-studio',
    author: 'Product Architecture by Sadman Zaman Khan'
  }
];
