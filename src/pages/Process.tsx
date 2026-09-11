import React from 'react';
import { WordLift } from '../components/ui/WordLift';
import { AnimatedButton } from '../components/ui/AnimatedButton';
import { TiltCard } from '../components/ui/TiltCard';
import { FaqAccordion } from '../components/ui/FaqAccordion';

export const Process: React.FC = () => {
  return (
    <main>
      <section className="approach-section">
        <div className="container">
          <div className="subpage-hero" style={{ paddingTop: '20px', marginBottom: '30px' }}>
            <WordLift as="h1" className="subpage-title">
              How a project works with us.
            </WordLift>
            <p className="subpage-subtext">
              A direct, transparent 4-stage collaboration from kickoff to live deployment. You work directly with our founding team.
            </p>
          </div>

          <h2 className="section-heading-centered" style={{ marginBottom: '40px' }}>Our 4-Stage Process</h2>

          <div className="approach-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '70px' }}>
            <TiltCard className="step-card" style={{ background: '#FFFFFF', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-card)', padding: '40px 30px' }}>
              <h3 className="step-title" style={{ fontSize: '28px', color: 'var(--c-blue)', fontWeight: 600, marginBottom: '14px' }}>We talk</h3>
              <p className="step-desc" style={{ fontSize: '18px', color: 'var(--c-text)', lineHeight: 1.5 }}>
                You outline your goals, target audience, and timeline directly with us. We establish a clear, fixed quote without hidden costs or scope creep.
              </p>
            </TiltCard>

            <TiltCard className="step-card" style={{ background: '#FFFFFF', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-card)', padding: '40px 30px' }}>
              <h3 className="step-title" style={{ fontSize: '28px', color: 'var(--c-blue)', fontWeight: 600, marginBottom: '14px' }}>We design</h3>
              <p className="step-desc" style={{ fontSize: '18px', color: 'var(--c-text)', lineHeight: 1.5 }}>
                We present high-fidelity brand concepts, interactive Figma prototypes, or video storyboards. We collaborate with you to refine assets until they hit the mark.
              </p>
            </TiltCard>

            <TiltCard className="step-card" style={{ background: '#FFFFFF', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-card)', padding: '40px 30px' }}>
              <h3 className="step-title" style={{ fontSize: '28px', color: 'var(--c-blue)', fontWeight: 600, marginBottom: '14px' }}>We build</h3>
              <p className="step-desc" style={{ fontSize: '18px', color: 'var(--c-text)', lineHeight: 1.5 }}>
                Nafiur writes lightweight, high-performance code while Rafayet handles post-production video editing and audio mastering, ensuring rapid delivery.
              </p>
            </TiltCard>

            <TiltCard className="step-card" style={{ background: '#FFFFFF', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-card)', padding: '40px 30px' }}>
              <h3 className="step-title" style={{ fontSize: '28px', color: 'var(--c-blue)', fontWeight: 600, marginBottom: '14px' }}>We launch</h3>
              <p className="step-desc" style={{ fontSize: '18px', color: 'var(--c-text)', lineHeight: 1.5 }}>
                We coordinate DNS setup, push your site live, and deliver all final and raw master files. You retain 100% full commercial ownership of everything we build.
              </p>
            </TiltCard>
          </div>

          {/* FAQ Section */}
          <div className="faq-section" style={{ marginBottom: '80px' }}>
            <h2 className="section-heading-centered" style={{ marginBottom: '16px' }}>Frequently Asked Questions</h2>
            <p className="section-subtext-centered" style={{ maxWidth: '650px', margin: '0 auto 40px', textAlign: 'center' }}>
              Direct, transparent answers about timelines, deliverables, commercial rights, and how we collaborate.
            </p>
            <FaqAccordion />
          </div>

          {/* Bottom CTA Box */}
          <div style={{ backgroundColor: '#FAFAFA', border: '1px solid var(--c-border)', borderRadius: 'var(--radius-card)', padding: '50px 30px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '32px', color: 'var(--c-blue)', fontWeight: 600, marginBottom: '12px' }}>Ready to get started?</h2>
            <p style={{ fontSize: '20px', color: 'var(--c-text)', maxWidth: '600px', margin: '0 auto 28px' }}>
              Let's discuss your brand, web, or video project directly.
            </p>
            <AnimatedButton to="/contact">
              Start a Project
            </AnimatedButton>
          </div>
        </div>
      </section>
    </main>
  );
};
