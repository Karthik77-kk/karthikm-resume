/**
 * Immersive Effects - Portfolio Enhancement
 * Version 1.0.0
 * Advanced animations, command palette, and immersive features
 */

(function() {
    'use strict';

    // ==================== COMMAND PALETTE ====================
    class CommandPalette {
        constructor() {
            this.isOpen = false;
            this.selectedIndex = 0;
            this.commands = this.getCommands();
            this.filteredCommands = [...this.commands];
            this.init();
        }

        getCommands() {
            return [
                // Navigation
                { id: 'nav-home', icon: '🏠', title: 'Go to Home', description: 'Navigate to top of page', category: 'Navigation', action: () => this.scrollTo('hero') },
                { id: 'nav-about', icon: '👤', title: 'Go to About', description: 'Learn about me', category: 'Navigation', action: () => this.scrollTo('about') },
                { id: 'nav-skills', icon: '💻', title: 'Go to Skills', description: 'View technical skills', category: 'Navigation', action: () => this.scrollTo('skills') },
                { id: 'nav-projects', icon: '🚀', title: 'Go to Projects', description: 'Browse my projects', category: 'Navigation', action: () => this.scrollTo('projects') },
                { id: 'nav-experience', icon: '💼', title: 'Go to Experience', description: 'Work history', category: 'Navigation', action: () => this.scrollTo('experience') },
                { id: 'nav-contact', icon: '📬', title: 'Go to Contact', description: 'Get in touch', category: 'Navigation', action: () => this.scrollTo('contact') },
                
                // Actions
                { id: 'action-theme', icon: '🌓', title: 'Toggle Theme', description: 'Switch dark/light mode', category: 'Actions', shortcut: 'T', action: () => this.toggleTheme() },
                { id: 'action-chat', icon: '🤖', title: 'Open AI Chat', description: 'Talk to my AI assistant', category: 'Actions', action: () => this.openChat() },
                { id: 'action-resume', icon: '📄', title: 'Download Resume', description: 'Get my resume PDF', category: 'Actions', action: () => this.downloadResume() },
                { id: 'action-game', icon: '🎮', title: 'Play Game', description: 'Play the interactive game', category: 'Actions', action: () => this.playGame() },
                
                // External
                { id: 'ext-github', icon: '🐙', title: 'GitHub Profile', description: 'View my repositories', category: 'External', action: () => window.open('https://github.com/Karthik77-kk', '_blank') },
                { id: 'ext-linkedin', icon: '💼', title: 'LinkedIn Profile', description: 'Connect professionally', category: 'External', action: () => window.open('https://linkedin.com/in/karthik-m-9262a02b4', '_blank') },
                { id: 'ext-email', icon: '📧', title: 'Send Email', description: 'Email me directly', category: 'External', action: () => window.location.href = 'mailto:iammrkarthik2002@gmail.com' },
                { id: 'ext-whatsapp', icon: '💬', title: 'WhatsApp', description: 'Message on WhatsApp', category: 'External', action: () => window.open('https://wa.me/917019880061', '_blank') }
            ];
        }

        init() {
            this.createUI();
            this.bindEvents();
        }

        createUI() {
            const html = `
                <div class="command-palette-overlay" id="commandPalette">
                    <div class="command-palette">
                        <div class="command-search">
                            <span class="command-search-icon">🔍</span>
                            <input type="text" id="commandInput" placeholder="Type a command or search..." autocomplete="off">
                            <span class="command-shortcut">ESC</span>
                        </div>
                        <div class="command-results" id="commandResults"></div>
                        <div class="command-footer">
                            <span><kbd>↑↓</kbd> Navigate</span>
                            <span><kbd>↵</kbd> Select</span>
                            <span><kbd>ESC</kbd> Close</span>
                        </div>
                    </div>
                </div>
            `;

            const container = document.createElement('div');
            container.innerHTML = html;
            document.body.appendChild(container.firstElementChild);

            this.overlay = document.getElementById('commandPalette');
            this.input = document.getElementById('commandInput');
            this.results = document.getElementById('commandResults');

            this.renderCommands();
        }

        bindEvents() {
            // Open with Cmd/Ctrl + K
            document.addEventListener('keydown', (e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                    e.preventDefault();
                    this.toggle();
                }
                
                // Quick shortcuts when palette is closed
                if (!this.isOpen && !this.isInputFocused()) {
                    // T for theme
                    if (e.key === 't' || e.key === 'T') {
                        this.toggleTheme();
                    }
                }
            });

            // Close on escape or click outside
            this.overlay.addEventListener('click', (e) => {
                if (e.target === this.overlay) {
                    this.close();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (!this.isOpen) return;

                if (e.key === 'Escape') {
                    this.close();
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigateDown();
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigateUp();
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    this.executeSelected();
                }
            });

            // Search filter
            this.input.addEventListener('input', () => {
                this.filterCommands(this.input.value);
            });
        }

        isInputFocused() {
            const active = document.activeElement;
            return active && (
                active.tagName === 'INPUT' || 
                active.tagName === 'TEXTAREA' || 
                active.isContentEditable
            );
        }

        toggle() {
            this.isOpen ? this.close() : this.open();
        }

        open() {
            this.isOpen = true;
            this.overlay.classList.add('open');
            this.input.value = '';
            this.filterCommands('');
            this.selectedIndex = 0;
            this.updateSelection();
            setTimeout(() => this.input.focus(), 100);
        }

        close() {
            this.isOpen = false;
            this.overlay.classList.remove('open');
        }

        filterCommands(query) {
            const q = query.toLowerCase().trim();
            
            if (!q) {
                this.filteredCommands = [...this.commands];
            } else {
                this.filteredCommands = this.commands.filter(cmd => 
                    cmd.title.toLowerCase().includes(q) ||
                    cmd.description.toLowerCase().includes(q) ||
                    cmd.category.toLowerCase().includes(q)
                );
            }

            this.selectedIndex = 0;
            this.renderCommands();
        }

        renderCommands() {
            if (this.filteredCommands.length === 0) {
                this.results.innerHTML = '<div class="command-empty">No commands found</div>';
                return;
            }

            // Group by category
            const groups = {};
            this.filteredCommands.forEach(cmd => {
                if (!groups[cmd.category]) groups[cmd.category] = [];
                groups[cmd.category].push(cmd);
            });

            let html = '';
            let globalIndex = 0;

            for (const [category, commands] of Object.entries(groups)) {
                html += `<div class="command-group">
                    <div class="command-group-title">${category}</div>`;
                
                commands.forEach(cmd => {
                    const isSelected = globalIndex === this.selectedIndex;
                    html += `
                        <div class="command-item ${isSelected ? 'selected' : ''}" data-index="${globalIndex}" data-id="${cmd.id}">
                            <div class="command-item-icon">${cmd.icon}</div>
                            <div class="command-item-content">
                                <div class="command-item-title">${cmd.title}</div>
                                <div class="command-item-description">${cmd.description}</div>
                            </div>
                            ${cmd.shortcut ? `<span class="command-item-shortcut">${cmd.shortcut}</span>` : ''}
                        </div>
                    `;
                    globalIndex++;
                });

                html += '</div>';
            }

            this.results.innerHTML = html;

            // Bind click events
            this.results.querySelectorAll('.command-item').forEach(item => {
                item.addEventListener('click', () => {
                    this.selectedIndex = parseInt(item.dataset.index);
                    this.executeSelected();
                });

                item.addEventListener('mouseenter', () => {
                    this.selectedIndex = parseInt(item.dataset.index);
                    this.updateSelection();
                });
            });
        }

        navigateDown() {
            this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredCommands.length - 1);
            this.updateSelection();
        }

        navigateUp() {
            this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
            this.updateSelection();
        }

        updateSelection() {
            this.results.querySelectorAll('.command-item').forEach((item, i) => {
                item.classList.toggle('selected', i === this.selectedIndex);
                if (i === this.selectedIndex) {
                    item.scrollIntoView({ block: 'nearest' });
                }
            });
        }

        executeSelected() {
            const cmd = this.filteredCommands[this.selectedIndex];
            if (cmd && cmd.action) {
                this.close();
                cmd.action();
            }
        }

        // Command actions
        scrollTo(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Try scrolling to portfolio first
                const portfolio = document.getElementById('portfolio');
                if (portfolio) {
                    const target = portfolio.querySelector(`#${sectionId}, [data-section="${sectionId}"]`);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        }

        toggleTheme() {
            const themeToggle = document.getElementById('themeToggle');
            if (themeToggle) {
                themeToggle.click();
            } else {
                // Manual toggle
                const current = document.documentElement.getAttribute('data-theme');
                const newTheme = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            }
        }

        openChat() {
            const chatTrigger = document.getElementById('chatbotTrigger');
            if (chatTrigger && window.portfolioChatbot) {
                window.portfolioChatbot.open();
            }
        }

        downloadResume() {
            const resumeLink = document.querySelector('a[href*="resume"], a[download]');
            if (resumeLink) {
                resumeLink.click();
            } else {
                window.open('resume.pdf', '_blank');
            }
        }

        playGame() {
            const portfolio = document.getElementById('portfolio');
            if (portfolio) {
                portfolio.classList.remove('visible');
                portfolio.classList.add('hidden');
            }
            // Scroll to top for game
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // ==================== SCROLL REVEAL ANIMATIONS ====================
    class ScrollReveal {
        constructor() {
            this.init();
        }

        init() {
            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('revealed');
                            
                            // Stagger children if they exist
                            const staggerChildren = entry.target.querySelectorAll('[data-stagger]');
                            staggerChildren.forEach((child, i) => {
                                child.style.transitionDelay = `${i * 0.1}s`;
                                child.classList.add('revealed');
                            });
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            // Observe all reveal elements
            document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
                this.observer.observe(el);
            });
        }
    }

    // ==================== MAGNETIC ELEMENTS ====================
    class MagneticEffect {
        constructor() {
            this.init();
        }

        init() {
            document.querySelectorAll('.magnetic').forEach(el => {
                el.addEventListener('mousemove', (e) => this.handleMove(e, el));
                el.addEventListener('mouseleave', (e) => this.handleLeave(e, el));
            });
        }

        handleMove(e, el) {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        }

        handleLeave(e, el) {
            el.style.transform = 'translate(0, 0)';
        }
    }

    // ==================== 3D TILT EFFECT ====================
    class TiltEffect {
        constructor() {
            this.init();
        }

        init() {
            document.querySelectorAll('.tilt-card').forEach(card => {
                card.addEventListener('mousemove', (e) => this.handleMove(e, card));
                card.addEventListener('mouseleave', (e) => this.handleLeave(e, card));
            });
        }

        handleMove(e, card) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }

        handleLeave(e, card) {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        }
    }

    // ==================== SPOTLIGHT EFFECT ====================
    class SpotlightEffect {
        constructor() {
            this.init();
        }

        init() {
            document.querySelectorAll('.spotlight-container').forEach(container => {
                const spotlight = document.createElement('div');
                spotlight.className = 'spotlight';
                container.appendChild(spotlight);

                container.addEventListener('mousemove', (e) => {
                    const rect = container.getBoundingClientRect();
                    spotlight.style.left = `${e.clientX - rect.left}px`;
                    spotlight.style.top = `${e.clientY - rect.top}px`;
                });
            });
        }
    }

    // ==================== TEXT ANIMATION ====================
    class TextAnimation {
        constructor() {
            this.init();
        }

        init() {
            // Animate text character by character
            document.querySelectorAll('.char-animate').forEach(el => {
                const text = el.textContent;
                el.textContent = '';
                
                text.split('').forEach((char, i) => {
                    const span = document.createElement('span');
                    span.textContent = char === ' ' ? '\u00A0' : char;
                    span.style.animationDelay = `${i * 0.05}s`;
                    el.appendChild(span);
                });
            });

            // Text reveal on scroll
            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('revealed');
                        }
                    });
                },
                { threshold: 0.5 }
            );

            document.querySelectorAll('.text-reveal').forEach(el => {
                this.observer.observe(el);
            });
        }
    }

    // ==================== PARTICLE TRAIL ====================
    class ParticleTrail {
        constructor() {
            this.particles = [];
            this.init();
        }

        init() {
            // Only on desktop
            if (window.matchMedia('(pointer: fine)').matches) {
                document.addEventListener('mousemove', (e) => this.createParticle(e));
            }
        }

        createParticle(e) {
            // Throttle particle creation
            if (Math.random() > 0.1) return;

            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${['#00ffff', '#ff00ff', '#ffff00'][Math.floor(Math.random() * 3)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 99998;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                animation: particle-fade 1s ease-out forwards;
            `;

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 1000);
        }
    }

    // ==================== SMOOTH SCROLL ENHANCEMENT ====================
    class SmoothScroll {
        constructor() {
            this.init();
        }

        init() {
            // Add smooth scroll to all anchor links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => {
                    const href = anchor.getAttribute('href');
                    if (href === '#') return;

                    e.preventDefault();
                    const target = document.querySelector(href);
                    
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });

                        // Update URL without jumping
                        history.pushState(null, null, href);
                    }
                });
            });
        }
    }

    // ==================== KEYBOARD SHORTCUTS HINT ====================
    class KeyboardHint {
        constructor() {
            this.shown = false;
            this.init();
        }

        init() {
            // Show hint on first visit
            if (!localStorage.getItem('keyboardHintShown')) {
                setTimeout(() => this.showHint(), 5000);
            }
        }

        showHint() {
            if (this.shown) return;
            this.shown = true;

            const hint = document.createElement('div');
            hint.className = 'keyboard-hint';
            hint.innerHTML = `
                <div style="
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    background: rgba(0, 0, 0, 0.9);
                    border: 1px solid rgba(0, 255, 255, 0.3);
                    border-radius: 12px;
                    padding: 1rem 1.5rem;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    animation: slideInRight 0.5s ease;
                    color: white;
                    font-size: 0.9rem;
                ">
                    <span>💡</span>
                    <span>Press <kbd style="background: rgba(0,255,255,0.2); padding: 2px 8px; border-radius: 4px; margin: 0 2px;">⌘/Ctrl</kbd> + <kbd style="background: rgba(0,255,255,0.2); padding: 2px 8px; border-radius: 4px;">K</kbd> for quick navigation</span>
                    <button onclick="this.parentElement.remove(); localStorage.setItem('keyboardHintShown', 'true');" style="
                        background: none;
                        border: none;
                        color: rgba(255,255,255,0.5);
                        cursor: pointer;
                        font-size: 1.2rem;
                    ">×</button>
                </div>
            `;

            document.body.appendChild(hint);

            // Auto-dismiss after 10 seconds
            setTimeout(() => {
                hint.remove();
                localStorage.setItem('keyboardHintShown', 'true');
            }, 10000);
        }
    }

    // ==================== BLOB BACKGROUND ====================
    class BlobBackground {
        constructor() {
            this.init();
        }

        init() {
            // Check if not already added
            if (document.querySelector('.blob-container')) return;

            const container = document.createElement('div');
            container.className = 'blob-container';
            container.innerHTML = `
                <div class="blob blob-1"></div>
                <div class="blob blob-2"></div>
                <div class="blob blob-3"></div>
            `;

            document.body.prepend(container);
        }
    }

    // ==================== INITIALIZE ALL EFFECTS ====================
    function initImmersiveEffects() {
        // Wait for DOM
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        function init() {
            // Initialize all effects
            window.commandPalette = new CommandPalette();
            new ScrollReveal();
            new MagneticEffect();
            new TiltEffect();
            new SpotlightEffect();
            new TextAnimation();
            new ParticleTrail();
            new SmoothScroll();
            new KeyboardHint();
            new BlobBackground();

            // Add CSS for particle fade animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes particle-fade {
                    0% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0) translateY(-50px); }
                }
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(50px); }
                    to { opacity: 1; transform: translateX(0); }
                }
            `;
            document.head.appendChild(style);

            console.log('✨ Immersive effects initialized');
        }
    }

    initImmersiveEffects();

})();
