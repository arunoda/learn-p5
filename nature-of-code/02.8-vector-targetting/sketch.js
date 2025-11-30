let circlePosition;
let targetPosition;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height

    circlePosition = createVector(width/2, height/2);
    targetPosition = createVector(width/2, height - 20);
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    const toTarget = p5.Vector.sub(targetPosition, circlePosition);
    const toDirection = p5.Vector.normalize(toTarget);
    const distance = toTarget.mag();
    const velocity = p5.Vector.mult(toDirection, max(distance/10, 0.1));

    if (distance >= 0.2) {
        circlePosition.add(velocity);
    }

    // Rendering
    noStroke();
    fill(200);
    circle(circlePosition.x, circlePosition.y, 50);

    noStroke();
    fill(210, 80, 80);
    circle(targetPosition.x, targetPosition.y, 10);
}

function mousePressed() {
    targetPosition = createVector(mouseX, mouseY);
}