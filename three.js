// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Background color
renderer.setClearColor(0xcccccc, 1);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(6, 10, 6);
scene.add(directionalLight);

// Floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Roof
const roofGeometry = new THREE.PlaneGeometry(20, 20);
const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x333333, side: THREE.DoubleSide });
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
roof.rotation.x = Math.PI / 2;
roof.position.set(0, 10, 0);
scene.add(roof);

// Walls
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
const wallGeometry = new THREE.PlaneGeometry(20, 10);

// Front Wall
const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
frontWall.position.set(0, 5, -10);
scene.add(frontWall);

// Paintings array for interaction
const paintings = [];

// Painting data
const paintingData = [
  {
    image: 'path/to/painting1.jpg',
    title: 'Starry Night',
    description: 'A masterpiece by Vincent van Gogh, painted in 1889.',
    position: { x: -5, y: 5, z: -9.9 }
  },
  {
    image: 'path/to/painting2.jpg',
    title: 'The Scream',
    description: 'A famous painting by Edvard Munch, symbolizing existential angst.',
    position: { x: 5, y: 5, z: -9.9 }
  }
];

// Load and add paintings to scene
const loader = new THREE.TextureLoader();
paintingData.forEach((data) => {
  loader.load(data.image, (texture) => {
    const geometry = new THREE.PlaneGeometry(4, 3);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const painting = new THREE.Mesh(geometry, material);
    painting.position.set(data.position.x, data.position.y, data.position.z);
    painting.userData = {
      image: data.image,
      title: data.title,
      description: data.description
    };
    scene.add(painting);
    paintings.push(painting);
  });
});

// Camera position
camera.position.set(0, 5, 10);

// Raycaster for interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(paintings);

  if (intersects.length > 0) {
    const painting = intersects[0].object;
    const { image, title, description } = painting.userData;

    // Show modal
    document.getElementById('modalImage').src = image;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDescription').textContent = description;
    document.getElementById('infoModal').style.display = 'block';
  }
}

window.addEventListener('click', onMouseClick);

// Close modal
document.getElementById('closeBtn').addEventListener('click', () => {
  document.getElementById('infoModal').style.display = 'none';
});

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();


















