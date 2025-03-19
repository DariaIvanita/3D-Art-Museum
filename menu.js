export const hideMenu = () => {
  const menu = document.getElementById("menu");
  if (menu) menu.style.display = "none"; // Hide the menu
};

export const showMenu = () => {
  const menu = document.getElementById("menu");
  if (menu) menu.style.display = "block"; // Show the menu
};

// Lock the pointer (controls are activated) and hide the menu when the experience starts
export const startExperience = (controls) => {
  if (controls && typeof controls.lock === "function") {
    controls.lock(); // Lock the pointer (controls are activated)
  }
  hideMenu();
};

export const setupPlayButton = (controls) => {
  document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById("explore-art-button"); // Correct button ID
    if (playButton) {
      playButton.addEventListener("click", () => startExperience(controls));
    } else {
      console.error("Explore Art button not found!");
    }
  });
};
