// international-partnerships.js - Handles SVG Map interaction details

document.addEventListener('DOMContentLoaded', () => {
    const nodes = document.querySelectorAll('.map-node');
    const cards = document.querySelectorAll('.country-card');

    if (nodes.length > 0 && cards.length > 0) {
        nodes.forEach(node => {
            node.addEventListener('click', () => {
                // Update active marker states
                nodes.forEach(n => n.classList.remove('active'));
                node.classList.add('active');

                // Get targeted country card
                const target = node.getAttribute('data-target');
                
                // Hide all cards, show active card
                cards.forEach(card => {
                    card.classList.remove('active');
                    if (card.id === target) {
                        card.classList.add('active');
                    }
                });
            });
        });
    }
});
