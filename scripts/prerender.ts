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

function getHeaderHtml(activePath: string = ''): string {
  return `
    <header class="site-header" id="siteHeader">
      <div class="nav-container">
        <a href="/" class="brand-link" aria-label="Clandest Agency Homepage">
          <img src="/assets/logo.svg" alt="Clandest Agency logo" class="brand-logo-img">
        </a>
        <nav class="main-nav" aria-label="Main Navigation">
          <ul class="nav-list">
            <li><a href="/about" class="nav-link ${activePath === '/about' ? 'active' : ''}">About</a></li>
            <li><a href="/services" class="nav-link ${activePath === '/services' ? 'active' : ''}">Services</a></li>
            <li><a href="/process" class="nav-link ${activePath === '/process' ? 'active' : ''}">Process</a></li>
            <li><a href="/contact" class="nav-link ${activePath === '/contact' ? 'active' : ''}">Contact</a></li>
          </ul>
        </nav>
        <div class="nav-action" style="display: flex; align-items: center; gap: 16px;">
          <a href="/contact" class="animated-button header-cta-btn">
            <span class="text">Work with us</span>
          </a>
        </div>
        <button
          type="button"
          class="mobile-menu-toggle"
          aria-label="Open navigation menu"
          aria-expanded="false"
          aria-controls="mobileNavDrawer"
        >
          <span class="hamburger-box">
            <span class="hamburger-line top"></span>
            <span class="hamburger-line middle"></span>
            <span class="hamburger-line bottom"></span>
          </span>
        </button>
      </div>
      <div id="mobileNavDrawer" class="mobile-nav-drawer" aria-hidden="true">
        <div class="mobile-nav-inner">
          <nav class="mobile-nav-menu" aria-label="Mobile Navigation">
            <ul class="mobile-nav-list">
              <li><a href="/about" class="mobile-nav-link ${activePath === '/about' ? 'active' : ''}">About</a></li>
              <li><a href="/services" class="mobile-nav-link ${activePath === '/services' ? 'active' : ''}">Services</a></li>
              <li><a href="/process" class="mobile-nav-link ${activePath === '/process' ? 'active' : ''}">Process</a></li>
              <li><a href="/contact" class="mobile-nav-link ${activePath === '/contact' ? 'active' : ''}">Contact</a></li>
            </ul>
          </nav>
          <div class="mobile-nav-cta">
            <a href="/contact" class="animated-button header-cta-btn mobile-cta-btn">
              <span class="text">Work with us</span>
            </a>
          </div>
          <div class="mobile-nav-contact-info">
            <a href="mailto:clandest.agency@gmail.com" class="mobile-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              clandest.agency@gmail.com
            </a>
            <a href="tel:+8801886373307" class="mobile-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              +880 1886-373307
            </a>
          </div>
        </div>
      </div>
    </header>
`;
}

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
    ${getHeaderHtml('/')}
    <main>
      <section class="hero-section" id="hero">
        <div class="container hero-container">
          <h1 class="hero-title">
            <span class="word-lift">We</span> <span class="word-lift">design</span> <span class="word-lift">brands,</span> <span class="word-lift">websites,</span><br><span class="word-lift">and</span> <span class="word-lift">edit</span> <span class="word-lift">marketing</span> <span class="word-lift">videos.</span>
          </h1>
          <p class="hero-subtext">
            We are college friends who met at Munshiganj Polytechnic Institute. We combine UX design, clean software engineering, and post-production video editing to build digital assets that actually work. Direct access to founders—zero middlemen.
          </p>
        </div>
      </section>

      <section class="services-section" id="services">
        <div class="container">
          <h2 class="section-heading-centered">What we can do for you.</h2>
          <div class="services-visual-grid">
            <a href="/services#video" class="service-visual-card">
              <div class="service-image-box">
                <img src="/assets/service-marketing-video.webp" alt="Marketing Video Production" width="928" height="800" fetchpriority="high">
              </div>
              <div class="service-card-label">Marketing Video</div>
            </a>
            <a href="/services#branding" class="service-visual-card">
              <div class="service-image-box">
                <img src="/assets/service-brand-design.webp" alt="Logo and Brand Design" width="928" height="800" fetchpriority="high">
              </div>
              <div class="service-card-label">Logo & Brand Design</div>
            </a>
            <a href="/services#development" class="service-visual-card">
              <div class="service-image-box">
                <img src="/assets/service-web-redesign.webp" alt="Website Redesign and Development" width="928" height="800" fetchpriority="high">
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
    ${getHeaderHtml('/about')}
    <main>
      <section class="about-section-new">
        <div class="container">
          <div class="subpage-hero" style="padding-top: 20px;">
            <h1 class="subpage-title">From Munshiganj Polytechnic to Clandest.</h1>
            <p class="subpage-subtext">
              We are college friends who met during our diploma years. We combined our core strengths in UI/UX design, modern software engineering, and cinematic motion graphics to build digital assets that actually work.
            </p>
          </div>

          <div class="about-narrative-row">
            <div class="about-narrative-text">
              <h2 style="font-size: 28px; color: var(--c-blue); margin-bottom: 12px; font-weight: 600;">The Origin</h2>
              <p>Our journey began at <strong>Munshiganj Polytechnic Institute</strong>, where we met for the first time while pursuing our Diplomas in Computer Technology (2021–2025). Coming from different backgrounds, contexts, and histories, we discovered a shared passion for visual aesthetics, robust engineering, and creative media.</p>
              <p>Collaborating on projects throughout our studies, we established a seamless team shorthand and standard of work.</p>
            </div>
            <div class="about-image-box">
              <img
                src="/assets/team-main.webp"
                alt="Clandest Agency Founders at Munshiganj Polytechnic"
                width="1024"
                height="769"
                loading="lazy"
              />
            </div>
          </div>

          <div class="about-narrative-row reverse">
            <div class="about-image-box">
              <img
                src="/assets/about-scouts.webp"
                alt="Bangladesh Rover Scouts Unit Serader Sera National Award"
                width="1024"
                height="853"
                loading="lazy"
              />
            </div>
            <div class="about-narrative-text">
              <h2 style="font-size: 28px; color: var(--c-blue); margin-bottom: 12px; font-weight: 600;">Leadership in Scouts</h2>
              <p>During our college years, we dedicated our energy to the <strong>Rover Scouts movement</strong>. Scouting was our testing ground for discipline, accountability, volunteer coordination, and leadership under pressure.</p>
              <p>Under Md Nafiur Rahman's leadership as Senior Rover Mate, our campus unit won national recognition, including the prestigious <strong>"Serader Sera"</strong> award at the National Rover Moot 2024, placing in the top 16 of 600+ units across Bangladesh.</p>
            </div>
          </div>

          <div class="about-narrative-row">
            <div class="about-narrative-text">
              <h2 style="font-size: 28px; color: var(--c-blue); margin-bottom: 12px; font-weight: 600;">Industrial Mastery</h2>
              <p>After our diplomas, we expanded our industry experience. Sadman and Rafayet completed their industrial attachment together at <strong>European IT Solutions in Mirpur</strong>.</p>
              <p>Working side-by-side on commercial graphics, illustration assets, and branding systems, they integrated their design and editing workflows—laying the foundation for Clandest's visual strategy.</p>
            </div>
            <div class="about-image-box">
              <img
                src="/assets/about-industrial.webp"
                alt="Clandest Agency Founders"
                width="1024"
                height="768"
                loading="lazy"
              />
            </div>
          </div>

          <div class="founders-profile-section" style="margin-top: 60px;">
            <h2 class="section-heading-centered">The Founding Team</h2>
            <p class="hero-subtext" style="font-size: 20px; text-align: center; margin-bottom: 40px;">
              After gaining real-world industry experience, we reunited to launch Clandest Agency. We work directly with you with zero middlemen.
            </p>

            <div class="team-members-grid">
              <div class="team-member-card">
                <div class="team-portrait-box">
                  <img src="/assets/team-sadman.webp" alt="Sadman Zaman Khan" width="672" height="888" loading="lazy" />
                </div>
                <h3 class="team-name">Sadman Zaman Khan</h3>
                <div class="team-role">UI/UX &amp; Brand Design</div>
                <div class="team-member-links">
                  <a href="https://sadmanportfolio.vercel.app/" target="_blank" rel="noreferrer" class="team-link-btn portfolio-btn" aria-label="Sadman Zaman Khan Portfolio">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Portfolio
                  </a>
                  <a href="https://www.linkedin.com/in/sadmanzamankhan/" target="_blank" rel="noreferrer" class="team-link-btn linkedin-btn" aria-label="Sadman Zaman Khan LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>

              <div class="team-member-card">
                <div class="team-portrait-box">
                  <img src="/assets/team-nafiur.webp" alt="Md. Nafiur Rahman" width="672" height="888" loading="lazy" />
                </div>
                <h3 class="team-name">Md. Nafiur Rahman</h3>
                <div class="team-role">Web Development &amp; AI</div>
                <div class="team-member-links">
                  <a href="https://md-nafiur-rahman-portfolio.vercel.app/" target="_blank" rel="noreferrer" class="team-link-btn portfolio-btn" aria-label="Md. Nafiur Rahman Portfolio">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Portfolio
                  </a>
                  <a href="https://www.linkedin.com/in/md-nafiur-rahman/" target="_blank" rel="noreferrer" class="team-link-btn linkedin-btn" aria-label="Md. Nafiur Rahman LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>

              <div class="team-member-card">
                <div class="team-portrait-box">
                  <img src="/assets/team-rafayet.webp" alt="Md. Abdullah al Rafayet" width="672" height="888" loading="lazy" />
                </div>
                <h3 class="team-name">Md. Abdullah al Rafayet</h3>
                <div class="team-role">Video &amp; Motion Graphics</div>
                <div class="team-member-links">
                  <a href="https://www.youtube.com/@abdullahrafayet1711" target="_blank" rel="noreferrer" class="team-link-btn portfolio-btn" aria-label="Md. Abdullah al Rafayet Showreel">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Portfolio
                  </a>
                  <a href="https://www.linkedin.com/in/md-abdullah-245448293/" target="_blank" rel="noreferrer" class="team-link-btn linkedin-btn" aria-label="Md. Abdullah al Rafayet LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    LinkedIn
                  </a>
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

function buildServicesHtml(): string {
  return `
    ${getHeaderHtml('/services')}
    <main>
      <section class="services-full-section">
        <div class="container">
          <div class="subpage-hero" style="padding-top: 20px;">
            <h1 class="subpage-title">Creative Agency Services & Capabilities</h1>
            <p class="subpage-subtext">
              From creative brand design systems and high-converting marketing video post-production to modern custom web engineering. Work directly with founders with deep craft.
            </p>
          </div>

          <!-- 3 Categories Selector -->
          <div class="services-visual-grid services-category-selector" style="margin-bottom: 60px;">
            <a href="#video-portfolio" class="service-visual-card active-service-card" style="text-decoration: none;">
              <div class="service-image-box">
                <img src="/assets/service-marketing-video.webp" alt="Marketing Video Production" width="928" height="800" fetchpriority="high">
              </div>
              <div class="service-card-label">
                <span>Marketing Video</span>
              </div>
            </a>
            <a href="#branding" class="service-visual-card" style="text-decoration: none;">
              <div class="service-image-box">
                <img src="/assets/service-brand-design.webp" alt="Logo & Brand Design" width="928" height="800" fetchpriority="high">
              </div>
              <div class="service-card-label">
                <span>Logo & Brand Design</span>
              </div>
            </a>
            <a href="#development" class="service-visual-card" style="text-decoration: none;">
              <div class="service-image-box">
                <img src="/assets/service-web-redesign.webp" alt="Website Redesign and Development" width="928" height="800" fetchpriority="high">
              </div>
              <div class="service-card-label">
                <span>Website Redesign</span>
              </div>
            </a>
          </div>

          <!-- Video Portfolio Grid -->
          <div class="video-portfolio-section" id="video-portfolio" style="margin-bottom: 80px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h2 style="font-size: 32px; color: var(--c-blue); font-weight: 600; margin-bottom: 8px;">Direct-Response Marketing Video & Motion</h2>
              <p style="font-size: 18px; color: var(--c-text-muted); max-width: 680px; margin: 0 auto;">
                High-converting VSLs, commercial product ads, documentary post-production, and motion graphics edited by Abdullah Al Rafayet.
              </p>
            </div>

            <div class="video-portfolio-grid" id="videoPortfolioGrid">
              <div class="video-project-card">
                <div class="video-thumbnail-box">
                  <img src="https://img.youtube.com/vi/1-wkIHX69tQ/hqdefault.jpg" alt="Healthcare Product VSL (Core Pitch)" loading="lazy">
                  <div class="video-play-badge"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></div>
                  <div class="video-duration-pill">1:31</div>
                </div>
                <div class="video-card-info">
                  <div class="video-category-tag">VSL & Commercial</div>
                  <h3 class="video-card-title">Healthcare Product VSL (Core Pitch)</h3>
                  <p class="video-card-desc">Conversion-driven direct response edit featuring synchronized motion typography, B-roll pacing, and clinical proof graphics.</p>
                  <div class="video-author-badge"><span>Post-Production by Abdullah Al Rafayet</span></div>
                </div>
              </div>

              <div class="video-project-card">
                <div class="video-thumbnail-box">
                  <img src="https://img.youtube.com/vi/O1KD4GBdw3s/hqdefault.jpg" alt="Healthcare Product VSL (In-Depth)" loading="lazy">
                  <div class="video-play-badge"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></div>
                  <div class="video-duration-pill">2:45</div>
                </div>
                <div class="video-card-info">
                  <div class="video-category-tag">VSL & Commercial</div>
                  <h3 class="video-card-title">Healthcare Product VSL (In-Depth)</h3>
                  <p class="video-card-desc">Extended high-ticket explainer with custom sound design, color grading, and dynamic product breakdown.</p>
                  <div class="video-author-badge"><span>Post-Production by Abdullah Al Rafayet</span></div>
                </div>
              </div>

              <div class="video-project-card">
                <div class="video-thumbnail-box">
                  <img src="https://img.youtube.com/vi/JutzyFN-EUM/hqdefault.jpg" alt="Pet Health Care Product VSL" loading="lazy">
                  <div class="video-play-badge"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></div>
                  <div class="video-duration-pill">2:15</div>
                </div>
                <div class="video-card-info">
                  <div class="video-category-tag">VSL & Commercial</div>
                  <h3 class="video-card-title">Pet Health Care Product VSL</h3>
                  <p class="video-card-desc">High-converting direct response video sales letter engineered for pet wellness, dietary nutrition, and veterinary product conversion.</p>
                  <div class="video-author-badge"><span>Post-Production by Abdullah Al Rafayet</span></div>
                </div>
              </div>

              <div class="video-project-card">
                <div class="video-thumbnail-box">
                  <img src="https://img.youtube.com/vi/uIE8A5dWw9A/hqdefault.jpg" alt="Healthcare Product (High-Impact 60s)" loading="lazy">
                  <div class="video-play-badge"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></div>
                  <div class="video-duration-pill">1:00</div>
                </div>
                <div class="video-card-info">
                  <div class="video-category-tag">VSL & Commercial</div>
                  <h3 class="video-card-title">Healthcare Product (High-Impact 60s)</h3>
                  <p class="video-card-desc">Punchy 60-second direct response cut optimized for paid social ads and rapid hook retention.</p>
                  <div class="video-author-badge"><span>Post-Production by Abdullah Al Rafayet</span></div>
                </div>
              </div>

              <div class="video-project-card">
                <div class="video-thumbnail-box">
                  <img src="https://img.youtube.com/vi/-nfffjkbgY0/hqdefault.jpg" alt="Murder Mystery & Narrative Showcase" loading="lazy">
                  <div class="video-play-badge"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></div>
                  <div class="video-duration-pill">0:52</div>
                </div>
                <div class="video-card-info">
                  <div class="video-category-tag">Documentary & Story</div>
                  <h3 class="video-card-title">Murder Mystery & Narrative Showcase</h3>
                  <p class="video-card-desc">Atmospheric narrative editing featuring dark color grading, Foley sound design, and tense cinematic pacing.</p>
                  <div class="video-author-badge"><span>Post-Production by Abdullah Al Rafayet</span></div>
                </div>
              </div>

              <div class="video-project-card">
                <div class="video-thumbnail-box">
                  <img src="https://img.youtube.com/vi/QwrpMQH9UGE/hqdefault.jpg" alt="Construction & Industry Showcase" loading="lazy">
                  <div class="video-play-badge"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></div>
                  <div class="video-duration-pill">0:49</div>
                </div>
                <div class="video-card-info">
                  <div class="video-category-tag">Documentary & Story</div>
                  <h3 class="video-card-title">Construction & Industry Showcase</h3>
                  <p class="video-card-desc">Heavy industrial documentary edit highlighting commercial project milestones with clean lower-third graphics.</p>
                  <div class="video-author-badge"><span>Post-Production by Abdullah Al Rafayet</span></div>
                </div>
              </div>

              <div class="video-project-card">
                <div class="video-thumbnail-box">
                  <img src="https://img.youtube.com/vi/_-_xyVjZivE/hqdefault.jpg" alt="History Documentary & Archival Motion" loading="lazy">
                  <div class="video-play-badge"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></div>
                  <div class="video-duration-pill">0:38</div>
                </div>
                <div class="video-card-info">
                  <div class="video-category-tag">Documentary & Story</div>
                  <h3 class="video-card-title">History Documentary & Archival Motion</h3>
                  <p class="video-card-desc">Archival image restoration, 2.5D parallax photo animation, and historical storytelling pacing.</p>
                  <div class="video-author-badge"><span>Post-Production by Abdullah Al Rafayet</span></div>
                </div>
              </div>

              <div class="video-project-card">
                <div class="video-thumbnail-box">
                  <img src="https://img.youtube.com/vi/mIV8rsaohN4/hqdefault.jpg" alt="Commercial Direct-Response Showreel" loading="lazy">
                  <div class="video-play-badge"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg></div>
                  <div class="video-duration-pill">1:15</div>
                </div>
                <div class="video-card-info">
                  <div class="video-category-tag">VSL & Commercial</div>
                  <h3 class="video-card-title">Commercial Direct-Response Showreel</h3>
                  <p class="video-card-desc">Curated montage of high-converting e-commerce product videos, motion graphics, and sales letters.</p>
                  <div class="video-author-badge"><span>Post-Production by Abdullah Al Rafayet</span></div>
                </div>
              </div>
            </div>
          </div>

          <div class="service-detail-block" id="video">
            <h2 style="font-size: 32px; color: var(--c-blue); margin-bottom: 16px;">1. Direct-Response Marketing Video & Motion Post-Production</h2>
            <p style="font-size: 18px; line-height: 1.6; max-width: 800px; margin-bottom: 16px;">
              Led by Abdullah Al Rafayet. As a specialized video post-production studio, we produce high-converting Video Sales Letters (VSLs), scroll-stopping short-form UGC ads, atmospheric narrative documentaries, and motion graphics designed to maximize viewer retention and direct-response sales. Explore our <a href="/process" style="color: var(--c-blue); text-decoration: underline;">4-step production process</a> or <a href="/contact" style="color: var(--c-blue); text-decoration: underline;">request a project quote</a>.
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

          <div class="service-detail-block" id="branding" style="margin-bottom: 80px;">
            <div style="text-align: center; margin-bottom: 36px;">
              <h2 style="font-size: 32px; color: var(--c-blue); font-weight: 600; margin-bottom: 10px;">Brand Identity Systems & Visual Craft</h2>
              <p style="font-size: 18px; color: var(--c-text-muted); max-width: 680px; margin: 0 auto;">
                Complete visual identities, logotype construction, luxury packaging, and design systems designed by Sadman Zaman Khan.
              </p>
            </div>

            <div class="project-showcase-grid">
              <div class="project-showcase-card">
                <div class="project-cover-box">
                  <img src="/assets/projects/noborangi/noborangi-banner-cover.webp" alt="Noborangi Brand Identity" loading="lazy">
                </div>
                <div class="project-card-info">
                  <h3 class="project-card-title">Noborangi Brand Identity</h3>
                  <p class="project-card-desc">High-contrast editorial serif logotype, luxury crimson & cream palette, bespoke retail packaging, boutique architectural signage, and split-tone merchandise.</p>
                  <div class="project-card-footer">
                    <span class="project-author-label">Designed by Sadman Zaman Khan</span>
                  </div>
                </div>
              </div>

              <div class="project-showcase-card">
                <div class="project-cover-box">
                  <img src="/assets/projects/nexura/nexura-guidelines-01-cover.webp" alt="NEXURA Corporate Identity & Design System" loading="lazy">
                </div>
                <div class="project-card-info">
                  <h3 class="project-card-title">NEXURA Corporate Identity & Design System</h3>
                  <p class="project-card-desc">Complete brand guidelines manual featuring geometric logo construction, clearspace alignment grids, brand color architecture, typography standards, and corporate collateral.</p>
                  <div class="project-card-footer">
                    <span class="project-author-label">Designed by Sadman Zaman Khan</span>
                  </div>
                </div>
              </div>

              <div class="project-showcase-card">
                <div class="project-cover-box">
                  <img src="/assets/projects/control-tower/og-agency-control-tower.webp" alt="Control Tower Enterprise AI Product Identities" loading="lazy">
                </div>
                <div class="project-card-info">
                  <h3 class="project-card-title">Control Tower Enterprise AI Product Identities</h3>
                  <p class="project-card-desc">Full brand identities, custom logo marks, and domain palettes for 10+ vertical AI enterprise products including Agency Control Tower, ePhysician, and Mortgage AI.</p>
                  <div class="project-card-footer">
                    <span class="project-author-label">Designed by Sadman Zaman Khan</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="category-deliverables-box" style="margin-top: 48px; padding-top: 36px; border-top: 1px solid var(--c-border);">
              <h3 style="font-size: 20px; font-weight: 600; color: var(--c-blue); margin-bottom: 18px; text-align: center;">What you walk away with</h3>
              <div class="deliverables-list" style="justify-content: center;">
                <div class="deliverable-btn"><span class="deliverable-check">✓</span><span>Master Vector Files (SVG, AI, PDF)</span></div>
                <div class="deliverable-btn"><span class="deliverable-check">✓</span><span>Complete Figma Brand System</span></div>
                <div class="deliverable-btn"><span class="deliverable-check">✓</span><span>Typography & Color Tokens</span></div>
                <div class="deliverable-btn"><span class="deliverable-check">✓</span><span>100% Commercial Copyright</span></div>
              </div>
            </div>
          </div>

          <div class="service-detail-block" id="development" style="margin-bottom: 80px;">
            <div style="text-align: center; margin-bottom: 36px;">
              <h2 style="font-size: 32px; color: var(--c-blue); font-weight: 600; margin-bottom: 10px;">Website Redesign & Digital Experience</h2>
              <p style="font-size: 18px; color: var(--c-text-muted); max-width: 680px; margin: 0 auto;">
                Distraction-free product workspaces, enterprise SaaS platforms, and luxury e-commerce ecosystems engineered for performance and conversion.
              </p>
            </div>

            <div class="project-showcase-grid">
              <div class="project-showcase-card">
                <div class="project-cover-box">
                  <img src="/assets/projects/collabai/collabai-mockup.webp" alt="CollabAI — Multi-Agent Workspace Redesign" loading="lazy">
                </div>
                <div class="project-card-info">
                  <h3 class="project-card-title">CollabAI — Multi-Agent Workspace Redesign</h3>
                  <p class="project-card-desc">Full UI/UX redesign of CollabAI's multi-agent collaboration platform, replacing a cluttered neon interface with a minimal dark workspace featuring multi-model streaming and orchestration.</p>
                  <div class="project-card-footer">
                    <span class="project-author-label">UI/UX by Sadman Zaman Khan</span>
                  </div>
                </div>
              </div>

              <div class="project-showcase-card">
                <div class="project-cover-box">
                  <img src="/assets/projects/ephysician/ephysician-cover.webp" alt="ePhysician — AI Healthcare Platform Redesign" loading="lazy">
                </div>
                <div class="project-card-info">
                  <h3 class="project-card-title">ePhysician — AI Healthcare Platform Redesign</h3>
                  <p class="project-card-desc">Comprehensive landing page and product UI/UX redesign for an enterprise AI front-desk automation platform serving US medical and dental clinics.</p>
                  <div class="project-card-footer">
                    <span class="project-author-label">UI/UX by Sadman Zaman Khan</span>
                  </div>
                </div>
              </div>

              <div class="project-showcase-card">
                <div class="project-cover-box">
                  <img src="/assets/projects/nagae-studio/nagae-studio-cover-banner.webp" alt="NAGAE Studio — Luxury Bridal Ecosystem" loading="lazy">
                </div>
                <div class="project-card-info">
                  <h3 class="project-card-title">NAGAE Studio — Luxury Bridal Ecosystem</h3>
                  <p class="project-card-desc">Multi-surface retailer ecosystem uniting gown catalog CMS management, B2B boutique CRM pipeline tracking, showroom performance analytics, and a Stylist Mobile App with AI fitting guidance.</p>
                  <div class="project-card-footer">
                    <span class="project-author-label">Product Architecture by Sadman Zaman Khan</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="category-deliverables-box" style="margin-top: 48px; padding-top: 36px; border-top: 1px solid var(--c-border);">
              <h3 style="font-size: 20px; font-weight: 600; color: var(--c-blue); margin-bottom: 18px; text-align: center;">What you walk away with</h3>
              <div class="deliverables-list" style="justify-content: center;">
                <div class="deliverable-btn"><span class="deliverable-check">✓</span><span>Clean React & TypeScript Codebase</span></div>
                <div class="deliverable-btn"><span class="deliverable-check">✓</span><span>Full GitHub Repo Ownership</span></div>
                <div class="deliverable-btn"><span class="deliverable-check">✓</span><span>Production Vercel Deployment</span></div>
                <div class="deliverable-btn"><span class="deliverable-check">✓</span><span>Zero Subscriptions or Vendor Lock-in</span></div>
              </div>
            </div>
          </div>

          <!-- Bottom CTA Box -->
          <div style="background-color: #FAFAFA; border: 1px solid var(--c-border); border-radius: var(--radius-card); padding: 56px 28px; text-align: center; margin-top: 40px;">
            <h2 style="font-size: clamp(28px, 3.5vw, 36px); color: var(--c-blue); font-weight: 700; margin-bottom: 14px; text-wrap: balance;">
              Work directly with the makers.
            </h2>
            <p style="font-size: 19px; color: var(--c-text); max-width: 640px; margin: 0 auto 32px; line-height: 1.55; text-wrap: pretty;">
              Skip the account managers and agency fluff. Talk directly with Sadman, Nafiur, and Rafayet to map out your deliverables, timeline, and&nbsp;quote.
            </p>
            <a href="/contact" class="animated-button">
              <span class="text">Start Your Project</span>
            </a>
          </div>
        </div>
      </section>
    </main>
    ${footerHtml}
  `;
}

function buildProcessHtml(): string {
  return `
    ${getHeaderHtml('/process')}
    <main>
      <section class="approach-section">
        <div class="container">
          <div class="subpage-hero" style="padding-top: 20px; margin-bottom: 30px;">
            <h1 class="subpage-title">How a project works with us.</h1>
            <p class="subpage-subtext">
              A direct, transparent 4-stage collaboration from kickoff to live deployment. You work directly with our founding team.
            </p>
          </div>

          <h2 class="section-heading-centered" style="margin-bottom: 40px;">Our 4-Stage Process</h2>

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
    ${getHeaderHtml('/contact')}
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

          <!-- Studio Operations & Location Signals -->
          <div style="margin-top: 70px; border-top: 1px solid var(--c-border); padding-top: 50px;">
            <div style="text-align: center; margin-bottom: 36px;">
              <h2 style="font-size: 28px; color: var(--c-blue); font-weight: 600; margin-bottom: 10px;">
                Direct Access & Studio Operations
              </h2>
              <p style="font-size: 17px; color: var(--c-text-muted); max-width: 640px; margin: 0 auto; line-height: 1.5;">
                We operate as an agile creative studio headquartered in Dhaka, Bangladesh, collaborating with founders, startups, and marketing leaders globally.
              </p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-bottom: 60px;">
              <div style="background: #FFFFFF; border: 1px solid var(--c-border); border-radius: var(--radius-card); padding: 28px 24px;">
                <h3 style="font-size: 18px; font-weight: 600; color: var(--c-blue); margin-bottom: 8px;">Studio Headquarters</h3>
                <p style="font-size: 15px; color: var(--c-text); line-height: 1.5; margin: 0;">
                  Dhaka, Bangladesh (UTC+6). We coordinate seamless timezone overlap for clients across North America, Europe, and Asia.
                </p>
              </div>
              <div style="background: #FFFFFF; border: 1px solid var(--c-border); border-radius: var(--radius-card); padding: 28px 24px;">
                <h3 style="font-size: 18px; font-weight: 600; color: var(--c-blue); margin-bottom: 8px;">Response Time</h3>
                <p style="font-size: 15px; color: var(--c-text); line-height: 1.5; margin: 0;">
                  Guaranteed response within 12 hours on business days (Sunday–Thursday). Direct communication with founders—never account managers.
                </p>
              </div>
              <div style="background: #FFFFFF; border: 1px solid var(--c-border); border-radius: var(--radius-card); padding: 28px 24px;">
                <h3 style="font-size: 18px; font-weight: 600; color: var(--c-blue); margin-bottom: 8px;">Sprint Engagements</h3>
                <p style="font-size: 15px; color: var(--c-text); line-height: 1.5; margin: 0;">
                  We take on a limited number of client projects per month to maintain craftsmanship, focus, and rapid turnaround speeds.
                </p>
              </div>
            </div>

            <div style="text-align: center; margin-bottom: 28px;">
              <h2 style="font-size: 28px; color: var(--c-blue); font-weight: 600; margin-bottom: 10px;">
                Project Scopes & Frequently Asked Questions
              </h2>
              <p style="font-size: 17px; color: var(--c-text-muted); max-width: 640px; margin: 0 auto; line-height: 1.5;">
                Key information on onboarding, turnaround times, and scope commitments before we kick off.
              </p>
            </div>

            <div class="faq-accordion-container" style="max-width: 860px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">
              <details open style="background: #FFFFFF; border: 1px solid var(--c-border, #E5E7EB); border-radius: 16px; padding: 20px 24px;">
                <summary style="font-size: 20px; font-weight: 600; color: var(--c-blue); cursor: pointer; margin-bottom: 10px;">How fast can we start a project?</summary>
                <p style="font-size: 17px; line-height: 1.65; color: var(--c-text-muted);">We can typically kick off within 3 to 5 business days after our initial discovery call and scope sign-off. We prepare onboarding roadmaps and milestone timelines immediately upon confirmation.</p>
              </details>
              <details style="background: #FFFFFF; border: 1px solid var(--c-border, #E5E7EB); border-radius: 16px; padding: 20px 24px;">
                <summary style="font-size: 20px; font-weight: 600; color: var(--c-blue); cursor: pointer; margin-bottom: 10px;">What are your turnaround times for each service?</summary>
                <p style="font-size: 17px; line-height: 1.65; color: var(--c-text-muted);">Turnaround times depend on scope: Direct-response marketing video edits (VSLs, UGC cuts) deliver in 3 to 7 days. Brand identity design systems take 1 to 2 weeks. Custom website redesigns and frontend engineering sprints take 2 to 4 weeks from kickoff to deployment.</p>
              </details>
              <details style="background: #FFFFFF; border: 1px solid var(--c-border, #E5E7EB); border-radius: 16px; padding: 20px 24px;">
                <summary style="font-size: 20px; font-weight: 600; color: var(--c-blue); cursor: pointer; margin-bottom: 10px;">How do project payments and contracts work?</summary>
                <p style="font-size: 17px; line-height: 1.65; color: var(--c-text-muted);">We work on milestone-based fixed pricing: typically 50% upfront to reserve sprint capacity and 50% upon final delivery and client satisfaction. You receive full commercial ownership and master files upon final sign-off with zero surprise invoices.</p>
              </details>
              <details style="background: #FFFFFF; border: 1px solid var(--c-border, #E5E7EB); border-radius: 16px; padding: 20px 24px;">
                <summary style="font-size: 20px; font-weight: 600; color: var(--c-blue); cursor: pointer; margin-bottom: 10px;">Can we schedule a call before sending a brief?</summary>
                <p style="font-size: 17px; line-height: 1.65; color: var(--c-text-muted);">Yes! You can book a direct 15-minute intro conversation via Google Meet or message us on WhatsApp (+880 1869-504388) to discuss your vision directly with our founders.</p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </main>
    ${footerHtml}
  `;
}

function buildNotFoundHtml(): string {
  return `
    ${getHeaderHtml('')}
    <main>
      <section class="not-found-section" style="min-height: 75vh; display: flex; align-items: center; justify-content: center; text-align: center; padding: 120px 24px 80px;">
        <div class="container" style="max-width: 640px;">
          <div style="display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 999px; background: rgba(46, 79, 148, 0.08); border: 1px solid rgba(46, 79, 148, 0.25); color: var(--c-blue); font-size: 14px; font-weight: 600; letter-spacing: 1px; margin-bottom: 24px;">
            ERROR 404
          </div>
          <h1 style="font-size: clamp(36px, 6vw, 56px); font-weight: 700; color: var(--c-blue); line-height: 1.15; margin-bottom: 20px;">
            Page Not Found
          </h1>
          <p style="font-size: 19px; color: var(--c-text); line-height: 1.5; margin-bottom: 36px;">
            The link you followed doesn't exist or may have been moved. Let's get you back to where you need to be.
          </p>
          <div style="display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap;">
            <a href="/" class="animated-button"><span class="text">Return Home</span></a>
            <a href="/contact" class="social-pill-badge" style="padding: 12px 24px; font-size: 15px; font-weight: 600; color: var(--c-blue); border: 1.5px solid var(--c-blue);">Contact Us</a>
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
    robots?: string;
  }
): string {
  let html = templateHtml;

  // 1. Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(options.title)}</title>`);

  // 2. Replace Description
  html = html.replace(
    /<meta\s+name=["']description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="description" content="${escapeHtml(options.description)}">`
  );

  // 3. Replace Canonical
  html = html.replace(
    /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
    `<link rel="canonical" href="${escapeHtml(options.url)}">`
  );

  // 4. Replace og:url
  html = html.replace(
    /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:url" content="${escapeHtml(options.url)}">`
  );

  // 5. Replace og:title & twitter:title
  html = html.replace(
    /<meta\s+property=["']og:title["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:title" content="${escapeHtml(options.title)}">`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:title["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeHtml(options.title)}">`
  );

  // 6. Replace og:description & twitter:description
  html = html.replace(
    /<meta\s+property=["']og:description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:description" content="${escapeHtml(options.description)}">`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:description["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeHtml(options.description)}">`
  );

  const defaultImage = `${BASE_URL}/assets/og-image.png`;
  const imageUrl = options.image || defaultImage;

  // 7. Replace og:image, og:image:secure_url, twitter:image, alt
  html = html.replace(
    /<meta\s+property=["']og:image["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:image" content="${escapeHtml(imageUrl)}">`
  );
  html = html.replace(
    /<meta\s+property=["']og:image:secure_url["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:image:secure_url" content="${escapeHtml(imageUrl)}">`
  );
  html = html.replace(
    /<meta\s+property=["']og:image:alt["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta property="og:image:alt" content="${escapeHtml(options.title)}">`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:image["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeHtml(imageUrl)}">`
  );
  html = html.replace(
    /<meta\s+name=["']twitter:image:alt["']\s+content=["'][^"']*["']\s*\/?>/i,
    `<meta name="twitter:image:alt" content="${escapeHtml(options.title)}">`
  );

  // 7.5. Replace robots if specified
  if (options.robots) {
    html = html.replace(
      /<meta\s+name=["']robots["']\s+content=["'][^"']*["']\s*\/?>/i,
      `<meta name="robots" content="${escapeHtml(options.robots)}">`
    );
  }

  // 8. Replace JSON-LD schema cleanly
  if (options.jsonLd) {
    html = html.replace(
      /<script type=["']application\/ld\+json["']>[\s\S]*?<\/script>/i,
      `<script type="application/ld+json">\n  ${JSON.stringify(options.jsonLd, null, 2)}\n  </script>`
    );
  }

  // 9. Inject content into #root
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
    'legalName': 'Clandest Agency',
    'url': BASE_URL,
    'logo': `${BASE_URL}/assets/logo.svg`,
    'image': `${BASE_URL}/assets/og-image.png`,
    'description': 'A design, development, and video post-production studio in Dhaka, Bangladesh. We build clean brand systems, custom websites, and high-converting marketing videos.',
    'email': 'clandest.agency@gmail.com',
    'telephone': '+8801869504388',
    'priceRange': '$$',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Dhaka',
      'addressCountry': 'Bangladesh'
    },
    'sameAs': [
      'https://www.linkedin.com/company/clandestagency',
      'https://www.youtube.com/@Clandestagency',
      'https://www.facebook.com/clandest.agency',
      'https://wa.me/8801869504388',
      'https://github.com/Annyxtopheles/clandest-agency-site'
    ],
    'founder': [
      {
        '@type': 'Person',
        'name': 'Sadman Zaman Khan',
        'jobTitle': 'UI/UX & Brand Design',
        'alumniOf': 'Munshiganj Polytechnic Institute',
        'sameAs': [
          'https://sadmanportfolio.vercel.app/',
          'https://www.linkedin.com/in/sadmanzamankhan/'
        ]
      },
      {
        '@type': 'Person',
        'name': 'Md Nafiur Rahman',
        'jobTitle': 'Lead Frontend Engineer',
        'alumniOf': 'Munshiganj Polytechnic Institute',
        'sameAs': [
          'https://md-nafiur-rahman-portfolio.vercel.app/',
          'https://www.linkedin.com/in/md-nafiur-rahman/'
        ]
      },
      {
        '@type': 'Person',
        'name': 'Abdullah Al Rafayet',
        'jobTitle': 'Head of Video Post-Production',
        'alumniOf': 'Munshiganj Polytechnic Institute',
        'sameAs': [
          'https://www.youtube.com/@abdullahrafayet1711',
          'https://www.linkedin.com/in/md-abdullah-245448293/'
        ]
      }
    ],
    'hasOfferCatalog': {
      '@type': 'OfferCatalog',
      'name': 'Agency Disciplines',
      'itemListElement': [
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Marketing Video Post-Production',
            'description': 'High-converting VSLs, 9:16 short-form UGC ads, documentaries, motion graphics, color grading, and audio mastering.'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Logo & Brand Identity Design',
            'description': 'Vector master assets, complete Figma design systems, typography hierarchies, and brand guidelines.'
          }
        },
        {
          '@type': 'Offer',
          'itemOffered': {
            '@type': 'Service',
            'name': 'Website Redesign & Frontend Development',
            'description': 'Ultra-fast React and TypeScript custom web applications with semantic architecture and zero bloat.'
          }
        }
      ]
    }
  };

  // 1. Prerender / (Home)
  const homeHtml = updateHtmlTags(templateHtml, {
    title: 'Clandest Agency — Design, Dev & Video Studio',
    description: 'A design, development, and video post-production studio in Dhaka. We build clean brand systems, custom websites, and high-converting marketing videos.',
    url: `${BASE_URL}/`,
    image: `${BASE_URL}/assets/og-image.png`,
    contentHtml: buildHomeHtml(),
    jsonLd: sharedOrgLd
  });
  writeFileSync(resolve(distDir, 'index.html'), homeHtml, 'utf-8');
  count++;

  // 2. Prerender /about
  const aboutHtml = updateHtmlTags(templateHtml, {
    title: 'About Us — Clandest Agency | Dhaka, Bangladesh',
    description: 'Meet Clandest: A creative design & branding agency in Dhaka crafting brand systems, custom websites, and direct-response marketing videos.',
    url: `${BASE_URL}/about`,
    image: `${BASE_URL}/assets/og-image.png`,
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
    title: 'Creative Agency Services & Capabilities — Clandest Agency',
    description: 'Full-service creative branding agency. High-converting marketing video edits, brand design systems, and modern custom web development in Dhaka.',
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
    description: 'Our transparent 4-stage studio framework: discovery, design sprints, custom build, and deployment. Zero middlemen, direct access to founders.',
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
    title: 'Contact Us — Clandest Agency | Direct Studio Access',
    description: 'Work directly with the founders of Clandest Agency. Book a 15-minute discovery call for brand identity, custom web development, or marketing video.',
    url: `${BASE_URL}/contact`,
    image: `${BASE_URL}/assets/og-image.png`,
    contentHtml: buildContactHtml(),
    jsonLd: {
      ...sharedOrgLd,
      '@type': 'ContactPage',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'How fast can we start a project?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'We can typically kick off within 3 to 5 business days after our initial discovery call and scope sign-off. We prepare onboarding roadmaps and milestone timelines immediately upon confirmation.'
          }
        },
        {
          '@type': 'Question',
          'name': 'What are your turnaround times for each service?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Turnaround times depend on scope: Direct-response marketing video edits (VSLs, UGC cuts) deliver in 3 to 7 days. Brand identity design systems take 1 to 2 weeks. Custom website redesigns and frontend engineering sprints take 2 to 4 weeks from kickoff to deployment.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How do project payments and contracts work?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'We work on milestone-based fixed pricing: typically 50% upfront to reserve sprint capacity and 50% upon final delivery and client satisfaction. You receive full commercial ownership and master files upon final sign-off with zero surprise invoices.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Can we schedule a call before sending a brief?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Yes! You can book a direct 15-minute intro conversation via Google Meet or message us on WhatsApp (+880 1869-504388) to discuss your vision directly with our founders.'
          }
        }
      ]
    }
  });
  const contactPath = resolve(distDir, 'contact', 'index.html');
  ensureDir(contactPath);
  writeFileSync(contactPath, contactHtml, 'utf-8');
  count++;

  // 6. Prerender 404.html (Vercel natively serves this file for all 404 HTTP errors)
  const notFoundHtml = updateHtmlTags(templateHtml, {
    title: '404: Page Not Found — Clandest Agency',
    description: 'The page you are looking for does not exist or has been moved.',
    url: `${BASE_URL}/404`,
    image: `${BASE_URL}/assets/og-image.png`,
    contentHtml: buildNotFoundHtml(),
    robots: 'noindex, follow',
  });
  const notFoundPath = resolve(distDir, '404.html');
  writeFileSync(notFoundPath, notFoundHtml, 'utf-8');
  count++;

  console.log(`[prerender] Successfully generated ${count} static crawlable SSG HTML pages in dist/!`);
}

prerender();