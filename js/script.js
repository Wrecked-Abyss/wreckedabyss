/**
 * 1. NAVIGATION SCROLL EFFECT
 * Changes the navbar appearance when scrolling down.
 */
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.padding = '12px 10%';
        nav.style.background = '#000500'; // White background of nav bar on scroll for light theme
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        nav.style.padding = '20px 10%';
        nav.style.background = 'transparent';
        nav.style.boxShadow = 'none';
    }
});

/**
 * 2. SMOOTH SCROLLING FOR NAV LINKS
 * Manages the "glide" effect when clicking About, Writeups, or Contact.
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Get height of the nav bar
            const navHeight = document.querySelector('nav').offsetHeight;
            
            // Calculate position: Element top minus Nav height
            const targetPosition = targetElement.offsetTop + 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * 3. CONTACT FORM SUBMISSION
 * Prevents page refresh and shows a confirmation.
 */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Message Encrypted and Sent Successfully!');
        this.reset();
    });
}









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
        // Remove characters
        textElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        // Add characters
        textElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }

    // If phrase is complete
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at the end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Start the effect
document.addEventListener('DOMContentLoaded', type);

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>


(function(){
      // Replace with your Public Key from EmailJS
      emailjs.init("mZKrA0J4vYS_9o5-M");
   })();

document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault();
      
      const btn = document.getElementById('submit-btn');
      btn.innerHTML = 'Transmitting...';

        const templateParams = {
            user_name: document.getElementById('user_name').value,  // Maps to {{user_name}}
            user_email: document.getElementById('user_email').value, // Maps to {{user_email}}
            subject: document.getElementById('subject').value,       // Maps to {{subject}}
            message: document.getElementById('message').value        // Maps to {{message}}
        };

      emailjs.send('service_ircgk8m', 'template_gak0nbn', templateParams)
         .then(function() {
            btn.innerHTML = 'Message Transmitted!';
            alert('Your secure message has been sent successfully.');
            document.getElementById('contact-form').reset();
         }, function(error) {
            btn.innerHTML = 'Transmission Failed';
            alert('Failed to send message: ' + JSON.stringify(error));
         });
   });
