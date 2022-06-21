import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'




var nipplejs=require('nipplejs')

// /**
//  * Base
//  */
// // Debug Gui declaration
// const gui = new dat.GUI()
// const debug={}

// //audio

// const playHitSound = (collision) =>
// {
//     hitSound.volume = Math.random()
//     hitSound.currentTime = 0
//     hitSound.play()
// }


// canvas
const canvas = document.querySelector('canvas.ui')

// Scene
const scene = new THREE.Scene()
//scene.add(axes)


//Array for bounding box
const arrboundingbox=[]

/**
 * 3dModels
 */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

let glt=null
let glt1=null
var dormsclone1=new THREE.Object3D()
var dormsclone2=new THREE.Object3D()
var dormsclone3=new THREE.Object3D()
var dormsclone4=new THREE.Object3D()
var maingateroadclone=new THREE.Object3D()

//dorms
gltfLoader.load(
    '/models/dorms1/scene.gltf',
    (gltf) =>
    {
        glt=gltf
        gltf.scene.scale.set(3.5, 3.5, 3.5)
        gltf.scene.position.set(100,0,-215)
        //gltf.scene.rotation.y=Math.PI*0.5
        scene.add(gltf.scene)


        //Bounding Boxes
        var dormsbox=new THREE.Box3()
        dormsbox.setFromObject(gltf.scene)
        arrboundingbox.push(dormsbox)



        dormsclone1.add(gltf.scene.clone())
        var dormsclonebox1=new THREE.Box3()
        dormsclonebox1.setFromObject(dormsclone1)
        arrboundingbox.push(dormsclonebox1)
        
        
        
        dormsclone2.add(gltf.scene.clone())
        var dormsclonebox2=new THREE.Box3()
        dormsclonebox2.setFromObject(dormsclone2)
        arrboundingbox.push(dormsclonebox2)
        
        
        dormsclone3.add(gltf.scene.clone())
        var dormsclonebox3=new THREE.Box3()
        dormsclonebox3.setFromObject(dormsclone3)
        arrboundingbox.push(dormsclonebox3)


        dormsclone4.add(gltf.scene.clone())
        var dormsclonebox4=new THREE.Box3()
        dormsclonebox4.setFromObject(dormsclone4)
        arrboundingbox.push(dormsclonebox4)

    }
)
dormsclone1.position.set(160,0,-70)
scene.add(dormsclone1)
dormsclone2.position.set(0,0,-250)
scene.add(dormsclone2)
dormsclone3.position.set(160,0,-300)
scene.add(dormsclone3)
dormsclone4.position.set(-400,0,400)
scene.add(dormsclone4)




//university
gltfLoader.load(
    '/models/University/scene.gltf',
    (gltfuni) =>
    {
        gltfuni.scene.scale.set(3, 3, 3)
        scene.add(gltfuni.scene)
        gltfuni.scene.position.set(-200,2,0)
       // gltfuni.scene.rotation.y=Math.PI*0.5

        //Bounding Boxes
        var universitybox=new THREE.Box3()
        universitybox.setFromObject(gltfuni.scene)
        // const helper = new THREE.Box3Helper( universitybox, 0xffff00 );
        // scene.add( helper );
        arrboundingbox.push(universitybox)  
    }
)


//newhostel
gltfLoader.load(
    '/models/newhostel2/scene.gltf',
    (gltfnewhostel) =>
    {
        gltfnewhostel.scene.scale.set(1, 1, 1)
        scene.add(gltfnewhostel.scene)
        gltfnewhostel.scene.position.set(-350,0,500)
        gltfnewhostel.scene.rotation.y=Math.PI


       //Bounding Boxes
       var newhostelbox=new THREE.Box3()
       newhostelbox.setFromObject(gltfnewhostel.scene)
       arrboundingbox.push(newhostelbox)
    }
)


//curved roads
let curvedroadclone=new THREE.Object3D()
let curvedroadclone1=new THREE.Object3D()
gltfLoader.load(
    '/models/curvedroad.glb',
    (gltfcurvedroad) =>
    {

        gltfcurvedroad.scene.scale.set(0.5, 0.5,0.5)
        gltfcurvedroad.scene.position.set(20,1,0)
        gltfcurvedroad.scene.rotation.y=Math.PI*0.5
       curvedroadclone.add(gltfcurvedroad.scene.clone()) 
       curvedroadclone1.add(gltfcurvedroad.scene.clone()) 
    }
)
scene.add(curvedroadclone)
curvedroadclone.position.set(-200,0,-30)
scene.add(curvedroadclone1)
curvedroadclone1.rotation.y=Math.PI*0.5
curvedroadclone1.position.set(-230,0,3)


//road
gltfLoader.load(
    '/models/road/scene.gltf',
    (gltfuniroad) =>
    {
        glt1=gltfuniroad
        gltfuniroad.scene.scale.set(15,1,4)
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
        gltfgate.scene.position.x=450
        gltfgate.scene.position.y=16
        gltfgate.scene.position.z=250
        scene.add(gltfgate.scene)
        gateclone.add(gltfgate.scene.clone())


       //Bounding Boxes
       var gatebox1=new THREE.Box3()
       gatebox1.setFromObject(gltfgate.scene)
       arrboundingbox.push(gatebox1)

       //Bounding Boxes
       var gatebox2=new THREE.Box3()
       gatebox2.setFromObject(gateclone)
       arrboundingbox.push(gatebox2)

    }
)
var gateclone=new THREE.Object3D()
gateclone.position.set(0,0,-50)
scene.add(gateclone)

// //walls
// gltfLoader.load(
//     '/models/concrette_wall/scene.gltf',
//     (gltfwalls) =>
//     {
//         gltfwalls.scene.scale.set(10,3,68)
//         gltfwalls.scene.rotation.y=Math.PI*0.5
//         gltfwalls.scene.position.x=363
//         gltfwalls.scene.position.y=23
//         gltfwalls.scene.position.z=-500
//        // scene.add(gltfwalls.scene)
//     }
// )



//human model
let glthuman=null
var human=new THREE.Object3D()
var humanbox=null
let mixer = null
let action0=null
let action1=null
let action2=null

gltfLoader.load(
    '/models/human.glb',
    (gltf) =>
    {
        glthuman=gltf
        gltf.scene.scale.set(2.5, 2.5, 2.5)
        gltf.scene.position.set(40,1,0)
        gltf.scene.rotation.y=Math.PI*0.5
        scene.add(glthuman.scene)


        humanbox=new THREE.Box3()
        humanbox.setFromObject(glthuman.scene)
        // Animation
        mixer = new THREE.AnimationMixer(gltf.scene)
         action0 = mixer.clipAction(gltf.animations[0])
    }
)


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
    
       //Bounding Boxes
       var tenniscourtbox1=new THREE.Box3()
       tenniscourtbox1.setFromObject(gltftenniscourt.scene)
       arrboundingbox.push(tenniscourtbox1)
    
       //Bounding Boxes
       var tenniscourtbox2=new THREE.Box3()
       tenniscourtbox2.setFromObject(tenniscourtclone)
       arrboundingbox.push(tenniscourtbox2)
    }
)
tenniscourtclone.position.set(40,0,0)
scene.add(tenniscourtclone)


//basketball court
gltfLoader.load(
    '/models/basketballcourt/scene.gltf',
    (gltfbasketballcourt) =>
    {

        gltfbasketballcourt.scene.scale.set(0.15, 0.15, 0.15)
        gltfbasketballcourt.scene.position.set(80,9,-80)
        scene.add(gltfbasketballcourt.scene)
        
        
       //Bounding Boxes
       var basketballcourtbox=new THREE.Box3()
       basketballcourtbox.setFromObject(gltfbasketballcourt.scene)
       arrboundingbox.push(basketballcourtbox)
    }
)



//badmintoncourt
gltfLoader.load(
    '/models/warehouse/scene.gltf',
    (gltfbadmintoncourt) =>
    {

        gltfbadmintoncourt.scene.scale.set(0.003, 0.007, 0.005)
        gltfbadmintoncourt.scene.position.set(10,0,-175)
        gltfbadmintoncourt.scene.rotation.y=Math.PI*0.5
        scene.add(gltfbadmintoncourt.scene) 


       //Bounding Boxes
       var badmintoncourtbox=new THREE.Box3()
       badmintoncourtbox.setFromObject(gltfbadmintoncourt.scene)
       arrboundingbox.push(badmintoncourtbox)
    }
)



//itbulding1
gltfLoader.load(
    '/models/itbuilding1/scene.gltf',
    (gltf_itbuilding1) =>
    {

        gltf_itbuilding1.scene.scale.set(0.02,0.02,0.02)
        gltf_itbuilding1.scene.position.set(300,0,420)
        gltf_itbuilding1.scene.rotation.y=Math.PI*0.5
        scene.add(gltf_itbuilding1.scene)


       //Bounding Boxes
       var itbuilding1box=new THREE.Box3()
       itbuilding1box.setFromObject(gltf_itbuilding1.scene)
       arrboundingbox.push(itbuilding1box) 
    }
)



//itbulding2
gltfLoader.load(
    '/models/itbuilding2/scene.gltf',
    (gltf_itbuilding2) =>
    {

        gltf_itbuilding2.scene.scale.set(0.01,0.01,0.01)
        gltf_itbuilding2.scene.position.set(-100,0,420)
        gltf_itbuilding2.scene.rotation.y=Math.PI*0.5
        scene.add(gltf_itbuilding2.scene)


        //Bounding Boxes
        var itbuilding2box=new THREE.Box3()
        itbuilding2box.setFromObject(gltf_itbuilding2.scene)
        arrboundingbox.push(itbuilding2box) 
    }
)



//football ground
gltfLoader.load(
    '/models/football_field/scene.gltf',
    (gltf_footballfield) =>
    {

        gltf_footballfield.scene.scale.set(0.09,0.05,0.05)
        gltf_footballfield.scene.position.set(150,1,800)
        scene.add(gltf_footballfield.scene) 
    }
)

//trees
gltfLoader.load(
    '/models/tree/scene.gltf',
    (gltf_tree) =>
    {

        gltf_tree.scene.scale.set(70,70,70)
        gltf_tree.scene.position.set(80,1,-26)
        scene.add(gltf_tree.scene) 
    }
)


//bushes
gltfLoader.load(
    '/models/bush1/scene.gltf',
    (gltf_bush) =>
    {

        gltf_bush.scene.scale.set(2,2,2)
        gltf_bush.scene.position.set(20,10,28)
        scene.add(gltf_bush.scene) 
        bushclone1.add(gltf_bush.scene.clone())
        bushclone2.add(gltf_bush.scene.clone())
        bushclone3.add(gltf_bush.scene.clone())
        bushclone4.add(gltf_bush.scene.clone())
        bushclone5.add(gltf_bush.scene.clone())
        bushclone6.add(gltf_bush.scene.clone())
        bushclone7.add(gltf_bush.scene.clone())
        bushclone8.add(gltf_bush.scene.clone())
        bushclone9.add(gltf_bush.scene.clone())
        bushclone10.add(gltf_bush.scene.clone())
        bushclone11.add(gltf_bush.scene.clone())

    }
)
var bushclone1=new THREE.Object3D()
var bushclone2=new THREE.Object3D()
var bushclone3=new THREE.Object3D()
var bushclone4=new THREE.Object3D()
var bushclone5=new THREE.Object3D()
var bushclone6=new THREE.Object3D()
var bushclone7=new THREE.Object3D()
var bushclone8=new THREE.Object3D()
var bushclone9=new THREE.Object3D()
var bushclone10=new THREE.Object3D()
var bushclone11=new THREE.Object3D()


bushclone1.position.set(-20,0,0)
bushclone2.position.set(-40,0,0)
bushclone3.position.set(-60,0,0)
bushclone4.position.set(-80,0,0)
bushclone5.position.set(-100,0,0)
bushclone6.position.set(0,0,-55)
bushclone7.position.set(-20,0,-55)
bushclone8.position.set(-40,0,-55)
bushclone9.position.set(-60,0,-55)
bushclone10.position.set(-80,0,-55)
bushclone11.position.set(-100,0,-55)

scene.add(bushclone1)
scene.add(bushclone2)
scene.add(bushclone3)
scene.add(bushclone4)
scene.add(bushclone5)
scene.add(bushclone6)
scene.add(bushclone7)
scene.add(bushclone8)
scene.add(bushclone9)
scene.add(bushclone10)
scene.add(bushclone11)



//rocks
gltfLoader.load(
    '/models/rocks/scene.gltf',
    (gltf_rocks) =>
    {

        gltf_rocks.scene.scale.set(20,20,20)
        gltf_rocks.scene.position.set(-50,-10,100)
        gltf_rocks.scene.rotation.y=0.785398*1.5
        scene.add(gltf_rocks.scene) 
        var rocksbox=new THREE.Box3()
        rocksbox.setFromObject(gltf_rocks.scene)
        // arrboundingbox.push(rocksbox)
        var boxhelper=new THREE.Box3Helper(rocksbox, 0xffff00);
        scene.add(boxhelper)
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
    new THREE.PlaneBufferGeometry(1800,1800),
        new THREE.MeshStandardMaterial({
            // map: grassColorTexture,
            // aoMap: grassAmbientOcclusionTexture,
            // normalMap: grassNormalTexture,
            // roughnessMap: grassRoughnessTexture
            color:'#DD866E' //SKIN COLOR
            // color:'#B6844A' //LIGHT BROWN
            // color:'#CEB371'


    })
)
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)



//Bounding Box Planes


//same material for all the road boxes
const material = new THREE.MeshBasicMaterial( {color: 0xffff00,visible:false} );



//University road Boxes
const BoundingplaneGeometry1 = new THREE.BoxGeometry(120,120 );
const Boundingplane1 = new THREE.Mesh( BoundingplaneGeometry1, material );
Boundingplane1.rotation.y=Math.PI
const Boundingplane2 = new THREE.Mesh( BoundingplaneGeometry1, material );
scene.add(Boundingplane1)
scene.add(Boundingplane2)
Boundingplane1.position.set(-25,0,30)
Boundingplane2.position.set(-25,0,-30)

//adding the University road boxes to bounding box
const Boundingplane1box=new THREE.Box3()
Boundingplane1box.setFromObject(Boundingplane1)
const Boundingplane2box=new THREE.Box3()
Boundingplane2box.setFromObject(Boundingplane2)
arrboundingbox.push(Boundingplane1box)
arrboundingbox.push(Boundingplane2box)



//Adding the road box to the road joining maingate and campus
const Boundingboxmaingategeometry=new THREE.BoxGeometry(385,385)
const Boundingboxmaingate1=new THREE.Mesh(Boundingboxmaingategeometry,material)
const Boundingboxmaingate2=new THREE.Mesh(Boundingboxmaingategeometry,material)
scene.add(Boundingboxmaingate1)
scene.add(Boundingboxmaingate2)

//Position of boxes
Boundingboxmaingate1.position.set(255,0,176)
Boundingboxmaingate2.position.set(255,0,275)

const Boundingpboxmaingatebox1=new THREE.Box3()
Boundingpboxmaingatebox1.setFromObject(Boundingboxmaingate1)
const Boundingboxmaingate2box=new THREE.Box3()
Boundingboxmaingate2box.setFromObject(Boundingboxmaingate2)
arrboundingbox.push(Boundingpboxmaingatebox1)
arrboundingbox.push(Boundingboxmaingate2box)




/**
 * Lights
 */


const directionalLight4 = new THREE.DirectionalLight(0xffffff,1)
directionalLight4.castShadow = true
 directionalLight4.position.set(20,20,0)
// scene.add(directionalLight4)

const ambientLight1=new THREE.AmbientLight(0xffffff,1.5)
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


//JoyStick and Orbit Controls
var controls1 = new OrbitControls(camera0, renderer.domElement);
controls1.rotateSpeed = 0.4;
controls1.dampingFactor = 0.1;
controls1.enableZoom = true;
controls1.enablePan = false;
// controls1.maxPolarAngle = Math.PI/2 ;
let fwdValue = 0;
let bkdValue = 0;
let rgtValue = 0;
let lftValue = 0;
let tempVector = new THREE.Vector3();
let upVector = new THREE.Vector3(0, 1, 0);
let joyManager;
let angle
addJoystick();
function updatePlayer(){
    // move the player
     angle = controls1.getAzimuthalAngle()
    if(glthuman!=null){
      if (fwdValue > 0) {
          tempVector
            .set(0, 0, -fwdValue)
            .applyAxisAngle(upVector, angle)
           glthuman.scene.position.addScaledVector(tempVector,0.5)
        }
    
        if (bkdValue > 0) {
          tempVector
            .set(0, 0, bkdValue)
            .applyAxisAngle(upVector, angle)
           glthuman.scene.position.addScaledVector(tempVector,0.5)
        }
  
        if (lftValue > 0) {
          tempVector
            .set(-lftValue, 0, 0)
            .applyAxisAngle(upVector, angle)
           glthuman.scene.position.addScaledVector(tempVector,0.5)
        }
  
        if (rgtValue > 0) {
          tempVector
            .set(rgtValue, 0, 0)
            .applyAxisAngle(upVector, angle)
           glthuman.scene.position.addScaledVector(tempVector,0.5)
        }
       glthuman.scene.updateMatrixWorld()
  
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
         position: { top: '60px', left: '60px' },
         dynamicPage: true,
       }
    
    
   joyManager = nipplejs.create(options);
   
 joyManager['0'].on('move', function (evt, data) {
         const forward = data.vector.y
         const turn = data.vector.x
         if(glthuman!=null)
         {
              glthuman.scene.rotation.y=data.angle.radian+Math.PI
         }
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
 let prevx=0
 let prevy=0
 let prevz=0


//Scene background  texture change

const cubetextureloader=new THREE.CubeTextureLoader()
const skytexture1=textureLoader.load('textures/clouds.jpg')

const skytexture=cubetextureloader.load(
    [
        'textures/sky1/px.png',
        'textures/sky1/nx.png',
        'textures/sky1/py.png',
        'textures/sky1/ny.png',
        'textures/sky1/pz.png',
        'textures/sky1/nz.png',
    ]
)
skytexture.RepeatWrapping
skytexture.wrapS
skytexture.wrapT



scene.background=skytexture1

//exp
const geo=new THREE.SphereGeometry(5000,64,32)
const earthmaterial =new THREE.MeshLambertMaterial()
const envmaptextureearth=cubetextureloader.load([
    '/textures/4/px.png',
    '/textures/4/nx.png',
    '/textures/4/py.png',
    '/textures/4/ny.png',
    '/textures/4/pz.png',
    '/textures/4/nz.png',
    
])
const sphere=new THREE.Mesh(geo,earthmaterial)
sphere.position.set(0,100,0)
scene.add(sphere)

//pics in 4
earthmaterial.metalness=1
earthmaterial.roughness=0
earthmaterial.envMap=envmaptextureearth



/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    updatePlayer();
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

if(glthuman!=null)
{
humanbox.setFromObject(glthuman.scene)
const checkcollision = () => {
    for (let i = 0; i < arrboundingbox.length; i++) {

            if (humanbox.intersectsBox(arrboundingbox[i]) ) {
                glthuman.scene.position.z = prevz
                glthuman.scene.position.x = prevx
                glthuman.scene.position.y = prevy
                action0.stop()
            }
    }
    prevx =glthuman.scene.position.x
    prevy = glthuman.scene.position.y
    prevz = glthuman.scene.position.z
}

checkcollision()
}

// Model animation    
    if(mixer)
    {
        mixer.update(deltaTime)
    }

//Update Controls
controls1.update()

//Rendering
renderer.render(scene,camera0)

// Call tick again on the next frame
window.requestAnimationFrame(tick)
}

tick()