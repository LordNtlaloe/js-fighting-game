const canvas = document.getElementById('game-canvas');
const canvasContext = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

canvasContext.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.2

class Sprite{
    constructor({position, velocity}){
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
    }

    draw(){
        canvasContext.fillStyle = 'blue';
        canvasContext.fillRect(this.position.x, this.position.y, 50, 150);
        
    }

    update(){
        this.draw()
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0;
        }
        else{
            this.velocity.y += gravity
        }
    }
}

const player = new Sprite({
    position:{
        x: 0,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    }
});

player.draw();
player.update();

console.log(player);
const enemy =  new Sprite({
    position:{
        x: 1025 - 50,
        y: 0
    },
    velocity:{
        x: 0,
        y: 0
    }
});

enemy.draw();

function animate(){
    window.requestAnimationFrame(animate);
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();
}

animate();