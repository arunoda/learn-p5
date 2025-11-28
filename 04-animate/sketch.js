let diamteter = 10;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);
    
    // this speed can be anything, but we are trying to reach 
    // the height in a second (since this runs at ~60fps)
    let speed = height / 60;

    // since this runs on every frame, we just need to update
    // any variable here
    diamteter += speed;
    if (diamteter > height) {
        diamteter = 0;
    } 

    //circle
    noStroke();
    fill(255);
    circle(width/2, height/2, diamteter);
}