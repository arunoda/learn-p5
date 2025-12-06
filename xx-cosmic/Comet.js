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

        const toTarget = p5.Vector.sub(this.target, this.position);
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
        
        // Update size based on distance from first target
        this.updateSize();
    
        fill(255);
        circle(this.position.x, this.position.y, this.size * 2);
    }
    
    updateSize() {
        const distanceFromFirstTarget = calc_distance(this.position, firstTargetPosition);
        // Normalize distance (0 = at first target, 1 = at max distance)
        const normalizedDistance = min(distanceFromFirstTarget / COMET_SIZE_CONFIG.maxDistance, 1);
        // Size is larger when closer to first target (inverse relationship)
        this.size = lerp(COMET_SIZE_CONFIG.maxSize, COMET_SIZE_CONFIG.minSize, normalizedDistance);
    }
}

