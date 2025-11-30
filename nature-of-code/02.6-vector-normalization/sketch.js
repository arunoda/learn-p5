let centerVector;
let mouseVector;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height
    centerVector = createVector(width/2, height/2);
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);
    mouseVector = createVector(mouseX, mouseY);

    const displayVector = p5.Vector.sub(mouseVector, centerVector);
    const directionVector = p5.Vector.normalize(displayVector);
    // This is the direction, but scaled for the display purpose.
    const normalizedDisplayVector = p5.Vector.mult(directionVector, 100);

    push();
    translate(centerVector);

    stroke(100);
    line(0, 0, displayVector.x, displayVector.y);

    stroke(200);
    strokeWeight(3);
    line(0, 0, normalizedDisplayVector.x, normalizedDisplayVector.y);

    pop();
}