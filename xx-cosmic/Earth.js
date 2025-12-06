class Earth {
    constructor(radius) {
        this.radius = radius;
        this.position = createVector(width/2, height + radius/1.6);
    }

    render() {
        fill(230);
        circle(this.position.x, this.position.y, this.radius * 2);
    }
}

