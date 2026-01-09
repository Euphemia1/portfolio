// Preloader: Show bouncing letters for 5 seconds, then hide preloader and show site
window.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.pointerEvents = 'none';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500); // 1.5 seconds
});

// Hamburger menu for mobile nav
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('open');
        });
        // Close nav when clicking a link (for better UX)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('open'));
        });
    }
});

async function askAI() {
    const input = document.getElementById("ai-input");
    const output = document.getElementById("ai-output");

    if (!input || !output) return;

    const question = input.value.trim();
    if (!question) {
        output.textContent = "Please enter a question.";
        return;
    }

    output.textContent = "Thinking...";

    try {
        const response = await fetch("/api/ask.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: question })
        });

        const data = await response.json();

        const answer =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Sorry, I couldn't generate a response.";

        output.textContent = answer;
    } catch (error) {
        console.error(error);
        output.textContent = "Something went wrong. Please try again.";
    }
}