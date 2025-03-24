// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
scene.add(floor);

// Create walls
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
const wallGeometry = new THREE.PlaneGeometry(20, 10);

// Back wall
const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
backWall.position.z = -10;
backWall.position.y = 5;
scene.add(backWall);

// Side walls
const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
leftWall.position.x = -10;
leftWall.position.y = 5;
leftWall.rotation.y = Math.PI / 2; // Rotate to make it vertical
scene.add(leftWall);

const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
rightWall.position.x = 10;
rightWall.position.y = 5;
rightWall.rotation.y = -Math.PI / 2; // Rotate to make it vertical
scene.add(rightWall);

// Create paintings array
const paintings = [
    'the_creation_of_adam.jpg.jpg',
    'the_last_judgement.jpg.jpg',
    'the_prophet_jeremiah.jpg.jpg',
    'the_libyan_sibyl.jpg.jpg',
    'the_deluge.jpg.jpg',
    'the_seperation_of_light_and_darkness.jpg.jpg'
];

// Loading manager
const loadingManager = new THREE.LoadingManager(() => {
    // Start rendering once all textures are loaded
    animate();
});

// Create paintings on walls
const createPaintings = (wall, zOffset) => {
    paintings.slice(0, 3).forEach((painting, index) => {
        const textureLoader = new THREE.TextureLoader(loadingManager);
        const texture = textureLoader.load(painting);
        const geometry = new THREE.PlaneGeometry(3, 2);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        
        // Positioning paintings
        const offsetX = (index - 1) * 4; // Center the paintings on their respective wall
        mesh.position.x = offsetX;
        mesh.position.y = 5; // Height of the paintings
        mesh.position.z = zOffset; // Z offset for depth effect
        wall.add(mesh);
    });
};

// Add paintings to walls
createPaintings(backWall, -9); // For back wall
createPaintings(leftWall, -9);  // For left wall (zOffset can be adjusted for depth)
createPaintings(rightWall, -9); // For right wall (zOffset can be adjusted for depth)

// Camera position
camera.position.set(0, 2, 10); // Adjust camera position for better view

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
