// Basic setup for Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('gallery-container').appendChild(renderer.domElement);

// Create a simple room
const createRoom = (color) => {
    const geometry = new THREE.BoxGeometry(10, 10, 10);
    const material = new THREE.MeshBasicMaterial({ color: color });
    const room = new THREE.Mesh(geometry, material);
    return room;
};

// Artworks data
const artworks = [
    { title: "The Creation of Adam", color: 0xff0000 },
    { title: "David", color: 0x00ff00 },
    { title: "The Last Judgment", color: 0x0000ff },
    { title: "The Pietà", color: 0xffff00 },
    { title: "The Sistine Chapel Ceiling", color: 0xff00ff },
    { title: "The Tomb of Julius II", color: 0x00ffff }
];

let currentArtworkIndex = 0;

// Function to update the scene with the current artwork
const updateScene = () => {
    // Clear the scene
    while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
    }

    // Create the current room
    const room = createRoom(artworks[currentArtworkIndex].color);
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
