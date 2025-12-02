let circlePosition;
let velocity;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height

    circlePosition = createVector(width/2, height/2);
    velocity = createVector(0, -10);
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    circlePosition.add(velocity);

    if (circlePosition.y > height) {
        circlePosition.y = 0;
    } else if (circlePosition.y < 0) {
        circlePosition.y = height;
    }

    if (circlePosition.x > width) {
        circlePosition.x = 0;
    } else if (circlePosition.x < 0) {
        circlePosition.x = width;
    }


    noStroke();
    fill(200);
    circle(circlePosition.x, circlePosition.y, 40);
}