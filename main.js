// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadow maps
document.body.appendChild(renderer.domElement);

// Create a floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.5, metalness: 0.2 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
floor.receiveShadow = true; // Enable shadow on the floor
scene.add(floor);

// Create walls
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.5, metalness: 0.2 });
const wallGeometry = new THREE.PlaneGeometry(20, 10);

// Back wall
const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
backWall.position.set(0, 5, -10); // Centered position
backWall.receiveShadow = true;
scene.add(backWall);

// Side walls
const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
leftWall.position.set(-10, 5, 0); // Positioning left wall
leftWall.rotation.y = Math.PI / 2; // Rotate to make it vertical
leftWall.receiveShadow = true;
scene.add(leftWall);

const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
rightWall.position.set(10, 5, 0); // Positioning right wall
rightWall.rotation.y = -Math.PI / 2; // Rotate to make it vertical
rightWall.receiveShadow = true;
scene.add(rightWall);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 0);
directionalLight.castShadow = true; // Allow shadows
scene.add(directionalLight);

// Create paintings
const paintings = [
  'the_creation_of_adam.jpg',
  'the_last_judgement.jpg',
  'the_prophet_jeremiah.jpg',
  'the_libyan_sibyl.jpg',
  'the_deluge.jpg',
  'the_separation_of_light_and_darkness.jpg'
];

// Loading manager
const loadingManager = new THREE.LoadingManager(() => {
  // Start rendering once all textures are loaded
  animate();
});

// Paintings positions for each wall
const paintingPositions = [
  [-4, 5, -9], [4, 5, -9], // Back wall positions
  [-9, 5, -2], [-9, 5, -6], // Left wall positions
  [9, 5, -2], [9, 5, -6]    // Right wall positions
];

// Create and position paintings
paintings.forEach((painting, index) => {
  const textureLoader = new THREE.TextureLoader(loadingManager);
  textureLoader.load(painting, (texture) => {
    const geometry = new THREE.PlaneGeometry(3, 2);
    const material = new THREE.MeshStandardMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    
    // Set the position from the defined positions
    mesh.position.set(...paintingPositions[index]);
   
    // Add 3D effect for frame
    const frameGeometry = new THREE.BoxGeometry(3.2, 2.2, 0.05); // BoxGeometry for frame
    const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 }); // Brown for frame
    const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
    
    frameMesh.position.copy(mesh.position);
    frameMesh.position.z += 0.01; // Push the frame a little towards the camera

    scene.add(frameMesh); // Add frame to the scene
    scene.add(mesh); // Add painting to the scene
  }, undefined, () => {
    console.error(`Failed to load texture: ${painting}`);
  });
});

// Add title "Michelangelo"
const fontLoader = new THREE.FontLoader();
fontLoader.load('path/to/font.json', (font) => {
  const titleGeometry = new THREE.TextGeometry('Michelangelo', {
    font: font,
    size: 1,
    height: 0.2, // Height for a more pronounced effect
  });
  
  const titleMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
  const titleMesh = new THREE.Mesh(titleGeometry, titleMaterial);
  titleMesh.position.set(0, 9, -10); // Position above the back wall

  scene.add(titleMesh); // Add title to the scene
});

// Camera position
camera.position.set(0, 3, 15); // Adjusting camera for better 3D effects

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

// Start rendering for the first time
animate();
