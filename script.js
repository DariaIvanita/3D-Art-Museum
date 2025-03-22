// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create basic light source
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

// Add a directional light to illuminate objects better
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Create a simple room
const roomGeometry = new THREE.BoxGeometry(10, 10, 10); // 10x10x10 box
const roomMaterial = new THREE.MeshBasicMaterial({ color: 0xeeeeee, wireframe: true });
const room = new THREE.Mesh(roomGeometry, roomMaterial);
scene.add(room);

// Create a placeholder for the painting (a simple box)
const paintingGeometry = new THREE.BoxGeometry(2, 2, 0.1); // A thin rectangle
const paintingMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
painting.position.set(0, 0, -5); // Position it in front of the camera
scene.add(painting);

// Set camera position
camera.position.z = 5;

// Add Orbit Controls (to move the camera around the scene)
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update the controls on each frame
  renderer.render(scene, camera);
}

animate();

// Handle resizing of the window
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

