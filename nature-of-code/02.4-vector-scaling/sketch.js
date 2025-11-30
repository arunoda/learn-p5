let mouseVector;
let centerVector;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height

    centerVector = createVector(width/2, height/2);
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    mouseVector = createVector(mouseX, mouseY);

    // Here we want to scale the vector from the center to the mouse
    // not the direct, mouseVector
    const displayVector = p5.Vector.sub(mouseVector, centerVector);
    const scaledVector = p5.Vector.mult(displayVector, 2);
    
    // for the rendering purpose, we need to translate all two vectors
    // to the center poistion, below push(), translate(), pop() does it
    // the translation only works between push() & pop()
    push();
    translate(centerVector.x, centerVector.y);

    stroke(255);
    strokeWeight(4);
    line(0, 0, displayVector.x, displayVector.y);

    stroke(100);
    strokeWeight(1);
    line(displayVector.x, displayVector.y, scaledVector.x, scaledVector.y);

    pop();

    // See. this cicle is still rendered on the top, left as usual.
    // So, no translate is afffecred after the pop()
    circle(0, 0, 100);
}