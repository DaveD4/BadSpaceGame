const canvas=document.querySelector('canvas')
const c=canvas.getContext("2d")

canvas.width=1024
canvas.height=576

const backgroundImg = new Image()
backgroundImg.src="/img/background.jpg"

backgroundImg.onload = () => draw() 

function draw(){
    c.drawImage(backgroundImg,0,0)

}

class Ship{
    constructor({
        position, 
        velocity,
        accelartion, 
        image
    })
    {
        this.position=position
        this.velocity=velocity
        this.accelartion=accelartion
        this.image=new Image()
        this.image.src=image.src
    }
    update(){
        this.velocity.x+=this.accelartion.x
        this.velocity.y+=this.accelartion.y
        this.velocity.vRotation+=this.accelartion.z
        
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        this.position.rotation=(this.position.rotation+this.velocity.vRotation)%(2*Math.PI)
        console.log(this.position)
    }
    draw(){
        c.save()
        c.translate(this.position.x+32/2, this.position.y+32/2)
        c.rotate(this.position.rotation)
        c.translate(-this.position.x-32/2, -this.position.y-32/2)
        //c.translate(canvas.width/10,canvas.width/4)
        c.drawImage(this.image,this.position.x,this.position.y)
        c.restore()

        
      
       
    }
    control(thrustVector){
        const rotationInDegree=this.position.rotation*180/Math.PI
        const cosPhi=Math.cos(this.position.rotation)
        const sinPhi=Math.sin(this.position.rotation)
        this.accelartion.x=cosPhi*thrustVector.x-sinPhi*thrustVector.y
        this.accelartion.y=sinPhi*thrustVector.x+cosPhi*thrustVector.y 
        this.accelartion.z=thrustVector.z
    }
}


//thrustVectorfromInput
const thrustVector={x:0, y:0, z:0}

//temps
const playerShipImage=new Image()
playerShipImage.src="/img/playership.png"
const playerShip=new Ship({position:{x:canvas.width/2,y:canvas.height/2,rotation:-Math.PI/2},velocity:{x:0,y:0,vRotation:0},accelartion:{x:0,y:0,z:0},image:playerShipImage})

function gameloop(){
    const animationId=window.requestAnimationFrame(gameloop)
    draw()
    handleInput()
    playerShip.control(thrustVector)
    playerShip.update()
    playerShip.draw()
    
}


//Inputs
const keys= {
    w:{
        pressed: false
    },
    a:{
        pressed:false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    },
    SpaceBar:{
        pressed: false
    }
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
gameloop()
//EventListeners for Inputs
window.addEventListener('keydown',(e)=> {
    switch (e.key) {
        case 'w':
            keys.w.pressed=true
            break;
        case 'a':
            keys.a.pressed=true
            break;
        case 's':
            keys.s.pressed=true
            break;
        case 'd':
            keys.d.pressed=true
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=true
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed=true;
            break;
        case ' ':
            keys.SpaceBar.pressed=true
            break;
    }
})
window.addEventListener('keyup',(e)=> {
    switch (e.key) {
        case 'w':
            keys.w.pressed=false
            break;
        case 'a':
            keys.a.pressed=false
            break;
        case 's':
            keys.s.pressed=false
            break;
        case 'd':
            keys.d.pressed=false
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed=false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed=false;
            break;
        case ' ':
            keys.SpaceBar.pressed=false
            break;
    }
    
    
})