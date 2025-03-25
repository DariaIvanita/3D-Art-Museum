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
const paintings = [
    { title: 'The Creation of Adam', artist: 'Michelangelo', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/the_creation_of_adam.jpg' },
    { title: 'The Last Judgement', artist: 'Michelangelo', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/the_last_judgement.jpg' },
    { title: 'The Prophet Jeremiah', artist: 'Michelangelo', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/the_prophet_jeremiah.jpg' },
    { title: 'The Libyan Sibyl', artist: 'Michelangelo', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/the_libyan_sibyl.jpg' },
    { title: 'The Deluge', artist: 'Michelangelo', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/the_deluge.jpg' },
    { title: 'Separation of Light and Darkness', artist: 'Michelangelo', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/separation_of_light_and_darkness.jpg' },
];

const positions = [
    { x: -6, y: 2.5, z: -6 },
    { x: 6, y: 2.5, z: -6 },
    { x: -6, y: 2.5, z: 6 },
    { x: 6, y: 2.5, z: 6 },
    { x: 0, y: 2.5, z: -6 },
    { x: 0, y: 2.5, z: 6 }
];

// Create a div for displaying painting information
const infoDiv = document.getElementById('info');

// Loading the images as textures and adding them to the scene
paintings.forEach((painting, index) => {
    textureLoader.load(painting.image, (texture) => {
        const imgMaterial = new THREE.MeshLambertMaterial({ map: texture });
        const imgGeometry = new THREE.PlaneGeometry(2, 1.5); // Adjust size for the painting
        const imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);
        imgMesh.position.set(positions[index].x, positions[index].y, positions[index].z);
        imgMesh.lookAt(camera.position); // Make sure images face the camera
        imgMesh.userData = { title: painting.title, artist: painting.artist }; // Store painting details
        scene.add(imgMesh);
    });
});

// Raycaster for hover effect
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) *













