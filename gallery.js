
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
floor.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
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
const infoDiv = document.createElement('div');
infoDiv.style.position = 'absolute';
infoDiv.style.top = '10px';
infoDiv.style.left = '10px';
infoDiv.style.background = 'rgba(0, 0, 0, 0.7)';
infoDiv.style.color = '#fff';
infoDiv.style.padding = '10px';
infoDiv.style.display = 'none'; // Initially hidden
document.body.appendChild(infoDiv);

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

// Camera position
camera.position.set(0, 2, 8);

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjection













