/**
 * Advanced Features JS - Portfolio Enhancement
 * Version 1.0.0
 * 3D Skill Constellation, Enhanced Testimonials, and More
 */

(function() {
    'use strict';

    // ==================== 3D SKILL CONSTELLATION ====================
    class SkillConstellation {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;
            
            this.skills = [
                // .NET Technologies
                { name: '.NET Core', icon: '🔷', category: 'dotnet', level: 95 },
                { name: 'ASP.NET MVC', icon: '🌐', category: 'dotnet', level: 92 },
                { name: 'C#', icon: '💜', category: 'dotnet', level: 95 },
                { name: 'Entity Framework', icon: '🔗', category: 'dotnet', level: 90 },
                
                // Frontend
                { name: 'Angular', icon: '🅰️', category: 'frontend', level: 90 },
                { name: 'React', icon: '⚛️', category: 'frontend', level: 85 },
                { name: 'TypeScript', icon: '📘', category: 'frontend', level: 90 },
                { name: 'HTML/CSS', icon: '🎨', category: 'frontend', level: 95 },
                
                // Cloud & DevOps
                { name: 'Azure', icon: '☁️', category: 'cloud', level: 90 },
                { name: 'Docker', icon: '🐳', category: 'cloud', level: 88 },
                { name: 'Azure DevOps', icon: '🔄', category: 'cloud', level: 85 },
                
                // Database
                { name: 'SQL Server', icon: '🗄️', category: 'database', level: 92 },
                { name: 'MongoDB', icon: '🍃', category: 'database', level: 85 },
                { name: 'Redis', icon: '🔴', category: 'database', level: 82 }
            ];
            
            this.init();
        }
        
        init() {
            this.createConstellation();
            this.bindEvents();
        }
        
        createConstellation() {
            const html = `
                <div class="constellation-wrapper">
                    <canvas class="constellation-canvas" id="constellationCanvas"></canvas>
                    <div class="constellation-skills" id="constellationSkills">
                        <div class="constellation-sun">
                            <span>🚀</span>
                        </div>
                        ${this.skills.map((skill, i) => this.createSkillPlanet(skill, i)).join('')}
                    </div>
                    <div class="constellation-legend">
                        <div class="legend-item"><div class="legend-dot dotnet"></div> .NET</div>
                        <div class="legend-item"><div class="legend-dot frontend"></div> Frontend</div>
                        <div class="legend-item"><div class="legend-dot cloud"></div> Cloud</div>
                        <div class="legend-item"><div class="legend-dot database"></div> Database</div>
                    </div>
                </div>
            `;
            
            this.container.innerHTML = html;
            this.canvas = document.getElementById('constellationCanvas');
            this.skillsContainer = document.getElementById('constellationSkills');
            
            this.positionSkills();
            this.drawConnections();
        }
        
        createSkillPlanet(skill, index) {
            const angle = (index / this.skills.length) * 360;
            return `
                <div class="skill-planet ${skill.category}" 
                     data-skill="${skill.name}" 
                     data-level="${skill.level}"
                     style="--angle: ${angle}deg;">
                    <div class="skill-planet-inner">
                        ${skill.icon}
                    </div>
                    <div class="skill-planet-ring"></div>
                    <div class="skill-planet-label">${skill.name}</div>
                </div>
            `;
        }
        
        positionSkills() {
            const planets = this.container.querySelectorAll('.skill-planet');
            const containerRect = this.skillsContainer.getBoundingClientRect();
            const centerX = containerRect.width / 2;
            const centerY = containerRect.height / 2;
            
            planets.forEach((planet, index) => {
                const angle = (index / planets.length) * 2 * Math.PI - Math.PI / 2;
                const radiusX = centerX * 0.7;
                const radiusY = centerY * 0.6;
                
                const x = centerX + radiusX * Math.cos(angle);
                const y = centerY + radiusY * Math.sin(angle);
                
                planet.style.left = `${x}px`;
                planet.style.top = `${y}px`;
                planet.style.transform = 'translate(-50%, -50%)';
            });
        }
        
        drawConnections() {
            if (!this.canvas) return;
            
            const ctx = this.canvas.getContext('2d');
            const rect = this.container.getBoundingClientRect();
            
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
            
            const planets = this.container.querySelectorAll('.skill-planet');
            const positions = Array.from(planets).map(p => ({
                x: parseFloat(p.style.left),
                y: parseFloat(p.style.top)
            }));
            
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            
            // Draw lines between related skills
            for (let i = 0; i < positions.length; i++) {
                const nextIndex = (i + 1) % positions.length;
                ctx.beginPath();
                ctx.moveTo(positions[i].x, positions[i].y);
                ctx.lineTo(positions[nextIndex].x, positions[nextIndex].y);
                ctx.stroke();
            }
            
            // Draw lines to center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            ctx.strokeStyle = 'rgba(255, 0, 255, 0.05)';
            positions.forEach(pos => {
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(pos.x, pos.y);
                ctx.stroke();
            });
        }
        
        bindEvents() {
            window.addEventListener('resize', () => {
                this.positionSkills();
                this.drawConnections();
            });
            
            // Pause animation on hover
            const skillsContainer = this.skillsContainer;
            skillsContainer.addEventListener('mouseenter', () => {
                skillsContainer.style.animationPlayState = 'paused';
            });
            
            skillsContainer.addEventListener('mouseleave', () => {
                skillsContainer.style.animationPlayState = 'running';
            });
        }
    }

    // ==================== 3D TESTIMONIALS CAROUSEL ====================
    class TestimonialsCarousel {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;
            
            this.testimonials = [
                {
                    text: "Karthik's full-stack expertise and problem-solving abilities are exceptional. He delivered our project ahead of schedule with outstanding quality.",
                    author: "Tech Lead",
                    role: "Senior Engineering Manager",
                    company: "Tech Company",
                    avatar: "TL",
                    rating: 5
                },
                {
                    text: "Working with Karthik was a fantastic experience. His knowledge of cloud architecture and ML integration brought our vision to life.",
                    author: "Project Manager",
                    role: "Product Owner",
                    company: "Startup Inc",
                    avatar: "PM",
                    rating: 5
                },
                {
                    text: "Karthik's attention to detail and ability to write clean, maintainable code sets him apart. Highly recommended for any development project.",
                    author: "Senior Developer",
                    role: "Tech Lead",
                    company: "Software Corp",
                    avatar: "SD",
                    rating: 5
                },
                {
                    text: "His expertise in Python and machine learning helped us build an intelligent system that exceeded our expectations. A true professional!",
                    author: "Data Scientist",
                    role: "ML Team Lead",
                    company: "AI Solutions",
                    avatar: "DS",
                    rating: 5
                }
            ];
            
            this.currentIndex = 0;
            this.autoplayInterval = null;
            
            this.init();
        }
        
        init() {
            this.createCarousel();
            this.updateCards();
            this.bindEvents();
            this.startAutoplay();
        }
        
        createCarousel() {
            const html = `
                <div class="testimonials-3d">
                    <div class="testimonials-track" id="testimonialsTrack">
                        ${this.testimonials.map((t, i) => this.createCard(t, i)).join('')}
                    </div>
                    <div class="testimonials-nav">
                        <button class="testimonial-nav-btn prev-btn" aria-label="Previous testimonial">←</button>
                        <div class="testimonials-dots">
                            ${this.testimonials.map((_, i) => 
                                `<div class="testimonial-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
                            ).join('')}
                        </div>
                        <button class="testimonial-nav-btn next-btn" aria-label="Next testimonial">→</button>
                    </div>
                </div>
            `;
            
            this.container.innerHTML = html;
            this.track = document.getElementById('testimonialsTrack');
            this.cards = this.container.querySelectorAll('.testimonial-card-3d');
            this.dots = this.container.querySelectorAll('.testimonial-dot');
            this.prevBtn = this.container.querySelector('.prev-btn');
            this.nextBtn = this.container.querySelector('.next-btn');
        }
        
        createCard(testimonial, index) {
            return `
                <div class="testimonial-card-3d" data-index="${index}">
                    <div class="testimonial-quote-icon">❝</div>
                    <p class="testimonial-text-3d">${testimonial.text}</p>
                    <div class="testimonial-author-3d">
                        <div class="testimonial-avatar-3d">${testimonial.avatar}</div>
                        <div class="testimonial-info-3d">
                            <h4>${testimonial.author}</h4>
                            <p>${testimonial.role}</p>
                            <div class="testimonial-rating">
                                ${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        
        updateCards() {
            this.cards.forEach((card, i) => {
                card.className = 'testimonial-card-3d';
                
                if (i === this.currentIndex) {
                    card.classList.add('active');
                } else if (i === this.getPrevIndex()) {
                    card.classList.add('prev');
                } else if (i === this.getNextIndex()) {
                    card.classList.add('next');
                } else {
                    card.classList.add('hidden');
                }
            });
            
            this.dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === this.currentIndex);
            });
        }
        
        getPrevIndex() {
            return (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
        }
        
        getNextIndex() {
            return (this.currentIndex + 1) % this.testimonials.length;
        }
        
        next() {
            this.currentIndex = this.getNextIndex();
            this.updateCards();
        }
        
        prev() {
            this.currentIndex = this.getPrevIndex();
            this.updateCards();
        }
        
        goTo(index) {
            this.currentIndex = index;
            this.updateCards();
        }
        
        startAutoplay() {
            this.autoplayInterval = setInterval(() => this.next(), 5000);
        }
        
        stopAutoplay() {
            if (this.autoplayInterval) {
                clearInterval(this.autoplayInterval);
            }
        }
        
        bindEvents() {
            this.nextBtn.addEventListener('click', () => {
                this.stopAutoplay();
                this.next();
                this.startAutoplay();
            });
            
            this.prevBtn.addEventListener('click', () => {
                this.stopAutoplay();
                this.prev();
                this.startAutoplay();
            });
            
            this.dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    this.stopAutoplay();
                    this.goTo(parseInt(dot.dataset.index));
                    this.startAutoplay();
                });
            });
            
            // Touch swipe support
            let touchStartX = 0;
            this.container.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            });
            
            this.container.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].clientX;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > 50) {
                    this.stopAutoplay();
                    if (diff > 0) {
                        this.next();
                    } else {
                        this.prev();
                    }
                    this.startAutoplay();
                }
            });
            
            // Pause on hover
            this.container.addEventListener('mouseenter', () => this.stopAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());
        }
    }

    // ==================== ANIMATED COUNTERS ====================
    class AnimatedCounters {
        constructor() {
            this.counters = document.querySelectorAll('[data-counter]');
            if (this.counters.length === 0) return;
            
            this.init();
        }
        
        init() {
            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.animateCounter(entry.target);
                            this.observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );
            
            this.counters.forEach(counter => this.observer.observe(counter));
        }
        
        animateCounter(element) {
            const target = parseInt(element.dataset.counter);
            const duration = parseInt(element.dataset.duration) || 2000;
            const suffix = element.dataset.suffix || '';
            const start = 0;
            const startTime = performance.now();
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(start + (target - start) * easeOut);
                
                element.textContent = current.toLocaleString() + suffix;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            
            requestAnimationFrame(animate);
        }
    }

    // ==================== SCROLL PROGRESS INDICATOR ====================
    class ScrollProgress {
        constructor() {
            this.createIndicator();
            this.bindEvents();
        }
        
        createIndicator() {
            const html = `
                <div class="scroll-indicator" id="scrollIndicator">
                    <div class="scroll-progress-vertical">
                        <div class="scroll-progress-fill" id="scrollFill"></div>
                    </div>
                    <div class="scroll-percentage" id="scrollPercentage">0%</div>
                </div>
            `;
            
            const container = document.createElement('div');
            container.innerHTML = html;
            document.body.appendChild(container.firstElementChild);
            
            this.indicator = document.getElementById('scrollIndicator');
            this.fill = document.getElementById('scrollFill');
            this.percentage = document.getElementById('scrollPercentage');
        }
        
        bindEvents() {
            window.addEventListener('scroll', () => this.updateProgress());
            this.updateProgress();
        }
        
        updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            
            this.fill.style.height = `${progress}%`;
            this.percentage.textContent = `${Math.round(progress)}%`;
            
            // Show/hide indicator based on scroll position
            this.indicator.classList.toggle('visible', scrollTop > 300);
        }
    }

    // ==================== AVAILABILITY STATUS ====================
    class AvailabilityStatus {
        constructor() {
            this.container = document.getElementById('availabilityStatus');
            if (!this.container) return;
            
            this.init();
        }
        
        init() {
            // Set availability status (can be dynamically changed)
            const isAvailable = true; // Change this based on your availability
            const message = isAvailable ? 'Available for new projects' : 'Currently busy';
            
            this.container.innerHTML = `
                <div class="availability-widget">
                    <div class="availability-dot"></div>
                    <span class="availability-text">${message}</span>
                </div>
            `;
        }
    }

    // ==================== FLOATING TECH BADGES ====================
    class FloatingBadges {
        constructor() {
            this.container = document.getElementById('floatingBadges');
            if (!this.container) return;
            
            this.technologies = [
                { name: '.NET Core', icon: '🔷' },
                { name: 'C#', icon: '💜' },
                { name: 'Angular', icon: '🅰️' },
                { name: 'Azure', icon: '☁️' },
                { name: 'SQL Server', icon: '🗄️' },
                { name: 'Docker', icon: '🐳' },
                { name: 'TypeScript', icon: '📘' },
                { name: 'Entity Framework', icon: '🔗' }
            ];
            
            this.init();
        }
        
        init() {
            this.container.innerHTML = `
                <div class="floating-tech-badges">
                    ${this.technologies.map(tech => `
                        <div class="floating-badge">
                            <span class="floating-badge-icon">${tech.icon}</span>
                            <span>${tech.name}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    // ==================== EASTER EGG: KONAMI CODE ====================
    class KonamiCode {
        constructor() {
            this.sequence = [];
            this.konamiCode = [
                'ArrowUp', 'ArrowUp', 
                'ArrowDown', 'ArrowDown', 
                'ArrowLeft', 'ArrowRight', 
                'ArrowLeft', 'ArrowRight', 
                'b', 'a'
            ];
            this.timeout = null;
            
            this.init();
        }
        
        init() {
            document.addEventListener('keydown', (e) => this.handleKey(e));
        }
        
        handleKey(e) {
            this.sequence.push(e.key);
            
            // Clear timeout
            if (this.timeout) clearTimeout(this.timeout);
            
            // Reset after 2 seconds of inactivity
            this.timeout = setTimeout(() => {
                this.sequence = [];
            }, 2000);
            
            // Keep only the last N keys
            if (this.sequence.length > this.konamiCode.length) {
                this.sequence.shift();
            }
            
            // Check if sequence matches
            if (this.sequence.join(',') === this.konamiCode.join(',')) {
                this.activate();
                this.sequence = [];
            }
        }
        
        activate() {
            // Easter egg: Rainbow mode!
            document.body.classList.add('easter-egg-active');
            
            const message = document.createElement('div');
            message.className = 'easter-egg-text show';
            message.innerHTML = '🎮 KONAMI CODE ACTIVATED! 🎮';
            document.body.appendChild(message);
            
            // Confetti effect
            this.createConfetti();
            
            // Remove after 5 seconds
            setTimeout(() => {
                document.body.classList.remove('easter-egg-active');
                message.remove();
            }, 5000);
            
            // Award XP if available
            if (typeof addXP === 'function') {
                addXP(100, 'Konami Code discovered!');
            }
            
            // Show notification
            if (typeof showNotification === 'function') {
                showNotification('🎮 Secret unlocked! +100 XP', 'success');
            }
        }
        
        createConfetti() {
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
            
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    left: ${Math.random() * 100}vw;
                    top: -20px;
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                    pointer-events: none;
                    z-index: 100010;
                    animation: confetti-fall ${2 + Math.random() * 2}s linear forwards;
                `;
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 4000);
            }
            
            // Add keyframes if not exists
            if (!document.getElementById('confetti-keyframes')) {
                const style = document.createElement('style');
                style.id = 'confetti-keyframes';
                style.textContent = `
                    @keyframes confetti-fall {
                        to {
                            transform: translateY(100vh) rotate(720deg);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }

    // ==================== INITIALIZE ====================
    function initAdvancedFeatures() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
        
        function init() {
            // Initialize components if their containers exist
            new SkillConstellation('skillConstellation');
            new TestimonialsCarousel('testimonialsCarousel');
            new AnimatedCounters();
            new ScrollProgress();
            new AvailabilityStatus();
            new FloatingBadges();
            new KonamiCode();
            
            console.log('🚀 Advanced features initialized');
        }
    }
    
    initAdvancedFeatures();

})();
