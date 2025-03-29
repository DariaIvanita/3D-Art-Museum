// Include the Tween.js library
// <script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/r18/tween.umd.js"></script>

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
frontWall.position.set(0, 6, -10);
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
  { title: "The Creation Of Adam", description: "This iconic fresco...", image: "the_creation_of_adam.jpg" },
  { title: "The Last Judgement", description: "Painted on the altar...", image: "the_last_judgement.jpg" },
  { title: "The Prophet Jeremiah", description: "This portrait of the prophet...", image: "the_prophet_jeremiah.jpg" },
  { title: "The Libyan Sibyl", description: "One of five sibyls...", image: "the_libyan_sibyl.jpg" },
  { title: "The Deluge", description: "This fresco tells the story...", image: "the_deluge.jpg" },
  { title: "The Seperation Of Light And Darkness", description: "In this piece Michelangelo...", image: "the_seperation_of_light_and_darkness.jpg" }
];

const positions = [
  { x: -8, y: 5, z: -9, ry: 0 },           
  { x: -4, y: 5, z: -9, ry: 0 },           
  { x: 0, y: 5, z: -9, ry: 0 },            
  { x: 4, y: 5, z: -9, ry: 0 },            
  { x: 8, y: 5, z: -9, ry: 0 },            
  { x: 0, y: 5, z: 9, ry: Math.PI }        
];

// Create Paintings on Walls
const loader = new THREE.TextureLoader();
const paintings = [];
paintingData.forEach((data, i) => {
  const texture = loader.load(data.image);
  texture.colorSpace = THREE.SRGBColorSpace;

  const mat = new THREE.MeshBasicMaterial({ map: texture });
  const geo = new THREE.PlaneGeometry(4, 3);
  const painting = new THREE.Mesh(geo, mat);

  const pos = positions[i];
  painting.position.set(pos.x, pos.y, pos.z);
  painting.rotation.y = pos.ry;

  painting.userData = { ...data };

  // Add painting to the scene
  scene.add(painting);
  paintings.push(painting);
});

// Animation for hover effect (scaling and tilting)
let scaleUp = false;
let hoveredPainting = null;
let tilt = 0;

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
      tilt = 0.05; // Small tilt effect
    }
  } else {
    if (hoveredPainting) {
      scaleUp = false;
      hoveredPainting = null;
      tilt = 0;  // Reset tilt when not hovering
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

  paintings.forEach((painting) => {
    // Apply scaling effect for hover
    if (painting === hoveredPainting && scaleUp) {
      painting.scale.set(1.1, 1.1, 1.1);  // Scale up on hover
      painting.rotation.y += tilt;  // Add tilt effect
    } else {
      painting.scale.set(1, 1, 1);  // Reset to normal scale
      painting.rotation.y = pos.ry;  // Reset rotation
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












































