// Timeline Animations & Interactions

// Initialize all timeline components when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    initEducationTimeline();
    initJourneyTimeline();
});

function initEducationTimeline() {
    const timelineItems = document.querySelectorAll('.education-item');
    const certItems = document.querySelectorAll('.cert-item');
    const progressBar = document.querySelector('#education-progress');
    
    if (timelineItems.length === 0) return;

    // Initially animate the first item
    setTimeout(() => {
        animateEducationItems();
    }, 500);

    // Animate education items on scroll
    function animateEducationItems() {
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemBottom = item.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // When item is partially in viewport
            if (itemTop < windowHeight * 0.85 && itemBottom > 0) {
                item.classList.add('animate');
            }
        });

        certItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.85) {
                item.classList.add('animate');
            }
        });
    }

    // Update education timeline progress on scroll
    function updateEducationProgress() {
        if (!progressBar) return;
        
        const timeline = document.querySelector('.education-timeline');
        const timelineRect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how much of the timeline is visible
        let progress = 0;
        
        if (timelineRect.top <= 0) {
            // Timeline is at or has scrolled past the top
            const visibleHeight = Math.min(windowHeight, timelineRect.bottom);
            progress = Math.min(1, visibleHeight / timelineRect.height);
        } else if (timelineRect.top < windowHeight) {
            // Timeline is partially visible from the top
            const visibleHeight = Math.min(windowHeight - timelineRect.top, timelineRect.height);
            progress = Math.min(1, visibleHeight / timelineRect.height);
        }
        
        // Update progress bar height
        progressBar.style.height = `${progress * 100}%`;
        
        // Highlight dots that have been scrolled past
        const dots = document.querySelectorAll('.education-dot');
        dots.forEach(dot => {
            const dotRect = dot.getBoundingClientRect();
            if (dotRect.top < windowHeight * 0.7) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Show year badge on hover/touch
    timelineItems.forEach(item => {
        const dot = item.querySelector('.education-dot');
        const yearBadge = item.querySelector('.edu-year-badge');
        
        if (dot && yearBadge) {
            dot.addEventListener('mouseenter', () => {
                yearBadge.style.opacity = '1';
                yearBadge.style.transform = 'translate(-50%, -100%)';
            });
            
            dot.addEventListener('mouseleave', () => {
                yearBadge.style.opacity = '0';
                yearBadge.style.transform = 'translate(-50%, -50%)';
            });
        }
    });

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        animateEducationItems();
        updateEducationProgress();
    });

    // Initial check
    animateEducationItems();
    updateEducationProgress();
}

function initJourneyTimeline() {
    const journeyItems = document.querySelectorAll('.journey-item');
    const progressBar = document.querySelector('#journey-progress');
    
    if (journeyItems.length === 0) return;

    // Animate journey items on scroll
    function animateJourneyItems() {
        journeyItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (itemTop < windowHeight * 0.8) {
                item.classList.add('animate');
            }
        });
    }

    // Update journey timeline progress on scroll
    function updateJourneyProgress() {
        if (!progressBar) return;
        
        const timeline = document.querySelector('.journey-timeline');
        const timelineRect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate how much of the timeline is visible
        let progress = 0;
        
        if (timelineRect.top <= 0) {
            // Timeline is at or has scrolled past the top
            const visibleHeight = Math.min(windowHeight, timelineRect.bottom);
            progress = Math.min(1, visibleHeight / timelineRect.height);
        } else if (timelineRect.top < windowHeight) {
            // Timeline is partially visible from the top
            const visibleHeight = Math.min(windowHeight - timelineRect.top, timelineRect.height);
            progress = Math.min(1, visibleHeight / timelineRect.height);
        }
        
        // Update progress bar height
        progressBar.style.height = `${progress * 100}%`;
        
        // Highlight dots that have been scrolled past
        const dots = document.querySelectorAll('.journey-dot');
        dots.forEach(dot => {
            const dotRect = dot.getBoundingClientRect();
            if (dotRect.top < windowHeight * 0.7) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Add scroll event listener
    window.addEventListener('scroll', () => {
        animateJourneyItems();
        updateJourneyProgress();
    });

    // Initial check
    setTimeout(() => {
        animateJourneyItems();
        updateJourneyProgress();
    }, 500);
}

// Handle timeline responsiveness
window.addEventListener('resize', function() {
    // Re-calculate progress bars on resize
    const eduProgress = document.querySelector('#education-progress');
    const journeyProgress = document.querySelector('#journey-progress');
    
    if (eduProgress) {
        initEducationTimeline();
    }
    
    if (journeyProgress) {
        initJourneyTimeline();
    }
});

// Add active class to timeline dot when clicked
document.addEventListener('click', function(e) {
    if (e.target.closest('.education-dot')) {
        const dots = document.querySelectorAll('.education-dot');
        dots.forEach(dot => {
            dot.classList.remove('active-selected');
        });
        e.target.closest('.education-dot').classList.add('active-selected');
    }
    
    if (e.target.closest('.journey-dot')) {
        const dots = document.querySelectorAll('.journey-dot');
        dots.forEach(dot => {
            dot.classList.remove('active-selected');
        });
        e.target.closest('.journey-dot').classList.add('active-selected');
    }
}); 