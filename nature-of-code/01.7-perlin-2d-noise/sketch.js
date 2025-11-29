function setup() {
    // Runs once
    createCanvas(600, 400); // width, height

    loadPixels();
    let tx = 0.0;
    for (let x = 0; x<width; x++) {
        let ty = 0.0;
        for (let y=0; y<height; y++) {
            const gray = noise(tx, ty) * 255;
            set(x, y, gray);
            ty += 0.005;
        }
        tx += 0.005;
    }
    updatePixels();
}

let u = 0;
let v = 0;

function draw() {
    stroke(100);
    fill(255);
    circle(width/2, height/2, 30);
}