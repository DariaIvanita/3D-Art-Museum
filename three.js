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

// Painting data (6 paintings)
const paintingData = [
  {
    title: "The Creation Of Adam",
    description: "This iconic fresco on the ceiling of the Sistine Chapel is one of the most recognizable images in history It captures the powerful moment when God reaches out to give life to Adam Their fingertips nearly touching symbolize the connection between humanity and the divine The painting’s soft colors and lifelike details remind us of the fragile yet powerful nature of life",
    image:
      "the_creation_of_adam.jpg",
    position: { x: -6.5, y: 5, z: -9.8 }
  },
  {
    title: "The Last Judgement ",
    description: "Painted on the altar wall of the Sistine Chapel, this massive fresco portrays the final day when souls are judged by Christ. The swirling chaos of bodies rising to heaven or falling to hell creates a sense of fear, hope, anduncertainty. Michelangelo poured his own struggles and emotions into this painting, making it feel deeply personal.",
    image:
      "the_last_judgement.jpg",
    position: { x: -3.3, y: 5, z: -9.8 }
  },
  {
    title: "The Phrophet Jeremiah",
    description: " This portrait of the prophet Jeremiah shows a man lost in thought, his head resting on his hand. His tired expression and slouched posture make him feel painfully human, reflecting the weight of his predictions of destruction. Michelangelo's ability to express raw emotion through body language makes this piece incredibly relatable.",
    image:
      "the_prophet_jeremiah.jpg",
    position: { x: 0, y: 5, z: -9.8 }
  },
  {
    title: "The Libyan Sibyl",
    description: ": One of five sibyls painted on the Sistine Chapel ceiling, the Libyan Sibyl is shown mid-motion, twisting her body as she reaches for a book of prophecy. Her strong yet graceful pose highlights the beauty and strength of the human form, while her concentrated expression shows wisdom and determination.",
    image:
      "the_libyan_sibyl.jpg",
    position: { x: 3.3, y: 5, z: -9.8 }
  },
  {
    title: "The Deluge",
    description: " This fresco tells the story of the biblical flood, with people scrambling to survive as water overtakes the land. The painting feels alive with movement and emotion, capturing both fear and hope. It’s a reminder of the fragility of life and the power of nature.",
    image:
      "the_deluge.jpg",
    position: { x: 6.5, y: 5, z: -9.8 }
  },
  {
    title: "The Seperation Of Light And Darkness",
    description: "In this piece, Michelangelo paints God in motion, splitting light from darkness during the creation of the world. The swirling robes and dramatic lighting give a sense of energy and purpose, showing the universe being brought into existence.",
    image:
      "the_separation_of_light_and_darkness.jpg",
    position: { x: 9.7, y: 5, z: -9.8 }
  }
];

// Add paintings
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const clickableObjects = [];
const infoBox = document.getElementById("infoBox");

paintingData.forEach((painting) => {
  const texture = new THREE.TextureLoader().load(painting.image);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const geometry = new THREE.PlaneGeometry(2.5, 3.5);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(painting.position.x, painting.position.y, painting.position.z);
  mesh.userData = painting;
  scene.add(mesh);
  clickableObjects.push(mesh);
});

// Camera position
camera.position.set(0, 5, 5);
camera.lookAt(0, 5, -10);

// Mouse click handler
window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(clickableObjects);

  if (intersects.length > 0) {
    const painting = intersects[0].object.userData;
    infoBox.style.display = "block";
    infoBox.innerHTML = `
      <h2>${painting.title}</h2>
      <img src="${painting.image}" alt="${painting.title}" style="max-width: 300px; display:block; margin-top:10px;">
      <p style="margin-top:10px;">${painting.description}</p>
    `;
  } else {
    infoBox.style.display = "none";
  }
});

// Handle resize
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




















