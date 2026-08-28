/**
 * CLANDEST AGENCY — MINIMAL VANILLA JS SCRIPT
 */
document.addEventListener('DOMContentLoaded', () => {
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
