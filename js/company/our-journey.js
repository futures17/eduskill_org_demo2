// our-journey.js - Dynamic Timeline Connector and Scroll Reveal animations

document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.animate-timeline');
    const fillLine = document.getElementById('timeline-fill');
    const timelineWrapper = document.querySelector('.timeline-wrapper');

    // ==========================================
    // 1. Intersection Observer for Nodes reveal
    // ==========================================
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    timelineItems.forEach(item => {
        revealObserver.observe(item);
    });

    // ==========================================
    // 2. Scroll event listener for Fill Line progress
    // ==========================================
    const updateLineProgress = () => {
        if (!timelineWrapper || !fillLine) return;

        const wrapperRect = timelineWrapper.getBoundingClientRect();
        const wrapperTop = wrapperRect.top;
        const wrapperHeight = wrapperRect.height;
        const windowHeight = window.innerHeight;

        // Calculate scroll ratio relative to the wrapper height
        // Line starts growing when wrapper top hits 60% of viewport height
        const startOffset = windowHeight * 0.6;
        const scrollDistance = -wrapperTop + startOffset;

        let percentage = (scrollDistance / wrapperHeight) * 100;
        
        // Boundaries
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;

        fillLine.style.height = `${percentage}%`;
    };

    // Attach scroll handler
    window.addEventListener('scroll', updateLineProgress);
    window.addEventListener('resize', updateLineProgress);
    
    // Initial call
    setTimeout(updateLineProgress, 200);
});
