class RandomWalker {
    constructor() {
        this.x = width/2;
        this.y = height/2;
    }

    step() {
        const stepX = random(-1, 1) * 2;
        const stepY = random(-1, 1) * 2;
        this.x += stepX;
        this.y += stepY

        // pushing away from the edges
        if (this.x < 0 || this.x > width) {
            this.x -= stepX;
        }

        if (this.y < 0 || this.y > height) {
            this.y -= stepY;
        }
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
    background(30);
    walker = new RandomWalker();
}

function draw() {
    // Runs every frame (default ~60 fps)
    
    walker.step();
    walker.draw();
}