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

  // =========================================================================
  // 6. TEXT PRESSURE FOOTER WORDMARK ENGINE (Interactive Variable Typography)
  // =========================================================================
  const textPressureContainers = document.querySelectorAll('.footer-giant-wordmark-container');

  textPressureContainers.forEach((container) => {
    const text = container.dataset.text || 'CLANDESTAGENCY';
    container.innerHTML = '';

    const title = document.createElement('h2');
    title.className = 'text-pressure-title';
    title.setAttribute('aria-label', 'Clandest Agency');
    container.appendChild(title);

    const chars = text.split('');
    const spans = [];

    chars.forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.setAttribute('data-char', char);
      title.appendChild(span);
      spans.push(span);
    });

    const mouse = { x: 0, y: 0 };
    const cursor = { x: 0, y: 0 };

    const updateInitialPos = () => {
      const rect = container.getBoundingClientRect();
      mouse.x = rect.left + rect.width / 2;
      mouse.y = rect.top + rect.height / 2;
      cursor.x = mouse.x;
      cursor.y = mouse.y;
    };
    updateInitialPos();

    const handleMouseMove = (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches && e.touches[0]) {
        cursor.x = e.touches[0].clientX;
        cursor.y = e.touches[0].clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Dynamic responsive font size to span container
    const setSize = () => {
      const containerW = container.getBoundingClientRect().width;
      if (containerW <= 0) return;

      // Calculate base font size fitted to character count
      const newFontSize = containerW / (chars.length * 0.58);
      title.style.fontSize = `${Math.max(newFontSize, 24).toFixed(1)}px`;
    };

    setSize();
    window.addEventListener('resize', setSize);

    const dist = (a, b) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const getAttr = (distance, maxDist, minVal, maxVal) => {
      const val = maxVal - Math.abs((maxVal * distance) / maxDist);
      return Math.max(minVal, val + minVal);
    };

    const animate = () => {
      // Elastic cursor spring
      mouse.x += (cursor.x - mouse.x) / 12;
      mouse.y += (cursor.y - mouse.y) / 12;

      const titleRect = title.getBoundingClientRect();
      const maxDist = Math.max(titleRect.width / 2, 200);

      spans.forEach((span) => {
        const rect = span.getBoundingClientRect();
        const charCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };

        const d = dist(mouse, charCenter);

        // Variable font parameters (wdth 25..151, wght 100..900, ital 0..1)
        const wdth = Math.floor(getAttr(d, maxDist, 25, 151));
        const wght = Math.floor(getAttr(d, maxDist, 100, 900));
        const italVal = getAttr(d, maxDist, 0, 1).toFixed(2);

        const settings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${italVal}`;
        if (span.style.fontVariationSettings !== settings) {
          span.style.fontVariationSettings = settings;
        }
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  });
});

