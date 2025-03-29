// THREE.js Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 25);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Background Audio
const listener = new THREE.AudioListener();
camera.add(listener);

const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('background.mp3', function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);
  sound.play();
});

// Lighting
scene.add(new THREE.AmbientLight(0x404040, 2));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(6, 10, 6);
scene.add(light);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshLambertMaterial({ color: 0x8b4513, side: THREE.DoubleSide })
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Roof
const roof = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshLambertMaterial({ color: 0x222222, side: THREE.DoubleSide })
);
roof.rotation.x = Math.PI / 2;
roof.position.set(0, 10, 0);
scene.add(roof);

// Walls
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
const wallGeometry = new THREE.PlaneGeometry(20, 10);

const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
frontWall.position.set(0, 5, -10);
scene.add(frontWall);

const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
backWall.position.set(0, 5, 10);
backWall.rotation.y = Math.PI;
scene.add(backWall);

const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
leftWall.position.set(-10, 5, 0);
leftWall.rotation.y = Math.PI / 2;
scene.add(leftWall);

const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
rightWall.position.set(10, 5, 0);
rightWall.rotation.y = -Math.PI / 2;
scene.add(rightWall);

// Paintings
const paintingData = [
  {
    title: "The Creation Of Adam",
    description: "God gives life to Adam.",
    image: "the_creation_of_adam.jpg"
  },
  {
    title: "The Last Judgement",
    description: "Final judgment of souls.",
    image: "the_last_judgement.jpg"
  },
  {
    title: "The Prophet Jeremiah",
    description: "Jeremiah lost in thought.",
    image: "the_prophet_jeremiah.jpg"
  },
  {
    title: "The Libyan Sibyl",
    description: "Powerful sibyl with a book.",
    image: "the_libyan_sibyl.jpg"
  },
  {
    title: "The Deluge",
    description: "A story of the flood.",
    image: "the_deluge.jpg"
  }
];

const loader = new THREE.TextureLoader();
const paintings = [];
const positions = [
  { x: -6, y: 5, z: -9.9, ry: 0 },           // front wall
  { x: 6, y: 5, z: -9.9, ry: 0 },
  { x: -6, y: 5, z: 9.9, ry: Math.PI },      // back wall
  { x: 6, y: 5, z: 9.9, ry: Math.PI },
  { x: -9.9, y: 5, z: -6, ry: Math.PI / 2 }  // left wall
];

paintingData.forEach((data, i) => {
  const texture = loader.load(data.image);
  texture.colorSpace = THREE.SRGBColorSpace;

  const mat = new THREE.MeshBasicMaterial({ map: texture });
  const geo = new THREE.PlaneGeometry(4, 3);
  const painting = new THREE.Mesh(geo, mat);

  const pos = positions[i % positions.length];
  painting.position.set(pos.x, pos.y, pos.z);
  painting.rotation.y = pos.ry;
  painting.userData = { ...data };

  scene.add(painting);
  paintings.push(painting);
});

// Raycaster & Interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(paintings);

  if (intersects.length > 0) {
    const painting = intersects[0].object;
    const { title, description, image } = painting.userData;
    
    // Show modal or alert with full image and description
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.9)';
    modal.style.display = 'flex';
    modal.style.flexDirection = 'column';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';

    const img = document.createElement('img');
    img.src = image;
    img.style.maxWidth = '80vw';
    img.style.maxHeight = '70vh';
    img.style.marginBottom = '1rem';

    const caption = document.createElement('p');
    caption.innerHTML = `<strong>${title}</strong><br>${description}`;
    caption.style.color = '#fff';
    caption.style.textAlign = 'center';

    modal.appendChild(img);
    modal.appendChild(caption);

    modal.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    document.body.appendChild(modal);
  }
}
window.addEventListener('click', onMouseClick);

// Render Loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});






































