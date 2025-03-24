import * as THREE from 'three';
import * as TWEEN from 'tween';
import { Reflector } from 'three/addons/objects/Reflector.js';

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// Add a simple geometry (e.g., a cube) to the scene
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Position the camera
camera.position.z = 5;

// Mirror and its properties (similar to the second code)
const mirror = new Reflector(
  new THREE.CircleGeometry(40, 64),
  {
    color: 0x505050,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
  }
);
mirror.position.set(0, -1.1, 0);
mirror.rotateX(-Math.PI / 2);
scene.add(mirror);

// Animation function
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    TWEEN.update(); // Update TWEEN animations
    renderer.render(scene, camera);
}

// Start the animation
animate();

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mirror.getRenderTarget().setSize(
        window.innerWidth * window.devicePixelRatio,
        window.innerHeight * window.devicePixelRatio
    );
});

// Handle user interactions (optionally, similar to the gallery code)
window.addEventListener('click', (ev) => {
    // Your interaction logic here
});

// Initial setup for titles and artists would require creating DOM elements, similar to the gallery code
document.getElementById('title').innerText = "Art Title";    // Example placeholder
document.getElementById('artist').innerText = "Artist Name"; // Example placeholder
