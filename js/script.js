/**
 * 1. EMAILJS INITIALIZATION
 */
(function() {
    emailjs.init({
        publicKey: "mj4_klMqOt_du4lXS", // Hard-code your actual key here
    });
})();


/**
 * 2. NAVIGATION SCROLL EFFECT
 */
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.padding = '12px 10%';
        nav.style.background = '#000500'; 
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        nav.style.padding = '20px 10%';
        nav.style.background = 'transparent';
        nav.style.boxShadow = 'none';
    }
});

/**
 * 3. SMOOTH SCROLLING
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const targetPosition = targetElement.offsetTop + 20;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * 4. TYPEWRITER EFFECT
 */
const textElement = document.getElementById('typewriter');
const phrases = [
    "Defending the Digital Frontier...",
    "Analyzing Vulnerabilities...",
    "Securing the Network...",
    "Encryption Complete."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; 
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);

/**
 * 5. CONSOLIDATED CONTACT FORM SUBMISSION
 */


const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const btn = document.getElementById('submit-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Transmitting...';
        btn.disabled = true; // Prevent double-clicking

        // Capture values EXACTLY when the button is clicked
        const templateParams = {
            user_name: document.getElementById('user_name').value,
            user_email: document.getElementById('user_email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Sending to Service ID and corrected Template ID
        emailjs.send('service_ircgk8m', 'template_gak0nbn', templateParams)
            .then(function() {
                btn.innerHTML = 'Message Transmitted!';
                btn.style.background = '#00ff00';
                alert('Your secure message has been sent successfully.');
                contactForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);

            }, function(error) {
                btn.innerHTML = 'Transmission Failed';
                btn.disabled = false;
                console.error("FAILED...", error);
                alert('Failed to send message: ' + JSON.stringify(error));
            });
    });
}







