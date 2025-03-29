// THREE.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 25);
camera.lookAt(new THREE.Vector3(0, 5, 0)); // Look at the center of the scene

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting Setup
const light = new THREE.DirectionalLight(0xffffff, 2); // Increased intensity
light.position.set(6, 10, 6); // Position the light closer
scene.add(light);

scene.add(new THREE.AmbientLight(0x404040, 2)); // Increased intensity for ambient light

// Floor, Walls, and Objects (continue with your setup)

// Texture loading and painting setup
const textureLoader = new THREE.TextureLoader();
const paintingData = [
  { texture: 'the_creation_of_adam.jpg', position: [-5, 5, -10], description: '...' },
  { texture: 'the_deluge.jpg', position: [5, 5, -10], description: '...' },
  // Add your other painting data here
];

const paintings = [];
paintingData.forEach(data => {
  const texture = textureLoader.load(data.texture, () => {
    console.log(`${data.texture} loaded successfully`);
  }, undefined, () => {
    console.error(`${data.texture} failed to load`);
  });
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const painting = new THREE.Mesh(new THREE.PlaneGeometry(3, 5), material);
  painting.position.set(...data.position);
  paintings.push(painting);
  scene.add(painting);
});

// Simple Cube for Testing
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 1, 0); // Position in front of the camera
scene.add(cube);

// Animate function
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});






































