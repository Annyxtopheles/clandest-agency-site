import React, { useState } from 'react';
import { WordLift } from '../components/ui/WordLift';
import { AnimatedButton } from '../components/ui/AnimatedButton';

export const Contact: React.FC = () => {
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
      <section className="contact-section" id="contact" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="subpage-hero" style={{ paddingTop: '20px' }}>
            <WordLift as="h1" className="subpage-title">
              Ready to build something?
            </WordLift>
            <p className="subpage-subtext">
              We work directly with you—no account managers, no layers of bureaucracy. Drop us a line about your brand, dev, or video needs.
            </p>
          </div>

          {/* Direct Contact Pills */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <a href="mailto:clandest.agency@gmail.com" className="social-pill-badge" style={{ padding: '10px 24px', fontSize: '16px' }}>
              <svg className="badge-icon" viewBox="0 0 24 24" fill="none" style={{ width: '18px', height: '18px' }}>
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.548l8.073-6.055C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335" />
              </svg>
              <span>clandest.agency@gmail.com</span>
            </a>
            <div className="contact-info-pill">
              <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="var(--c-blue)" strokeWidth="2" style={{ width: '18px', height: '18px' }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>

          {/* Contact Form */}
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
