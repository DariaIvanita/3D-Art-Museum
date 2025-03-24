// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
scene.add(floor);

// Create walls
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
const wallGeometry = new THREE.PlaneGeometry(20, 10);

// Create and position walls
const walls = [
  { position: [0, 5, -10], rotation: [0, 0, 0] }, // Back wall
  { position: [-10, 5, -5], rotation: [0, Math.PI / 2, 0] }, // Left wall
  { position: [10, 5, -5], rotation: [0, -Math.PI / 2, 0] } // Right wall
];

walls.forEach((wall) => {
  const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
  wallMesh.position.set(...wall.position);
  wallMesh.rotation.set(...wall.rotation);
  scene.add(wallMesh);
});

// Create paintings and frames
const paintings = [
  'the_creation_of_adam.jpg.jpg',
  'the_last_judgement.jpg.jpg',
  'the_prophet_jeremiah.jpg.jpg',
  'the_libyan_sibyl.jpg.jpg',
  'the_deluge.jpg.jpg',
  'the_seperation_of_light_and_darkness.jpg.jpg'
];

const paintingPositions = [
  [-4, 5, -9], [4, 5, -9],
  [-9, 5, -2], [-9, 5, -6],
  [9, 5, -2], [9, 5, -6]
];

// Loading manager and texture loader
const loadingManager = new THREE.LoadingManager(() => {
  animate();
});

const textureLoader = new THREE.TextureLoader(loadingManager);

// Create and position paintings
paintings.forEach((painting, index) => {
  const texture = textureLoader.load(painting);
  const paintingGeometry = new THREE.PlaneGeometry(3, 2);
  const paintingMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const paintingMesh = new THREE.Mesh(paintingGeometry, paintingMaterial);

  // Set position and adding frame
  paintingMesh.position.set(...paintingPositions[index]);
  
  const frameGeometry = new THREE.PlaneGeometry(3.2, 2.2);
  const frameMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513, side: THREE.DoubleSide }); // Brown for frame
  const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
  
  frameMesh.position.copy(paintingMesh.position);
  frameMesh.position.z += 0.02; // Enhanced depth for frame

  scene.add(frameMesh);
  scene.add(paintingMesh);
});

// Title "Michelangelo"
const loader = new THREE.FontLoader();
loader.load('path/to/font.json', (font) => {
  const titleGeometry = new THREE.TextGeometry('Michelangelo', {
    font: font,
    size: 1,
    height: 0.1,
  });
  const titleMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const titleMesh = new THREE.Mesh(titleGeometry, titleMaterial);
  titleMesh.position.set(0, 7, -10); // Adjusted position above the back wall
  scene.add(titleMesh);
});

// Camera position
camera.position.set(0, 3, 15); // Adjusting to capture the scene

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
