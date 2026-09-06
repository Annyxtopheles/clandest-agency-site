import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { WordLift } from '../components/ui/WordLift';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { TiltCard } from '../components/ui/TiltCard';

export const Home: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });
      const data = await res.json();
      if (res.status === 200) {
        setFormStatus('success');
        setFeedbackMsg('Thank you! We received your message and will reply to your email shortly.');
        form.reset();
      } else {
        setFormStatus('error');
        setFeedbackMsg(data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setFormStatus('error');
      setFeedbackMsg('Something went wrong. Please check your connection.');
    } finally {
      setTimeout(() => {
        setFormStatus('idle');
      }, 6000);
    }
  };

  return (
    <main>
      {/* HERO SECTION */}
      <section className="hero-section" id="hero">
        <div className="container hero-container">
          <WordLift as="h1" className="hero-title">
            We design brands, websites, and edit marketing videos.
          </WordLift>
          <p className="hero-subtext">
            We are <span className="easter-egg" data-tooltip="🎨 2 Designers + 💻 2 Engineers">four friends</span> who met at <span className="easter-egg" data-tooltip="📍 Munshiganj / Dhaka, Bangladesh">Munshiganj Polytechnic Institute</span>. We combine UX design, clean software engineering, and post-production video editing to build digital assets that actually work. Direct access to founders—<span className="easter-egg" data-tooltip="⚡ Sadman, Nafiur, Rafayet & Habibullah">zero middlemen</span>.
          </p>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="services-section" id="services">
        <div className="container">
          <h2 className="section-heading-centered">What we can do for you.</h2>

          <div className="services-visual-grid">
            {/* Service 1: Marketing Video */}
            <Link to="/services#video" className="service-visual-card">
              <TiltCard>
                <div className="service-image-box">
                  <img src="assets/service-marketing-video.png" alt="Marketing Video Production" loading="lazy" />
                </div>
                <div className="service-card-label">Marketing Video</div>
              </TiltCard>
            </Link>

            {/* Service 2: Logo & Brand Design */}
            <Link to="/services#branding" className="service-visual-card">
              <TiltCard>
                <div className="service-image-box">
                  <img src="assets/service-brand-design.jpg" alt="Logo and Brand Design" loading="lazy" />
                </div>
                <div className="service-card-label">Logo & Brand Design</div>
              </TiltCard>
            </Link>

            {/* Service 3: Website Redesign */}
            <Link to="/services#development" className="service-visual-card">
              <TiltCard>
                <div className="service-image-box">
                  <img src="assets/service-web-redesign.png" alt="Website Redesign and Development" loading="lazy" />
                </div>
                <div className="service-card-label">Website Redesign</div>
              </TiltCard>
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS / PROCESS SECTION */}
      <section className="process-overview-section" id="how-it-works">
        <div className="container">
          <h2 className="section-heading-centered">How we work with you.</h2>
          <p className="section-subtext-centered">
            A streamlined 4-step framework from initial consultation to final launch. Transparent, collaborative, and fast.
          </p>

          <div className="process-step-grid">
            <TiltCard className="process-step-card">
              <h3 className="process-step-title">We Talk</h3>
              <p className="process-step-desc">
                We discuss your goals, audience, and vision directly on a brief call or chat. We provide a clear, fixed quote and milestone roadmap.
              </p>
            </TiltCard>

            <TiltCard className="process-step-card">
              <h3 className="process-step-title">We Design</h3>
              <p className="process-step-desc">
                Sadman crafts high-fidelity brand visual systems, responsive Figma prototypes, or custom video storyboards for your review.
              </p>
            </TiltCard>

            <TiltCard className="process-step-card">
              <h3 className="process-step-title">We Build</h3>
              <p className="process-step-desc">
                Nafiur builds fast, lightweight, and responsive web code while Rafayet masterfully cuts, colors, and animates your marketing video.
              </p>
            </TiltCard>

            <TiltCard className="process-step-card">
              <h3 className="process-step-title">We Launch</h3>
              <p className="process-step-desc">
                We deploy your site live, deliver all raw Figma and video masters, and ensure everything runs smoothly with full IP handover.
              </p>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* THE FOUNDING TEAM SECTION */}
      <section className="team-section" id="team">
        <div className="container">
          <h2 className="section-heading-centered">The Founding Team</h2>

          <div className="team-members-grid">
            <TiltCard className="team-member-card">
              <div className="team-portrait-box">
                <img src="assets/team-sadman.png" alt="Sadman Zaman Khan" loading="lazy" />
              </div>
              <div className="team-name">Sadman Zaman Khan</div>
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
                <img src="assets/team-habibullah.png" alt="Md. Habibullah" loading="lazy" />
              </div>
              <div className="team-name">Md. Habibullah</div>
              <div className="team-role">Client Relationship Manager</div>
            </TiltCard>

            <TiltCard className="team-member-card">
              <div className="team-portrait-box">
                <img src="assets/team-nafiur.png" alt="Md. Nafiur Rahman" loading="lazy" />
              </div>
              <div className="team-name">Md. Nafiur Rahman</div>
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
                <img src="assets/team-rafayet.png" alt="Md. Abdullah al Rafayet" loading="lazy" />
              </div>
              <div className="team-name">Md. Abdullah al Rafayet</div>
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
      </section>

      {/* FAQ SECTION */}
      <section className="faq-section" id="faq">
        <div className="container">
          <h2 className="section-heading-centered">Frequently Asked Questions</h2>

          <div className="faq-grid">
            <details className="faq-item" open>
              <summary className="faq-question">
                <span>Who will I be communicating with during the project?</span>
                <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </summary>
              <div className="faq-answer">
                You work directly with our 4 founding partners (Sadman for UI/UX, Nafiur for Web Dev, Rafayet for Video, and Habibullah for Client Relations). We don't have account managers or junior buffers—you always talk to the makers executing the work.
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                <span>What is your typical turnaround time?</span>
                <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </summary>
              <div className="faq-answer">
                Turnaround depends on scope: brand identity packages typically take 1–2 weeks, website designs & builds take 2–3 weeks, and marketing video edits take 3–7 business days. We provide initial visual concepts within 48–72 hours of kickoff.
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                <span>How does your project pricing work?</span>
                <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </summary>
              <div className="faq-answer">
                We offer clear, fixed-price quotes based on the exact deliverables agreed upon during discovery. You will never receive surprise hourly bills or hidden fees. We also offer monthly retainer packages for continuous design, dev, and video support.
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                <span>Do I get full ownership of all source files and code?</span>
                <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </summary>
              <div className="faq-answer">
                Yes, 100%. Upon project completion and final payment, you receive complete commercial ownership of all intellectual property, Figma design files, source code repositories, and raw video project files.
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                <span>How do revisions and feedback cycles work?</span>
                <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </summary>
              <div className="faq-answer">
                We conduct collaborative feedback rounds at every major milestone. We share interactive Figma links, staging previews, or Frame.io video links so you can leave pinpoint feedback before we finalize production.
              </div>
            </details>

            <details className="faq-item">
              <summary className="faq-question">
                <span>Can you handle all three (Brand, Web, Video) together?</span>
                <svg className="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </summary>
              <div className="faq-answer">
                That is our core superpower. Instead of hiring three separate agencies that struggle to align, we build your brand identity, code your website, and produce your launch video concurrently with unified creative direction.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-header">
            <h2 className="section-heading-centered" style={{ marginBottom: 0 }}>Ready to build something?</h2>
            <p className="contact-subtext">
              We work directly with you—no account managers, no layers of bureaucracy. Drop us a line about your brand, dev, or video needs.
            </p>
          </div>

          <div className="contact-form-wrapper">
            <form className="redesign-form" onSubmit={handleContactSubmit}>
              <input type="hidden" name="access_key" value="89c6e3bd-72cc-484f-a17e-130334989e24" />
              <input type="hidden" name="from_name" value="Clandest.agency Website" />
              <input type="hidden" name="subject" value="New Website Inquiry" />
              <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

              <div className="form-row-2col">
                <div className="form-field-group">
                  <input type="text" id="userName" name="name" className="form-input" placeholder=" " required />
                  <label htmlFor="userName">Your name</label>
                </div>

                <div className="form-field-group">
                  <input type="email" id="userEmail" name="email" className="form-input" placeholder=" " required />
                  <label htmlFor="userEmail">Your email</label>
                </div>
              </div>

              <div className="form-field-group">
                <select id="userService" name="service" className="form-select" defaultValue="Logo & Brand Design">
                  <option value="Logo & Brand Design">Logo & Brand Design</option>
                  <option value="Website Redesign">Website Redesign</option>
                  <option value="Marketing Video">Marketing Video</option>
                  <option value="Full Agency Support">Full Agency Retainer</option>
                </select>
                <label htmlFor="userService">What do you need help with?</label>
              </div>

              <div className="form-field-group">
                <textarea id="userMessage" name="message" className="form-textarea" placeholder=" " rows={4} required></textarea>
                <label htmlFor="userMessage">Tell us about your project</label>
              </div>

              <div className="form-action-container">
                <AnimatedButton type="submit" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </AnimatedButton>
                <span className="form-direct-note">You talk directly with our founding team.</span>
              </div>

              {formStatus === 'success' && (
                <div className="form-feedback" style={{ display: 'block', marginTop: '20px', fontSize: '16px', color: 'var(--c-blue)', fontWeight: 500 }}>
                  {feedbackMsg}
                </div>
              )}
              {formStatus === 'error' && (
                <div className="form-feedback" style={{ display: 'block', marginTop: '20px', fontSize: '16px', color: '#ff4d4d', fontWeight: 500 }}>
                  {feedbackMsg}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
