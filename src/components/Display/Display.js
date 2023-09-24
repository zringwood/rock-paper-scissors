import { useEffect, useRef, useState } from "react";

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
        sprite.x = sprite.x + SPEED * Math.cos(sprite.dir);
        sprite.y = sprite.y + SPEED * Math.sin(sprite.dir);
        if(sprite.x < 0 || sprite.y < 0){
            sprite.dir += Math.PI/4;
        }
        if(sprite.x > 1 || sprite.y > 1 ){
            sprite.dir -= Math.PI/4;
        }
        sprites.forEach(sprite0 => {
            if(sprite !== sprite0 && Math.abs(sprite.x - sprite0.x) < COLLISION_BOX && Math.abs(sprite.y - sprite0.y) < COLLISION_BOX){
                sprite.dir += Math.PI;
                sprite0.dir += Math.PI;
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