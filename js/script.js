// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    const formStatusMessage = document.querySelector('.form-status-message');
    const formInputs = contactForm.querySelectorAll('input, textarea');
    
    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateInput(this);
        });
        
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                validateInput(this);
            }
        });
    });
    
    function validateInput(input) {
        const wrapper = input.parentElement;
        const validation = wrapper.querySelector('.validation-icon');
        
        // Check if input is valid
        if (input.checkValidity() && input.value.trim() !== '') {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            validation.style.color = '#22c55e'; // green
            validation.style.opacity = '1';
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            validation.style.color = '#ef4444'; // red
            validation.style.opacity = '1';
        }
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all inputs
        let isValid = true;
        formInputs.forEach(input => {
            validateInput(input);
            if (!input.checkValidity() || input.value.trim() === '') {
                isValid = false;
            }
        });
        
        if (!isValid) {
            showFormMessage('Please fill all required fields correctly.', 'error');
            return;
        }
        
        // Show sending message
        showFormMessage('Sending your message...', 'sending');
        
        // Simulate form submission (replace with actual submission code)
        setTimeout(() => {
            // Success message
            showFormMessage('Your message has been sent successfully! I will get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            formInputs.forEach(input => {
                input.classList.remove('is-valid');
                const validation = input.parentElement.querySelector('.validation-icon');
                validation.style.opacity = '0';
            });
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                formStatusMessage.innerHTML = '';
                formStatusMessage.className = 'form-status-message';
            }, 5000);
        }, 1500);
    });
    
    function showFormMessage(message, type) {
        formStatusMessage.innerHTML = message;
        formStatusMessage.className = 'form-status-message';
        formStatusMessage.classList.add(`form-message-${type}`);
    }
}); 