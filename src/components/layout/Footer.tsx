import React from 'react';
import { TextPressure } from '../ui/TextPressure';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer-redesign">
      <div className="container">
        {/* Giant Interactive TextPressure Wordmark */}
        <TextPressure text="CLANDESTAGENCY" />

        {/* Bottom Bar with Copyright and Social Badges */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright-text">
            &copy; 2026, Clandest.agency | Handcrafted in Dhaka.
          </div>

          <div className="footer-social-badges">
            <a href="https://www.facebook.com/clandest.agency" className="social-pill-badge" target="_blank" rel="noopener noreferrer">
              <svg className="badge-icon" viewBox="0 0 24 24" fill="none">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
              </svg>
              <span>Facebook</span>
            </a>

            {/* WhatsApp Badge */}
            <a href="https://wa.me/8801869504388" className="social-pill-badge" target="_blank" rel="noopener noreferrer">
              <svg className="badge-icon" viewBox="0 0 24 24" fill="none">
                <path d="M17.507 14.307l-.009.075c-.244-.122-1.442-.712-1.666-.793-.223-.082-.386-.122-.549.122-.163.245-.632.794-.775.957-.142.163-.285.183-.529.061-.244-.122-1.03-.38-1.962-1.21-.726-.647-1.217-1.446-1.36-1.69-.142-.244-.015-.376.107-.498.11-.11.244-.285.367-.428.122-.142.163-.244.244-.407.082-.163.041-.306-.02-.428-.061-.123-.549-1.325-.753-1.814-.198-.476-.4-.412-.549-.42-.143-.007-.306-.009-.469-.009-.163 0-.428.061-.652.306-.224.244-.856.836-.856 2.039 0 1.203.877 2.365.999 2.528.122.163 1.724 2.632 4.177 3.69 2.453 1.059 2.453.706 2.894.665.441-.041 1.427-.584 1.631-1.149.204-.565.204-1.05.143-1.149-.062-.099-.225-.16-.469-.282z" fill="#25D366"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 1.892.524 3.662 1.436 5.176L2 22l4.966-1.408A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2a8.17 8.17 0 01-4.226-1.173l-.303-.18-3.118.883.886-3.036-.197-.315A8.17 8.17 0 1112 20.2z" fill="#25D366"/>
              </svg>
              <span>Whatsapp</span>
            </a>

            {/* Gmail Badge */}
            <a href="mailto:clandest.agency@gmail.com" className="social-pill-badge">
              <svg className="badge-icon" viewBox="0 0 24 24" fill="none">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.548l8.073-6.055C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
              </svg>
              <span>Gmail</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
