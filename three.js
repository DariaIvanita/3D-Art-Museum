// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.3,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
scene.add(new THREE.AmbientLight(0x404040, 2));
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(6, 10, 6);
scene.add(directionalLight);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshLambertMaterial({ color: 0x8b4513, side: THREE.DoubleSide })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Roof
const roof = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshLambertMaterial({ color: 0x333333, side: THREE.DoubleSide })
);
roof.rotation.x = Math.PI / 2;
roof.position.set(0, 10, 0);
scene.add(roof);

// Wall materials
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
const wallGeometry = new THREE.PlaneGeometry(20, 10);

// Create walls
const walls = [
  { position: { x: 0, y: 5, z: -10 }, rotation: 0 }, // Front Wall
  { position: { x: 0, y: 5, z: 10 }, rotation: Math.PI }, // Back Wall
  { position: { x: -10, y: 5, z: 0 }, rotation: Math.PI / 2 }, // Left Wall
  { position: { x: 10, y: 5, z: 0 }, rotation: -Math.PI / 2 }, // Right Wall
];

walls.forEach((wall) => {
  const mesh = new THREE.Mesh(wallGeometry, wallMaterial);
  mesh.position.set(wall.position.x, wall.position.y, wall.position.z);
  mesh.rotation.y = wall.rotation;
  scene.add(mesh);
});

// Painting data (6 paintings)
const paintingData = [
  { title: "The Creation Of Adam", image: "the_creation_of_adam.jpg", position: { x: -6.5, y: 5, z: -9.8 } },
  { title: "The Last Judgement", image: "the_last_judgement.jpg", position: { x: -3.3, y: 5, z: -9.8 } },
  { title: "The Prophet Jeremiah", image: "the_prophet_jeremiah.jpg", position: { x: 0, y: 5, z: -9.8 } },
  { title: "The Libyan Sibyl", image: "the_libyan_sibyl.jpg", position: { x: 3.3, y: 5, z: -9.8 } },
  { title: "The Deluge", image: "the_deluge.jpg", position: { x: 6.5, y: 5, z: -9.8 } },
  { title: "The Separation Of Light And Darkness", image: "the_separation_of_light_and_darkness.jpg", position: { x: 9.7, y: 5, z: -9.8 } }
];

// Add paintings to the scene
const clickableObjects = [];
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

paintingData.forEach((painting, index) => {
  const texture = new THREE.TextureLoader().load(painting.image);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const geometry = new THREE.PlaneGeometry(2.5, 3.5);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(painting.position.x, painting.position.y, painting.position.z);
  mesh.userData = painting;  // Store data for later use
  scene.add(mesh);
  clickableObjects.push(mesh);

  // Apply 3D effect (hover)
  mesh.scale.set(1, 1, 1);
  mesh.rotation.y = Math.random() * Math.PI;  // Randomize initial rotation for more natural placement

  // Hover effect for 3D pop
  mesh.onmouseenter = () => {
    mesh.scale.set(1.1, 1.1, 1);  // Slightly enlarge
  };
  mesh.onmouseleave = () => {
    mesh.scale.set(1, 1, 1);  // Reset size
  };
});

// Camera position
camera.position.set(0, 5, 15);
camera.lookAt(0, 5, -10);

// Mouse click handler for painting info
window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(clickableObjects);

  if (intersects.length > 0) {
    const painting = intersects[0].object.userData;
    alert(`You clicked on: ${painting.title}`);
  }
});

// Handle window resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();























