import * as THREE from "three";
import "./style/main.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 20;
scene.add(camera);

const canvas = document.querySelector(".webgl");

const renderer = new THREE.WebGLRenderer({ canvas }); //default renderer

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);

renderer.setSize(window.innerWidth, window.innerHeight);

const orbit = new OrbitControls(camera, canvas);

renderer.render(scene, camera);

// scene.background = new THREE.Color(0xff8800) //background color

// const camera = new THREE.PerspectiveCamera(
//     75,
//     window.innerWidth / window.innerHeight,
//     0.1,
//     1000
// )
// camera.position.z = 2

// renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const loop = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();


