/**
 * CLANDEST AGENCY — MAIN VANILLA JS SCRIPT
 */
document.addEventListener('DOMContentLoaded', () => {
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
          console.error(response);
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
        // Re-enable button and restore text
        submitBtn.disabled = false;
        if (btnText) {
          btnText.textContent = originalText;
        } else {
          submitBtn.textContent = originalText;
        }
        
        // Hide feedback message after 6 seconds
        setTimeout(() => {
          if (feedback) {
            feedback.style.display = 'none';
          }
        }, 6000);
      });
    });
  // 1. LIVE DHAKA (UTC+6) CLOCK
  const dhakaClockEl = document.getElementById('dhakaClock');
  if (dhakaClockEl) {
    const updateDhakaClock = () => {
      const now = new Date();
      // Format time in Asia/Dhaka timezone
      const options = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
      dhakaClockEl.textContent = `Dhaka ${timeStr} • BST`;
    };
    updateDhakaClock();
    setInterval(updateDhakaClock, 1000);
  }

  // 2. INTERACTIVE WORD SPRING LIFT ON HEADLINES
  const heroTitles = document.querySelectorAll('.hero-title, .subpage-title');
  heroTitles.forEach((title) => {
    // Process text nodes to wrap words in .word-lift spans while preserving <br> tags
    const childNodes = Array.from(title.childNodes);
    title.innerHTML = '';
    childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent.split(/(\s+)/);
        words.forEach((part) => {
          if (part.trim().length > 0) {
            const span = document.createElement('span');
            span.className = 'word-lift';
            span.textContent = part;
            title.appendChild(span);
          } else if (part.length > 0) {
            title.appendChild(document.createTextNode(part));
          }
        });
      } else {
        title.appendChild(node.cloneNode(true));
      }
    });
  });
});

