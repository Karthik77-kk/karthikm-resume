/**
 * Portfolio Features & Initialization
 * Version 4.1.0
 * Requires: utils.js
 */

// ==================== GITHUB STATS WIDGET ====================
function initGitHubStats() {
    const username = 'Karthik77-kk';
    const statsContainer = document.getElementById('githubStats');
    
    if (!statsContainer) return;
    
    // Show loading state
    statsContainer.innerHTML = '<div class="github-stats-loading">Loading GitHub stats...</div>';
    
    try {
        statsContainer.innerHTML = `
            <div class="github-stats-widget">
                <div class="github-stats-card">
                    <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical&hide_border=true&bg_color=0a0a0a&title_color=00ffff&icon_color=ff00ff&text_color=ffffff" 
                         alt="GitHub Stats" 
                         loading="lazy"
                         onerror="this.parentElement.innerHTML='<p style=color:var(--text-muted)>Stats unavailable</p>'">
                </div>
                <div class="github-stats-card">
                    <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=radical&hide_border=true&bg_color=0a0a0a&title_color=00ffff&text_color=ffffff" 
                         alt="Top Languages" 
                         loading="lazy"
                         onerror="this.parentElement.innerHTML='<p style=color:var(--text-muted)>Languages unavailable</p>'">
                </div>
                <div class="github-stats-card">
                    <img src="https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=radical&hide_border=true&background=0a0a0a&ring=00ffff&fire=ff00ff&currStreakLabel=00ffff" 
                         alt="GitHub Streak" 
                         loading="lazy"
                         onerror="this.parentElement.innerHTML='<p style=color:var(--text-muted)>Streak unavailable</p>'">
                </div>
            </div>
        `;
        trackEvent('github_stats_loaded', { username });
    } catch (error) {
        statsContainer.innerHTML = '<p style="color: var(--text-muted); text-align: center;">GitHub stats temporarily unavailable</p>';
        console.error('GitHub stats error:', error);
    }
}

// ==================== VISITOR COUNTER ====================
function initVisitorCounter() {
    const counterContainer = document.getElementById('visitorCounter');
    
    if (!counterContainer) return;
    
    const repoPath = 'Karthik77-kk/karthikm-resume';
    counterContainer.innerHTML = `
        <div class="visitor-counter">
            <span>???</span>
            <img src="https://visitor-badge.laobi.icu/badge?page_id=${repoPath}" 
                 alt="Visitor count" 
                 loading="lazy"
                 onerror="this.parentElement.innerHTML='<span style=\\'color:var(--text-muted)\\'>Visitor tracking unavailable</span>'">
        </div>
    `;
}

// ==================== SOCIAL SHARE BUTTONS ====================
function initSocialShare() {
    const shareContainer = document.getElementById('socialShare');
    
    if (!shareContainer) return;
    
    const url = window.location.href;
    const title = 'Check out Karthik M\'s Portfolio - Software Developer | AI & ML Expert';
    const text = 'Impressive portfolio showcasing Python, ML, AWS projects and more!';
    
    shareContainer.innerHTML = `
        <div class="social-share-container">
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" class="share-btn linkedin" target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
                ?? Share Portfolio
            </a>
            <a href="https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}" class="share-btn whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
                ?? Share on WhatsApp
            </a>
        </div>
    `;
    
    trackEvent('social_share_initialized');
}

function copyPortfolioLink() {
    copyToClipboard(window.location.href, 'Portfolio link copied! ??');
    trackEvent('share', { method: 'copy_link', content_type: 'portfolio' });
}

// ==================== OPEN TO WORK BADGE ====================
function initOpenToWorkBadge() {
    const badgeContainer = document.getElementById('openToWorkBadge');
    
    if (!badgeContainer) return;
    
    // Set this to true/false based on availability
    const isOpenToWork = true;
    
    if (isOpenToWork) {
        badgeContainer.innerHTML = `
            <div class="open-to-work-badge">
                <span>Open to Work</span>
            </div>
        `;
    }
}

// ==================== COPY EMAIL BUTTON ====================
function initCopyEmailButton() {
    const email = 'iammrkarthik2002@gmail.com';
    const copyBtns = document.querySelectorAll('.copy-email-btn');
    
    copyBtns.forEach(btn => {
        // Prevent multiple listeners
        if (btn.dataset.listenerAdded) return;
        btn.dataset.listenerAdded = 'true';
        
        btn.addEventListener('click', async function() {
            const success = await copyToClipboard(email, 'Email copied! ??');
            
            if (success) {
                this.classList.add('copied');
                this.innerHTML = '? Copied!';
                
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.innerHTML = '?? Copy Email';
                }, 2000);
            }
            
            trackEvent('copy_email', { method: 'button' });
        });
    });
}

// ==================== LAST UPDATED DISPLAY ====================
function initLastUpdated() {
    const containers = document.querySelectorAll('.last-updated-container');
    const lastUpdated = 'January 2025';
    
    containers.forEach(container => {
        container.innerHTML = `
            <div class="last-updated">
                <span>??</span>
                <span>Last updated: ${lastUpdated}</span>
            </div>
        `;
    });
}

// ==================== DAILY STREAK DISPLAY ====================
function initStreakDisplay() {
    const streakContainer = document.getElementById('streakDisplay');
    
    if (!streakContainer) return;
    
    const streak = updateDailyStreak();
    
    if (streak > 0) {
        streakContainer.innerHTML = `
            <div class="streak-display">
                <span class="streak-fire">??</span>
                <span>${streak} day${streak > 1 ? 's' : ''} streak!</span>
            </div>
        `;
    }
}

// ==================== TIME SPENT TRACKER ====================
function initTimeSpentDisplay() {
    const timeContainer = document.getElementById('timeSpentDisplay');
    
    if (!timeContainer) return;
    
    initTimeSpentTracker();
    
    function updateDisplay() {
        const timeSpent = getTimeSpentDisplay();
        timeContainer.innerHTML = `
            <div class="time-spent-display">
                <span>??</span>
                <span>Time spent: ${timeSpent}</span>
            </div>
        `;
    }
    
    updateDisplay();
    setInterval(updateDisplay, 10000); // Update every 10 seconds
}

// ==================== PLAYER PROFILE CARD ====================
function initPlayerProfileCard() {
    const xpDisplay = document.getElementById('xpDisplay');
    
    if (!xpDisplay) return;
    
    // Check if card already exists
    if (xpDisplay.querySelector('.player-profile-card')) return;
    
    xpDisplay.classList.add('player-profile-trigger');
    
    const playerLevel = parseInt(safeGetItem('portfolioLevel', '1')) || 1;
    const playerXP = parseInt(safeGetItem('portfolioXP', '0')) || 0;
    const achievements = safeGetJSON('portfolioAchievements', []);
    const highScore = parseInt(safeGetItem('spaceDefenderHighScore', '0')) || 0;
    
    const profileCard = document.createElement('div');
    profileCard.className = 'player-profile-card';
    
    // Safely get achievements with CONFIG check
    let badgesHTML = '';
    if (achievements.length > 0 && typeof window.CONFIG !== 'undefined' && window.CONFIG.achievements) {
        const badgesList = achievements.slice(0, 8).map(id => {
            const ach = window.CONFIG.achievements[id];
            return ach ? `<span class="profile-badge" title="${ach.name}">${ach.badge}</span>` : '';
        }).filter(b => b).join('');
        
        badgesHTML = `
            <div class="profile-badges">
                ${badgesList}
                ${achievements.length > 8 ? `<span class="profile-badge">+${achievements.length - 8}</span>` : ''}
            </div>
        `;
    }
    
    profileCard.innerHTML = `
        <div class="profile-header">
            <div class="profile-avatar">??</div>
            <div class="profile-info">
                <h4>Player Stats</h4>
                <p>Portfolio Explorer</p>
            </div>
        </div>
        <div class="profile-stats">
            <div class="profile-stat">
                <div class="profile-stat-value">${playerLevel}</div>
                <div class="profile-stat-label">Level</div>
            </div>
            <div class="profile-stat">
                <div class="profile-stat-value">${playerXP}</div>
                <div class="profile-stat-label">XP</div>
            </div>
            <div class="profile-stat">
                <div class="profile-stat-value">${achievements.length}</div>
                <div class="profile-stat-label">Badges</div>
            </div>
        </div>
        ${badgesHTML}
        <div style="margin-top: 1rem; text-align: center; font-size: 0.8rem; color: var(--text-muted);">
            ?? High Score: ${highScore}
        </div>
    `;
    
    xpDisplay.appendChild(profileCard);
}

// ==================== FLOATING ACTION BUTTON ====================
function initFloatingActionButton() {
    // Check if FAB already exists
    if (document.getElementById('fabContainer')) return;
    
    const fabHTML = `
        <div class="fab-container" id="fabContainer">
            <button class="fab-main" id="fabMain" aria-label="Quick actions">
                +
            </button>
            <div class="fab-actions">
                <a href="#" class="fab-action" onclick="scrollToTop(); return false;" title="Scroll to top">
                    ?
                </a>
                <a href="mailto:iammrkarthik2002@gmail.com" class="fab-action" title="Send email">
                    ??
                </a>
                <button class="fab-action" onclick="generateResumePDF()" title="Download resume">
                    ??
                </button>
                <a href="#contact" class="fab-action" title="Contact">
                    ??
                </a>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', fabHTML);
    
    const fabMain = document.getElementById('fabMain');
    const fabContainer = document.getElementById('fabContainer');
    
    fabMain.addEventListener('click', () => {
        fabContainer.classList.toggle('open');
        fabMain.classList.toggle('open');
    });
    
    // Close FAB when clicking outside
    document.addEventListener('click', (e) => {
        if (!fabContainer.contains(e.target)) {
            fabContainer.classList.remove('open');
            fabMain.classList.remove('open');
        }
    });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof addXP === 'function') addXP(5, 'Navigation');
}

// ==================== MOBILE BOTTOM NAVIGATION ====================
function initMobileBottomNav() {
    function createMobileNav() {
        if (window.innerWidth > 768) {
            // Remove mobile nav on desktop
            const existing = document.querySelector('.mobile-bottom-nav');
            if (existing) existing.remove();
            return;
        }
        
        // Remove existing mobile nav if present
        const existing = document.querySelector('.mobile-bottom-nav');
        if (existing) existing.remove();
        
        const navHTML = `
            <nav class="mobile-bottom-nav" role="navigation" aria-label="Mobile navigation">
                <a href="#about" class="mobile-nav-item">
                    <span class="icon">??</span>
                    <span>About</span>
                </a>
                <a href="#skills" class="mobile-nav-item">
                    <span class="icon">??</span>
                    <span>Skills</span>
                </a>
                <a href="#projects" class="mobile-nav-item">
                    <span class="icon">??</span>
                    <span>Projects</span>
                </a>
                <a href="#contact" class="mobile-nav-item">
                    <span class="icon">??</span>
                    <span>Contact</span>
                </a>
            </nav>
        `;
        
        document.body.insertAdjacentHTML('beforeend', navHTML);
        
        // Update active state on scroll
        const navItems = document.querySelectorAll('.mobile-nav-item');
        const sections = ['about', 'skills', 'projects', 'contact'];
        
        function updateActiveNav() {
            let currentSection = sections[0];
            
            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        currentSection = sectionId;
                    }
                }
            });
            
            navItems.forEach(item => {
                const href = item.getAttribute('href').substring(1);
                item.classList.toggle('active', href === currentSection);
            });
        }
        
        window.addEventListener('scroll', throttle(updateActiveNav, 200));
        updateActiveNav();
    }
    
    // Initial creation
    createMobileNav();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(createMobileNav, 250);
    });
}

// ==================== FONT SIZE CONTROLS ====================
function initFontSizeControlsUI() {
    const controlsContainer = document.getElementById('fontSizeControls');
    
    if (!controlsContainer) return;
    
    const fontControls = initFontSizeControls();
    
    controlsContainer.innerHTML = `
        <div class="font-size-controls">
            <button class="font-size-btn" id="fontDecrease" aria-label="Decrease font size">A-</button>
            <button class="font-size-btn" id="fontReset" aria-label="Reset font size">A</button>
            <button class="font-size-btn" id="fontIncrease" aria-label="Increase font size">A+</button>
        </div>
    `;
    
    document.getElementById('fontDecrease').addEventListener('click', () => {
        fontControls.decrease();
        showNotification('Font size decreased', 'info', 2000);
    });
    
    document.getElementById('fontIncrease').addEventListener('click', () => {
        fontControls.increase();
        showNotification('Font size increased', 'info', 2000);
    });
    
    document.getElementById('fontReset').addEventListener('click', () => {
        fontControls.reset();
        showNotification('Font size reset to default', 'info', 2000);
    });
}

// ==================== HIGH CONTRAST MODE ====================
function initHighContrastToggle() {
    const toggleBtn = document.getElementById('highContrastToggle');
    
    if (!toggleBtn) return;
    
    const currentMode = safeGetItem('highContrast', 'false');
    document.documentElement.setAttribute('data-high-contrast', currentMode);
    
    toggleBtn.addEventListener('click', () => {
        const isHighContrast = document.documentElement.getAttribute('data-high-contrast') === 'true';
        const newMode = (!isHighContrast).toString();
        
        document.documentElement.setAttribute('data-high-contrast', newMode);
        safeSetItem('highContrast', newMode);
        
        showNotification(
            newMode === 'true' ? 'High contrast mode enabled' : 'High contrast mode disabled',
            'info',
            2000
        );
    });
}

// ==================== QR CODE FOR CONTACT ====================
function showQRCode() {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Karthik M
EMAIL:iammrkarthik2002@gmail.com
TEL:+917019880061
URL:https://karthik77-kk.github.io/karthikm-resume/
END:VCARD`;
    
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="this.parentElement.remove()"></div>
        <div class="modal-content glass-card-strong" style="max-width: 400px;">
            <button class="modal-close" onclick="this.closest('.modal').remove()">?</button>
            <div class="modal-body qr-code-container">
                <h2>?? Scan to Connect</h2>
                ${generateQRCodeSVG(vCardData, 200)}
                <p>Scan with your phone to save contact</p>
                <p style="font-size: 0.8rem; margin-top: 1rem;">
                    Or visit: <a href="${window.location.href}" style="color: var(--primary);">
                        ${window.location.hostname}
                    </a>
                </p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    trackEvent('qr_code_shown');
}

// ==================== READING TIME FOR PROJECT MODALS ====================
function addReadingTimeToModals() {
    const modalBody = document.querySelector('#projectModal .modal-body');
    
    if (!modalBody) return;
    
    // This will be called when modal content changes
    const observer = new MutationObserver(() => {
        const textContent = modalBody.innerText;
        const readingTime = calculateReadingTime(textContent);
        
        let readingTimeEl = modalBody.querySelector('.reading-time');
        
        if (!readingTimeEl) {
            readingTimeEl = document.createElement('div');
            readingTimeEl.className = 'reading-time';
            const title = modalBody.querySelector('h2');
            if (title) {
                title.insertAdjacentElement('afterend', readingTimeEl);
            }
        }
        
        readingTimeEl.innerHTML = `?? ${readingTime}`;
    });
    
    observer.observe(modalBody, { childList: true, subtree: true });
}

// ==================== SECTION SCROLL PROGRESS ====================
function initSectionScrollProgress() {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const progress = document.createElement('div');
        progress.className = 'section-progress';
        section.style.position = 'relative';
        section.insertBefore(progress, section.firstChild);
    });
    
    function updateSectionProgress() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionTop = rect.top;
            const sectionHeight = rect.height;
            const windowHeight = window.innerHeight;
            
            let percentage = 0;
            
            if (sectionTop < windowHeight && sectionTop + sectionHeight > 0) {
                if (sectionTop < 0) {
                    const visibleHeight = Math.min(sectionHeight + sectionTop, windowHeight);
                    percentage = (Math.abs(sectionTop) / sectionHeight) * 100;
                } else {
                    percentage = ((windowHeight - sectionTop) / windowHeight) * 100;
                }
            }
            
            percentage = Math.min(Math.max(percentage, 0), 100);
            
            const progressBar = section.querySelector('.section-progress');
            if (progressBar) {
                progressBar.style.width = percentage + '%';
            }
        });
    }
    
    window.addEventListener('scroll', throttle(updateSectionProgress, 50));
    updateSectionProgress();
}

// ==================== CONFETTI ON ACHIEVEMENT ====================
function enhanceAchievementDisplay() {
    // Override the original showAchievement if it exists
    if (typeof window.showAchievement === 'function') {
        const originalShowAchievement = window.showAchievement;
        
        window.showAchievement = function(badge, name, xp) {
            originalShowAchievement(badge, name, xp);
            createConfetti(30);
        };
    }
}

// ==================== FAQ ACCORDION ====================
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('open');
            });
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('open');
                trackEvent('faq_opened', { question: question.textContent });
            }
        });
    });
}

// ==================== LAZY LOAD IMAGES ====================
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// ==================== CERTIFICATION VERIFICATION LINKS ====================
function addCertificationLinks() {
    const certCards = document.querySelectorAll('.cert-card');
    
    // Sample verification URLs - update with actual links
    const certLinks = {
        'AWS Cloud Practitioner': 'https://www.credly.com/badges/your-badge-id',
        'Machine Learning': '#',
        'Google UX Design': '#'
    };
    
    certCards.forEach(card => {
        const title = card.querySelector('h4')?.textContent;
        const link = certLinks[title];
        
        if (link && link !== '#') {
            const verifyBtn = document.createElement('a');
            verifyBtn.href = link;
            verifyBtn.target = '_blank';
            verifyBtn.rel = 'noopener noreferrer';
            verifyBtn.className = 'cert-verify-btn';
            verifyBtn.innerHTML = '? Verify';
            verifyBtn.style.cssText = `
                display: inline-block;
                margin-top: 0.5rem;
                padding: 0.3rem 0.8rem;
                background: var(--success);
                color: var(--dark);
                border-radius: 15px;
                font-size: 0.75rem;
                text-decoration: none;
                font-weight: 600;
            `;
            card.appendChild(verifyBtn);
        }
    });
}

// ==================== SWIPE GESTURES (Mobile) ====================
function initSwipeGestures() {
    if (window.innerWidth > 768) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    const sections = ['about', 'skills', 'projects', 'contact'];
    let currentSectionIndex = 0;
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentSectionIndex < sections.length - 1) {
                // Swipe left - next section
                currentSectionIndex++;
            } else if (diff < 0 && currentSectionIndex > 0) {
                // Swipe right - previous section
                currentSectionIndex--;
            }
            
            const targetSection = document.getElementById(sections[currentSectionIndex]);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                if (typeof addXP === 'function') addXP(3, 'Swipe navigation');
            }
        }
    }
    
    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

// ==================== MAIN INITIALIZATION ====================
function initAllPortfolioFeatures() {
    console.log('?? Initializing portfolio features v4.1.0');
    
    // Quick wins
    initGitHubStats();
    initVisitorCounter();
    initSocialShare();
    initOpenToWorkBadge();
    initCopyEmailButton();
    initLastUpdated();
    initStreakDisplay();
    initTimeSpentDisplay();
    
    // UI/UX
    initFloatingActionButton();
    initMobileBottomNav();
    initFontSizeControlsUI();
    initHighContrastToggle();
    initSectionScrollProgress();
    initPlayerProfileCard();
    
    // Features
    addReadingTimeToModals();
    enhanceAchievementDisplay();
    initFAQAccordion();
    initLazyLoading();
    addCertificationLinks();
    initSwipeGestures();
    
    // Track initialization
    trackEvent('portfolio_features_initialized', {
        version: '4.1.0',
        features_count: 20
    });
    
    console.log('? Portfolio features initialized');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllPortfolioFeatures);
} else {
    initAllPortfolioFeatures();
}

// Export for global access
window.portfolioFeatures = {
    initGitHubStats,
    initVisitorCounter,
    initSocialShare,
    copyPortfolioLink,
    showQRCode,
    scrollToTop,
    initAllPortfolioFeatures
};
