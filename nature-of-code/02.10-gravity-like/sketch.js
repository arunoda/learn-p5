let circlePosition;
let circleRadius = 20;
let velocity;
let gravity;
let damping;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height
    circlePosition = createVector(width/2, 50);
    velocity = createVector(0, 0);
    gravity = createVector(0, 0.4);
    damping = 0.1;
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    velocity.add(gravity);
    circlePosition.add(velocity);

    console.log(circlePosition.x, circlePosition.y);

    const groundLevel = height - circleRadius;
    if (circlePosition.y > groundLevel & velocity.y > 0) {
        velocity.y *= - (1 - damping);
        circlePosition.y = groundLevel;
    }

    noStroke();
    fill(200);
    circle(circlePosition.x, circlePosition.y, circleRadius * 2);
}