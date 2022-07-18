//stub for local testing, set isLocalTest=1 if testing locally, SET to 0 for commits!
let base = ""
isLocalTest = 0
if (isLocalTest) {
    base = ""
} else {
    base = "/BadSpaceGame"
}

//setup of canvas
const canvas = document.querySelector('canvas')
const c = canvas.getContext("2d")
canvas.width = 1024
canvas.height = 576

//thrustVectorfromInput  this really shouldn't be here ...
const thrustVector = { x: 0, y: 0, z: 0 }

//temps
//const playerShipImage=new Image()
//playerShipImage.src="/img/playership.png"
//console.log(playerShipImage.width)
//const playerShip=new Ship({position:{x:100,y:100,rotation:0},velocity:{x:0,y:0,vRotation:0},accelartion:{x:0,y:0,z:0},image:playerShipImage,dampning:0.001})

//function gameloop(){
//    const animationId=window.requestAnimationFrame(gameloop)
//    draw()
//    handleInput()
//    playerShip.control(thrustVector)
//    playerShip.update()
//    playerShip.draw()  
//}
// Input handler, sets thrustVector depending on input buffer
// the ships should handle their acceleration themselves ... rather than hardcoding it into the input handler here
function handleInput() {
    thrustVector.x = 0
    thrustVector.y = 0
    thrustVector.z = 0
    if (keys.w.pressed) {
        thrustVector.x += 0.002
    }
    if (keys.s.pressed) {
        thrustVector.x -= 0.0015
    }
    if (keys.a.pressed) {
        thrustVector.y -= 0.0015
    }
    if (keys.d.pressed) {
        thrustVector.y += 0.0015
    }
    if (keys.ArrowLeft.pressed) {
        thrustVector.z -= 0.00017
    }
    if (keys.ArrowRight.pressed) {
        thrustVector.z += 0.00017
    }
}
// starts the state machine
const game = new Game()
game.init()
