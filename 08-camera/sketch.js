let angle = 0;
let showAxes = false;

function setup() {
    // Runs once
    createCanvas(600, 400, WEBGL); // width, height
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    // control using the mouse
    orbitControl();

    if (showAxes) {
        push();
        drawAxes(10000);
        pop();
    }

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

    if (key === 'a' || key === 'A') {
        showAxes = !showAxes;
    }
}

// Helper: draw X/Y/Z axes
// Helper: draw X/Y/Z axes
function drawAxes(size) {
    strokeWeight(2);

    // X axis (red)
    stroke(255, 0, 0);
    line(0, 0, 0, size, 0, 0);

    // Y axis (green)
    stroke(0, 255, 0);
    line(0, 0, 0, 0, size, 0);

    // Z axis (blue)
    stroke(0, 0, 255);
    line(0, 0, 0, 0, 0, size);
}