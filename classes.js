class Sprite{
    constructor({
        position,
        velocity,
        accelartion,
        image,
        animate,
        scale=1,
        lifetime=-1,
        renderObjects=[],
        health=1,
        id,
    })
    {
        this.position=position
        this.velocity=velocity
        this.accelartion=accelartion
        this.image=new Image()
        this.image.src=image.src
        // there seems to be a problem with the onload method, width and height fields are not instanciated for sprites spawned by the the ship fire() method
        this.image.onload = () => {
            this.width=this.image.width*scale,
            this.height=this.image.height*scale
        }
        //this.image.scr=image.src
        this.animate = animate
        this.sprites = this.sprites
        this.scale=scale
        this.renderObjects=renderObjects
        this.lifetime=lifetime
        this.health=health
        this.id=id
    }
    draw(){
        //console.log(this.width)
        c.save()
        c.translate(
            this.position.x+this.width/2,
            this.position.y+this.height/2
        )
        c.rotate(this.position.rotation)
        c.translate(
            -this.position.x-this.width/2,
            -this.position.y-this.height/2
        )
        c.drawImage(this.image,this.position.x,this.position.y)
        c.restore()
    }
    isAlive(){
        return(this.health>0 && (this.lifetime>0 || this.lifetime==(-1)))
    }

    removeElementfromArray(array){
        //removes the Instance of the method owner from an array
        //kind of inefficient doing it this way, maybe move such a thing to the main loop
        let i=0
        array.forEach(element => {
            if (element==this){
                array.splice(i,1)
            }
            i++
        });
    }

    update(){
        if (!this.isAlive()){
            this.removeElementfromArray(this.renderObjects)
            //console.log("Dead")
        }
        if (this.lifetime !=-1){
            this.lifetime=this.lifetime-1;
        }
        this.velocity.x=this.velocity.x+this.accelartion.x
        this.velocity.y=this.velocity.y+this.accelartion.y
        this.velocity.vRotation=this.velocity.vRotation+this.accelartion.z 
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
        this.position.rotation=(this.position.rotation+this.velocity.vRotation)%(2*Math.PI)
    }
    
}
class Spawner{
    constructor(objectList){
        this.objectList=objectList
    }
    spawn(){
    }
}
class ParticelSpawner extends Spawner{
    constructor(objectList,playerShip){
        super(objectList)
        this.image=new Image()
        this.image.src=base+"/img/particle.png"
        this.playerShip=playerShip
        this.particleLifetime=700
        this.maxParticles=100
        this.spawnCooldown=50
        this.timeSinceSpawn=0
    }
    spawn(){
        if (this.objectList.length<this.maxParticles&&this.timeSinceSpawn>this.spawnCooldown) {
            this.timeSinceSpawn=0
            const position_X=Math.random()*canvas.width+this.playerShip.position.x-canvas.width/2
            const position_Y=Math.random()*canvas.height+this.playerShip.position.y-canvas.height/2
            const particleLifetimeRnd=Math.random()*this.particleLifetime+20
            const particle = new Sprite({position:{x:position_X,y:position_Y,rotation:0},velocity:{x:0,y:0,vRotation:0},accelartion:{x:0,y:0,z:0},image:this.image,renderObjects:this.objectList,lifetime:this.particleLifetime})
            this.objectList.push(particle)
            //console.log("Spawned Particle")
            //console.log(this.objectList)
        }
        this.timeSinceSpawn+=1
    }
}
class AsteroidSpawner extends Spawner{
    constructor(objectList,playerShip){
        super(objectList)
        this.image=new Image()
        this.image.src=base+"/img/asteroid.png"
        this.playerShip=playerShip
        this.asteroidList=[]
        this.asteroidList_temp=[]
        this.maxAsteroids=80
        this.maxVelocity=0.2
        this.maxDistance=2000.0
    }
    removeElementfromArray(array,elementToRemove){
        //removes the Instance of the method owner from an array
        //kind of inefficient doing it this way, maybe move such a thing to the main loop
        let i=0
        array.forEach(element => {
            if (element==elementToRemove){
                array.splice(i,1)
            }
            i++
        })
    }

    distanceToRectangle(rectangle1,rectangle2){
        return Math.sqrt(Math.pow(rectangle1.position.x-rectangle2.position.x,2)+Math.pow(rectangle1.position.y-rectangle2.position.y,2))
    }

    spawn(){
        if (this.asteroidList.length<5){
            for (let index = 0; index < 4; index++) {
            let rnd1=Math.random()    
            const position_X=(rnd1*2-1)*canvas.width+this.playerShip.position.x+((rnd1-1>0)*2-1)*100
            let rnd2=Math.random()
            const position_Y=(rnd2*2-1)*canvas.height+this.playerShip.position.y+((rnd2-1>0)*2-1)*100
            const rotation=Math.random()*Math.PI
            const velocity_X=(Math.random()*2-1)*this.maxVelocity
            const velocity_Y=(Math.random()*2-1)*this.maxVelocity
            const asteroid1=new Sprite({position:{x:position_X,y:position_Y,rotation:rotation},velocity:{x:velocity_X,y:velocity_Y,vRotation:(Math.random()*2-1)*0.001},accelartion:{x:0,y:0,z:0},image:this.image,renderObjects:this.objectList,lifetime:-1})
            this.asteroidList.push(asteroid1)
            this.objectList.push(asteroid1)
            console.log("Initial Spawns")
            
            }
        }
        else if(this.asteroidList.length<this.maxAsteroids){
            let rnd1=Math.random()    
            //const position_X=(rnd1*2-1)*canvas.width+this.playerShip.position.x+((rnd1-1>0)*2-1)*canvas.width
            const position_X=this.playerShip.position.x+(((rnd1*2-1>0)*2-1)+(rnd1*2-1))*canvas.width
            console.log(position_X-this.playerShip.position.x<0)
            let rnd2=Math.random()
            //const position_Y=(rnd2*2-1)*canvas.height+this.playerShip.position.y+((rnd2-1>0)*2-1)*canvas.height
            const position_Y=this.playerShip.position.y+(((rnd2*2-1>0)*2-1)+(rnd2*2-1))*canvas.height
            const rotation=Math.random()*Math.PI
            const velocity_X=(Math.random()*2-1)*this.maxVelocity
            const velocity_Y=(Math.random()*2-1)*this.maxVelocity
            const asteroid2=new Sprite({position:{x:position_X,y:position_Y,rotation:rotation},velocity:{x:velocity_X,y:velocity_Y,vRotation:(Math.random()*2-1)*0.001},accelartion:{x:0,y:0,z:0},image:this.image,renderObjects:this.objectList,lifetime:-1})
            
            let positionIsOccupied=0
            this.asteroidList.every(element => {
                
                if (this.distanceToRectangle(asteroid2,element)<400){
                    positionIsOccupied=1
                    return false
                }
            });

            if (positionIsOccupied==0){
                this.asteroidList.push(asteroid2)
                this.objectList.push(asteroid2)
                //console.log("Spawned Asteroid")
            }
            else{
                console.log("didn't spawn as place occupied")
            }
            
            //console.log(this.playerShip.position)
        }
        
        this.asteroidList.forEach(element => {
            let distanceToPlayer = Math.sqrt(Math.abs((element.position.x-this.playerShip.position.x))+Math.pow(element.position.y-this.playerShip.position.y,2))
            //console.log(this.maxDistance<distanceToPlayer)
            //console.log(Math.pow(this.maxDistance,2)-distanceToPlayer)
            if (distanceToPlayer>this.maxDistance||element.health<=0){
                console.log("Deleted Asteroid")
                //console.log(Math.pow(this.maxDistance,2)-distanceToPlayer)
                element.health=0
                this.removeElementfromArray(this.asteroidList,element)
            }
        });

        

        
        //console.log(this.asteroidList.length)
        //console.log("AsteroidList:"+this.asteroidList.length)
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
        dampning=0,
        renderObjects,
    })
    {
        super({
            position,
            velocity,
            accelartion,
            image,
            animate,
            scale,
            renderObjects,
        })
        //this.position=position
        //this.velocity=velocity
        //this.accelartion=accelartion
        //this.image=new Image()
        //this.image.src=image.src
        this.dampning=dampning
        this.thrustVector={x:0,y:0,z:0}
        this.weaponCooldown=20
        this.weaponLastFired=0
        this.weaponSpeed=2
        this.weaponLifeTime=700
        this.laserSpriteImg=new Image()
        this.laserSpriteImg.src=base+"/img/shot_01.png"
            
        //this.renderObjects=renderObjects
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
            //console.log('Fire')
            const cosPhi=Math.cos(this.position.rotation)
            const sinPhi=Math.sin(this.position.rotation)
            //console.log(cosPhi)
            const x_velocity=cosPhi*this.weaponSpeed+this.velocity.x
            const y_velocity=sinPhi*this.weaponSpeed+this.velocity.y
            let shotSprite=new Sprite({position:{x:this.position.x+this.width/2,y:this.position.y+this.height/2,rotation:this.position.rotation},velocity:{x:x_velocity,y:y_velocity,vRotation:0},accelartion:{x:0,y:0,z:0},image:this.laserSpriteImg,lifetime:this.weaponLifeTime,renderObjects:this.renderObjects,id:"weaponShell"})
            //console.log(shotSprite.position.rotation)
            this.renderObjects.push(shotSprite)

        }
        else{
            //console.log('Weapons cooldown'+((frameId-this.weaponLastFired) % this.weaponCooldown))
            //console.log(frameId-this.weaponLastFired)
        }
    }
    
}

class Camera{
    constructor(target){
        this.target=target
        this.position={x:this.target.position.x,y:this.target.position.y}
        this.velocity={x:0,y:0}
        this.accelartion={x:0,y:0}
        this.dampning=0.001
        this.spring=0.0001
    }
    update(){
        this.accelartion.x=this.spring*(this.target.position.x-this.position.x)+this.dampning*(this.target.velocity.x-this.velocity.x)
        this.accelartion.y=this.spring*(this.target.position.y-this.position.y)+this.dampning*(this.target.velocity.y-this.velocity.y)

        this.velocity.x=this.velocity.x+this.accelartion.x
        this.velocity.y=this.velocity.y+this.accelartion.y

        this.position.x=this.position.x+this.velocity.x
        this.position.y=this.position.y+this.velocity.y

        //c.translate(-this.position.x,-this.position.y)
        c.translate(-this.velocity.x,-this.velocity.y)
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
        this.backgroundImg.src=base+"/img/startscreen.png"
        this.backround2=new Sprite({position:{x:0,y:0,rotation:0},velocity:{x:0,y:0,vRotation:0},accelartion:{x:0,y:0,z:0},image:this.backgroundImg})
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
//not implemented, there is only one level
class LevelSelectScreen extends GameState{
    constructor(){
        super()
    }
    onEntry(){
        ctx.fillStyle = 'red';
        ctx.fillRect(80, 60, 140, 30);
    }
}
class ScoreBoard{
    constructor(domElement){
        this.scoreBoard=domElement
        this.score=0
        this.maxScoreDigitLength=4
    }
    increaseScore(number){
        this.score+=number
    }
    countDigit_(n){
        if (n==0) {
            return 1
        } else {
            return Math.floor(Math.log10(n) + 1);
        }
    }
    scoreToString_(){
        const digitCount=this.countDigit_(this.score)
        let scoreString=""
        for (let index = 0; index < this.maxScoreDigitLength-digitCount; index++) {
            scoreString+="0";
        }
        const scoreCapped=this.score%Math.pow(10,this.maxScoreDigitLength)
        scoreString+=scoreCapped
        return scoreString
    }
    update(){
        this.scoreBoard.innerHTML=(this.scoreToString_())
    }
}
class Mission extends GameState{
    constructor(game){
        super(game)
        this.animationId=0
        this.backgroundImg=new Image()
        
        this.backgroundImg.src=base+"/img/background.png"
        
        this.background=new Sprite({position:{x:0,y:0,z:0},velocity:{x:0,y:0,vRotation:0},accelartion:{x:0,y:0,z:0},image:this.backgroundImg})
        this.playerShipImage=new Image()
        this.playerShipImage.src=base+"/img/playership.png"
        this.renderObjects=[]
        this.playerShip=new Ship({position:{x:canvas.width/2,y:canvas.height/2,rotation:Math.PI/2},velocity:{x:0,y:0,vRotation:0},accelartion:{x:0,y:0,z:0},image:this.playerShipImage,dampning:0.001,renderObjects:this.renderObjects})
        this.scoreBoard=new ScoreBoard(document.querySelector('#Score'))
        //this.asteroidImg=new Image()
        //this.asteroidImg.src="/img/asteroid.png"
        //this.asteroidImg.onload = () => {
        //    this.asteroid=new Sprite({position:{x:400,y:400,rotation:0},velocity:{x:0,y:0,vRotation:0},accelartion:{x:0,y:0,z:0},image:this.asteroidImg})
        //    this.renderObjects.push(this.asteroid)
        //    this.asteroid.renderObjects=this.renderObjects
        //}

        this.particleList=[]
        this.particleSpawner=new ParticelSpawner(this.particleList,this.playerShip)
        //asteroidspawner
        this.asteroidSpawner=new AsteroidSpawner(this.renderObjects,this.playerShip)
        //camera test
        this.camera=new Camera(this.playerShip)
        
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
            playership.thrustVector.z-=0.0003
        }
        if (keys.ArrowRight.pressed){
            playership.thrustVector.z+=0.0003
        }
        if (keys.SpaceBar.pressed){
            playership.fire(this.animationId)
        }
    }

    rectangularCollision(rectangle1, rectangle2) {
        return (rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
            rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
            rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
            rectangle1.position.y + rectangle1.height >= rectangle2.position.y
        )
      }
    handleCollison(collisionObjectList){
        //console.log(collisionObjectList)
        for (let i = 0; i < collisionObjectList.length; i++) {
            for (let j = 0; j < collisionObjectList.length; j++) {
                if (i != j){
                    if (this.rectangularCollision(collisionObjectList[i],collisionObjectList[j])){
                        collisionObjectList[i].health-=1;
                        collisionObjectList[j].health-=1; 
                        console.log('Collision')
                        if (collisionObjectList[i].id=="weaponShell") {
                            this.scoreBoard.increaseScore(1)
                        }

                    }
                }
            }
        }
    }
    onEntry(){
        console.log("Started Mission")
        document.querySelector('#MissionScreen').style.display='flex'
        document.querySelector('#Controls').style.display='flex'
    }

    run(){
    this.animationId=window.requestAnimationFrame(this.run.bind(this))
    this.background.draw()
    this.background.position.x=this.camera.position.x-canvas.width/2
    this.background.position.y=this.camera.position.y-canvas.height/2
    //
    this.handleInput(this.playerShip)
    this.asteroidSpawner.spawn()
    //console.log(this.playerShip)
    this.renderObjects.forEach(element => {
        element.update()
        element.draw()
    });
   
    this.playerShip.update()
    this.playerShip.draw()
    this.handleCollison(this.renderObjects)

    
    this.scoreBoard.update()
    this.camera.update()

    this.particleSpawner.spawn()
    this.particleList.forEach(element =>{
        element.update()
        element.draw()
    })
    
    //console.log(this.particleList)

    // camera test
    //c.translate(this.cameraPosition.x,this.cameraPosition.y)
    //this.cameraPosition.x-=0.01
    //this.cameraPosition.y-=0.01
    //console.log("renderList:"+this.renderObjects.length)
    }

}
class Game{
    constructor()
    {
        this.lastState=this.currentState
      
        this.currentState=new StartScreen(this)
        //this.currentState=new GameState(this)
    }
    init(){
        this.currentState.onEntry()
        //this.currentState=this.currentState.
    }
}