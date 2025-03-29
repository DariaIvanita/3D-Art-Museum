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
const paintings = [];
const paintingInfo = document.createElement("div");

paintingInfo.style.position = "absolute";
paintingInfo.style.top = "20px";
paintingInfo.style.left = "20px";
paintingInfo.style.padding = "10px";
paintingInfo.style.background = "rgba(0,0,0,0.7)";
paintingInfo.style.color = "white";
paintingInfo.style.display = "none";
document.body.appendChild(paintingInfo);

// Paintings on each wall
const wallPositions = [
  { wall: "front", x: -6, y: 5, z: -9.9, rotY: 0 },
  { wall: "back", x: 6, y: 5, z: 9.9, rotY: Math.PI },
  { wall: "left", x: -9.9, y: 5, z: 6, rotY: Math.PI / 2 },
  { wall: "right", x: 9.9, y: 5, z: -6, rotY: -Math.PI / 2 },
  { wall: "front", x: 6, y: 5, z: -9.9, rotY: 0 }
];

paintingData.forEach((data, index) => {
  const texture = loader.load(data.image);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const geometry = new THREE.PlaneGeometry(4, 3);
  const painting = new THREE.Mesh(geometry, material);

  const pos = wallPositions[index];
  painting.position.set(pos.x, pos.y, pos.z);
  painting.rotation.y = pos.rotY;

  painting.userData = data;
  paintings.push(painting);
  scene.add(painting);
});

// Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let zoomed = false;
let originalCameraPos = camera.position.clone();

window.addEventListener("click", (event) => {
  if (zoomed) {
    camera.position.copy(originalCameraPos);
    paintingInfo.style.display = "none";
    zoomed = false;
    return;
  }

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(paintings);

  if (intersects.length > 0) {
    const painting = intersects[0].object;
    const worldPos = new THREE.Vector3();
    painting.getWorldPosition(worldPos);

    originalCameraPos = camera.position.clone();
    camera.position.set(worldPos.x, worldPos.y, worldPos.z + 5);

    paintingInfo.innerHTML = `<h2>${painting.userData.title}</h2><p>${painting.userData.description}</p>`;
    paintingInfo.style.display = "block";
    zoomed = true;
  }
});

// Statue image (flat image representation)
const statueTexture = loader.load("statue.jpg");
const statueMaterial = new THREE.MeshBasicMaterial({ map: statueTexture });
const statueGeometry = new THREE.PlaneGeometry(3, 6);
const statue = new THREE.Mesh(statueGeometry, statueMaterial);
statue.position.set(0, 3, 0);
scene.add(statue);

// Animate
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();


































