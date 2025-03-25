// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set background color
renderer.setClearColor(0xcccccc, 1);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2);
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
    { position: [0, 2.5, -5], rotation: [0, 0, 0] }, // Front wall
    { position: [0, 2.5, 5], rotation: [0, Math.PI, 0] }, // Back wall
    { position: [-5, 2.5, 0], rotation: [0, Math.PI / 2, 0] }, // Left wall
    { position: [5, 2.5, 0], rotation: [0, -Math.PI / 2, 0] } // Right wall
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
    { title: 'Separation of Light and Darkness', image: 'the_separation_of_light_and_darkness.jpg' }
];

// Adjusted positions to fit all 6 paintings
const positions = [
    { x: -2.5, y: 2.5, z: -5 },  // Front Wall (1)
    { x: 2.5, y: 2.5, z: -5 },   // Front Wall (2)
    { x: -2.5, y: 2.5, z: 5 },   // Back Wall (3)
    { x: 2.5, y: 2.5, z: 5 },    // Back Wall (4)
    { x: -4.5, y: 2.5, z: 0 },   // Left Wall (5) - Smaller
    { x: 4.5, y: 2.5, z: 0 }     // Right Wall (6) - Smaller
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
        const imgGeometry = new THREE.PlaneGeometry(index >= 4 ? 1.8 : 2.5, index >= 4 ? 1.5 : 2); // Smaller for side walls
        const imgMaterial = new THREE.MeshLambertMaterial({ map: texture });
        const imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);
        imgMesh.position.set(positions[index].x, positions[index].y, positions[index].z);
        imgMesh.lookAt(camera.position); // Face the camera
        imgMesh.userData = { title: painting.title };
        scene.add(imgMesh);
        paintingMeshes.push(imgMesh);
    });
});

// Camera position
camera.position.set(0, 2, 8);
camera.updateProjectionMatrix();

// Handle resize
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




















