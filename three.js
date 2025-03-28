// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.3,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

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

// Wall
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
const wallGeometry = new THREE.PlaneGeometry(20, 10);
const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
frontWall.position.set(0, 5, -10);
scene.add(frontWall);

// Painting data
const paintingData = [
  {
    title: "Starry Night",
    description: "A famous painting by Vincent van Gogh.",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    position: { x: -4, y: 5, z: -9.9 }
  },
  {
    title: "The Scream",
    description: "An iconic expressionist painting by Edvard Munch.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg",
    position: { x: 4, y: 5, z: -9.9 }
  }
];

const paintings = [];

paintingData.forEach((data) => {
  const texture = new THREE.TextureLoader().load(data.image);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const geometry = new THREE.PlaneGeometry(3, 3);
  const painting = new THREE.Mesh(geometry, material);
  painting.position.set(data.position.x, data.position.y, data.position.z);
  scene.add(painting);
  painting.userData = data;
  paintings.push(painting);
});

// Raycaster for interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Click event
window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(paintings);

  if (intersects.length > 0) {
    const painting = intersects[0].object;
    showInfo(painting.userData);
  }
});

// Show modal/info box
function showInfo(data) {
  const infoBox = document.getElementById("infoBox");
  infoBox.style.display = "block";
  infoBox.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <img src="${data.image}" alt="${data.title}" style="max-width: 300px; width: 100%; margin-top: 10px; border: 2px solid white;" />
  `;
}

// Camera position
camera.position.set(0, 5, 10);
camera.lookAt(0, 5, -10);

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();



















