function setup() {
    // Runs once
    createCanvas(600, 400); // width, height
}

function draw() {
    // Runs every frame (default ~60 fps)

    // clear the background & add the color
    background(100);

    // x, y, width, height
    rect(20, 40, 100, 200);

    // centerX, centerY, diamteter
    circle(300, 200, 20);

    // startX, startY, endX, endY
    line(0, 300, 600, 300);
}