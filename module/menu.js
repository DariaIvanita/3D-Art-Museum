export function setupPlayButton(controls) {
  const playButton = document.getElementById('explore-art-button');
  const menu = document.getElementById('menu');

  if (!playButton || !menu) {
    console.error("Play button or menu not found.");
    return;
  }

  playButton.addEventListener('click', () => {
    console.log("Play button clicked!");
    menu.style.display = 'none';
    if (controls) {
      controls.enabled = true; // Enable controls if defined
      console.log("Controls enabled for exploration.");
    } else {
      console.error("Controls are not initialized.");
    }
  });
}

// About Section Controls
const aboutButton = document.getElementById('about_button');
const closeAbout = document.getElementById('close-about');
const aboutOverlay = document.getElementById('about-overlay');

if (aboutButton && aboutOverlay) {
  aboutButton.addEventListener('click', () => {
    aboutOverlay.style.display = 'block';
    console.log("About overlay opened.");
  });
}

if (closeAbout && aboutOverlay) {
  closeAbout.addEventListener('click', () => {
    aboutOverlay.style.display = 'none';
    console.log("About overlay closed.");
  });
} else {
  console.error("Close button or about overlay not found.");
}
