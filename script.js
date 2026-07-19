function sendFeedback(event) {
    event.preventDefault(); // Prevents the page from reloading

    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    // UI Feedback: Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Replace these with your actual dashboard IDs
    const serviceID = 'service_l9kz9ak';
    const templateID = 'template_p9qfmno';

    // EmailJS automatically collects all inputs with 'name' attributes inside the form
    emailjs.sendForm(serviceID, templateID, form)
        .then(() => {
            alert('Thank you for your feedback!');
            form.reset(); // Clears all inputs and stars
            toggleOverlay(); // Closes the overlay menu
        })
        .catch((err) => {
            alert('Failed to send feedback. Please try again.');
            console.error('EmailJS Error:', err);
        })
        .finally(() => {
            // Reset button state
            submitBtn.textContent = 'Submit Review';
            submitBtn.disabled = false;
        });
}
