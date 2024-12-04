let scrollAnimationFrame = null; // To manage the animation frame
let currentScrollSpeed = 0; // Current scroll speed

// Function to calculate the scroll speed based on cursor position
function calculateScrollSpeed(cursorX, windowWidth) {
  if (cursorX > windowWidth * 0.9) {
    // Cursor is near the right edge
    return (cursorX - windowWidth * 0.9) / (windowWidth * 0.1) * 20;
  } else if (cursorX < windowWidth * 0.1) {
    // Cursor is near the left edge
    return -(windowWidth * 0.1 - cursorX) / (windowWidth * 0.1) * 20;
  } else {
    return 0; // Stop scrolling if the cursor is not near the edges
  }
}

// Function to initiate smooth scrolling
function smoothScroll() {
  if (currentScrollSpeed !== 0) {
    window.scrollBy(currentScrollSpeed, 0);
    scrollAnimationFrame = requestAnimationFrame(smoothScroll);
  } else {
    cancelAnimationFrame(scrollAnimationFrame);
    scrollAnimationFrame = null;
  }
}

// Mousemove event to control scroll speed based on cursor position
document.addEventListener('mousemove', (event) => {
  const windowWidth = window.innerWidth;
  const cursorX = event.clientX;

  // Calculate the scroll speed based on cursor position
  const newScrollSpeed = calculateScrollSpeed(cursorX, windowWidth);

  // Update the scroll speed if it changes
  if (newScrollSpeed !== currentScrollSpeed) {
    currentScrollSpeed = newScrollSpeed;

    // Start or stop scrolling based on the updated speed
    if (currentScrollSpeed !== 0 && !scrollAnimationFrame) {
      smoothScroll();
    }
  }
});

// Stop scrolling when the mouse leaves the window
document.addEventListener('mouseleave', () => {
  currentScrollSpeed = 0;
  cancelAnimationFrame(scrollAnimationFrame);
  scrollAnimationFrame = null;
});

// Hover effect for boxes
document.querySelectorAll('.box').forEach((box) => {
  box.addEventListener('mouseenter', () => {
    const infoBox = document.getElementById('infoBox');
    const text = box.getAttribute('data-text');
    const boxSize = box.offsetWidth; // Get the box width to adjust font size

    // Update the text and style of the info box
    infoBox.textContent = text;
    infoBox.style.fontSize = `${boxSize / 20}px`; // Adjust font size relative to box size
    infoBox.style.opacity = '1'; // Fade in the text
  });

  box.addEventListener('mouseleave', () => {
    const infoBox = document.getElementById('infoBox');
    infoBox.style.opacity = '0'; // Fade out the text
  });
});

// Combined window load event to ensure body visibility and remove preload class
window.addEventListener('load', () => {
  document.body.style.opacity = '1'; // Ensure the body is visible
  document.body.classList.remove('preload'); // Remove the preload class
});

document.addEventListener("DOMContentLoaded", () => {
  const aboutLink = document.getElementById("aboutLink");

  if (aboutLink) {
    aboutLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent immediate navigation

      console.log("Fade-out started"); // Debugging
      document.body.classList.add("fade-out");

      // Ensure the navigation happens only after the fade-out is complete
      setTimeout(() => {
        console.log("Navigating to about.html"); // Debugging
        window.location.href = aboutLink.href; // Navigate to the link's destination
      }, 200); // Delay navigation until after the fade-out animation completes
    });
  }
});

