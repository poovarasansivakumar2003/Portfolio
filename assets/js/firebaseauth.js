// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxg_fq-PK70BthoZGgIBipr6MJ61lKMns",
    authDomain: "portfolio-9b60f.firebaseapp.com",
    projectId: "portfolio-9b60f",
    storageBucket: "portfolio-9b60f.appspot.com",
    messagingSenderId: "341642181076",
    appId: "1:341642181076:web:7036d3eb56be81b93dfe41",
    measurementId: "G-N95E2NMHSZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore(app);

// Function to display error messages
function displayError(message) {
    alert(message); // Replace with a more user-friendly error display if needed
}

// Handle Sign Up
const signUpForm = document.getElementById('signUpForm');
signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    const email = document.getElementById('emailSignUp').value;
    const password = document.getElementById('passwordSignUp').value;

    // Basic validation
    if (!email || !password || !fName || !lName) {
        displayError('All fields are required.');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store user information in Firestore
        await setDoc(doc(db, 'users', user.uid), {
            firstName: fName,
            lastName: lName,
            email: email
        });

        // Redirect to index.html after successful sign-up
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error during sign up:', error);
        displayError(error.message);
    }
});

// Handle Sign In
const signInForm = document.getElementById('signInForm');
signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('emailSignIn').value;
    const password = document.getElementById('passwordSignIn').value;

    // Basic validation
    if (!email || !password) {
        displayError('Email and Password are required.');
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);
        // Redirect to index.html after successful sign-in
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error during sign in:', error);
        displayError(error.message);
    }
});
