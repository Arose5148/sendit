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

// Close the hamburger menu when making a selection
function closeMenu() {
    document.getElementById('menu-checkbox').checked = false;
}

// Hero background image loading
document.addEventListener('DOMContentLoaded', function () {
  var heroImage = document.querySelector('.hero-image');

  function loadHeroImage() {
    heroImage.classList.add('loaded');
  }

  if (heroImage.complete) {
    loadHeroImage();
  } else {
    heroImage.addEventListener('load', loadHeroImage);
  }
});