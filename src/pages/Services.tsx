import React, { useState, useEffect } from 'react';
import { WordLift } from '../components/ui/WordLift';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { VideoModal } from '../components/ui/VideoModal';
import { TiltCard } from '../components/ui/TiltCard';
import { triggerHaptic } from '../utils/haptics';

const VIDEO_PROJECTS = [
  {
    id: '1-wkIHX69tQ',
    title: 'Healthcare Product VSL (Core Pitch)',
    category: 'vsl',
    categoryLabel: 'VSL & Commercial',
    duration: '1:31',
    desc: 'Conversion-driven direct response edit featuring synchronized motion typography, B-roll pacing, and clinical proof graphics.',
    author: 'Post-Production by Abdullah Al Rafayet',
  },
  {
    id: 'O1KD4GBdw3s',
    title: 'Healthcare Product VSL (In-Depth)',
    category: 'vsl',
    categoryLabel: 'VSL & Commercial',
    duration: '2:45',
    desc: 'Extended high-ticket explainer with custom sound design, color grading, and dynamic product breakdown.',
    author: 'Post-Production by Abdullah Al Rafayet',
  },
  {
    id: 'JutzyFN-EUM',
    title: 'Pet Health Care Product VSL',
    category: 'vsl',
    categoryLabel: 'VSL & Commercial',
    duration: '2:15',
    desc: 'High-converting direct response video sales letter engineered for pet wellness, dietary nutrition, and veterinary product conversion.',
    author: 'Post-Production by Abdullah Al Rafayet',
  },
  {
    id: 'uIE8A5dWw9A',
    title: 'Healthcare Product (High-Impact 60s)',
    category: 'vsl',
    categoryLabel: 'VSL & Commercial',
    duration: '1:00',
    desc: 'Punchy 60-second direct response cut optimized for paid social ads and rapid hook retention.',
    author: 'Post-Production by Abdullah Al Rafayet',
  },
  {
    id: '-nfffjkbgY0',
    title: 'Murder Mystery & Narrative Showcase',
    category: 'documentary',
    categoryLabel: 'Documentary & Story',
    duration: '0:52',
    desc: 'Atmospheric narrative editing featuring dark color grading, Foley sound design, and tense cinematic pacing.',
    author: 'Post-Production by Abdullah Al Rafayet',
  },
  {
    id: 'QwrpMQH9UGE',
    title: 'Construction & Industry Showcase',
    category: 'documentary',
    categoryLabel: 'Documentary & Story',
    duration: '0:49',
    desc: 'Heavy industrial documentary edit highlighting commercial project milestones with clean lower-third graphics.',
    author: 'Post-Production by Abdullah Al Rafayet',
  },
  {
    id: '_-_xyVjZivE',
    title: 'History Documentary & Archival Motion',
    category: 'documentary',
    categoryLabel: 'Documentary & Story',
    duration: '0:38',
    desc: 'Archival image restoration, 2.5D parallax photo animation, and historical storytelling pacing.',
    author: 'Post-Production by Abdullah Al Rafayet',
  },
  {
    id: 'mIV8rsaohN4',
    title: 'Commercial Direct-Response Showreel',
    category: 'vsl',
    categoryLabel: 'VSL & Commercial',
    duration: '1:15',
    desc: 'Curated montage of high-converting e-commerce product videos, motion graphics, and sales letters.',
    author: 'Post-Production by Abdullah Al Rafayet',
  },
];

export const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'video' | 'branding' | 'web'>('video');
  const [filter, setFilter] = useState<'all' | 'vsl' | 'documentary'>('all');
  const [activeModal, setActiveModal] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#video') setActiveCategory('video');
      else if (hash === '#branding') setActiveCategory('branding');
      else if (hash === '#development' || hash === '#web') setActiveCategory('web');
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const filteredVideos = filter === 'all' ? VIDEO_PROJECTS : VIDEO_PROJECTS.filter((v) => v.category === filter);

  return (
    <main>
      <section className="services-section">
        <div className="container">
          <div className="subpage-hero" style={{ paddingTop: '20px' }}>
            <WordLift as="h1" className="subpage-title">
              What we can do for you.
            </WordLift>
            <p className="subpage-subtext">
              Three core studio disciplines executed by founders with deep craft. Select a category below to explore projects and capabilities.
            </p>
          </div>

          {/* 3 MAIN CATEGORIES SELECTOR (MATCHING HOMEPAGE) */}
          <div className="services-visual-grid services-category-selector" style={{ marginBottom: '60px' }}>
            {/* Category 1: Marketing Video */}
            <div
              className={`service-visual-card ${activeCategory === 'video' ? 'active-service-card' : ''}`}
              onClick={() => {
                triggerHaptic('selection');
                setActiveCategory('video');
              }}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveCategory('video')}
            >
              <TiltCard>
                <div className="service-image-box">
                  <img src="/assets/service-marketing-video.webp" alt="Marketing Video Production" width="928" height="800" fetchPriority="high" />
                </div>
                <div className="service-card-label">
                  <span>Marketing Video</span>
                </div>
              </TiltCard>
            </div>

            {/* Category 2: Logo & Brand Design */}
            <div
              className={`service-visual-card ${activeCategory === 'branding' ? 'active-service-card' : ''}`}
              onClick={() => {
                triggerHaptic('selection');
                setActiveCategory('branding');
              }}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveCategory('branding')}
            >
              <TiltCard>
                <div className="service-image-box">
                  <img src="/assets/service-brand-design.gif" alt="Logo & Brand Design" width="928" height="800" fetchPriority="high" />
                </div>
                <div className="service-card-label">
                  <span>Logo & Brand Design</span>
                </div>
              </TiltCard>
            </div>

            {/* Category 3: Website Redesign */}
            <div
              className={`service-visual-card ${activeCategory === 'web' ? 'active-service-card' : ''}`}
              onClick={() => {
                triggerHaptic('selection');
                setActiveCategory('web');
              }}
              style={{ cursor: 'pointer' }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveCategory('web')}
            >
              <TiltCard>
                <div className="service-image-box">
                  <img src="/assets/service-web-redesign.webp" alt="Website Redesign and Development" width="928" height="800" fetchPriority="high" />
                </div>
                <div className="service-card-label">
                  <span>Website Redesign</span>
                </div>
              </TiltCard>
            </div>
          </div>

          {/* DYNAMIC CATEGORY SHOWCASE */}
          {activeCategory === 'video' && (
            <div className="video-portfolio-section" id="video-portfolio" style={{ marginBottom: '80px' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '32px', color: 'var(--c-blue)', fontWeight: 600, marginBottom: '10px' }}>Featured Video Projects</h2>
                <p style={{ fontSize: '18px', color: 'var(--c-text-muted)', maxWidth: '680px', margin: '0 auto' }}>
                  Direct-response VSLs, commercial product ads, and documentary post-production edited by Abdullah Al Rafayet.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="video-filter-bar">
                <button
                  className={`video-filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => {
                    triggerHaptic('selection');
                    setFilter('all');
                  }}
                >
                  All Projects ({VIDEO_PROJECTS.length})
                </button>
                <button
                  className={`video-filter-btn ${filter === 'vsl' ? 'active' : ''}`}
                  onClick={() => {
                    triggerHaptic('selection');
                    setFilter('vsl');
                  }}
                >
                  VSLs & Sales Ads
                </button>
                <button
                  className={`video-filter-btn ${filter === 'documentary' ? 'active' : ''}`}
                  onClick={() => {
                    triggerHaptic('selection');
                    setFilter('documentary');
                  }}
                >
                  Documentaries & Stories
                </button>
              </div>

              {/* Video Grid */}
              <div className="video-portfolio-grid" id="videoPortfolioGrid">
                {filteredVideos.map((video) => (
                  <div
                    key={video.id}
                    className="video-project-card"
                    onClick={() => setActiveModal({ id: video.id, title: video.title })}
                  >
                    <div className="video-thumbnail-box">
                      <img
                        src={video.id.length === 11 ? `https://img.youtube.com/vi/${video.id}/hqdefault.jpg` : '/assets/service-marketing-video.webp'}
                        alt={video.title}
                        loading="lazy"
                      />
                      <div className="video-play-badge">
                        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
                      </div>
                      <div className="video-duration-pill">{video.duration}</div>
                    </div>
                    <div className="video-card-info">
                      <div className="video-category-tag">{video.categoryLabel}</div>
                      <h3 className="video-card-title">{video.title}</h3>
                      <p className="video-card-desc">{video.desc}</p>
                      <div className="video-author-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                        <span>{video.author}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Marketing Video Deliverables */}
              <div className="category-deliverables-box" style={{ marginTop: '48px', paddingTop: '36px', borderTop: '1px solid var(--c-border)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--c-blue)', marginBottom: '18px', textAlign: 'center' }}>
                  What you walk away with
                </h3>
                <div className="deliverables-list" style={{ justifyContent: 'center' }}>
                  <div className="deliverable-btn" onClick={() => triggerHaptic('light')}>
                    <span className="deliverable-check">✓</span>
                    <span>4K Master Exports & ProRes Files</span>
                  </div>
                  <div className="deliverable-btn" onClick={() => triggerHaptic('light')}>
                    <span className="deliverable-check">✓</span>
                    <span>9:16 Vertical Cuts for TikTok & Reels</span>
                  </div>
                  <div className="deliverable-btn" onClick={() => triggerHaptic('light')}>
                    <span className="deliverable-check">✓</span>
                    <span>Studio Audio & Foley Stems</span>
                  </div>
                  <div className="deliverable-btn" onClick={() => triggerHaptic('light')}>
                    <span className="deliverable-check">✓</span>
                    <span>Complete Project Timelines Archive</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'branding' && (
            <div className="category-showcase-panel" style={{ textAlign: 'center', padding: '60px 24px', background: '#FAFAFA', borderRadius: 'var(--radius-card)', border: '1px solid var(--c-border)', marginBottom: '40px' }}>
              <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--c-text-muted)', marginBottom: '12px' }}>
                Portfolio in Curation
              </span>
              <h2 style={{ fontSize: '32px', color: 'var(--c-blue)', fontWeight: 600, marginBottom: '12px' }}>
                Logo & Brand Design Projects
              </h2>
              <p style={{ fontSize: '18px', color: 'var(--c-text)', maxWidth: '540px', margin: '0 auto 36px', lineHeight: 1.5, textWrap: 'pretty' }}>
                Client brand systems, vector icon sets, and identity guidelines designed by Sadman Zaman Khan are currently being curated for showcase.
              </p>

              <div className="category-deliverables-box" style={{ paddingTop: '28px', borderTop: '1px solid var(--c-border)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--c-blue)', marginBottom: '18px' }}>
                  What you walk away with
                </h3>
                <div className="deliverables-list" style={{ justifyContent: 'center' }}>
                  <div className="deliverable-btn" onClick={() => triggerHaptic('light')}>
                    <span className="deliverable-check">✓</span>
                    <span>Master Vector Files (SVG, AI, PDF)</span>
                  </div>
                  <div className="deliverable-btn" onClick={() => triggerHaptic('light')}>
                    <span className="deliverable-check">✓</span>
                    <span>Complete Figma Brand System</span>
                  </div>
                  <div className="deliverable-btn" onClick={() => triggerHaptic('light')}>
                    <span className="deliverable-check">✓</span>
                    <span>Typography & Color Tokens</span>
                  </div>
                  <div className="deliverable-btn" onClick={() => triggerHaptic('light')}>
                    <span className="deliverable-check">✓</span>
                    <span>100% Commercial Copyright</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeCategory === 'web' && (
            <div className="category-showcase-panel" style={{ textAlign: 'center', padding: '60px 24px', background: '#FAFAFA', borderRadius: 'var(--radius-card)', border: '1px solid var(--c-border)', marginBottom: '40px' }}>
              <span style={{ display: 'inline-block', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--c-text-muted)', marginBottom: '12px' }}>
                Portfolio in Curation
              </span>
              <h2 style={{ fontSize: '32px', color: 'var(--c-blue)', fontWeight: 600, marginBottom: '12px' }}>
                Website Redesign & Frontend Projects
              </h2>
              <p style={{ fontSize: '18px', color: 'var(--c-text)', maxWidth: '540px', margin: '0 auto 36px', lineHeight: 1.5, textWrap: 'pretty' }}>
                Production web applications, high-performance landing pages, and responsive TypeScript codebases engineered by Md. Nafiur Rahman are currently being curated for showcase.
              </p>

              <div className="category-deliverables-box" style={{ paddingTop: '28px', borderTop: '1px solid var(--c-border)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--c-blue)', marginBottom: '18px' }}>
                  What you walk away with
                </h3>
                <div className="deliverables-list" style={{ justifyContent: 'center' }}>
                  <div className="deliverable-btn" onClick={() => triggerHaptic('light')}>
                    <span className="deliverable-check">✓</span>
                    <span>Clean React & TypeScript Codebase</span>
                  </div>
                  <div className="deliverable-btn" onClick={() => triggerHaptic('light')}>
                    <span className="deliverable-check">✓</span>
                    <span>Full GitHub Repo Ownership</span>
                  </div>
                  <div className="deliverable-btn" onClick={() => triggerHaptic('light')}>
                    <span className="deliverable-check">✓</span>
                    <span>Production Vercel Deployment</span>
                  </div>
                  <div className="deliverable-btn" onClick={() => triggerHaptic('light')}>
                    <span className="deliverable-check">✓</span>
                    <span>Zero Subscriptions or Vendor Lock-in</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom CTA Box */}
          <div style={{ backgroundColor: '#FAFAFA', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-card)', padding: '56px 28px', textAlign: 'center', marginTop: '40px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 36px)', color: 'var(--c-blue)', fontWeight: 700, marginBottom: '14px', textWrap: 'balance' }}>
              Work directly with the makers.
            </h2>
            <p style={{ fontSize: '19px', color: 'var(--c-text)', maxWidth: '640px', margin: '0 auto 32px', lineHeight: 1.55, textWrap: 'pretty' }}>
              Skip the account managers and agency fluff. Talk directly with Sadman, Nafiur, and Rafayet to map out your deliverables, timeline, and&nbsp;quote.
            </p>
            <AnimatedButton to="/contact">
              Start Your Project
            </AnimatedButton>
          </div>
        </div>
      </section>

      {/* Video Modal Lightbox */}
      <VideoModal
        videoId={activeModal?.id || null}
        title={activeModal?.title || ''}
        onClose={() => setActiveModal(null)}
      />
    </main>
  );
};
