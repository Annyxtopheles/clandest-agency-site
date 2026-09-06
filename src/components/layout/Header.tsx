import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatedButton } from '../ui/AnimatedButton';

export const Header: React.FC = () => {
  return (
    <header className="site-header" id="siteHeader">
      <div className="nav-container">
        <Link to="/" className="brand-link" aria-label="Clandest Agency Homepage">
          <img src="/assets/logo.svg" alt="Clandest Agency logo" className="brand-logo-img" />
        </Link>

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

        <div className="nav-action" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <AnimatedButton to="/contact" className="header-cta-btn">
            Work with us
          </AnimatedButton>
        </div>
      </div>
    </header>
  );
};
