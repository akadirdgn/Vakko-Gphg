document.querySelectorAll('.more-detail-button').forEach(button => {
  button.addEventListener('click', function() {
    const content = this.closest('section').querySelector('.about-content-inner, .description-text-container');
    content.classList.toggle('expanded');
    this.textContent = content.classList.contains('expanded') ? 'Less detail' : 'More detail';
  });
});
