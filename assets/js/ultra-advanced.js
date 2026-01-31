/**
 * Ultra Advanced Features JS
 * Version 1.0.0
 * Voice Commands, Code Playground, Scheduler, and More
 */

(function() {
    'use strict';

    // ==================== VOICE COMMANDS ====================
    class VoiceCommands {
        constructor() {
            this.isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
            this.isListening = false;
            this.recognition = null;
            
            if (this.isSupported) {
                this.init();
            }
        }

        init() {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.createUI();
            this.bindEvents();
        }

        createUI() {
            const html = `
                <button class="voice-command-btn" id="voiceCommandBtn" aria-label="Voice Commands" title="Click to use voice commands">
                    🎤
                </button>
                <div class="voice-feedback" id="voiceFeedback">
                    <div class="voice-feedback-icon">🎤</div>
                    <div class="voice-feedback-text" id="voiceFeedbackText">Listening...</div>
                    <div class="voice-waves">
                        <div class="voice-wave"></div>
                        <div class="voice-wave"></div>
                        <div class="voice-wave"></div>
                        <div class="voice-wave"></div>
                        <div class="voice-wave"></div>
                    </div>
                </div>
            `;

            const container = document.createElement('div');
            container.innerHTML = html;
            document.body.appendChild(container);

            this.button = document.getElementById('voiceCommandBtn');
            this.feedback = document.getElementById('voiceFeedback');
            this.feedbackText = document.getElementById('voiceFeedbackText');
        }

        bindEvents() {
            this.button.addEventListener('click', () => this.toggle());

            this.recognition.onstart = () => {
                this.isListening = true;
                this.button.classList.add('listening');
                this.feedback.classList.add('active');
                this.feedbackText.textContent = 'Listening...';
            };

            this.recognition.onend = () => {
                this.isListening = false;
                this.button.classList.remove('listening');
                setTimeout(() => {
                    this.feedback.classList.remove('active');
                }, 1500);
            };

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                this.feedbackText.textContent = `"${transcript}"`;
                this.processCommand(transcript);
            };

            this.recognition.onerror = (event) => {
                this.feedbackText.textContent = 'Error: ' + event.error;
                setTimeout(() => {
                    this.feedback.classList.remove('active');
                }, 2000);
            };
        }

        toggle() {
            if (this.isListening) {
                this.recognition.stop();
            } else {
                this.recognition.start();
            }
        }

        processCommand(transcript) {
            const commands = {
                // Navigation
                'go to about': () => this.navigateTo('about'),
                'go to skills': () => this.navigateTo('skills'),
                'go to projects': () => this.navigateTo('projects'),
                'go to experience': () => this.navigateTo('experience'),
                'go to contact': () => this.navigateTo('contact'),
                'go to testimonials': () => this.navigateTo('testimonials'),
                'go home': () => this.navigateTo('hero'),
                'scroll up': () => window.scrollBy({ top: -500, behavior: 'smooth' }),
                'scroll down': () => window.scrollBy({ top: 500, behavior: 'smooth' }),
                
                // Actions
                'download resume': () => this.downloadResume(),
                'toggle theme': () => this.toggleTheme(),
                'change theme': () => this.toggleTheme(),
                'dark mode': () => this.setTheme('dark'),
                'light mode': () => this.setTheme('light'),
                'open chat': () => this.openChat(),
                'close chat': () => this.closeChat(),
                
                // Contact
                'call': () => window.location.href = 'tel:+917019880061',
                'send email': () => window.location.href = 'mailto:iammrkarthik2002@gmail.com',
                'open linkedin': () => window.open('https://linkedin.com/in/karthik-m-9262a02b4', '_blank'),
                'open github': () => window.open('https://github.com/Karthik77-kk', '_blank'),
                
                // Fun
                'play game': () => this.playGame(),
                'surprise me': () => this.triggerEasterEgg()
            };

            // Find matching command
            let executed = false;
            for (const [phrase, action] of Object.entries(commands)) {
                if (transcript.includes(phrase)) {
                    action();
                    executed = true;
                    this.showNotification(`Command: ${phrase}`, 'success');
                    break;
                }
            }

            if (!executed) {
                this.showNotification('Command not recognized. Try "go to projects" or "download resume"', 'info');
            }
        }

        navigateTo(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }

        downloadResume() {
            const btn = document.querySelector('button[onclick*="generateResume"], a[download]');
            if (btn) btn.click();
        }

        toggleTheme() {
            const toggle = document.getElementById('themeToggle');
            if (toggle) toggle.click();
        }

        setTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        }

        openChat() {
            if (window.portfolioChatbot) {
                window.portfolioChatbot.open();
            }
        }

        closeChat() {
            if (window.portfolioChatbot) {
                window.portfolioChatbot.close();
            }
        }

        playGame() {
            const portfolio = document.getElementById('portfolio');
            if (portfolio) {
                portfolio.classList.remove('visible');
                portfolio.classList.add('hidden');
            }
        }

        triggerEasterEgg() {
            this.createConfetti();
            this.showNotification('🎉 Surprise! You found an easter egg!', 'success');
        }

        createConfetti() {
            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
            for (let i = 0; i < 100; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti-piece';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 4000);
            }
        }

        showNotification(message, type) {
            if (typeof showNotification === 'function') {
                showNotification(message, type);
            } else {
                console.log(message);
            }
        }
    }

    // ==================== CODE PLAYGROUND ====================
    class CodePlayground {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;
            
            this.init();
        }

        init() {
            this.createPlayground();
            this.bindEvents();
        }

        createPlayground() {
            const html = `
                <div class="code-playground">
                    <div class="code-playground-header">
                        <div class="code-playground-dots">
                            <span class="code-playground-dot red"></span>
                            <span class="code-playground-dot yellow"></span>
                            <span class="code-playground-dot green"></span>
                        </div>
                        <span class="code-playground-title">JavaScript Playground</span>
                        <div class="code-playground-actions">
                            <button class="code-playground-btn" id="clearCode">Clear</button>
                            <button class="code-playground-btn run" id="runCode">▶ Run</button>
                        </div>
                    </div>
                    <div class="code-playground-editor">
                        <textarea class="code-playground-input" id="codeInput" spellcheck="false">// Try some JavaScript!
const greeting = "Hello, World!";
console.log(greeting);

// Calculate factorial
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

console.log("Factorial of 5:", factorial(5));

// Array operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);</textarea>
                        <div class="code-playground-output" id="codeOutput">// Output will appear here</div>
                    </div>
                </div>
            `;

            this.container.innerHTML = html;
            this.input = document.getElementById('codeInput');
            this.output = document.getElementById('codeOutput');
            this.runBtn = document.getElementById('runCode');
            this.clearBtn = document.getElementById('clearCode');
        }

        bindEvents() {
            this.runBtn.addEventListener('click', () => this.runCode());
            this.clearBtn.addEventListener('click', () => this.clearCode());
            
            // Run on Ctrl/Cmd + Enter
            this.input.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    this.runCode();
                }
            });
        }

        runCode() {
            const code = this.input.value;
            let output = [];

            // Override console.log
            const originalLog = console.log;
            console.log = (...args) => {
                output.push(args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' '));
            };

            try {
                // Create a sandboxed evaluation context
                // Restrict access to sensitive APIs by shadowing them
                const sandboxedCode = `
                    "use strict";
                    const window = undefined;
                    const document = undefined;
                    const fetch = undefined;
                    const XMLHttpRequest = undefined;
                    const localStorage = undefined;
                    const sessionStorage = undefined;
                    const indexedDB = undefined;
                    const navigator = undefined;
                    const location = undefined;
                    const history = undefined;
                    const cookies = undefined;
                    ${code}
                `;
                const result = new Function(sandboxedCode)();
                if (result !== undefined) {
                    output.push('→ ' + (typeof result === 'object' ? JSON.stringify(result, null, 2) : result));
                }
                this.output.textContent = output.join('\n') || '// No output';
                this.output.classList.remove('error');
            } catch (error) {
                this.output.textContent = '❌ Error: ' + error.message;
                this.output.classList.add('error');
            }

            // Restore console.log
            console.log = originalLog;
        }

        clearCode() {
            this.input.value = '';
            this.output.textContent = '// Output will appear here';
            this.output.classList.remove('error');
        }
    }

    // ==================== MEETING SCHEDULER ====================
    class MeetingScheduler {
        constructor() {
            this.isOpen = false;
            this.timezone = 'Asia/Kolkata';
            this.init();
        }

        init() {
            this.createUI();
            this.bindEvents();
            this.updateTime();
            setInterval(() => this.updateTime(), 1000);
        }

        createUI() {
            const html = `
                <div class="scheduler-widget">
                    <button class="scheduler-btn" id="schedulerBtn" aria-label="Schedule Meeting" title="Schedule a meeting">
                        📅
                    </button>
                    <div class="scheduler-modal" id="schedulerModal">
                        <div class="scheduler-header">
                            <h3>📅 Schedule a Meeting</h3>
                            <button class="scheduler-close" id="schedulerClose">×</button>
                        </div>
                        <div class="scheduler-timezone">
                            <div class="scheduler-timezone-label">Karthik's Local Time</div>
                            <div class="scheduler-timezone-time" id="localTime">--:--</div>
                            <div class="scheduler-timezone-location">📍 Bangalore, India (IST)</div>
                        </div>
                        <div class="scheduler-options">
                            <a href="https://calendly.com" target="_blank" rel="noopener" class="scheduler-option">
                                <span class="scheduler-option-icon">📆</span>
                                <div class="scheduler-option-info">
                                    <h4>Book via Calendly</h4>
                                    <p>Schedule a 30-min call</p>
                                </div>
                            </a>
                            <a href="mailto:iammrkarthik2002@gmail.com?subject=Meeting%20Request" class="scheduler-option">
                                <span class="scheduler-option-icon">📧</span>
                                <div class="scheduler-option-info">
                                    <h4>Email for Scheduling</h4>
                                    <p>Propose your preferred time</p>
                                </div>
                            </a>
                            <a href="https://wa.me/917019880061?text=Hi%20Karthik!%20I'd%20like%20to%20schedule%20a%20call." target="_blank" rel="noopener" class="scheduler-option">
                                <span class="scheduler-option-icon">💬</span>
                                <div class="scheduler-option-info">
                                    <h4>WhatsApp Message</h4>
                                    <p>Quick response guaranteed</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            `;

            const container = document.createElement('div');
            container.innerHTML = html;
            document.body.appendChild(container);

            this.button = document.getElementById('schedulerBtn');
            this.modal = document.getElementById('schedulerModal');
            this.closeBtn = document.getElementById('schedulerClose');
            this.timeDisplay = document.getElementById('localTime');
        }

        bindEvents() {
            this.button.addEventListener('click', () => this.toggle());
            this.closeBtn.addEventListener('click', () => this.close());

            document.addEventListener('click', (e) => {
                if (this.isOpen && !this.modal.contains(e.target) && e.target !== this.button) {
                    this.close();
                }
            });
        }

        toggle() {
            this.isOpen ? this.close() : this.open();
        }

        open() {
            this.isOpen = true;
            this.modal.classList.add('open');
        }

        close() {
            this.isOpen = false;
            this.modal.classList.remove('open');
        }

        updateTime() {
            const now = new Date();
            const options = {
                timeZone: this.timezone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            };
            this.timeDisplay.textContent = now.toLocaleTimeString('en-US', options);
        }
    }

    // ==================== QUICK CONTACT WIDGET ====================
    class QuickContact {
        constructor() {
            this.isOpen = false;
            this.init();
        }

        init() {
            this.createUI();
            this.bindEvents();
        }

        createUI() {
            const html = `
                <div class="quick-contact" id="quickContact">
                    <div class="quick-contact-options" id="quickContactOptions">
                        <a href="mailto:iammrkarthik2002@gmail.com" class="quick-contact-option email" title="Email">
                            📧
                            <span class="quick-contact-tooltip">Send Email</span>
                        </a>
                        <a href="tel:+917019880061" class="quick-contact-option phone" title="Call">
                            📞
                            <span class="quick-contact-tooltip">Call Now</span>
                        </a>
                        <a href="https://linkedin.com/in/karthik-m-9262a02b4" target="_blank" rel="noopener" class="quick-contact-option linkedin" title="LinkedIn">
                            💼
                            <span class="quick-contact-tooltip">LinkedIn</span>
                        </a>
                        <a href="https://github.com/Karthik77-kk" target="_blank" rel="noopener" class="quick-contact-option github" title="GitHub">
                            🐙
                            <span class="quick-contact-tooltip">GitHub</span>
                        </a>
                    </div>
                    <button class="quick-contact-btn" id="quickContactBtn" aria-label="Quick Contact">
                        ✉️
                    </button>
                </div>
            `;

            const container = document.createElement('div');
            container.innerHTML = html;
            document.body.appendChild(container);

            this.button = document.getElementById('quickContactBtn');
            this.options = document.getElementById('quickContactOptions');
        }

        bindEvents() {
            this.button.addEventListener('click', () => this.toggle());
        }

        toggle() {
            this.isOpen = !this.isOpen;
            this.button.classList.toggle('open', this.isOpen);
            this.options.classList.toggle('open', this.isOpen);
        }
    }

    // ==================== TYPING SPEED TEST ====================
    class TypingSpeedTest {
        constructor() {
            this.texts = [
                "The quick brown fox jumps over the lazy dog.",
                "Karthik is a passionate full stack developer who loves to code.",
                "Machine learning and artificial intelligence are transforming the world.",
                "Python, JavaScript, and React are powerful tools for web development.",
                "Cloud computing enables scalable and reliable software solutions."
            ];
            this.currentText = '';
            this.typedText = '';
            this.startTime = null;
            this.isActive = false;
            this.wpm = 0;
            this.accuracy = 100;

            this.init();
        }

        init() {
            // Trigger on secret key combination: Ctrl+Shift+T
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                    e.preventDefault();
                    this.open();
                }
            });
        }

        open() {
            this.createUI();
            this.bindEvents();
            this.reset();
        }

        createUI() {
            if (document.getElementById('typingTestModal')) {
                document.getElementById('typingTestModal').classList.add('open');
                return;
            }

            const html = `
                <div class="typing-test-modal" id="typingTestModal">
                    <div class="typing-test-container">
                        <div class="typing-test-header">
                            <h2>⌨️ Typing Speed Test</h2>
                            <p>Test your typing skills! Press Ctrl+Shift+T anytime to open.</p>
                        </div>
                        <div class="typing-test-stats">
                            <div class="typing-stat">
                                <div class="typing-stat-value" id="wpmDisplay">0</div>
                                <div class="typing-stat-label">WPM</div>
                            </div>
                            <div class="typing-stat">
                                <div class="typing-stat-value" id="accuracyDisplay">100%</div>
                                <div class="typing-stat-label">Accuracy</div>
                            </div>
                            <div class="typing-stat">
                                <div class="typing-stat-value" id="timeDisplay">0s</div>
                                <div class="typing-stat-label">Time</div>
                            </div>
                        </div>
                        <div class="typing-test-text" id="typingTestText"></div>
                        <input type="text" class="typing-test-input" id="typingTestInput" 
                               placeholder="Start typing here..." autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
                        <div class="typing-test-actions">
                            <button class="btn btn-secondary" id="typingTestReset">Reset</button>
                            <button class="btn btn-primary" id="typingTestClose">Close</button>
                        </div>
                    </div>
                </div>
            `;

            const container = document.createElement('div');
            container.innerHTML = html;
            document.body.appendChild(container.firstElementChild);

            this.modal = document.getElementById('typingTestModal');
            this.textDisplay = document.getElementById('typingTestText');
            this.input = document.getElementById('typingTestInput');
            this.wpmDisplay = document.getElementById('wpmDisplay');
            this.accuracyDisplay = document.getElementById('accuracyDisplay');
            this.timeDisplay = document.getElementById('timeDisplay');
            this.resetBtn = document.getElementById('typingTestReset');
            this.closeBtn = document.getElementById('typingTestClose');

            this.modal.classList.add('open');
        }

        bindEvents() {
            this.input.addEventListener('input', () => this.handleInput());
            this.resetBtn.addEventListener('click', () => this.reset());
            this.closeBtn.addEventListener('click', () => this.close());
            
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) this.close();
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.modal.classList.contains('open')) {
                    this.close();
                }
            });
        }

        reset() {
            this.currentText = this.texts[Math.floor(Math.random() * this.texts.length)];
            this.typedText = '';
            this.startTime = null;
            this.isActive = false;
            this.wpm = 0;
            this.accuracy = 100;

            this.updateDisplay();
            this.input.value = '';
            this.input.focus();

            if (this.timer) {
                clearInterval(this.timer);
            }
        }

        handleInput() {
            if (!this.startTime) {
                this.startTime = Date.now();
                this.startTimer();
            }

            this.typedText = this.input.value;
            this.calculateStats();
            this.updateDisplay();

            if (this.typedText === this.currentText) {
                this.complete();
            }
        }

        startTimer() {
            this.timer = setInterval(() => {
                const elapsed = Math.floor((Date.now() - this.startTime) / 1000);
                this.timeDisplay.textContent = elapsed + 's';
            }, 100);
        }

        calculateStats() {
            const timeElapsed = (Date.now() - this.startTime) / 1000 / 60; // minutes
            const wordsTyped = this.typedText.trim().split(/\s+/).length;
            this.wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;

            let correct = 0;
            for (let i = 0; i < this.typedText.length; i++) {
                if (this.typedText[i] === this.currentText[i]) {
                    correct++;
                }
            }
            this.accuracy = this.typedText.length > 0 
                ? Math.round((correct / this.typedText.length) * 100) 
                : 100;
        }

        updateDisplay() {
            let html = '';
            for (let i = 0; i < this.currentText.length; i++) {
                const char = this.currentText[i];
                let className = 'remaining';
                
                if (i < this.typedText.length) {
                    className = this.typedText[i] === char ? 'correct' : 'incorrect';
                } else if (i === this.typedText.length) {
                    className = 'current';
                }
                
                html += `<span class="${className}">${char}</span>`;
            }
            this.textDisplay.innerHTML = html;
            this.wpmDisplay.textContent = this.wpm;
            this.accuracyDisplay.textContent = this.accuracy + '%';
        }

        complete() {
            clearInterval(this.timer);
            const finalTime = Math.floor((Date.now() - this.startTime) / 1000);
            
            // Award XP
            if (typeof addXP === 'function') {
                addXP(50, 'Typing test completed!');
            }
            
            // Show notification
            if (typeof showNotification === 'function') {
                showNotification(`🎉 Completed! ${this.wpm} WPM with ${this.accuracy}% accuracy!`, 'success');
            }
        }

        close() {
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.modal.classList.remove('open');
        }
    }

    // ==================== CUSTOM CURSOR ====================
    class CustomCursor {
        constructor() {
            this.isEnabled = window.matchMedia('(pointer: fine)').matches;
            if (!this.isEnabled) return;
            
            this.init();
        }

        init() {
            this.createCursor();
            this.bindEvents();
        }

        createCursor() {
            this.dot = document.createElement('div');
            this.dot.className = 'cursor-dot';
            
            this.ring = document.createElement('div');
            this.ring.className = 'cursor-ring';
            
            document.body.appendChild(this.dot);
            document.body.appendChild(this.ring);
        }

        bindEvents() {
            document.addEventListener('mousemove', (e) => {
                this.dot.style.left = e.clientX + 'px';
                this.dot.style.top = e.clientY + 'px';
                this.ring.style.left = e.clientX + 'px';
                this.ring.style.top = e.clientY + 'px';
            });

            document.addEventListener('mousedown', () => {
                this.ring.classList.add('click');
            });

            document.addEventListener('mouseup', () => {
                this.ring.classList.remove('click');
            });

            // Hover effect on interactive elements
            const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    this.ring.classList.add('hover');
                });
                el.addEventListener('mouseleave', () => {
                    this.ring.classList.remove('hover');
                });
            });
        }
    }

    // ==================== READING PROGRESS ====================
    class ReadingProgress {
        constructor() {
            this.init();
        }

        init() {
            this.createUI();
            this.bindEvents();
        }

        createUI() {
            const html = `
                <div class="reading-progress">
                    <div class="reading-progress-bar" id="readingProgressBar"></div>
                </div>
            `;

            document.body.insertAdjacentHTML('afterbegin', html);
            this.progressBar = document.getElementById('readingProgressBar');
        }

        bindEvents() {
            window.addEventListener('scroll', () => this.updateProgress());
        }

        updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            this.progressBar.style.width = progress + '%';
        }
    }

    // ==================== SOUND EFFECTS ====================
    class SoundEffects {
        constructor() {
            this.enabled = localStorage.getItem('soundEnabled') !== 'false';
            this.sounds = {};
            this.init();
        }

        init() {
            this.createToggle();
            this.preloadSounds();
            this.bindEvents();
        }

        createToggle() {
            const toggle = document.createElement('button');
            toggle.className = 'sound-toggle-global' + (this.enabled ? '' : ' muted');
            toggle.id = 'soundToggle';
            toggle.innerHTML = this.enabled ? '🔊' : '🔇';
            toggle.title = 'Toggle sound effects';
            toggle.setAttribute('aria-label', 'Toggle sound effects');
            document.body.appendChild(toggle);

            toggle.addEventListener('click', () => this.toggle());
        }

        preloadSounds() {
            // Create oscillator-based sounds instead of files
            this.audioContext = null;
        }

        getAudioContext() {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            return this.audioContext;
        }

        playClick() {
            if (!this.enabled) return;
            this.playTone(800, 0.05);
        }

        playSuccess() {
            if (!this.enabled) return;
            this.playTone(523, 0.1);
            setTimeout(() => this.playTone(659, 0.1), 100);
            setTimeout(() => this.playTone(784, 0.15), 200);
        }

        playError() {
            if (!this.enabled) return;
            this.playTone(200, 0.2);
        }

        playTone(frequency, duration) {
            try {
                const ctx = this.getAudioContext();
                const oscillator = ctx.createOscillator();
                const gainNode = ctx.createGain();

                oscillator.connect(gainNode);
                gainNode.connect(ctx.destination);

                oscillator.frequency.value = frequency;
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

                oscillator.start(ctx.currentTime);
                oscillator.stop(ctx.currentTime + duration);
            } catch (e) {
                // Audio not supported
            }
        }

        toggle() {
            this.enabled = !this.enabled;
            localStorage.setItem('soundEnabled', this.enabled);
            
            const toggle = document.getElementById('soundToggle');
            toggle.innerHTML = this.enabled ? '🔊' : '🔇';
            toggle.classList.toggle('muted', !this.enabled);

            if (this.enabled) {
                this.playSuccess();
            }
        }

        bindEvents() {
            // Play click sound on buttons
            document.addEventListener('click', (e) => {
                if (e.target.matches('button, a, [role="button"]')) {
                    this.playClick();
                }
            });
        }
    }

    // ==================== CONFETTI EFFECT ====================
    class ConfettiEffect {
        constructor() {
            // Expose globally
            window.createConfetti = () => this.create();
        }

        create(count = 100) {
            const container = document.createElement('div');
            container.className = 'confetti-container';
            document.body.appendChild(container);

            const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#88ff00'];
            
            for (let i = 0; i < count; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti-piece';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
                confetti.style.animationDelay = Math.random() * 0.5 + 's';
                confetti.style.width = (5 + Math.random() * 10) + 'px';
                confetti.style.height = (5 + Math.random() * 10) + 'px';
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                container.appendChild(confetti);
            }

            setTimeout(() => container.remove(), 5000);
        }
    }

    // ==================== SKILL RADAR CHART ====================
    class SkillRadarChart {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;

            this.skills = [
                { name: 'Python', level: 95 },
                { name: 'JavaScript', level: 90 },
                { name: 'React', level: 85 },
                { name: 'Node.js', level: 85 },
                { name: 'AWS', level: 80 },
                { name: 'Machine Learning', level: 85 },
                { name: 'Docker', level: 75 },
                { name: 'MongoDB', level: 85 }
            ];

            this.init();
        }

        init() {
            this.createChart();
        }

        createChart() {
            const size = 400;
            const center = size / 2;
            const radius = size * 0.35;
            const levels = 5;

            let svg = `<svg class="skill-radar-svg" viewBox="0 0 ${size} ${size}">`;
            
            // Draw grid circles
            for (let i = 1; i <= levels; i++) {
                const r = (radius / levels) * i;
                svg += `<circle class="radar-grid" cx="${center}" cy="${center}" r="${r}"/>`;
            }

            // Draw axes
            const angleStep = (Math.PI * 2) / this.skills.length;
            this.skills.forEach((skill, i) => {
                const angle = angleStep * i - Math.PI / 2;
                const x = center + radius * Math.cos(angle);
                const y = center + radius * Math.sin(angle);
                svg += `<line class="radar-axis" x1="${center}" y1="${center}" x2="${x}" y2="${y}"/>`;
                
                // Labels
                const labelX = center + (radius + 30) * Math.cos(angle);
                const labelY = center + (radius + 30) * Math.sin(angle);
                svg += `<text class="radar-label" x="${labelX}" y="${labelY}" text-anchor="middle" dominant-baseline="middle">${skill.name}</text>`;
            });

            // Draw data polygon
            let points = this.skills.map((skill, i) => {
                const angle = angleStep * i - Math.PI / 2;
                const r = (radius * skill.level) / 100;
                return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            }).join(' ');
            
            svg += `<polygon class="radar-area" points="${points}"/>`;

            // Draw data points
            this.skills.forEach((skill, i) => {
                const angle = angleStep * i - Math.PI / 2;
                const r = (radius * skill.level) / 100;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                svg += `<circle class="radar-point" cx="${x}" cy="${y}" r="5" data-skill="${skill.name}" data-level="${skill.level}">
                    <title>${skill.name}: ${skill.level}%</title>
                </circle>`;
            });

            svg += '</svg>';

            this.container.innerHTML = `<div class="skill-radar-container">${svg}</div>`;
        }
    }

    // ==================== INITIALIZE ALL FEATURES ====================
    function initUltraAdvanced() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }

        function init() {
            // Initialize all advanced features
            new VoiceCommands();
            new CodePlayground('codePlayground');
            new MeetingScheduler();
            new QuickContact();
            new TypingSpeedTest();
            new CustomCursor();
            new ReadingProgress();
            new SoundEffects();
            new ConfettiEffect();
            new SkillRadarChart('skillRadar');

            console.log('🚀 Ultra advanced features initialized');
        }
    }

    initUltraAdvanced();

})();
