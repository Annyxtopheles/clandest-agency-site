import React from 'react';
import { WordLift } from '../components/ui/WordLift';
import { TiltCard } from '../components/ui/TiltCard';

export const About: React.FC = () => {
  return (
    <main>
      <section className="about-section-new">
        <div className="container">
          <div className="subpage-hero" style={{ paddingTop: '20px' }}>
            <WordLift as="h1" className="subpage-title">
              From Munshiganj Polytechnic to Clandest.
            </WordLift>
            <p className="subpage-subtext">
              We are four friends who met during our college diploma years. We combined our core strengths in UI/UX design, client strategy, software engineering, and cinematic motion graphics to build digital assets that actually work.
            </p>
          </div>

          {/* Main Team Banner */}
          <div className="about-main-image" style={{ marginBottom: '70px', borderRadius: 'var(--radius-card)', overflow: 'hidden', border: '1px solid var(--c-border)' }}>
            <img src="/assets/team-main.webp" alt="Clandest Agency Founders at Munshiganj" width="1024" height="769" style={{ width: '100%', maxHeight: '550px', objectFit: 'cover', display: 'block' }} />
          </div>

          {/* Narrative Row 1: Origin */}
          <div className="about-narrative-row">
            <div className="about-narrative-text">
              <h2 style={{ fontSize: '28px', color: 'var(--c-blue)', marginBottom: '12px', fontWeight: 600 }}>The Origin</h2>
              <p>Our journey began at <strong>Munshiganj Polytechnic Institute</strong>, where we met for the first time while pursuing our Diplomas in Computer Technology (2021–2025). Coming from different backgrounds, contexts, and histories, we discovered a shared passion for visual aesthetics, robust engineering, and creative media.</p>
              <p>Collaborating on projects throughout our studies, we established a seamless team shorthand and standard of work.</p>
            </div>
            <div className="about-image-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span>Munshiganj Polytechnic Diploma Years</span>
            </div>
          </div>

          {/* Narrative Row 2: Scouting */}
          <div className="about-narrative-row reverse">
            <div className="about-image-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span>Rover Scouts Unit Leadership</span>
            </div>
            <div className="about-narrative-text">
              <h2 style={{ fontSize: '28px', color: 'var(--c-blue)', marginBottom: '12px', fontWeight: 600 }}>Leadership in Scouts</h2>
              <p>During our college years, we dedicated our energy to the <strong>Rover Scouts movement</strong>. Scouting was our testing ground for discipline, accountability, volunteer coordination, and leadership under pressure.</p>
              <p>Under Md Nafiur Rahman's leadership as Senior Rover Mate, our campus unit won national recognition, including the prestigious <strong>"Serader Sera"</strong> award at the National Rover Moot 2024, placing in the top 16 of 600+ units across Bangladesh.</p>
            </div>
          </div>

          {/* Narrative Row 3: Industrial Attachment */}
          <div className="about-narrative-row">
            <div className="about-narrative-text">
              <h2 style={{ fontSize: '28px', color: 'var(--c-blue)', marginBottom: '12px', fontWeight: 600 }}>Industrial Mastery</h2>
              <p>After our diplomas, we expanded our industry experience. Sadman and Rafayet completed their industrial attachment together at <strong>European IT Solutions in Mirpur</strong>.</p>
              <p>Working side-by-side on commercial graphics, illustration assets, and branding systems, they integrated their design and editing workflows—laying the foundation for Clandest's visual strategy.</p>
            </div>
            <div className="about-image-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
              <span>European IT Solutions Attachment</span>
            </div>
          </div>

          {/* The Founding Team */}
          <div className="founders-profile-section" style={{ marginTop: '60px' }}>
            <h2 className="section-heading-centered">The Founding Team</h2>
            <p className="hero-subtext" style={{ fontSize: '20px', textAlign: 'center', marginBottom: '40px' }}>
              After gaining real-world industry experience, we reunited to launch Clandest Agency. We work directly with you with zero middlemen.
            </p>

            <div className="team-members-grid">
              <TiltCard className="team-member-card">
                <div className="team-portrait-box">
                  <img src="/assets/team-sadman.webp" alt="Sadman Zaman Khan" width="672" height="888" loading="lazy" />
                </div>
                <h3 className="team-name">Sadman Zaman Khan</h3>
                <div className="team-role">UI/UX & Brand Design</div>
                <a href="https://www.linkedin.com/in/sadmanzamankhan/" target="_blank" rel="noreferrer" className="card-button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
              </TiltCard>

              <TiltCard className="team-member-card">
                <div className="team-portrait-box">
                  <img src="/assets/team-habibullah.webp" alt="Md. Habibullah" width="672" height="888" loading="lazy" />
                </div>
                <h3 className="team-name">Md. Habibullah</h3>
                <div className="team-role">Client Relationship Manager</div>
              </TiltCard>

              <TiltCard className="team-member-card">
                <div className="team-portrait-box">
                  <img src="/assets/team-nafiur.webp" alt="Md. Nafiur Rahman" width="672" height="888" loading="lazy" />
                </div>
                <h3 className="team-name">Md. Nafiur Rahman</h3>
                <div className="team-role">Web Development & AI</div>
                <a href="https://www.linkedin.com/in/md-nafiur-rahman/" target="_blank" rel="noreferrer" className="card-button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
              </TiltCard>

              <TiltCard className="team-member-card">
                <div className="team-portrait-box">
                  <img src="/assets/team-rafayet.webp" alt="Md. Abdullah al Rafayet" width="672" height="888" loading="lazy" />
                </div>
                <h3 className="team-name">Md. Abdullah al Rafayet</h3>
                <div className="team-role">Video & Motion Graphics</div>
                <a href="https://www.linkedin.com/in/md-abdullah-245448293/" target="_blank" rel="noreferrer" className="card-button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
              </TiltCard>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
