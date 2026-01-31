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
        role: "Software Developer",
        company: "Eurofins IT Solutions India Pvt Ltd",
        previousCompany: "Accenture",
        email: "iammrkarthik2002@gmail.com",
        phone: "+917019880061",
        location: "Bangalore, India",
        github: "https://github.com/Karthik77-kk",
        linkedin: "https://linkedin.com/in/karthik-m-9262a02b4",
        skills: {
            dotnet: [".NET Core", "ASP.NET MVC", "ASP.NET Web API", "Entity Framework", "C#", "LINQ"],
            frontend: ["Angular", "React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
            backend: ["C#", "Python", "Node.js", "REST APIs", "Microservices"],
            database: ["SQL Server", "MySQL", "MongoDB", "Redis", "Azure SQL"],
            cloud: ["Azure", "AWS", "Docker", "Azure DevOps", "CI/CD"],
            tools: ["Visual Studio", "Git", "Jira", "Postman", "xUnit/NUnit", "Agile/Scrum"]
        },
        experience: [
            {
                role: "Software Developer",
                company: "Eurofins IT Solutions India Pvt Ltd",
                period: "Present",
                description: "Enterprise software development with focus on scalable architecture and best practices"
            },
            {
                role: ".NET Full Stack Developer / Software Engineer",
                company: "Accenture",
                period: "Nov 2022 - Nov 2025",
                description: "Built enterprise shopping and healthcare web applications using .NET Core, ASP.NET MVC, C#, and Angular"
            }
        ],
        projects: [
            {
                name: "E-Commerce Shopping Platform",
                tech: [".NET Core", "Angular", "SQL Server", "Azure"],
                description: "Enterprise shopping platform with payment integration and inventory management"
            },
            {
                name: "Healthcare Management System",
                tech: ["ASP.NET MVC", "C#", "Entity Framework", "Azure"],
                description: "Patient data management system with HIPAA compliance and reporting"
            },
            {
                name: "API Gateway & Microservices",
                tech: [".NET Core", "Docker", "Azure DevOps", "Redis"],
                description: "Scalable microservices architecture for enterprise applications"
            }
        ],
        certifications: [
            "AWS Certified Cloud Practitioner",
            "Azure Fundamentals",
            "MongoDB Developer",
            ".NET Developer Certificate"
        ],
        education: {
            degree: "BCA (Bachelor of Computer Applications)",
            college: "RNS First Grade College, Bangalore University",
            year: "2023"
        },
        hobbies: ["Coding", "Gaming", "Reading Tech Blogs", "Open Source Contribution"]
    };

    // ==================== RESPONSE TEMPLATES ====================
    const responses = {
        greeting: [
            "Hey there! 👋 I'm Karthik's AI assistant. How can I help you learn more about his work?",
            "Hello! Welcome to Karthik's portfolio. I can tell you about his skills, projects, or how to get in touch!",
            "Hi! 🚀 Great to meet you! Ask me anything about Karthik's experience as a Software Developer."
        ],
        skills: {
            general: `Karthik is a versatile Full Stack Developer with expertise in:\n\n🔷 **.NET:** ${portfolioData.skills.dotnet.slice(0, 4).join(', ')}\n\n🎨 **Frontend:** ${portfolioData.skills.frontend.slice(0, 4).join(', ')}\n\n☁️ **Cloud & DevOps:** ${portfolioData.skills.cloud.slice(0, 4).join(', ')}\n\n🗄️ **Database:** ${portfolioData.skills.database.slice(0, 4).join(', ')}\n\nWant to know more about any specific area?`,
            dotnet: `For .NET development, Karthik works with:\n\n${portfolioData.skills.dotnet.map(s => `• ${s}`).join('\n')}\n\nHe builds enterprise applications with .NET Core and ASP.NET!`,
            frontend: `On the frontend side, Karthik is proficient in:\n\n${portfolioData.skills.frontend.map(s => `• ${s}`).join('\n')}\n\nAngular and React for building modern web interfaces!`,
            cloud: `Karthik's cloud & DevOps skills include:\n\n${portfolioData.skills.cloud.map(s => `• ${s}`).join('\n')}\n\nHe can architect and deploy scalable cloud solutions!`,
            database: `For database work, Karthik uses:\n\n${portfolioData.skills.database.map(s => `• ${s}`).join('\n')}\n\nFrom SQL Server to MongoDB, he's got it covered!`
        },
        projects: `Here are some of Karthik's notable projects:\n\n${portfolioData.projects.map((p, i) => `${i + 1}. **${p.name}**\n   ${p.description}\n   Tech: ${p.tech.join(', ')}`).join('\n\n')}\n\nWant to know more about any specific project?`,
        experience: `💼 **Current Role:**\n${portfolioData.experience[0].role} at ${portfolioData.experience[0].company}\n(${portfolioData.experience[0].period})\n\n${portfolioData.experience[0].description}\n\n💼 **Previous Role:**\n${portfolioData.experience[1].role} at ${portfolioData.experience[1].company}\n(${portfolioData.experience[1].period})\n\n${portfolioData.experience[1].description}`,
        contact: `📬 **Let's Connect!**\n\n📧 Email: ${portfolioData.email}\n📱 Phone: ${portfolioData.phone}\n💼 LinkedIn: linkedin.com/in/karthik-m\n🐙 GitHub: github.com/Karthik77-kk\n📍 Location: ${portfolioData.location}\n\nFeel free to reach out for collaborations or opportunities!`,
        education: `🎓 **Education:**\n\n${portfolioData.education.degree}\n${portfolioData.education.college}\nGraduated: ${portfolioData.education.year}\n\nKarthik combines strong academic foundations with 3+ years of industry experience!`,
        certifications: `🏆 **Certifications:**\n\n${portfolioData.certifications.map(c => `✅ ${c}`).join('\n')}\n\nContinuous learning is key to staying current in tech!`,
        hire: `🎯 **Why Hire Karthik?**\n\n✅ 3+ years .NET Full Stack experience at Accenture\n✅ Currently at Eurofins IT Solutions\n✅ Enterprise e-commerce & healthcare projects\n✅ Cloud & DevOps skills (Azure, Docker)\n✅ Strong problem-solving abilities\n✅ Quick learner & team player\n\n📧 Contact: ${portfolioData.email}\n\nLet's build something amazing together!`,
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

            // Generate bot response - try Gemini first, fallback to local
            this.showTypingIndicator();
            
            this.getGeminiResponse(message).then(response => {
                this.hideTypingIndicator();
                this.addMessage(response, 'bot');
            }).catch(() => {
                this.hideTypingIndicator();
                const response = this.generateResponse(message);
                this.addMessage(response, 'bot');
            });
        }

        async getGeminiResponse(userMessage) {
            // Note: For GitHub Pages static hosting, the API key is included client-side.
            // For production deployment, consider using a backend proxy or serverless function.
            const GEMINI_API_KEY = 'AIzaSyA2bt3kPtC2OEO-r5Rmi9J5SpB9jj92TcE';
            const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;
            
            const context = `You are Karthik M's AI portfolio assistant. Here's information about Karthik:
            - Current Role: Software Developer at Eurofins IT Solutions India Pvt Ltd
            - Previous: .NET Full Stack Developer at Accenture (Nov 2022 - Nov 2025, 3 years)
            - Projects at Accenture: E-commerce shopping platforms and Healthcare management systems
            - Education: BCA from RNS First Grade College, Bangalore University (2020-2023)
            - Skills: C#, .NET Core, ASP.NET MVC, Angular, React, SQL Server, Azure, Docker, Entity Framework
            - Location: Bangalore, India
            - Email: iammrkarthik2002@gmail.com
            - Phone: +917019880061
            - GitHub: github.com/Karthik77-kk
            - LinkedIn: linkedin.com/in/karthik-m-9262a02b4
            
            Respond helpfully about Karthik's portfolio, skills, and experience. Keep responses concise and friendly. Use emojis where appropriate.`;
            
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `${context}\n\nUser question: ${userMessage}`
                            }]
                        }],
                        generationConfig: {
                            temperature: 0.7,
                            topK: 40,
                            topP: 0.95,
                            maxOutputTokens: 500
                        }
                    })
                });
                
                if (!response.ok) {
                    throw new Error('Gemini API error');
                }
                
                const data = await response.json();
                if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
                    return data.candidates[0].content.parts[0].text;
                }
                throw new Error('Invalid response format');
            } catch (error) {
                console.warn('Gemini API fallback:', error);
                throw error; // Fall back to local response
            }
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
                if (/\.net|dotnet|csharp|c#|asp\.net|entity/.test(query)) {
                    return responses.skills.dotnet;
                }
                if (/front|react|angular|css|html|ui|typescript/.test(query)) {
                    return responses.skills.frontend;
                }
                if (/cloud|aws|azure|docker|devops|deploy/.test(query)) {
                    return responses.skills.cloud;
                }
                if (/database|sql|mongo|redis/.test(query)) {
                    return responses.skills.database;
                }
                return responses.skills.general;
            }

            // Projects
            if (/project|portfolio|work|built|create|develop/.test(query)) {
                return responses.projects;
            }

            // Experience
            if (/experience|job|work|company|role|career|employ|accenture|eurofins/.test(query)) {
                return responses.experience;
            }

            // Contact
            if (/contact|email|phone|reach|message|connect|linkedin|github|social/.test(query)) {
                return responses.contact;
            }

            // Education
            if (/education|study|degree|college|university|school|academic|bca/.test(query)) {
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
                return `👋 Karthik M is a passionate **Software Developer** currently working at **${portfolioData.company}** in ${portfolioData.location}.\n\nWith 3+ years of experience as a .NET Full Stack Developer at Accenture, he specializes in building enterprise web applications for e-commerce and healthcare domains.\n\nExpert in C#, ASP.NET Core, Angular, SQL Server, and Azure!\n\nWant to know about his skills, projects, or how to contact him?`;
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
