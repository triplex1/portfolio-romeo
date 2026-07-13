// ============================================
// Mobile Menu
// ============================================
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('active');
    menuToggle.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    });
});

document.addEventListener('click', (e) => {
    if (!navList.contains(e.target) && !menuToggle.contains(e.target)) {
        navList.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
});

// ============================================
// Smooth Scrolling
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// Header Scroll Effect
// ============================================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ============================================
// Active Nav Link on Scroll
// ============================================
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });

// ============================================
// Animated Counters
// ============================================
function animateCounter(el, target, duration = 2000) {
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);

        el.textContent = isDecimal ? (eased * target).toFixed(1) : current;

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = target;
        }
    }

    requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            if (!el.dataset.animated) {
                el.dataset.animated = 'true';
                animateCounter(el, target);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('[data-count]').forEach(el => {
    counterObserver.observe(el);
});

// ============================================
// Scroll Reveal
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
    '.service-card, .stat-card, .project-card, .section-header, .about-text, .contact-info-block, .contact-form'
).forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ============================================
// Project Filters
// ============================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const loadMoreBtn = document.getElementById('load-more-btn');
const projectsActions = document.querySelector('.projects-actions');

let currentFilter = 'all';
let showingAll = false;

function applyFilter(filter) {
    currentFilter = filter;
    let visibleCount = 0;

    projectCards.forEach(card => {
        const categories = card.dataset.category || '';
        const matches = filter === 'all' || categories.includes(filter);
        card.classList.toggle('filtered-out', !matches);

        if (matches && !showingAll) {
            visibleCount += 1;
            if (visibleCount > 6) {
                card.classList.add('hidden-project');
                card.classList.remove('visible');
            } else {
                card.classList.remove('hidden-project');
            }
        }
    });

    updateLoadMoreVisibility();
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => {
            b.classList.remove('active');
            b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        applyFilter(btn.dataset.filter);
    });
});

// ============================================
// Load More Projects
// ============================================
function updateLoadMoreVisibility() {
    const hiddenVisible = [...projectCards].filter(
        c => c.classList.contains('hidden-project') && !c.classList.contains('filtered-out')
    );

    if (hiddenVisible.length === 0 || showingAll) {
        projectsActions.classList.add('hidden');
    } else {
        projectsActions.classList.remove('hidden');
    }
}

loadMoreBtn.addEventListener('click', () => {
    showingAll = true;
    projectCards.forEach(card => {
        if (!card.classList.contains('filtered-out')) {
            card.classList.add('visible');
            card.classList.remove('hidden-project');
        }
    });
    projectsActions.classList.add('hidden');
});

updateLoadMoreVisibility();

// ============================================
// Contact Form — mailto fallback
// ============================================
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const subject = encodeURIComponent(`Project Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:jrtagalogan@gmail.com?subject=${subject}&body=${body}`;
});
