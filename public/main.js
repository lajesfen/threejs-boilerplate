import { GUI } from 'lil-gui';
import * as THREE from 'three';

const gui = new GUI();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x1a1a1a);
document.body.appendChild(renderer.domElement);

const cubes = [];
const geometry = new THREE.BoxGeometry();

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const color = new THREE.Color().setRGB(i / 10, j / 10, 1);
        const material = new THREE.MeshBasicMaterial({ color: color });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(i - 5, 0, j - 5);
        scene.add(cube);
        cubes.push(cube);
    }
}

camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);

let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.05;

    for (let i = 0; i < cubes.length; i++) {
        const cube = cubes[i];
        const wave = Math.sin(time + cube.position.x * 0.5 + cube.position.z * 0.2);
        cube.position.y = wave * 1;
    }

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
