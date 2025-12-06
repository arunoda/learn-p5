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
        // City skyline silhouettes along the visible horizon,
        // aligned with the curvature of the Earth.
        this.renderBuildings();

        // Draw Earth on top so the skyline appears to emerge from it,
        // removing any visible gap between buildings and the surface.
        fill(230);
        noStroke();
        circle(this.position.x, this.position.y, this.radius * 2);
    }

    renderBuildings() {
        push();
        translate(this.position.x, this.position.y);

        const r = this.radius;
        const buildingCount = 24;
        // Slightly inside the circle so the base is covered by the Earth silhouette.
        const buildingRadius = r * 0.97;

        // Only draw buildings along the visible top arc of the circle
        const startAngle = PI + QUARTER_PI * 0.45;
        const endAngle = TWO_PI - QUARTER_PI * 0.45;

        rectMode(CORNER);
        noStroke();
        fill(200);

        for (let i = 0; i < buildingCount; i++) {
            const t = buildingCount === 1 ? 0.5 : i / (buildingCount - 1);
            const a = lerp(startAngle, endAngle, t);

            const x = cos(a) * buildingRadius;
            const y = sin(a) * buildingRadius;

            push();
            translate(x, y);

            // Rotate so buildings point outward, following the Earth's curvature.
            // Local -Y axis is aligned along the radial "away from center" direction.
            rotate(a + HALF_PI);

            const baseWidth = r * 0.035;
            const baseHeight = r * 0.13;

            // Deterministic variation for a more organic skyline
            const heightScale = 0.7 + 0.3 * sin(i * 0.9);
            const widthScale = 0.8 + 0.4 * cos(i * 0.7);

            const w = baseWidth * widthScale;
            const h = baseHeight * heightScale;

            // Base of each building sits on the circle edge and extends upward
            rect(-w / 2, -h, w, h, 1);

            pop();
        }

        pop();
    }
}

