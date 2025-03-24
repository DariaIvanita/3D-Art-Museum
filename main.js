import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { Reflector } from 'https://unpkg.com/three@0.160.0/examples/jsm/objects/Reflector.js';
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

const titles = [
  'The Creation of Adam',
  'The Last Judgement',
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
const textureLoader = new THREE.TextureLoader();
const leftArrowImage = textureLoader.load('left.png');
const rightArrowImage = textureLoader.load('right.png');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.NeutralToneMapping;
renderer.toneMappingExposure = 2;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 6);

const root = new THREE.Object3D();
scene.add(root);

// Lighting
const spotlight = new THREE.SpotLight(0xffffff, 5.0, 20, Math.PI / 6, 0.5);
spotlight.position.set(5, 5, 5);
scene.add(spotlight);

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

// Add Artworks
for (let i = 0; i < images.length; i++) {
  const texture = textureLoader.load(images[i]);

  const baseNode = new THREE.Object3D();
  baseNode.rotation.y = (2 * Math.PI * i) / images.length;

  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 2.2, 0.05),
    new THREE.MeshStandardMaterial({ color: 0x303030 })
  );
  frame.position.z = -5;
  baseNode.add(frame);

  const artwork = new THREE.Mesh(
    new THREE.PlaneGeometry(3, 2),
    new THREE.MeshBasicMaterial({ map: texture })
  );
  artwork.position.z = -4.95;
  baseNode.add(artwork);

  const leftArrow = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.01),
    new THREE.MeshStandardMaterial({ map: leftArrowImage, transparent: true })
  );
  leftArrow.name = 'left';
  leftArrow.position.set(2.9, 0, -4);
  baseNode.add(leftArrow);

  const rightArrow = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.01),
    new THREE.MeshStandardMaterial({ map: rightArrowImage, transparent: true })
  );
  rightArrow.name = 'right';
  rightArrow.position.set(-2.9, 0, -4);
  baseNode.add(rightArrow);

  root.add(baseNode);
}

// Display Information
function updateInfo(index) {
  document.getElementById('title').innerText = titles[index];
  document.getElementById('artist').innerText = artists[index];
  document.getElementById('year').innerText = `Year: ${years[index]}`;
  document.getElementById('info').innerText = information[index];
}

updateInfo(0);

// Rotate Gallery
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
    const index = Math.floor(root.rotation.y / (2 * Math.PI / images.length)) % images.length;

    if (clickedObject.name === 'left' || clickedObject.name === 'right') {
      const direction = clickedObject.name === 'left' ? -1 : 1;
      rotateGallery(index, direction);
    }
  }
});

// Animation Loop
function animate() {
  TWEEN.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

// Resize Event
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});









