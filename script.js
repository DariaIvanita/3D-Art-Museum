// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create basic ambient light source
const ambientLight = new THREE.AmbientLight(0x404040, 1); // soft white light
scene.add(ambientLight);

// Add a directional light to illuminate objects better
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Add a point light to help illuminate the scene better
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 5, 5);
scene.add(pointLight);

// Create a simple room (using MeshLambertMaterial for lighting response)
const roomGeometry = new THREE.BoxGeometry(10, 10, 10); // 10x10x10 box
const roomMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
const room = new THREE.Mesh(roomGeometry, roomMaterial);
scene.add(room);

// Create a placeholder for the painting (a simple box)
const paintingGeometry = new THREE.BoxGeometry(2, 2, 0.1); // A thin rectangle
const paintingMaterial = new THREE.MeshLambertMaterial({ color: 0x0000ff });
const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
painting.position.set(0, 0, -5); // Position it in front of the camera
scene.add(painting);

// Set the camera position
camera.position.z = 15; // Move the camera further back to view the objects

// Add OrbitControls to move the camera around
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


