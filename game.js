const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

canvas.width = 1024
canvas.height = 576

canvasContext.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7

class Sprite{
    constructor({position, velocity, color = 'white', offset}){
        this.position = position
        this.velocity = velocity
        this.height = 150
        this.width = 50
        this.lastKey
        this.isAttacking = false
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 45,
        }
        this.color = color
        this.health = 100
    }

    draw(){
        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height);
        
        //attack Box

        if(this.isAttacking){    
            canvasContext.fillStyle = 'purple'
            canvasContext.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }
    }

    update(){
        this.draw()
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if(this.position.x + this.width + this.velocity.x >= canvas.width || this.position.x + this.width + this.velocity.x <= canvas.width){
            this.velocity.x = 0
        }
        if(this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }
        else{
            this.velocity.y += gravity
        }
    }

    attack(){
        this.isAttacking = true
        setTimeout(() => {
            this.isAttacking = false
        }, 100);
    }
}

const player = new Sprite({   
    position: {
        x: 20, 
        y: 20
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: 0,
        y: 0,
    },
    color: 'red'
})

const enemy =  new Sprite({   
    position: {
        x: 900, 
        y: 20
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset: {
        x: -50,
        y: 0,
    },
    color: 'blue'
})

const keys = {
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    w:{
        pressed: false
    },
    s:{
        pressed: false
    },
    ArrowUp:{
        pressed: false
    },
    ArrowDown:{
        pressed: false
    },
    ArrowLeft:{
        pressed: false
    },
    ArrowRight:{
        pressed: false
    }
}


// collision
function collision({rectangle1,rectangle2}){
    return(
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x && 
        rectangle2.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
    )
}

// let lastKey
function animate(){
    window.requestAnimationFrame(animate)
    canvasContext.fillStyle = 'black'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    enemy.update()

    player.velocity.x = 0
    enemy.velocity.x = 0
 
    if(keys.w.pressed && player.lastKey === 'w'){
        player.velocity.y = -10
    }
    else if(keys.s.pressed && player.lastKey === 's'){
        player.velocity.y = 10;
    }
    else if(keys.a.pressed && player.lastKey === 'a'){
        player.velocity.x = -5
    }
    else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 5
    }
    if(keys.ArrowUp.pressed && enemy.lastKey === 'ArrowUp'){
        enemy.velocity.y = -10
    }
    else if(keys.ArrowDown.pressed && enemy.lastKey === 'ArrowDown'){
        enemy.velocity.y = 10
    }
    else if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft'){
        enemy.velocity.x = -5
    }
    else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 5
    }

    // detect collision
    if(collision({
            rectangle1: player,
            rectangle2: enemy
        }) && 
        player.isAttacking){
        player.isAttacking = false
        enemy.health -= 10
        document.querySelector('#enemy-health-bar').style.width = enemy.health + '%'
    }

    if(collision({
            rectangle1: enemy,
            rectangle2: player
        }) && 
        enemy.isAttacking){
        enemy.isAttacking = false
        player.health -= 10
        document.querySelector('#player-health-bar').style.width = player.health + '%'
    }

}
animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd'
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
            keys.w.pressed = true;
            player.lastKey = 'w'
            break;
        case 's':
            keys.s.pressed = true;
            player.lastKey = 's';
            break;
        case ' ':
            player.attack();
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            enemy.lastKey = 'ArrowUp';
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = true;
            enemy.lastKey = 'ArrowDown';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'Enter':
            enemy.attack()
        default:
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
        case 's':
            keys.s.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
        case 'ArrowDown':
            keys.ArrowDown.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        default:
            break;
    }
})