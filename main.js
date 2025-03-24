// app.js

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Gallery dimensions
const galleryWidth = 10;
const galleryHeight = 6;
const paintings = [
    'path/to//the_creation_of_adam.jpg.jpg',
    'path/to/the_last_judgement.jpg.jpg',
    'path/to/the_prophet_jeremiah.jpg.jpg',
    'path/to/the_libyan_sibyl.jpg.jpg',
    'path/to/the_deluge.jpg.jpg',
    'path/to/the_seperation_of_light_and_darkness.jpg.jpg'
];

// Create paintings
paintings.forEach((painting, index) => {
    const texture = new THREE.TextureLoader().load(painting);
    const geometry = new THREE.PlaneGeometry(3, 2);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position paintings in a grid
    mesh.position.x = (index % 3) * (galleryWidth / 3) - galleryWidth / 2 + 1.5;
    mesh.position.y = (Math.floor(index / 3) * (galleryHeight / 2)) - galleryHeight / 2 + 1;
    mesh.position.z = -5; // Move back to view
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
