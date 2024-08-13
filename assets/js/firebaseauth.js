// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxg_fq-PK70BthoZGgIBipr6MJ61lKMns",
    authDomain: "portfolio-9b60f.firebaseapp.com",
    projectId: "portfolio-9b60f",
    storageBucket: "portfolio-9b60f.appspot.com",
    messagingSenderId: "341642181076",
    appId: "1:341642181076:web:53dc569fe5d9b31226bff2",
    measurementId: "G-K90NRS53QL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();

// Function to handle redirection
function redirectToHome() {
    window.location.href = 'index.html';
}

// Sign Up with Email and Password
document.getElementById("signUpForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const fName = document.getElementById("fName").value;
    const lName = document.getElementById("lName").value;
    const email = document.getElementById("emailSignUp").value;
    const password = document.getElementById("passwordSignUp").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return setDoc(doc(db, "users", user.uid), {
                firstName: fName,
                lastName: lName,
                email: email
            });
        })
        .then(() => {
            redirectToHome();
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});

// Sign In with Email and Password
document.getElementById("signInForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("emailSignIn").value;
    const password = document.getElementById("passwordSignIn").value;

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            redirectToHome();
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});

// Google Sign In
const googleProvider = new GoogleAuthProvider();
document.getElementById("googleSignUp").addEventListener("click", () => {
    signInWithPopup(auth, googleProvider)
        .then(() => {
            redirectToHome();
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});
document.getElementById("googleSignIn").addEventListener("click", () => {
    signInWithPopup(auth, googleProvider)
        .then(() => {
            redirectToHome();
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});

// Facebook Sign In
const facebookProvider = new FacebookAuthProvider();
document.getElementById("facebookSignUp").addEventListener("click", () => {
    signInWithPopup(auth, facebookProvider)
        .then(() => {
            redirectToHome();
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});
document.getElementById("facebookSignIn").addEventListener("click", () => {
    signInWithPopup(auth, facebookProvider)
        .then(() => {
            redirectToHome();
        })
        .catch((error) => {
            alert("Error: " + error.message);
        });
});
