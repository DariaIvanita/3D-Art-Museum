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

paintingData.forEach((data, index) => {
  const texture = loader.load(data.image);
  texture.colorSpace = THREE.SRGBColorSpace;
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const geometry = new THREE.PlaneGeometry(5, 3);
  const painting = new THREE.Mesh(geometry, material);

  painting.position.set(-8 + index * 4, 5, -9.9);
  scene.add(painting);
  paintings.push(painting);
});

// 3D Statue image as a plane (replace with 3D model if needed)
const statueTexture = loader.load("3d.model.jpg"); // Replace with your statue image
statueTexture.colorSpace = THREE.SRGBColorSpace;
const statueMaterial = new THREE.MeshBasicMaterial({ map: statueTexture, transparent: true });
const statue = new THREE.Mesh(new THREE.PlaneGeometry(4, 6), statueMaterial);
statue.position.set(0, 3, 5);
scene.add(statue);

// Raycaster for interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hovered = null;

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener("mousemove", onMouseMove, false);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Painting hover interaction
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(paintings);

  if (intersects.length > 0) {
    if (hovered !== intersects[0].object) {
      if (hovered) hovered.scale.set(1, 1, 1);
      hovered = intersects[0].object;
      hovered.scale.set(1.1, 1.1, 1);
    }
  } else {
    if (hovered) hovered.scale.set(1, 1, 1);
    hovered = null;
  }

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

































