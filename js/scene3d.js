import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, controls;

function init(){
    const container = document.getElementById("viewer");
    if(!container) return;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.set(0,1,3);

    renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff,0x444444,1);
    scene.add(light);

    const loader = new GLTFLoader();

 
    const modelPath = new URL('../assets/modelos/raton.glb', import.meta.url).href;

    loader.load(modelPath, (gltf)=>{
        scene.add(gltf.scene);
    }, undefined, (error)=>{
        console.error("Error cargando modelo:", error);
    });

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = true;
    controls.enableDamping = true;

    animate();
}

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}

init();
