// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set a background color for the renderer
renderer.setClearColor(0xcccccc, 1); // Light gray background

// Add a light source to illuminate the scene
const ambientLight = new THREE.AmbientLight(0x404040); // Ambient light to brighten the scene
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional light for better contrast
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Create floor
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
scene.add(floor);

// Create walls with the same material
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc }); // Same light color for walls

const wall1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
wall1.position.set(0, 2.5, -5);  // Back wall
scene.add(wall1);

const wall2 = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
wall2.position.set(0, 2.5, 5); // Front wall
wall2.rotation.y = Math.PI; // Rotate to face the opposite direction
scene.add(wall2);

const wall3 = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
wall3.position.set(-5, 2.5, 0);  // Left wall
wall3.rotation.y = Math.PI / 2; // Rotate to make it face the left
scene.add(wall3);

const wall4 = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
wall4.position.set(5, 2.5, 0);  // Right wall
wall4.rotation.y = -Math.PI / 2; // Rotate to make it face the right
scene.add(wall4);

// Load images for the gallery
const textureLoader = new THREE.TextureLoader();
const images = [
    'the_creation_of_adam.jpg',
    'the_last_judgement.jpg',
    'the_prophet_jeremiah.jpg',
    'the_libyan_sibyl.jpg',
    'the_deluge.jpg',
    'the_separation_of_light_and_darkness.jpg',
];

const positions = [
    { x: -6, y: 2.5, z: -6}, // position for the paintings
    { x: 6, y: 2.5, z: -6 },
    { x: -6, y: 2.5, z: 6 },
    { x: 6, y: 2.5, z: 6 },
    { x: 0, y: 2.5, z: -6 },
    { x: 0, y: 2.5, z: 6 }
];

// Loading the images as textures and adding them to the scene
images.forEach((image, index) => {
    textureLoader.load(image, (texture) => {
        console.log(`Loaded texture for ${image}`); // Debugging: Check if the texture loads
        const imgMaterial = new THREE.MeshLambertMaterial({ map: texture });
        const imgGeometry = new THREE.PlaneGeometry(2, 1.5);  // Adjust size for the painting
        const imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);
        imgMesh.position.set(positions[index].x, positions[index].y, positions[index].z);
        imgMesh.lookAt(camera.position);  // Make sure images face the camera
        scene.add(imgMesh);
    }, undefined, (error) => {
        console.error(`An error occurred loading the texture for ${image}:`, error); // Error handling
    });
});

// Camera position
camera.position.set(0, 2, 8); // Adjusted for better view

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();










