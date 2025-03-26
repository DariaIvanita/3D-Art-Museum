<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>3D Paintings</title>
    <style>
        body { margin: 0; overflow: hidden; }
        #infoBox {
            position: absolute;
            top: 10px;
            left: 10px;
            background: rgba(255, 255, 255, 0.8);
            padding: 10px;
            border-radius: 5px;
            display: none;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <div id="infoBox"></div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script>
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Background Color
        renderer.setClearColor(0xcccccc, 1);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 2);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(6, 10, 6);
        scene.add(directionalLight);

        // Floor
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshLambertMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        scene.add(floor);

        // Create walls
        const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
        const wallGeometry = new THREE.PlaneGeometry(20, 10);

        // Front Wall
        const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
        frontWall.position.set(0, 5, -10);
        scene.add(frontWall);

        // Left Wall
        const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
        leftWall.position.set(-10, 5, 0);
        leftWall.rotation.y = Math.PI / 2;
        scene.add(leftWall);

        // Right Wall
        const rightWall = new THREE.Mesh(wallGeometry, wallMaterial);
        rightWall.position.set(10, 5, 0);
        rightWall.rotation.y = -Math.PI / 2;
        scene.add(rightWall);

        // Load images (adjusted paths if not in a folder)
        const textureLoader = new THREE.TextureLoader();
        const paintings = [
            { title: 'The Creation of Adam', image: 'the_creation_of_adam.jpg' },
            { title: 'The Last Judgment', image: 'the_last_judgment.jpg' },
            { title: 'The Prophet Jeremiah', image: 'the_prophet_jeremiah.jpg' },
            { title: 'The Libyan Sibyl', image: 'the_libyan_sibyl.jpg' },
            { title: 'The Deluge', image: 'the_deluge.jpg' },
            { title: 'Separation of Light and Darkness', image: 'the_separation_of_light_and_darkness.jpg' }
        ];

        const imageWidth = 6;
        const imageHeight = 4;

        // Positions for the paintings on the walls
        const positions = [
            { x: -6, y: 5, z: -9 }, // Front Wall - Left
            { x: 6, y: 5, z: -9 }, // Front Wall - Right
            { x: -9.5, y: 5, z: -3 }, // Left Wall - Top
            { x: -9.5, y: 5, z: 3 }, // Left Wall - Bottom
            { x: 9.5, y: 5, z: -3 }, // Right Wall - Top
            { x: 9.5, y: 5, z: 3 } // Right Wall - Bottom
        ];

        // Painting Info Box
        const infoDiv = document.getElementById('infoBox');

        // Load images with error handling
        const paintingMeshes = [];
        paintings.forEach((painting, index) => {
            textureLoader.load(
                painting.image,
                (texture) => {
                    const imgGeometry = new THREE.PlaneGeometry(imageWidth, imageHeight);
                    const imgMaterial = new THREE.MeshLambertMaterial({ map: texture });
                    const imgMesh = new THREE.Mesh(imgGeometry, imgMaterial);

                    // Set position and orientation of the painting
                    imgMesh.position.set(positions[index].x, positions[index].y, positions[index].z);
                    imgMesh.lookAt(new THREE.Vector3(0, positions[index].y, positions[index].z > 0 ? positions[index].z + 1 : positions[index].z - 1));

                    // Add metadata for hover functionality
                    imgMesh.userData = { title: painting.title };
                    scene.add(imgMesh);

                    paintingMeshes.push(imgMesh); // Store painting mesh for interaction
                },
                undefined,
                (error) => {
                    console.error(`Failed to load image: ${painting.image}`, error);
                }
            );
        });

        // Camera Position
        camera.position.set(0, 5, 20);

        // Handle Resize
        window.addEventListener('resize', () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

        // Raycaster for Hover Effect
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        window.addEventListener('mousemove', (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        function animate() {
            requestAnimationFrame(animate);

            // Hover Detection
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(paintingMeshes);

            if (intersects.length > 0) {
                const painting = intersects[0].object.userData;
                infoDiv.style.display = 'block';
                infoDiv.innerHTML = `<strong>${painting.title}</strong>`;
                infoDiv.style.left = `${event.clientX + 10}px`;
                infoDiv.style.top = `${event.clientY + 10}px`;
            } else {
                infoDiv.style.display = 'none';
            }

            renderer.render(scene, camera);
        }

        animate();
    </script>
</body>
</html>



