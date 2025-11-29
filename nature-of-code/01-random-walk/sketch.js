const jump_size = 2;

class Walker {
    constructor() {
        this.x = width/2;
        this.y = height/2;
    }

    step() {
        const chance = floor(random(4));
        if (chance === 0) {
            this.x += jump_size;
        } else if(chance === 1) {
            this.x -= jump_size;
        } else if (chance === 2) {
            this.y += jump_size;
        } else {
            this.y -= jump_size;
        }
    }

    show() {
        stroke(200);
        strokeWeight(2);
        point(this.x, this.y);
    }
}

let walker;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height
    walker = new Walker();
    walker.show();

     // Runs every frame (default ~60 fps)
     background(30);
}

function draw() {

    walker.step();
    walker.show();
}