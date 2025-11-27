let x = 0;
let y = 0;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(200);    // clear canvas each frame

    fill(200, 50, 0); // circle color
    noStroke();
    circle(x, y, 100); // x, y, diameter

    x += 5;                     // move to the right
    if (x > width) x = 0;       // wrap around

    y += 5;
    if (y > height) y = 0;
}