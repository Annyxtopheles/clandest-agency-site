import React, { useState, useEffect } from 'react';
import { WordLift } from '../components/ui/WordLift';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { VideoModal } from '../components/ui/VideoModal';
import { ProjectGalleryModal } from '../components/ui/ProjectGalleryModal';
import { TiltCard } from '../components/ui/TiltCard';
import { triggerHaptic } from '../utils/haptics';
import { BRANDING_PROJECTS, WEB_PROJECTS, ServiceProjectItem } from '../data/serviceProjects';

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
  const [selectedProject, setSelectedProject] = useState<ServiceProjectItem | null>(null);

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
              Creative Agency Services & Capabilities
            </WordLift>
            <p className="subpage-subtext">
              From creative brand design systems and high-converting marketing video post-production to modern custom web engineering. Work directly with founders with deep craft.
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
                  <img src="/assets/service-brand-design.webp" alt="Logo & Brand Design" width="928" height="800" fetchPriority="high" />
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
                <h2 style={{ fontSize: '32px', color: 'var(--c-blue)', fontWeight: 600, marginBottom: '10px' }}>Direct-Response Marketing Video & Motion</h2>
                <p style={{ fontSize: '18px', color: 'var(--c-text-muted)', maxWidth: '680px', margin: '0 auto' }}>
                  High-converting VSLs, commercial product ads, documentary post-production, and motion graphics edited by Abdullah Al Rafayet.
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
            <div className="category-showcase-panel" id="branding" style={{ marginBottom: '80px' }}>
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <h2 style={{ fontSize: '32px', color: 'var(--c-blue)', fontWeight: 600, marginBottom: '10px' }}>
                  Brand Identity Systems & Visual Craft
                </h2>
                <p style={{ fontSize: '18px', color: 'var(--c-text-muted)', maxWidth: '680px', margin: '0 auto' }}>
                  Complete visual identities, logotype construction, luxury packaging, and design systems designed by Sadman Zaman Khan.
                </p>
              </div>

              {/* Branding Project Showcase Grid */}
              <div className="project-showcase-grid">
                {BRANDING_PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    className="project-showcase-card"
                    onClick={() => {
                      triggerHaptic('light');
                      setSelectedProject(proj);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(proj)}
                  >
                    <div className="project-cover-box">
                      <img src={proj.coverImage} alt={proj.title} loading="lazy" />
                      <div className="project-inspect-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <span>View Gallery</span>
                      </div>
                    </div>
                    <div className="project-card-info">
                      <div className="project-category-tag">{proj.categoryLabel}</div>
                      <h3 className="project-card-title">{proj.title}</h3>
                      <p className="project-card-desc">{proj.summary}</p>
                      
                      <div className="project-card-tags-row">
                        {proj.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="project-pill-tag">{tag}</span>
                        ))}
                      </div>

                      <div className="project-card-footer">
                        <span className="project-author-label">{proj.author}</span>
                        <span className="project-case-study-badge">
                          <span>Case Study</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* What you walk away with */}
              <div className="category-deliverables-box" style={{ marginTop: '48px', paddingTop: '36px', borderTop: '1px solid var(--c-border)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--c-blue)', marginBottom: '18px', textAlign: 'center' }}>
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
            <div className="category-showcase-panel" id="development" style={{ marginBottom: '80px' }}>
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <h2 style={{ fontSize: '32px', color: 'var(--c-blue)', fontWeight: 600, marginBottom: '10px' }}>
                  Website Redesign & Digital Experience
                </h2>
                <p style={{ fontSize: '18px', color: 'var(--c-text-muted)', maxWidth: '680px', margin: '0 auto' }}>
                  Distraction-free product workspaces, enterprise SaaS platforms, and luxury e-commerce ecosystems engineered for performance and conversion.
                </p>
              </div>

              {/* Web Project Showcase Grid */}
              <div className="project-showcase-grid">
                {WEB_PROJECTS.map((proj) => (
                  <div
                    key={proj.id}
                    className="project-showcase-card"
                    onClick={() => {
                      triggerHaptic('light');
                      setSelectedProject(proj);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(proj)}
                  >
                    <div className="project-cover-box">
                      <img src={proj.coverImage} alt={proj.title} loading="lazy" />
                      <div className="project-inspect-badge">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <span>View Gallery</span>
                      </div>
                    </div>
                    <div className="project-card-info">
                      <div className="project-category-tag">{proj.categoryLabel}</div>
                      <h3 className="project-card-title">{proj.title}</h3>
                      <p className="project-card-desc">{proj.summary}</p>
                      
                      <div className="project-card-tags-row">
                        {proj.tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="project-pill-tag">{tag}</span>
                        ))}
                      </div>

                      <div className="project-card-footer">
                        <span className="project-author-label">{proj.author}</span>
                        <span className="project-case-study-badge">
                          <span>Case Study</span>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* What you walk away with */}
              <div className="category-deliverables-box" style={{ marginTop: '48px', paddingTop: '36px', borderTop: '1px solid var(--c-border)' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--c-blue)', marginBottom: '18px', textAlign: 'center' }}>
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

      {/* Project Gallery Lightbox Modal */}
      <ProjectGalleryModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </main>
  );
};
