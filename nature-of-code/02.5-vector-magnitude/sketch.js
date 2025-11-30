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

    push();
    translate(centerVector);
    stroke(200);
    line(0, 0, displayVector.x, displayVector.y);
    pop();

    const magnitude = displayVector.mag();
    noStroke();
    fill(0, 200, 200);
    rect(0, height-10, magnitude, 10);
}