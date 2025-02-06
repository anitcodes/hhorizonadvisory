// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active');

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        // Simulate form submission
        console.log('Form submitted:', formObject);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        this.reset();
    });

    // Add scroll animation for services
    const serviceCards = document.querySelectorAll('.service-card');
    
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Testimonials slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }

    // Initialize testimonials
    showTestimonial(0);
    setInterval(nextTestimonial, 5000); // Change testimonial every 5 seconds

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelector('.slide-dots');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dots.appendChild(dot);
    });

    function updateSlides() {
        // Update slides
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');
        
        // Update dots
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlides();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlides();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlides();
        resetInterval();
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // Start automatic sliding
    slideInterval = setInterval(nextSlide, 5000);

    // Pause slider on hover
    const heroSlider = document.querySelector('.hero-slider');
    heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (end - start) + start);
            element.textContent = currentValue + (element.getAttribute('data-suffix') || '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Create an Intersection Observer for the stats section
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                stats.forEach(stat => {
                    const endValue = parseInt(stat.textContent);
                    stat.textContent = '0';
                    animateValue(stat, 0, endValue, 2000); // 2000ms = 2 seconds duration
                });
            }
        });
    }, { threshold: 0.5 });

    // Observe the stats container
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        statsObserver.observe(statsContainer);
    }

    // Course Slider
    const courseSlides = document.querySelectorAll('.course-slide');
    const coursePrevBtn = document.querySelector('.course-prev');
    const courseNextBtn = document.querySelector('.course-next');
    let currentCourseSlide = 0;
    let courseInterval;

    function showCourseSlide(index) {
        courseSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        courseSlides[index].classList.add('active');
    }

    function nextCourseSlide() {
        currentCourseSlide = (currentCourseSlide + 1) % courseSlides.length;
        showCourseSlide(currentCourseSlide);
    }

    function prevCourseSlide() {
        currentCourseSlide = (currentCourseSlide - 1 + courseSlides.length) % courseSlides.length;
        showCourseSlide(currentCourseSlide);
    }

    // Initialize course slider
    if (courseSlides.length > 0) {
        showCourseSlide(0);
        courseInterval = setInterval(nextCourseSlide, 5000);

        // Event listeners for course slider
        coursePrevBtn.addEventListener('click', () => {
            prevCourseSlide();
            resetCourseInterval();
        });

        courseNextBtn.addEventListener('click', () => {
            nextCourseSlide();
            resetCourseInterval();
        });

        function resetCourseInterval() {
            clearInterval(courseInterval);
            courseInterval = setInterval(nextCourseSlide, 5000);
        }

        // Pause slider on hover
        const coursesSlider = document.querySelector('.courses-slider');
        coursesSlider.addEventListener('mouseenter', () => clearInterval(courseInterval));
        coursesSlider.addEventListener('mouseleave', () => {
            courseInterval = setInterval(nextCourseSlide, 5000);
        });
    }

    // Add this to your existing JavaScript
    const dropdownToggleMobile = (e) => {
        e.preventDefault();
        smoothToggle(dropdown);
        dropdown.classList.toggle('active');
    };

    if (window.innerWidth <= 768) {
        dropdownToggle.addEventListener('click', dropdownToggleMobile);
    }

    const dropdown = document.querySelector('.dropdown');
    const dropdownToggle = dropdown.querySelector('a');

    dropdownToggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
}); 


