import { useEffect, useRef, useState } from "react";
import Victor from "victor";

const MILLIS = 1000;
const FRAMERATE = 30;
const SPEED = 0.0001;
const COLLISION_BOX = 0.010;

export default function Display({arr, width, height}){
const canvasRef = useRef(null)
const [sprites, setSprites] = useState(arr)

useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    context.clearRect(0, 0, width, height)
    context.fillStyle = "#000000"
    context.strokeRect(0, 0, width, height)
    sprites.forEach(sprite => {
        if(sprite.type === 0)
            context.fillStyle = "#FF0000"
        if(sprite.type === 1)
            context.fillStyle = "#00FF00"
        if(sprite.type === 2)
            context.fillStyle = "#0000FF"
        context.beginPath()
        context.ellipse(Math.round(sprite.x * width), Math.round(sprite.y * height), COLLISION_BOX*width, COLLISION_BOX*height,0, 0, 2*Math.PI, true);
        context.fill()
    });

},[sprites, width, height])
setInterval(() => {
    sprites.forEach(sprite => {
        sprite.x = sprite.x + SPEED * Math.cos(sprite.dir.direction());
        sprite.y = sprite.y + SPEED * Math.sin(sprite.dir.direction());
        //Left and right
        if(sprite.x > 1-COLLISION_BOX || sprite.x < COLLISION_BOX ){
            sprite.dir = sprite.dir.add(Victor(-2*sprite.dir.dot(Victor(1, 0)), 0) )
        }
        //bottom and top
        if(sprite.y < COLLISION_BOX || sprite.y > 1-COLLISION_BOX){
            sprite.dir = sprite.dir.add(Victor(0,-2*sprite.dir.dot(Victor(0, 1))))

        }
        sprites.forEach(sprite0 => {
            if(sprite === sprite0){
                return;
            }
            const distSquared = (sprite.x - sprite0.x)**2 + (sprite.y - sprite0.y)**2
            if(distSquared < COLLISION_BOX**2){
                sprite.dir = new Victor(sprite.x - sprite0.x, sprite.y - sprite0.y)
                sprite0.dir = new Victor(sprite0.x - sprite.x, sprite0.y - sprite.y)

                // sprite.dir = new Victor( -(sprite.y - sprite0.y),sprite.x - sprite0.x)
                // sprite0.dir = new Victor(-sprite.dir.x, -sprite.dir.y)
                console.log(sprite.dir, sprite0.dir)
                const dist = Math.sqrt(distSquared)
                sprite.x = sprite.x + dist * Math.cos(sprite.dir.direction());
                sprite.y = sprite.y + dist * Math.sin(sprite.dir.direction());
                if(sprite.type === 0 && sprite0.type === 1){
                    sprite.type = 1
                }else if(sprite.type === 0 && sprite0.type === 2){
                    sprite0.type = 0
                }else if(sprite.type === 1 && sprite0.type === 2){
                    sprite.type = 2
                }else if(sprite.type === 1 && sprite0.type === 0){
                    sprite0.type = 1
                }else if(sprite.type === 2 && sprite0.type === 0){
                    sprite.type = 0
                }else if(sprite.type === 2 && sprite0.type === 1){
                    sprite0.type = 2
                }
            }
        })
    })
   setSprites([...sprites])
   }, MILLIS/FRAMERATE)
    return <canvas ref = {canvasRef} width={width} height={height} style={{width:`100%`, height:`100%`}} onClick={e => console.log(e)}/>
}