// main.js
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'; 

// Initialize scene
const scene = new THREE.Scene();

new RGBELoader()
    .load("/environment1.hdr", function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.background = texture;
        scene.environment = texture;
    });

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create WebGL renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.6;
renderer.outputEncoding = THREE.LinearEncoding;

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
