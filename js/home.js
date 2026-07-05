// home.js - Lightweight Vanilla JS for Homepage Interaction

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
                e.preventDefault(); // Prevent default action
                const parent = toggle.parentElement;
                parent.classList.toggle('open');
            }
        });
    });

    // ==========================================
    // 2. Hero Circular Portal Slideshow
    // ==========================================
    const portalSlides = document.querySelectorAll('.portal-slide');
    let currentPortalSlide = 0;
    const portalIntervalTime = 4000; // Change image every 4 seconds

    const showPortalSlide = (index) => {
        if (portalSlides.length === 0) return;
        portalSlides.forEach(slide => slide.classList.remove('active'));
        portalSlides[index].classList.add('active');
        currentPortalSlide = index;
    };

    const nextPortalSlide = () => {
        let next = currentPortalSlide + 1;
        if (next >= portalSlides.length) {
            next = 0;
        }
        showPortalSlide(next);
    };

    if (portalSlides.length > 0) {
        setInterval(nextPortalSlide, portalIntervalTime);
    }

    // ==========================================
    // 3. Animated Statistics Counters
    // ==========================================
    const counterElements = document.querySelectorAll('.ribbon-number, .what-stat-number');
    const animationSpeed = 80; // Higher is slower

    const animateCounters = () => {
        counterElements.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const updateCount = () => {
                const currentVal = +counter.innerText.replace(/,/g, '');
                const increment = Math.ceil(target / animationSpeed);

                if (currentVal < target) {
                    const newVal = currentVal + increment;
                    if (newVal >= target) {
                        counter.innerText = target.toLocaleString();
                    } else {
                        counter.innerText = newVal.toLocaleString();
                        setTimeout(updateCount, 15);
                    }
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };
            updateCount();
        });
    };

    // Intersection Observer to trigger counter animation when stats scroll in view
    const observerTarget = document.querySelector('.stats-ribbon');
    if (observerTarget && counterElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect(); // Trigger once
            }
        }, { threshold: 0.1 });
        
        observer.observe(observerTarget);
    }

    // ==========================================
    // 4. Testimonial Slider (HR Highlights Card)
    // ==========================================
    const testimonials = [
        {
            quote: '"EduSkill Group helped us reduce our hiring time by 60% and connect with high-quality candidates from across India."',
            name: "Ashish Mehra",
            role: "HR Manager, Tech Mahindra",
            image: "assets/images/reviews/review3.webp"
        },
        {
            quote: '"The Virtual Science Labs and proctored assessments from EduSkillX allowed our university to scale remote engineering programs seamlessly."',
            name: "Dr. Aruna Rao",
            role: "Dean, Academic Affairs",
            image: "assets/images/reviews/review10_girl.webp"
        },
        {
            quote: '"Using the resume builder tools and Mock Interview coach on EvoXel helped me pinpoint exact areas of improvement. I received multiple job offers!"',
            name: "Pooja Patel",
            role: "Junior Software Engineer",
            image: "assets/images/reviews/review12_girl.webp"
        }
    ];

    let currentTestimonialIndex = 0;
    const quoteEl = document.getElementById('hr-testimonial-quote');
    const imgEl = document.getElementById('hr-testimonial-img');
    const nameEl = document.getElementById('hr-testimonial-name');
    const roleEl = document.getElementById('hr-testimonial-role');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    const sliderDots = document.querySelectorAll('.slider-dot');

    const updateTestimonial = (index) => {
        if (!quoteEl) return;
        
        // Add fade transition out
        quoteEl.style.opacity = 0;
        imgEl.style.opacity = 0;
        nameEl.style.opacity = 0;
        roleEl.style.opacity = 0;

        setTimeout(() => {
            quoteEl.innerText = testimonials[index].quote;
            imgEl.src = testimonials[index].image;
            nameEl.innerText = testimonials[index].name;
            roleEl.innerText = testimonials[index].role;

            // Fade in
            quoteEl.style.opacity = 1;
            imgEl.style.opacity = 1;
            nameEl.style.opacity = 1;
            roleEl.style.opacity = 1;
        }, 300);

        // Update dots
        sliderDots.forEach((dot, dotIdx) => {
            dot.classList.toggle('active', dotIdx === index);
        });

        currentTestimonialIndex = index;
    };

    if (prevBtn && nextBtn && quoteEl) {
        quoteEl.style.transition = 'opacity 0.3s ease';
        imgEl.style.transition = 'opacity 0.3s ease';
        nameEl.style.transition = 'opacity 0.3s ease';
        roleEl.style.transition = 'opacity 0.3s ease';

        prevBtn.addEventListener('click', () => {
            let prev = currentTestimonialIndex - 1;
            if (prev < 0) prev = testimonials.length - 1;
            updateTestimonial(prev);
        });

        nextBtn.addEventListener('click', () => {
            let next = currentTestimonialIndex + 1;
            if (next >= testimonials.length) next = 0;
            updateTestimonial(next);
        });

        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateTestimonial(index);
            });
        });

        setInterval(() => {
            let next = currentTestimonialIndex + 1;
            if (next >= testimonials.length) next = 0;
            updateTestimonial(next);
        }, 6000);
    }

    // ==========================================
    // 5. Nexa AI Chatbot Interactive Logic
    // ==========================================
    const chatToggle = document.getElementById('aiChatToggle');
    const chatPanel = document.getElementById('aiChatPanel');
    const chatClose = document.getElementById('aiChatClose');
    const chatInput = document.getElementById('aiChatInput');
    const chatSend = document.getElementById('aiChatSend');
    const chatMessages = document.getElementById('aiChatMessages');

    if (chatToggle && chatPanel && chatClose) {
        // Toggle chat panel open/close
        chatToggle.addEventListener('click', () => {
            chatPanel.classList.toggle('open');
            if (chatPanel.classList.contains('open') && chatInput) {
                chatInput.focus();
            }
        });

        chatClose.addEventListener('click', () => {
            chatPanel.classList.remove('open');
        });

        // Canned responses mapping
        const cannedResponses = [
            "EduSkill Group connects learning, testing, training, and recruitment. If you have queries about corporate integrations, please check our <a href='pages/contact.html' style='color:#7CCEFA;text-decoration:underline;'>Contact Form</a>!",
            "You can explore our 4 dedicated portals: <strong>EduSkillX</strong> (AI Proctoring & LMS), <strong>RetailCareer</strong> (Retail training), <strong>NearbyHiring</strong> (Local jobs), and <strong>EvoXel</strong> (Mentorship).",
            "To get a custom platform demo, please submit your corporation email and message on our <a href='pages/contact.html' style='color:#7CCEFA;text-decoration:underline;'>Contact page</a>. Our specialists will reply within 24 hours!",
            "All our basic student tools like ATS Resume Builder are completely free! Advanced corporate certification prep tracks have minimal fees.",
            "Nexa AI is happy to assist! If you want to connect directly, please email us at <strong>info@eduskill.org</strong> or call <strong>+91 120 456 7890</strong>.",
            "That's a great question! For institutional coordination, college administrations are provided with a dedicated analytics dashboard. Feel free to contact our Noida office!"
        ];
        let responseIndex = 0;

        const addMessage = (text, isSender) => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `ai-msg ${isSender ? 'ai-msg-out' : 'ai-msg-in'}`;
            
            let avatarHtml = '';
            if (!isSender) {
                avatarHtml = `
                    <div class="ai-msg-avatar">
                        <video src="assets/video/aichat/nexa_icon_main.webm" autoplay loop muted playsinline></video>
                    </div>
                `;
            }
            
            msgDiv.innerHTML = `
                ${avatarHtml}
                <div class="ai-msg-bubble">${text}</div>
            `;
            chatMessages.appendChild(msgDiv);
            
            // Auto scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const handleSend = () => {
            const messageText = chatInput.value.trim();
            if (!messageText) return;

            // Add user message
            addMessage(messageText, true);
            chatInput.value = '';

            // Nexa AI responds after a delay
            setTimeout(() => {
                let lowerText = messageText.toLowerCase();
                let reply = "";

                if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
                    reply = "Hi there! I am Nexa, your EduSkill AI assistant. How can I help you today? You can ask me about our skilling courses, proctoring systems, or contact details.";
                } else if (lowerText.includes("contact") || lowerText.includes("support") || lowerText.includes("email") || lowerText.includes("phone") || lowerText.includes("number") || lowerText.includes("mail")) {
                    reply = "You can get in touch with our team directly through our <a href='pages/contact.html' style='color:#7CCEFA;text-decoration:underline;'>Contact Us page</a>, email us at <strong>info@eduskill.org</strong>, or call <strong>+91 120 456 7890</strong>.";
                } else if (lowerText.includes("retail")) {
                    reply = "<strong>RetailCareer</strong> manages retail training courses and maps candidates into corporate store jobs. Learn more under our Platforms dropdown!";
                } else if (lowerText.includes("proctor") || lowerText.includes("exam") || lowerText.includes("test") || lowerText.includes("eduskillx")) {
                    reply = "<strong>EduSkillX</strong> hosts our AI test proctoring engine (with eye-tracking and anti-cheat voice analytics) and virtual science/coding labs.";
                } else if (lowerText.includes("hiring") || lowerText.includes("job") || lowerText.includes("nearby")) {
                    reply = "<strong>NearbyHiring</strong> helps graduates discover local employment opportunities within specific distance radiuses from their college or home.";
                } else if (lowerText.includes("evoxel") || lowerText.includes("mentor") || lowerText.includes("coach")) {
                    reply = "<strong>EvoXel</strong> provides ATS-optimized resume builder tools, AI Mock Interview coaching, and direct webinars with industry mentors.";
                } else {
                    // Cycle through fallback canned responses
                    reply = cannedResponses[responseIndex];
                    responseIndex = (responseIndex + 1) % cannedResponses.length;
                }

                addMessage(reply, false);
            }, 800);
        };

        if (chatSend && chatInput) {
            chatSend.addEventListener('click', handleSend);
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    handleSend();
                }
            });
        }
    }
});
