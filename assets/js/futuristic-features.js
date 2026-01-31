/**
 * Futuristic Features JavaScript
 * Advanced interactive features for a cutting-edge portfolio
 * Version 2.0.0
 */

(function() {
    'use strict';

    // ==================== PERSONALIZED GREETING ====================
    class PersonalizedGreeting {
        constructor() {
            this.init();
        }

        init() {
            this.updateGreeting();
            // Update every minute
            setInterval(() => this.updateGreeting(), 60000);
        }

        updateGreeting() {
            const hour = new Date().getHours();
            let greeting, emoji, className;

            if (hour >= 5 && hour < 12) {
                greeting = "Good Morning";
                emoji = "🌅";
                className = "greeting-morning";
            } else if (hour >= 12 && hour < 17) {
                greeting = "Good Afternoon";
                emoji = "☀️";
                className = "greeting-afternoon";
            } else if (hour >= 17 && hour < 21) {
                greeting = "Good Evening";
                emoji = "🌆";
                className = "greeting-evening";
            } else {
                greeting = "Welcome, Night Owl";
                emoji = "🌙";
                className = "greeting-night";
            }

            // Update any greeting elements
            const greetingElements = document.querySelectorAll('.personalized-greeting');
            greetingElements.forEach(el => {
                el.textContent = `${emoji} ${greeting}!`;
                el.className = `personalized-greeting ${className}`;
            });

            // Update document title during off-hours
            if (hour >= 22 || hour < 6) {
                document.title = "🌙 " + document.title.replace(/^🌙\s*/, '');
            }
        }
    }

    // ==================== READING PROGRESS INDICATOR ====================
    class ReadingProgress {
        constructor() {
            this.createProgressBar();
            this.bindEvents();
        }

        createProgressBar() {
            const progressBar = document.createElement('div');
            progressBar.className = 'reading-progress';
            progressBar.id = 'readingProgress';
            progressBar.setAttribute('role', 'progressbar');
            progressBar.setAttribute('aria-label', 'Reading progress');
            document.body.appendChild(progressBar);
        }

        bindEvents() {
            window.addEventListener('scroll', () => this.updateProgress(), { passive: true });
        }

        updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            
            const progressBar = document.getElementById('readingProgress');
            if (progressBar) {
                progressBar.style.width = `${Math.min(progress, 100)}%`;
            }
        }
    }

    // ==================== VCARD DOWNLOAD ====================
    class VCardDownload {
        constructor() {
            this.contactData = {
                name: 'Karthik M',
                title: 'Software Developer',
                company: 'Eurofins IT Solutions India Pvt Ltd',
                email: 'iammrkarthik2002@gmail.com',
                phone: '+917019880061',
                website: 'https://karthik77-kk.github.io/karthikm-resume/',
                linkedin: 'https://linkedin.com/in/karthik-m-9262a02b4',
                github: 'https://github.com/Karthik77-kk',
                address: 'Bangalore, India'
            };
        }

        generateVCard() {
            const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${this.contactData.name}
TITLE:${this.contactData.title}
ORG:${this.contactData.company}
EMAIL:${this.contactData.email}
TEL:${this.contactData.phone}
URL:${this.contactData.website}
X-SOCIALPROFILE;TYPE=linkedin:${this.contactData.linkedin}
X-SOCIALPROFILE;TYPE=github:${this.contactData.github}
ADR:;;${this.contactData.address};;;;
NOTE: Full Stack .NET Developer with 3+ years experience at Accenture. Expert in C#, ASP.NET Core, Angular, SQL Server, and Azure.
END:VCARD`;

            return vcard;
        }

        download() {
            const vcard = this.generateVCard();
            const blob = new Blob([vcard], { type: 'text/vcard' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Karthik_M_Contact.vcf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            // Show notification
            if (typeof showNotification === 'function') {
                showNotification('📇 Contact card downloaded!', 'success');
            }
        }
    }

    // ==================== PARTICLE SYSTEM ====================
    class ParticleSystem {
        constructor() {
            this.particles = [];
            this.maxParticles = 30;
            this.container = null;
            this.init();
        }

        init() {
            this.container = document.createElement('div');
            this.container.className = 'particle-container';
            this.container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: -1;
                overflow: hidden;
            `;
            document.body.appendChild(this.container);

            // Create initial particles
            for (let i = 0; i < this.maxParticles; i++) {
                this.createParticle();
            }
        }

        createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 4 + 2;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 2;
            const hue = Math.random() * 60 + 160; // Cyan to purple range
            
            particle.style.cssText = `
                position: absolute;
                left: ${x}%;
                top: ${y}%;
                width: ${size}px;
                height: ${size}px;
                background: hsla(${hue}, 100%, 60%, 0.6);
                border-radius: 50%;
                animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
                box-shadow: 0 0 ${size * 2}px hsla(${hue}, 100%, 60%, 0.4);
            `;
            
            this.container.appendChild(particle);
            this.particles.push(particle);
        }
    }

    // ==================== SECTION VISIBILITY OBSERVER ====================
    class SectionObserver {
        constructor() {
            this.init();
        }

        init() {
            const options = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, options);

            // Observe all sections
            document.querySelectorAll('section').forEach(section => {
                observer.observe(section);
            });

            // Observe timeline items
            document.querySelectorAll('.timeline-item').forEach(item => {
                observer.observe(item);
            });
        }
    }

    // ==================== SMART TYPING TITLES ====================
    class SmartTitles {
        constructor() {
            this.titles = [
                '.NET Full Stack Developer',
                'Software Engineer',
                'C# Developer',
                'Azure Cloud Expert',
                'Angular Developer',
                'Problem Solver'
            ];
            this.currentIndex = 0;
            this.element = null;
            this.init();
        }

        init() {
            // Find the typewriter element
            this.element = document.getElementById('typewriter');
            if (!this.element) return;

            // Override the default typewriter with our custom titles
            this.updateTitles();
        }

        updateTitles() {
            // This integrates with the existing typewriter system
            if (window.typewriterTexts) {
                window.typewriterTexts = this.titles;
            }
        }
    }

    // ==================== AI INSIGHTS PANEL ====================
    class AIInsights {
        constructor() {
            this.init();
        }

        init() {
            // Add AI insights to sections on scroll
            const insights = {
                'skills': '💡 Karthik\'s tech stack aligns with enterprise requirements',
                'experience': '📈 3+ years of progressive growth in .NET development',
                'projects': '🚀 Projects demonstrate real-world problem-solving skills'
            };

            // Could be expanded with Gemini API for dynamic insights
        }
    }

    // ==================== INITIALIZE ALL FEATURES ====================
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize all futuristic features
        new PersonalizedGreeting();
        new ReadingProgress();
        new ParticleSystem();
        new SectionObserver();
        new SmartTitles();

        // Expose vCard download globally
        window.vCardDownload = new VCardDownload();
        window.downloadVCard = () => window.vCardDownload.download();

        console.log('🚀 Futuristic features initialized');
    });

})();
