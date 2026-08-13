const BACKGROUND = "#101010";
const FOREGROUND = "#50FF50";

console.log(game);
game.width = 800;
game.height = 800;

const ctx = game.getContext("2d");
console.log(ctx);   

function clear(){
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, game.width, game.height);
}

function point({x, y}){
    const s = 20;
    ctx.fillStyle = FOREGROUND;
    ctx.fillRect(x-s/2, y-s/2, s, s);
}

function screen(p){
    //-1..1 => 0..2 => 0..1=> 0..w
    return{
        x: (p.x + 1)/2 * game.width, 
        y: (1-(p.y + 1)/2) * game.height
    } 
}

clear();
//point(screen({x: 0.5, y: 0.5}));

//x'=x/z
//y'=y/z

function project({x, y, z}){
    return {
        x: x/z,
        y: y/z
    }
}


const vs = [
    {x: 0.25, y: 0.25, z: 0.25},
    {x: 0.25, y: -0.25, z: 0.25},
    {x: -0.25, y: -0.25, z: 0.25},
    {x: -0.25, y: 0.25, z: 0.25},

    {x: 0.25, y: 0.25, z: -0.25},
    {x: 0.25, y: -0.25, z: -0.25},
    {x: -0.25, y: -0.25, z: -0.25},
    {x: -0.25, y: 0.25, z: -0.25},
]

const fs = [
    [0,1,2,3],
    [4,5,6,7],
    [0,4],
    [1,5],[2,6],[3,7]
]

function translate_z({x, y, z}, dz){
    return {x, y, z: z+dz};
}

function rotate_xz({x, y, z}, angle){
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return{
        x: x*cos - z*sin,
        y: y,   
        z: x*sin + z*cos
    }
}

function line(p1, p2){
    ctx.strokeStyle = FOREGROUND;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
}

const FPS = 60;
let dz = 1;
let angle = 0;
function frame(){
    clear();
    const dt = 1/FPS;
    //dz += 1 * dt;
    const da = 2*Math.PI / FPS
    angle += 0.5*da;

    for(const v of vs){
        //point(screen(project(translate_z(v, dz))))
        //point(screen(project(rotate_xz(v, angle))))
        point(screen(project(translate_z(rotate_xz(v, angle), dz))))
        
    }

    for(const f of fs){
        for(let i=0; i<f.length; i++){
            let p1_0 = vs[f[i]];
            let p2_0 = vs[f[(i+1)%f.length]] 
            let p1 = screen(project(translate_z(rotate_xz(p1_0, angle), dz)))
            let p2 = screen(project(translate_z(rotate_xz(p2_0, angle), dz)))
            line(p1, p2)
        }
    }


    setTimeout(frame, 1000/FPS);
}

setTimeout(frame, 1000/FPS)