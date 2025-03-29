
// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.3,
  1000
);
camera.position.set(0, 5, 25);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Audio listener and background audio
const listener = new THREE.AudioListener();
camera.add(listener);

const backgroundSound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('background.mp3', function(buffer) {
  backgroundSound.setBuffer(buffer);
  backgroundSound.setLoop(true);
  backgroundSound.setVolume(0.5);
  backgroundSound.play();
});

// Lighting
scene.add(new THREE.AmbientLight(0x404040, 2));
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(6, 10, 6);
scene.add(directionalLight);

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
  new THREE.MeshLambertMaterial({ color: 0x333333, side: THREE.DoubleSide })
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

const loader = new THREE.TextureLoader();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const paintings = [];

// Distribute paintings on all four walls
paintingData.forEach((data, index) => {
  const texture = loader.load(data.image);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const geometry = new THREE.PlaneGeometry(5, 3);
  const painting = new THREE.Mesh(geometry, material);

  // Position logic based on index
  const wall = index % 4;
  const height = 5;
  const offset = ((index % 2) === 0) ? -3 : 3;

  switch (wall) {
    case 0: // front wall
      painting.position.set(offset, height, -9.9);
      break;
    case 1: // right wall
      painting.position.set(9.9, height, offset);
      painting.rotation.y = -Math.PI / 2;
      break;
    case 2: // back wall
      painting.position.set(offset, height, 9.9);
      painting.rotation.y = Math.PI;
      break;
    case 3: // left wall
      painting.position.set(-9.9, height, offset);
      painting.rotation.y = Math.PI / 2;
      break;
  }

  painting.userData = data;
  scene.add(painting);
  paintings.push(painting);
});

// Handle clicks
window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(paintings);
  if (intersects.length > 0) {
    const painting = intersects[0].object;
    const { title, description, image } = painting.userData;
    showImagePopup(image, title, description);
  }
});

// Show popup
function showImagePopup(imageSrc, title, description) {
  let popup = document.getElementById("popup");
  if (!popup) {
    popup = document.createElement("div");
    popup.id = "popup";
    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.backgroundColor = "#fff";
    popup.style.border = "2px solid #000";
    popup.style.padding = "20px";
    popup.style.zIndex = "1000";
    popup.style.maxWidth = "90vw";
    popup.style.maxHeight = "90vh";
    popup.style.overflowY = "auto";

    const img = document.createElement("img");
    img.style.maxWidth = "100%";
    img.style.display = "block";
    img.id = "popup-img";

    const titleEl = document.createElement("h2");
    titleEl.id = "popup-title";

    const desc = document.createElement("p");
    desc.id = "popup-desc";

    const close = document.createElement("button");
    close.innerText = "Close";
    close.onclick = () => popup.remove();

    popup.appendChild(titleEl);
    popup.appendChild(img);
    popup.appendChild(desc);
    popup.appendChild(close);
    document.body.appendChild(popup);
  }

  document.getElementById("popup-img").src = imageSrc;
  document.getElementById("popup-title").innerText = title;
  document.getElementById("popup-desc").innerText = description;
}

// Handle resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();


































