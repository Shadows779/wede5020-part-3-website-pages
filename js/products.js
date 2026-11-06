document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('product-search-input');
  const figures = Array.from(document.querySelectorAll('.image-grid figure'));
  const imageGrid = document.querySelector('.image-grid');
  const noResultsMessage = document.createElement('p');

  noResultsMessage.className = 'search-empty';
  noResultsMessage.textContent = 'No products or prices match your search.';
  noResultsMessage.style.display = 'none';
  noResultsMessage.setAttribute('aria-live', 'polite');

  if (imageGrid && !imageGrid.parentElement.querySelector('.search-empty')) {
    imageGrid.insertAdjacentElement('afterend', noResultsMessage);
  }

  const filterProducts = (event) => {
    const query = (event.target.value || '').trim().toLowerCase();
    let visibleProducts = 0;

    figures.forEach((figure) => {
      const captionText = (figure.querySelector('figcaption')?.textContent || '').toLowerCase();
      const altText = (figure.querySelector('img')?.getAttribute('alt') || '').toLowerCase();
      const matches = !query || captionText.includes(query) || altText.includes(query);

      figure.style.display = matches ? '' : 'none';
      if (matches) {
        visibleProducts += 1;
      }
    });

    noResultsMessage.style.display = visibleProducts === 0 ? 'block' : 'none';
  };

  if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
  }
});