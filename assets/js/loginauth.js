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

// Function to increment viewer count
const incrementViewerCount = async () => {
    const docRef = doc(db, "siteStats", "viewerCount");
    try {
        await updateDoc(docRef, { count: increment(1) });
    } catch (error) {
        if (error.code === 'not-found') {
            await setDoc(docRef, { count: 1 });
        } else {
            console.error("Error incrementing viewer count:", error);
        }
    }
};

// Function to increment login count
const incrementLoginCount = async () => {
    const docRef = doc(db, "siteStats", "loginCount");
    try {
        await updateDoc(docRef, { count: increment(1) });
    } catch (error) {
        if (error.code === 'not-found') {
            await setDoc(docRef, { count: 1 });
        } else {
            console.error("Error incrementing login count:", error);
        }
    }
};

// Function to get viewer and login counts
const getCounts = async () => {
    const viewerDocRef = doc(db, "siteStats", "viewerCount");
    const loginDocRef = doc(db, "siteStats", "loginCount");

    try {
        const viewerDocSnap = await getDoc(viewerDocRef);
        const loginDocSnap = await getDoc(loginDocRef);

        if (viewerDocSnap.exists()) {
            document.querySelector('.view').innerText = viewerDocSnap.data().count;
        } else {
            document.querySelector('.view').innerText = 0;
        }

        if (loginDocSnap.exists()) {
            document.querySelector('.login').innerText = loginDocSnap.data().count;
        } else {
            document.querySelector('.login').innerText = 0;
        }
    } catch (error) {
        console.error("Error getting counts:", error);
    }
};

// Increment viewer count on page load
window.addEventListener('load', incrementViewerCount);

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
                incrementLoginCount();
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
    getCounts();
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
