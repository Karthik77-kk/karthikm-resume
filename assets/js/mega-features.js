/**
 * Mega Features - Ultimate Portfolio Enhancements
 * Advanced AI, Voice, Interactive, and Professional Features
 * Version 3.0.0
 */

(function() {
    'use strict';

    // ==================== AI RESUME ANALYZER ====================
    class AIResumeAnalyzer {
        constructor() {
            // Note: For GitHub Pages static hosting, API key is client-side.
            // For production, use a backend proxy service.
            this.apiKey = 'AIzaSyA2bt3kPtC2OEO-r5Rmi9J5SpB9jj92TcE';
            this.skills = [
                'C#', '.NET Core', 'ASP.NET MVC', 'ASP.NET Web API', 'Entity Framework',
                'Angular', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3',
                'SQL Server', 'Azure', 'Docker', 'Azure DevOps', 'Git',
                'Python', 'Machine Learning', 'REST APIs', 'Microservices'
            ];
            // Expected skills for 100% match calculation
            this.EXPECTED_SKILL_COUNT = 8;
            this.init();
        }

        init() {
            this.createAnalyzerUI();
        }

        createAnalyzerUI() {
            const analyzerHTML = `
                <div id="resumeAnalyzer" class="resume-analyzer-modal" style="display: none;">
                    <div class="analyzer-content glass-card-ultra">
                        <button class="analyzer-close" onclick="window.resumeAnalyzer.close()">✕</button>
                        <h2>🔍 AI Job Match Analyzer</h2>
                        <p>Paste a job description to see how well Karthik's skills match!</p>
                        <textarea id="jobDescInput" placeholder="Paste job description here..." rows="6"></textarea>
                        <button class="btn btn-primary analyze-btn" onclick="window.resumeAnalyzer.analyze()">
                            🤖 Analyze Match
                        </button>
                        <div id="analysisResult" class="analysis-result"></div>
                    </div>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', analyzerHTML);
        }

        open() {
            document.getElementById('resumeAnalyzer').style.display = 'flex';
        }

        close() {
            document.getElementById('resumeAnalyzer').style.display = 'none';
        }

        async analyze() {
            const jobDesc = document.getElementById('jobDescInput').value;
            if (!jobDesc.trim()) {
                // Use notification if available, fallback to alert
                if (typeof showNotification === 'function') {
                    showNotification('Please paste a job description first!', 'warning');
                } else {
                    alert('Please paste a job description first!');
                }
                return;
            }

            const resultDiv = document.getElementById('analysisResult');
            resultDiv.innerHTML = '<div class="loading-spinner">🔄 Analyzing with AI...</div>';

            try {
                // Find matching skills
                const matchedSkills = this.skills.filter(skill => 
                    jobDesc.toLowerCase().includes(skill.toLowerCase())
                );
                
                const matchPercentage = Math.min(100, Math.round((matchedSkills.length / this.EXPECTED_SKILL_COUNT) * 100));
                
                // Get AI analysis
                const aiAnalysis = await this.getAIAnalysis(jobDesc, matchedSkills);
                
                resultDiv.innerHTML = `
                    <div class="match-score ${matchPercentage >= 70 ? 'high' : matchPercentage >= 40 ? 'medium' : 'low'}">
                        <div class="score-circle">
                            <span class="score-number">${matchPercentage}%</span>
                            <span class="score-label">Match</span>
                        </div>
                    </div>
                    <div class="matched-skills">
                        <h4>✅ Matching Skills (${matchedSkills.length})</h4>
                        <div class="skill-tags">
                            ${matchedSkills.map(s => `<span class="skill-tag matched">${s}</span>`).join('')}
                        </div>
                    </div>
                    <div class="ai-recommendation">
                        <h4>🤖 AI Recommendation</h4>
                        <p>${aiAnalysis}</p>
                    </div>
                    <button class="btn btn-secondary" onclick="window.location.href='#contact'">
                        📧 Contact Karthik
                    </button>
                `;
            } catch (error) {
                resultDiv.innerHTML = `<p class="error">Analysis completed with local matching. AI features require API access.</p>`;
            }
        }

        async getAIAnalysis(jobDesc, matchedSkills) {
            const prompt = `Based on these matched skills: ${matchedSkills.join(', ')}. 
            Provide a brief 2-sentence recommendation about the candidate's fit for this role. 
            The candidate has 3+ years .NET full stack experience at Accenture (shopping/healthcare projects) 
            and currently works at Eurofins IT Solutions.`;
            
            try {
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }]
                        })
                    }
                );
                const data = await response.json();
                return data.candidates?.[0]?.content?.parts?.[0]?.text || 
                    'Strong match for .NET development roles based on enterprise experience.';
            } catch {
                return matchedSkills.length >= 5 
                    ? 'Excellent match! Karthik\'s experience aligns well with this role.'
                    : 'Good potential match. Consider reaching out to discuss specific requirements.';
            }
        }
    }

    // ==================== ENHANCED VOICE ASSISTANT ====================
    // Note: For GitHub Pages static hosting, API key is client-side.
    // For production, use a backend proxy service.
    const GEMINI_API_KEY = 'AIzaSyA2bt3kPtC2OEO-r5Rmi9J5SpB9jj92TcE';
    
    class EnhancedVoiceAssistant {
        constructor() {
            this.isListening = false;
            this.recognition = null;
            this.synthesis = window.speechSynthesis;
            this.commands = {
                'navigate to': this.navigateTo.bind(this),
                'go to': this.navigateTo.bind(this),
                'show': this.showSection.bind(this),
                'contact': () => this.navigateTo('contact'),
                'skills': () => this.navigateTo('skills'),
                'experience': () => this.navigateTo('experience'),
                'projects': () => this.navigateTo('projects'),
                'download resume': () => this.executeAction('resume'),
                'copy email': () => this.executeAction('email'),
                'call': () => this.executeAction('call'),
                'open linkedin': () => window.open('https://linkedin.com/in/karthik-m-9262a02b4', '_blank'),
                'open github': () => window.open('https://github.com/Karthik77-kk', '_blank'),
                'who is karthik': () => this.speak('Karthik M is a .NET Full Stack Developer with 3 years of experience at Accenture, now working at Eurofins IT Solutions. He specializes in C#, ASP.NET Core, Angular, and Azure.'),
                'what are his skills': () => this.speak('Karthik is skilled in C#, .NET Core, ASP.NET MVC, Angular, React, TypeScript, SQL Server, Azure, Docker, and more.'),
                'hello': () => this.speak('Hello! I am Karthik\'s portfolio assistant. How can I help you today?'),
                'help': () => this.speak('You can say: navigate to skills, show projects, download resume, copy email, who is Karthik, or what are his skills.'),
                'analyze job': () => { window.resumeAnalyzer?.open(); this.speak('Opening the job match analyzer.'); }
            };
            this.init();
        }

        init() {
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                this.recognition = new SpeechRecognition();
                this.recognition.continuous = false;
                this.recognition.interimResults = false;
                this.recognition.lang = 'en-US';

                this.recognition.onresult = (event) => this.handleResult(event);
                this.recognition.onerror = (event) => this.handleError(event);
                this.recognition.onend = () => this.onEnd();

                this.createEnhancedUI();
            }
        }

        createEnhancedUI() {
            // Update existing voice button or create new one
            const existingBtn = document.querySelector('.voice-btn, [onclick*="voice"]');
            if (existingBtn) {
                existingBtn.onclick = () => this.toggle();
            }
        }

        toggle() {
            if (this.isListening) {
                this.stop();
            } else {
                this.start();
            }
        }

        start() {
            if (!this.recognition) return;
            this.isListening = true;
            this.recognition.start();
            this.speak('I\'m listening. How can I help you?');
            this.updateUI(true);
        }

        stop() {
            if (!this.recognition) return;
            this.isListening = false;
            this.recognition.stop();
            this.updateUI(false);
        }

        updateUI(listening) {
            const btn = document.querySelector('.voice-btn, [onclick*="voice"]');
            if (btn) {
                btn.classList.toggle('listening', listening);
                btn.innerHTML = listening ? '🎙️' : '🎤';
            }
        }

        handleResult(event) {
            const transcript = event.results[0][0].transcript.toLowerCase();
            console.log('Voice command:', transcript);
            this.processCommand(transcript);
        }

        processCommand(transcript) {
            for (const [command, action] of Object.entries(this.commands)) {
                if (transcript.includes(command)) {
                    if (typeof action === 'function') {
                        action(transcript);
                    }
                    return;
                }
            }
            // If no command matched, use AI
            this.getAIResponse(transcript);
        }

        async getAIResponse(query) {
            try {
                const response = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{
                                parts: [{
                                    text: `You are Karthik's portfolio assistant. Answer briefly (1-2 sentences): ${query}`
                                }]
                            }]
                        })
                    }
                );
                const data = await response.json();
                const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                    'I can help you navigate the portfolio. Try saying "show skills" or "contact Karthik".';
                this.speak(answer);
            } catch {
                this.speak('I can help you navigate the portfolio. Try saying "show skills" or "contact".'); 
            }
        }

        navigateTo(section) {
            const target = section.replace('navigate to ', '').replace('go to ', '').trim();
            const element = document.getElementById(target) || document.querySelector(`[id*="${target}"]`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                this.speak(`Navigating to ${target}`);
            }
        }

        showSection(section) {
            this.navigateTo(section.replace('show ', ''));
        }

        executeAction(action) {
            switch(action) {
                case 'resume':
                    if (typeof generateResumePDF === 'function') generateResumePDF();
                    this.speak('Generating resume PDF');
                    break;
                case 'email':
                    if (typeof copyEmail === 'function') copyEmail();
                    this.speak('Email copied to clipboard');
                    break;
                case 'call':
                    window.location.href = 'tel:+917019880061';
                    this.speak('Initiating call');
                    break;
            }
        }

        speak(text) {
            if (this.synthesis) {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = 1;
                utterance.pitch = 1;
                this.synthesis.speak(utterance);
            }
        }

        handleError(event) {
            console.error('Voice recognition error:', event.error);
            this.isListening = false;
            this.updateUI(false);
        }

        onEnd() {
            this.isListening = false;
            this.updateUI(false);
        }
    }

    // ==================== 3D TILT EFFECT FOR CARDS ====================
    class Card3DTilt {
        constructor() {
            this.init();
        }

        init() {
            document.querySelectorAll('.project-card, .cert-card, .glass-card-ultra').forEach(card => {
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

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        }

        handleLeave(e, card) {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        }
    }

    // ==================== MAGNETIC BUTTONS ====================
    class MagneticButtons {
        constructor() {
            this.init();
        }

        init() {
            document.querySelectorAll('.btn, button').forEach(btn => {
                btn.addEventListener('mousemove', (e) => this.handleMove(e, btn));
                btn.addEventListener('mouseleave', (e) => this.handleLeave(e, btn));
            });
        }

        handleMove(e, btn) {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        }

        handleLeave(e, btn) {
            btn.style.transform = 'translate(0, 0)';
        }
    }

    // ==================== SCROLL ANIMATIONS ====================
    class ScrollAnimations {
        constructor() {
            this.init();
        }

        init() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-in');
                        
                        // Animate stat counters
                        if (entry.target.querySelector('.stat-number')) {
                            this.animateCounter(entry.target.querySelector('.stat-number'));
                        }
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('section, .timeline-item, .project-card, .cert-card').forEach(el => {
                el.classList.add('scroll-animate');
                observer.observe(el);
            });
        }

        animateCounter(element) {
            const target = parseInt(element.textContent) || 0;
            if (target === 0 || element.dataset.animated) return;
            
            element.dataset.animated = 'true';
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                element.textContent = Math.floor(current);
            }, 30);
        }
    }

    // ==================== PRELOADER ====================
    class Preloader {
        constructor() {
            this.createPreloader();
        }

        createPreloader() {
            const preloader = document.createElement('div');
            preloader.id = 'preloader';
            preloader.innerHTML = `
                <div class="preloader-content">
                    <div class="preloader-logo">KM</div>
                    <div class="preloader-text">Loading Portfolio...</div>
                    <div class="preloader-bar">
                        <div class="preloader-progress"></div>
                    </div>
                </div>
            `;
            document.body.prepend(preloader);

            // Hide after load
            window.addEventListener('load', () => {
                setTimeout(() => {
                    preloader.classList.add('fade-out');
                    setTimeout(() => preloader.remove(), 500);
                }, 1000);
            });
        }
    }

    // ==================== FLOATING ACTION MENU ====================
    class FloatingActionMenu {
        constructor() {
            this.isOpen = false;
            this.createMenu();
        }

        createMenu() {
            const menu = document.createElement('div');
            menu.className = 'fab-menu';
            menu.innerHTML = `
                <button class="fab-main" onclick="window.fabMenu.toggle()">
                    <span class="fab-icon">⚡</span>
                </button>
                <div class="fab-items">
                    <button class="fab-item" onclick="window.resumeAnalyzer?.open()" title="AI Job Analyzer">
                        🔍
                    </button>
                    <button class="fab-item" onclick="window.enhancedVoice?.start()" title="Voice Assistant">
                        🎤
                    </button>
                    <button class="fab-item" onclick="showQRCode()" title="QR Code">
                        📱
                    </button>
                    <button class="fab-item" onclick="downloadVCard()" title="Save Contact">
                        📇
                    </button>
                    <button class="fab-item" onclick="window.location.href='#contact'" title="Contact">
                        ✉️
                    </button>
                </div>
            `;
            document.body.appendChild(menu);
        }

        toggle() {
            this.isOpen = !this.isOpen;
            const menu = document.querySelector('.fab-menu');
            menu.classList.toggle('open', this.isOpen);
        }
    }

    // ==================== VISITOR INSIGHTS ====================
    class VisitorInsights {
        constructor() {
            this.init();
        }

        init() {
            this.trackVisitor();
            this.displayInsights();
        }

        trackVisitor() {
            const visits = parseInt(localStorage.getItem('visitCount') || '0') + 1;
            localStorage.setItem('visitCount', visits.toString());
            localStorage.setItem('lastVisit', new Date().toISOString());

            // Track time on page
            this.startTime = Date.now();
            window.addEventListener('beforeunload', () => {
                const timeSpent = Math.round((Date.now() - this.startTime) / 1000);
                const totalTime = parseInt(localStorage.getItem('totalTimeSpent') || '0') + timeSpent;
                localStorage.setItem('totalTimeSpent', totalTime.toString());
            });
        }

        displayInsights() {
            const MILLISECONDS_PER_DAY = 86400000; // 1000 * 60 * 60 * 24
            const visits = localStorage.getItem('visitCount') || '1';
            const lastVisit = localStorage.getItem('lastVisit');
            
            // Update any visitor count displays
            const displays = document.querySelectorAll('.visitor-count');
            displays.forEach(el => {
                el.textContent = visits;
            });

            // Welcome back message for returning visitors
            if (parseInt(visits) > 1 && lastVisit) {
                const daysSince = Math.floor((Date.now() - new Date(lastVisit).getTime()) / MILLISECONDS_PER_DAY);
                if (daysSince > 0) {
                    this.showWelcomeBack(daysSince);
                }
            }
        }

        showWelcomeBack(days) {
            setTimeout(() => {
                if (typeof showNotification === 'function') {
                    showNotification(`Welcome back! Last visit was ${days} day${days > 1 ? 's' : ''} ago 👋`, 'info');
                }
            }, 2000);
        }
    }

    // ==================== KEYBOARD SHORTCUTS ====================
    class KeyboardShortcuts {
        constructor() {
            this.init();
        }

        init() {
            document.addEventListener('keydown', (e) => {
                // Don't trigger if typing in input
                if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

                // Ctrl/Cmd + K = Open search/chatbot
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    e.preventDefault();
                    document.querySelector('.ai-assistant-btn, [onclick*="chatbot"]')?.click();
                }

                // Ctrl/Cmd + D = Download resume
                if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                    e.preventDefault();
                    if (typeof generateResumePDF === 'function') generateResumePDF();
                }

                // Escape = Close modals
                if (e.key === 'Escape') {
                    document.querySelectorAll('.modal, [id*="Modal"]').forEach(modal => {
                        modal.style.display = 'none';
                    });
                    window.resumeAnalyzer?.close();
                }

                // Number keys for navigation
                const sections = ['about', 'skills', 'experience', 'projects', 'contact'];
                const num = parseInt(e.key);
                if (num >= 1 && num <= 5) {
                    document.getElementById(sections[num - 1])?.scrollIntoView({ behavior: 'smooth' });
                }

                // V = Toggle voice
                if (e.key === 'v' && !e.ctrlKey && !e.metaKey) {
                    window.enhancedVoice?.toggle();
                }
            });

            // Show shortcuts hint
            this.showShortcutsHint();
        }

        showShortcutsHint() {
            const hint = document.createElement('div');
            hint.className = 'shortcuts-hint';
            hint.innerHTML = `
                <span>⌨️ Press <kbd>?</kbd> for keyboard shortcuts</span>
            `;
            hint.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 8px 15px;
                border-radius: 20px;
                font-size: 12px;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s;
            `;
            document.body.appendChild(hint);

            setTimeout(() => { hint.style.opacity = '1'; }, 3000);
            setTimeout(() => { hint.style.opacity = '0'; }, 8000);
            setTimeout(() => hint.remove(), 9000);
        }
    }

    // ==================== EASTER EGGS ====================
    class EasterEggs {
        constructor() {
            this.init();
        }

        init() {
            // Triple click on logo = confetti
            const logo = document.querySelector('.logo, .nav-logo, [class*="logo"]');
            if (logo) {
                let clicks = 0;
                logo.addEventListener('click', () => {
                    clicks++;
                    setTimeout(() => clicks = 0, 500);
                    if (clicks >= 3) {
                        this.confetti();
                        clicks = 0;
                    }
                });
            }

            // Type "hire" anywhere
            let typed = '';
            document.addEventListener('keypress', (e) => {
                typed += e.key.toLowerCase();
                if (typed.includes('hire')) {
                    this.showHireMessage();
                    typed = '';
                }
                if (typed.length > 10) typed = typed.slice(-10);
            });
        }

        confetti() {
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: hsl(${Math.random() * 360}, 100%, 50%);
                    left: ${Math.random() * 100}vw;
                    top: -10px;
                    z-index: 99999;
                    pointer-events: none;
                    animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
                `;
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 4000);
            }
        }

        showHireMessage() {
            const msg = document.createElement('div');
            msg.innerHTML = `
                <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);
                    background:linear-gradient(135deg,#00ffff,#ff00ff);padding:30px;
                    border-radius:20px;z-index:99999;text-align:center;color:white;
                    font-size:24px;animation:pulse 0.5s infinite;">
                    🎉 You want to hire Karthik? <br>
                    <a href="#contact" style="color:white;text-decoration:underline;">Let's talk!</a>
                    <br><small style="font-size:14px;opacity:0.8;">Click anywhere to close</small>
                </div>
            `;
            document.body.appendChild(msg);
            msg.addEventListener('click', () => msg.remove());
            setTimeout(() => msg.remove(), 5000);
        }
    }

    // ==================== SMART GREETINGS ====================
    class SmartGreetings {
        constructor() {
            this.init();
        }

        init() {
            this.setPersonalizedGreeting();
            this.detectDeviceAndOptimize();
        }

        setPersonalizedGreeting() {
            const hour = new Date().getHours();
            const greetings = {
                morning: { text: 'Good Morning! ☀️', emoji: '🌅' },
                afternoon: { text: 'Good Afternoon! 🌤️', emoji: '☀️' },
                evening: { text: 'Good Evening! 🌆', emoji: '🌙' },
                night: { text: 'Working Late? 🌙', emoji: '⭐' }
            };

            let greeting;
            if (hour >= 5 && hour < 12) greeting = greetings.morning;
            else if (hour >= 12 && hour < 17) greeting = greetings.afternoon;
            else if (hour >= 17 && hour < 21) greeting = greetings.evening;
            else greeting = greetings.night;

            // Update page title
            if (hour >= 22 || hour < 6) {
                document.title = `🌙 ${document.title.replace(/^🌙\s*/, '')}`;
            }

            // Show greeting notification
            setTimeout(() => {
                if (typeof showNotification === 'function') {
                    showNotification(greeting.text, 'info');
                }
            }, 1500);
        }

        detectDeviceAndOptimize() {
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
                document.body.classList.add('mobile-device');
                // Reduce animations on mobile for performance
                document.documentElement.style.setProperty('--animation-duration', '0.2s');
            }
        }
    }

    // ==================== ACCESSIBILITY ENHANCEMENTS ====================
    class AccessibilityEnhancements {
        constructor() {
            this.init();
        }

        init() {
            this.addSkipLinks();
            this.enhanceKeyboardNav();
            this.addAriaLabels();
        }

        addSkipLinks() {
            if (!document.querySelector('.skip-link')) {
                const skip = document.createElement('a');
                skip.href = '#main-content';
                skip.className = 'skip-link';
                skip.textContent = 'Skip to main content';
                skip.style.cssText = `
                    position: fixed;
                    top: -100px;
                    left: 10px;
                    background: var(--primary, #00ffff);
                    color: black;
                    padding: 10px 20px;
                    z-index: 100000;
                    border-radius: 5px;
                    transition: top 0.3s;
                `;
                skip.addEventListener('focus', () => skip.style.top = '10px');
                skip.addEventListener('blur', () => skip.style.top = '-100px');
                document.body.prepend(skip);
            }
        }

        enhanceKeyboardNav() {
            // Make all interactive elements focusable
            document.querySelectorAll('.project-card, .cert-card, .skill-tag').forEach(el => {
                if (!el.hasAttribute('tabindex')) {
                    el.setAttribute('tabindex', '0');
                }
            });

            // Enter key activates focused non-interactive elements only
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && document.activeElement) {
                    const tag = document.activeElement.tagName.toLowerCase();
                    const isInteractive = ['button', 'a', 'input', 'textarea', 'select'].includes(tag);
                    // Only trigger click on non-interactive elements that we made focusable
                    if (!isInteractive && document.activeElement.hasAttribute('tabindex')) {
                        document.activeElement.click();
                    }
                }
            });
        }

        addAriaLabels() {
            // Add missing aria labels
            document.querySelectorAll('button:not([aria-label])').forEach(btn => {
                const text = btn.textContent.trim();
                if (text) {
                    btn.setAttribute('aria-label', text);
                }
            });
        }
    }

    // ==================== INITIALIZE ALL FEATURES ====================
    document.addEventListener('DOMContentLoaded', () => {
        // Core features
        window.resumeAnalyzer = new AIResumeAnalyzer();
        window.enhancedVoice = new EnhancedVoiceAssistant();
        window.fabMenu = new FloatingActionMenu();
        
        // Visual enhancements
        new Card3DTilt();
        new MagneticButtons();
        new ScrollAnimations();
        new Preloader();
        
        // User experience
        new VisitorInsights();
        new KeyboardShortcuts();
        new SmartGreetings();
        new AccessibilityEnhancements();
        
        // Fun features
        new EasterEggs();

        console.log('🚀 Mega Features v3.0 initialized!');
    });

})();
