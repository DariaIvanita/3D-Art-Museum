// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Background Color
renderer.setClearColor(0xcccccc, 1);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(10, 10, 10);
scene.add(directionalLight);

// Floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Create walls
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xeeeeee });
const wallGeometry = new THREE.PlaneGeometry(20, 7);

// Front Wall
const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
frontWall.position.set(0, 3.5, -10);
scene.add(frontWall);

// Back Wall
const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
backWall.position.set(0, 3.5, 10);
backWall.rotation.y = Math.PI;
scene.add(backWall);

// Left Wall
const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
leftWall.position.set(-10, 3.5, 0);
leftWall.rotation.y = Math.PI / 2;
scene.add(leftWall);

// Right Wall
const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
rightWall.position.set(10, 3.5, 0);
rightWall.rotation.y = -Math.PI / 2;
scene.add(rightWall);

// Load images
const textureLoader = new THREE.TextureLoader();
const paintings = [
    { title: 'The Creation of Adam', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/the_creation_of_adam.jpg' },
    { title: 'The Last Judgment', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/the_last_judgement.jpg' },
    { title: 'The Prophet Jeremiah', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/the_prophet_jeremiah.jpg' },
    { title: 'The Libyan Sibyl', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/the_libyan_sibyl.jpg' },
    { title: 'The Deluge', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/the_deluge.jpg' },
    { title: 'Separation of Light and Darkness', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/separation_of_light_and_darkness.jpg' }
];

// Adjusted size to fit on walls
const imageWidth = 3;
const imageHeight = 2;

// Adjusted positions to fit all 6 paintings
const positions = [
    { x: -4, y: 3.5, z: -9.9 },  // Front Wall (1)
    { x: 4, y: 3.5, z: -9.9 },   // Front Wall (2)
    { x: -4, y: 3.5, z: 9.9 },   // Back Wall (3)
    { x: 4, y: 3.5, z: 9.9 },    // Back Wall (4)
    { x: -9.9, y: 3.5, z: 0 },   // Left Wall (5)
    { x: 9.9, y: 3.5, z: 0 }     // Right Wall (6)
];

// Load images as textures
paintings.forEach((painting, index) => {
    textureLoader.load(painting.image, (texture) => {
        const imgGeometry = new THREE.PlaneGeometry(imageWidth, imageHeight);
        const imgMaterial = new THREE.MeshLambertMaterial({ map: texture });
        const imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);
        imgMesh.position.set(positions[index].x, positions[index].y, positions[index].z);
        scene.add(imgMesh);
    }, undefined, (error) => {
        console.error(`Failed to load image: ${painting.image}`, error);
    });
});

// Camera Position - Adjusted for a better view
camera.position.set(0, 5, 20);
camera.lookAt(0, 3.5, 0);

// Handle Resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();























