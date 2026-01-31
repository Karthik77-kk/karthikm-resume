/**
 * AI Chatbot - Portfolio Assistant
 * Version 1.0.0
 * Intelligent chatbot with portfolio-aware responses
 */

(function() {
    'use strict';

    // ==================== CHATBOT DATA ====================
    const portfolioData = {
        name: "Karthik M",
        role: "Full Stack Developer",
        company: "Eurofins IT Solutions",
        email: "iammrkarthik2002@gmail.com",
        phone: "+917019880061",
        location: "Bangalore, India",
        github: "https://github.com/Karthik77-kk",
        linkedin: "https://linkedin.com/in/karthik-m-9262a02b4",
        skills: {
            frontend: ["React.js", "Vue.js", "Angular", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
            backend: ["Python", "Node.js", "Express.js", "Django", "Flask", "FastAPI", "REST APIs", "GraphQL"],
            database: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase", "SQLite"],
            cloud: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Terraform"],
            ml: ["Machine Learning", "TensorFlow", "PyTorch", "Computer Vision", "NLP", "Data Science", "Pandas", "NumPy"],
            tools: ["Git", "GitHub", "VS Code", "Postman", "Jira", "Figma", "Linux"]
        },
        experience: [
            {
                role: "Software Developer",
                company: "Eurofins IT Solutions India Pvt Ltd",
                period: "June 2024 - Present",
                description: "Full-stack development, API design, cloud deployment, ML integration"
            }
        ],
        projects: [
            {
                name: "AI-Powered Resume Parser",
                tech: ["Python", "NLP", "Machine Learning", "Flask"],
                description: "Intelligent resume parsing system using NLP and ML"
            },
            {
                name: "Real-time Dashboard",
                tech: ["React", "Node.js", "Socket.io", "MongoDB"],
                description: "Live analytics dashboard with real-time data visualization"
            },
            {
                name: "Cloud Deployment Pipeline",
                tech: ["AWS", "Docker", "Kubernetes", "Terraform"],
                description: "Automated CI/CD pipeline for cloud deployments"
            },
            {
                name: "Computer Vision System",
                tech: ["Python", "OpenCV", "TensorFlow", "IoT"],
                description: "Object detection and tracking for industrial applications"
            }
        ],
        certifications: [
            "AWS Certified Cloud Practitioner",
            "Google Cloud Associate",
            "MongoDB Developer",
            "Python Professional Certificate",
            "Machine Learning Specialization"
        ],
        education: {
            degree: "MCA (Master of Computer Applications)",
            college: "Dayananda Sagar Academy of Technology & Management",
            year: "2024"
        },
        hobbies: ["Coding", "Gaming", "Reading Tech Blogs", "Open Source Contribution", "Photography"]
    };

    // ==================== RESPONSE TEMPLATES ====================
    const responses = {
        greeting: [
            "Hey there! 👋 I'm Karthik's AI assistant. How can I help you learn more about his work?",
            "Hello! Welcome to Karthik's portfolio. I can tell you about his skills, projects, or how to get in touch!",
            "Hi! 🚀 Great to meet you! Ask me anything about Karthik's experience as a Full Stack Developer."
        ],
        skills: {
            general: `Karthik is a versatile Full Stack Developer with expertise in:\n\n🎨 **Frontend:** ${portfolioData.skills.frontend.slice(0, 5).join(', ')}\n\n⚙️ **Backend:** ${portfolioData.skills.backend.slice(0, 5).join(', ')}\n\n☁️ **Cloud & DevOps:** ${portfolioData.skills.cloud.slice(0, 4).join(', ')}\n\n🤖 **AI/ML:** ${portfolioData.skills.ml.slice(0, 4).join(', ')}\n\nWant to know more about any specific area?`,
            frontend: `For frontend development, Karthik works with:\n\n${portfolioData.skills.frontend.map(s => `• ${s}`).join('\n')}\n\nHe builds responsive, interactive UIs with modern frameworks!`,
            backend: `On the backend side, Karthik is proficient in:\n\n${portfolioData.skills.backend.map(s => `• ${s}`).join('\n')}\n\nFrom REST APIs to GraphQL, he's got it covered!`,
            cloud: `Karthik's cloud & DevOps skills include:\n\n${portfolioData.skills.cloud.map(s => `• ${s}`).join('\n')}\n\nHe can architect and deploy scalable cloud solutions!`,
            ml: `For AI/ML projects, Karthik uses:\n\n${portfolioData.skills.ml.map(s => `• ${s}`).join('\n')}\n\nFrom computer vision to NLP, he brings AI to applications!`
        },
        projects: `Here are some of Karthik's notable projects:\n\n${portfolioData.projects.map((p, i) => `${i + 1}. **${p.name}**\n   ${p.description}\n   Tech: ${p.tech.join(', ')}`).join('\n\n')}\n\nWant to know more about any specific project?`,
        experience: `💼 **Current Role:**\n${portfolioData.experience[0].role} at ${portfolioData.experience[0].company}\n(${portfolioData.experience[0].period})\n\n${portfolioData.experience[0].description}\n\nKarthik brings a unique combination of full-stack development and ML expertise!`,
        contact: `📬 **Let's Connect!**\n\n📧 Email: ${portfolioData.email}\n📱 Phone: ${portfolioData.phone}\n💼 LinkedIn: linkedin.com/in/karthik-m\n🐙 GitHub: github.com/Karthik77-kk\n📍 Location: ${portfolioData.location}\n\nFeel free to reach out for collaborations or opportunities!`,
        education: `🎓 **Education:**\n\n${portfolioData.education.degree}\n${portfolioData.education.college}\nGraduated: ${portfolioData.education.year}\n\nKarthik combines strong academic foundations with practical industry experience!`,
        certifications: `🏆 **Certifications:**\n\n${portfolioData.certifications.map(c => `✅ ${c}`).join('\n')}\n\nContinuous learning is key to staying current in tech!`,
        hire: `🎯 **Why Hire Karthik?**\n\n✅ Full Stack expertise (React, Node.js, Python)\n✅ Cloud & DevOps skills (AWS, Docker, K8s)\n✅ AI/ML capabilities for intelligent solutions\n✅ Strong problem-solving abilities\n✅ Quick learner & team player\n✅ 20+ professional certifications\n\n📧 Contact: ${portfolioData.email}\n\nLet's build something amazing together!`,
        resume: `📄 You can download Karthik's resume using the "Download Resume" button on the portfolio, or I can share the key highlights!\n\nWould you like to know about his:\n• Skills & expertise\n• Work experience\n• Projects\n• Certifications`,
        hobbies: `When not coding, Karthik enjoys:\n\n${portfolioData.hobbies.map(h => `• ${h}`).join('\n')}\n\nA balanced developer who stays curious and creative!`,
        fallback: [
            "That's interesting! While I may not have specific info on that, I can tell you about Karthik's skills, projects, experience, or how to contact him. What would you like to know?",
            "I'm specialized in Karthik's portfolio. Try asking about his skills, projects, experience, or certifications!",
            "Hmm, I'm not sure about that. But I'd love to tell you about Karthik's work! Ask me about his tech stack, projects, or how to hire him."
        ]
    };

    // Quick action suggestions
    const quickActions = [
        { text: "💻 Skills", query: "skills" },
        { text: "🚀 Projects", query: "projects" },
        { text: "💼 Experience", query: "experience" },
        { text: "📬 Contact", query: "contact" }
    ];

    // ==================== CHATBOT CLASS ====================
    class PortfolioChatbot {
        constructor() {
            this.isOpen = false;
            this.messageHistory = [];
            this.isTyping = false;
            this.init();
        }

        init() {
            this.createChatbotUI();
            this.bindEvents();
            this.showWelcomeMessage();
        }

        createChatbotUI() {
            // Create chatbot HTML structure
            const chatbotHTML = `
                <!-- Chatbot Trigger Button -->
                <button class="chatbot-trigger" id="chatbotTrigger" aria-label="Open AI Assistant">
                    <span class="bot-icon">🤖</span>
                </button>

                <!-- Chatbot Container -->
                <div class="chatbot-container" id="chatbotContainer" role="dialog" aria-label="AI Chat Assistant">
                    <!-- Header -->
                    <div class="chatbot-header">
                        <div class="chatbot-avatar">🤖</div>
                        <div class="chatbot-info">
                            <h3>Karthik's AI Assistant</h3>
                            <p><span class="status-dot"></span> Always online</p>
                        </div>
                        <button class="chatbot-close" id="chatbotClose" aria-label="Close chat">×</button>
                    </div>

                    <!-- Messages -->
                    <div class="chatbot-messages" id="chatbotMessages" aria-live="polite"></div>

                    <!-- Input -->
                    <div class="chatbot-input-container">
                        <textarea 
                            class="chatbot-input" 
                            id="chatbotInput" 
                            placeholder="Ask me anything about Karthik..."
                            rows="1"
                            aria-label="Type your message"
                        ></textarea>
                        <button class="chatbot-send" id="chatbotSend" aria-label="Send message">
                            ➤
                        </button>
                    </div>
                </div>
            `;

            // Insert into DOM
            const container = document.createElement('div');
            container.id = 'chatbotWrapper';
            container.innerHTML = chatbotHTML;
            document.body.appendChild(container);

            // Store references
            this.trigger = document.getElementById('chatbotTrigger');
            this.container = document.getElementById('chatbotContainer');
            this.messages = document.getElementById('chatbotMessages');
            this.input = document.getElementById('chatbotInput');
            this.sendBtn = document.getElementById('chatbotSend');
            this.closeBtn = document.getElementById('chatbotClose');
        }

        bindEvents() {
            // Toggle chatbot
            this.trigger.addEventListener('click', () => this.toggle());
            this.closeBtn.addEventListener('click', () => this.close());

            // Send message
            this.sendBtn.addEventListener('click', () => this.sendMessage());
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            // Auto-resize textarea
            this.input.addEventListener('input', () => {
                this.input.style.height = 'auto';
                this.input.style.height = Math.min(this.input.scrollHeight, 120) + 'px';
            });

            // Close on escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });

            // Quick actions delegation
            this.messages.addEventListener('click', (e) => {
                if (e.target.classList.contains('quick-action')) {
                    this.handleQuickAction(e.target.dataset.query);
                }
            });
        }

        toggle() {
            this.isOpen ? this.close() : this.open();
        }

        open() {
            this.isOpen = true;
            this.container.classList.add('open');
            this.trigger.classList.add('active');
            this.trigger.querySelector('.bot-icon').textContent = '✕';
            this.input.focus();
            
            // Track analytics
            if (typeof trackEvent === 'function') {
                trackEvent('chatbot_opened');
            }
        }

        close() {
            this.isOpen = false;
            this.container.classList.remove('open');
            this.trigger.classList.remove('active');
            this.trigger.querySelector('.bot-icon').textContent = '🤖';
        }

        showWelcomeMessage() {
            const greeting = responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
            
            setTimeout(() => {
                this.addMessage(greeting, 'bot');
                this.showQuickActions();
            }, 500);
        }

        showQuickActions() {
            const actionsHTML = `
                <div class="quick-actions">
                    ${quickActions.map(a => 
                        `<button class="quick-action" data-query="${a.query}">${a.text}</button>`
                    ).join('')}
                </div>
            `;
            
            const actionsEl = document.createElement('div');
            actionsEl.className = 'chat-message bot';
            actionsEl.innerHTML = actionsHTML;
            this.messages.appendChild(actionsEl);
            this.scrollToBottom();
        }

        handleQuickAction(query) {
            // Show user's selection
            this.addMessage(quickActions.find(a => a.query === query)?.text || query, 'user');
            
            // Generate response
            setTimeout(() => {
                this.showTypingIndicator();
                setTimeout(() => {
                    this.hideTypingIndicator();
                    const response = this.generateResponse(query);
                    this.addMessage(response, 'bot');
                }, 800 + Math.random() * 500);
            }, 300);
        }

        sendMessage() {
            const message = this.input.value.trim();
            if (!message || this.isTyping) return;

            // Add user message
            this.addMessage(message, 'user');
            this.input.value = '';
            this.input.style.height = 'auto';

            // Generate bot response
            this.showTypingIndicator();
            
            const responseDelay = 800 + Math.random() * 700;
            setTimeout(() => {
                this.hideTypingIndicator();
                const response = this.generateResponse(message);
                this.addMessage(response, 'bot');
            }, responseDelay);
        }

        addMessage(text, type) {
            const messageEl = document.createElement('div');
            messageEl.className = `chat-message ${type}`;
            messageEl.innerHTML = this.formatMessage(text);
            this.messages.appendChild(messageEl);
            this.scrollToBottom();
            
            this.messageHistory.push({ text, type, timestamp: Date.now() });
        }

        formatMessage(text) {
            // Convert markdown-style formatting
            return text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>');
        }

        showTypingIndicator() {
            this.isTyping = true;
            const typingEl = document.createElement('div');
            typingEl.className = 'typing-indicator';
            typingEl.id = 'typingIndicator';
            typingEl.innerHTML = '<span></span><span></span><span></span>';
            this.messages.appendChild(typingEl);
            this.scrollToBottom();
        }

        hideTypingIndicator() {
            this.isTyping = false;
            const typingEl = document.getElementById('typingIndicator');
            if (typingEl) typingEl.remove();
        }

        scrollToBottom() {
            this.messages.scrollTop = this.messages.scrollHeight;
        }

        generateResponse(input) {
            const query = input.toLowerCase();

            // Greetings
            if (/^(hi|hello|hey|greetings|howdy|yo)/.test(query)) {
                return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
            }

            // Skills
            if (/skill|tech|stack|know|expert|proficient|technology/.test(query)) {
                if (/front|react|vue|angular|css|html|ui/.test(query)) {
                    return responses.skills.frontend;
                }
                if (/back|node|python|api|server|django|flask/.test(query)) {
                    return responses.skills.backend;
                }
                if (/cloud|aws|azure|docker|devops|deploy/.test(query)) {
                    return responses.skills.cloud;
                }
                if (/ml|machine|learn|ai|artificial|data|tensor|vision/.test(query)) {
                    return responses.skills.ml;
                }
                return responses.skills.general;
            }

            // Projects
            if (/project|portfolio|work|built|create|develop/.test(query)) {
                return responses.projects;
            }

            // Experience
            if (/experience|job|work|company|role|career|employ/.test(query)) {
                return responses.experience;
            }

            // Contact
            if (/contact|email|phone|reach|message|connect|linkedin|github|social/.test(query)) {
                return responses.contact;
            }

            // Education
            if (/education|study|degree|college|university|school|academic/.test(query)) {
                return responses.education;
            }

            // Certifications
            if (/certif|course|certificate|learn|credential/.test(query)) {
                return responses.certifications;
            }

            // Hire
            if (/hire|recruit|job|opportunity|work with|collaborate|freelance|consult/.test(query)) {
                return responses.hire;
            }

            // Resume
            if (/resume|cv|download|pdf/.test(query)) {
                return responses.resume;
            }

            // About/Who
            if (/who|about|tell me|introduce|yourself/.test(query)) {
                return `👋 Karthik M is a passionate **Full Stack Developer** currently working at **${portfolioData.company}** in ${portfolioData.location}.\n\nHe specializes in building end-to-end web applications with modern technologies like React, Node.js, Python, and cloud services.\n\nWith expertise in both development and AI/ML, he creates intelligent, scalable solutions!\n\nWant to know about his skills, projects, or how to contact him?`;
            }

            // Hobbies/Personal
            if (/hobby|hobbies|free time|interest|personal|fun/.test(query)) {
                return responses.hobbies;
            }

            // Location
            if (/where|location|based|live|city/.test(query)) {
                return `📍 Karthik is based in **${portfolioData.location}**.\n\nHe's open to remote opportunities and collaborations worldwide! Feel free to reach out at ${portfolioData.email}`;
            }

            // Thank you
            if (/thank|thanks|appreciate/.test(query)) {
                return "You're welcome! 😊 Is there anything else you'd like to know about Karthik's work?";
            }

            // Bye
            if (/bye|goodbye|see you|later/.test(query)) {
                return "Goodbye! 👋 Thanks for visiting Karthik's portfolio. Feel free to reach out if you have any questions!";
            }

            // Fallback
            return responses.fallback[Math.floor(Math.random() * responses.fallback.length)];
        }
    }

    // ==================== INITIALIZE ====================
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.portfolioChatbot = new PortfolioChatbot();
        });
    } else {
        window.portfolioChatbot = new PortfolioChatbot();
    }

})();
