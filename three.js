

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

// Painting data
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

// Texture loader & painting placement
const loader = new THREE.TextureLoader();
const paintings = [];
const wallPositions = [
  { x: -6, y: 5, z: -9.9, rotationY: 0 },
  { x: 6, y: 5, z: -9.9, rotationY: 0 },
  { x: -6, y: 5, z: 9.9, rotationY: Math.PI },
  { x: 6, y: 5, z: 9.9, rotationY: Math.PI },
  { x: -9.9, y: 5, z: 0, rotationY: Math.PI / 2 }
];

paintingData.forEach((data, index) => {
  const texture = loader.load(data.image);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const geometry = new THREE.PlaneGeometry(5, 3);
  const painting = new THREE.Mesh(geometry, material);

  const position = wallPositions[index % wallPositions.length];
  painting.position.set(position.x, position.y, position.z);
  painting.rotation.y = position.rotationY;

  painting.userData = {
    title: data.title,
    description: data.description,
    image: data.image
  };

  scene.add(painting);
  paintings.push(painting);
});

// Raycasting for interactivity
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(paintings);

  if (intersects.length > 0) {
    const painting = intersects[0].object;
    const { title, description, image } = painting.userData;

    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = '#fff';
    modal.style.padding = '20px';
    modal.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
    modal.style.zIndex = 9999;
    modal.innerHTML = `
      <h2>${title}</h2>
      <img src="${image}" style="max-width: 100%; height: auto;" />
      <p>${description}</p>
      <button id="closeModal">Close</button>
    `;
    document.body.appendChild(modal);

    document.getElementById("closeModal").onclick = () => {
      document.body.removeChild(modal);
    };
  }
}
window.addEventListener('click', onClick);

// Audio setup (with button)
const listener = new THREE.AudioListener();
camera.add(listener);
const backgroundAudio = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('background.mp3', function(buffer) {
  backgroundAudio.setBuffer(buffer);
  backgroundAudio.setLoop(true);
  backgroundAudio.setVolume(0.5);
});

document.getElementById("play-audio").addEventListener("click", () => {
  backgroundAudio.play();
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Responsive
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});






































