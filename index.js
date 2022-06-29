const canvas=document.querySelector('canvas')
const c=canvas.getContext("2d")

canvas.width=1024
canvas.height=576

const backgroundImg = new Image()
backgroundImg.src="/img/background.jpg"

//backgroundImg.onload = () => draw() 

function draw(){
    c.drawImage(backgroundImg,0,0)

}




//thrustVectorfromInput
const thrustVector={x:0, y:0, z:0}

//temps
const playerShipImage=new Image()
playerShipImage.src="/img/playership.png"
console.log(playerShipImage.width)
const playerShip=new Ship({position:{x:100,y:100,rotation:0},velocity:{x:0,y:0,vRotation:0},accelartion:{x:0,y:0,z:0},image:playerShipImage,dampning:0.001})

function gameloop(){
    const animationId=window.requestAnimationFrame(gameloop)
    draw()
    handleInput()
    playerShip.control(thrustVector)
    playerShip.update()
    playerShip.draw()
    
}



// Input handler, sets thrustVector depending on input buffer
function handleInput() {
    thrustVector.x=0
    thrustVector.y=0
    thrustVector.z=0
    if (keys.w.pressed) {
        thrustVector.x += 0.002
    }
    if (keys.s.pressed){
        thrustVector.x-=0.0015
    }
    if (keys.a.pressed){
        thrustVector.y-=0.0015
    }
    if (keys.d.pressed){
        thrustVector.y+=0.0015
    }
    if (keys.ArrowLeft.pressed){
        thrustVector.z-=0.00017
    }
    if (keys.ArrowRight.pressed){
        thrustVector.z+=0.00017
    }
}

const game=new Game()
game.init()
//game.currentState.background2.draw()
//console.log(game.currentState)

//gameloop()
//EventListeners for Inputs


  







