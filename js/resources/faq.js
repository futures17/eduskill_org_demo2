// FAQ PAGE JAVASCRIPT

document.addEventListener('DOMContentLoaded', () => {
    // FAQ Data
    const faqData = [
        {
            id: 1,
            category: 'student',
            question: 'How do I enroll in a learning path?',
            answer: 'To enroll, simply create an account on EduSkillX, navigate to your desired learning path, and click the "Enroll Now" button. You will be guided through our AI assessment.'
        },
        {
            id: 2,
            category: 'corporate',
            question: 'How can our company partner for campus hiring?',
            answer: 'Companies can join NearbyHiring by registering as a Corporate Partner. Once verified, you gain access to our vetted student portfolios and can initiate hiring drives directly through the platform.'
        },
        {
            id: 3,
            category: 'institution',
            question: 'Can colleges use the AI Proctoring System independently?',
            answer: 'Yes, our AI Proctoring System is available as a standalone service for colleges and universities to conduct their internal secure examinations.'
        },
        {
            id: 4,
            category: 'popular',
            question: 'Is EvoXel career counseling free?',
            answer: 'EvoXel offers both free basic career assessments and premium one-on-one mentoring sessions with industry experts.'
        },
        {
            id: 5,
            category: 'trainer',
            question: 'How do I become a certified trainer?',
            answer: 'Professionals with relevant industry experience can apply through the RetailCareer portal. Our team will review your application and schedule a brief onboarding session.'
        },
        {
            id: 6,
            category: 'student',
            question: 'Are the certifications recognized by top companies?',
            answer: 'Yes, EduSkill Group certifications are co-designed with our network of 2500+ partner companies, ensuring high industry relevance and recognition.'
        }
    ];

    const accordionContainer = document.getElementById('accordion-container');
    const categoryTabs = document.querySelectorAll('.faq-categories li');
    const searchInput = document.getElementById('faq-search');

    function renderFAQs(data) {
        accordionContainer.innerHTML = '';
        
        if (data.length === 0) {
            accordionContainer.innerHTML = '<div style="padding: 20px; text-align: center;">No questions found. Try another search term.</div>';
            return;
        }

        data.forEach(item => {
            const faqItem = document.createElement('div');
            faqItem.className = 'accordion-item';
            
            faqItem.innerHTML = `
                <button class="accordion-header" aria-expanded="false" aria-controls="faq-ans-${item.id}">
                    ${item.question}
                    <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
                <div class="accordion-body" id="faq-ans-${item.id}">
                    <p>${item.answer}</p>
                </div>
            `;
            
            accordionContainer.appendChild(faqItem);
        });

        // Re-attach event listeners to new accordion headers
        attachAccordionEvents();
    }

    function attachAccordionEvents() {
        const headers = document.querySelectorAll('.accordion-header');
        headers.forEach(header => {
            header.addEventListener('click', function() {
                const item = this.parentElement;
                const isActive = item.classList.contains('active');
                
                // Close all other items (optional: remove this for multi-open)
                document.querySelectorAll('.accordion-item').forEach(el => {
                    el.classList.remove('active');
                    el.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                });
                
                if (!isActive) {
                    item.classList.add('active');
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    // Initial render
    renderFAQs(faqData);

    // Category Filtering
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Update active tab style
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Clear search
            if (searchInput) searchInput.value = '';
            
            const filter = this.getAttribute('data-filter');
            
            if (filter === 'all') {
                renderFAQs(faqData);
            } else {
                const filtered = faqData.filter(item => item.category === filter);
                renderFAQs(filtered);
            }
        });
    });

    // Search Filtering
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            // Reset category to "All" when searching
            categoryTabs.forEach(t => t.classList.remove('active'));
            document.querySelector('[data-filter="all"]').classList.add('active');
            
            const filtered = faqData.filter(item => 
                item.question.toLowerCase().includes(query) || 
                item.answer.toLowerCase().includes(query)
            );
            
            renderFAQs(filtered);
        });
    }
});
