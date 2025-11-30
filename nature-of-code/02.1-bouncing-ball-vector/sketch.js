let position;
let velocity;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height
    position = createVector(width/2, height/2);
    velocity = createVector(2, 2);
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    position.add(velocity);


    if (position.x < 0 || position.x > width) {
        velocity.x *= -1;
    }

    if (position.y < 0 || position.y > height) {
        velocity.y *= -1;
    }

    noStroke();
    circle(position.x, position.y, 30);
}