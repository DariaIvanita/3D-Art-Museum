// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Background Color
renderer.setClearColor(0xcccccc, 1);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// Floor
const floorGeometry = new THREE.PlaneGeometry(10, 10);
const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Create walls
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
const walls = [
    { position: [0, 2.5, -5], rotation: [0, 0, 0] }, // Front Wall
    { position: [-5, 2.5, 0], rotation: [0, Math.PI / 2, 0] }, // Left Wall
    { position: [5, 2.5, 0], rotation: [0, -Math.PI / 2, 0] } // Right Wall
];

walls.forEach(wall => {
    const wallMesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
    wallMesh.position.set(...wall.position);
    wallMesh.rotation.set(...wall.rotation);
    scene.add(wallMesh);
});

// Load images
const textureLoader = new THREE.TextureLoader();
const paintings = [
    { title: 'The Creation of Adam', image: 'the_creation_of_adam.jpg' },
    { title: 'The Last Judgment', image: 'the_last_judgement.jpg' },
    { title: 'The Prophet Jeremiah', image: 'the_prophet_jeremiah.jpg' },
    { title: 'The Libyan Sibyl', image: 'the_libyan_sibyl.jpg' },
    { title: 'The Deluge', image: 'the_deluge.jpg' },
    { title: 'Separation of Light and Darkness', image: 'the_separation_of_light_and_darkness.jpg' },
    { title: 'The Sacrifice of Noah', image: 'the_sacrifice_of_noah.jpg' },
    { title: 'The Fall of Man', image: 'the_fall_of_man.jpg' }
];

// Image size
const imageWidth = 1.5;
const imageHeight = 1.2;

// Image Positions
const positions = [
    // Front Wall - 4 images (2 sides + 2 in the middle)
    { x: -3, y: 2.5, z: -5 },
    { x: 3, y: 2.5, z: -5 },
    { x: -1, y: 2.5, z: -5 },
    { x: 1, y: 2.5, z: -5 },
    // Left Wall - 2 images
    { x: -5, y: 2.5, z: -2 },
    { x: -5, y: 2.5, z: 2 },
    // Right Wall - 2 images
    { x: 5, y: 2.5, z: -2 },
    { x: 5, y: 2.5, z: 2 }
];

// Painting Info Box
const infoDiv = document.createElement('div');
infoDiv.style.position = 'absolute';
infoDiv.style.top = '10px';
infoDiv.style.left = '10px';
infoDiv.style.background = 'rgba(0, 0, 0, 0.7)';
infoDiv.style.color = '#fff';
infoDiv.style.padding = '10px';
infoDiv.style.display = 'none';
document.body.appendChild(infoDiv);

// Load images as textures
const paintingMeshes = [];
paintings.forEach((painting, index) => {
    textureLoader.load(painting.image, (texture) => {
        const imgGeometry = new THREE.PlaneGeometry(imageWidth, imageHeight);
        const imgMaterial = new THREE.MeshLambertMaterial({ map: texture });
        const imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);
        imgMesh.position.set(positions[index].x, positions[index].y, positions[index].z);
        imgMesh.lookAt(camera.position); // Face the camera
        imgMesh.userData = { title: painting.title };
        scene.add(imgMesh);
        paintingMeshes.push(imgMesh);
    });
});

// Camera Position
camera.position.set(0, 2, 8);
camera.updateProjectionMatrix();

// Handle Resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Raycaster for Hover Effect
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(paintingMeshes);

    if (intersects.length > 0) {
        const intersected = intersects[0].object;
        intersected.scale.set(1.2, 1.2, 1);
        infoDiv.style.display = 'block';
        infoDiv.innerHTML = `Title: ${intersected.userData.title}`;
    } else {
        paintingMeshes.forEach(mesh => mesh.scale.set(1, 1, 1));
        infoDiv.style.display = 'none';
    }

    renderer.render(scene, camera);
}

animate();


























