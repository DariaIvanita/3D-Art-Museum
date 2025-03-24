import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import * as TWEEN from '@tweenjs/tween.js';

const images = [
  'the_creation_of_adam.jpg',
  'the_last_judgement.jpg',
  'the_prophet_jeremiah.jpg',
  'the_libyan_sibyl.jpg',
  'the_deluge.jpg',
  'the_separation_of_light_and_darkness.jpg'
];

const titles = [
  'The Creation of Adam',
  'The Last Judgment',
  'The Prophet Jeremiah',
  'The Libyan Sibyl',
  'The Deluge',
  'The Separation of Light and Darkness'
];

const artists = [
  'Michelangelo',
  'Michelangelo',
  'Michelangelo',
  'Michelangelo',
  'Michelangelo',
  'Michelangelo'
];

const textureLoader = new THREE.TextureLoader();
const leftArrowImage = textureLoader.load('left.png');
const rightArrowImage = textureLoader.load('right.png');

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Scene and Camera setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const root = new THREE.Object3D();
scene.add(root);

// Create artworks and arrows
const count = images.length;
for (let i = 0; i < count; i++) {
  const image = textureLoader.load(images[i]);

  const baseNode = new THREE.Object3D();
  baseNode.rotation.y = (2 * Math.PI * (i / count));

  // Create border
  const border = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 2.2, 0.005),
    new THREE.MeshStandardMaterial({ color: 0x303030 })
  );
  border.position.z = -4;
  baseNode.add(border);

  // Create artwork
  const artwork = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2, 0.01),
    new THREE.MeshStandardMaterial({ map: image })
  );
  artwork.position.z = -4;
  baseNode.add(artwork);

  // Create left arrow
  const leftArrow = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.01),
    new THREE.MeshStandardMaterial({ map: leftArrowImage, transparent: true })
  );
  leftArrow.name = 'left';
  leftArrow.userData.index = i; // Updated to use 'index'
  leftArrow.position.set(2.9, 0, -4);
  baseNode.add(leftArrow);

  // Create right arrow
  const rightArrow = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.01),
    new THREE.MeshStandardMaterial({ map: rightArrowImage, transparent: true })
  );
  rightArrow.name = 'right';
  rightArrow.userData.index = i; // Updated to use 'index'
  rightArrow.position.set(-2.9, 0, -4);
  baseNode.add(rightArrow);

  root.add(baseNode);
}

// Spotlights
const spotlight = new THREE.SpotLight(0xffffff, 100.0, 10, 0.65, 1);
spotlight.position.set(0, 5, 0);
spotlight.target.position.set(0, 1, -5);
scene.add(spotlight);
scene.add(spotlight.target);

// Mirror
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

// Animate the scene
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  renderer.render(scene, camera);
}

// Rotate the gallery
function rotateGallery(index, direction) {
  const newRotationY = root.rotation.y + (direction * 2 * Math.PI) / count;

  const titleElement = document.getElementById('title');
  const artistElement = document.getElementById('artist');

  new TWEEN.Tween(root.rotation)
    .to({ y: newRotationY }, 1500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
    .onStart(() => {
      titleElement.style.opacity = 0;
      artistElement.style.opacity = 0;
    })
    .onComplete(() => {
      titleElement.innerText = titles[index];
      artistElement.innerText = artists[index];
      titleElement.style.opacity = 1;
      artistElement.style.opacity = 1;
    });
}

// Event listeners
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  mirror.getRenderTarget().setSize(
    window.innerWidth * window.devicePixelRatio,
    window.innerHeight * window.devicePixelRatio
  );
});

window.addEventListener('click', (ev) => {
  const mouse = new THREE.Vector2(
    (ev.clientX / window.innerWidth) * 2 - 1,
    -(ev.clientY / window.innerHeight) * 2 + 1
  );
  
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(root.children, true);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    const index = clickedObject.userData.index; // Updated to use 'index'

    if (clickedObject.name === 'left' || clickedObject.name === 'right') {
      const direction = clickedObject.name === 'left' ? -1 : 1;
      rotateGallery(index, direction);
    }
  }
});

// Initialize text
document.getElementById('title').innerText = titles[0];
document.getElementById('artist').innerText = artists[0];

// Start animation
animate();
