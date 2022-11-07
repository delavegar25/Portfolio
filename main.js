import './style.css'

import * as THREE from 'three';

import { TorusGeometry } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// setup the scene and cameras
const  scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render( scene, camera );

// Add an object  to the scene
const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 });
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

// Add light to the scene
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(ambientLight)

//Three.js helper function aid in scene creation
const lightHelper = new THREE.PointLightHelper( pointLight )
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

// Add 200 randomly positioned stars into the scene

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial( { color:0xffffff });
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3)
  .fill()
  .map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);


// Add a textured background using the space image
const spaceTexture = new THREE.TextureLoader().load("./space.jpg");
scene.background = spaceTexture;

//Avatar 
const pascalTexture = new THREE.TextureLoader().load('pascal.jpg');
const pascal = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: pascalTexture }));
scene.add(pascal);


// scroll animation
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  pascal.rotation.y += 0.05;
  pascal.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation loop
function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  
  renderer.render( scene, camera );
}

animate();

