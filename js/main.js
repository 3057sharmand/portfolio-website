// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load components
    loadComponents();

    // WhatsApp form submission
    const whatsappForm = document.getElementById('whatsapp-form');
    const submitWhatsAppBtn = document.getElementById('submit-whatsapp');
    
    if (submitWhatsAppBtn && whatsappForm) {
        submitWhatsAppBtn.addEventListener('click', function() {
            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const mobileField = document.getElementById('mobile');
            const messageField = document.getElementById('message');
            
            // Basic validation
            if (!nameField.value.trim() || !emailField.value.trim() || !mobileField.value.trim() || !messageField.value.trim()) {
                alert('Please fill out all fields');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Mobile validation - simple check for numeric and reasonable length
            const mobileValue = mobileField.value.trim();
            if (!/^\d{10,15}$/.test(mobileValue.replace(/[\s\-\(\)]/g, ''))) {
                alert('Please enter a valid mobile number');
                return;
            }
            
            try {
                // Format the WhatsApp message according to requested format
                const formattedMessage = `Name: ${encodeURIComponent(nameField.value)}%0A` +
                                       `Email: ${encodeURIComponent(emailField.value)}%0A` +
                                       `Mobile: ${encodeURIComponent(mobileField.value)}%0A` +
                                       `Message: ${encodeURIComponent(messageField.value)}`;
                
                // Build the WhatsApp URL with the international phone number format
                const whatsappURL = `https://wa.me/919123415695?text=${formattedMessage}`;
                
                // Open WhatsApp in a new tab
                window.open(whatsappURL, '_blank');
                
                // Reset the form
                whatsappForm.reset();
                
            } catch (error) {
                console.error('Error sending to WhatsApp:', error);
                alert('There was an issue sending your message to WhatsApp. Please try again or contact us directly at +91 9123415695');
        }
    });
    }

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });

            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('is-invalid');
                }
            }

            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // Skills progress bar animation
    const animateProgressBars = () => {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            const value = bar.getAttribute('aria-valuenow');
            bar.style.width = value + '%';
        });
    };

    // Intersection Observer for skill bars
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
            }
        });
    });

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Project filter functionality
    const projectFilters = document.querySelectorAll('.project-filter');
    const projectItems = document.querySelectorAll('.project-item');

    projectFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.getAttribute('data-filter');
            
            projectFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');

            projectItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}); 

// Function to load components
function loadComponents() {
    // Load Navigation Component
    fetch('components/nav.html')
        .then(response => response.text())
        .then(data => {
            // Extract just the nav element from the complete HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const navElement = doc.querySelector('nav');
            
            if (navElement) {
                document.getElementById('nav-container').innerHTML = navElement.outerHTML;
                // Initialize navigation event listeners after loading
                initNavListeners();
            }
        })
        .catch(error => console.error('Error loading navigation:', error));
        
    // Load Home Component
    fetch('components/home.html')
        .then(response => response.text())
        .then(data => {
            // Extract just the section element from the complete HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const sectionElement = doc.querySelector('section');
            
            if (sectionElement) {
                document.getElementById('home-container').innerHTML = sectionElement.outerHTML;
            }
        })
        .catch(error => console.error('Error loading home section:', error));
}

// Function to initialize navigation event listeners
function initNavListeners() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('#nav-container a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
} 