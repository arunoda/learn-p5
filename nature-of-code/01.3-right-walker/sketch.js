class Walker {
    constructor() {
        this.x = width / 2;
        this.y = height / 2;
    }

    step() {
        // the x value for the right is higher,
        // so this tend to move to right a lot than left
        this.x += random(-1, 1.5);
        this.y += random(-1, 1);
    }

    draw() {
        stroke(255);
        strokeWeight(1);
        point(this.x, this.y);
    }
}

let walker;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height
    background(30);

    walker = new Walker();
}

function draw() {
    // Runs every frame (default ~60 fps)
    
    walker.step();
    walker.draw();
}