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
    'https://via.placeholder.com/150/FF0000/FFFFFF?text=Image+1',
    'https://via.placeholder.com/150/00FF00/FFFFFF?text=Image+2',
    'https://via.placeholder.com/150/0000FF/FFFFFF?text=Image+3',
    'https://via.placeholder.com/150/FFFF00/FFFFFF?text=Image+4',
    'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Image+5',
    'https://via.placeholder.com/150/00FFFF/FFFFFF?text=Image+6'
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
    const texture = textureLoader.load(image);
    const imgMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const imgGeometry = new THREE.PlaneGeometry(2, 1.5);
    const imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);
    imgMesh.position.set(positions[index].x, positions[index].y, positions[index].z);
    imgMesh.rotation.y = Math.PI; // Rotate to face the camera
    scene.add(imgMesh);
});

// Camera position
camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
