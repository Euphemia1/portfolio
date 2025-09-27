// Typed.js effect for hero section
// Usage: Add <script src="js/typed.js"></script> after script.js in your HTML

document.addEventListener('DOMContentLoaded', function() {
    var typedText = document.querySelector('.typed-text');
    if (!typedText) return;
    var words = [
        'software engineer',
        'innovator',
        'problem solver'
    ];
    var wordIndex = 0;
    var charIndex = 0;
    var isDeleting = false;
    var typingSpeed = 90;
    var pauseTime = 1200;

    function type() {
        var currentWord = words[wordIndex];
        if (isDeleting) {
            typedText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 400);
            } else {
                setTimeout(type, typingSpeed / 2);
            }
        } else {
            typedText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === currentWord.length) {
                isDeleting = true;
                setTimeout(type, pauseTime);
            } else {
                setTimeout(type, typingSpeed);
            }
        }
    }
    type();
});
