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
        console.log("Form found, adding event listener");
        form.addEventListener('submit', function(event) {
            console.log("Form element on submit:", form);
            event.preventDefault(); // Prevent the default form submission action
            
            const formData = new FormData(form);
            console.log("FormData prepared", Array.from(formData.entries())); // To see the form data

            fetch('/submit-form', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(html => {
                document.body.innerHTML = html;
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error processing your request. Please try again later.');
            });
        });
    } else {
        console.log("Form not found");
    }
});

