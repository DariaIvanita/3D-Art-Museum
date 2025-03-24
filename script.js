// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Floor
const floorGeometry = new THREE.PlaneGeometry(500, 500);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Walls (4 walls of the gallery)
const wallGeometry = new THREE.PlaneGeometry(500, 500);
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd, side: THREE.DoubleSide });

// Wall 1 (Front wall)
const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
wall1.position.set(0, 250, -250);
wall1.rotation.y = Math.PI;
scene.add(wall1);

// Wall 2 (Right wall)
const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
wall2.position.set(250, 250, 0);
wall2.rotation.y = Math.PI / 2;
scene.add(wall2);

// Wall 3 (Left wall)
const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
wall3.position.set(-250, 250, 0);
wall3.rotation.y = -Math.PI / 2;
scene.add(wall3);

// Wall 4 (Back wall)
const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
wall4.position.set(0, 250, 250);
scene.add(wall4);

// Light source
const light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(0, 500, 0);
scene.add(light);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0x404040); // Soft light
scene.add(ambientLight);

// Painting Texture Loading
const textureLoader = new THREE.TextureLoader();
const paintings = [
  'the_creation_of_adam.jpg,jpg',
  'the_last_judgement.jpg.jpg',
  'the_prophet.jpg.jpg',
  'the_libyan_sibyl.jpg.jpg',
  'the_deluge.jpg.jpg',
  'the_seperation_of_light_and_darkness.jpg.jpg'
];

// Display Paintings
const paintingWidth = 150;
const paintingHeight = 200;
const paintingsMesh = [];

// Front Wall
for (let i = 0; i < 3; i++) {
  const texture = textureLoader.load(paintings[i]);
  const paintingMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const paintingGeometry = new THREE.PlaneGeometry(paintingWidth, paintingHeight);
  const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
  painting.position.set(-150 + i * 150, 300, -250); // Adjust position for spacing
  scene.add(painting);
  paintingsMesh.push(painting);
}

// Back Wall
for (let i = 0; i < 3; i++) {
  const texture = textureLoader.load(paintings[i + 3]);
  const paintingMaterial = new THREE.MeshBasicMaterial({ map: texture });
  const paintingGeometry = new THREE.PlaneGeometry(paintingWidth, paintingHeight);
  const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
  painting.position.set(-150 + i * 150, 300, 250); // Adjust position for spacing
  scene.add(painting);
  paintingsMesh.push(painting);
}

// Camera Position
camera.position.z = 500;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();

// Handle Keyboard for Navigation
window.addEventListener('keydown', (event) => {
  const speed = 10;
  if (event.key === 'ArrowUp') camera.position.z -= speed;
  if (event.key === 'ArrowDown') camera.position.z += speed;
  if (event.key === 'ArrowLeft') camera.position.x -= speed;
  if (event.key === 'ArrowRight') camera.position.x += speed;
});









