/* ============================================================
   NexaWeb Agency — contact.js
   Contact form validation + toast notification
   ============================================================ */

'use strict';

/* ── Toast ─────────────────────────────────────────────────── */
const showToast = (msg, type = 'success', duration = 4000) => {
  let toast = document.getElementById('nexaToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'nexaToast';
    toast.className = 'nexa-toast';
    document.body.appendChild(toast);
  }
  toast.style.borderLeftColor = type === 'success' ? 'var(--clr-success)' : 'var(--clr-danger)';
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
};

/* ── Form Validation ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  const showFeedback = (fieldId, msg, type) => {
    const field = document.getElementById(fieldId);
    const fb    = document.getElementById(fieldId + 'Feedback');
    if (!field) return;
    field.classList.toggle('is-invalid', type === 'error');
    field.classList.toggle('is-valid',   type === 'success');
    if (fb) {
      fb.textContent = msg;
      fb.className   = `form-feedback ${type}`;
    }
  };

  const validateField = (id) => {
    const el = document.getElementById(id);
    if (!el) return true;
    const val = el.value.trim();

    switch (id) {
      case 'contactName':
        if (!val) { showFeedback(id, 'Full name is required.', 'error'); return false; }
        if (val.length < 2) { showFeedback(id, 'Name must be at least 2 characters.', 'error'); return false; }
        showFeedback(id, '✓ Looks good!', 'success'); return true;

      case 'contactEmail':
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val) { showFeedback(id, 'Email address is required.', 'error'); return false; }
        if (!emailRe.test(val)) { showFeedback(id, 'Please enter a valid email address.', 'error'); return false; }
        showFeedback(id, '✓ Looks good!', 'success'); return true;

      case 'contactService':
        if (!val) { showFeedback(id, 'Please select a service.', 'error'); return false; }
        showFeedback(id, '✓ Got it!', 'success'); return true;

      case 'contactMessage':
        if (!val) { showFeedback(id, 'Please tell us about your project.', 'error'); return false; }
        if (val.length < 20) { showFeedback(id, `Message too short (${val.length}/20 characters minimum).`, 'error'); return false; }
        showFeedback(id, '✓ Great message!', 'success'); return true;

      default:
        if (!val) { showFeedback(id, 'This field is required.', 'error'); return false; }
        showFeedback(id, '', 'success'); return true;
    }
  };

  // Real-time validation on blur
  ['contactName', 'contactEmail', 'contactService', 'contactMessage'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('blur', () => validateField(id));
      el.addEventListener('input', () => {
        // Clear error state while typing
        if (el.classList.contains('is-invalid')) validateField(id);
      });
    }
  });

  // Submit
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields    = ['contactName', 'contactEmail', 'contactService', 'contactMessage'];
    const allValid  = fields.every(id => validateField(id));

    if (allValid) {
      // Simulate sending
      const btn = contactForm.querySelector('[type="submit"]');
      if (btn) {
        btn.textContent = 'Sending...';
        btn.disabled = true;
      }
      setTimeout(() => {
        showToast('✅ Message sent! We\'ll get back to you within 24 hours.');
        contactForm.reset();
        fields.forEach(id => {
          const el = document.getElementById(id);
          if (el) el.classList.remove('is-valid', 'is-invalid');
          const fb = document.getElementById(id + 'Feedback');
          if (fb) fb.textContent = '';
        });
        if (btn) { btn.textContent = 'Send Message'; btn.disabled = false; }
      }, 1200);
    } else {
      showToast('⚠️ Please fix the errors above.', 'error');
      const firstError = contactForm.querySelector('.is-invalid');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});
