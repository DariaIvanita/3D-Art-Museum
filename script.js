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
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Increased intensity
scene.add(ambientLight);

// Camera Position
camera.position.set(0, 150, 500);
camera.lookAt(0, 150, 0); // Ensure the camera faces the center

// Debugging: Add a simple cube to check visibility
const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 50, 0);  // Position cube in the center
scene.add(cube);

// Display Paintings (Placeholder for now)
const paintingWidth = 150;
const paintingHeight = 200;
const paintingsMesh = [];

// Front Wall
for (let i = 0; i < 3; i++) {
  const paintingMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Placeholder color
  const paintingGeometry = new THREE.PlaneGeometry(paintingWidth, paintingHeight);
  const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
  painting.position.set(-150 + i * 150, 300, -250); // Adjust position for spacing
  scene.add(painting);
  paintingsMesh.push(painting);
}

// Back Wall
for (let i = 0; i < 3; i++) {
  const paintingMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Placeholder color
  const paintingGeometry = new THREE.PlaneGeometry(paintingWidth, paintingHeight);
  const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
  painting.position.set(-150 + i * 150, 300, 250); // Adjust position for spacing
  scene.add(painting);
  paintingsMesh.push(painting);
}

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









