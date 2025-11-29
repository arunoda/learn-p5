class Walker {
    constructor() {
        this.tx = 0;
        this.ty = 0.1;
    }

    step() {
        this.x = noise(this.tx) * width;
        this.y = noise(this.ty) * height;

        // This indicates the size of the jump
        this.tx += 0.1;
        this.ty += 0.1;
    }

    draw() {
        stroke(255);
        strokeWeight(2);
        point(this.x, this.y);
    }
}

let walker;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height
    walker = new Walker();

    background(30);
}

function draw() {
    walker.step();
    walker.draw();
}