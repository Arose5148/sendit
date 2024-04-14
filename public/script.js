// script.js

// JavaScript code for lightbox functionality
function openLightbox(img) {
    var lightbox = document.getElementById("lightbox");
    var lightboxImage = document.getElementById("lightboxImage");
    lightboxImage.src = img.src;
    lightbox.style.display = "block";
    document.addEventListener("keydown", handleKeyPress);
    lightbox.addEventListener("click", closeLightbox);
}

function closeLightbox() {
    var lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
    document.removeEventListener("keydown", handleKeyPress);
    lightbox.removeEventListener("click", closeLightbox);
}

function handleKeyPress(event) {
    if (event.key === "Escape") {
        closeLightbox();
    }
}

function handleLightboxClick(event) {
    var lightbox = document.getElementById("lightbox");
    if (event.target === lightbox) {
        closeLightbox();
    }
}

// Attach event listener to the lightbox element
var lightbox = document.getElementById("lightbox");
lightbox.addEventListener("click", handleLightboxClick);

// Enhance form submission with AJAX for asynchronous behavior
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission action

            // Create FormData object from the form
            const formData = new FormData(this);

            // Perform the fetch request to send form data
            fetch('/submit-form', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(html => {
                // Update the DOM with a success message or redirect, etc.
                // Here we'll assume you want to display a simple message
                // You can modify this part to suit your specific needs
                document.body.innerHTML = html;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error processing your request. Please try again later.');
            });
        });
    }
});
