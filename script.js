// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create ambient light for overall lighting
const ambientLight = new THREE.AmbientLight(0x404040, 1); // Soft white light
scene.add(ambientLight);

// Create directional light (represents sunlight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Create a point light to add realism (for better lighting on objects)
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(0, 5, 5);
scene.add(pointLight);

// Create a simple room (using MeshStandardMaterial for realism)
const roomGeometry = new THREE.BoxGeometry(10, 10, 10);
const roomMaterial = new THREE.MeshStandardMaterial({
  color: 0xeeeeee,
  roughness: 0.5,
  metalness: 0.1
});
const room = new THREE.Mesh(roomGeometry, roomMaterial);
scene.add(room);

// Apply a texture for the painting (replace this URL with an actual image if you have one)
const textureLoader = new THREE.TextureLoader();
const paintingTexture = textureLoader.load('https://via.placeholder.com/200'); // Example texture for the painting

// Create the frame around the painting (using BoxGeometry)
const frameGeometry = new THREE.BoxGeometry(4.2, 3.2, 0.2); // Slightly bigger than the painting
const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513, roughness: 0.6, metalness: 0.1 });
const frame = new THREE.Mesh(frameGeometry, frameMaterial);
frame.position.set(0, 1, -5); // Position the frame slightly in front of the painting

// Create a painting (realistic material with texture)
const paintingGeometry = new THREE.PlaneGeometry(4, 3); // A plane for the painting
const paintingMaterial = new THREE.MeshStandardMaterial({
  map: paintingTexture, // Apply the texture to the painting
  roughness: 0.8,
  metalness: 0.2
});
const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
painting.position.set(0, 1, -5); // Position it inside the frame
scene.add(painting);
scene.add(frame); // Add the frame to the scene

// Set the camera position
camera.position.z = 15;

// Add OrbitControls to move the camera around
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Add a ground plane for more realism
const groundGeometry = new THREE.PlaneGeometry(50, 50);
const groundMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = - Math.PI / 2;
ground.position.y = -5;
scene.add(ground);

// Enable shadows
renderer.shadowMap.enabled = true;
directionalLight.castShadow = true;
painting.castShadow = true;
painting.receiveShadow = true;
frame.castShadow = true;
frame.receiveShadow = true;
ground.receiveShadow = true;

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update the controls on each frame
  renderer.render(scene, camera);
}

animate();

// Handle window resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});




