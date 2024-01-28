// main.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Initialize scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff); // Set white background color

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add resize event listener
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Create GLTF loader
const loader = new GLTFLoader();

// Load the cat model
let catModel;
// After loading the model
loader.load('cat.gltf', (gltf) => {
    catModel = gltf.scene;
    catModel.scale.set(0.6, 0.6, 0.6); // Adjust the scale as needed
    catModel.position.set(0, 0, 0); // Adjust the position as needed
    // Rotate the model externally before exporting or adjust the rotation manually
    catModel.rotation.set(0, Math.PI / 2, 0);
    scene.add(catModel);
});


// Create OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

// Example directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();
scene.add(light);

// Animation loop
const animate = () => {
    requestAnimationFrame(animate);

    // Rotate the cat model
    if (catModel) {
        catModel.rotation.x = 0;
        catModel.rotation.y = 0;
        catModel.rotation.z = 0;
    }

    controls.update(); // Update controls

    renderer.render(scene, camera);
};

// Start animation loop
animate();
