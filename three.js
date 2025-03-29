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
scene.add(new THREE.AmbientLight(0x404040, 2)); // Dim ambient light
const light = new THREE.DirectionalLight(0xffffff, 1); // Main light
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

// Paintings Data
const paintingData = [
  {
    title: "The Creation Of Adam",
    description: "This iconic fresco on the ceiling of the Sistine Chapel is one of the most recognizable images in history. It captures the powerful moment when God reaches out to give life to Adam. Their fingertips nearly touching symbolize the connection between humanity and the divine.",
    image: "the_creation_of_adam.jpg"
  },
  {
    title: "The Last Judgement",
    description: "Painted on the altar wall of the Sistine Chapel, this massive fresco portrays the final day when souls are judged by Christ. The swirling chaos of bodies rising to heaven or falling to hell creates a sense of fear, hope, and uncertainty.",
    image: "the_last_judgement.jpg"
  },
  {
    title: "The Prophet Jeremiah",
    description: "This portrait of the prophet Jeremiah shows a man lost in thought, his head resting on his hand. His tired expression and slouched posture make him feel painfully human, reflecting the weight of his predictions of destruction.",
    image: "the_prophet_jeremiah.jpg"
  },
  {
    title: "The Libyan Sibyl",
    description: "One of five sibyls painted on the Sistine Chapel ceiling, the Libyan Sibyl is shown mid-motion, twisting her body as she reaches for a book of prophecy. Her strong yet graceful pose highlights the beauty and strength of the human form.",
    image: "the_libyan_sibyl.jpg"
  },
  {
    title: "The Deluge",
    description: "This fresco tells the story of the biblical flood, with people scrambling to survive as water overtakes the land. The painting feels alive with movement and emotion, capturing both fear and hope.",
    image: "the_deluge.jpg"
  },
  {
    title: "The Seperation Of Light And Darkness",
    description: "In this piece Michelangelo paints God in motion splitting light from darkness during the creation of the world. The swirling robes and dramatic lighting give a sense of energy and purpose.",
    image: "the_seperation_of_light_and_darkness.jpg"
  }
];

// Ensure there are 6 positions with more space between them
const positions = [
  { x: -7, y: 5, z: -9.9, ry: 0 },           // front wall
  { x: 7, y: 5, z: -9.9, ry: 0 },            // front wall
  { x: -7, y: 5, z: 9.9, ry: Math.PI },      // back wall
  { x: 7, y: 5, z: 9.9, ry: Math.PI },       // back wall
  { x: -9.9, y: 5, z: -7, ry: Math.PI / 2 },  // left wall
  { x: 9.9, y: 5, z: -7, ry: -Math.PI / 2 }  // right wall
];

// Create Paintings on Walls
const loader = new THREE.TextureLoader();
const paintings = [];

paintingData.forEach((data, i) => {
  const texture = loader.load(data.image);
  texture.colorSpace = THREE.SRGBColorSpace;

  // Painting itself (directly on the wall)
  const mat = new THREE.MeshBasicMaterial({ map: texture });
  const geo = new THREE.PlaneGeometry(4, 3);
  const painting = new THREE.Mesh(geo, mat);

  // Position the painting directly onto the wall
  const pos = positions[i];  // Correctly map positions
  painting.position.set(pos.x, pos.y, pos.z);
  painting.rotation.y = pos.ry;

  painting.userData = { ...data };

  // Add painting to the scene
  scene.add(painting);
  paintings.push(painting);
});

// Animation for hover effect (scaling)
let scaleUp = false;
let hoveredPainting = null;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(paintings);

  if (intersects.length > 0) {
    const painting = intersects[0].object;
    if (hoveredPainting !== painting) {
      hoveredPainting = painting;
      scaleUp = true;
    }
  } else {
    if (hoveredPainting) {
      scaleUp = false;
      hoveredPainting = null;
    }
  }
}

function onMouseClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(paintings);

  if (intersects.length > 0) {
    const painting = intersects[0].object;
    const { title, description, image } = painting.userData;
    
    // Create and show modal with full image and description
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
    caption.style.maxWidth = '80vw';

    modal.appendChild(img);
    modal.appendChild(caption);

    modal.addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    document.body.appendChild(modal);
  }
}

window.addEventListener('mousemove', onMouseMove);
window.addEventListener('click', onMouseClick);

// Render Loop with Animation
function animate() {
  requestAnimationFrame(animate);

  // Apply scaling effect for hover
  paintings.forEach((painting) => {
    if (painting === hoveredPainting && scaleUp) {
      painting.scale.set(1.1, 1.1, 1.1);  // Scale up on hover
    } else {
      painting.scale.set(1, 1, 1);  // Reset to normal scale
    }
  });

  renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});











































