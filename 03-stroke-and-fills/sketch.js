function setup() {
    // Runs once
    createCanvas(600, 400); // width, height
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(220);

    //circle
    noStroke();
    fill(200, 80, 80);
    circle(width/2, height/2, 50);


    //reactangle with no fill
    stroke(100);
    strokeWeight(3);
    noFill();
    rect(250, 150, 100, 100);

    //big line
    stroke(255);
    strokeWeight(10);
    const lineY = height/2 + 100;
    line(0, lineY, width, lineY);
}