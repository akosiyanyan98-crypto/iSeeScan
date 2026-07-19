function sendFeedback(event) {
    // 1. Prevent the page from automatically refreshing on submit
    event.preventDefault(); 

    // 2. Safely grab the selected star rating value
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    const ratingValue = selectedRating ? selectedRating.value : "No rating given";

    // 3. Build the parms object just like your original sendMail format
    let parms = {
        rating: ratingValue,
        email: document.querySelector('input[name="sender_email"]').value,
        message: document.getElementById('feedbackComment').value
    };

    // UI Feedback: Optional loading state for your button
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // 4. Send using your specific EmailJS credentials
    emailjs.send("service_l9kz9ak", "template_p9qfmno", parms)
        .then(() => {
            alert("Feedback sent successfully!");
            
            // Clear the form fields
            document.getElementById('feedbackForm').reset();
            
            // If you have a toggleOverlay function, close it here
            if (typeof toggleOverlay === "function") {
                toggleOverlay();
            }
        })
        .catch((err) => {
            alert("Failed to send feedback. Please try again.");
            console.error("EmailJS Error:", err);
        })
        .finally(() => {
            // Revert button back to normal
            submitBtn.textContent = 'Submit Review';
            submitBtn.disabled = false;
        });
}
