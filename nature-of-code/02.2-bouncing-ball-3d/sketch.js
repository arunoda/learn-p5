let position;
let velocity;

let sphereRadius = 20;
let boxSize = 200;

function setup() {
    // Runs once
    createCanvas(600, 400, WEBGL); // width, height

    position = createVector(0, 0, 0);
    velocity = createVector(3, 5, 2);
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    orbitControl();

    position.add(velocity);

    if (abs(position.x) > boxSize/2) {
        velocity.x *= -1;
    }

    if (abs(position.y) > boxSize/2) {
        velocity.y *= -1;
    }

    if (abs(position.z) > boxSize/2) {
        velocity.z *= -1;
    }

    push();
    fill(255);
    stroke(200)
    translate(position.x, position.y, position.z);
    sphere(sphereRadius, 20)
    pop();

    push();
    noFill();
    stroke(255);
    box(boxSize + sphereRadius * 2);
    pop();
}