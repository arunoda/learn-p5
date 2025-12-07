function FROM_PIXELS_TO_SEC(velocity) {
    return p5.Vector.mult(velocity, 1/60);
}

// In gravity accerelation(g) is fixed. But the force changes due to the mass
// So, all objects reach the ground at the same time.
function GET_GRAVITY_FORCE(mover) {
    return FROM_PIXELS_TO_SEC(createVector(0, 9.8)).mult(mover.mass);
}

class Surface {
    constructor () {

    }

    hasColided(mover) {
        return false;
    }

    getFrictionForce(mover) {
        return createVector(0, 0);
    }
}

class Ground extends Surface {
    hasColided(mover) {
        if (mover.position.y > height - mover.getRadius()) {
            return true;
        }

        return false;
    }

    getFrictionForce(mover) {
        // If velocity is zero or very small, no friction force
        if (mover.velocity.mag() < 0.01) {
            return createVector(0, 0);
        }
        
        const direction = mover.velocity.copy().normalize().mult(-1);
        const coef = 0.5;
        const normalForce = GET_GRAVITY_FORCE(mover).y;
        const magnitude = normalForce * coef;
        return direction.mult(magnitude);
    }
}

let movers = [];
let surfaces = [];

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height

    movers[0] = new Mover(createVector(width/2, 100));
    movers[0].mass = 1;

    movers[1] = new Mover(createVector(100, 100));
    movers[1].mass = 0.5;

    surfaces[0] = new Ground();
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    for (const mover of movers) {
        mover.addForce(GET_GRAVITY_FORCE(mover));
        mover.handleEdges();

        for (const surface of surfaces) {
            if (surface.hasColided(mover)) {
                mover.addForce(surface.getFrictionForce(mover));
            }
        }

        mover.update();
        mover.render();
    }
}

function mousePressed() {
    // add wind force
    const forceX = mouseX - width/2;

    for (const mover of movers) {
        mover.addForce(FROM_PIXELS_TO_SEC(createVector(forceX, 0)));
    }    
}