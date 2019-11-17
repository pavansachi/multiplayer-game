class Arena {

    sprites = [];

    constructor(context, width, height) {
        this.ctx = context;
        this.width = width;
        this.height = height;
    }

    add(sprite) {
        this.sprites.push(sprite);
    }

    draw() {

        this.ctx.clearRect(0, 0, this.width, this.height);

        this.sprites.map(sprite => {
            sprite.draw(this.ctx);
            sprite.update(this.width, this.height);
        });

        requestAnimationFrame(this.draw.bind(this));
    }
}

class KeyBoardControl {

    up(keyCode) {
        return keyCode === 38;
    }

    down(keyCode) {
        return keyCode === 40;
    }

    right(keyCode) {
        return keyCode === 39;
    }

    left(keyCode) {
        return keyCode === 37;
    }
}

class Controller {

    constructor() {
        this.control = new KeyBoardControl();
    }

    keyDown(event) {

        const keyCode = event.keyCode;
        if (this.control.right(keyCode)) this.right = true;      
        if (this.control.left(keyCode)) this.left = true;
        if (this.control.up(keyCode)) this.up = true;
        if (this.control.down(keyCode)) this.down = true;
    }

    keyUp(event) {

        const keyCode = event.keyCode;
        if (this.control.right(keyCode)) this.right = false;
        if (this.control.left(keyCode)) this.left = false;
        if (this.control.up(keyCode)) this.up = false;
        if (this.control.down(keyCode)) this.down = false;
    }

    isRight() {
        return this.right;
    }

    isLeft() {
        return this.left;
    }

    isUp() {
        return this.up;
    }

    isDown() {
        return this.down;
    }
}

class Tank {

    dx = 2;
    dy = -2;
    right;
    left;
    controller = null;

    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 5;
        this.controller = new Controller();

        window.addEventListener('keydown', this.controller.keyDown.bind(this.controller), false);
        window.addEventListener('keyup', this.controller.keyUp.bind(this.controller), false);
    }

    draw(ctx) {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }    

    update(width, height) {

        console.log("update");

        if (this.controller.isRight()) this.x += this.dx;
        if (this.controller.isLeft()) this.x -= this.dx;
        if (this.controller.isUp()) this.y += this.dy;
        if (this.controller.isDown()) this.y -= this.dy;
    }

}

window.onload = () => {
    console.log("window loaded");

    var canvas = document.getElementById('arena');
    var context = canvas.getContext('2d');
   
    var cX = canvas.width / 2;
    var cY = canvas.height - 30;

    const arena = new Arena(context, canvas.width, canvas.height);
    const tank = new Tank(cX, cY);

    arena.add(tank);
    arena.draw();
}