//Loading
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const letters = document.querySelectorAll('.loader-text span');

    letters.forEach((letter, idx) => {
        letter.style.animationDelay = `${idx * 0.1}s`;
    });

    setTimeout(() => {
        loader.style.opacity = '0';
        loader.style.display = 'none';
    }, 2000);
});

//Menu Toggle
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

// Navbar and Scroll-to-Top Button
const navbar = document.querySelector('.navbar');
const topButton = document.querySelector('.top-button');
let lastScroll = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    topButton.classList.toggle('show', window.scrollY > 300);
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const sections = document.querySelectorAll("section");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
});

sections.forEach((section) => sectionObserver.observe(section));

//Hero Text
const headTextArray = ["Hello, I'm Poovarasan"];
const paraTextArray = [
    "Information Science & Engineering student at UVCE, passionate about innovative solutions, Arduino projects, graphic design, and web development."
];

let headIndex = 0;
let paraIndex = 0;

function typeHead() {
    if (headIndex < headTextArray[0].length) {
        document.getElementById("headTyping").innerHTML += headTextArray[0].charAt(headIndex);
        headIndex++;
        setTimeout(typeHead, 150);
    } else {
        typePara();
    }
}

function typePara() {
    if (paraIndex < paraTextArray[0].length) {
        document.getElementById("paraTyping").innerHTML += paraTextArray[0].charAt(paraIndex);
        paraIndex++;
        setTimeout(typePara, 75);
    }
}

window.onload = () => {
    typeHead();
};

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