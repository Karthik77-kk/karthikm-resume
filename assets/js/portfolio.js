/**
* Portfolio Features & Initialization
* Version 4.2.0
* Requires: utils.js
*/

// ==================== CLIPBOARD UTILITY ====================
async function copyToClipboard(text, successMessage = 'Copied!') {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            if (typeof showNotification === 'function') {
                showNotification(successMessage, 'success');
            }
            return true;
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            if (typeof showNotification === 'function') {
                showNotification(successMessage, 'success');
            }
            return true;
        }
    } catch (err) {
        console.error('Copy failed:', err);
        if (typeof showNotification === 'function') {
            showNotification('Failed to copy', 'error');
        }
        return false;
    }
}

// ==================== GITHUB STATS WIDGET ====================
function initGitHubStats() {
    const username = 'Karthik77-kk';
    const statsContainer = document.getElementById('githubStats');

    if (!statsContainer) return;

    // Show skeleton loading state
    statsContainer.innerHTML = `
        <div class="github-stats-skeleton" aria-label="Loading GitHub statistics">
            <div class="skeleton-stat-card"></div>
            <div class="skeleton-stat-card"></div>
        </div>
        <p class="github-stats-loading">Loading GitHub stats...</p>
    `;

    // Load actual content after brief delay for skeleton visibility
    setTimeout(() => {
        try {
            // Only show the two reliable stat cards (stats and languages)
            // Removed streak stats due to API reliability issues
            statsContainer.innerHTML = `
                <div class="github-stats-widget" role="region" aria-label="GitHub Statistics">
                    <div class="github-stats-card">
                        <img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=radical&hide_border=true&bg_color=0a0a0a&title_color=00ffff&icon_color=ff00ff&text_color=ffffff&count_private=true" 
                             alt="GitHub Stats for ${username}" 
                             loading="lazy"
                             onerror="this.parentElement.innerHTML='<div class=\\'error-state\\'><p style=\\'color:var(--text-muted);text-align:center;padding:2rem\\'>Stats temporarily unavailable</p></div>'">
                    </div>
                    <div class="github-stats-card">
                        <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=radical&hide_border=true&bg_color=0a0a0a&title_color=00ffff&text_color=ffffff&langs_count=8" 
                             alt="Top Languages for ${username}" 
                             loading="lazy"
                             onerror="this.parentElement.innerHTML='<div class=\\'error-state\\'><p style=\\'color:var(--text-muted);text-align:center;padding:2rem\\'>Languages unavailable</p></div>'">
                    </div>
                </div>
            `;
            trackEvent('github_stats_loaded', { username });
        } catch (error) {
            statsContainer.innerHTML = `
                <div class="error-state" style="text-align: center; padding: 2rem;">
                    <p style="color: var(--text-muted);">GitHub stats temporarily unavailable</p>
                </div>
            `;
            console.error('GitHub stats error:', error);
        }
    }, 500);
}

// ==================== VISITOR COUNTER ====================
function initVisitorCounter() {
    const counterContainer = document.getElementById('visitorCounter');

    if (!counterContainer) return;

    const repoPath = 'Karthik77-kk/karthikm-resume';
    counterContainer.innerHTML = `
        <div class="visitor-counter" role="status" aria-label="Visitor count">
            <i class="fas fa-eye"></i>
            <img src="https://visitor-badge.laobi.icu/badge?page_id=${repoPath}" 
                 alt="Visitor count" 
                 loading="lazy"
                 onerror="this.onerror=null; this.parentElement.innerHTML='<span style=\'color:var(--text-muted)\'><i class=\'fas fa-eye-slash\'></i> Visitor tracking unavailable</span>'">
        </div>
    `;
}

// ==================== SOCIAL SHARE BUTTONS ====================
function initSocialShare() {
    const shareContainer = document.getElementById('socialShare');

    if (!shareContainer) return;

    const url = window.location.href;
    const text = 'Check out this impressive portfolio showcasing Python, ML, AWS projects!';

    shareContainer.innerHTML = `
        <div class="social-share-container">
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" 
               class="share-btn linkedin" 
               target="_blank" 
               rel="noopener noreferrer" 
               aria-label="Share on LinkedIn">
                Share on LinkedIn
            </a>
            <a href="https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}" 
               class="share-btn whatsapp" 
               target="_blank" 
               rel="noopener noreferrer" 
               aria-label="Share on WhatsApp">
                Share on WhatsApp
            </a>
        </div>
    `;

    trackEvent('social_share_initialized');
}

function copyPortfolioLink() {
    copyToClipboard(window.location.href, 'Portfolio link copied! ✓');
    trackEvent('share', { method: 'copy_link', content_type: 'portfolio' });
}

// ==================== OPEN TO WORK BADGE ====================
function initOpenToWorkBadge() {
    const badgeContainer = document.getElementById('openToWorkBadge');

    if (!badgeContainer) return;

    // DISABLED - User is not currently open to work
    // Set this to true when actively seeking opportunities
    const isOpenToWork = false;

    // Clear the container completely when not open to work
    badgeContainer.innerHTML = '';
    badgeContainer.style.display = 'none';

    if (isOpenToWork) {
        badgeContainer.style.display = 'block';
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

        btn.addEventListener('click', async function () {
            const success = await copyToClipboard(email, 'Email copied! ✓');

            if (success) {
                this.classList.add('copied');
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';

                setTimeout(() => {
                    this.classList.remove('copied');
                    this.innerHTML = '<i class="fas fa-envelope"></i> Copy Email';
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
                <i class="fas fa-clock"></i>
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
                <i class="fas fa-fire streak-fire"></i>
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
                <i class="fas fa-hourglass-half"></i>
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
            <div class="profile-avatar"><i class="fas fa-user-circle"></i></div>
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
            <i class="fas fa-trophy"></i> High Score: ${highScore}
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
            <button class="fab-main" id="fabMain" aria-label="Quick actions menu" aria-expanded="false" aria-controls="fabActions">
                +
            </button>
            <div class="fab-actions" id="fabActions" role="menu">
                <a href="#" class="fab-action" onclick="scrollToTop(); return false;" title="Scroll to top" role="menuitem">
                    <i class="fas fa-arrow-up"></i>
                </a>
                <a href="mailto:iammrkarthik2002@gmail.com" class="fab-action" title="Send email" role="menuitem">
                    <i class="fas fa-envelope"></i>
                </a>
                <button class="fab-action" onclick="generateResumePDF()" title="Download resume" role="menuitem">
                    <i class="fas fa-download"></i>
                </button>
                <a href="#contact" class="fab-action" title="Contact" role="menuitem">
                    <i class="fas fa-phone"></i>
                </a>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', fabHTML);

    const fabMain = document.getElementById('fabMain');
    const fabContainer = document.getElementById('fabContainer');

    fabMain.addEventListener('click', () => {
        const isOpen = fabContainer.classList.toggle('open');
        fabMain.classList.toggle('open');
        fabMain.setAttribute('aria-expanded', isOpen.toString());

        // Announce state change to screen readers
        if (typeof announceToScreenReader === 'function') {
            announceToScreenReader(isOpen ? 'Quick actions menu opened' : 'Quick actions menu closed');
        }
    });

    // Close FAB when clicking outside
    document.addEventListener('click', (e) => {
        if (!fabContainer.contains(e.target)) {
            fabContainer.classList.remove('open');
            fabMain.classList.remove('open');
            fabMain.setAttribute('aria-expanded', 'false');
        }
    });

    // Keyboard support for closing with Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && fabContainer.classList.contains('open')) {
            fabContainer.classList.remove('open');
            fabMain.classList.remove('open');
            fabMain.setAttribute('aria-expanded', 'false');
            fabMain.focus();
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
                    <i class="fas fa-user"></i>
                    <span>About</span>
                </a>
                <a href="#skills" class="mobile-nav-item">
                    <i class="fas fa-code"></i>
                    <span>Skills</span>
                </a>
                <a href="#projects" class="mobile-nav-item">
                    <i class="fas fa-project-diagram"></i>
                    <span>Projects</span>
                </a>
                <a href="#contact" class="mobile-nav-item">
                    <i class="fas fa-envelope"></i>
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
    // Create QR code URL using a reliable API
    const portfolioUrl = 'https://karthik77-kk.github.io/karthikm-resume/';
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(portfolioUrl)}&bgcolor=ffffff&color=000000`;

    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'qrModal';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeQRModal()"></div>
        <div class="modal-content glass-card-strong" style="max-width: 400px; text-align: center;">
            <button class="modal-close" onclick="closeQRModal()" aria-label="Close">�</button>
            <div class="modal-body qr-code-container" style="padding: 2rem;">
                <h2 style="color: var(--primary); margin-bottom: 1.5rem;">Scan to Connect</h2>
                <img src="${qrImageUrl}" 
                     alt="QR Code for Portfolio" 
                     style="border: 10px solid white; border-radius: 10px; max-width: 200px;"
                     onerror="this.parentElement.innerHTML='<p style=\\'color:var(--text-muted)\\'>QR Code unavailable. Visit: karthik77-kk.github.io/karthikm-resume</p>'">
                <p style="color: var(--text-secondary); margin-top: 1.5rem;">Scan with your phone camera</p>
                <p style="font-size: 0.8rem; margin-top: 1rem; color: var(--text-muted);">
                    Or visit: <a href="${portfolioUrl}" style="color: var(--primary);">karthik77-kk.github.io</a>
                </p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close on escape key
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeQRModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);

    trackEvent('qr_code_shown');
}

function closeQRModal() {
    const modal = document.getElementById('qrModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
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

        readingTimeEl.innerHTML = `<i class="fas fa-book-reader"></i> ${readingTime}`;
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

        window.showAchievement = function (badge, name, xp) {
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

// ==================== CONNECTION STATUS INDICATOR ====================
function initConnectionStatus() {
    // Create connection status element
    let statusEl = document.getElementById('connectionStatus');
    if (!statusEl) {
        statusEl = document.createElement('div');
        statusEl.id = 'connectionStatus';
        statusEl.className = 'connection-status';
        statusEl.setAttribute('role', 'status');
        statusEl.setAttribute('aria-live', 'polite');
        document.body.appendChild(statusEl);
    }

    function updateStatus(online) {
        if (online) {
            statusEl.innerHTML = '<i class="fas fa-wifi"></i> Back online';
            statusEl.classList.add('online', 'visible');
            setTimeout(() => statusEl.classList.remove('visible'), 3000);
        } else {
            statusEl.innerHTML = '<i class="fas fa-wifi-slash"></i> You are offline';
            statusEl.classList.remove('online');
            statusEl.classList.add('visible');
        }
    }

    window.addEventListener('online', () => updateStatus(true));
    window.addEventListener('offline', () => updateStatus(false));

    // Initial check
    if (!navigator.onLine) {
        updateStatus(false);
    }
}

// ==================== LIVE REGION FOR SCREEN READERS ====================
function initLiveRegion() {
    let liveRegion = document.getElementById('liveRegion');
    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'liveRegion';
        liveRegion.className = 'live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        document.body.appendChild(liveRegion);
    }
}

function announceToScreenReader(message) {
    const liveRegion = document.getElementById('liveRegion');
    if (liveRegion) {
        liveRegion.textContent = message;
        // Clear after announcement
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

// ==================== MAIN INITIALIZATION ====================
function initAllPortfolioFeatures() {
    console.log('🚀 Initializing portfolio features v4.2.0');

    // Accessibility essentials first
    initLiveRegion();
    initConnectionStatus();

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
        version: '4.2.0',
        features_count: 22
    });

    console.log('✅ Portfolio features initialized (v4.2.0)');
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
    closeQRModal,
    scrollToTop,
    initAllPortfolioFeatures
};

// Also expose showQRCode and closeQRModal globally for onclick handlers
window.showQRCode = showQRCode;
window.closeQRModal = closeQRModal;
