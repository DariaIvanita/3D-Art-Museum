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








