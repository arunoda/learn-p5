let angle = 0;

function setup() {
    // Runs once
    createCanvas(600, 400, WEBGL); // width, height
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    angle += 0.05;

    rotateY(angle);

    stroke(255);
    strokeWeight(2);
    fill(0);
    box(150, 150, 150);
}