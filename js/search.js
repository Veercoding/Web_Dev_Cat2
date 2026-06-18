/* ============================================================
   NexaWeb Agency — search.js
   Live search filter for Blog and FAQ pages
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('liveSearch');
  if (!searchInput) return;

  const searchables = document.querySelectorAll('[data-searchable]');
  const noResults   = document.getElementById('noResults');

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    searchables.forEach(item => {
      const text  = item.getAttribute('data-searchable').toLowerCase();
      // Also search visible text content
      const inner = item.textContent.toLowerCase();
      const match = !query || text.includes(query) || inner.includes(query);

      if (match) {
        item.style.display = '';
        item.style.opacity = '1';
        visibleCount++;
      } else {
        item.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  });

  // Clear search on Escape
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input'));
      searchInput.blur();
    }
  });
});
