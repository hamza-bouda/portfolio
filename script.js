// ===== Typewriter Effect =====
const typewriterTexts = [
    "Data Science & Intelligence Artificielle",
    "Machine Learning & Computer Vision",
    "Data Engineering & Analytics"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typewrite() {
    const currentText = typewriterTexts[textIndex];
    
    if (isDeleting) {
        charIndex--;
        typewriterEl.textContent = currentText.substring(0, charIndex);
    } else {
        charIndex++;
        typewriterEl.textContent = currentText.substring(0, charIndex);
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentText.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        speed = 500;
    }

    setTimeout(typewrite, speed);
}

typewrite();

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let isNavScrolling = false;

window.addEventListener('scroll', () => {
    if (!isNavScrolling) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            isNavScrolling = false;
        });
        isNavScrolling = true;
    }
});

// ===== Mobile Navigation =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');

// ===== Smooth Scroll with Navbar Offset =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            // Close mobile menu if open
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            
            // Calculate offset (navbar height + extra padding)
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

function updateActiveNav() {
    const scrollY = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

let isNavUpdating = false;
window.addEventListener('scroll', () => {
    if (!isNavUpdating) {
        window.requestAnimationFrame(() => {
            updateActiveNav();
            isNavUpdating = false;
        });
        isNavUpdating = true;
    }
});

// ===== Scroll Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}



// ===== Cursor Glow Effect =====
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    cursorGlow.style.opacity = '1';
});

document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

// ===== Particle Background =====
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
        ctx.fill();
    }
}

const particles = [];
const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const opacity = (1 - distance / 150) * 0.15;
                ctx.beginPath();
                ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}

let animationFrameId;
let isCanvasVisible = true;

function animateParticles() {
    if (!isCanvasVisible) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    connectParticles();
    animationFrameId = requestAnimationFrame(animateParticles);
}

// Optimization: Pause canvas when hero section is not visible
const heroSection = document.getElementById('home');
const canvasObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            isCanvasVisible = true;
            animateParticles();
        } else {
            isCanvasVisible = false;
            cancelAnimationFrame(animationFrameId);
        }
    });
}, { threshold: 0 });

if (heroSection) {
    canvasObserver.observe(heroSection);
} else {
    animateParticles();
}

// ===== Smooth Scroll for older browsers =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Code Window Tilt Effect =====
const codeWindow = document.querySelector('.code-window');

if (codeWindow && window.innerWidth > 1024) {
    const heroVisual = document.querySelector('.hero-visual');
    
    heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        codeWindow.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
    });

    heroVisual.addEventListener('mouseleave', () => {
        codeWindow.style.transform = 'rotateY(-5deg) rotateX(2deg)';
    });
}

// ===== Loading Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Trigger hero animations with stagger
    const heroElements = document.querySelectorAll('.hero .animate-on-scroll');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, 200 + index * 150);
    });
});

// ===== Language Toggle =====
const langToggle = document.getElementById('langToggle');
const langFr = document.querySelector('.lang-fr');
const langEn = document.querySelector('.lang-en');

let currentLang = localStorage.getItem('portfolio_lang') || 'fr';

function setLanguage(lang) {
    if (!window.translations) return;
    
    currentLang = lang;
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;
    
    // Update button UI
    if (lang === 'fr') {
        langFr.classList.add('active');
        langEn.classList.remove('active');
    } else {
        langEn.classList.add('active');
        langFr.classList.remove('active');
    }
    
    // Translate texts
    const translatableElements = document.querySelectorAll('[data-i18n]');
    translatableElements.forEach(el => el.classList.add('fading'));

    setTimeout(() => {
        translatableElements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (window.translations[key] && window.translations[key][lang]) {
                el.innerHTML = window.translations[key][lang];
            }
            el.classList.remove('fading');
        });
    }, 300);
}

// Initialize
if (currentLang === 'en') {
    setLanguage('en');
}

// Toggle on click
langToggle.addEventListener('click', () => {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    setLanguage(newLang);
});

