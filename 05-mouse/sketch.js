let diamteter = 50;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    // circle
    noStroke();
    fill(200);
    circle(mouseX, mouseY, diamteter);
}

function mousePressed() {
    diamteter += 20;
    if (diamteter > 400) {
        diamteter = 50;
    }
}