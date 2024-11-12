<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Auth Page</title>
    <link rel="icon" href="./assets/img/favicon.png" type="favicon">
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    animation: {
                        'bounce-slow': 'bounce 3s linear infinite',
                    }
                }
            }
        }
    </script>
    <style>
        @keyframes slideIn {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .slide-in {
            animation: slideIn 0.5s ease-out;
        }
        .loading-dots::after {
            content: '...';
            animation: dots 1.5s steps(4, end) infinite;
        }
        @keyframes dots {
            0%, 20% { content: ''; }
            40% { content: '.'; }
            60% { content: '..'; }
            80% { content: '...'; }
        }
    </style>
</head>
<body class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Theme Toggle Button -->
    <button id="themeToggle" class="fixed top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
        <svg id="sunIcon" class="w-6 h-6 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
        <svg id="moonIcon" class="w-6 h-6 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
        </svg>
    </button>

    <!-- Loading Screen -->
    <div id="loading" class="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-900 z-50">
        <div class="text-2xl font-bold text-gray-700 dark:text-gray-300">
            Loading<span class="loading-dots"></span>
        </div>
    </div>

    <!-- Main Container -->
    <div class="container mx-auto px-4 h-screen flex items-center justify-center">
        <div class="w-full max-w-md">
            <!-- Auth Card -->
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:scale-[1.02]">
                <!-- Sign In Form -->
                <div id="signInForm" class="slide-in">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Thank you for coming here</h2>
                    <form class="space-y-6">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                            <input type="email" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                            <input type="password" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                        </div>
                        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            Sign In
                        </button>
                    </form>

                    <div class="mt-6">
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
                            </div>
                        </div>

                        <div class="mt-6 grid grid-cols-2 gap-4">
                            <button class="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5 mr-2" alt="Google">
                                Google
                            </button>
                            <button class="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white">
                                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" class="w-5 h-5 mr-2" alt="Facebook">
                                Facebook
                            </button>
                        </div>
                    </div>

                    <p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                        Don't have an account?
                        <button id="showSignUp" class="font-medium text-blue-600 hover:text-blue-500">Sign up</button>
                    </p>
                </div>

                <!-- Sign Up Form -->
                <div id="signUpForm" class="hidden">
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">Create Account</h2>
                    <form class="space-y-6">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                                <input type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                                <input type="text" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                            <input type="email" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                            <input type="password" class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white" required>
                        </div>
                        <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            Sign Up
                        </button>
                    </form>

                    <div class="mt-6">
                        <div class="relative">
                            <div class="absolute inset-0 flex items-center">
                                <div class="w-full border-t border-gray-300 dark:border-gray-600"></div>
                            </div>
                            <div class="relative flex justify-center text-sm">
                                <span class="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
                            </div>
                        </div>

                        <div class="mt-6 grid grid-cols-2 gap-4">
                            <button class="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5 mr-2" alt="Google">
                                Google
                            </button>
                            <button class="flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:text-white">
                                <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" class="w-5 h-5 mr-2" alt="Facebook">
                                Facebook
                            </button>
                        </div>
                    </div>

                    <p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                        Already have an account?
                        <button id="showSignIn" class="font-medium text-blue-600 hover:text-blue-500">Sign in</button>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;

        // Check for saved theme preference
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            html.classList.add('dark');
        }

        themeToggle.addEventListener('click', () => {
            html.classList.toggle('dark');
            localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
        });

        // Form Toggle
        const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        const showSignUp = document.getElementById('showSignUp');
        const showSignIn = document.getElementById('showSignIn');

        showSignUp.addEventListener('click', () => {
            signInForm.classList.remove('slide-in');
            signInForm.classList.add('hidden');
            signUpForm.classList.remove('hidden');
            signUpForm.classList.add('slide-in');
        });

        showSignIn.addEventListener('click', () => {
            signUpForm.classList.remove('slide-in');
            signUpForm.classList.add('hidden');
            signInForm.classList.remove('hidden');
            signInForm.classList.add('slide-in');
        });

        // Loading Screen
        window.addEventListener('load', () => {
            const loading = document.getElementById('loading');
            setTimeout(() => {
                loading.style.opacity = '0';
                loading.style.transition = 'opacity 0.5s ease-out';
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 500);
            }, 1500);
        });

        // Form Submission
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const button = form.querySelector('button[type="submit"]');
                const originalText = button.textContent;
                button.disabled = true;
                button.innerHTML = `
                    <svg class="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                `;
                
                // Simulate API call
                setTimeout(() => {
                    button.disabled = false;
                    button.textContent = originalText;
                    // Add success message or redirect here
                }, 2000);
            });
        });
    </script>
</body>
</html>
