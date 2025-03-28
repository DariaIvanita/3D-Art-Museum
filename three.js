<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>3D Art Gallery</title>
  <style>
    body { margin: 0; overflow: hidden; }
    canvas { display: block; }

    #infoModal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: white;
      border-radius: 10px;
      padding: 20px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
      max-width: 80%;
      max-height: 90%;
      display: none;
      z-index: 10;
      text-align: center;
      overflow-y: auto;
    }

    #infoModal img {
      max-width: 100%;
      max-height: 60vh;
      border-radius: 10px;
    }

    #infoModal h2 {
      margin: 10px 0 5px;
    }

    #infoModal p {
      font-size: 1rem;
      color: #444;
    }

    #closeBtn {
      margin-top: 10px;
      padding: 8px 16px;
      cursor: pointer;
      border: none;
      background-color: #333;
      color: white;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div id="infoModal">
    <img id="modalImage" src="" alt="">
    <h2 id="modalTitle"></h2>
    <p id="modalDescription"></p>
    <button id="closeBtn">Close</button>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r148/three.min.js"></script>
  <script>
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.3, 1000);
    camera.position.set(0, 5, 15);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xcccccc, 1);
    document.body.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(6, 10, 6);
    scene.add(directionalLight);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Roof
    const roofGeometry = new THREE.PlaneGeometry(20, 20);
    const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x333333, side: THREE.DoubleSide });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.rotation.x = Math.PI / 2;
    roof.position.set(0, 10, 0);
    scene.add(roof);

    // Walls
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
    const wallGeometry = new THREE.PlaneGeometry(20, 10);

    const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
    frontWall.position.set(0, 5, -10);
    scene.add(frontWall);

    const leftWall = new THREE.Mesh(wallGeometry, wallMaterial);
    leftWall.position.set(-10, 5, 0);
    leftWall.rotation.y = Math.PI / 2;
    scene.add(leftWall);

    // Paintings
    const paintings = [
      {
        title: "Starry Night",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
        description: "A famous painting by Vincent van Gogh created in 1889, depicting a swirling night sky over a quiet town.",
        position: { x: -5, y: 5, z: -9.9 }
      },
      {
        title: "Mona Lisa",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
        description: "Leonardo da Vinci's portrait of Lisa Gherardini, the most recognized painting in the world.",
        position: { x: 5, y: 5, z: -9.9 }
      }
    ];

    const loader = new THREE.TextureLoader();
    const paintingMeshes = [];

    paintings.forEach((painting) => {
      loader.load(painting.image, (texture) => {
        const geometry = new THREE.PlaneGeometry(4, 4);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(painting.position.x, painting.position.y, painting.position.z);
        mesh.userData = painting;
        scene.add(mesh);
        paintingMeshes.push(mesh);
      });
    });

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    window.addEventListener("click", (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(paintingMeshes);

      if (intersects.length > 0) {
        const painting = intersects[0].object.userData;
        document.getElementById("modalImage").src = painting.image;
        document.getElementById("modalTitle").textContent = painting.title;
        document.getElementById("modalDescription").textContent = painting.description;
        document.getElementById("infoModal").style.display = "block";
      }
    });

    document.getElementById("closeBtn").addEventListener("click", () => {
      document.getElementById("infoModal").style.display = "none";
    });

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }

    animate();
  </script>
</body>
</html>

















