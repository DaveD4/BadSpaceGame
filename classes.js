class Sprite{
    constructor({
        position,
        velocity,
        accelartion,
        image,
        animate,
        scale=1
    })
    {
        this.position=position
        this.velocity=velocity
        this.accelartion=accelartion
        this.image=image
        this.image.onload = () => {
            this.width=this.image.width*scale,
            this.heigth=this.image.height*scale
        }
        //this.image.scr=image.src
        this.animate = animate
        this.sprites = this.sprites
        this.scale=scale
    }
    draw(){
        //console.log(this.width)
        c.save()
        c.translate(
            this.position.x+this.width/2,
            this.position.y+this.heigth/2
        )
        c.rotate(this.position.rotation)
        c.translate(
            -this.position.x-this.width/2,
            -this.position.y-this.heigth/2
        )
        c.drawImage(this.image,this.position.x,this.position.y)
        c.restore()
    }
}


class Ship extends Sprite{
    constructor({
        position,
        velocity,
        accelartion,
        image,
        animate,
        scale=1,
        health,
        dampning=0,
    })
    {
        super({
            position,
            velocity,
            accelartion,
            image,
            animate,
            scale
        })
        //this.position=position
        //this.velocity=velocity
        //this.accelartion=accelartion
        //this.image=new Image()
        //this.image.src=image.src
        this.health=health
        this.dampning=dampning
        this.thrustVector={x:0,y:0,z:0}
        this.weaponCooldown=50
        this.weaponLastFired=0
    }
    update(){
        this.control_()
        this.velocity.x=this.velocity.x*(1-this.dampning)+this.accelartion.x
        this.velocity.y=this.velocity.y*(1-this.dampning)+this.accelartion.y
        this.velocity.vRotation=this.velocity.vRotation*(1-this.dampning)+this.accelartion.z
        
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        this.position.rotation=(this.position.rotation+this.velocity.vRotation)%(2*Math.PI)
    }
    control_(){
        //const rotationInDegree=this.position.rotation*180/Math.PI
        const cosPhi=Math.cos(this.position.rotation)
        const sinPhi=Math.sin(this.position.rotation)
        this.accelartion.x=cosPhi*this.thrustVector.x-sinPhi*this.thrustVector.y
        this.accelartion.y=sinPhi*this.thrustVector.x+cosPhi*this.thrustVector.y 
        this.accelartion.z=this.thrustVector.z
    }
    fire(frameId){
        if (((frameId-this.weaponLastFired) > this.weaponCooldown)) {
            this.weaponLastFired=frameId
            console.log('Fire')
        }
        else{
            //console.log('Weapons cooldown'+((frameId-this.weaponLastFired) % this.weaponCooldown))
            console.log(frameId-this.weaponLastFired)
        }
    }
    
}



class GameState{
    constructor(game)
    {
        this.game=game
    }
    onEntry(){
        const temp = this.game.test
        
    }
    onExit(){
    }
}
class StartScreen extends GameState{
    constructor(game){
        super(game)
        this.animationId=0
        this.backgroundImg=new Image()
        this.backgroundImg.src="/img/startscreen.png"
        this.backround2=new Sprite({position:{x:0,y:0,z:0},velocity:{x:0,y:0,vRotation:0},accelartion:{x:0,y:0,z:0},image:this.backgroundImg})
    }
    onEntry(){
        document.querySelector('#StartScreen').style.display='flex'
        //const button= document.createElement('button')
        //document.querySelector('#StartButton').append(button)
        const startButton=document.querySelector('#StartButton')
        startButton.addEventListener('click', (e) => {
            this.onExit()
            //console.log(e)
        })
        this.run()
    }
    onExit(){
        window.cancelAnimationFrame(this.animationId)
        document.querySelector('#StartScreen').style.display='none'
        this.game.currentState=new Mission(this.game)
        this.game.currentState.onEntry()
        this.game.currentState.run()
    }
    run(){
        c.save()
        this.animationId=window.requestAnimationFrame(this.run.bind(this))
        this.backround2.draw()
        c.restore()
    }
    loop_(){
        
    }
}
class LevelSelectScreen extends GameState{
    constructor(){
        super()
    }
    onEntry(){
        ctx.fillStyle = 'red';
        ctx.fillRect(80, 60, 140, 30);
    }
}
class Mission extends GameState{
    constructor(game){
        super(game)
        this.animationId=0
        this.backgroundImg=new Image()
        this.backgroundImg.src="/img/background.jpg"
        this.backround=new Sprite({position:{x:0,y:0,z:0},velocity:{x:0,y:0,vRotation:0},accelartion:{x:0,y:0,z:0},image:this.backgroundImg})
        this.playerShipImage=new Image()
        this.playerShipImage.src="/img/playership.png"
        this.playerShip=new Ship({position:{x:100,y:100,rotation:Math.PI/2},velocity:{x:0,y:0,vRotation:0},accelartion:{x:0,y:0,z:0},image:this.playerShipImage,dampning:0.001})
        //this.InputHandler=new this.InputHandler
    }
    handleInput(playership) {
        playership.thrustVector.x=0
        playership.thrustVector.y=0
        playership.thrustVector.z=0
        if (keys.w.pressed) {
            playership.thrustVector.x += 0.002
        }
        if (keys.s.pressed){
            playership.thrustVector.x-=0.0015
        }
        if (keys.a.pressed){
            playership.thrustVector.y-=0.0015
        }
        if (keys.d.pressed){
            playership.thrustVector.y+=0.0015
        }
        if (keys.ArrowLeft.pressed){
            playership.thrustVector.z-=0.00017
        }
        if (keys.ArrowRight.pressed){
            playership.thrustVector.z+=0.00017
        }
        if (keys.SpaceBar.pressed){
            playership.fire(this.animationId)
        }
    }
    onEntry(){
    }
    run(){
    this.animationId=window.requestAnimationFrame(this.run.bind(this))
    this.backround.draw()
    this.handleInput(this.playerShip)
    this.playerShip.update()
    this.playerShip.draw()
    }

}
class Game{
    constructor()
    {
        this.lastState=this.currentState
        this.test="hello"
        this.currentState=new StartScreen(this)
        //this.currentState=new GameState(this)
    }
    init(){
        this.currentState.onEntry()
        //this.currentState=this.currentState.
    }
}