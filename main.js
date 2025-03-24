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
backWall.position.set(0, 5, -10);
scene.add(backWall);

// Side walls
const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
leftWall.position.set(-10, 5, 0);
leftWall.rotation.y = Math.PI / 2; // Rotate to make it vertical
scene.add(leftWall);

const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
rightWall.position.set(10, 5, 0);
rightWall.rotation.y = -Math.PI / 2; // Rotate to make it vertical
scene.add(rightWall);

// Create paintings
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

// Create paintings
paintings.forEach((painting, index) => {
    const textureLoader = new THREE.TextureLoader(loadingManager);
    const texture = textureLoader.load(painting);
    const geometry = new THREE.PlaneGeometry(3, 2);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position paintings in a grid
    const row = Math.floor(index / 3);
    const col = index % 3;
    mesh.position.set(col * 4 - 4, 5, -9); // Adjust spacing and set position
    scene.add(mesh);
});

// Camera position
camera.position.set(0, 2, 10); // Adjust camera position for better view

// Pointer Lock Controls
const controls = new THREE.PointerLockControls(camera, document.body);
document.body.appendChild(controls.getObject());
document.addEventListener('click', () => {
    controls.lock();
});

// Movement variables
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const speed = 0.1;

// Handle keyboard input
const keys = {};
document.addEventListener('keydown', (event) => {
    keys[event.code] = true;
});
document.addEventListener('keyup', (event) => {
    keys[event.code] = false;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Update controls
    if (keys['KeyW']) {
        controls.moveForward(speed);
    }
    if (keys['KeyS']) {
        controls.moveBackward(speed);
    }
    if (keys['KeyA']) {
        controls.moveLeft(speed);
    }
    if (keys['KeyD']) {
        controls.moveRight(speed);
    }

    renderer.render(scene, camera);
}
