let x;
let y;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height
    x = width/2;
    y = height/2;
}

let xSpeed = 1;
let ySpeed = 2;

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    x += xSpeed;
    y += ySpeed;

    if (x < 0 || x > width) {
        xSpeed *= -1;
    }

    if (y < 0 || y > height) {
        ySpeed *= -1;
    }

    noStroke();
    circle(x, y, 30);
}