// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoader();
    initTheme();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initSkillBars();
    initContactForm();
    initNavHighlight();
    initBackToTop();
});

// Loading animation
function initLoader() {
    const loader = document.querySelector('.loader');
    
    // Hide loader after page loads
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.style.opacity = '0';
            loader.style.visibility = 'hidden';
        }, 500);
    });
}

// Theme toggle functionality
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const body = document.body;
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    
    // Desktop theme toggle
    if (themeToggle) {
        // Set initial icon based on theme
        updateThemeIcon(savedTheme === 'dark');
        
        themeToggle.addEventListener('click', function() {
            const isDark = body.classList.contains('dark-theme');
            const newTheme = isDark ? 'light' : 'dark';
            setTheme(newTheme);
            updateThemeIcon(!isDark);
        });
    }
    
    // Mobile theme toggle
    if (mobileThemeToggle) {
        mobileThemeToggle.checked = savedTheme === 'dark';
        
        mobileThemeToggle.addEventListener('change', function() {
            const newTheme = this.checked ? 'dark' : 'light';
            setTheme(newTheme);
            updateThemeIcon(this.checked);
        });
    }
    
    function setTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
        }
        localStorage.setItem('theme', theme);
    }
    
    function updateThemeIcon(isDark) {
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
}

// Mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Smooth scroll for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .back-to-top');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll reveal animations
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section-title, .section-subtitle, .hero-content, .about-content > *, .skill-category, .project-card, .timeline-item, .certification-card, .contact-info, .contact-form');
    
    const revealOnScroll = function() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const revealTop = element.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Add CSS for reveal animation
    const style = document.createElement('style');
    style.textContent = `
        .section-title, .section-subtitle, .hero-content, .about-content > *, .skill-category, .project-card, .timeline-item, .certification-card, .contact-info, .contact-form {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .section-title.revealed, .section-subtitle.revealed, .hero-content.revealed, .about-content > *.revealed, .skill-category.revealed, .project-card.revealed, .timeline-item.revealed, .certification-card.revealed, .contact-info.revealed, .contact-form.revealed {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero-content.revealed {
            transition-delay: 0.2s;
        }
        
        .skill-category.revealed:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .skill-category.revealed:nth-child(3) {
            transition-delay: 0.2s;
        }
        
        .project-card.revealed:nth-child(2) {
            transition-delay: 0.1s;
        }
        
        .project-card.revealed:nth-child(3) {
            transition-delay: 0.2s;
        }
    `;
    document.head.appendChild(style);
    
    // Initial check on page load
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

// Animated skill bars
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBars = function() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            }
        });
    };
    
    // Initial check on page load
    animateSkillBars();
    
    // Check on scroll
    window.addEventListener('scroll', animateSkillBars);
}

// Contact form submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            showFormMessage('Sending message...', 'success');
            
            // In a real application, you would send the data to a server here
            // For this demo, we'll just show a success message after a delay
            setTimeout(function() {
                showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }, 1500);
        });
    }
    
    function showFormMessage(text, type) {
        if (formMessage) {
            formMessage.textContent = text;
            formMessage.className = 'form-message ' + type;
            formMessage.style.display = 'block';
            
            // Hide message after 5 seconds
            setTimeout(function() {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// Navigation highlight on scroll
function initNavHighlight() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    const highlightNav = function() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
}

// Back to top button visibility
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
    }
}