import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatedButton } from '../ui/AnimatedButton';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close drawer on route navigation
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  return (
    <header className="site-header" id="siteHeader">
      <div className="nav-container">
        <Link
          to="/"
          className="brand-link"
          aria-label="Clandest Agency Homepage"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src="/assets/logo.svg" alt="Clandest Agency logo" className="brand-logo-img" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="main-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            <li>
              <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Services
              </NavLink>
            </li>
            <li>
              <NavLink to="/process" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Process
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="nav-action">
          <AnimatedButton to="/contact" className="header-cta-btn">
            Work with us
          </AnimatedButton>
        </div>

        {/* Mobile Hamburger / Close Toggle */}
        <button
          type="button"
          className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="mobileNavDrawer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="hamburger-box">
            <span className="hamburger-line top"></span>
            <span className="hamburger-line middle"></span>
            <span className="hamburger-line bottom"></span>
          </span>
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobileNavDrawer"
        className={`mobile-nav-drawer ${isMenuOpen ? 'open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <div className="mobile-nav-inner">
          <nav className="mobile-nav-menu" aria-label="Mobile Navigation">
            <ul className="mobile-nav-list">
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Services
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/process"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Process
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="mobile-nav-cta">
            <AnimatedButton to="/contact" className="header-cta-btn mobile-cta-btn" onClick={() => setIsMenuOpen(false)}>
              Work with us
            </AnimatedButton>
          </div>

          <div className="mobile-nav-contact-info">
            <a href="mailto:clandest.agency@gmail.com" className="mobile-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              clandest.agency@gmail.com
            </a>
            <a href="tel:+8801886373307" className="mobile-contact-item">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              +880 1886-373307
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
