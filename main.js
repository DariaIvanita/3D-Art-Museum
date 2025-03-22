import * as THREE from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import * as TWEEN from 'tween';

const images = [
  'the_creation_of_adam.jpg',        // Image 1
  'the_libyan_sibyl.jpg',            // Image 2
  'the_deluge.jpg',                  // Image 3
  'the_seperation_of_light_and_darkness.jpg', // Image 4
  'the_last_judgement.jpg',          // Image 5
  'the_prophet_jeremiah.jpg'         // Image 6
];

const titles = [
  'The Creation of Adam',
  'The Libyan Sibyl',
  'The Deluge',
  'The Separation of Light and Darkness',
  'The Last Judgement',
  'The Prophet Jeremiah'
];

const artists = [
  'Michelangelo Buonarroti',
  'Michelangelo Buonarroti',
  'Michelangelo Buonarroti',
  'Michelangelo Buonarroti',
  'Michelangelo Buonarroti',
  'Michelangelo Buonarroti'
];

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
camera.position.z = 10; // Adjusted camera distance

const root = new THREE.Object3D();
scene.add(root);

const count = 6;
for (let i = 0; i < count; i++) {
  const image = textureLoader.load(images[i]);

  const baseNode = new THREE.Object3D();
  baseNode.rotation.y = 2 * Math.PI * (i / count);

  const border = new THREE.Mesh(
    new THREE.BoxGeometry(3.2, 2.2, 0.005),
    new THREE.MeshStandardMaterial({ color: 0x303030 })
  );
  border.position.z = -4;
  baseNode.add(border);

  const artwork = new THREE.Mesh(
    new THREE.BoxGeometry(3, 2, 0.01),
    new THREE.MeshStandardMaterial({ map: image })
  );
  artwork.position.z = -4;
  baseNode.add(artwork);

  const leftArrow = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.01),
    new THREE.MeshStandardMaterial({ map: leftArrowImage, transparent: true })
  );
  leftArrow.name = 'left';
  leftArrow.userData = i;
  leftArrow.position.set(2.9, 0, -4);
  baseNode.add(leftArrow);

  const rightArrow = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.01),
    new THREE.MeshStandardMaterial({ map: rightArrowImage, transparent: true })
  );
  rightArrow.name = 'right';
  rightArrow.userData = i;
  rightArrow.position.set(-2.9, 0, -4);
  baseNode.add(rightArrow);

  root.add(baseNode);
}

const spotlight = new THREE.SpotLight(0xffffff, 1.0, 10, 0.65, 1);
spotlight.position.set(0, 5, 5);
spotlight.target.position.set(0, 1, -4);
scene.add(spotlight);
scene.add(spotlight.target);

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

function animate() {
  TWEEN.update();
  renderer.render(scene, camera);
}

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

window.addEventListener('wheel', (ev) => {
  root.rotation.y += ev.wheelDelta * 0.0001;
});

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
  const mouse = new THREE.Vector2();
  mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;

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





