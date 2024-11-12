import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
const auth = getAuth();
const db = getFirestore(app);

// Check for authentication state change
onAuthStateChanged(auth, async (user) => {
    const loginLink = document.getElementById('loginLink');
    const userDetails = document.getElementById('userDetails');

    if (user) {
        console.log("User is signed in:", user);
        const userId = user.uid;
        localStorage.setItem('loggedInUserId', userId);

        try {
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const userData = docSnap.data();
                console.log("User data:", userData);
                document.getElementById('loggedUserFName').innerText = userData.firstName;
                document.getElementById('loggedUserLName').innerText = userData.lastName;
                document.getElementById('loggedUserEmail').innerText = userData.email;
                loginLink.style.display = 'none';
                userDetails.style.display = 'block';
            } else {
                console.log("No document found matching ID");
            }
        } catch (error) {
            console.error("Error getting document:", error);
        }
    } else {
        console.log("No user is signed in.");
        loginLink.style.display = 'block';
        userDetails.style.display = 'none';
        localStorage.removeItem('loggedInUserId');
    }
});

// Handle feedback form submission
const feedbackForm = document.getElementById('feedbackForm');
feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('loggedInUserId');
    if (!userId) {
        alert("You must be logged in to submit feedback.");
        window.location.href = 'login.html';
        return;
    }

    const feedback = document.getElementById('Feedback').value;
    const rating = document.querySelector('input[name="Rating"]:checked').value;

    try {
        await setDoc(doc(db, "feedbacks", userId), {
            feedback,
            rating,
            userId,
            timestamp: new Date()
        });
        alert("Feedback submitted successfully!");
        feedbackForm.reset();
    } catch (error) {
        console.error("Error submitting feedback:", error);
        alert("Error submitting feedback. Please try again.");
    }
});

// Logout functionality
const logoutButton = document.getElementById('logout');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        signOut(auth)
            .then(() => {
                localStorage.removeItem('loggedInUserId');
                window.location.href = 'login.html';
            })
            .catch((error) => {
                console.error('Error signing out:', error);
            });
    });
} else {
    console.log("Logout button not found on the page");
}
