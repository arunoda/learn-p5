let angle = 0;

function setup() {
    // Runs once
    createCanvas(600, 400, WEBGL); // width, height
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    // control using the mouse
    orbitControl();

    // this push() and pop() will localize all the movement
    push();
    angle += 0.01;
    rotateY(angle);
    stroke(255);
    strokeWeight(2);
    fill(0);
    box(150, 150, 150);
    pop();

    push();
    translate(0, 75, 0);
    box(400, 3, 400);
    pop();
}

function keyPressed() {
    // Add reset support
    if (key === 'r' || key === 'R') {
        camera();
    }
}