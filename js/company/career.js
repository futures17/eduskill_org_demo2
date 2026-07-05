// career.js - Lightweight Vanilla JS for Career Page Interaction

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Mobile Menu Toggles and Dropdown Drawers
    // ==========================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            if (navMenu.classList.contains('active')) {
                navToggle.innerHTML = '✕';
            } else {
                navToggle.innerHTML = '☰';
                // Close all nested dropdowns when closing menu
                document.querySelectorAll('.nav-item.dropdown').forEach(item => {
                    item.classList.remove('open');
                });
            }
        });
    }

    // Toggle dropdown panels on mobile click
    const dropdownToggles = document.querySelectorAll('.nav-item.dropdown > .dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 991) {
                e.preventDefault(); // Prevent default link navigation
                const parent = toggle.parentElement;
                parent.classList.toggle('open');
            }
        });
    });

    // ==========================================
    // 2. Open Positions Filter
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const positionCards = document.querySelectorAll('.position-card');

    if (filterButtons.length > 0 && positionCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                positionCards.forEach(card => {
                    const cardDept = card.getAttribute('data-department');
                    
                    if (filterValue === 'all' || cardDept === filterValue) {
                        card.classList.remove('hidden-card');
                    } else {
                        card.classList.add('hidden-card');
                    }
                });
            });
        });
    }

    // ==========================================
    // 3. Employee Stories Auto-Carousel
    // ==========================================
    const storySlides = document.querySelectorAll('.story-slide');
    const storyDots = document.querySelectorAll('.story-dot');
    const prevBtn = document.getElementById('story-prev');
    const nextBtn = document.getElementById('story-next');
    let currentStoryIndex = 0;
    let storyTimer = null;
    const autoIntervalTime = 6000; // Rotate stories every 6 seconds

    const showStory = (index) => {
        if (storySlides.length === 0) return;
        
        storySlides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === index);
        });

        storyDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });

        currentStoryIndex = index;
    };

    const nextStory = () => {
        let next = currentStoryIndex + 1;
        if (next >= storySlides.length) next = 0;
        showStory(next);
    };

    const prevStory = () => {
        let prev = currentStoryIndex - 1;
        if (prev < 0) prev = storySlides.length - 1;
        showStory(prev);
    };

    const startAutoSlide = () => {
        if (storySlides.length > 1) {
            storyTimer = setInterval(nextStory, autoIntervalTime);
        }
    };

    const stopAutoSlide = () => {
        if (storyTimer) {
            clearInterval(storyTimer);
        }
    };

    if (storySlides.length > 0) {
        // Dot click handlers
        storyDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showStory(index);
                stopAutoSlide();
                startAutoSlide(); // reset timer
            });
        });

        // Prev/Next handlers
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                prevStory();
                stopAutoSlide();
                startAutoSlide(); // reset timer
            });

            nextBtn.addEventListener('click', () => {
                nextStory();
                stopAutoSlide();
                startAutoSlide(); // reset timer
            });
        }

        // Initialize slideshow
        showStory(0);
        startAutoSlide();

        // Pause slideshow on hover
        const carouselContainer = document.querySelector('.stories-carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoSlide);
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
        }
    }

    // ==========================================
    // 4. FAQ Accordion Drawer Toggle
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const trigger = item.querySelector('.faq-trigger');
            
            if (trigger) {
                trigger.addEventListener('click', () => {
                    const isAlreadyActive = item.classList.contains('active');
                    
                    // Close all FAQs first for clean single-accordion behavior
                    faqItems.forEach(otherItem => {
                        otherItem.classList.remove('active');
                        const otherTrigger = otherItem.querySelector('.faq-trigger');
                        if (otherTrigger) {
                            otherTrigger.setAttribute('aria-expanded', 'false');
                        }
                    });

                    // If it wasn't already active, open it
                    if (!isAlreadyActive) {
                        item.classList.add('active');
                        trigger.setAttribute('aria-expanded', 'true');
                    }
                });
            }
        });
    }

});
