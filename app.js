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

        // Controlled, tasteful font variation (Regular 400 to Bold 800 across 5 clean weights)
        const rawWght = getAttr(d, maxDist, 400, 800);
        // Snap to 5 clean weights: 400, 500, 600, 700, 800
        const wght = Math.min(800, Math.max(400, Math.round(rawWght / 100) * 100));
        
        // Subtle, elegant width response (90% to 115%)
        const wdth = Math.floor(getAttr(d, maxDist, 90, 115));

        const settings = `'wght' ${wght}, 'wdth' ${wdth}`;
        if (span.style.fontVariationSettings !== settings) {
          span.style.fontVariationSettings = settings;
        }
      });

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  });

  // =========================================================================
  // 7. VIDEO PORTFOLIO SHOWCASE & LIGHTBOX PLAYER (By Abdullah Al Rafayet)
  // =========================================================================
  const videoGrid = document.getElementById('videoPortfolioGrid');
  if (videoGrid) {
    const videoProjects = [
      {
        id: '1-wkIHX69tQ',
        title: 'Healthcare Product VSL (Core Pitch)',
        category: 'vsl',
        categoryLabel: 'VSL & Commercial',
        duration: '1:31',
        desc: 'Conversion-driven direct response edit featuring synchronized motion typography, B-roll pacing, and clinical proof graphics.',
        author: 'Post-Production by Abdullah Al Rafayet'
      },
      {
        id: 'O1KD4GBdw3s',
        title: 'Healthcare Product VSL (In-Depth)',
        category: 'vsl',
        categoryLabel: 'VSL & Commercial',
        duration: '2:45',
        desc: 'Extended high-ticket explainer with custom sound design, color grading, and dynamic product breakdown.',
        author: 'Post-Production by Abdullah Al Rafayet'
      },
      {
        id: 't9RAkGK49BM',
        title: 'Female UGC & Testimonial Ad',
        category: 'ugc',
        categoryLabel: 'Short-Form UGC',
        duration: '0:51',
        desc: 'High-engagement authentic creator testimonial with dynamic subtitles, sound effects, and scroll-stopping hooks.',
        author: 'Post-Production by Abdullah Al Rafayet'
      },
      {
        id: 'CrxJCEeQ0Os',
        title: 'Healthcare Product VSL (Benefits Breakdown)',
        category: 'vsl',
        categoryLabel: 'VSL & Commercial',
        duration: '1:44',
        desc: 'Fast-paced sales video pacing highlighting competitive advantages, user testimonials, and urgent CTA.',
        author: 'Post-Production by Abdullah Al Rafayet'
      },
      {
        id: 'bvAdnAvqvCU',
        title: 'Healthcare Product VSL (Full Narrative)',
        category: 'vsl',
        categoryLabel: 'VSL & Commercial',
        duration: '3:10',
        desc: 'Comprehensive marketing narrative structured for cold-traffic conversion and high average order value.',
        author: 'Post-Production by Abdullah Al Rafayet'
      },
      {
        id: 'Mt4w-_jwU_c',
        title: 'Healthcare Product VSL (Problem / Solution)',
        category: 'vsl',
        categoryLabel: 'VSL & Commercial',
        duration: '2:20',
        desc: 'Story-driven hook sequence with visual problem agitation and scientific solution validation.',
        author: 'Post-Production by Abdullah Al Rafayet'
      },
      {
        id: 'uIE8A5dWw9A',
        title: 'Healthcare Product (High-Impact 60s)',
        category: 'vsl',
        categoryLabel: 'VSL & Commercial',
        duration: '1:00',
        desc: 'Punchy 60-second direct response cut optimized for paid social ads and rapid hook retention.',
        author: 'Post-Production by Abdullah Al Rafayet'
      },
      {
        id: '-nfffjkbgY0',
        title: 'Murder Mystery & Narrative Showcase',
        category: 'documentary',
        categoryLabel: 'Documentary & Story',
        duration: '0:52',
        desc: 'Atmospheric narrative editing featuring dark color grading, Foley sound design, and tense cinematic pacing.',
        author: 'Post-Production by Abdullah Al Rafayet'
      },
      {
        id: 'QwrpMQH9UGE',
        title: 'Construction & Industry Showcase',
        category: 'documentary',
        categoryLabel: 'Documentary & Story',
        duration: '0:49',
        desc: 'Heavy industrial documentary edit highlighting commercial project milestones with clean lower-third graphics.',
        author: 'Post-Production by Abdullah Al Rafayet'
      },
      {
        id: '_-_xyVjZivE',
        title: 'History Documentary & Archival Motion',
        category: 'documentary',
        categoryLabel: 'Documentary & Story',
        duration: '0:38',
        desc: 'Archival image restoration, 2.5D parallax photo animation, and historical storytelling pacing.',
        author: 'Post-Production by Abdullah Al Rafayet'
      },
      {
        id: 'mIV8rsaohN4',
        title: 'Commercial Direct-Response Showreel',
        category: 'vsl',
        categoryLabel: 'VSL & Commercial',
        duration: '1:15',
        desc: 'Curated montage of high-converting e-commerce product videos, motion graphics, and sales letters.',
        author: 'Post-Production by Abdullah Al Rafayet'
      }
    ];

    // Render cards function
    const renderVideoCards = (filter = 'all') => {
      videoGrid.innerHTML = '';
      const filtered = filter === 'all' 
        ? videoProjects 
        : videoProjects.filter(p => p.category === filter);

      filtered.forEach((video) => {
        const card = document.createElement('div');
        card.className = 'video-project-card';
        card.dataset.videoId = video.id;
        card.dataset.category = video.category;

        card.innerHTML = `
          <div class="video-thumbnail-box">
            <img src="https://img.youtube.com/vi/${video.id}/hqdefault.jpg" alt="${video.title}" loading="lazy">
            <div class="video-play-badge">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
            <div class="video-duration-pill">${video.duration}</div>
          </div>
          <div class="video-card-info">
            <div class="video-category-tag">${video.categoryLabel}</div>
            <h4 class="video-card-title">${video.title}</h4>
            <p class="video-card-desc">${video.desc}</p>
            <div class="video-author-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
              <span>${video.author}</span>
            </div>
          </div>
        `;

        card.addEventListener('click', () => {
          openVideoModal(video.id, video.title);
        });

        videoGrid.appendChild(card);
      });
    };

    // Filter Buttons
    const filterButtons = document.querySelectorAll('.video-filter-btn');
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderVideoCards(btn.dataset.filter);
      });
    });

    renderVideoCards('all');

    // Create Modal Elements
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'video-modal-overlay';
    modalOverlay.innerHTML = `
      <div class="video-modal-dialog">
        <button class="video-modal-close-btn" aria-label="Close Video Player">&times;</button>
        <div class="video-modal-iframe-box"></div>
      </div>
    `;
    document.body.appendChild(modalOverlay);

    const iframeBox = modalOverlay.querySelector('.video-modal-iframe-box');
    const closeBtn = modalOverlay.querySelector('.video-modal-close-btn');

    const openVideoModal = (videoId, title) => {
      iframeBox.innerHTML = `
        <iframe 
          src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0" 
          title="${title}" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>
      `;
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeVideoModal = () => {
      modalOverlay.classList.remove('active');
      iframeBox.innerHTML = '';
      document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeVideoModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeVideoModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeVideoModal();
      }
    });
  }
});

