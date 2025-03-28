
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

// Painting data (images with descriptions)
const paintingData = [
  {
    title: "The Creation Of Adam",
    description: "This iconic fresco on the ceiling of the Sistine Chapel captures the moment when God reaches out to give life to Adam.",
    image: "https://images.unsplash.com/photo-1549893074-40eac58f8863"
  },
  {
    title: "The Last Judgement",
    description: "Painted on the altar wall of the Sistine Chapel, depicting the final day when souls are judged by Christ.",
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
  },
  {
    title: "The Prophet Jeremiah",
    description: "This portrait of the prophet Jeremiah shows him lost in thought, reflecting the weight of his predictions of destruction.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156"
  },
  {
    title: "The Libyan Sibyl",
    description: "One of five sibyls painted on the Sistine Chapel ceiling, shown in a powerful pose while holding a book of prophecy.",
    image: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde"
  },
  {
    title: "The Deluge",
    description: "This fresco tells the story of the biblical flood, capturing the emotion of people scrambling to survive.",
    image: "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb"
  },
  {
    title: "The Separation Of Light And Darkness",
    description: "Michelangelo paints God in motion, splitting light from darkness during the creation of the world.",
    image: "https://images.unsplash.com/photo-1504198458649-3128b932f49b"
  }
];

// Create and place paintings
const loader = new THREE.TextureLoader();
const paintingWidth = 3;
const paintingHeight = 2;
const paintingDepth = 0.1;
const clickableObjects = [];
const infoBox = document.createElement('div');
infoBox.style.position = 'absolute';
infoBox.style.bottom = '10px';
infoBox.style.left = '10px';
infoBox.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
infoBox.style.color = 'white';
infoBox.style.padding = '10px';
infoBox.style.display = 'none';
document.body.appendChild(infoBox);

function createPainting(texture, title, description, position, rotationY) {
  const materials = [
    new THREE.MeshLambertMaterial({ color: 0x000000 }), // left
    new THREE.MeshLambertMaterial({ color: 0x000000 }), // right
    new THREE.MeshLambertMaterial({ color: 0x000000 }), // top
    new THREE.MeshLambertMaterial({ color: 0x000000 }), // bottom
    new THREE.MeshLambertMaterial({ map: texture }),   // front
    new THREE.MeshLambertMaterial({ color: 0x000000 })  // back
  ];

  const geometry = new THREE.BoxGeometry(paintingWidth, paintingHeight, paintingDepth);
  const painting = new THREE.Mesh(geometry, materials);
  painting.position.set(position.x, position.y, position.z);
  painting.rotation.y = rotationY;
  painting.userData = { title, description };
  scene.add(painting);
  clickableObjects.push(painting);
}

// Place 2 paintings on each of 3 walls
paintingData.forEach((painting, i) => {
  loader.load(painting.image, (texture) => {
    let pos = { x: 0, y: 5, z: 0 };
    let rotY = 0;

    if (i < 2) {
      // Front wall
      pos.z = -9.9;
      pos.x = i === 0 ? -4 : 4;
      rotY = 0;
    } else if (i < 4) {
      // Left wall
      pos.x = -9.9;
      pos.z = i === 2 ? -4 : 4;
      rotY = Math.PI / 2;
    } else {
      // Right wall
      pos.x = 9.9;
      pos.z = i === 4 ? -4 : 4;
      rotY = -Math.PI / 2;
    }

    createPainting(texture, painting.title, painting.description, pos, rotY);
  });
});

// Raycaster for clicking on paintings
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(clickableObjects);

  if (intersects.length > 0) {
    const painting = intersects[0].object.userData;
    infoBox.style.display = 'block';
    infoBox.innerHTML = `
      <h2>${painting.title}</h2>
      <p>${painting.description}</p>
    `;
  } else {
    infoBox.style.display = 'none';
  }
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

























