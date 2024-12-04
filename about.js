document.addEventListener("DOMContentLoaded", () => {
    // Fade in the body on load
    document.body.style.opacity = "1";
  
    // Fade out on link click
    const fadeLink = document.getElementById("fade-link");
    fadeLink.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent immediate navigation
      document.body.style.opacity = "0"; // Start fade out
      setTimeout(() => {
        window.location.href = fadeLink.href; // Navigate after fade out
      }, 500); // Match the duration of the fade effect
    });
  });
  