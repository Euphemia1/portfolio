// Preloader: Show bouncing letters for 5 seconds, then hide preloader and show site
window.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 5000); // 5 seconds
});

// (Optional) Hamburger menu and other scripts can be added here
