import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import * as CANNON from 'cannon-es'
import { Vec3 } from 'cannon-es'
var nipplejs=require('nipplejs')

/**
 * Base
 */
// Debug Gui declaration
const gui = new dat.GUI()
const debug={}

//audio

const playHitSound = (collision) =>
{
    hitSound.volume = Math.random()
    hitSound.currentTime = 0
    hitSound.play()
}

/*
**
Physics
**
*/

//Physics
const world=new CANNON.World()
world.gravity.set(0,-9.8,0)
world.allowSleep = true
world.broadphase = new CANNON.SAPBroadphase(world)


//Materials
const defaultMaterial = new CANNON.Material('default')
const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
        friction: 0.1,
        restitution: 0.7
    }
)
world.defaultContactMaterial = defaultContactMaterial

///Physics Plane
const floorShape = new CANNON.Plane()
const floorBody = new CANNON.Body()
floorBody.mass = 0
floorBody.addShape(floorShape)
floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(- 1, 0, 0), Math.PI * 0.5) 
world.addBody(floorBody)


//carspheres

//car1
// const shapecar1 = new CANNON.Sphere(0.75)
 const axes=new THREE.AxesHelper()
 axes.position.set(50,5,0)
 axes.scale.set(10,10,10)
 
// const bodycar1 = new CANNON.Body({
//     mass: 1.5,
//     position: new CANNON.Vec3(0, 0, 50),
//     shape: shapecar1,
//     material: defaultMaterial
//  })
// world.addBody(bodycar1)

//car2
// const shapecar2 = new CANNON.Sphere(0.5)
// const bodycar2 = new CANNON.Body({
//     mass: 0.2,
//     position: new CANNON.Vec3(0, 0,-50),
//     shape: shapecar2,
//     material: defaultMaterial
// })
// world.addBody(bodycar2)


/*
**
Physics End
**
*/

// canvas
const canvas = document.querySelector('canvas.ui')

// Scene
const scene = new THREE.Scene()
scene.add(axes)



/**
 * 3dModels
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let glt=null
let glt1=null
let car1controls
var dormsclone1=new THREE.Object3D()
var dormsclone2=new THREE.Object3D()
var dormsclone3=new THREE.Object3D()
var dormsclone4=new THREE.Object3D()
var maingateroadclone=new THREE.Object3D()

//dorms
gltfLoader.load(
    '/models/dorms/scene.gltf',
    (gltf) =>
    {
        glt=gltf
        gltf.scene.scale.set(7.5, 3.5, 3.5)
        gltf.scene.position.set(100,0,-215)
        gltf.scene.rotation.y=Math.PI*0.5
        scene.add(gltf.scene)
        dormsclone1.add(gltf.scene.clone())
        dormsclone2.add(gltf.scene.clone())
        dormsclone3.add(gltf.scene.clone())
        dormsclone4.add(gltf.scene.clone())
        // Animation
        mixer = new THREE.AnimationMixer(gltf.scene)
        // action0 = mixer.clipAction(gltf.animations[0])
    }
)
dormsclone1.position.set(80,0,-70)
scene.add(dormsclone1)
dormsclone2.position.set(0,0,-150)
scene.add(dormsclone2)
dormsclone3.position.set(80,0,-230)
scene.add(dormsclone3)
dormsclone4.position.set(-400,0,400)
scene.add(dormsclone4)


//road divider
gltfLoader.load(
    '/models/road_divider/scene.gltf',
    (gltf) =>
    {
        glt=gltf
        gltf.scene.scale.set(7, 7, 263)
        gltf.scene.position.set(-70,0.01,0)
        gltf.scene.rotation.y=Math.PI*0.5
        scene.add(gltf.scene)
        // Animation
        mixer = new THREE.AnimationMixer(gltf.scene)
        // action0 = mixer.clipAction(gltf.animations[0])
    }
)


//university
gltfLoader.load(
    '/models/University/scene.gltf',
    (gltfuni) =>
    {
        gltfuni.scene.scale.set(2, 2, 2)
        scene.add(gltfuni.scene)
        gltfuni.scene.position.set(-200,2,0)
        // Animation
        mixer = new THREE.AnimationMixer(gltfuni.scene)
    }
)


//newhostel
gltfLoader.load(
    '/models/hostel/scene.gltf',
    (gltfnewhostel) =>
    {
        gltfnewhostel.scene.scale.set(2, 2, 2)
        scene.add(gltfnewhostel.scene)
        gltfnewhostel.scene.position.set(-350,0,300)
        // Animation
        mixer = new THREE.AnimationMixer(gltfnewhostel.scene)
    }
)


//road
gltfLoader.load(
    '/models/road/scene.gltf',
    (gltfuniroad) =>
    {
        glt1=gltfuniroad
        gltfuniroad.scene.scale.set(15,1,4)
        //console.log(gltfuniroad)
        gltfuniroad.scene.position.x=-70
        gltfuniroad.scene.position.y=1.0001
        gltfuniroad.scene.position.z=0
        scene.add(gltfuniroad.scene)
    }
)
//roundaboutroad
gltfLoader.load(
    '/models/1road.glb',
    (gltfroad) =>
    {
        glt1=gltfroad
        gltfroad.scene.scale.set(8,1,0.7)
        gltfroad.scene.rotation.y=Math.PI *0.5
        gltfroad.scene.position.x=53
        gltfroad.scene.position.y=-12
        gltfroad.scene.position.z=80
        scene.add(gltfroad.scene)
    }
)

//maingate road
gltfLoader.load(
    '/models/road/scene.gltf',
    (gltfmaingateroad) =>
    {
        glt1=gltfmaingateroad
        gltfmaingateroad.scene.scale.set(28,1,4)
        //console.log(gltfmaingateroad)
        gltfmaingateroad.scene.position.x=250
        gltfmaingateroad.scene.position.y=1.00001
        gltfmaingateroad.scene.position.z=250
        scene.add(gltfmaingateroad.scene)
        maingateroadclone.add(gltfmaingateroad.scene.clone())
    }
)
maingateroadclone.position.set(0,0,-50)
scene.add(maingateroadclone)

//gate
gltfLoader.load(
    '/models/gate_01/scene.gltf',
    (gltfgate) =>
    {
        gltfgate.scene.scale.set(25,25,25)
        gltfgate.scene.rotation.y=Math.PI*0.5
        //console.log(gltfgate)
        gltfgate.scene.position.x=450
        gltfgate.scene.position.y=16
        gltfgate.scene.position.z=250
        scene.add(gltfgate.scene)
        model.add(gltfgate.scene.clone())
    }
)
var model=new THREE.Object3D()
model.position.set(0,0,-50)
scene.add(model)

//walls
gltfLoader.load(
    '/models/concrette_wall/scene.gltf',
    (gltfwalls) =>
    {
        gltfwalls.scene.scale.set(10,3,68)
        gltfwalls.scene.rotation.y=Math.PI*0.5
        //console.log(gltfwalls)
        gltfwalls.scene.position.x=363
        gltfwalls.scene.position.y=23
        gltfwalls.scene.position.z=-500
       // scene.add(gltfwalls.scene)
    }
)
gltfLoader.load(
    '/models/concrette_wall/scene.gltf',
    (gltfwalls) =>
    {
        gltfwalls.scene.scale.set(10,3,68)
        gltfwalls.scene.rotation.y=Math.PI*0.5
        //console.log(gltfwalls)
        gltfwalls.scene.position.x=363
        gltfwalls.scene.position.y=23
        gltfwalls.scene.position.z=500
       // scene.add(gltfwalls.scene)
    }
)
gltfLoader.load(
    '/models/concrette_wall/scene.gltf',
    (gltfwalls) =>
    {
        gltfwalls.scene.scale.set(10,3,68)
        //gltfwalls.scene.rotation.y=Math.PI*0.5
        //console.log(gltfwalls)
        gltfwalls.scene.position.x=-500
        gltfwalls.scene.position.y=23
        gltfwalls.scene.position.z=363
        //scene.add(gltfwalls.scene)
    }
)
gltfLoader.load(
    '/models/concrette_wall/scene.gltf',
    (gltfwalls) =>
    {
        gltfwalls.scene.scale.set(10,3,68)
        //gltfwalls.scene.rotation.y=Math.PI*0.5
        //console.log(gltfwalls)
        gltfwalls.scene.position.x=500
        gltfwalls.scene.position.y=23
        gltfwalls.scene.position.z=363
        //scene.add(gltfwalls.scene)
    }
)



//human model
let glthuman=null
var human=new THREE.Object3D()
let mixer = null
let action0=null
let action1=null
let action2=null

gltfLoader.load(
    '/models/mixamo.glb',
    (gltf) =>
    {
        glthuman=gltf
        gltf.scene.scale.set(2.5, 2.5, 2.5)
        gltf.scene.position.set(40,1,0)
       gltf.scene.rotation.y=-Math.PI*0.5
        scene.add(glthuman.scene)
        human.add(glthuman.scene.clone())  
        // Animation
        mixer = new THREE.AnimationMixer(gltf.scene)
         action0 = mixer.clipAction(gltf.animations[0])
        // action0.play()
    }
)
human.position.set(10,0,0)
scene.add(human)


//tennis court
var tenniscourtclone=new THREE.Object3D()
gltfLoader.load(
    '/models/tenniscourt/scene.gltf',
    (gltftenniscourt) =>
    {

        gltftenniscourt.scene.scale.set(0.15, 0.15, 0.15)
        gltftenniscourt.scene.position.set(-26,0,-70)
        gltftenniscourt.scene.rotation.y=Math.PI*0.5
        scene.add(gltftenniscourt.scene) 
        tenniscourtclone.add(gltftenniscourt.scene.clone()) 
        // Animation
        mixer = new THREE.AnimationMixer(gltftenniscourt.scene)
        const action = mixer.clipAction(gltftenniscourt.animations[0])
        action.play()
    }
)
tenniscourtclone.position.set(40,0,0)
scene.add(tenniscourtclone)



//tennis players
var tennisplayer1=new THREE.Object3D()
var tennisplayer2=new THREE.Object3D()
var tennisplayer3=new THREE.Object3D()
gltfLoader.load(
    '/models/human/scene.gltf',
    (gltftennishuman) =>
    {

        gltftennishuman.scene.scale.set(7.5, 3.5, 3.5)
        gltftennishuman.scene.position.set(17,0,-37)
        gltftennishuman.scene.rotation.y=-Math.PI
        scene.add(gltftennishuman.scene) 
        tennisplayer1.add(gltftennishuman.scene.clone())
        tennisplayer2.add(gltftennishuman.scene.clone())
        tennisplayer3.add(gltftennishuman.scene.clone())
        tenniscourtclone.add(gltftennishuman.scene.clone()) 
    }
)
tennisplayer1.position.set(17,0,-70)
scene.add(tennisplayer1)



//basketball court
gltfLoader.load(
    '/models/basketballcourt/scene.gltf',
    (gltfbasketballcourt) =>
    {

        gltfbasketballcourt.scene.scale.set(0.15, 0.15, 0.15)
        gltfbasketballcourt.scene.position.set(80,9,-80)
        scene.add(gltfbasketballcourt.scene) 
        // Animation
        mixer = new THREE.AnimationMixer(gltfbasketballcourt.scene)
        // action0 = mixer.clipAction(gltf.animations[0])
    }
)



//volleyball court
// gltfLoader.load(
//     '/models/volleyballcourt.glb',
//     (gltfvolleyballcourt) =>
//     {

//         gltfvolleyballcourt.scene.scale.set(0.1, 0.1, 0.1)
//         gltfvolleyballcourt.scene.position.set(80,9,-80)
//         gltfvolleyballcourt.scene.rotation.x=-Math.PI*0.5
//        // scene.add(gltfvolleyballcourt.scene) 
//         //tenniscourtclone.add(gltfvolleyballcourt.scene.clone()) 
//         // Animation
//         mixer = new THREE.AnimationMixer(gltfvolleyballcourt.scene)
//         // action0 = mixer.clipAction(gltf.animations[0])
//     }
// )



//badmintoncourt
gltfLoader.load(
    '/models/warehouse/scene.gltf',
    (gltfbadmintoncourt) =>
    {

        gltfbadmintoncourt.scene.scale.set(0.003, 0.007, 0.005)
        gltfbadmintoncourt.scene.position.set(10,0,-175)
        gltfbadmintoncourt.scene.rotation.y=Math.PI*0.5
        scene.add(gltfbadmintoncourt.scene) 
        // Animation
        mixer = new THREE.AnimationMixer(gltfbadmintoncourt.scene)
        // action0 = mixer.clipAction(gltf.animations[0])
    }
)



//itbulding1
gltfLoader.load(
    '/models/itbuilding1/scene.gltf',
    (gltf_itbuilding1) =>
    {

        gltf_itbuilding1.scene.scale.set(0.02,0.02,0.02)
        gltf_itbuilding1.scene.position.set(300,4,420)
        gltf_itbuilding1.scene.rotation.y=Math.PI*0.5
        scene.add(gltf_itbuilding1.scene) 
    }
)



////itbulding2
gltfLoader.load(
    '/models/itbuilding2/scene.gltf',
    (gltf_itbuilding2) =>
    {

        gltf_itbuilding2.scene.scale.set(0.01,0.01,0.01)
        gltf_itbuilding2.scene.position.set(-100,0,420)
        gltf_itbuilding2.scene.rotation.y=Math.PI*0.5
        scene.add(gltf_itbuilding2.scene) 
    }
)



//football ground
gltfLoader.load(
    '/models/football_field/scene.gltf',
    (gltf_footballfield) =>
    {

        gltf_footballfield.scene.scale.set(0.09,0.05,0.05)
        gltf_footballfield.scene.position.set(150,1,800)
        //gltf_footballfield.scene.rotation.y=Math.PI*0.5
        scene.add(gltf_footballfield.scene) 
    }
)
/*
**
3D Models End
**
*/




//texture loader
//for loading the grass on the ground
const textureLoader=new THREE.TextureLoader()


/**
 * Floor
 */
 const grassColorTexture = textureLoader.load('/textures/grass/color.jpg')
 const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
 const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg')
 const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg')
 
 grassColorTexture.repeat.set(8, 8)
 grassAmbientOcclusionTexture.repeat.set(8, 8)
 grassNormalTexture.repeat.set(8, 8)
 grassRoughnessTexture.repeat.set(8, 8)
 
 grassColorTexture.wrapS = THREE.RepeatWrapping
 grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
 grassNormalTexture.wrapS = THREE.RepeatWrapping
 grassRoughnessTexture.wrapS = THREE.RepeatWrapping
 
 grassColorTexture.wrapT = THREE.RepeatWrapping
 grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
 grassNormalTexture.wrapT = THREE.RepeatWrapping
 grassRoughnessTexture.wrapT = THREE.RepeatWrapping


//floor
const floor = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(5000,5000),
        new THREE.MeshStandardMaterial({
            map: grassColorTexture,
            aoMap: grassAmbientOcclusionTexture,
            normalMap: grassNormalTexture,
            roughnessMap: grassRoughnessTexture
    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)


/**
 * Lights
 */


const directionalLight4 = new THREE.DirectionalLight(0xffffff,1)
directionalLight4.castShadow = true
 directionalLight4.position.set(0, 75,0)
//scene.add(directionalLight4)

const ambientLight1=new THREE.AmbientLight(0xffffff,1)
ambientLight1.position.set(0,550,0)
scene.add(ambientLight1)

/**
 * Sizes
 */
 const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}



/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer()//{canvas:canvas})
 document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera0.aspect = sizes.width / sizes.height
    camera0.updateProjectionMatrix()
    // camera2.aspect = sizes.width / sizes.height
    // camera2.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera0 = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 10000)
camera0.position.set(50,5,0)
scene.add(camera0)

// Controls


//Assigning controls
//Event listener for keyboard


//Testing
var controls1 = new OrbitControls(camera0, renderer.domElement);
controls1.rotateSpeed = 0.4;
controls1.dampingFactor = 0.1;
controls1.enableZoom = true;
controls1.enablePan = false;
let fwdValue = 0;
let bkdValue = 0;
let rgtValue = 0;
let lftValue = 0;
let tempVector = new THREE.Vector3();
let upVector = new THREE.Vector3(0, 1, 0);
let joyManager;
addJoystick();
function updatePlayer(){
    // move the player
    const angle = controls1.getAzimuthalAngle()
    if(glthuman!=null){
      if (fwdValue > 0) {
          tempVector
            .set(0, 0, -fwdValue)
            .applyAxisAngle(upVector, angle)
        //    glthuman.scene.rotateOnWorldAxis(upVector,angle)
           glthuman.scene.position.addScaledVector(tempVector,1)
        }
    
        if (bkdValue > 0) {
          tempVector
            .set(0, 0, bkdValue)
            .applyAxisAngle(upVector, angle)
        //    glthuman.scene.rotateOnWorldAxis(upVector,angle)
           glthuman.scene.position.addScaledVector(tempVector,1)
        }
  
        if (lftValue > 0) {
          tempVector
            .set(-lftValue, 0, 0)
            .applyAxisAngle(upVector, angle)
            // glthuman.scene.rotateOnWorldAxis(upVector,angle)
           glthuman.scene.position.addScaledVector(tempVector,1)
        }
  
        if (rgtValue > 0) {
          tempVector
            .set(rgtValue, 0, 0)
            .applyAxisAngle(upVector, angle)
            // glthuman.scene.rotateOnWorldAxis(upVector,angle)
           glthuman.scene.position.addScaledVector(tempVector,1)
        }
       glthuman.scene.updateMatrixWorld()
  
  //controls.target.set( mesh.position.x, mesh.position.y, mesh.position.z );
  // reposition camera
  camera0.position.sub(controls1.target)
  controls1.target.copy(glthuman.scene.position)
  camera0.position.add(glthuman.scene.position)
    }
}  

function addJoystick(){
    const options = {
         zone: document.getElementById('joystickWrapper1'),
         size: 120,
         multitouch: true,
         maxNumberOfNipples: 2,
         mode: 'static',
         restJoystick: true,
         shape: 'circle',
         // position: { top: 20, left: 20 },
         position: { top: '60px', left: '60px' },
         dynamicPage: true,
       }
    
    
   joyManager = nipplejs.create(options);
   
 joyManager['0'].on('move', function (evt, data) {
         const forward = data.vector.y
         const turn = data.vector.x
         action0.play()
         if (forward > 0) {
           fwdValue = Math.abs(forward)
           bkdValue = 0
         } else if (forward < 0) {
           fwdValue = 0
           bkdValue = Math.abs(forward)
         }
 
         if (turn > 0) {
           lftValue = 0
           rgtValue = Math.abs(turn)
         } else if (turn < 0) {
           lftValue = Math.abs(turn)
           rgtValue = 0
         }
       })
 
      joyManager['0'].on('end', function (evt) {
          action0.stop()
         bkdValue = 0
         fwdValue = 0
         lftValue = 0
         rgtValue = 0
       })
   
 }


/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    //testing
    updatePlayer();
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

//Copying Human Position from Physics objects
    // if(glthuman!=null){
    // var camx=glthuman.scene.position.x
    // var camy=glthuman.scene.position.y
    // var camz=glthuman.scene.position.z
    // var campos=new THREE.Vector3(camx,camy,camz)
    // // console.log(glthuman.scene.position);
    // // console.log('====================================');
    // // console.log(campos);
    // // console.log();
    // camera0.lookAt(glthuman.scene.position)
    // }



 // Update physics
    world.step(1 / 60, deltaTime, 3)
//     if(glt1!=null)
//     {
//     glt1.scene.position.y=bodyy && glthuman.scene.position.z==camzar2.position.x
//     glt1.scene.position.y=bodycar2.position.y
//     glt1.scene.position.z=bodycar2.position.z-7
//    //glt1.scene.quaternion.copy(bodycar2.quaternion)
//     }



// Model animation    
    if(mixer)
    {
        mixer.update(deltaTime)
    }

/*
**
Controls Switching 
**
*/
controls1.update()

//Rendering
renderer.render(scene,camera0)

// Call tick again on the next frame
window.requestAnimationFrame(tick)
}

tick()