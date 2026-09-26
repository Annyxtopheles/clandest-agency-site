export interface ProjectGalleryImage {
  url: string;
  caption: string;
  comparison?: {
    beforeImage: string;
    afterImage: string;
    beforeLabel?: string;
    afterLabel?: string;
  };
}

export interface ServiceProjectItem {
  id: string;
  slug: string;
  title: string;
  category: 'branding' | 'web';
  summary: string;
  coverImage: string;
  galleryImages: ProjectGalleryImage[];
  deliverables: string[];
  liveUrl?: string;
  author: string;
}

export const BRANDING_PROJECTS: ServiceProjectItem[] = [
  {
    id: 'noborangi',
    slug: 'noborangi',
    title: 'Noborangi Brand Identity',
    category: 'branding',
    summary: 'High-contrast editorial serif logotype with starry diacritical accents, a rich crimson and cream color architecture, luxury retail packaging, boutique architectural facade signage, split-tone merchandise, corporate stationery, and mobile application iconography.',
    coverImage: '/assets/projects/noborangi/noborangi-banner-cover.webp',
    galleryImages: [
      { url: '/assets/projects/noborangi/noborangi-banner-cover.webp', caption: 'Noborangi Brand Overview & Editorial Banner' },
      { url: '/assets/projects/noborangi/noborangi-01-logo-tagline.webp', caption: 'Primary Wordmark with 4-Point Star Accent & Tagline' },
      { url: '/assets/projects/noborangi/noborangi-02-business-cards.webp', caption: 'Executive Editorial Stationery & Foil-Stamped Business Cards' },
      { url: '/assets/projects/noborangi/noborangi-03-blade-signage.webp', caption: 'Boutique Exterior Blade Signage & Street Architecture' },
      { url: '/assets/projects/noborangi/noborangi-04-apparel-merchandise.webp', caption: 'Embroidered Apparel & Lifestyle Merchandise Collection' },
      { url: '/assets/projects/noborangi/noborangi-05-storefront-facade.webp', caption: 'Flagship Storefront Facade & Architectural Canopy Mockup' },
      { url: '/assets/projects/noborangi/noborangi-06-luxury-shopping-bag.webp', caption: 'Luxury Retail Packaging & Sustainable Kraft Shopping Bags' },
      { url: '/assets/projects/noborangi/noborangi-07-stationery-suite.webp', caption: 'Complete Executive Brand Collateral & Stationery Suite' },
      { url: '/assets/projects/noborangi/noborangi-08-retail-packaging-bags.webp', caption: 'Retail Paper Bag Assortment in Charcoal and Crimson' },
      { url: '/assets/projects/noborangi/noborangi-09-mobile-app-icon.webp', caption: 'Mobile Application Iconography & Digital App Touchpoints' }
    ],
    deliverables: [
      'Primary wordmark with custom four-pointed star',
      'Luxury retail packaging and shopping bag suite',
      'Boutique architectural storefront blade signage',
      'Editorial stationery, business cards, and merchandise'
    ],
    author: 'Designed by Sadman Zaman Khan'
  },
  {
    id: 'nexura-brand-system',
    slug: 'nexura-brand-system',
    title: 'NEXURA Corporate Identity & Design System',
    category: 'branding',
    summary: 'Comprehensive corporate brand guidelines manual engineered for NEXURA Consulting & Tech Solutions Ltd. Details geometric logo construction, clearspace and alignment grids, color architecture, typography standards, and brand application standards across print collateral and corporate merchandise.',
    coverImage: '/assets/projects/nexura/nexura-guidelines-01-cover.webp',
    galleryImages: [
      { url: '/assets/projects/nexura/nexura-guidelines-01-cover.webp', caption: 'NEXURA Brand Guidelines Manual Cover' },
      { url: '/assets/projects/nexura/nexura-guidelines-02-construction.webp', caption: 'Logo Construction, Mathematical Grids & Clearspace Alignment Rules' },
      { url: '/assets/projects/nexura/nexura-guidelines-03-symbolism.webp', caption: 'Hexagonal Monogram Geometry, Symbolism & Icon Philosophy' },
      { url: '/assets/projects/nexura/nexura-guidelines-04-palette-typography.webp', caption: 'Color Architecture (Aqua Cyan, Slate Gray) & Typography Hierarchy' },
      { url: '/assets/projects/nexura/nexura-guidelines-stationery-specs.webp', caption: 'Office Stationery Brand Standards (Letterhead, Notebook, Invoice, Envelope)' },
      { url: '/assets/projects/nexura/nexura-guidelines-marketing-specs.webp', caption: 'Marketing & Editorial Collateral Standards (Flyer, Magazine, Brochure, Web Banner)' },
      { url: '/assets/projects/nexura/nexura-guidelines-id-calendar-specs.webp', caption: 'Corporate ID Cards, Business Cards & Calendar Standards' },
      { url: '/assets/projects/nexura/nexura-guidelines-products-specs.webp', caption: 'Corporate Product Ecosystem Standards (Mug, Pens, Cap, Backpack, Notebook)' },
      { url: '/assets/projects/nexura/nexura-guidelines-apparel-specs.webp', caption: 'Athletic & Corporate Apparel Standards (Jacket, Jersey, Polo, Sweatshirt)' },
      { url: '/assets/projects/nexura/nexura-cover-thumbnail.webp', caption: 'NEXURA Brand System Overview Thumbnail' }
    ],
    deliverables: [
      'Mathematical logo construction grids & clearspace rules',
      'Comprehensive digital brand manual & guidelines',
      'Typography hierarchy and verified color tokens',
      'Corporate stationery, apparel, and merchandise specifications'
    ],
    author: 'Designed by Sadman Zaman Khan'
  },
  {
    id: 'control-tower-products',
    slug: 'control-tower-products',
    title: 'Control Tower Enterprise AI Product Identities',
    category: 'branding',
    summary: 'Full brand identity, custom logo marks, domain-specific color palettes, OpenGraph card architecture, clinical UI design, and commercial sales enablement decks for 10+ vertical AI enterprise products.',
    coverImage: '/assets/projects/control-tower/og-agency-control-tower.webp',
    galleryImages: [
      { url: '/assets/projects/control-tower/og-agency-control-tower.webp', caption: 'Agency Control Tower — Faceted crown emblem & midnight cobalt theme' },
      { url: '/assets/projects/control-tower/og-ephysician-control-tower.webp', caption: 'ePhysician Control Tower — Custom EKG pulse wave logo & clinical cyan' },
      { url: '/assets/projects/control-tower/og-mortgage-ai.webp', caption: 'Mortgage AI — Geometric house mark & emerald/slate scheme' },
      { url: '/assets/projects/control-tower/og-marketing-control-tower.webp', caption: 'Marketing Control Tower — Ascending growth wave mark & violet ambient palette' },
      { url: '/assets/projects/control-tower/og-hr-control-tower.webp', caption: 'HR Control Tower — Connected human figure logo & neural network gradient' },
      { url: '/assets/projects/control-tower/og-realtorhelp-control-tower.webp', caption: 'RealtorHelp — Residential icon & azure topographic contours' },
      { url: '/assets/projects/control-tower/og-nonprofit-control-tower.webp', caption: 'NonProfit AI Control Tower — Botanical spring green palette & brain emblem' },
      { url: '/assets/projects/control-tower/og-ghl-developer-control-tower.webp', caption: 'GHL Developer Control Tower — Faceted ribbon mark & neon constellation nodes' },
      { url: '/assets/projects/control-tower/og-client-success-control-tower.webp', caption: 'Client Success Control Tower — Circular target gauge emblem & amber gold theme' },
      { url: '/assets/projects/control-tower/og-restaurant-ai-control-tower.webp', caption: 'Restaurant AI Control Tower — Crossed cutlery gold mark & warm charcoal palette' },
      { url: '/assets/projects/control-tower/ephysician-ad-04-voicemails-dark-ui.webp', caption: 'Automated SMS/Voice Clinic Workflow (Dark Mode UI)' },
      { url: '/assets/projects/control-tower/ephysician-ad-01-voicemails-light-ui.webp', caption: 'Clinical Tablet Perspective — Patient Queue & Insurance Verification' },
      { url: '/assets/projects/control-tower/ephysician-ad-02-multi-site-daylight.webp', caption: 'Multi-Facility Healthcare Campus — Scalable Centralized Deployment' },
      { url: '/assets/projects/control-tower/ephysician-ad-03-multi-site-night.webp', caption: '24/7 Nocturnal Clinic Coverage & Automated Patient Intake' },
      { url: '/assets/projects/control-tower/ephysician-ad-05-front-desk-never-sleeps.webp', caption: 'Continuous Patient Intake 3D Concept Architecture' }
    ],
    deliverables: [
      '10+ unified domain-specific product logo marks',
      'Modular enterprise color architecture and dark UI tokens',
      'Commercial sales enablement presentation decks',
      'High-impact social OpenGraph visual cards'
    ],
    author: 'Designed by Sadman Zaman Khan'
  }
];

export const WEB_PROJECTS: ServiceProjectItem[] = [
  {
    id: 'collabai-platform',
    slug: 'collabai-platform',
    title: 'CollabAI — Multi-Agent Workspace Redesign',
    category: 'web',
    summary: 'Full UI/UX redesign of CollabAI\'s multi-agent collaboration platform, replacing a cluttered neon interface with a minimal dark workspace featuring multi-model streaming (Groq, Gemini, OpenRouter), agent orchestration, and in-context tool execution.',
    coverImage: '/assets/projects/collabai/collabai-mockup.webp',
    galleryImages: [
      { 
        url: '/assets/projects/collabai/collabai-dashboard-after.webp', 
        caption: 'Core Platform Dashboard',
        comparison: {
          beforeImage: '/assets/projects/collabai/collabai-dashboard-before.webp',
          afterImage: '/assets/projects/collabai/collabai-dashboard-after.webp'
        }
      },
      { 
        url: '/assets/projects/collabai/collabai-chat-after.webp', 
        caption: 'Conversational Reasoning Canvas',
        comparison: {
          beforeImage: '/assets/projects/collabai/collabai-chat-before.webp',
          afterImage: '/assets/projects/collabai/collabai-chat-after.webp'
        }
      },
      { 
        url: '/assets/projects/collabai/collabai-mockup.webp', 
        caption: 'CollabAI Multi-Agent Workspace' 
      }
    ],
    deliverables: [
      'Global quick composer with @agent and #tag routing',
      'Multi-model switcher supporting low-latency Groq and Gemini',
      'Ergonomic workspace navigation and token streaming UI',
      'Full TypeScript/React design system & interactive prototype'
    ],
    liveUrl: 'https://collabai-redesign.onrender.com/',
    author: 'UI/UX by Sadman Zaman Khan'
  },
  {
    id: 'ephysician-redesign',
    slug: 'ephysician-redesign',
    title: 'ePhysician — AI Healthcare Platform Redesign',
    category: 'web',
    summary: 'Comprehensive landing page and product UI/UX redesign for ePhysician — an enterprise AI front-desk automation platform powered by Collab AI for US medical and dental clinics. Replaces a fragmented, low-contrast legacy interface with an immersive clinical command center experience.',
    coverImage: '/assets/projects/ephysician/ephysician-cover.webp',
    galleryImages: [
      { 
        url: '/assets/projects/ephysician/ephysician-hero-after.webp', 
        caption: 'Clinical Intake Simulator & Hero',
        comparison: {
          beforeImage: '/assets/projects/ephysician/ephysician-hero-before.webp',
          afterImage: '/assets/projects/ephysician/ephysician-hero-after.webp'
        }
      },
      { 
        url: '/assets/projects/ephysician/ephysician-footer-after.webp', 
        caption: 'Conversion Architecture & ROI Calculator',
        comparison: {
          beforeImage: '/assets/projects/ephysician/ephysician-footer-before.webp',
          afterImage: '/assets/projects/ephysician/ephysician-footer-after.webp'
        }
      },
      { 
        url: '/assets/projects/ephysician/ephysician-cover.webp', 
        caption: 'ePhysician Healthcare Platform' 
      }
    ],
    deliverables: [
      'High-contrast accessible clinical design system',
      'Interactive phone intake simulator and ROI calculator',
      'Clear HIPAA and PCI compliance validation trust badges',
      'High-converting responsive landing page architecture'
    ],
    author: 'UI/UX by Sadman Zaman Khan'
  },
  {
    id: 'nagae-studio',
    slug: 'nagae-studio',
    title: 'NAGAE Studio — Luxury Bridal Ecosystem',
    category: 'web',
    summary: 'Comprehensive multi-surface retailer ecosystem and administrative intelligence platform designed for NAGAE Studio—a modern luxury bridal brand. Unites gown catalog CMS management, B2B wholesale boutique CRM pipeline tracking, real-time showroom performance analytics, and an in-suite Stylist Mobile App with interactive AI fitting guidance.',
    coverImage: '/assets/projects/nagae-studio/nagae-studio-cover-banner.webp',
    galleryImages: [
      { url: '/assets/projects/nagae-studio/nagae-studio-cover-banner.webp', caption: 'NAGAE Studio Luxury Bridal Platform & Ecosystem Overview' },
      { url: '/assets/projects/nagae-studio/nagae-admin-01-performance-analytics.webp', caption: 'Admin Intelligence Console — Showroom Analytics & Revenue Metrics' },
      { url: '/assets/projects/nagae-studio/nagae-admin-02-ai-knowledge-base.webp', caption: 'Admin Management — NAGAE AI Knowledge Base & Stylist Telemetry' },
      { url: '/assets/projects/nagae-studio/nagae-admin-03-product-catalog.webp', caption: 'Product Catalog — Luxury Bridal Gown Inventory Matrix' },
      { url: '/assets/projects/nagae-studio/nagae-admin-04-add-product.webp', caption: 'Product Creator — Fabric & Silhouette Attribute Tagger' },
      { url: '/assets/projects/nagae-studio/nagae-crm-01-system-integrations.webp', caption: 'CRM Intelligence — Connectors & Multi-Channel Integrations' },
      { url: '/assets/projects/nagae-studio/nagae-crm-02-boutique-pipeline.webp', caption: 'CRM Pipeline — Boutique Deal Kanban & Wholesale Account Tracking' },
      { url: '/assets/projects/nagae-studio/nagae-stylist-01-ask-ai-mobile.webp', caption: 'Stylist Mobile App — Ask NAGAE AI Interactive Bridal Fitting Assistant' },
      { url: '/assets/projects/nagae-studio/nagae-stylist-02-profile-leaderboard.webp', caption: 'Stylist Mobile App — Certification Badges & Performance Leaderboard' }
    ],
    deliverables: [
      'High-fashion digital showroom gown catalog',
      'B2B boutique wholesale pipeline and invoice tracking',
      'Stylist mobile application with AI-augmented bridal fitting',
      'Real-time showroom revenue analytics and admin dashboard'
    ],
    author: 'Product Architecture by Sadman Zaman Khan'
  }
];
