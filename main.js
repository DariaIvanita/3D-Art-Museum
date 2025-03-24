import * as THREE from 'three';

const images = [
  'the creation of adam.jpg',
  'the last judgement.jpg',
  'the prophet jeremiah.jpg',
  'the libyan sibyl.jpg',
  'the deluge.jpg',
  'the separation of light and darkness.jpg',
];

const years = [
  '1511-1512',
  '1536-1541',
  '1511',
  '1511-1512',
  '1508-1512',
  '1511',
];

const information = [
  'Depicts God giving life to Adam.',
  'Fresco on Sistine Chapel altar wall illustrating the final judgement of souls.',
  'Portrays the contemplative prophet on the Sistine Chapel ceiling.',
  'Symbolizes the Libyan Sibyl, known for prophecy, painted on the Sistine Chapel ceiling.',
  'Illustrates Noah’s flood, one of the central panels of the Sistine Chapel ceiling.',
  'Shows God dividing light from darkness, a scene from the Sistine Chapel ceiling.',
];

const textureLoader = new THREE.TextureLoader();
const leftArrowImage = textureLoader.load('left.png');
const rightArrowImage = textureLoader.load('right.png');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 6;

const root = new THREE.Object3D();
scene.add(root);

for (let i = 0; i < images.length; i++) {
  const image = textureLoader.load(images[i]);

  const baseNode = new THREE.Object3D();
  baseNode.rotation.y = (2 * Math.PI * i) / images.length;

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
  leftArrow.position.set(-2.9, 0, -4);
  baseNode.add(leftArrow);

  const rightArrow = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.01),
    new THREE.MeshStandardMaterial({ map: rightArrowImage, transparent: true })
  );
  rightArrow.name = 'right';
  rightArrow.userData = i;
  rightArrow.position.set(2.9, 0, -4);
  baseNode.add(rightArrow);

  root.add(baseNode);
}

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});







