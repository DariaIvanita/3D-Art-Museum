// THREE.js Scene Setup (unchanged)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 25);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
scene.add(new THREE.AmbientLight(0x404040, 2));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(6, 10, 6);
scene.add(light);

// Walls setup (unchanged)

// Painting setup (unchanged)

// Raycaster and Mouse Events for clickable paintings
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.updateMatrixWorld();
  const intersects = raycaster.intersectObjects(paintings);

  if (intersects.length > 0) {
    const painting = intersects[0].object;
    const paintingData = painting.userData;
    displayPaintingDetails(paintingData.description, painting.material.map.image.src);
  }
});

// Statue setup (using image texture on a plane)
const statueTexture = new THREE.TextureLoader().load('3d.statue.jpg');
const statueMaterial = new THREE.MeshBasicMaterial({ map: statueTexture });
const statueGeometry = new THREE.PlaneGeometry(5, 5); // Adjust size as needed
const statue = new THREE.Mesh(statueGeometry, statueMaterial);
statue.position.set(0, 1, 0); // Position it in the center
statue.visible = false; // Hidden by default
scene.add(statue);

// Audio setup
const backgroundAudio = new Audio('3d.music.mp3');
let isAudioPlaying = false;

document.getElementById("play-audio").addEventListener("click", () => {
  if (isAudioPlaying) {
    backgroundAudio.pause();
    isAudioPlaying = false;
    statue.visible = false; // Hide statue when audio is off
  } else {
    backgroundAudio.play();
    isAudioPlaying = true;
    statue.visible = true; // Show statue when audio starts
  }
});

// Function to display painting details
function displayPaintingDetails(description, texture) {
  const detailsDiv = document.getElementById("painting-details");
  detailsDiv.innerHTML = `
    <h3>Painting Details</h3>
    <img src="${texture}" alt="Full Painting Image" style="width: 300px;">
    <p>${description}</p>
  `;
}

// Animate function (unchanged)
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Resize handler (unchanged)
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});





































