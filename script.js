import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("gallery-container").appendChild(renderer.domElement);

// Floor
const floorGeometry = new THREE.PlaneGeometry(500, 500);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x999999, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = - Math.PI / 2;
scene.add(floor);

// Walls (4 walls of the gallery)
const wallGeometry = new THREE.PlaneGeometry(500, 500);
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd, side: THREE.DoubleSide });

// Front Wall
const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
wall1.position.set(0, 250, -250);
wall1.rotation.y = Math.PI;
scene.add(wall1);

// Right Wall
const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
wall2.position.set(250, 250, 0);
wall2.rotation.y = Math.PI / 2;
scene.add(wall2);

// Left Wall
const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
wall3.position.set(-250, 250, 0);
wall3.rotation.y = -Math.PI / 2;
scene.add(wall3);

// Back Wall
const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
wall4.position.set(0, 250, 250);
scene.add(wall4);

// Load Textures for Paintings (Michelangelo's Paintings)
const textureLoader = new THREE.TextureLoader();
const paintingTextures = [
  textureLoader.load('painting1.jpg'),
  textureLoader.load('painting2.jpg'),
  textureLoader.load('painting3.jpg'),
  textureLoader.load('painting4.jpg'),
  textureLoader.load('painting5.jpg'),
  textureLoader.load('painting6.jpg')
];

// Painting Geometry
const paintingWidth = 150;
const paintingHeight = 200;
const paintings = [];

// Front Wall Paintings
for (let i = 0; i < 3; i++) {
  const paintingMaterial = new THREE.MeshBasicMaterial({ map: paintingTextures[i] });
  const paintingGeometry = new THREE.PlaneGeometry(paintingWidth, paintingHeight);
  const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
  painting.position.set(-150 + i * 150, 300, -250); // Adjust position for spacing
  scene.add(painting);
  paintings.push(painting);
}

// Back Wall Paintings
for (let i = 0; i < 3; i++) {
  const paintingMaterial = new THREE.MeshBasicMaterial({ map: paintingTextures[i + 3] });
  const paintingGeometry = new THREE.PlaneGeometry(paintingWidth, paintingHeight);
  const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
  painting.position.set(-150 + i * 150, 300, 250); // Adjust position for spacing
  scene.add(painting);
  paintings.push(painting);
}

// Light Source
const light = new THREE.PointLight(0xffffff, 1, 1000);
light.position.set(0, 500, 0);
scene.add(light);

// Camera Position
camera.position.set(0, 150, 500);
camera.lookAt(0, 150, 0); // Ensure the camera faces the center

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










