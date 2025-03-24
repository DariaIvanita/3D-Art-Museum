// gallery.js

// Scene, Camera, and Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create the floor
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
scene.add(floor);

// Create the walls
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
const wallGeometry = new THREE.PlaneGeometry(10, 5);

// Create 4 walls
const walls = [
    new THREE.Mesh(wallGeometry, wallMaterial), // Front wall
    new THREE.Mesh(wallGeometry, wallMaterial), // Back wall
    new THREE.Mesh(wallGeometry, wallMaterial), // Left wall
    new THREE.Mesh(wallGeometry, wallMaterial)  // Right wall
];

// Position the walls
walls[0].position.z = -2.5; // Front wall
walls[1].position.z = 2.5;  // Back wall
walls[2].rotation.y = Math.PI / 2; // Left wall
walls[2].position.x = -5; // Left wall
walls[3].rotation.y = -Math.PI / 2; // Right wall
walls[3].position.x = 5; // Right wall

walls.forEach(wall => scene.add(wall));

// Load paintings (replace with actual image URLs)
const paintings = [
    'https://example.com/painting1.jpg',
    'https://example.com/painting2.jpg',
    'https://example.com/painting3.jpg',
    'https://example.com/painting4.jpg',
    'https://example.com/painting5.jpg',
    'https://example.com/painting6.jpg'
];

// Create paintings
const paintingGeometry = new THREE.PlaneGeometry(1.5, 2);
const paintingMaterialArray = paintings.map(url => {
    const texture = new THREE.TextureLoader().load(url);
    return new THREE.MeshBasicMaterial({ map: texture });
});

const paintingMeshes = paintingMaterialArray.map(material => new THREE.Mesh(paintingGeometry, material));

// Position paintings on the walls
const positions = [
    { x: -4, y: 0, z: -2.5 }, // Left wall
    { x: -2, y: 0, z: -2.5 },
    { x: 0, y: 0, z: -2.5 },
    { x: 2, y: 0, z: -2.5 },
    { x: 4, y: 0, z: -2.5 }, // Right wall
    { x: 0, y: 0, z: 2.5 }   // Back wall
];

paintingMeshes.forEach((mesh, index) => {
    mesh.position.set(positions[index].x, positions[index].y, positions[index].z);
    scene.add(mesh);
});

// Camera position
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
