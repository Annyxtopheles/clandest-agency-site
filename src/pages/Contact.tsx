import React, { useState } from 'react';
import { WordLift } from '../components/ui/WordLift';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { FaqAccordion, FaqItem } from '../components/ui/FaqAccordion';
import { triggerHaptic } from '../utils/haptics';

const CONTACT_FAQS: FaqItem[] = [
  {
    question: 'How fast can we start a project?',
    answer:
      'We can typically kick off within 3 to 5 business days after our initial discovery call and scope sign-off. We prepare onboarding roadmaps and milestone timelines immediately upon confirmation.',
  },
  {
    question: 'What are your turnaround times for each service?',
    answer:
      'Turnaround times depend on scope: Direct-response marketing video edits (VSLs, UGC cuts) deliver in 3 to 7 days. Brand identity design systems take 1 to 2 weeks. Custom website redesigns and frontend engineering sprints take 2 to 4 weeks from kickoff to deployment.',
  },
  {
    question: 'How do project payments and contracts work?',
    answer:
      'We work on milestone-based fixed pricing: typically 50% upfront to reserve sprint capacity and 50% upon final delivery and client satisfaction. You receive full commercial ownership and master files upon final sign-off with zero surprise invoices.',
  },
  {
    question: 'Can we schedule a call before sending a brief?',
    answer:
      'Yes! You can book a direct 15-minute intro conversation via Google Meet or message us on WhatsApp (+880 1869-504388) to discuss your vision directly with our founders.',
  },
];

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

          {/* Direct Contact & Quick Meeting Options */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
            <a
              href="https://wa.me/8801869504388?text=Hi%20Clandest%20Agency,%20I'd%20like%20to%20discuss%20a%20project!"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => triggerHaptic('medium')}
              className="social-pill-badge"
              style={{
                padding: '12px 24px',
                fontSize: '15px',
                backgroundColor: '#25D366',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)',
              }}
            >
              <svg className="badge-icon" viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px' }}>
                <path d="M17.507 14.307l-.009.075c-.244-.122-1.442-.712-1.666-.793-.223-.082-.386-.122-.549.122-.163.245-.632.794-.775.957-.142.163-.285.183-.529.061-.244-.122-1.03-.38-1.962-1.21-.726-.647-1.217-1.446-1.36-1.69-.142-.244-.015-.376.107-.498.11-.11.244-.285.367-.428.122-.142.163-.244.244-.407.082-.163.041-.306-.02-.428-.061-.123-.549-1.325-.753-1.814-.198-.476-.4-.412-.549-.42-.143-.007-.306-.009-.469-.009-.163 0-.428.061-.652.306-.224.244-.856.836-.856 2.039 0 1.203.877 2.365.999 2.528.122.163 1.724 2.632 4.177 3.69 2.453 1.059 2.453.706 2.894.665.441-.041 1.427-.584 1.631-1.149.204-.565.204-1.05.143-1.149-.062-.099-.225-.16-.469-.282z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.892.524 3.662 1.436 5.176L2 22l4.966-1.408A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2a8.17 8.17 0 01-4.226-1.173l-.303-.18-3.118.883.886-3.036-.197-.315A8.17 8.17 0 1112 20.2z" />
              </svg>
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="mailto:clandest.agency@gmail.com?subject=15-Minute%20Intro%20Call%20Request%20(Google%20Meet)&body=Hi%20Clandest%20Team,%0A%0AI'd%20like%20to%20schedule%20a%20quick%2015-minute%20intro%20call%20via%20Google%20Meet.%0A%0APreferred%20Date%20/%20Time%20(with%20timezone):%20"
              onClick={() => triggerHaptic('selection')}
              className="social-pill-badge"
              style={{
                padding: '12px 24px',
                fontSize: '15px',
                border: '1.5px solid var(--c-blue)',
                color: 'var(--c-blue)',
                fontWeight: 600,
              }}
            >
              <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px' }}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>Book 15-Min Google Meet</span>
            </a>

            <a href="mailto:clandest.agency@gmail.com" className="social-pill-badge" style={{ padding: '12px 24px', fontSize: '15px' }}>
              <svg className="badge-icon" viewBox="0 0 24 24" fill="none" style={{ width: '18px', height: '18px' }}>
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.548l8.073-6.055C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335" />
              </svg>
              <span>clandest.agency@gmail.com</span>
            </a>
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

          {/* Studio Information & Location Signals */}
          <div style={{ marginTop: '70px', borderTop: '1px solid var(--c-border)', paddingTop: '50px' }}>
            <div style={{ textAlign: 'center', marginBottom: '36px' }}>
              <h2 style={{ fontSize: '28px', color: 'var(--c-blue)', fontWeight: 600, marginBottom: '10px' }}>
                Direct Access & Studio Operations
              </h2>
              <p style={{ fontSize: '17px', color: 'var(--c-text-muted)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.5 }}>
                We operate as an agile creative studio headquartered in Dhaka, Bangladesh, collaborating with founders, startups, and marketing leaders globally.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '60px' }}>
              <div style={{ background: '#FFFFFF', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-card)', padding: '28px 24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--c-blue)', marginBottom: '8px' }}>Studio Headquarters</h3>
                <p style={{ fontSize: '15px', color: 'var(--c-text)', lineHeight: 1.5, margin: 0 }}>
                  Dhaka, Bangladesh (UTC+6). We coordinate seamless timezone overlap for clients across North America, Europe, and Asia.
                </p>
              </div>
              <div style={{ background: '#FFFFFF', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-card)', padding: '28px 24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--c-blue)', marginBottom: '8px' }}>Response Time</h3>
                <p style={{ fontSize: '15px', color: 'var(--c-text)', lineHeight: 1.5, margin: 0 }}>
                  Guaranteed response within 12 hours on business days (Sunday–Thursday). Direct communication with founders—never account managers.
                </p>
              </div>
              <div style={{ background: '#FFFFFF', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-card)', padding: '28px 24px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--c-blue)', marginBottom: '8px' }}>Sprint Engagements</h3>
                <p style={{ fontSize: '15px', color: 'var(--c-text)', lineHeight: 1.5, margin: 0 }}>
                  We take on a limited number of client projects per month to maintain craftsmanship, focus, and rapid turnaround speeds.
                </p>
              </div>
            </div>

            {/* Scope & Collaboration FAQs */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <h2 style={{ fontSize: '28px', color: 'var(--c-blue)', fontWeight: 600, marginBottom: '10px' }}>
                Project Scopes & Frequently Asked Questions
              </h2>
              <p style={{ fontSize: '17px', color: 'var(--c-text-muted)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.5 }}>
                Key information on onboarding, turnaround times, and scope commitments before we kick off.
              </p>
            </div>

            <FaqAccordion items={CONTACT_FAQS} />
          </div>
        </div>
      </section>
    </main>
  );
};
