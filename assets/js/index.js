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

// navigation
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelectorAll(".navLinks");
const settings = document.getElementById("settings");
const settingsList = document.getElementById("settingsList");
const fullScreenName = document.getElementById("fullScreenName");

hamburger.addEventListener("click", () => {
    navLinks.forEach(link => {
        if (link.classList.contains("hidden")) {
            link.classList.remove("hidden");
        } else {
            link.classList.add("hidden");
        }
    });
});

settings.addEventListener("click", () => {
    settingsList.classList.toggle("hidden");
});

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        fullScreenName.textContent = "Exit Fullscreen";
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
        fullScreenName.textContent = "Enter Fullscreen";
    }
}

function setTheme(theme) {
    document.documentElement.className = theme === "dark" ? "dark" : theme === "light" ? "" : "system";
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if (mobileNav.classList.contains('visible')) {
                toggleMobileMenu();
            }
        }
    });
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// animation
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                } else {
                    entry.target.classList.remove("active");
                }
            });
        },
        { threshold: 0.25 }
    );

    const elementsToObserve = [
        ...document.querySelectorAll("section"),
        ...document.querySelectorAll(".section-title"),
        ...document.querySelectorAll(".stat-item"),
        ...document.querySelectorAll(".box-item"),
        ...document.querySelectorAll(".form-group"),
        document.querySelector(".hero-text"),
        document.querySelector(".skills"),
        document.querySelector(".hero-image"),
        document.querySelector(".stats"),
        document.querySelector(".lang"),
        document.querySelector(".trophy"),
        document.querySelector(".streak"),
        document.querySelector(".submit-btn"),
        document.querySelector(".buyMeCoffee")
    ].filter(Boolean);

    elementsToObserve.forEach((element) => {
        observer.observe(element);
    });
});

// Hero Text Typing Effect
const headTextArray = ["Hello, I'm Poovarasan"];
const paraTextArray = [
    "Information Science & Engineering student at UVCE, passionate about innovative solutions, Arduino projects, graphic design, and web development."
];

const typeEffect = (elementId, textArray, delay) => {
    let index = 0;
    const element = document.getElementById(elementId);

    const type = () => {
        if (index < textArray[0].length) {
            element.innerHTML += textArray[0].charAt(index);
            index++;
            setTimeout(type, delay);
        }
    };

    type();
};

window.onload = () => {
    typeEffect("headTyping", headTextArray, 150);
    setTimeout(() => typeEffect("paraTyping", paraTextArray, 75), headTextArray[0].length * 150);
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

function closeModal() {
    modal.style.display = "none";
}

window.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
};