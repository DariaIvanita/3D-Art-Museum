import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import * as TWEEN from 'tween';

const images = ['socrates.jpg', 'stars.jpg', 'wave.jpg', 'spring.jpg', 'mountain.jpg', 'sunday.jpg'];
const titles = ['The Death of Socrates', 'Starry Night', 'The Great Wave off Kanagawa', 'Effect of Spring, Giverny', 'Mount Corcoran', 'A Sunday on La Grande Jatte'];
const artists = ['Jacques-Louis David', 'Vincent Van Gogh', 'Katsushika Hokusai', 'Claude Monet', 'Albert Bierstadt', 'George Seurat'];

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

const root = new THREE.Object3D();
scene.add(root);

// Generate artworks
images.forEach((img, i) => {
  const baseNode = new THREE.Object3D();
  baseNode.rotation.y = 2 * Math.PI * (i / images.length);

  const border = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 2.2, 0.005),
    new THREE.MeshStandardMaterial({ color: 0x303030 })
  );
  border.position.z = -4;
  baseNode.add(border);

  const artwork = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2, 0.01),
    new THREE.MeshStandardMaterial({ map: textureLoader.load(img) })
  );
  artwork.position.z = -4;
  baseNode.add(artwork);

  ['left', 'right'].forEach((dir, index) => {
    const arrow = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.3, 0.01),
      new THREE.MeshStandardMaterial({ map: index === 0 ? leftArrowImage : rightArrowImage, transparent: true })
    );
    arrow.name = dir;
    arrow.userData = i;
    arrow.position.set(index === 0 ? 2.9 : -2.9, 0, -4);
    baseNode.add(arrow);
  });

  root.add(baseNode);
});

// Lighting
const spotlight = new THREE.SpotLight(0xffffff, 100.0, 10, 0.65, 1);
spotlight.position.set(0, 5, 0);
spotlight.target.position.set(0, 1, -5);
scene.add(spotlight, spotlight.target);

// Mirror Reflection
const mirror = new Reflector(new THREE.CircleGeometry(40, 64), {
  color: 0x505050,
  textureWidth: window.innerWidth * window.devicePixelRatio,
  textureHeight: window.innerHeight * window.devicePixelRatio,
});
mirror.position.set(0, -1.1, 0);
mirror.rotateX(-Math.PI / 2);
scene.add(mirror);

function animate() {
  TWEEN.update();
  renderer.render(scene, camera);
}

function rotateGallery(index, direction) {
  const newRotationY = root.rotation.y + (direction * 2 * Math.PI) / images.length;
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

// Event Listeners
window.addEventListener('wheel', (ev) => root.rotation.y += ev.deltaY * 0.0001);

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener('click', (ev) => {
  const mouse = new THREE.Vector2((ev.clientX / window.innerWidth) * 2 - 1, -(ev.clientY / window.innerHeight) * 2 + 1);
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(root.children, true);

  if (intersects.length > 0) {
    const clickedObject = intersects[0].object;
    const index = clickedObject.userData;

    if (clickedObject.name === 'left' || clickedObject.name === 'right') {
      const direction = clickedObject.name === 'left' ? -1 : 1;
      rotateGallery(index, direction);
    }
  }
});

document.getElementById('title').innerText = titles[0];
document.getElementById('artist').innerText = artists[0];






