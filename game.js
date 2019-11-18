class Arena {

    sprites = [];

    constructor(canvas) {
        var context = canvas.getContext('2d');
        this.ctx = context;
        this.width = canvas.width;
        this.height = canvas.height;
    }

    add(sprite) {
        this.sprites.push(sprite);
    }

    draw() {

        this.ctx.clearRect(0, 0, this.width, this.height);

        this.sprites.map(sprite => {
            sprite.draw(this.ctx, this.width, this.height);
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

    draw(ctx, width, height) {

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();

        this.update(width, height);
    }    

    update(width, height) {

        console.log("update");

        if (this.controller.isRight()) {

            if (this.x + this.dx > width - this.size) {

            }
            else {
                this.x += this.dx;
            }
        }

        if (this.controller.isLeft()) {

            if (this.x + this.dx < this.size) {

            }
            else {
                this.x -= this.dx;
            }
        }

        if (this.controller.isUp()) {
            if (this.y + this.dy < this.size) {

            }
            else {
                this.y += this.dy;
            }
        }

        if (this.controller.isDown()) {
            
            if (this.y + this.dy > height - this.size) {

            }
            else {
                this.y -= this.dy;
            }
        }
    }

}

window.onload = () => {
    console.log("window loaded");

    var canvas = document.getElementById('arena');
   
    var cX = canvas.width / 2;
    var cY = canvas.height - 30;

    const arena = new Arena(canvas);
    const tank = new Tank(cX, cY);

    arena.add(tank);
    arena.draw();
}
