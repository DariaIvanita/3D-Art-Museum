// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.3,
  1000
);
camera.position.set(0, 5, 20);

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
    description: "This iconic fresco on the ceiling of the Sistine Chapel is one of the most recognizable images in history.",
  },
  {
    title: "Starry Night",
    description: "A swirling night sky over a quiet town, painted by Vincent van Gogh in a vibrant and emotional style.",
  },
  {
    title: "Mona Lisa",
    description: "Leonardo da Vinci’s mysterious woman with the famous smile, painted with masterful realism.",
  },
  {
    title: "The Scream",
    description: "Edvard Munch’s expressionist painting depicting a figure in agony under a blood-red sky.",
  },
  {
    title: "Girl With a Pearl Earring",
    description: "A captivating portrait by Johannes Vermeer, often referred to as the ‘Mona Lisa of the North’.",
  },
  {
    title: "The Persistence of Memory",
    description: "Salvador Dalí’s surrealist masterpiece featuring melting clocks in a dreamlike landscape.",
  }
];

// Create 3D painting (thin box)
function createPainting(title) {
  const geometry = new THREE.BoxGeometry(3, 2, 0.1);
  const material = new THREE.MeshLambertMaterial({ color: 0xffffff });
  const mesh = new THREE.Mesh(geometry, material);

  // Add a black frame
  const edgeGeometry = new THREE.EdgesGeometry(geometry);
  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
  const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
  mesh.add(edges);

  return mesh;
}

// Place 2 paintings per wall
const wallPositions = [
  { wall: 'front', z: -9.95, xOffset: [-5, 5], y: 5, rotY: 0 },
  { wall: 'back', z: 9.95, xOffset: [-5, 5], y: 5, rotY: Math.PI },
  { wall: 'left', x: -9.95, zOffset: [-5, 5], y: 5, rotY: Math.PI / 2 },
  { wall: 'right', x: 9.95, zOffset: [-5, 5], y: 5, rotY: -Math.PI / 2 },
];

let index = 0;
wallPositions.forEach(pos => {
  for (let i = 0; i < 2; i++) {
    const painting = createPainting(paintingData[index].title);

    if (pos.wall === 'front' || pos.wall === 'back') {
      painting.position.set(pos.xOffset[i], pos.y, pos.z);
    } else {
      painting.position.set(pos.x, pos.y, pos.zOffset[i]);
    }

    painting.rotation.y = pos.rotY;
    scene.add(painting);
    index++;
  }
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();





















