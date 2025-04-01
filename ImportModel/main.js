import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set( 0, 180, 250 );
camera.lookAt( scene.position );
const light = new THREE.DirectionalLight( 'white', 3 );
scene.add( light );
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
const gltfLoader = new GLTFLoader();
const url = 'low_poly_building/scene.gltf';

gltfLoader.load(url, (gltf) => {
    const root = gltf.scene;
    const s = 0.9
    gltf.scene.scale.set(s,s,s);
    scene.add(root);
    // compute the box that contains all the stuff
    // from root and below
    const box = new THREE.Box3().setFromObject(root);
 
    const boxSize = box.getSize(new THREE.Vector3()).length();
    const boxCenter = box.getCenter(new THREE.Vector3());
    console.log(boxSize);
    console.log(boxCenter);
  });
renderer.setAnimationLoop(animate);
function animate() {
    light.position.copy( camera.position );
    renderer.render(scene, camera);
}