let posA;
let posB;
let posSub;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height

    posA = createVector(width/2, height/2);
    posB = createVector(0, 0);
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    // Pos A
    stroke(50);
    strokeWeight(2);
    line(0, 0, posA.x, posA.y);

    // PosB
    posB = createVector(mouseX, mouseY);
    stroke(100);
    strokeWeight(2);
    line(0, 0, posB.x, posB.y);

    // PosSub
    posSub = posB.sub(posA);
    stroke(255);
    strokeWeight(2);
    line(0, 0, posSub.x, posSub.y);

    // PosSub translated
    const posSubTranslated = posSub.add(posA);
    stroke(255, 255, 0);
    strokeWeight(2);
    line(posA.x, posA.y, posSubTranslated.x, posSubTranslated.y);
}