// THREE.js Scene Setup (unchanged)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 25);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting (unchanged)
scene.add(new THREE.AmbientLight(0x404040, 2));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(6, 10, 6);
scene.add(light);

// Add Floor, Roof, and Walls (unchanged)
// Painting Data setup (unchanged)

// Texture loader & painting placement (unchanged)

// Audio setup (unchanged)

// GLTFLoader for 3D Model (Statue)
const loader = new THREE.GLTFLoader();
let statue = null;

loader.load('3d.statue.jpg', function(gltf) {
  statue = gltf.scene;
  statue.scale.set(2, 2, 2); // You can adjust the size as needed
  statue.position.set(0, 1, 0); // Position it in the center or as needed
  statue.visible = false; // Set it as invisible by default
  scene.add(statue);
}, undefined, function(error) {
  console.error('Error loading the statue model:', error);
});

// Play Audio Button - Show Statue
document.getElementById("play-audio").addEventListener("click", () => {
  backgroundAudio.play();
  if (statue) {
    statue.visible = true; // Make the statue visible when audio starts
  }
});

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




































