
// ═══════════════════════════════════════════════════════════════
// LEAD FORM HANDLING
// ═══════════════════════════════════════════════════════════════

const leadForm = document.getElementById('leadForm');
const formSuccess = document.getElementById('formSuccess');
const spotsEl = document.getElementById('spotsRemaining');

// Lấy số lượng còn lại từ Local Storage (nếu chưa có thì mặc định là 100)
let spotsLeft = localStorage.getItem('filmoty_spots') !== null
    ? parseInt(localStorage.getItem('filmoty_spots'))
    : 100;

// Hàm cập nhật giao diện
function updateSpotsDisplay() {
    if (spotsEl) spotsEl.textContent = spotsLeft;

    // Nếu hết slot, chuyển sang trạng thái Paid
    if (spotsLeft <= 0) {
        const freePriceEl = document.querySelector('.offer-tier:first-child .offer-price');
        const badgeText = document.querySelector('.offer-badge span:last-child');

        if (freePriceEl) freePriceEl.textContent = '$7';
        if (badgeText) badgeText.textContent = 'Paid Access';
        if (spotsEl) spotsEl.textContent = '0';
    }
}

// Chạy hàm ngay khi load trang
updateSpotsDisplay();

if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Disable nút bấm tránh spam
        const submitBtn = leadForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Đang xử lý...</span>';
        submitBtn.style.opacity = '0.7';
        submitBtn.disabled = true;

        // Mô phỏng API gửi email (đợi 1.5 giây)
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Trừ đi 1 suất và lưu vào bộ nhớ trình duyệt
        if (spotsLeft > 0) {
            spotsLeft--;
            localStorage.setItem('filmoty_spots', spotsLeft);
            updateSpotsDisplay();
        }

        // Hiện thông báo thành công
        leadForm.style.display = 'none';
        formSuccess.style.display = 'block';

        // Tự động cuộn đến thông báo
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
}

async function simulateEmailSend(data) {
    // In production, replace with actual API call
    // Example: 
    // await fetch('/api/send-funnel-guide', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });

    return new Promise(resolve => setTimeout(resolve, 1000));
}

// Track lead count (in production, this would be server-side)
let leadCount = 0;

function getLeadPrice() {
    leadCount++;

    if (leadCount <= 100) {
        return { price: 0, text: 'FREE' };
    } else {
        return { price: 7, text: '$7' };
    }
}

// Update pricing display based on lead count
function updatePricingDisplay() {
    const pricing = getLeadPrice();
    const priceElements = document.querySelectorAll('.offer-price');

    if (leadCount > 100) {
        priceElements[0].textContent = '$7';
        document.querySelector('.offer-badge span:last-child').textContent = 'Paid Access';
    }
}

// ═══════════════════════════════════════════════════════════════
// ENHANCED NAVIGATION WITH RESOURCES
// ═══════════════════════════════════════════════════════════════

// Update to include resources page
const allPages = ['home', 'about', 'process', 'work', 'pricing', 'resources', 'contact'];

console.log('%c✓ Form handling initialized', 'color: #4CAF50;');
// ═══════════════════════════════════════════════════════════════
// FILMOTY COSMIC - JAVASCRIPT
// Apple-smooth page routing + cosmic interactions
// ═══════════════════════════════════════════════════════════════

// --- PAGE ROUTING SYSTEM ---
// --- PAGE ROUTING SYSTEM ---
let currentPage = 'home';

// Hàm helper để đóng menu mobile một cách triệt để
function closeMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const navCenter = document.querySelector('.nav-center');
    if (toggle && navCenter) {
        toggle.classList.remove('active');
        navCenter.classList.remove('active');
        document.body.style.overflow = ''; // Mở khóa cuộn trang
    }
}

function navigateToPage(pageName) {
    // Đóng menu mobile trước khi chuyển trang
    closeMobileMenu();

    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');

    // Fade out current page
    const currentPageEl = document.getElementById(currentPage);
    if (currentPageEl) {
        currentPageEl.style.opacity = '0';
        currentPageEl.style.transform = 'translateY(20px)';
    }

    // Wait for fade out, then switch
    setTimeout(() => {
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none';
        });

        // Remove active from all nav links
        navLinks.forEach(link => link.classList.remove('active'));

        // Show target page
        const targetPage = document.getElementById(pageName);
        if (targetPage) {
            targetPage.style.display = 'block';
            targetPage.classList.add('active');

            // Activate nav link
            const targetNav = document.querySelector(`[data-page="${pageName}"]`);
            if (targetNav) {
                targetNav.classList.add('active');
            }

            // Scroll to top smoothly
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            currentPage = pageName;

            setTimeout(() => {
                initPageAnimations(pageName);
            }, 100);
        }
    }, 300);
}

// --- PAGE-SPECIFIC ANIMATIONS ---
function initPageAnimations(pageName) {
    const page = document.getElementById(pageName);
    if (!page) return;

    // Fade in elements progressively
    const animElements = page.querySelectorAll('.prop-card, .work-item, .pricing-card, .phase-detail, .content-block, .stat-box');

    animElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';

        setTimeout(() => {
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// --- NAVIGATION SCROLL BEHAVIOR ---
const nav = document.getElementById('mainNav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Change nav background on scroll
    if (currentScroll > 100) {
        nav.style.background = 'rgba(0, 0, 0, 0.95)';
        nav.style.boxShadow = '0 4px 30px rgba(255, 10, 55, 0.1)';
    } else {
        nav.style.background = 'rgba(0, 0, 0, 0.8)';
        nav.style.boxShadow = 'none';
    }

    // Hide nav on scroll down, show on scroll up (Apple style)
    if (currentScroll > lastScroll && currentScroll > 500) {
        nav.style.transform = 'translateY(-100%)';
    } else {
        nav.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

// --- NAV LINK CLICK HANDLERS ---
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
        const page = this.getAttribute('data-page');
        if (page) {
            navigateToPage(page);
        }
    });
});

// --- COSMIC GLOW MOUSE TRACKING ---
const cosmicGlow = document.querySelector('.cosmic-glow');

document.addEventListener('mousemove', throttle((e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    const offsetX = (mouseX - 0.5) * 100;
    const offsetY = (mouseY - 0.5) * 100;

    if (cosmicGlow) {
        cosmicGlow.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
    }
}, 50));

// --- PARALLAX STARS ---
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const stars = document.querySelectorAll('.stars-layer');

    stars.forEach((layer, index) => {
        const speed = 0.05 * (index + 1);
        const yPos = -(scrolled * speed);
        layer.style.transform = `translateY(${yPos}px)`;
    });
}, 10));

// --- BUTTON INTERACTIONS ---
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    // Ripple effect on click
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;

        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// --- CARD HOVER EFFECTS ---
document.querySelectorAll('.prop-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        // Subtle elevation
        this.style.boxShadow = '0 20px 60px rgba(255, 10, 55, 0.15)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.boxShadow = 'none';
    });
});

// --- WORK ITEM 3D TILT ---
document.querySelectorAll('.work-item').forEach(item => {
    item.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    item.addEventListener('mouseleave', function () {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// --- PRICING CARDS INTERACTION ---
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        // Dim other cards
        document.querySelectorAll('.pricing-card').forEach(other => {
            if (other !== this) {
                other.style.opacity = '0.5';
            }
        });
    });

    card.addEventListener('mouseleave', function () {
        // Restore all cards
        document.querySelectorAll('.pricing-card').forEach(other => {
            other.style.opacity = '1';
        });
    });
});

// --- SCROLL PROGRESS BAR ---
function createScrollProgress() {
    const progress = document.createElement('div');
    progress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 2px;
        background: linear-gradient(90deg, #FF0A37, #FF6B35);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progress);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progress.style.width = scrollPercent + '%';
    });
}

createScrollProgress();

// --- STAT COUNTER ANIMATION ---
function animateCounter(element, target, suffix = '') {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Trigger counters when stats come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('.stat-value, .stat-big');
            if (statValue && !statValue.classList.contains('animated')) {
                statValue.classList.add('animated');

                const text = statValue.textContent;

                // Parse different stat formats
                if (text.includes('$')) {
                    const num = parseFloat(text.replace(/[^0-9.]/g, ''));
                    statValue.textContent = '$0M+';
                    animateCounter(statValue, num, 'M+');
                } else if (text.includes('%')) {
                    const num = parseInt(text);
                    statValue.textContent = '0%';
                    animateCounter(statValue, num, '%');
                } else if (text === 'Zero') {
                    // No animation for "Zero"
                } else if (text.includes('Weeks')) {
                    // No animation for text
                }
            }
            statObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-item, .stat-box').forEach(stat => {
    statObserver.observe(stat);
});

// --- SMOOTH ANCHOR LINKS ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        if (target !== '#') {
            document.querySelector(target)?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// --- UTILITY: THROTTLE ---
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func(...args);
    };
}

// --- KEYBOARD NAVIGATION ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('user-tabbing');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('user-tabbing');
});

// Add focus styles
const focusStyle = document.createElement('style');
focusStyle.textContent = `
    body:not(.user-tabbing) *:focus {
        outline: none;
    }
    
    body.user-tabbing *:focus {
        outline: 2px solid #FF0A37;
        outline-offset: 4px;
    }
`;
document.head.appendChild(focusStyle);

// --- HERO STATS ANIMATION ON LOAD ---
window.addEventListener('load', () => {
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-actions, .hero-stats');

    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';

        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150);
    });

    // Initialize first page animations
    setTimeout(() => {
        initPageAnimations('home');
    }, 1000);
});

// --- FOOTER VISIBILITY ---
const footer = document.getElementById('mainFooter');

const footerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            footer.style.opacity = '1';
            footer.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

if (footer) {
    footer.style.opacity = '0';
    footer.style.transform = 'translateY(30px)';
    footer.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    footerObserver.observe(footer);
}

// --- CUSTOM CURSOR (Optional - Apple Vision Pro style) ---
function createCosmicCursor() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid rgba(255, 10, 55, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.15s ease-out;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.display = 'block';
    });

    // Scale up on clickable elements
    document.querySelectorAll('button, a, .work-item, .pricing-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'rgba(255, 10, 55, 0.8)';
        });

        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'rgba(255, 10, 55, 0.5)';
        });
    });
}

// Uncomment to enable cosmic cursor
// createCosmicCursor();

// --- CONSOLE BRANDING ---
console.log(
    '%c🌌 FILMOTY COSMIC',
    'font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #FF0A37, #FF6B35); -webkit-background-clip: text; -webkit-text-fill-color: transparent;'
);

console.log(
    '%cAutonomous Media Arm for High-Ticket Founders',
    'font-size: 12px; color: #666;'
);

console.log(
    '%c\nBuilt with Apple-level polish ✨',
    'color: #FF0A37;'
);

// --- PERFORMANCE MONITORING ---
if (window.performance) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`%cPage loaded in ${loadTime}ms`, 'color: #4CAF50;');
        }, 0);
    });
}

// --- EXPORT API ---
window.FilmotyApp = {
    version: '2.0.0',
    navigateTo: navigateToPage,
    currentPage: () => currentPage
};

// --- INITIALIZE ---
console.log('%c✓ Filmoty Cosmic initialized', 'color: #4CAF50;');


// ═══════════════════════════════════════════════════════════════
// MOBILE MENU - Responsive Navigation
// ═══════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════
// MOBILE MENU - Responsive Navigation (FIXED)
// ═══════════════════════════════════════════════════════════════

function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const navCenter = document.querySelector('.nav-center');

    if (!toggle || !navCenter) return;

    // Toggle menu click
    toggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const isActive = this.classList.contains('active');

        if (isActive) {
            closeMobileMenu();
        } else {
            this.classList.add('active');
            navCenter.classList.add('active');
            document.body.style.overflow = 'hidden'; // Khóa cuộn trang khi mở menu
        }
    });

    // Đóng menu khi click ra ngoài vùng menu
    document.addEventListener('click', function (e) {
        if (navCenter.classList.contains('active')) {
            if (!navCenter.contains(e.target) && !toggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });

    // Đóng menu khi bấm phím ESC (cho iPad/Desktop nhỏ)
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMobileMenu();
    });
}

// Chạy khởi tạo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}