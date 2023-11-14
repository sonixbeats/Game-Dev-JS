// Import Three.js library
import * as THREE from 'three';

import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
camera.position.z = 40;

// Create a directional light
const pointLight = new THREE.PointLight(0xbb0bfb);
pointLight.position.set(10, 10, 20);
pointLight.intensity = 20;

// Create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 ); 
const material = new THREE.MeshToonMaterial({ color: 0xffffff });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
scene.add(pointLight);

// create a plane
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshToonMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = -20;
scene.add(plane);

// Create PointerLockControls
const controls = new PointerLockControls(camera, document.body);

// Add controls to the scene
scene.add(controls.getObject());

// Lock pointer on click
document.addEventListener('click', () => {
    controls.lock();
});

// Unlock pointer on escape key
document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') {
        controls.unlock();
    }
});

// Render the scene
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}

// Update controls on each frame
function update() {
    controls.update();
}

// move the camera Up and down
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        controls.getObject().position.y += 5;
    }
});
document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        controls.getObject().position.y -= 5;
    }
});
document.addEventListener('keydown', (e) => {
    if (e.code === 'ControlLeft') {
        controls.getObject().position.y -= 1;
    }
});
document.addEventListener('keyup', (e) => {
    if (e.code === 'ControlLeft') {
        controls.getObject().position.y += 1;
    }
});

document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW') {
        const direction = new THREE.Vector3();
        controls.getDirection(direction);
        controls.getObject().position.add(direction);
    }
});
document.addEventListener('keydown', (e) => {
    if (e.code === 'KeyS') {
        const direction = new THREE.Vector3();
        controls.getDirection(direction);
        controls.getObject().position.sub(direction);
    }
});

// when pressed 
let mouseDown = false;
let lastMouseX = null;
let lastMouseY = null;
let lastTouchX = null;
let lastTouchY = null;

window.addEventListener('mousedown', (e) => {
    mouseDown = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
}
);

window.addEventListener('mouseup', () => {
    mouseDown = false;
}
);

window.addEventListener('mousemove', (e) => {
    if (mouseDown) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        cube.rotation.y += deltaX * 0.01;
        cube.rotation.x += deltaY * 0.01;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    }
}
);

window.addEventListener('touchstart', (e) => {
    mouseDown = true;
    lastTouchX = e.touches[0].clientX;
    lastTouchY = e.touches[0].clientY;
}
);

window.addEventListener('touchend', () => {
    mouseDown = false;
}
);

window.addEventListener('touchmove', (e) => {
    if (mouseDown) {
        const deltaX = e.touches[0].clientX - lastTouchX;
        const deltaY = e.touches[0].clientY - lastTouchY;
        cube.rotation.y += deltaX * 0.01;
        cube.rotation.x += deltaY * 0.01;
        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
    }
}
);

animate();
update();
