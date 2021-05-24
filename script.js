// Import three
import * as THREE from 'https://unpkg.com/three/build/three.module.js';
// Import the default VRButton
import { VRButton } from 'https://unpkg.com/three/examples/jsm/webxr/VRButton.js';
// GLTF Loader
import {GLTFLoader} from './js/GLTFLoader.js';

let scene = new THREE.Scene();
let Mesh, Mesh2;
// scene.background = new THREE.Color(0xFFC3E1);
scene.background = new THREE.Color(0xFFC3E1);

// Make a camera
let camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50);
scene.add(camera);

// Add some lights
var light = new THREE.DirectionalLight(0xffffff, 0.5);
light.position.set(1, 1, 1).normalize();
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 1))
	
const texture = new THREE.TextureLoader().load('');  // Write the location of your image(s) in 'load()'
const material = new THREE.MeshBasicMaterial({ map: texture });

// Cube 1
let cube1 = new THREE.Mesh(
	new THREE.BoxBufferGeometry(5, 5, 5),
	material);
cube1.position.set(20, -15, -30);
scene.add(cube1);

// Cube 2
let cube2 = new THREE.Mesh(
	new THREE.BoxBufferGeometry(5, 5, 5),
	material);
cube2.position.set(20, 10, -30);
scene.add(cube2);

// Cube 3
let cube3 = new THREE.Mesh(
	new THREE.BoxBufferGeometry(5, 5, 5),
	material);
	// new THREE.MeshLambertMaterial({ color: 'blue' })
// );
cube3.position.set(-20, -15, -30);
scene.add(cube3);

// Cube 4
let cube4 = new THREE.Mesh(
	new THREE.BoxBufferGeometry(5, 5, 5),
	material);
cube4.position.set(-20, 10, -30);
scene.add(cube4);

// Cake
let cake = new GLTFLoader();
cake.load('./model/scene.gltf', (gltf) => {
	Mesh = gltf.scene;
	Mesh.scale.set(10, 10, 10);
	scene.add(Mesh);
	Mesh.position.set(0, 10, -60)
});

// Text
let text = new GLTFLoader();
text.load('./model/happy_mothers_day.glb', (gltf) => {
	Mesh2 = gltf.scene;
	Mesh2.scale.set(100, 100, 100);
	scene.add(Mesh2);
	Mesh2.position.set(0, 15, -80)
});

function animate() {
	requestAnimationFrame(animate);
	if (Mesh && Mesh.rotation) {
		Mesh.rotation.y -= 0.005;
		if (Mesh.rotation.y >= 0.007) {
			Mesh.scale.set(25, 25, 25);
		}
		else {
			Mesh.scale.set(10, 10, 10);
		}
	}
	if (Mesh2 && Mesh2.rotation) {
		Mesh2.rotation.y -= 0.000;
	}
}

animate();

let renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;

// Set animation loop
renderer.setAnimationLoop(render);
document.body.appendChild(renderer.domElement);
document.body.appendChild(VRButton.createButton(renderer));
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function render(time) {
	cube1.rotation.y = time / 1000;
	cube4.rotation.y = time / 1000;
	cube3.rotation.y = -time / 1000;
	cube2.rotation.y = -time / 1000;
	renderer.render(scene, camera);
}
