/*=========== Preloader ==========*/
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
    }, 1000);

    // Initialize particle background
    createParticleBackground();
    
    // Create star particles for sections
    createStarParticles();
    
    // Initialize other interactive elements
    initInteractiveElements();
    
    // Initialize text animations
    initTextAnimations();
    
    // Initialize timeline animations
    initTimelineAnimations();
    
    // Initialize tech stack
    initTechStack();
});

/*=========== Interactive Particle Background ==========*/
function createParticleBackground() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    
    // Configuration
    const particleCount = 45; // Increased count for more vibrant background
    const particleColors = ['blue', 'purple', 'pink', 'green', 'yellow'];
    
    // Clear any existing particles
    container.innerHTML = '';
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random color
        const colorClass = `particle--${particleColors[Math.floor(Math.random() * particleColors.length)]}`;
        particle.classList.add(colorClass);
        
        // Random size (3-15px)
        const size = Math.random() * 12 + 3;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random animation delay and duration
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 15; // 15-25s for slower, more graceful motion
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        // Add to container
        container.appendChild(particle);
    }
    
    // Add click burst effect
    document.addEventListener('click', (e) => {
        // Only create particles if clicked outside of interactive elements
        if (e.target.closest('a, button, input, textarea, .portfolio-item, .service-card')) {
            return;
        }
        
        // Create burst of particles at click position
        createParticleBurst(e.clientX, e.clientY);
    });
}

function createParticleBurst(x, y) {
    const particleCount = 10;
    const particleColors = ['blue', 'purple', 'pink', 'green', 'yellow'];
    const container = document.body;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle-burst');
        
        // Random color
        const colorClass = `particle--${particleColors[Math.floor(Math.random() * particleColors.length)]}`;
        particle.classList.add(colorClass);
        
        // Size
        const size = Math.random() * 8 + 4;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Position
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 150 + 50;
        const endX = x + Math.cos(angle) * distance;
        const endY = y + Math.sin(angle) * distance;
        
        // Add to body
        container.appendChild(particle);
        
        // Animate outward
        setTimeout(() => {
            particle.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
            particle.style.left = `${endX}px`;
            particle.style.top = `${endY}px`;
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0.5)';
        }, 10);
        
        // Remove after animation
        setTimeout(() => {
            if (particle.parentNode === container) {
                container.removeChild(particle);
            }
        }, 1000);
    }
}

// Create star particles for sections
function createStarParticles() {
    // Create stars for the hero section
    createStarsForElement('star-container', 40); // Reduced count
    
    // Create stars container for each section
    document.querySelectorAll('section').forEach((section, index) => {
        if (section.id !== 'home') { // Skip hero section as it already has stars
            const starsContainer = document.createElement('div');
            starsContainer.classList.add('stars');
            starsContainer.id = `stars-${section.id}`;
            section.prepend(starsContainer);
            
            // Add fewer stars to other sections (15-25) to keep them subtle
            createStarsForElement(`stars-${section.id}`, 15 + Math.floor(Math.random() * 10));
        }
    });
    
    // Add floating animation to certain elements
    addFloatingAnimation();
}

// Helper function to create stars for a specific element
function createStarsForElement(containerId, starCount) {
    const starContainer = document.getElementById(containerId);
    if (!starContainer) return;

    // Clear existing stars first
    starContainer.innerHTML = '';
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Random size between 1-2px (smaller)
        const size = Math.random() * 1 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        
        // Random twinkle animation duration
        const duration = Math.random() * 3 + 2;
        star.style.setProperty('--twinkle-duration', `${duration}s`);
        
        // Random delay
        const delay = Math.random() * 5;
        star.style.animationDelay = `${delay}s`;
        
        starContainer.appendChild(star);
    }
}

// Initialize interactive elements and smooth transitions
function initInteractiveElements() {
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Add transition classes for section animation
                const currentActive = document.querySelector('section.active-section');
                if (currentActive) {
                    currentActive.classList.add('section-exit');
                    setTimeout(() => {
                        currentActive.classList.remove('active-section', 'section-exit');
                    }, 500);
                }
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Account for header
                    behavior: 'smooth'
                });
                
                // Add active class to target section
                setTimeout(() => {
                    targetElement.classList.add('active-section');
                }, 200);
                
                // Update active nav link
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Close mobile menu if open
                const hamburger = document.querySelector('.hamburger');
                const navLinks = document.querySelector('.nav-links');
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('show');
                }
            }
        });
    });
    
    // Initialize section transitions on scroll
    initSectionTransitions();
    
    // Add floating animations to various elements
    addFloatingAnimation();
}

// Create particle for burst effect on click (kept this for special effects, not cursor following)
function createParticle(x, y, container) {
    if (!container) return;
    
    const particle = document.createElement('div');
    particle.classList.add('interactive-particle');
    
    // Random size (smaller particles)
    const size = Math.random() * 8 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random color
    const colors = [
        'rgba(0, 215, 220, 0.7)',
        'rgba(149, 0, 221, 0.7)',
        'rgba(221, 0, 200, 0.7)',
        'rgba(0, 221, 71, 0.7)'
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.backgroundColor = color;
    particle.style.boxShadow = `0 0 10px ${color}`;
    
    // Position at event coordinates
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    
    // Random direction
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 80 + 20;
    const vx = Math.cos(angle) * speed;
    const vy = Math.sin(angle) * speed;
    
    // Add to container
    container.appendChild(particle);
    
    // Animate
    setTimeout(() => {
        particle.style.transform = `translate(${vx}px, ${vy}px)`;
        particle.style.opacity = '0';
    }, 10);
    
    // Remove after animation
    setTimeout(() => {
        if (particle.parentNode === container) {
            container.removeChild(particle);
        }
    }, 1000);
}

// Initialize transition effects for sections
function initSectionTransitions() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            } else {
                // Keep the animation for re-entry if scrolling back up
                if (entry.boundingClientRect.top > 0) {
                    entry.target.classList.remove('section-visible');
                }
            }
        });
    }, { threshold: 0.15 }); // Trigger when 15% of the section is visible
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
        section.classList.add('section-transition');
    });
}

// Initialize parallax stars for background effect
function initParallaxStars() {
    // Create parallax stars container
    const parallaxContainer = document.createElement('div');
    parallaxContainer.classList.add('parallax-stars');
    document.body.appendChild(parallaxContainer);
    
    // Create parallax stars
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('parallax-star');
        
        // Random size between 1-3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        star.style.left = `${posX}%`;
        star.style.top = `${posY}%`;
        
        // Random depth for parallax effect
        const depth = Math.random() * 5;
        star.setAttribute('data-depth', depth);
        
        // Random opacity
        star.style.opacity = Math.random() * 0.7 + 0.3;
        
        parallaxContainer.appendChild(star);
    }
    
    // Handle mouse movement for parallax effect
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.parallax-star').forEach(star => {
            const depth = parseFloat(star.getAttribute('data-depth'));
            const moveX = (mouseX - 0.5) * depth * 20;
            const moveY = (mouseY - 0.5) * depth * 20;
            
            star.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
    });
    
    // Handle scroll for continuous background
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.body.style.backgroundPosition = `0px ${scrollY * 0.2}px`;
    });
}

// Add floating animation to elements
function addFloatingAnimation() {
    document.querySelectorAll('.skill-icon, .service-icon, .client-img').forEach((item, index) => {
        item.classList.add('floating');
        
        // Alternate between slow and normal floating
        if (index % 2 === 0) {
            item.classList.add('floating-slow');
        }
        
        // Add delay to create wave effect
        if (index % 3 === 0) {
            item.classList.add('floating-delay');
        }
    });
}

/*=========== Sticky Navbar ==========*/
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 50);

    // Show/hide back to top button
    const backToTop = document.querySelector('.back-to-top');
    backToTop.classList.toggle('show', window.scrollY > 500);
});

/*=========== Mobile Menu Toggle ==========*/
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('show');
});

// Close mobile menu when clicking on nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('show');
    });
});

/*=========== Active Navigation Link ==========*/
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

/*=========== Skill Bars Animation ==========*/
const skillSection = document.querySelector('.skills-section');
const progressBars = document.querySelectorAll('.progress');

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.dataset.progress;
        progressBar.style.width = `${value}%`;
    });
}

function hideProgress() {
    progressBars.forEach(p => {
        p.style.width = 0;
    });
}

window.addEventListener('scroll', () => {
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;
    
    if (sectionPos < screenPos) {
        showProgress();
    } else {
        hideProgress();
    }
});

/*=========== Portfolio Filter ==========*/
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 200);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 200);
            }
        });
    });
});

/*=========== Testimonial Slider ==========*/
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

// Initialize dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Previous button
prevBtn.addEventListener('click', () => {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = testimonialSlides.length - 1;
    }
    showSlide(currentSlide);
});

// Next button
nextBtn.addEventListener('click', () => {
    currentSlide++;
    if (currentSlide >= testimonialSlides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
});

// Auto slide
let slideInterval = setInterval(() => {
    currentSlide++;
    if (currentSlide >= testimonialSlides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}, 5000);

// Show slide function
function showSlide(index) {
    testimonialSlides.forEach(slide => {
        slide.classList.remove('active');
    });
    dots.forEach(dot => {
        dot.classList.remove('active');
    });
    
    testimonialSlides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
    
    // Reset interval
    clearInterval(slideInterval);
    slideInterval = setInterval(() => {
        currentSlide++;
        if (currentSlide >= testimonialSlides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }, 5000);
}

/*=========== Contact Form ==========*/
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

/*=========== Scroll Animations ==========*/
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
}

// Add animate-on-scroll class to elements
document.querySelectorAll('.skill-item, .service-card, .portfolio-item, .about-image').forEach(item => {
    item.classList.add('animate-on-scroll');
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

/*=========== Smooth Scrolling ==========*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Back to top button functionality
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) return;
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Smooth scroll to top
    backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();
        
        // Check if smooth scrolling is preferred
        if (!document.documentElement.classList.contains('reduced-motion')) {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
        } else {
            // Instant scroll for reduced motion preference
            window.scrollTo(0, 0);
        }
    });
}

// Initialize text animations throughout the site
function initTextAnimations() {
    // Animate section headers
    const sectionHeaders = document.querySelectorAll('.section-header h2');
    
    sectionHeaders.forEach(header => {
        header.style.opacity = '0';
        header.style.transform = 'translateY(20px)';
    });
    
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    sectionHeaders.forEach(header => {
        headerObserver.observe(header);
    });
}

// Initialize Education Circle Timeline
function initEducationTimeline() {
    const circleNodes = document.querySelectorAll('.circle-node');
    const educationCards = document.querySelectorAll('.education-card');
    
    if (circleNodes.length === 0 || educationCards.length === 0) return;

    // Show the first education card by default
    const defaultYear = circleNodes[0].getAttribute('data-year');
    circleNodes[0].classList.add('active');
    
    educationCards.forEach(card => {
        if (card.getAttribute('data-year') === defaultYear) {
            card.classList.add('active');
        }
    });
    
    // Handle circle node clicks
    circleNodes.forEach(node => {
        node.addEventListener('click', function() {
            const year = this.getAttribute('data-year');
            
            // Remove active class from all nodes and cards
            circleNodes.forEach(n => n.classList.remove('active'));
            educationCards.forEach(card => card.classList.remove('active'));
            
            // Add active class to current node and corresponding card
            this.classList.add('active');
            
            educationCards.forEach(card => {
                if (card.getAttribute('data-year') === year) {
                    card.classList.add('active');
                }
            });
        });
    });
    
    // For mobile view, just display all cards since the circle is hidden
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
        educationCards.forEach(card => {
            card.classList.add('active');
        });
    }
    
    // Handle resize events
    window.addEventListener('resize', function() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            educationCards.forEach(card => {
                card.classList.add('active');
            });
        } else {
            educationCards.forEach(card => {
                card.classList.remove('active');
            });
            
            // Show only the card corresponding to the active node
            const activeNode = document.querySelector('.circle-node.active');
            if (activeNode) {
                const year = activeNode.getAttribute('data-year');
                educationCards.forEach(card => {
                    if (card.getAttribute('data-year') === year) {
                        card.classList.add('active');
                    }
                });
            } else {
                // If no active node, activate the first one
                if (circleNodes.length > 0) {
                    circleNodes[0].classList.add('active');
                    const defaultYear = circleNodes[0].getAttribute('data-year');
                    
                    educationCards.forEach(card => {
                        if (card.getAttribute('data-year') === defaultYear) {
                            card.classList.add('active');
                        }
                    });
                }
            }
        }
    });
}

// Initialize Journey Timeline
function initJourneyTimeline() {
    const journeyItems = document.querySelectorAll('.journey-item');
    const journeyProgress = document.getElementById('journey-progress');
    
    if (!journeyItems.length || !journeyProgress) return;
    
    // Initially set all items as not visible
    journeyItems.forEach(item => {
        item.classList.remove('animate');
    });
    
    function animateJourneyItems() {
        journeyItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemBottom = item.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Check if item is at least 20% visible in viewport
            if (itemTop < windowHeight * 0.8 && itemBottom > 0) {
                item.classList.add('animate');
            }
        });
    }
    
    function updateJourneyProgress() {
        // Journey progress indicator
        if (!journeyProgress) return;
        
        // Get section position data
        const timeline = document.querySelector('.journey-timeline');
        if (!timeline) return;
        
        const timelineRect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how much of the timeline is visible
        if (timelineRect.top < windowHeight && timelineRect.bottom > 0) {
            // Timeline is partially visible
            const scrollPercentage = Math.min(
                100,
                Math.max(
                    0,
                    ((windowHeight - timelineRect.top) / (windowHeight + timelineRect.height)) * 100
                )
            );
            
            // Use the percentage to set the height of the progress bar
            journeyProgress.style.height = `${scrollPercentage}%`;
        } else if (timelineRect.top >= windowHeight) {
            // Timeline is below viewport
            journeyProgress.style.height = '0%';
        } else if (timelineRect.bottom <= 0) {
            // Timeline is above viewport (fully scrolled past)
            journeyProgress.style.height = '100%';
        }
    }
    
    // Initialize timeline
    setTimeout(animateJourneyItems, 300);
    updateJourneyProgress();
    
    // Update on scroll
    window.addEventListener('scroll', () => {
        animateJourneyItems();
        updateJourneyProgress();
    });
    
    // Update on resize
    window.addEventListener('resize', updateJourneyProgress);
}

// Initialize tech stack with animations
function initTechStack() {
    const techCategories = document.querySelectorAll('.tech-category');
    const techDetails = document.querySelector('.tech-details');
    const levelIndicators = document.querySelectorAll('.level-indicator');
    
    // Animate tech categories when they enter viewport
    const categoriesObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered animation delay
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
                
                categoriesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    techCategories.forEach(category => {
        categoriesObserver.observe(category);
    });
    
    // Animate tech details section
    if (techDetails) {
        const detailsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 600); // Delay to start after categories animate in
                    
                    detailsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        detailsObserver.observe(techDetails);
    }
    
    // Animate level indicators
    levelIndicators.forEach((indicator) => {
        // Start with width 0
        indicator.style.width = '0';
        
        // Create observer for each indicator
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Get target width from style or data attribute
                    const widthValue = entry.target.closest('.tech-level').closest('.tech-item').querySelector('.tech-level .level-indicator').getAttribute('style');
                    const targetWidth = widthValue && widthValue.includes('width') 
                        ? widthValue.split('width:')[1].trim().replace('%;', '')
                        : entry.target.closest('.tech-item').getAttribute('data-level') || "80";
                    
                    // Animate to target width
                    setTimeout(() => {
                        entry.target.style.width = `${targetWidth}%`;
                    }, 300);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(indicator);
    });
    
    // Add interaction for tech items
    const techItems = document.querySelectorAll('.tech-item');
    const techInfoContent = document.querySelector('.tech-info-content');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Update info content
            if (techInfoContent) {
                const tech = item.getAttribute('data-tech');
                techInfoContent.innerHTML = `
                    <h4>${tech}</h4>
                    <p>Extensive experience with ${tech} development and implementation in blockchain projects.</p>
                `;
                
                // Add animation class
                techInfoContent.classList.add('animate-pulse');
                
                // Remove animation class after animation completes
                setTimeout(() => {
                    techInfoContent.classList.remove('animate-pulse');
                }, 1000);
            }
        });
    });
}

// Improved Mobile Navigation
function setupMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    if (!hamburger || !navLinks) return;
    
    // Toggle navigation
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('show');
        document.body.classList.toggle('nav-open');
    });
    
    // Close navigation when clicking on a link
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('show');
            document.body.classList.remove('nav-open');
        });
    });
    
    // Close navigation when clicking outside
    document.addEventListener('click', function(e) {
        if (
            !e.target.closest('.nav-links') && 
            !e.target.closest('.hamburger') && 
            navLinks.classList.contains('show')
        ) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('show');
            document.body.classList.remove('nav-open');
        }
    });
}

// Lazy load images function - modify to include iframes
function lazyLoadImages() {
    const lazyElements = document.querySelectorAll('img[data-src], iframe[data-src]');
    
    if ('IntersectionObserver' in window) {
        const lazyElementObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.src = element.dataset.src;
                    
                    if (element.tagName.toLowerCase() === 'img') {
                        element.onload = () => {
                            element.classList.add('loaded');
                            element.removeAttribute('data-src');
                        };
                    } else {
                        // For iframes
                        element.onload = () => {
                            element.removeAttribute('data-src');
                        };
                    }
                    
                    lazyElementObserver.unobserve(element);
                }
            });
        }, { rootMargin: '100px 0px', threshold: 0.01 });
        
        lazyElements.forEach(element => {
            lazyElementObserver.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        lazyElements.forEach(element => {
            element.src = element.dataset.src;
            if (element.tagName.toLowerCase() === 'img') {
                element.classList.add('loaded');
            }
            element.removeAttribute('data-src');
        });
    }
}

// Responsive Performance Optimization
function optimizeForDevice() {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1200;
    
    // Adjust particle density based on device
    if (typeof createParticleBackground === 'function') {
        const particleCount = isMobile ? 20 : isTablet ? 40 : 60;
        createParticleBackground(particleCount);
    }
    
    // Adjust animation intensity
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .timeline-item, .cert-item, .blog-card');
    if (isMobile) {
        animatedElements.forEach(el => {
            el.style.transitionDelay = '0s';
        });
    }
    
    // Handle touch interactions
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Add touch-specific interactions for portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.classList.toggle('touch-focus');
            });
        });
    } else {
        document.body.classList.add('no-touch');
    }
}

// Responsive Timeline Progress
function updateTimelineProgressResponsive() {
    const timelineProgress = document.querySelector('.timeline-progress');
    if (!timelineProgress) return;
    
    const timelineWrapper = document.querySelector('.timeline-wrapper');
    const viewportHeight = window.innerHeight;
    
    function updateProgress() {
        if (!timelineWrapper) return;
        
        const wrapperPosition = timelineWrapper.getBoundingClientRect();
        
        // Only update if timeline is in viewport
        if (wrapperPosition.top < viewportHeight && wrapperPosition.bottom > 0) {
            // Calculate how much of the timeline is visible
            const visibleAmount = Math.min(
                (viewportHeight - wrapperPosition.top) / wrapperPosition.height,
                1.0
            );
            timelineProgress.style.width = `${visibleAmount * 100}%`;
        }
    }
    
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    
    // Initial check
    updateProgress();
}

// Initialize all responsive features
function initResponsiveFeatures() {
    setupMobileNavigation();
    lazyLoadImages();
    optimizeForDevice();
    updateTimelineProgressResponsive();
    
    // Recalculate on resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            optimizeForDevice();
        }, 250);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize preloader
    setTimeout(hideProgress, 1000);
    
    // Initialize animations
    initTextAnimations();
    initSectionTransitions();
    createStarParticles();
    
    // Initialize interactive elements
    animateOnScroll();
    initInteractiveElements();
    initTechStack();
    
    // Initialize timelines
    initEducationTimeline();
    initJourneyTimeline();
    
    // Initialize navigation
    setupMobileNavigation();
    
    // Initialize testimonial slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (slides.length > 0 && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }
    
    // Initialize responsive enhancements
    initPageEnhancements();
});

// Detect touch devices and add class to body
function detectTouchDevice() {
    const isTouchDevice = 'ontouchstart' in window || 
                         navigator.maxTouchPoints > 0 ||
                         navigator.msMaxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
}

// Add touch interactions for better mobile experience
function enhanceTouchInteractions() {
    // Handle portfolio items for touch devices
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.classList.add('touch-focus');
        });
        
        // Remove the class when touching outside
        document.addEventListener('touchstart', function(e) {
            if (!item.contains(e.target)) {
                item.classList.remove('touch-focus');
            }
        });
    });
    
    // Enhanced touch feedback for buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        button.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Performance optimizations based on device capabilities
function optimizeForDeviceCapabilities() {
    // Check if device is low-end based on memory and processor
    const isLowEndDevice = navigator.deviceMemory < 4 || 
                          navigator.hardwareConcurrency < 4;
    
    // Reduce animations and effects for low-end devices
    if (isLowEndDevice) {
        document.body.classList.add('reduced-motion');
        
        // Reduce particle count if particles.js is used
        if (typeof pJSDom !== 'undefined' && pJSDom.length > 0) {
            const particlesConfig = pJSDom[0].pJS.particles;
            particlesConfig.number.value = Math.floor(particlesConfig.number.value / 3);
            particlesConfig.move.speed = particlesConfig.move.speed / 2;
        }
        
        // Disable some animations
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(el => {
            el.classList.remove('animate-on-scroll');
            el.classList.add('no-animation');
        });
    }
}

// Add font loading event
function handleFontLoading() {
    document.documentElement.classList.add('wf-loading');
    
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
            document.documentElement.classList.remove('wf-loading');
            document.documentElement.classList.add('wf-active');
        }).catch(() => {
            document.documentElement.classList.remove('wf-loading');
            document.documentElement.classList.add('wf-inactive');
        });
    } else {
        // Fallback for browsers that don't support document.fonts
        setTimeout(() => {
            document.documentElement.classList.remove('wf-loading');
            document.documentElement.classList.add('wf-inactive');
        }, 300);
    }
}

// Add skip to content link for accessibility
function addSkipToContentLink() {
    const main = document.querySelector('main') || document.querySelector('section:first-of-type');
    
    if (main && !document.querySelector('.skip-to-content')) {
        // Create skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#' + (main.id || 'main-content');
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to content';
        
        // Add ID to main if it doesn't have one
        if (!main.id) {
            main.id = 'main-content';
        }
        
        // Insert at the beginning of body
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// Detect keyboard navigation
function detectKeyboardNavigation() {
    // Add initial class to body
    document.body.classList.add('keyboard-focus');
    
    // Listen for mouse/touch interaction to remove class
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-focus');
    });
    
    document.addEventListener('touchstart', () => {
        document.body.classList.remove('keyboard-focus');
    });
    
    // Restore class on tab key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-focus');
        }
    });
}

// Initialize all accessibility features
function initAccessibilityFeatures() {
    addSkipToContentLink();
    detectKeyboardNavigation();
    
    // Add no-js class removal
    document.documentElement.classList.remove('no-js');
}

// Initialize all responsive features and accessibility
function initPageEnhancements() {
    detectTouchDevice();
    lazyLoadImages();
    enhanceTouchInteractions();
    optimizeForDeviceCapabilities();
    handleFontLoading();
    initBackToTop();
    initAccessibilityFeatures();
    
    // Update on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (typeof updateTimelineProgressResponsive === 'function') {
                updateTimelineProgressResponsive();
            }
        }, 250);
    });
} 