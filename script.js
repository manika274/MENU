// --- Page Loading Animation Logic ---
window.addEventListener('load', function() {
    // Fade out the loader after 3 seconds
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) { // Check if element exists
            loader.style.opacity = '0';
            // Completely hide the loader after its fade-out transition
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.style.overflow = 'auto'; // Re-enable scrolling
            }, 500); // Matches the loader's opacity transition duration
        }
    }, 3000); // 3-second delay before fading out
});

// --- Scroll Progress Bar Logic ---
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) { // Check if element exists
        const scrollTop = window.pageYOffset;
        // Calculate document height minus viewport height to get scrollable height
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        // Calculate scroll percentage
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%'; // Update width of the progress bar
    }
}

// --- Navbar Scroll Effect Logic ---
function updateNavbar() {
    const navbar = document.getElementById('navbar');
    if (navbar) { // Check if element exists
        // Add 'scrolled' class when scrolled down more than 100px
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}

// --- Fade In Animation Logic (for elements entering viewport) ---
function fadeInElements() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top; // Top edge of the element relative to viewport
        const windowHeight = window.innerHeight; // Height of the viewport
        
        // If the element's top is within 100px of the bottom of the viewport, make it visible
        if (elementTop < windowHeight - 100) {
            element.classList.add('visible');
        } else {
            // Optional: remove 'visible' class if element scrolls out of view upwards
            // element.classList.remove('visible');
        }
    });
}

// --- Event Listeners for Scroll and DOM ready ---
window.addEventListener('scroll', function() {
    updateScrollProgress(); // Update scroll progress bar
    updateNavbar(); // Update navbar appearance
    fadeInElements(); // Trigger fade-in animations
});

// Initial call to fadeInElements in case elements are already in view on load
window.addEventListener('DOMContentLoaded', fadeInElements);

// --- Smooth Scrolling using jQuery ---
$(document).ready(function() {
    // Smooth scrolling for all anchor links that point to IDs within the page
    $('a[href^="#"]').on('click', function(event) {
        // Check if the link points to an actual element on the page
        const target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault(); // Prevent default anchor jump
            // Animate the scroll to the target element's position, adjusting for fixed navbar height
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80 // Adjust -80px for fixed navbar
            }, 1000, 'easeInOutCubic', function() {
                // After animation, ensure the URL hash is updated without a jump
                window.location.hash = target.selector;
            });
        }
    });
    // Fix for mobile menu closing after click
    $('.navbar-nav li a').on('click', function() {
        if ($(window).width() < 768) { // Only for mobile view
            $('.navbar-collapse').collapse('hide');
        }
    });

    // --- Price Description Toggle Logic ---
    // Attach a click event listener to all buttons with the class 'show-price-btn'
    $('.show-price-btn').on('click', function() {
        // Get the target ID from the 'data-target' attribute of the clicked button
        const targetId = $(this).data('target');
        // Select the price description element using its ID
        const priceDescription = $('#' + targetId);
        
        // Toggle the 'show' class on the price description element
        // The 'show' class will control its display (block/none) and opacity via CSS
        priceDescription.toggleClass('show');
        
        // Change button text based on visibility
        if (priceDescription.hasClass('show')) {
            $(this).text('Hide Price');
        } else {
            $(this).text('Show Price');
        }
    });
});
