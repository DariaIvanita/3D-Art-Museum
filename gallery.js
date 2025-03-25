// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set a background color for the renderer
renderer.setClearColor(0xcccccc, 1); // Light gray background

// Add a light source to illuminate the scene
const ambientLight = new THREE.AmbientLight(0x404040, 2); // Increased intensity
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Create floor
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Create walls
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
const walls = [
    { position: [0, 2.5, -5], rotation: [0, 0, 0] },
    { position: [0, 2.5, 5], rotation: [0, Math.PI, 0] },
    { position: [-5, 2.5, 0], rotation: [0, Math.PI / 2, 0] },
    { position: [5, 2.5, 0], rotation: [0, -Math.PI / 2, 0] }
];

walls.forEach(wall => {
    const wallMesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
    wallMesh.position.set(...wall.position);
    wallMesh.rotation.set(...wall.rotation);
    scene.add(wallMesh);
});

// Load images for the gallery
const textureLoader = new THREE.TextureLoader();
const paintings = [
    { title: 'The Creation of Adam', artist: 'Michelangelo', image: 'images/the_creation_of_adam.jpg },
    { title: 'The Last Judgement', artist: 'Michelangelo', image: 'images/the_last_judgement.jpg },
    { title: 'The Prophet Jeremiah', artist: 'Michelangelo', image: 'images/the_prophet_jeremiah.jpg },
    { title: 'The Libyan Sibyl', artist: 'Michelangelo', image: 'images/the_libyan_sibyl.jpg },
    { title: 'The Deluge', artist: 'Michelangelo', image: 'images/the_deluge.jpg }
    { title: 'Separation of Light and Darkness', artist: 'Michelangelo', image:'images/the_separation_of_light_and_darkness.jpg },
];

const positions = [
    { x: -6, y: 2.5, z: -6 },
    { x: 6, y: 2.5, z: -6 },
    { x: -6, y: 2.5, z: 6 },
    { x: 6, y: 2.5, z: 6 },
    { x: 0, y: 2.5, z: -6 },
    { x: 0, y: 2.5, z: 6 }
];

const infoDiv = document.getElementById('info');

paintings.forEach((painting, index) => {
    textureLoader.load(painting.image, (texture) => {
        const imgMaterial = new THREE.MeshLambertMaterial({ map: texture });
        const imgGeometry = new THREE.PlaneGeometry(2, 1.5);
        const imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);
        imgMesh.position.set(positions[index].x, positions[index].y, positions[index].z);
        imgMesh.rotation.y = Math.PI / 2; // Rotate image to face forward
        imgMesh.userData = { title: painting.title, artist: painting.artist }; // Store painting details
        scene.add(imgMesh);
    });
});

// Camera position
camera.position.set(0, 2, 8);

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Raycaster for hover effect
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const intersected = intersects[0].object;
        if (intersected.userData) {
            infoDiv.style.display = 'block';
            infoDiv.innerHTML = `${intersected.userData.title} by ${intersected.userData.artist}`; // Display title and artist
        }
    } else {
        infoDiv.style.display = 'none';
    }

    renderer.render(scene, camera);
}

animate();














