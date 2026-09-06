import React, { useState } from 'react';
import { WordLift } from '../components/ui/WordLift';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { VideoModal } from '../components/ui/VideoModal';

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
    id: 't9RAkGK49BM',
    title: 'Female UGC & Testimonial Ad',
    category: 'ugc',
    categoryLabel: 'Short-Form UGC',
    duration: '0:51',
    desc: 'High-engagement authentic creator testimonial with dynamic subtitles, sound effects, and scroll-stopping hooks.',
    author: 'Post-Production by Abdullah Al Rafayet',
  },
  {
    id: 'CrxJCEeQ0Os',
    title: 'Healthcare Product VSL (Benefits Breakdown)',
    category: 'vsl',
    categoryLabel: 'VSL & Commercial',
    duration: '1:44',
    desc: 'Fast-paced sales video pacing highlighting competitive advantages, user testimonials, and urgent CTA.',
    author: 'Post-Production by Abdullah Al Rafayet',
  },
  {
    id: 'bvAdnAvqvCU',
    title: 'Healthcare Product VSL (Full Narrative)',
    category: 'vsl',
    categoryLabel: 'VSL & Commercial',
    duration: '3:10',
    desc: 'Comprehensive marketing narrative structured for cold-traffic conversion and high average order value.',
    author: 'Post-Production by Abdullah Al Rafayet',
  },
  {
    id: 'Mt4w-_jwU_c',
    title: 'Healthcare Product VSL (Problem / Solution)',
    category: 'vsl',
    categoryLabel: 'VSL & Commercial',
    duration: '2:20',
    desc: 'Story-driven hook sequence with visual problem agitation and scientific solution validation.',
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
  const [filter, setFilter] = useState<'all' | 'vsl' | 'documentary' | 'ugc'>('all');
  const [activeModal, setActiveModal] = useState<{ id: string; title: string } | null>(null);

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
              Three core studio disciplines executed by founders with deep craft. No account managers, no layers of bureaucracy.
            </p>
          </div>

          {/* VIDEO PRODUCTION PORTFOLIO SHOWCASE */}
          <div className="video-portfolio-section" id="video-portfolio" style={{ marginBottom: '80px' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h3 style={{ fontSize: '32px', color: 'var(--c-blue)', fontWeight: 600, marginBottom: '10px' }}>Featured Video Projects</h3>
              <p style={{ fontSize: '18px', color: 'var(--c-text-muted)', maxWidth: '680px', margin: '0 auto' }}>
                Direct-response VSLs, commercial product ads, and documentary post-production edited by Abdullah Al Rafayet.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="video-filter-bar">
              <button
                className={`video-filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Projects ({VIDEO_PROJECTS.length})
              </button>
              <button
                className={`video-filter-btn ${filter === 'vsl' ? 'active' : ''}`}
                onClick={() => setFilter('vsl')}
              >
                VSLs & Sales Ads
              </button>
              <button
                className={`video-filter-btn ${filter === 'documentary' ? 'active' : ''}`}
                onClick={() => setFilter('documentary')}
              >
                Documentaries & Stories
              </button>
              <button
                className={`video-filter-btn ${filter === 'ugc' ? 'active' : ''}`}
                onClick={() => setFilter('ugc')}
              >
                Short-Form UGC
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
                    <img src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={video.title} loading="lazy" />
                    <div className="video-play-badge">
                      <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
                    </div>
                    <div className="video-duration-pill">{video.duration}</div>
                  </div>
                  <div className="video-card-info">
                    <div className="video-category-tag">{video.categoryLabel}</div>
                    <h4 className="video-card-title">{video.title}</h4>
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
          </div>

          {/* Service Item 1: Logo & Brand Design */}
          <div className="about-narrative-row" id="branding" style={{ marginBottom: '80px' }}>
            <div className="about-narrative-text">
              <h2 style={{ fontSize: '32px', color: 'var(--c-blue)', marginBottom: '16px', fontWeight: 600 }}>Logo & Brand Design</h2>
              <p>Logo design, color palettes, and full brand identities that make your product stand out.</p>
              <ul style={{ listStyle: 'none', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ position: 'relative', paddingLeft: '20px', color: 'var(--c-text)' }}><strong>•</strong> Primary logo, wordmarks, and responsive icon sets</li>
                <li style={{ position: 'relative', paddingLeft: '20px', color: 'var(--c-text)' }}><strong>•</strong> Complete design systems in Figma (typography, tokens, colors)</li>
                <li style={{ position: 'relative', paddingLeft: '20px', color: 'var(--c-text)' }}><strong>•</strong> Marketing creatives, pitch decks, and vector illustrations</li>
                <li style={{ position: 'relative', paddingLeft: '20px', color: 'var(--c-text)' }}><strong>•</strong> Interactive UI/UX high-fidelity wireframing</li>
              </ul>
            </div>
            <div className="service-image-box" style={{ width: '100%', aspectRatio: '4 / 3.1' }}>
              <img src="assets/service-brand-design.gif" alt="Logo & Brand Design" loading="lazy" />
            </div>
          </div>

          {/* Service Item 2: Website Redesign */}
          <div className="about-narrative-row reverse" id="development" style={{ marginBottom: '80px' }}>
            <div className="service-image-box" style={{ width: '100%', aspectRatio: '4 / 3.1' }}>
              <img src="assets/service-web-redesign.png" alt="Website Redesign" loading="lazy" />
            </div>
            <div className="about-narrative-text">
              <h2 style={{ fontSize: '32px', color: 'var(--c-blue)', marginBottom: '16px', fontWeight: 600 }}>Website Redesign</h2>
              <p>Custom landing pages and websites built from scratch. Fast, responsive, and completely optimized.</p>
              <ul style={{ listStyle: 'none', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ position: 'relative', paddingLeft: '20px', color: 'var(--c-text)' }}><strong>•</strong> Modern HTML, clean CSS, and fast JavaScript (Zero bloat)</li>
                <li style={{ position: 'relative', paddingLeft: '20px', color: 'var(--c-text)' }}><strong>•</strong> 100% mobile, tablet, and high-DPI desktop responsive layouts</li>
                <li style={{ position: 'relative', paddingLeft: '20px', color: 'var(--c-text)' }}><strong>•</strong> Core Web Vitals optimization and instant loading speeds</li>
                <li style={{ position: 'relative', paddingLeft: '20px', color: 'var(--c-text)' }}><strong>•</strong> Python backends, automation scripts, and custom data pipelines</li>
              </ul>
            </div>
          </div>

          {/* Service Item 3: Marketing Video */}
          <div className="about-narrative-row" id="video" style={{ marginBottom: '60px' }}>
            <div className="about-narrative-text">
              <h2 style={{ fontSize: '32px', color: 'var(--c-blue)', marginBottom: '16px', fontWeight: 600 }}>Marketing Video</h2>
              <p>High-converting video ads, post-production editing, motion graphics, and sound design.</p>
              <ul style={{ listStyle: 'none', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <li style={{ position: 'relative', paddingLeft: '20px', color: 'var(--c-text)' }}><strong>•</strong> High-converting Video Sales Letters (VSLs) & social UGC ads</li>
                <li style={{ position: 'relative', paddingLeft: '20px', color: 'var(--c-text)' }}><strong>•</strong> Adobe After Effects motion graphics & animated typography</li>
                <li style={{ position: 'relative', paddingLeft: '20px', color: 'var(--c-text)' }}><strong>•</strong> Studio color grading & professional audio mastering</li>
                <li style={{ position: 'relative', paddingLeft: '20px', color: 'var(--c-text)' }}><strong>•</strong> Commercial product explainers & documentary narratives</li>
              </ul>
            </div>
            <div className="service-image-box" style={{ width: '100%', aspectRatio: '4 / 3.1' }}>
              <img src="assets/service-marketing-video.png" alt="Marketing Video" loading="lazy" />
            </div>
          </div>

          {/* Bottom CTA Box */}
          <div style={{ backgroundColor: '#FAFAFA', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-card)', padding: '50px 30px', textAlign: 'center', marginTop: '40px' }}>
            <h3 style={{ fontSize: '32px', color: 'var(--c-blue)', fontWeight: 600, marginBottom: '12px' }}>Have a project in mind?</h3>
            <p style={{ fontSize: '20px', color: 'var(--c-text)', maxWidth: '600px', margin: '0 auto 28px' }}>
              Talk directly with our founding team to get a clear scope and timeline.
            </p>
            <AnimatedButton to="/contact">
              Start a Conversation
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
