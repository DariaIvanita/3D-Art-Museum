// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create floor
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
scene.add(floor);

// Create walls
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

const wall1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
wall1.position.set(0, 2.5, -5);
scene.add(wall1);

const wall2 = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
wall2.position.set(0, 2.5, 5);
wall2.rotation.y = Math.PI;
scene.add(wall2);

const wall3 = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
wall3.position.set(-5, 2.5, 0);
wall3.rotation.y = Math.PI / 2;
scene.add(wall3);

const wall4 = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
wall4.position.set(5, 2.5, 0);
wall4.rotation.y = -Math.PI / 2;
scene.add(wall4);

// Load images for the gallery
const textureLoader = new THREE.TextureLoader();
const images = [
    'images/the_creation_of_adam.jpg',
    'images/the_last_judgement.jpg',
    'images/the_prophet_jeremiah.jpg',
    'images/the_libyan_sibyl.jpg',
    'images/the_deluge.jpg',
    'images/the_separation_of_light_and_darkness.jpg',
];

const positions = [
    { x: -4, y: 2.5, z: -4 },
    { x: 4, y: 2.5, z: -4 },
    { x: -4, y: 2.5, z: 4 },
    { x: 4, y: 2.5, z: 4 },
    { x: 0, y: 2.5, z: -4 },
    { x: 0, y: 2.5, z: 4 }
];

images.forEach((image, index) => {
    textureLoader.load(image, (texture) => {
        const imgMaterial = new THREE.MeshBasicMaterial({ map: texture });
        const imgGeometry = new THREE.PlaneGeometry(2, 1.5);
        const imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);
        imgMesh.position.set(positions[index].x, positions[index].y, positions[index].z);
        imgMesh.lookAt(0, 2.5, 0); // Ensure images face the center
        scene.add(imgMesh);
    }, undefined, (error) => {
        console.error(`An error occurred loading the texture for ${image}:`, error);
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


