// events.js - Filters upcoming events by category tags

document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.evt-filter-btn');
    const eventCards = document.querySelectorAll('.evt-card');

    if (filterButtons.length > 0 && eventCards.length > 0) {
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button state
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                // Filter cards visibility
                eventCards.forEach(card => {
                    const cat = card.getAttribute('data-category');
                    if (filter === 'all' || cat === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});
