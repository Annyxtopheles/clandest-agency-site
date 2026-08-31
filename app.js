/**
 * CLANDEST AGENCY — MAIN INTERACTIVE SCRIPT
 */
document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. CONTACT FORM HANDLER (Web3Forms)
  // =========================================================================
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const feedback = document.getElementById('formFeedback');

  if (form && submitBtn) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const btnText = submitBtn.querySelector('.text');
      const originalText = btnText ? btnText.textContent : 'Send Message';
      
      // Disable button and show sending state
      submitBtn.disabled = true;
      if (btnText) {
        btnText.textContent = 'Sending...';
      } else {
        submitBtn.textContent = 'Sending...';
      }

      const formData = new FormData(form);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      })
      .then(async (response) => {
        let json = await response.json();
        if (response.status === 200) {
          if (feedback) {
            feedback.style.display = 'block';
            feedback.style.color = 'var(--c-blue)';
            feedback.textContent = 'Thank you! We received your message and will reply to your email shortly.';
          }
          form.reset();
        } else {
          console.error(json);
          if (feedback) {
            feedback.style.display = 'block';
            feedback.style.color = '#ff4d4d';
            feedback.textContent = json.message || 'Something went wrong. Please try again.';
          }
        }
      })
      .catch((error) => {
        console.error(error);
        if (feedback) {
          feedback.style.display = 'block';
          feedback.style.color = '#ff4d4d';
          feedback.textContent = 'Something went wrong. Please check your connection.';
        }
      })
      .finally(() => {
        submitBtn.disabled = false;
        if (btnText) {
          btnText.textContent = originalText;
        } else {
          submitBtn.textContent = originalText;
        }
        
        setTimeout(() => {
          if (feedback) {
            feedback.style.display = 'none';
          }
        }, 6000);
      });
    });
  }

  // =========================================================================
  // 3. MAGICUI KINETIC TEXT ENGINE (Character Weight & Kinetic Wave Physics)
  // =========================================================================
  const kineticTitles = document.querySelectorAll('.hero-title, .subpage-title');
  
  kineticTitles.forEach((title) => {
    // Preserve screen-reader accessibility
    const originalText = title.textContent.trim();
    if (!title.getAttribute('aria-label')) {
      title.setAttribute('aria-label', originalText);
    }

    const childNodes = Array.from(title.childNodes);
    title.innerHTML = '';

    const allChars = [];

    childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        const tokens = text.split(/(\s+)/);
        tokens.forEach((token) => {
          if (token.trim().length > 0) {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'kinetic-word';
            for (const char of token) {
              const charSpan = document.createElement('span');
              charSpan.className = 'kinetic-char';
              charSpan.textContent = char;
              charSpan.style.setProperty('--char-wght', '400');
              wordSpan.appendChild(charSpan);
              allChars.push(charSpan);
            }
            title.appendChild(wordSpan);
          } else if (token.length > 0) {
            title.appendChild(document.createTextNode(token));
          }
        });
      } else {
        title.appendChild(node.cloneNode(true));
      }
    });

    // Fluid Proximity Wave on MouseMove
    const radius = 135; // Proximity wave field radius in px
    const baseWeight = 400;
    const maxWeight = 800;

    title.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      allChars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const charCenterX = rect.left + rect.width / 2;
        const charCenterY = rect.top + rect.height / 2;

        const dist = Math.hypot(mouseX - charCenterX, mouseY - charCenterY);

        if (dist < radius) {
          const intensity = 1 - (dist / radius);
          const eased = Math.pow(intensity, 1.8);
          const targetWeight = Math.round(baseWeight + (maxWeight - baseWeight) * eased);
          const lift = -5 * eased;

          char.style.setProperty('--char-wght', targetWeight);
          char.style.transform = `translateY(${lift.toFixed(1)}px)`;
        } else {
          char.style.setProperty('--char-wght', '400');
          char.style.transform = 'translateY(0px)';
        }
      });
    });

    title.addEventListener('mouseleave', () => {
      allChars.forEach((char) => {
        char.style.setProperty('--char-wght', '400');
        char.style.transform = 'translateY(0px)';
      });
    });
  });

  // =========================================================================
  // 4. BUTTERY-SMOOTH 3D PARALLAX CARD TILT
  // =========================================================================
  const tiltElements = document.querySelectorAll('.team-member-card, .process-step-card, .step-card, .service-visual-card');
  
  tiltElements.forEach((el) => {
    el.style.transformStyle = 'preserve-3d';
    el.style.transition = 'transform 0.15s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.25s ease';
    el.style.willChange = 'transform';

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; // x pos within element
      const y = e.clientY - rect.top;  // y pos within element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation (-4deg to +4deg)
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.25s ease';
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });

    el.addEventListener('mouseenter', () => {
      el.style.transition = 'transform 0.15s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.25s ease';
    });
  });

  // =========================================================================
  // 5. MAGNETIC BUTTON PHYSICS
  // =========================================================================
  const magneticElements = document.querySelectorAll('.animated-button, .social-pill-badge, .card-button');

  magneticElements.forEach((btn) => {
    btn.style.transition = 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s ease';
    btn.style.willChange = 'transform';

    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      // Distance from mouse to center
      const distX = e.clientX - btnCenterX;
      const distY = e.clientY - btnCenterY;

      // Magnetic pull factor (0.28 = subtle, elastic drift)
      const moveX = distX * 0.28;
      const moveY = distY * 0.28;

      btn.style.transform = `translate3d(${moveX.toFixed(1)}px, ${moveY.toFixed(1)}px, 0) scale(1.04)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease';
      btn.style.transform = 'translate3d(0px, 0px, 0) scale(1)';
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.15s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.2s ease';
    });
  });

});
