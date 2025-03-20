let scene, camera, renderer;
let paintings = [];
let statue, exploreButton;
let audioPlayer = document.getElementById('audio-player');
let audioSource = document.getElementById('audio-source');
let paintingTitle = document.getElementById('painting-title');
let paintingDescription = document.getElementById('painting-description');

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('webgl-output').appendChild(renderer.domElement);
    
    // Lighting
    const light = new THREE.AmbientLight(0x404040, 1); 
    scene.add(light);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create a floor
    const floorGeometry = new THREE.PlaneGeometry(1000, 1000);
    const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.5 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = - Math.PI / 2;
    floor.position.y = -1;
    floor.receiveShadow = true;
    scene.add(floor);

    // Camera Position
    camera.position.z = 10;

    // Paintings (6 paintings)
    const paintingData = [
        { title: 'The Creation of Adam', description: 'A fresco depicting the moment when God gives life to Adam.', image: 'images/creation_of_adam.jpg', audio: 'audio/creation_of_adam.mp3' },
        { title: 'Sistine Chapel Ceiling', description: 'Michelangelo\'s iconic fresco of the Sistine Chapel ceiling.', image: 'images/sistine_chapel.jpg', audio: 'audio/sistine_chapel.mp3' },
        { title: 'David Statue', description: 'A marble statue of the biblical hero David.', image: 'images/david_statue.jpg', audio: 'audio/david.mp3' },
        { title: 'The Last Judgment', description: 'A fresco depicting the second coming of Christ.', image: 'images/last_judgment.jpg', audio: 'audio/last_judgment.mp3' },
        { title: 'The Dying Slave', description: 'Michelangelo\'s unfinished sculpture depicting a slave in agony.', image: 'images/dying_slave.jpg', audio: 'audio/dying_slave.mp3' },
        { title: 'Medici Chapel', description: 'Michelangelo\'s sculptures in the Medici Chapel.', image: 'images/medici_chapel.jpg', audio: 'audio/medici_chapel.mp3' }
    ];

    const geometry = new THREE.PlaneGeometry(2, 3);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    
    for (let i = 0; i < paintingData.length; i++) {
        let painting = new THREE.Mesh(geometry, material);
        painting.position.set(i * 3 - 7.5, 0, 0);
        scene.add(painting);
        
        const texture = new THREE.TextureLoader().load(paintingData[i].image);
        painting.material.map = texture;
        painting.userData = paintingData[i];
        
        painting.name = "painting_" + i;
        painting.intersected = false;
        
        paintings.push(painting);
    }

    // Statue (simple sphere for demonstration, can replace with actual 3D model later)
    const statueGeometry = new THREE.SphereGeometry(1, 32, 32);
    const statueMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
    statue = new THREE.Mesh(statueGeometry, statueMaterial);
    statue.position.set(0, -2, -5);
    scene.add(statue);
    
    // Event listeners
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('click', onDocumentClick, false);
}

// Handle window resize
function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

// Detecting mouse clicks to interact with paintings
function onDocumentClick(event) {
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(paintings);
    
    if (intersects.length > 0) {
        const painting = intersects[0].object;
        const data = painting.userData;

        paintingTitle.textContent = data.title;
        paintingDescription.textContent = data.description;
        audioSource.src = data.audio;
        audioPlayer.load();
        audioPlayer.play();
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}


