import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { TWEEN } from 'https://unpkg.com/@tweenjs/tween.js@18.6.4/dist/tween.esm.js';

// Images and Information
const images = [
  'the_creation_of_adam.jpg',
  'the_last_judgement.jpg',
  'the_prophet_jeremiah.jpg',
  'the_libyan_sibyl.jpg',
  'the_deluge.jpg',
  'the_separation_of_light_and_darkness.jpg'
];

const years = [
  '1511-1512',
  '1536-1541',
  '1511',
  '1511-1512',
  '1508-1512',
  '1511'
];

const information = [
  'Depicts God giving life to Adam.',
  'Fresco on Sistine Chapel\'s altar wall illustrating the final judgment of souls.',
  'Portrays the contemplative prophet on the Sistine Chapel ceiling.',
  'Illustrates the Libyan Sibyl, one of the central figures on the Sistine Chapel ceiling.',
  'Depicts Noah\'s flood, part of the Sistine Chapel ceiling.',
  'Shows God dividing light from darkness.'
];

// Scene and Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 6);

// Load Textures
const textureLoader = new THREE.TextureLoader();
const leftArrowImage = textureLoader.load('left.png');
const rightArrowImage = textureLoader.load('right.png');

const root = new THREE.Object3D();
scene.add(root);

// Lighting
const spotlight = new THREE.SpotLight(0xffffff, 5.0, 20, Math.PI / 6, 0.5);
spotlight.position.set(5, 5, 5);
scene.add(spotlight);

// Add Artworks
for (let i = 0; i < images.length; i++) {
  const texture = textureLoader.load(images[i]);

  const baseNode = new THREE.Object3D();
  baseNode.rotation.y = (2 * Math.PI * i) / images.length;

  // Frame
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 2.2, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x303030 })
  );
  frame.position.z = -5;
  baseNode.add(frame);

  // Artwork
  const artwork = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 2),
    new THREE.MeshBasicMaterial({ map: texture })
  );
  artwork.position.z = -4.95;
  baseNode.add(artwork);

  // Left Arrow
  const leftArrow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 0.5),
    new THREE.MeshBasicMaterial({ map: leftArrowImage, transparent: true })
  );
  leftArrow.name = 'left';
  leftArrow.userData = i;
  leftArrow.position.set(-2, 0, -5);
  baseNode.add(leftArrow);

  // Right Arrow
  const rightArrow = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 0.5),
    new THREE.MeshBasicMaterial({ map: rightArrowImage, transparent: true })
  );
  rightArrow.name = 'right';
  rightArrow.userData = i;
  rightArrow.position.set(2, 0, -5);
  baseNode.add(rightArrow);

  root.add(baseNode);
}

// Display Information
function updateInfo(index) {
  document.getElementById('year').innerText = `Year: ${years[index]}`;
  document.getElementById('info').innerText = information[index];
}
updateInfo(0);

// Animation
function rotateGallery(index, direction) {
  const newRotationY = root.rotation.y + (direction * 2 * Math.PI) / images.length;

  new TWEEN.Tween(root.rotation)
    .to({ y: newRotationY }, 1500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
    .onComplete(() => updateInfo(index));
}

// Click Events
window.addEventListener('click', (ev) => {
  const mouse = new THREE.Vector2();
  mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(root.children, true);
  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    const index = clickedObject.userData;

    if (clickedObject.name === 'left') {
      rotateGallery(index, -1);
    } else if (clickedObject.name === 'right') {
      rotateGallery(index, 1);
    }
  }
});

// Animation Loop
function animate() {
  TWEEN.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();







