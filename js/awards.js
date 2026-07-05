// AWARDS PAGE JAVASCRIPT

document.addEventListener('DOMContentLoaded', () => {
    // Reusable Awards Data Array
    // Future awards can be added here or generated via a build step.
    const awardsData = [
        {
            year: '2025',
            awards: [
                { img: 'Cool_Tool_awards_2025.webp', title: 'Cool Tool Awards', desc: 'Finalist for innovative ed-tech.' },
                { img: 'Creative-Child-2025-Top-Choice.webp', title: 'Creative Child Top Choice', desc: 'Recognized for engaging content.' },
                { img: 'Trendsetter_Finalist_2025_The_EdTech_Awards.webp', title: 'Trendsetter Finalist', desc: 'The EdTech Awards 2025.' },
                { img: 'UK_business_tech_awards_2025_Constructor.webp', title: 'UK Business Tech Awards', desc: 'Excellence in educational platforms.' },
                { img: 'award-mind-spring-academics-choice.webp', title: 'Mind Spring Academics Choice', desc: 'Top academic resource.' },
                { img: 'business_awards_uk_2025_winner_2.webp', title: 'Business Awards UK Winner', desc: 'Best EdTech Company.' },
                { img: 'educational-app-store-ai-certification.webp', title: 'Educational App Store AI', desc: 'Certified AI integration.' },
                { img: 'educational_app store.webp', title: 'Educational App Store', desc: '5-Star rating.' }
            ]
        },
        {
            year: '2024',
            awards: [
                { img: 'Best_Buy_2024_Platinum_2024_loved_by_parents_Calcularis.webp', title: 'Loved by Parents Platinum', desc: 'Top choice for families.' },
                { img: 'edtech_recommended_october_2024.webp', title: 'EdTech Impact Recommended', desc: 'Highly rated by educators.' },
                { img: 'family_choice_award_2024.webp', title: 'Family Choice Award', desc: 'Preferred family educational product.' },
                { img: 'Parents_Picks_Awards_2024_Winner.webp', title: "Parents' Picks Awards", desc: 'Winner 2024 for excellence.' }
            ]
        },
        {
            year: '2023',
            awards: [
                { img: 'worlddidac-grafari-winner-lp.svg', title: 'Worlddidac Award Winner', desc: 'Global education excellence.' }
            ]
        },
        {
            year: '2022',
            awards: [
                { img: 'The_EdTech_Awards-Constructor_Tech_finalist_2022.webp', title: 'The EdTech Awards Cool Tool', desc: 'Finalist 2022.' }
            ]
        },
        {
            year: '2021',
            awards: [
                { img: 'Design_Preis_Schweiz_Winner_2021.webp', title: 'Design Prize Switzerland', desc: 'Winner for UX design.' }
            ]
        },
        {
            year: '2020',
            awards: [
                { img: 'dyslexia-award-online-grafari-constructor-tech.webp', title: 'Dyslexia Award', desc: 'Online learning excellence recognition.' },
                { img: 'klaus-jacobs-awards-2020.webp', title: 'Klaus Jacobs Awards', desc: 'Innovation in education.' }
            ]
        },
        {
            year: '2019',
            awards: [
                { img: 'Swiss_Innovation_agency_award.svg', title: 'Swiss Innovation Agency Award', desc: 'Recognized for technological innovation.' },
                { img: 'Venturelab-logo-500-x-500px.webp', title: 'Venturelab', desc: 'Top startup in EdTech sector.' }
            ]
        },
        {
            year: '2011',
            awards: [
                { img: 'ACES_2011grafari.webp', title: 'ACES Award 2011', desc: 'Excellence in educational software.' },
                { img: 'ZKB_Pionierpreis_Technopark_logo.webp', title: 'ZKB Pionierpreis', desc: 'Technopark pioneer award.' }
            ]
        }
    ];

    const container = document.getElementById('awards-container');
    const searchInput = document.getElementById('award-search');

    function renderAwards(data) {
        container.innerHTML = '';
        
        // Filter out years with no awards after search
        const filteredData = data.filter(yearData => yearData.awards.length > 0);

        if (filteredData.length === 0) {
            container.innerHTML = '<div class="container" style="text-align:center; padding: 50px 0;"><h3>No awards found matching your search.</h3></div>';
            return;
        }

        filteredData.forEach((yearData, index) => {
            // Alternate background classes: white -> dark blue -> white
            const bgClass = index % 2 === 0 ? 'bg-white' : 'bg-dark';
            
            const section = document.createElement('section');
            section.className = `award-year-section ${bgClass}`;
            
            const containerDiv = document.createElement('div');
            containerDiv.className = 'container';
            
            const header = document.createElement('div');
            header.className = 'award-year-header';
            header.innerHTML = `<h2>${yearData.year}</h2>`;
            
            const grid = document.createElement('div');
            grid.className = 'awards-grid';
            
            yearData.awards.forEach(award => {
                const card = document.createElement('div');
                card.className = 'award-card';
                // Try loading image, fallback to a generic placeholder if missing
                const imgSrc = `../assets/images/awards/${yearData.year}/${award.img}`;
                
                card.innerHTML = `
                    <div class="award-img-wrapper">
                        <img src="${imgSrc}" alt="${award.title}" onerror="this.src='../assets/images/logo/eduskill_logo_nav.webp';">
                    </div>
                    <h3 class="award-title">${award.title}</h3>
                    <p class="award-desc">${award.desc}</p>
                `;
                grid.appendChild(card);
            });
            
            containerDiv.appendChild(header);
            containerDiv.appendChild(grid);
            section.appendChild(containerDiv);
            container.appendChild(section);
        });
    }

    // Initial render
    renderAwards(awardsData);

    // Search filter logic
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            
            const filtered = awardsData.map(yearData => {
                // If the year itself matches, include all awards for that year
                if (yearData.year.includes(query)) {
                    return yearData;
                }
                
                // Otherwise filter the awards within the year
                const filteredAwards = yearData.awards.filter(award => 
                    award.title.toLowerCase().includes(query) || 
                    award.desc.toLowerCase().includes(query)
                );
                
                return {
                    year: yearData.year,
                    awards: filteredAwards
                };
            });
            
            renderAwards(filtered);
        });
    }
});
