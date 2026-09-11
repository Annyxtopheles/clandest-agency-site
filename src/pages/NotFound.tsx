import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedButton } from '../components/ui/AnimatedButton';

export const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = '404: Page Not Found — Clandest Agency';
  }, []);

  return (
    <main>
      <section className="not-found-section" style={{ minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 80px' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              background: 'rgba(46, 79, 148, 0.08)',
              border: '1px solid rgba(46, 79, 148, 0.25)',
              color: 'var(--c-blue)',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '1px',
              marginBottom: '24px',
            }}
          >
            ERROR 404
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 700, color: 'var(--c-blue)', lineHeight: 1.15, marginBottom: '20px' }}>
            Page Not Found
          </h1>

          <p style={{ fontSize: '19px', color: 'var(--c-text)', lineHeight: 1.5, marginBottom: '36px' }}>
            The link you followed doesn't exist or may have been moved. Let's get you back to where you need to be.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <AnimatedButton to="/">
              Return Home
            </AnimatedButton>
            <Link
              to="/contact"
              className="social-pill-badge"
              style={{
                padding: '12px 24px',
                fontSize: '15px',
                fontWeight: 600,
                color: 'var(--c-blue)',
                border: '1.5px solid var(--c-blue)',
              }}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};
