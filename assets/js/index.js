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

// top button
document.addEventListener("DOMContentLoaded", () => {
    const topButton = document.createElement("button");
    topButton.innerHTML = `<i class="fas fa-chevron-up"></i>`; 
    topButton.className =
        "scroll-to-top fixed bottom-6 right-6 bg-orange-500 text-white text-lg w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-all duration-300 ease-in-out transform scale-0 opacity-0 hover:bg-orange-600 hover:shadow-lg focus:outline-none";

    topButton.setAttribute("aria-label", "Scroll to top");
    document.body.appendChild(topButton);

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            topButton.classList.add("scale-100", "opacity-100");
        } else {
            topButton.classList.remove("scale-100", "opacity-100");
        }
    });

    topButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// navigation
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelectorAll(".navLinks");
const searchBtn = document.querySelector(".searchBtn")
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
    settingsList.classList.add("hidden");
});

searchBtn.addEventListener("click", () => {
    navLinks.forEach(link => {
        if (link.classList.contains("hidden")) {
            link.classList.remove("hidden");
        } else {
            link.classList.add("hidden");
        }
    });
    settingsList.classList.add("hidden");
});

settings.addEventListener("click", () => {
    navLinks.forEach(link => {       
        link.classList.remove("hidden");
    });
    settingsList.classList.toggle("hidden");
});

settingsList.addEventListener("click",()=>{
    navLinks.forEach(link => {
        link.classList.add("hidden");
    });
    settingsList.classList.add("hidden");
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
    if (theme === "system") {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.className = prefersDark ? "dark" : "";
        localStorage.removeItem('theme');
    } else {
        document.documentElement.className = theme === "dark" ? "dark" : "";
        localStorage.setItem('theme', theme); 
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme("system");
    }
});

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
        { threshold: 0.1 }
    );

    const elementsToObserve = [
        ...document.querySelectorAll("section"),
        ...document.querySelectorAll(".section-title"),
        ...document.querySelectorAll(".stat-item"),
        ...document.querySelectorAll(".box-item"),
        ...document.querySelectorAll(".form-group"),
        document.querySelector(".hero-text"),
        document.querySelector(".hero-image"),
        document.querySelector(".skills"),
        document.querySelector(".stats"),
        document.querySelector(".lang"),
        document.querySelector(".trophy"),
        document.querySelector(".streak"),
        document.querySelector(".gitContribution"),
        document.querySelector(".contributions"),
        document.querySelector(".submit-btn"),
        document.querySelector(".buyMeCoffee")
    ].filter(Boolean);

    elementsToObserve.forEach((element) => {
        observer.observe(element);
    });
});

// Hero Text Typing Effect
const headTextArray = ["Hello, I'm Poovarasan"];

const typeEffect = (elementId, textArray, delay) => {
    let index = 0;
    let textIndex = 0;
    const element = document.getElementById(elementId);

    const type = () => {
        if (index < textArray[textIndex].length) {
            element.textContent += textArray[textIndex].charAt(index);
            index++;
            setTimeout(type, delay); 
        } else {
            textIndex++;
            if (textIndex < textArray.length) {
                setTimeout(() => {
                    element.textContent = "";
                    index = 0;
                    type();
                }, 500);
            }
        }
    };

    type();
};

window.onload = () => {
    typeEffect("headTyping", headTextArray, 200);
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
    document.getElementById("upiPayment").style.display = (paymentType === "upi") ? "flex" : "none";
}