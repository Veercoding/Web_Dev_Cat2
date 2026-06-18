/* ============================================================
   NexaWeb Agency — filter.js
   Portfolio / Services category filter
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const filterItems = document.querySelectorAll('[data-category]');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-filter');

      filterItems.forEach(item => {
        const match = cat === 'all' || item.getAttribute('data-category') === cat;
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        if (match) {
          item.style.opacity = '0';
          item.style.display = '';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => { item.style.display = 'none'; }, 300);
        }
      });
    });
  });
});
