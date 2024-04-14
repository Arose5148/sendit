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
    const form = document.getElementById('uniqueFormId');
    console.log("Selected form:", form);

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log("Form submission prevented.");

            try {
                const formData = new FormData(form);
                console.log("FormData prepared", Array.from(formData.entries()));

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
            } catch (error) {
                console.error("Error creating FormData or submitting form:", error);
            }
        });
    } else {
        console.log("Form not found with given ID.");
    }
});



