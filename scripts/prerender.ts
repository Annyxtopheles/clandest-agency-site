import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';

const BASE_URL = 'https://clandestagency.vercel.app';

function escapeHtml(str: string | undefined | null): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function ensureDir(filePath: string) {
  const dir = dirname(filePath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

const headerHtml = `
    <header class="site-header" id="siteHeader">
      <div class="nav-container">
        <a href="/" class="brand-link" aria-label="Clandest Agency Homepage">
          <img src="/assets/logo.svg" alt="Clandest Agency logo" class="brand-logo-img">
        </a>
        <nav class="main-nav" aria-label="Main Navigation">
          <ul class="nav-list">
            <li><a href="/about" class="nav-link">About</a></li>
            <li><a href="/services" class="nav-link">Services</a></li>
            <li><a href="/process" class="nav-link">Process</a></li>
            <li><a href="/contact" class="nav-link">Contact</a></li>
          </ul>
        </nav>
        <div class="nav-action" style="display: flex; align-items: center; gap: 16px;">
          <a href="/contact" class="animated-button header-cta-btn">
            <span class="text">Work with us</span>
          </a>
        </div>
      </div>
    </header>
`;

const footerHtml = `
    <footer class="site-footer">
      <div class="container footer-container">
        <div class="footer-giant-wordmark-container">
          <h2 class="text-pressure-title" aria-label="CLANDESTAGENCY">CLANDESTAGENCY</h2>
        </div>
        <div class="footer-bottom-bar">
          <p class="copyright-text">© 2026, Clandest.agency | Handcrafted in Dhaka, Bangladesh.</p>
          <div class="footer-social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" class="social-pill-badge">Facebook</a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" class="social-pill-badge">Whatsapp</a>
            <a href="mailto:clandest.agency@gmail.com" class="social-pill-badge">Gmail</a>
          </div>
        </div>
      </div>
    </footer>
`;

function buildHomeHtml(): string {
  return `
    ${headerHtml}
    <main>
      <section class="hero-section" id="hero">
        <div class="container hero-container">
          <h1 class="hero-title">
            <span class="word-lift">We</span> <span class="word-lift">design</span> <span class="word-lift">brands,</span> <span class="word-lift">websites,</span><br><span class="word-lift">and</span> <span class="word-lift">edit</span> <span class="word-lift">marketing</span> <span class="word-lift">videos.</span>
          </h1>
          <p class="hero-subtext">
            We are four friends who met at Munshiganj Polytechnic Institute. We combine UX design, clean software engineering, and post-production video editing to build digital assets that actually work. Direct access to founders—zero middlemen.
          </p>
        </div>
      </section>

      <section class="services-section" id="services">
        <div class="container">
          <h2 class="section-heading-centered">What we can do for you.</h2>
          <div class="services-visual-grid">
            <a href="/services#video" class="service-visual-card">
              <div class="service-image-box">
                <img src="/assets/service-marketing-video.png" alt="Marketing Video Production" fetchpriority="high">
              </div>
              <div class="service-card-label">Marketing Video</div>
            </a>
            <a href="/services#branding" class="service-visual-card">
              <div class="service-image-box">
                <img src="/assets/service-brand-design.gif" alt="Logo and Brand Design" fetchpriority="high">
              </div>
              <div class="service-card-label">Logo & Brand Design</div>
            </a>
            <a href="/services#development" class="service-visual-card">
              <div class="service-image-box">
                <img src="/assets/service-web-redesign.png" alt="Website Redesign and Development" fetchpriority="high">
              </div>
              <div class="service-card-label">Website Redesign</div>
            </a>
          </div>
        </div>
      </section>

      <section class="process-overview-section" id="how-it-works">
        <div class="container">
          <h2 class="section-heading-centered">How we work with you.</h2>
          <p class="section-subtext-centered">
            A streamlined 4-step framework from initial consultation to final launch. Transparent, collaborative, and fast.
          </p>
          <div class="process-steps-list">
            <div class="process-step-item">
              <span class="process-step-number">01</span>
              <div class="process-step-body">
                <h3 class="process-step-title">We talk</h3>
                <p class="process-step-desc">Direct discovery conversation with our founding team to understand your goals, scope, and timeline.</p>
              </div>
            </div>
            <div class="process-step-item">
              <span class="process-step-number">02</span>
              <div class="process-step-body">
                <h3 class="process-step-title">We design</h3>
                <p class="process-step-desc">Interactive Figma prototypes, high-fidelity brand concepts, or video storyboards tailored to your brand.</p>
              </div>
            </div>
            <div class="process-step-item">
              <span class="process-step-number">03</span>
              <div class="process-step-body">
                <h3 class="process-step-title">We build</h3>
                <p class="process-step-desc">Clean, lightweight code and cinematic post-production video editing crafted by dedicated specialists.</p>
              </div>
            </div>
            <div class="process-step-item">
              <span class="process-step-number">04</span>
              <div class="process-step-body">
                <h3 class="process-step-title">We launch</h3>
                <p class="process-step-desc">Live deployment, DNS configuration, and handoff of all final and master source files with 100% commercial ownership.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    ${footerHtml}
  `;
}

function buildAboutHtml(): string {
  return `
    ${headerHtml}
    <main>
      <section class="about-section-new">
        <div class="container">
          <div class="subpage-hero" style="padding-top: 20px;">
            <h1 class="subpage-title">From Munshiganj Polytechnic to Clandest.</h1>
            <p class="subpage-subtext">
              We are four friends who met during our college diploma years. We combined our core strengths in UI/UX design, client strategy, software engineering, and cinematic motion graphics to build digital assets that actually work.
            </p>
          </div>

          <div class="about-narrative-row">
            <div class="about-narrative-text">
              <h3 style="font-size: 28px; color: var(--c-blue); margin-bottom: 12px; font-weight: 600;">The Origin</h3>
              <p>Our journey began at <strong>Munshiganj Polytechnic Institute</strong>, where we met for the first time while pursuing our Diplomas in Computer Technology (2021–2025). Coming from different backgrounds, contexts, and histories, we discovered a shared passion for visual aesthetics, robust engineering, and creative media.</p>
              <p>Collaborating on projects throughout our studies, we established a seamless team shorthand and standard of work.</p>
            </div>
          </div>

          <div class="about-narrative-row reverse">
            <div class="about-narrative-text">
              <h3 style="font-size: 28px; color: var(--c-blue); margin-bottom: 12px; font-weight: 600;">Leadership in Scouts</h3>
              <p>During our college years, we dedicated our energy to the <strong>Rover Scouts movement</strong>. Scouting was our testing ground for discipline, accountability, volunteer coordination, and leadership under pressure.</p>
              <p>Under Md Nafiur Rahman's leadership as Senior Rover Mate, our campus unit won national recognition, including the prestigious <strong>"Serader Sera"</strong> award at the National Rover Moot 2024, placing in the top 16 of 600+ units across Bangladesh.</p>
            </div>
          </div>

          <div class="about-narrative-row">
            <div class="about-narrative-text">
              <h3 style="font-size: 28px; color: var(--c-blue); margin-bottom: 12px; font-weight: 600;">Industrial Mastery</h3>
              <p>After our diplomas, we expanded our industry experience. Sadman and Rafayet completed their industrial attachment together at <strong>European IT Solutions in Mirpur</strong>.</p>
              <p>Working side-by-side on commercial graphics, illustration assets, and branding systems, they integrated their design and editing workflows—laying the foundation for Clandest's visual strategy.</p>
            </div>
          </div>

          <div class="founders-profile-section" style="margin-top: 60px;">
            <h2 class="section-heading-centered">The Founding Team</h2>
            <p class="hero-subtext" style="font-size: 20px; text-align: center; margin-bottom: 40px;">
              After gaining real-world industry experience, we reunited to launch Clandest Agency. We work directly with you with zero middlemen.
            </p>

            <div class="team-members-grid">
              <article class="team-member-card">
                <div class="team-name">Sadman Zaman Khan</div>
                <div class="team-role">UI/UX & Brand Design</div>
                <p>Specializes in comprehensive design systems, user flows, and brand architecture.</p>
                <a href="https://www.linkedin.com/in/sadmanzamankhan/" target="_blank" rel="noreferrer" class="card-button">LinkedIn</a>
              </article>
              <article class="team-member-card">
                <div class="team-name">Md. Habibullah</div>
                <div class="team-role">Operations & Client Relations</div>
                <p>Coordinates client communication, project timelines, and operational delivery.</p>
                <a href="https://www.linkedin.com/in/mdhabibullah-dev/" target="_blank" rel="noreferrer" class="card-button">LinkedIn</a>
              </article>
              <article class="team-member-card">
                <div class="team-name">Abdullah Al Rafayet</div>
                <div class="team-role">Head of Video & Motion</div>
                <p>Directs high-converting VSLs, commercial video ads, sound design, and color grading.</p>
                <a href="https://www.linkedin.com/in/abdullah-al-rafayet/" target="_blank" rel="noreferrer" class="card-button">LinkedIn</a>
              </article>
              <article class="team-member-card">
                <div class="team-name">Md Nafiur Rahman</div>
                <div class="team-role">Lead Frontend Engineer</div>
                <p>Builds responsive, high-performance web applications with semantic architecture.</p>
                <a href="https://www.linkedin.com/in/nafiur-rahman-5047b925b/" target="_blank" rel="noreferrer" class="card-button">LinkedIn</a>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
    ${footerHtml}
  `;
}

function buildServicesHtml(): string {
  return `
    ${headerHtml}
    <main>
      <section class="services-full-section">
        <div class="container">
          <div class="subpage-hero" style="padding-top: 20px;">
            <h1 class="subpage-title">Everything you need to launch and scale.</h1>
            <p class="subpage-subtext">
              We specialize in three core domains: high-converting marketing video post-production, comprehensive brand design, and modern website engineering.
            </p>
          </div>

          <div class="service-detail-block" id="video">
            <h2 style="font-size: 32px; color: var(--c-blue); margin-bottom: 16px;">1. Marketing Video Post-Production</h2>
            <p style="font-size: 18px; line-height: 1.6; max-width: 800px; margin-bottom: 16px;">
              Led by Abdullah Al Rafayet. We produce high-converting Video Sales Letters (VSLs), scroll-stopping short-form UGC ads, atmospheric narrative documentaries, and motion graphics designed to maximize viewer retention and direct-response sales.
            </p>
            <div class="deliverables-container">
              <h3 class="deliverables-title">What you walk away with</h3>
              <div class="deliverables-list">
                <div class="deliverable-btn">
                  <span class="deliverable-check">✓</span>
                  <span>4K Master Exports & ProRes Files</span>
                </div>
                <div class="deliverable-btn">
                  <span class="deliverable-check">✓</span>
                  <span>9:16 Vertical Cuts for TikTok & Reels</span>
                </div>
                <div class="deliverable-btn">
                  <span class="deliverable-check">✓</span>
                  <span>Studio Audio & Foley Stems</span>
                </div>
                <div class="deliverable-btn">
                  <span class="deliverable-check">✓</span>
                  <span>Complete Project Timelines Archive</span>
                </div>
              </div>
            </div>
          </div>

          <div class="service-detail-block" id="branding">
            <h2 style="font-size: 32px; color: var(--c-blue); margin-bottom: 16px;">2. Logo & Brand Identity Design</h2>
            <p style="font-size: 18px; line-height: 1.6; max-width: 800px; margin-bottom: 16px;">
              Led by Sadman Zaman Khan. We build complete, versatile visual identity systems from the ground up: primary and secondary brandmarks, color palettes, typography hierarchy, and scalable brand guidelines.
            </p>
            <div class="deliverables-container">
              <h3 class="deliverables-title">What you walk away with</h3>
              <div class="deliverables-list">
                <div class="deliverable-btn">
                  <span class="deliverable-check">✓</span>
                  <span>Master Vector Files (SVG, AI, PDF)</span>
                </div>
                <div class="deliverable-btn">
                  <span class="deliverable-check">✓</span>
                  <span>Complete Figma Brand System</span>
                </div>
                <div class="deliverable-btn">
                  <span class="deliverable-check">✓</span>
                  <span>Typography & Color Tokens</span>
                </div>
                <div class="deliverable-btn">
                  <span class="deliverable-check">✓</span>
                  <span>100% Commercial Copyright</span>
                </div>
              </div>
            </div>
          </div>

          <div class="service-detail-block" id="development">
            <h2 style="font-size: 32px; color: var(--c-blue); margin-bottom: 16px;">3. Website Redesign & Frontend Development</h2>
            <p style="font-size: 18px; line-height: 1.6; max-width: 800px; margin-bottom: 16px;">
              Led by Md Nafiur Rahman. We engineer ultra-fast, responsive websites with semantic HTML5, clean CSS/Tailwind, and modern TypeScript. Zero bloated plugins, sub-second load speeds, and full search engine indexability.
            </p>
            <div class="deliverables-container">
              <h3 class="deliverables-title">What you walk away with</h3>
              <div class="deliverables-list">
                <div class="deliverable-btn">
                  <span class="deliverable-check">✓</span>
                  <span>Clean React & TypeScript Codebase</span>
                </div>
                <div class="deliverable-btn">
                  <span class="deliverable-check">✓</span>
                  <span>Full GitHub Repo Ownership</span>
                </div>
                <div class="deliverable-btn">
                  <span class="deliverable-check">✓</span>
                  <span>Production Vercel Deployment</span>
                </div>
                <div class="deliverable-btn">
                  <span class="deliverable-check">✓</span>
                  <span>Zero Subscriptions or Vendor Lock-in</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    ${footerHtml}
  `;
}

function buildProcessHtml(): string {
  return `
    ${headerHtml}
    <main>
      <section class="approach-section">
        <div class="container">
          <div class="subpage-hero" style="padding-top: 20px;">
            <h1 class="subpage-title">How a project works with us.</h1>
            <p class="subpage-subtext">
              A direct, transparent 4-stage collaboration from kickoff to live deployment. You work directly with our founding team.
            </p>
          </div>

          <div class="approach-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 70px;">
            <div class="step-card" style="background: #FFFFFF; border: 1px solid var(--c-border); border-radius: var(--radius-card); padding: 40px 30px;">
              <h3 class="step-title" style="font-size: 28px; color: var(--c-blue); font-weight: 600; margin-bottom: 14px;">We talk</h3>
              <p class="step-desc" style="font-size: 18px; color: var(--c-text); line-height: 1.5;">
                You outline your goals, target audience, and timeline directly with us. We establish a clear, fixed quote without hidden costs or scope creep.
              </p>
            </div>
            <div class="step-card" style="background: #FFFFFF; border: 1px solid var(--c-border); border-radius: var(--radius-card); padding: 40px 30px;">
              <h3 class="step-title" style="font-size: 28px; color: var(--c-blue); font-weight: 600; margin-bottom: 14px;">We design</h3>
              <p class="step-desc" style="font-size: 18px; color: var(--c-text); line-height: 1.5;">
                We present high-fidelity brand concepts, interactive Figma prototypes, or video storyboards. We collaborate with you to refine assets until they hit the mark.
              </p>
            </div>
            <div class="step-card" style="background: #FFFFFF; border: 1px solid var(--c-border); border-radius: var(--radius-card); padding: 40px 30px;">
              <h3 class="step-title" style="font-size: 28px; color: var(--c-blue); font-weight: 600; margin-bottom: 14px;">We build</h3>
              <p class="step-desc" style="font-size: 18px; color: var(--c-text); line-height: 1.5;">
                Nafiur writes lightweight, high-performance code while Rafayet handles post-production video editing and audio mastering, ensuring rapid delivery.
              </p>
            </div>
            <div class="step-card" style="background: #FFFFFF; border: 1px solid var(--c-border); border-radius: var(--radius-card); padding: 40px 30px;">
              <h3 class="step-title" style="font-size: 28px; color: var(--c-blue); font-weight: 600; margin-bottom: 14px;">We launch</h3>
              <p class="step-desc" style="font-size: 18px; color: var(--c-text); line-height: 1.5;">
                We coordinate DNS setup, push your site live, and deliver all final and raw master files. You retain 100% full commercial ownership of everything we build.
              </p>
            </div>
          </div>

          <!-- FAQ Section -->
          <div class="faq-section" style="margin-bottom: 80px;">
            <h2 class="section-heading-centered" style="margin-bottom: 16px;">Frequently Asked Questions</h2>
            <p class="section-subtext-centered" style="max-width: 650px; margin: 0 auto 40px; textAlign: center;">
              Direct, transparent answers about timelines, deliverables, commercial rights, and how we collaborate.
            </p>
            <div class="faq-accordion-container" style="max-width: 860px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">
              <details open style="background: #FFFFFF; border: 1px solid var(--c-border, #E5E7EB); border-radius: 16px; padding: 20px 24px;">
                <summary style="font-size: 20px; font-weight: 600; color: var(--c-blue); cursor: pointer; margin-bottom: 10px;">How much does a project typically cost?</summary>
                <p style="font-size: 17px; line-height: 1.65; color: var(--c-text-muted);">We work on transparent, fixed-price project quotes based on concrete deliverables rather than ambiguous hourly rates. Once we review your scope and goals during our initial consultation, you receive a clear, fixed proposal with zero surprise invoices or scope creep.</p>
              </details>
              <details style="background: #FFFFFF; border: 1px solid var(--c-border, #E5E7EB); border-radius: 16px; padding: 20px 24px;">
                <summary style="font-size: 20px; font-weight: 600; color: var(--c-blue); cursor: pointer; margin-bottom: 10px;">How long does a typical project take?</summary>
                <p style="font-size: 17px; line-height: 1.65; color: var(--c-text-muted);">Timelines depend on scope: Direct-response marketing video edits (VSLs, UGC cuts) typically turn around in 3 to 7 days. Brand identity systems take 1 to 2 weeks. Full custom website redesigns and engineering take 2 to 4 weeks from kickoff to deployment.</p>
              </details>
              <details style="background: #FFFFFF; border: 1px solid var(--c-border, #E5E7EB); border-radius: 16px; padding: 20px 24px;">
                <summary style="font-size: 20px; font-weight: 600; color: var(--c-blue); cursor: pointer; margin-bottom: 10px;">Do we get the raw project and master source files?</summary>
                <p style="font-size: 17px; line-height: 1.65; color: var(--c-text-muted);">Yes, 100%. Upon final project completion, you receive full commercial rights and all master files: vector Figma files and design assets, raw 4K video project timelines and audio stems, or clean GitHub repository source code with zero vendor lock-in.</p>
              </details>
              <details style="background: #FFFFFF; border: 1px solid var(--c-border, #E5E7EB); border-radius: 16px; padding: 20px 24px;">
                <summary style="font-size: 20px; font-weight: 600; color: var(--c-blue); cursor: pointer; margin-bottom: 10px;">How do revisions and feedback work?</summary>
                <p style="font-size: 17px; line-height: 1.65; color: var(--c-text-muted);">Feedback is direct and collaborative. You work directly with the makers (Sadman for branding, Nafiur for web, Rafayet for video). We use collaborative platforms like Figma, Frame.io, and direct WhatsApp/Slack channels to iterate rapidly until every asset is pixel-perfect.</p>
              </details>
              <details style="background: #FFFFFF; border: 1px solid var(--c-border, #E5E7EB); border-radius: 16px; padding: 20px 24px;">
                <summary style="font-size: 20px; font-weight: 600; color: var(--c-blue); cursor: pointer; margin-bottom: 10px;">Can we meet before committing to work together?</summary>
                <p style="font-size: 17px; line-height: 1.65; color: var(--c-text-muted);">Absolutely. We encourage a direct 15-minute intro conversation via Google Meet or WhatsApp call with our founding team to align on your goals, assess fit, and answer any questions before you invest a single dollar.</p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </main>
    ${footerHtml}
  `;
}

function buildContactHtml(): string {
  return `
    ${headerHtml}
    <main>
      <section class="contact-section" id="contact" style="padding-top: 20px;">
        <div class="container">
          <div class="subpage-hero" style="padding-top: 20px;">
            <h1 class="subpage-title">Ready to build something?</h1>
            <p class="subpage-subtext">
              We work directly with you—no account managers, no layers of bureaucracy. Drop us a line about your brand, dev, or video needs.
            </p>
          </div>

          <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; margin-bottom: 40px;">
            <a href="https://wa.me/8801869504388?text=Hi%20Clandest%20Agency,%20I'd%20like%20to%20discuss%20a%20project!" target="_blank" rel="noopener noreferrer" class="social-pill-badge" style="padding: 12px 24px; font-size: 15px; background-color: #25D366; color: #FFFFFF; border: none; font-weight: 600;">
              Chat on WhatsApp
            </a>
            <a href="mailto:clandest.agency@gmail.com?subject=15-Minute%20Intro%20Call%20Request%20(Google%20Meet)&body=Hi%20Clandest%20Team,%0A%0AI'd%20like%20to%20schedule%20a%20quick%2015-minute%20intro%20call%20via%20Google%20Meet.%0A%0APreferred%20Date%20/%20Time%20(with%20timezone):%20" class="social-pill-badge" style="padding: 12px 24px; font-size: 15px; border: 1.5px solid var(--c-blue); color: var(--c-blue); font-weight: 600;">
              Book 15-Min Google Meet
            </a>
            <a href="mailto:clandest.agency@gmail.com" class="social-pill-badge" style="padding: 12px 24px; font-size: 15px;">
              <span>clandest.agency@gmail.com</span>
            </a>
          </div>

          <div class="contact-card-box" style="max-width: 650px; margin: 0 auto;">
            <form action="https://api.web3forms.com/submit" method="POST" class="contact-form">
              <input type="hidden" name="access_key" value="7e1c8d5c-d3fe-4228-a6d1-4dbfa4a1329a">
              <input type="checkbox" name="botcheck" class="hidden" style="display: none;">
              <div class="form-row-2col">
                <input type="text" name="name" placeholder="Your name" required class="form-input">
                <input type="email" name="email" placeholder="Your email" required class="form-input">
              </div>
              <textarea name="message" rows="5" placeholder="Tell us about your project" required class="form-textarea"></textarea>
              <button type="submit" class="animated-button submit-btn">
                <span class="text">Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
    ${footerHtml}
  `;
}

function updateHtmlTags(
  templateHtml: string,
  options: {
    title: string;
    description: string;
    url: string;
    image?: string;
    contentHtml: string;
    jsonLd?: object;
  }
): string {
  let html = templateHtml;

  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(options.title)}</title>`);

  html = html.replace(
    /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(options.description)}">`
  );

  const imageUrl = options.image || `${BASE_URL}/assets/team-main.jpg`;

  const headExtra = `
    <link rel="canonical" href="${escapeHtml(options.url)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Clandest Agency" />
    <meta property="og:title" content="${escapeHtml(options.title)}" />
    <meta property="og:description" content="${escapeHtml(options.description)}" />
    <meta property="og:url" content="${escapeHtml(options.url)}" />
    <meta property="og:image" content="${escapeHtml(imageUrl)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(options.title)}" />
    <meta name="twitter:description" content="${escapeHtml(options.description)}" />
    <meta name="twitter:image" content="${escapeHtml(imageUrl)}" />
    ${options.jsonLd ? `<script type="application/ld+json">${JSON.stringify(options.jsonLd)}</script>` : ""}
  </head>`;
  html = html.replace(/<\/head>/i, headExtra);

  html = html.replace('<div id="root"></div>', `<div id="root">${options.contentHtml}</div>`);

  return html;
}

export function prerender() {
  const distDir = resolve('dist');
  const templatePath = resolve(distDir, 'index.html');

  if (!existsSync(templatePath)) {
    console.error('dist/index.html not found! Run vite build first.');
    process.exit(1);
  }

  const templateHtml = readFileSync(templatePath, 'utf-8');
  let count = 0;

  const sharedOrgLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    'name': 'Clandest Agency',
    'url': BASE_URL,
    'logo': `${BASE_URL}/assets/logo.svg`,
    'description': 'A design, development, and video post-production studio in Dhaka, Bangladesh.',
    'email': 'clandest.agency@gmail.com',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Dhaka',
      'addressCountry': 'Bangladesh'
    },
    'founder': [
      { '@type': 'Person', 'name': 'Sadman Zaman Khan', 'jobTitle': 'UI/UX & Brand Design' },
      { '@type': 'Person', 'name': 'Md Nafiur Rahman', 'jobTitle': 'Lead Frontend Engineer' },
      { '@type': 'Person', 'name': 'Abdullah Al Rafayet', 'jobTitle': 'Head of Video Post-Production' },
      { '@type': 'Person', 'name': 'Md Habibullah', 'jobTitle': 'Operations & Client Relations' }
    ]
  };

  // 1. Prerender / (Home)
  const homeHtml = updateHtmlTags(templateHtml, {
    title: 'Clandest Agency — Design, Dev & Video Studio',
    description: 'A design, development, and video post-production studio in Dhaka. We build clean brand systems, custom websites, and high-converting marketing videos.',
    url: `${BASE_URL}/`,
    image: `${BASE_URL}/assets/team-main.jpg`,
    contentHtml: buildHomeHtml(),
    jsonLd: sharedOrgLd
  });
  writeFileSync(resolve(distDir, 'index.html'), homeHtml, 'utf-8');
  count++;

  // 2. Prerender /about
  const aboutHtml = updateHtmlTags(templateHtml, {
    title: 'About Us — Clandest Agency | Dhaka, Bangladesh',
    description: 'Meet the four founders of Clandest Agency. From Munshiganj Polytechnic Institute to Rover Scouts leadership and European IT Solutions attachment.',
    url: `${BASE_URL}/about`,
    image: `${BASE_URL}/assets/team-main.jpg`,
    contentHtml: buildAboutHtml(),
    jsonLd: {
      ...sharedOrgLd,
      '@type': 'AboutPage'
    }
  });
  const aboutPath = resolve(distDir, 'about', 'index.html');
  ensureDir(aboutPath);
  writeFileSync(aboutPath, aboutHtml, 'utf-8');
  count++;

  // 3. Prerender /services
  const servicesHtml = updateHtmlTags(templateHtml, {
    title: 'Services & Portfolio — Clandest Agency',
    description: 'Explore our core capabilities: Direct-response marketing video post-production (VSLs, UGC ads, documentaries), brand identity design, and custom web development.',
    url: `${BASE_URL}/services`,
    image: `${BASE_URL}/assets/service-marketing-video.png`,
    contentHtml: buildServicesHtml(),
    jsonLd: {
      ...sharedOrgLd,
      '@type': 'Service'
    }
  });
  const servicesPath = resolve(distDir, 'services', 'index.html');
  ensureDir(servicesPath);
  writeFileSync(servicesPath, servicesHtml, 'utf-8');
  count++;

  // 4. Prerender /process
  const processHtml = updateHtmlTags(templateHtml, {
    title: 'Our 4-Step Process & FAQs — Clandest Agency',
    description: 'A direct, transparent 4-stage collaboration framework from kickoff to live deployment. Explore frequently asked questions regarding scope, timelines, and deliverables.',
    url: `${BASE_URL}/process`,
    image: `${BASE_URL}/assets/service-web-redesign.png`,
    contentHtml: buildProcessHtml(),
    jsonLd: {
      ...sharedOrgLd,
      '@type': 'FAQPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How much does a project typically cost?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'We work on transparent, fixed-price project quotes based on concrete deliverables rather than ambiguous hourly rates. Once we review your scope and goals during our initial consultation, you receive a clear, fixed proposal with zero surprise invoices or scope creep.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How long does a typical project take?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Timelines depend on scope: Direct-response marketing video edits (VSLs, UGC cuts) typically turn around in 3 to 7 days. Brand identity systems take 1 to 2 weeks. Full custom website redesigns and engineering take 2 to 4 weeks from kickoff to deployment.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do we get the raw project and master source files?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes, 100%. Upon final project completion, you receive full commercial rights and all master files: vector Figma files and design assets, raw 4K video project timelines and audio stems, or clean GitHub repository source code with zero vendor lock-in.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How do revisions and feedback work?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Feedback is direct and collaborative. You work directly with the makers (Sadman for branding, Nafiur for web, Rafayet for video). We use collaborative platforms like Figma, Frame.io, and direct WhatsApp/Slack channels to iterate rapidly until every asset is pixel-perfect.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can we meet before committing to work together?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Absolutely. We encourage a direct 15-minute intro conversation via Google Meet or WhatsApp call with our founding team to align on your goals, assess fit, and answer any questions before you invest a single dollar.'
          }
        }
      ]
    }
  });
  const processPath = resolve(distDir, 'process', 'index.html');
  ensureDir(processPath);
  writeFileSync(processPath, processHtml, 'utf-8');
  count++;

  // 5. Prerender /contact
  const contactHtml = updateHtmlTags(templateHtml, {
    title: 'Contact Us — Clandest Agency | Start a Project',
    description: 'Get in touch directly with the founders of Clandest Agency for brand identity, custom web development, or video post-production.',
    url: `${BASE_URL}/contact`,
    image: `${BASE_URL}/assets/team-main.jpg`,
    contentHtml: buildContactHtml(),
    jsonLd: {
      ...sharedOrgLd,
      '@type': 'ContactPage'
    }
  });
  const contactPath = resolve(distDir, 'contact', 'index.html');
  ensureDir(contactPath);
  writeFileSync(contactPath, contactHtml, 'utf-8');
  count++;

  console.log(`[prerender] Successfully generated ${count} static crawlable SSG HTML pages in dist/!`);
}

prerender();