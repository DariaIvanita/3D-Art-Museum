
export function setupPlayButton(controls) {
  const playButton = document.getElementById('play_button');
  const menu = document.getElementById('menu');

  if (playButton) {
    playButton.addEventListener('click', () => {
      console.log("Play button clicked!");
      menu.style.display = 'none';
      controls.enabled = true; // Enable controls for exploration
    });
  }
}

const aboutButton = document.getElementById('about_button');
const closeAbout = document.getElementById('close-about');
const aboutOverlay = document.getElementById('about-overlay');

aboutButton.addEventListener('click', () => {
  aboutOverlay.style.display = 'block';
});

closeAbout.addEventListener('click', () => {
  aboutOverlay.style.display = 'none';
});
