class Mover {
    constructor(initialPosition, initialVelocity = createVector(0, 0)) {
        this.position = createVector(initialPosition.x, initialPosition.y);
        this.velocity = FROM_PIXELS_TO_SEC(initialVelocity);
        this.mass = 1;

        this.nextForce = createVector(0, 0);
    }

    addForce(force) {
        this.nextForce.add(force);
    }

    update() {
        this.checkEdges();
        // f = ma => a = f/m
        const acceleration = p5.Vector.div(this.nextForce, this.mass);
        this.nextForce = createVector(0, 0);

        this.velocity.add(acceleration);
        this.position.add(this.velocity);
    }

    checkEdges() {
        //check edges
        const radius = this.getRadius();

        if (this.position.y > height - radius) {
            this.position.y = height - radius;
            this.velocity.y *= -1;
        } else if (this.position.y < radius) {
            this.position.y = radius;
            this.velocity.y *= -1;
        }
        
        if (this.position.x > width - radius) {
            this.position.x = width - radius;
            this.velocity.x *= -1;
        } else if (this.position.x < radius) {
            this.position.x = radius;
            this.velocity.x *= -1;
        }
    }

    getRadius() {
        return this.mass * 25;
    }

    render() {
        noStroke();
        circle(this.position.x, this.position.y, this.getRadius() * 2);
    }
}

function FROM_PIXELS_TO_SEC(velocity) {
    return p5.Vector.mult(velocity, 1/60);
}

// In gravity accerelation(g) is fixed. But the force changes due to the mass
// So, all objects reach the ground at the same time.
function GET_GRAVITY_FORCE(mover) {
    return FROM_PIXELS_TO_SEC(createVector(0, 9.8)).mult(mover.mass);
}

let mover;
let mover2;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height

    mover = new Mover(createVector(width/2, 100));
    mover.mass = 1;

    mover2 = new Mover(createVector(100, 100));
    mover2.mass = 0.5;
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    mover.addForce(GET_GRAVITY_FORCE(mover));
    mover.update();
    mover.render();

    mover2.addForce(GET_GRAVITY_FORCE(mover2));
    mover2.update();
    mover2.render();
}

function mousePressed() {
    // add wind force
    const forceX = mouseX - width/2;
    mover.addForce(FROM_PIXELS_TO_SEC(createVector(forceX, 0)));
    mover2.addForce(FROM_PIXELS_TO_SEC(createVector(forceX, 0)));
}