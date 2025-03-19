// console.Log('Three object here', THREE);

const scene= new THREE.scene(); // create the scene
const camera = new THREE.perspectiveCamera()
75, // Field of camera 
window.innerWidth / windowinnerHeight, // Aspect Ratio 
0,
1,
1000
);
scene.add(camera);
camera.postion.z = 5; // move the camera back 5 units

// Renderer 
const renderer = new THREE.WebGL renderer({ antialias; true }); // for smooth edges
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffff, 1); // background color
document.body.appendChild(renderer.donElement); // add the renderrer to the the HTML

// Let there be light 
let ambientLight = new THREE.AmbientLight(0x101010,1.0); // Color, intensity, distance decay
ambientlight.position = camera.position; //light follows camera
scene.add(ambientlight); 

//Direction Light
let sunlight = new THREE.DirectionLight(0xdddd,1.00; // color intensity 
sunlight.position.y =1.5;
scene.add(sunLight);

cont geometry = new THREE.BoxGeometry (1,1,1); // Box Geometry is the shape of the object
cont material  = new THREE.MashBasicMaterial({ color:'blue'}); // MashBasicMaterial is the color of the object
const material = new THREE.Mash(geometry ,material); // create cube with geomitry and material
scene.add(cube);




//Render
renderer.render(scene, camera);

















