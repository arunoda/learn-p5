function setup() {
    // Runs once
    createCanvas(600, 400, WEBGL); // width, height
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(0);

    orbitControl();

    // gives the ambient light
    ambientLight(100);
    // gives the ambient light: AKA sun
    // but cannot add intensity
    directionalLight(255, 255, 255, 1, 1, 0);

    //cube
    push();
    fill(100);
    noStroke();
    // The color interact with the ambient light
    ambientMaterial(255, 0, 0);
    // The color interact with other types of light
    specularMaterial(255, 255, 255);
    // increasing makes it shiny and blur the light patch
    shininess(50);
    sphere(60)
    pop();

    //plane
    push();
    translate(0, 60, 0);
    // emissive color, which works without any light
    emissiveMaterial(0, 50, 50);
    noStroke();
    box(300, 2, 300);
    pop();
}

function keyPressed() {
    if (key === 'r' || key === 'R') {
        camera();
    }
}