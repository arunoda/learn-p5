let earthPosition;
let earthRadius;

let cometStartPosition;
let cometRadius;
let cometTargetPosition;

class Comet {
    constructor(startPosition, size) {
        this.startPosition = createVector(startPosition.x, startPosition.y);
        this.position = createVector(startPosition.x, startPosition.y);
        this.target = this.position;
        this.speed = 0;
        this.size = size;
        this.totalDistance = 0;
        this.allowRender = true;
    }

    show(canShow) {
        this.allowRender = canShow;
    }

    setTarget(targetPosition, speed) {
        this.startPosition = createVector(this.position.x, this.position.y);
        this.target = targetPosition;
        this.speed = speed;

        this.totalDistance = calc_distance(this.target, this.startPosition);
    }

    update() {
        if (!this.allowRender) {
            return;
        }

        const toTarget = p5.Vector.sub(this.target, comet.position);
        const targetDirection = p5.Vector.normalize(toTarget);
        const distance = toTarget.mag();

        const thresholdDistance = min(10, this.totalDistance/10);
        if (distance < thresholdDistance) {
            const velocity = p5.Vector.mult(targetDirection, min(this.speed, distance * 0.1));
            this.position.add(velocity);
        } else {
            const velocity = p5.Vector.mult(targetDirection, this.speed);
            this.position.add(velocity);
        }
    
        fill(255);
        circle(this.position.x, this.position.y, this.size * 2);
    }
}

let comet;

function SECONDS_TO_FRAMES(seconds) {
    const fps = 60;
    return seconds * fps;
}

function calc_distance(x, y) {
    return p5.Vector.sub(y, x).mag();
}

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height

    earthRadius = 350;
    earthPosition = createVector(width/2, height + earthRadius/1.6);

    comet = new Comet(createVector(10, 10), 10);

    const targetPosition = createVector(width/2, height/2);
    const speed = calc_distance(targetPosition, comet.position) / SECONDS_TO_FRAMES(1);
    comet.setTarget(targetPosition, speed);
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    renderEarth();
    comet.update();

    if (keyIsDown("h") || keyIsDown("H")) {
        comet.show(false);
    } else {
        comet.show(true);
    }
}

function renderEarth() {
    fill(230);
    circle(earthPosition.x, earthPosition.y, earthRadius*2)
}