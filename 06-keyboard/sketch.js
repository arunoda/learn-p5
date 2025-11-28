let diamteter = 50;
let speed = 2;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    if (keyIsDown("j")) {
        diamteter += speed;

        if (diamteter > 400) {
            diamteter = 50;
        }
    }

    // circle
    noStroke();
    fill(255);
    circle(width/2, height/2, diamteter);
}

function keyPressed() {
    if (key === "s") {
        speed += 5;

        if (speed > 50) {
            speed = 2;
        }
    }
}