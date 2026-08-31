/**
 * CLANDEST AGENCY — INTERACTIVE ENGINE
 * Lightweight, vanilla JavaScript (60-120 FPS, 0 dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. LIVE DHAKA REAL-TIME CLOCK
  const clockEl = document.getElementById('liveDhakaClock');
  if (clockEl) {
    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
      clockEl.textContent = timeStr + ' BST';
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  // 2. SCROLL PROGRESS BAR
  const progressBar = document.getElementById('scrollProgress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = progress + '%';
    }, { passive: true });
  }

  // 3. AMBIENT SPARKLE DUST CANVAS (WITH REPEL PHYSICS)
  const canvas = document.getElementById('sparkleCanvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(32, Math.floor(window.innerWidth / 45));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 4 + 4,
        baseAlpha: Math.random() * 0.25 + 0.1,
        rotation: Math.random() * Math.PI
      });
    }

    let mouse = { x: -1000, y: -1000 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    const drawSparkle = (cx, cy, spikes, outerRadius, innerRadius) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.beginPath();
      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.fillStyle = '#2E4F94';
      ctx.fill();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 3;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.save();
        ctx.globalAlpha = p.baseAlpha;
        drawSparkle(p.x, p.y, 4, p.size, p.size * 0.35);
        ctx.restore();
      });

      requestAnimationFrame(render);
    };

    render();
  }

  // 4. 3D CARD TILT ON HOVER
  const tiltCards = document.querySelectorAll('.tilt-card');
  if (tiltCards.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -3.5;
        const rotateY = ((x - centerX) / centerX) * 3.5;

        card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-3px)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      });
    });
  }

  // 5. MAGNETIC BUTTON PHYSICS
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  if (magneticBtns.length && window.innerWidth > 768) {
    magneticBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.22) + 'px, ' + (y * 0.22) + 'px)';
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // 6. SYNTHESIZED ASMR MICRO-CLICK (WEB AUDIO API)
  let audioEnabled = false;
  let audioCtx = null;

  const playClickSound = (freq = 800) => {
    if (!audioEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.04);
    } catch (err) {
      // Audio fallback
    }
  };

  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioIcon = document.getElementById('audioIcon');
  const audioLabel = document.getElementById('audioLabel');

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      if (audioEnabled) {
        audioIcon.textContent = '🔊';
        audioLabel.textContent = 'Sound: On';
        playClickSound(950);
      } else {
        audioIcon.textContent = '🔈';
        audioLabel.textContent = 'Sound: Off';
      }
    });
  }

  document.querySelectorAll('button, .pill-btn, .calc-pill, .nav-link').forEach((el) => {
    el.addEventListener('click', () => playClickSound(750));
  });

  // 7. INTERACTIVE PROJECT SCOPE CALCULATOR
  const calcDeliverables = document.querySelectorAll('[data-calc-group="deliverable"] .calc-pill');
  const calcScopes = document.querySelectorAll('[data-calc-group="scope"] .calc-pill');
  const calcTimelines = document.querySelectorAll('[data-calc-group="timeline"] .calc-pill');

  const estimateValueEl = document.getElementById('calcEstimateValue');
  const summaryTextEl = document.getElementById('calcSummaryText');
  const applyScopeBtn = document.getElementById('applyScopeBtn');

  let currentDeliverable = 'Custom Website';
  let currentScope = 'Single Landing Page';
  let currentTimeline = 'Standard Pace';
  let baseDays = 14;
  let scopeFactor = 1.0;

  const updateEstimate = () => {
    const totalDays = Math.round(baseDays * scopeFactor);
    let minWeeks = Math.max(1, Math.round(totalDays / 7));
    let maxWeeks = minWeeks + 1;

    if (currentTimeline.indexOf('Fast Track') !== -1) {
      minWeeks = Math.max(1, minWeeks - 1);
      maxWeeks = Math.max(minWeeks, maxWeeks - 1);
    }

    if (estimateValueEl) {
      estimateValueEl.textContent = '~' + minWeeks + ' to ' + maxWeeks + ' Weeks';
    }
    if (summaryTextEl) {
      summaryTextEl.textContent = currentDeliverable + ' • ' + currentScope + ' • ' + currentTimeline;
    }
  };

  const bindPillGroup = (pills, onSelect) => {
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        onSelect(pill);
        updateEstimate();
      });
    });
  };

  bindPillGroup(calcDeliverables, (p) => {
    currentDeliverable = p.getAttribute('data-value');
    baseDays = parseFloat(p.getAttribute('data-days')) || 14;
  });

  bindPillGroup(calcScopes, (p) => {
    currentScope = p.getAttribute('data-value');
    scopeFactor = parseFloat(p.getAttribute('data-factor')) || 1.0;
  });

  bindPillGroup(calcTimelines, (p) => {
    currentTimeline = p.getAttribute('data-value');
  });

  if (applyScopeBtn) {
    applyScopeBtn.addEventListener('click', () => {
      const messageField = document.getElementById('message');
      const serviceSelect = document.getElementById('serviceType');

      if (serviceSelect) {
        if (currentDeliverable.indexOf('Brand + Web') !== -1) serviceSelect.value = 'both';
        else if (currentDeliverable.indexOf('Branding') !== -1) serviceSelect.value = 'branding';
        else if (currentDeliverable.indexOf('Redesign') !== -1) serviceSelect.value = 'redesign';
        else serviceSelect.value = 'website';
      }

      if (messageField) {
        messageField.value = 'Hi Clandest team, I would like to explore a project for: ' + currentDeliverable + ' (' + currentScope + ') targeting a ' + currentTimeline + ' timeline.';
      }

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (messageField) messageField.focus();
        }, 500);
      }
    });
  }

  // 8. CONTACT FORM SUBMISSION
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const feedback = document.getElementById('formFeedback');

  if (form && submitBtn && feedback) {
    submitBtn.addEventListener('click', (e) => {
      if (form.checkValidity()) {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending message...';

        setTimeout(() => {
          form.reset();
          feedback.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Message';
        }, 800);
      } else {
        form.reportValidity();
      }
    });
  }

});
