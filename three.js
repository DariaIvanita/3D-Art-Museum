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

// Floor, Roof, and Walls (basic cube setup for simplicity)
const wallGeometry = new THREE.BoxGeometry(1, 10, 20);
const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa });
const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
wall1.position.set(0, 5, -10);
scene.add(wall1);

const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
wall2.rotation.y = Math.PI / 2;
wall2.position.set(10, 5, 0);
scene.add(wall2);

const wall3 = new THREE.Mesh(wallGeometry, wallMaterial);
wall3.rotation.y = Math.PI;
wall3.position.set(0, 5, 10);
scene.add(wall3);

const wall4 = new THREE.Mesh(wallGeometry, wallMaterial);
wall4.rotation.y = -Math.PI / 2;
wall4.position.set(-10, 5, 0);
scene.add(wall4);

// Painting data and placement on walls (using images from the code you provided)
const paintingData = [
  { texture: 'the_creation_of_adam.jpg', position: [-5, 5, -10], description: 'This iconic fresco on the ceiling of the Sistine Chapel is one of the most recognizable images in history. It captures the powerful moment when God reaches out to give life to Adam. Their fingertips nearly touching symbolize the connection between humanity and the divine. The painting’s soft colors and lifelike details remind us of the fragile yet powerful nature of life' },
  { texture: 'the_deluge.jpg', position: [5, 5, -10], description: 'Painted on the altar wall of the Sistine Chapel, this massive fresco portrays the final day when souls are judged by Christ. The swirling chaos of bodies rising to heaven or falling to hell creates a sense of fear, hope, and uncertainty. Michelangelo poured his own struggles and emotions into this painting, making it feel deeply personal. ' },
  { texture: 'the_last_judgement.jpg', position: [-5, 5, 10], description: 'This portrait of the prophet Jeremiah shows a man lost in thought, his head resting on his hand. His tired expression and slouched posture make him feel painfully human, reflecting the weight of his predictions of destruction. Michelangelo's ability to express raw emotion through body language makes this piece incredibly relatable.' },
  { texture: 'the_libyan_sibyl.jpg', position: [5, 5, 10], description: ' One of five sibyls painted on the Sistine Chapel ceiling, the Libyan Sibyl is shown mid-motion, twisting her body as she reaches for a book of prophecy. Her strong yet graceful pose highlights the beauty and strength of the human form, while her concentrated expression shows wisdom and determination.' },
  { texture: 'the_prophet_judgement.jpg', position: [-10, 5, 0], description: 'This fresco tells the story of the biblical flood, with people scrambling to survive as water overtakes the land. The painting feels alive with movement and emotion, capturing both fear and hope. It’s a reminder of the fragility of life and the power of nature.' },
  { texture: 'the_seperation_of_light_and_darkness.jpg', position: [10, 5, 0], description: ': In this piece, Michelangelo paints God in motion, splitting light from darkness during the creation of the world. The swirling robes and dramatic lighting give a sense of energy and purpose, showing the universe being brought into existence.' }
];

const paintings = [];
const textureLoader = new THREE.TextureLoader();

paintingData.forEach(data => {
  const texture = textureLoader.load(data.texture);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const painting = new THREE.Mesh(new THREE.PlaneGeometry(3, 5), material);
  painting.position.set(...data.position);
  paintings.push(painting);
  scene.add(painting);

  // Make paintings clickable
  painting.userData = { description: data.description }; // Store description for later use
  painting.onClick = () => {
    displayPaintingDetails(painting.userData.description, data.texture); // Show details
  };
});

// Audio setup
const backgroundAudio = new Audio('3d.music.mp3');
let isAudioPlaying = false;

// GLTFLoader for 3D Statue (loading the statue as a .jpg texture)
const statueTexture = new THREE.TextureLoader().load('3d.statue.jpg');
const statueMaterial = new THREE.MeshBasicMaterial({ map: statueTexture });
const statueGeometry = new THREE.SphereGeometry(2, 32, 32);
const statue = new THREE.Mesh(statueGeometry, statueMaterial);
statue.position.set(0, 1, 0); // Position it at the center
statue.visible = false; // Hidden by default
scene.add(statue);

// Play Audio Button
document.getElementById("play-audio").addEventListener("click", () => {
  if (isAudioPlaying) {
    backgroundAudio.pause();
    isAudioPlaying = false;
    statue.visible = false; // Hide statue when audio is off
  } else {
    backgroundAudio.play();
    isAudioPlaying = true;
    statue.visible = true; // Show statue when audio starts
  }
});

// Function to display painting details
function displayPaintingDetails(description, texture) {
  const detailsDiv = document.getElementById("painting-details");
  detailsDiv.innerHTML = `
    <h3>Painting Details</h3>
    <img src="${texture}" alt="Full Painting Image" style="width: 300px;">
    <p>${description}</p>
  `;
}

// Animate function
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Resize handler
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});




































