// Basic Three.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Background Color
renderer.setClearColor(0xcccccc, 1);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(6, 10, 6);
scene.add(directionalLight);

// Floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Load images using TextureLoader
const textureLoader = new THREE.TextureLoader();
const paintings = [
  { title: 'The Creation of Adam', image: 'the_creation_of_adam.jpg' },
  { title: 'The Last Judgment', image: 'the_last_judgement.jpg' },
  { title: 'The Prophet Jeremiah', image: 'the_prophet_jeremiah.jpg' },
  { title: 'The Libyan Sibyl', image: 'the_libyan_sibyl.jpg' },
  { title: 'The Deluge', image: 'the_deluge.jpg' },
  { title: 'Separation of Light and Darkness', image: 'the_separation_of_light_and_darkness.jpg' }
];

const imageWidth = 6;
const imageHeight = 4;
const positions = [
  { x: -6, y: 5, z: -9 },
  { x: 6, y: 5, z: -9 },
  { x: -9.5, y: 5, z: -3 },
  { x: -9.5, y: 5, z: 3 },
  { x: 9.5, y: 5, z: -3 },
  { x: 9.5, y: 5, z: 3 }
];

// Load paintings onto the walls
paintings.forEach((painting, index) => {
  textureLoader.load(
    painting.image,
    (texture) => {
      const imgGeometry = new THREE.PlaneGeometry(imageWidth, imageHeight);
      const imgMaterial = new THREE.MeshLambertMaterial({ map: texture });
      const imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);
      imgMesh.position.set(positions[index].x, positions[index].y, positions[index].z);
      imgMesh.lookAt(new THREE.Vector3(0, positions[index].y, positions[index].z > 0 ? positions[index].z + 1 : positions[index].z - 1));
      scene.add(imgMesh);
    },
    undefined,
    (error) => {
      console.error(`Failed to load image: ${painting.image}`, error);
    }
  );
});

// Camera Position
camera.position.set(0, 5, 20);

// Animate Function
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});





