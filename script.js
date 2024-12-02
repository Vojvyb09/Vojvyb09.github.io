// Otevření a zavření modálního okna
const loginButton = document.getElementById('loginButton');
const modal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');

// Otevření modálního okna
loginButton.addEventListener('click', () => {
    modal.style.display = "block";
});

// Zavření modálního okna
closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

// Přepnutí na registrační formulář
showRegister.addEventListener('click', () => {
    document.getElementById('loginForm').style.display = "none";
    document.getElementById('registerForm').style.display = "block";
});

// Přepnutí na přihlašovací formulář
showLogin.addEventListener('click', () => {
    document.getElementById('registerForm').style.display = "none";
    document.getElementById('loginForm').style.display = "block";
});

// Zavření modálního okna, pokud klikne uživatel mimo něj
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
