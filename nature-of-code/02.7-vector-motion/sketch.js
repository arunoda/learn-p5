let circleVector;
let velocity;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height

    circleVector = createVector(width/2, height/2);
    velocity = createVector(2, -5);
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    circleVector.add(velocity);

    // wrap circleVector within the display range
    if (circleVector.y > height) {
        circleVector.y = 0;
    } else if (circleVector.y < 0) {
        circleVector.y = height;
    }

    if (circleVector.x > width) {
        circleVector.x = 0;
    } else if (circleVector.x < 0) {
        circleVector.x = width;
    }

    noStroke();
    circle(circleVector.x, circleVector.y, 50);
}