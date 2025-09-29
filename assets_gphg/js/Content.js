function initMoreDetailButtons() {
    document.querySelectorAll('.more-detail-button').forEach(button => {
        if (button.dataset.listenerAttached === "true") return;

        button.addEventListener('click', function () {
            const section = this.closest('section');
            const content = section?.querySelector('.about-content-inner, .description-text-container');

            if (!content) return;

            content.classList.toggle('expanded');
            this.textContent = content.classList.contains('expanded') ? 'Less detail' : 'More detail';
        });

        button.dataset.listenerAttached = "true";
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMoreDetailButtons();
});
