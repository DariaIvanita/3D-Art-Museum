// Basic setup for Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('gallery-container').appendChild(renderer.domElement);

// Create a simple room with a texture
const createRoom = (textureUrl) => {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const textureLoader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({ map: textureLoader.load(textureUrl) });
    const room = new THREE.Mesh(geometry, material);
    return room;
};

// Artworks data with image paths
const artworks = [
    { title: "The Creation of Adam", image: "" },
    { title: "David", image: "images/david.jpg" },
    { title: "The Last Judgment", image: "images/last_judgment.jpg" },
    { title: "The Pietà", image: "images/pieta.jpg" },
    { title: "The Sistine Chapel Ceiling", image: "images/sistine_chapel_ceiling.jpg" },
    { title: "The Tomb of Julius II", image: "images/tomb_of_julius_ii.jpg" }
];

let currentArtworkIndex = 0;

// Function to update the scene with the current artwork
const updateScene = () => {
    // Clear the scene
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }

    // Create the current room with the corresponding texture
    const room = createRoom(artworks[currentArtworkIndex].image);
    scene.add(room);

    // Update description
    document.getElementById('description').innerText = artworks[currentArtworkIndex].title;
};

// Navigation functions
const nextArtwork = () => {
    currentArtworkIndex = (currentArtworkIndex + 1) % artworks.length;
    updateScene();
};

const prevArtwork = () => {
    currentArtworkIndex = (currentArtworkIndex - 1 + artworks.length) % artworks.length;
    updateScene();
};

// Event listeners for buttons
document.getElementById('next').addEventListener('click', nextArtwork);
document.getElementById('prev').addEventListener('click', prevArtwork);

// Initial scene setup
updateScene();

// Animation loop
const animate = function () {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();
