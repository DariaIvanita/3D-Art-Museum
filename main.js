import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import TWEEN from '@tweenjs/tween.js';

const images = [
  'the_creation_of_adam.jpg',
  'the_last_judgement.jpg',
  'the_prophet_jeremiah.jpg',
  'the_libyan_sibyl.jpg',
  'the_deluge.jpg',
  'the_seperation_of_light_and_darkness.jpg',
];

const years = [
  'The Creation of Adam (1511-1512)',
  'The Last Judgement (1536-1541)',
  'The Prophet Jeremiah (1511)',
  'The Libyan Sibyl (1511-1512)',
  'The Deluge (1508-1512)',
  'The Separation of Light and Darkness (1511)',
];

const information = [
  'Depicts God giving life to Adam.',
  'Fresco on Sistine Chapel's altar wall illustrating the final judgment of souls.',
  'Portrays the contemplative prophet located on the Sistine Chapel ceiling.',
  'Illustrates Noah's flood, one of the central panels on the Sistine Chapel ceiling.',
  'Shows God dividing light from darkness, a scene from the Sistine Chapel ceiling.',
];

const textureLoader = new THREE.TextureLoader();
const leftArrowImage = textureLoader.load('left.png');
const rightArrowImage = textureLoader.load('right.png');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 7);

const root = new THREE.Object3D();
scene.add(root);

const count = images.length;

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

const spotlight = new THREE.SpotLight(0xffffff, 100.0, 10, 0.65, 1);
spotlight.position.set(0, 5, 0);
spotlight.target.position.set(0, 1, -5);
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

  const titleElement = document.getElementById('year');
  const infoElement = document.getElementById('information');

  new TWEEN.Tween(root.rotation)
    .to({ y: newRotationY }, 1500)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .start()
    .onStart(() => {
      titleElement.style.opacity = 0;
      infoElement.style.opacity = 0;
    })
    .onComplete(() => {
      titleElement.innerText = years[index];
      infoElement.innerText = information[index];
      titleElement.style.opacity = 1;
      infoElement.style.opacity = 1;
    });
}

window.addEventListener('wheel', (ev) => {
  root.rotation.y += ev.deltaY * 0.0001;
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
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

document.getElementById('year').innerText = years[0];
document.getElementById('information').innerText = information[0];


