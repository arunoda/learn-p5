class Mover {
  constructor(initialPosition, initialVelocity = createVector(0, 0)) {
      this.position = createVector(initialPosition.x, initialPosition.y);
      this.velocity = FROM_PIXELS_TO_SEC(initialVelocity);
      this.mass = 1;

      this.nextForce = createVector(0, 0);
      this.nextPosition = this.position.copy();
  }

  addForce(force) {
      this.nextForce.add(force);
  }

  update() {
      // f = ma => a = f/m
      const acceleration = p5.Vector.div(this.nextForce, this.mass);
      this.nextForce = createVector(0, 0);

      this.velocity.add(acceleration);
      
      this.position = this.nextPosition;
      this.position.add(this.velocity);
  }

  handleEdges() {
      //check edges
      const radius = this.getRadius();
      this.nextPosition = this.position.copy();

      if (this.position.y > height - radius) {
          this.nextPosition.y = height - radius;
          this.velocity.y *= -0.9;
      } else if (this.position.y < radius) {
          this.nextPosition.y = radius;
          this.velocity.y *= -0.9;
      }
      
      if (this.position.x > width - radius) {
          this.nextPosition.x = width - radius;
          this.velocity.x *= -0.9;
      } else if (this.position.x < radius) {
          this.nextPosition.x = radius;
          this.velocity.x *= -0.9;
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