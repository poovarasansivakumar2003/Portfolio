document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const letters = document.querySelectorAll('.loader-text span');

    // Animate loader text letters with delays
    letters.forEach((letter, idx) => {
        letter.style.animationDelay = `${idx * 0.1}s`;
    });

    // Fade out loader after 2 seconds
    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.display = 'none';
    }, 2000);
});

// Mobile Menu Toggle
document.querySelector('.nav-links').addEventListener('click', toggleMenu);

function toggleMenu() {
    document.querySelector('.nav-links').classList.toggle('active');
}

// Smooth Scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(anchor.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Feedback Form Submission
document.getElementById('feedbackForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const feedback = document.getElementById('Feedback').value;
    const rating = document.querySelector('input[name="Rating"]:checked')?.value;

    if (!rating) {
        alert('Please select a rating');
        return;
    }

    // Handle feedback submission (e.g., API call here)
    console.log({ feedback, rating });

    // Show success message and disable submit button briefly
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.textContent = 'Thank you! 🎉';
    submitBtn.disabled = true;

    setTimeout(() => {
        this.reset();
        submitBtn.textContent = 'Submit';
        submitBtn.disabled = false;
    }, 3000);
});

// Rating Stars Animation
document.querySelectorAll('.rating-group label').forEach(label => {
    label.addEventListener('mouseover', () => label.style.transform = 'scale(1.2) rotate(5deg)');
    label.addEventListener('mouseout', () => label.style.transform = 'scale(1) rotate(0)');
});

// Modal and Payment Form Handling
const modal = document.getElementById("paymentModal");

function showModal() {
    modal.style.display = "block";
}

function showPaymentForm(paymentType) {
    document.getElementById("cardPayment").style.display = (paymentType === "card") ? "block" : "none";
    document.getElementById("upiPayment").style.display = (paymentType === "upi") ? "block" : "none";
}

window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
};

// Navbar and Scroll-to-Top Button
const navbar = document.querySelector('.navbar');
const userDetails = document.querySelector('.userDetails');
const topButton = document.querySelector('.top-button');
let lastScroll = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Navbar hide/show logic based on scroll direction
    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
        userDetails.style.display = 'none';
    } else {
        navbar.style.transform = 'translateY(0)';
        userDetails.style.display = 'block';
    }
    lastScroll = currentScroll;

    // Toggle navbar scrolled class based on position
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    userDetails.classList.toggle('scrolled', window.scrollY > 50);

    // Show/hide top button based on scroll position
    topButton.classList.toggle('show', window.scrollY > 300);
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}