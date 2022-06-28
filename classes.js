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
        this.image=new Image()
        this.image.onload = () => {
            this.width=this.image.width*scale
            this.heigth=this.image.height*scale
        }
        this.image.scr=image.src
        this.animate = animate
        this.sprites = this.sprites
        this.scale=scale
    }
    draw(){
        c.save()
        c.translate(
            this.position.x+this.width/2,
            this.position.y+this.heigth/2
        )
        c.rotate(this.position.rotation)
        c.translate(
            -this.position.x+this.width/2,
            -this.position.y+this.heigth/2
        )
        c.drawImage()
        c.restore()
    }
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