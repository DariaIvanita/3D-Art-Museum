// Load images for the gallery
const textureLoader = new THREE.TextureLoader();
const paintings = [
    { title: 'The Creation of Adam', artist: 'Michelangelo', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/the_creation_of_adam.jpg' },
    { title: 'The Last Judgement', artist: 'Michelangelo', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/the_last_judgement.jpg' },
    { title: 'The Prophet Jeremiah', artist: 'Michelangelo', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/the_prophet_jeremiah.jpg' },
    { title: 'The Libyan Sibyl', artist: 'Michelangelo', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/the_libyan_sibyl.jpg' },
    { title: 'The Deluge', artist: 'Michelangelo', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/the_deluge.jpg' },
    { title: 'Separation of Light and Darkness', artist: 'Michelangelo', image: 'https://raw.githubusercontent.com/DariaIvanita/3D-Art-Museum/main/images/separation_of_light_and_darkness.jpg' },
];

const positions = [
    { x: -6, y: 2.5, z: -6 },
    { x: 6, y: 2.5, z: -6 },
    { x: -6, y: 2.5, z: 6 },
    { x: 6, y: 2.5, z: 6 },
    { x: 0, y: 2.5, z: -6 },
    { x: 0, y: 2.5, z: 6 }
];

const infoDiv = document.createElement('div');
infoDiv.style.position = 'absolute';
infoDiv.style.top = '10px';
infoDiv.style.left = '10px';
infoDiv.style.background = 'rgba(0, 0, 0, 0.7)';
infoDiv.style.color = '#fff';
infoDiv.style.padding = '10px';
infoDiv.style.display = 'none'; // Initially hidden
document.body.appendChild(infoDiv);

paintings.forEach((painting, index) => {
    textureLoader.load(painting.image, (texture) => {
        const imgMaterial = new THREE.MeshLambertMaterial({ map: texture });
        const imgGeometry = new THREE.PlaneGeometry(2, 1.5);
        const imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);
        imgMesh.position.set(positions[index].x, positions[index].y, positions[index].z);
        imgMesh.lookAt(camera.position);
        imgMesh.userData = { title: painting.title, artist: painting.artist }; // Store painting details
        scene.add(imgMesh);
    });
});

// Raycaster for hover effect
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

function animate() {
    requestAnimationFrame(animate);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {
        const intersected = intersects[0].object;
        if (intersected.userData) {
            infoDiv.style.display = 'block';
            infoDiv.innerHTML = `${intersected.userData.title} by ${intersected.userData.artist}`;
        }
    } else {
        infoDiv.style.display = 'none';
    }

    renderer.render(scene, camera);
}
animate();













