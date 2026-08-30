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
  }
});
