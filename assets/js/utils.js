/**
 * Utility Functions for Portfolio
 * Version 4.2.0
 * Contains all helper functions used across the portfolio
 */

// ==================== DOM HELPER ====================
function $(id) {
    return document.getElementById(id);
}

// ==================== LOCAL STORAGE HELPERS ====================
function safeSetItem(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (e) {
        console.warn('LocalStorage not available:', e);
        return false;
    }
}

function safeGetItem(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);
        return value !== null ? value : defaultValue;
    } catch (e) {
        console.warn('LocalStorage not available:', e);
        return defaultValue;
    }
}

function safeGetJSON(key, defaultValue = null) {
    try {
        const value = localStorage.getItem(key);
        return value !== null ? JSON.parse(value) : defaultValue;
    } catch (e) {
        console.warn('LocalStorage parse error:', e);
        return defaultValue;
    }
}

// ==================== NOTIFICATION SYSTEM ====================
function showNotification(message, type = 'info', duration = 5000) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Close notification">×</button>
    `;
    document.body.appendChild(notification);
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// ==================== VALIDATION ====================
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ==================== ANALYTICS TRACKING ====================
function trackEvent(eventName, params = {}) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, params);
    }
    
    // Console log for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('📊 Analytics Event:', eventName, params);
    }
}

function trackPageView(pageName) {
    trackEvent('page_view', {
        page_title: pageName,
        page_location: window.location.href,
        page_path: window.location.pathname
    });
}

// ==================== THROTTLE FUNCTION ====================
function throttle(func, wait) {
    let timeout;
    let previous = 0;
    
    return function executedFunction(...args) {
        const now = Date.now();
        const remaining = wait - (now - previous);
        
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(this, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                previous = Date.now();
                timeout = null;
                func.apply(this, args);
            }, remaining);
        }
    };
}

// ==================== DEBOUNCE FUNCTION ====================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== TIME TRACKING ====================
let timeSpentStart = Date.now();

function initTimeSpentTracker() {
    timeSpentStart = Date.now();
    
    // Update every 10 seconds
    setInterval(() => {
        const timeSpent = Math.floor((Date.now() - timeSpentStart) / 1000);
        safeSetItem('portfolioTimeSpent', timeSpent.toString());
    }, 10000);
}

function getTimeSpentDisplay() {
    const seconds = Math.floor((Date.now() - timeSpentStart) / 1000);
    
    if (seconds < 60) {
        return `${seconds}s`;
    } else if (seconds < 3600) {
        const minutes = Math.floor(seconds / 60);
        return `${minutes}m ${seconds % 60}s`;
    } else {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return `${hours}h ${minutes}m`;
    }
}

// ==================== DAILY STREAK ====================
function updateDailyStreak() {
    const today = new Date().toDateString();
    const lastVisit = safeGetItem('lastVisitDate', '');
    const currentStreak = parseInt(safeGetItem('visitStreak', '0')) || 0;
    
    if (lastVisit === today) {
        return currentStreak;
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    let newStreak;
    if (lastVisit === yesterdayStr) {
        newStreak = currentStreak + 1;
    } else {
        newStreak = 1;
    }
    
    safeSetItem('lastVisitDate', today);
    safeSetItem('visitStreak', newStreak.toString());
    
    return newStreak;
}

// ==================== READING TIME CALCULATOR ====================
function calculateReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    
    if (minutes === 1) {
        return '1 min read';
    } else if (minutes < 60) {
        return `${minutes} min read`;
    } else {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m read`;
    }
}

// ==================== CONFETTI EFFECT ====================
function createConfetti(count = 50) {
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff88', '#ff4444'];
    
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: 1;
            transform: rotate(${Math.random() * 360}deg);
            z-index: 100000;
            pointer-events: none;
            animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
        `;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add confetti animation if not already in CSS
if (!document.querySelector('#confetti-animation-style')) {
    const style = document.createElement('style');
    style.id = 'confetti-animation-style';
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

// ==================== FONT SIZE CONTROLS ====================
function initFontSizeControls() {
    const currentSize = parseInt(safeGetItem('fontSize', '100')) || 100;
    document.documentElement.style.fontSize = currentSize + '%';
    
    return {
        increase: () => {
            const newSize = Math.min(currentSize + 10, 150);
            document.documentElement.style.fontSize = newSize + '%';
            safeSetItem('fontSize', newSize.toString());
        },
        decrease: () => {
            const newSize = Math.max(currentSize - 10, 80);
            document.documentElement.style.fontSize = newSize + '%';
            safeSetItem('fontSize', newSize.toString());
        },
        reset: () => {
            document.documentElement.style.fontSize = '100%';
            safeSetItem('fontSize', '100');
        }
    };
}

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

// ==================== SCREEN READER ANNOUNCEMENTS ====================
function announceToScreenReader(message) {
    const liveRegion = document.getElementById('liveRegion');
    if (liveRegion) {
        liveRegion.textContent = message;
        setTimeout(() => {
            liveRegion.textContent = '';
        }, 1000);
    }
}

// ==================== RANDOM UTILITIES ====================
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ==================== SCROLL UTILITIES ====================
function smoothScrollTo(element, offset = 0) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }
    
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ==================== EXPORT FOR GLOBAL ACCESS ====================
window.utils = {
    $,
    safeSetItem,
    safeGetItem,
    safeGetJSON,
    showNotification,
    isValidEmail,
    trackEvent,
    trackPageView,
    throttle,
    debounce,
    initTimeSpentTracker,
    getTimeSpentDisplay,
    updateDailyStreak,
    calculateReadingTime,
    createConfetti,
    initFontSizeControls,
    copyToClipboard,
    announceToScreenReader,
    randomInt,
    randomChoice,
    shuffleArray,
    smoothScrollTo,
    isElementInViewport
};

console.log('✅ Utils.js loaded successfully (v4.2.0)');
