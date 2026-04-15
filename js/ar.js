
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.158/build/three.module.js';
import { ARButton } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/webxr/ARButton.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.158/examples/jsm/loaders/GLTFLoader.js';

let camera, scene, renderer;

export function initAR(modelPath){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera();

    renderer = new THREE.WebGLRenderer({alpha:true, antialias:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;

    document.body.appendChild(renderer.domElement);
    document.body.appendChild(ARButton.createButton(renderer));

    const light = new THREE.HemisphereLight(0xffffff,0xbbbbff,1);
    scene.add(light);

    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf)=>{
        const model = gltf.scene;
        model.scale.set(0.5,0.5,0.5);
        model.position.set(0,0,-1);
        scene.add(model);
    });

    renderer.setAnimationLoop(()=>{
        renderer.render(scene,camera);
    });
}
