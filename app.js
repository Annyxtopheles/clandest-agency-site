/**
 * CLANDEST AGENCY — SCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. FAQ ACCORDION HANDLER
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const isOpen = item.classList.contains('active');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

      // Toggle current
      if (!isOpen) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 2. CONTACT FORM SUBMISSION (Web3Forms AJAX)
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const feedback = document.getElementById('formFeedback');

  if (form && submitBtn && feedback) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const originalBtnText = submitBtn.querySelector('.text').textContent;
      submitBtn.querySelector('.text').textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      })
      .then(async (response) => {
        const jsonResponse = await response.json();
        if (response.status === 200) {
          feedback.style.display = 'block';
          feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          form.reset();
        } else {
          alert(jsonResponse.message || 'Something went wrong. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        alert('Something went wrong. Please try sending directly to hello@clandest.agency');
      })
      .finally(() => {
        submitBtn.querySelector('.text').textContent = originalBtnText;
        submitBtn.disabled = false;
      });
    });
  }

});
