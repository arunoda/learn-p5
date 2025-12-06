class Earth {
    constructor() {
        this.updatePosition();
    }

    updatePosition() {
        // Radius scales more aggressively with width
        // Using a larger multiplier so Earth gets bigger as width increases
        this.radius = width * 0.8;
        // Visible height is 15% of height (only top portion of circle visible)
        const visibleHeight = height * 0.25;
        // Position circle center so that the top arc of the circle is visible
        // The visible portion goes from (height - visibleHeight) to height
        // Circle center y = height - visibleHeight + radius
        // This positions the circle so only the top portion is visible
        this.position = createVector(width/2, height - visibleHeight + this.radius);
    }

    render() {
        fill(230);
        circle(this.position.x, this.position.y, this.radius * 2);
    }
}

