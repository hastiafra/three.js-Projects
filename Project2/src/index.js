import * as THREE from "three";
import "./style/main.css";
import { gsap } from "gsap";
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
renderer.setPixelRatio(2) //default is 1, for smooth edge

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 20, 20);
scene.add(light);

renderer.setSize(window.innerWidth, window.innerHeight);

const orbit = new OrbitControls(camera, canvas);
orbit.enableDamping = true;
orbit.enablePan = false;
orbit.enableZoom = false;
orbit.autoRotate = true;
orbit.autoRotateSpeed = 5;

renderer.render(scene, camera);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const loop = () => {
  renderer.render(scene, camera);
  orbit.update()
  window.requestAnimationFrame(loop);
};

loop();

const tl = gsap.timeline({defaults: {duration: 1}})
tl.fromTo(mesh.scale,{z:0, x:0, y:0})
