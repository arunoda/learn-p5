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

// Stage configuration (in seconds)
const STAGE_CONFIG = {
    delayBeforeAppear: 5,      // Time before comet appears
    timeToFirstTarget: 10,      // Time to reach first target (close to earth)
    stayAtFirstTarget: 3,      // Time to stay at first target
    timeToSecondTarget: 10      // Time to reach second target (away from earth)
};

let currentStage = 0; // 0: waiting, 1: moving to first, 2: staying, 3: moving to second
let stageStartFrame = 0;
let firstTargetPosition;
let secondTargetPosition;

function SECONDS_TO_FRAMES(seconds) {
    const fps = 60;
    return seconds * fps;
}

function FRAMES_TO_SECONDS(frames) {
    const fps = 60;
    return frames / fps;
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
    comet.show(false); // Start hidden

    // First target: close to earth (current target)
    firstTargetPosition = createVector(width/2, height/2);
    
    // Second target: away from earth (top-left area)
    secondTargetPosition = createVector(width * 0.7, height * 0.4);

    currentStage = 0;
    stageStartFrame = frameCount;
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    updateStages();
    
    renderEarth();
    comet.update();
    renderCountdown();

    if (keyIsDown("h") || keyIsDown("H")) {
        comet.show(false);
    }
}

function updateStages() {
    const elapsedFrames = frameCount - stageStartFrame;
    
    if (currentStage === 0) {
        // Stage 0: Waiting for comet to appear
        comet.show(false);
        if (elapsedFrames >= SECONDS_TO_FRAMES(STAGE_CONFIG.delayBeforeAppear)) {
            // Start moving to first target
            currentStage = 1;
            stageStartFrame = frameCount;
            comet.show(true);
            const speed = calc_distance(firstTargetPosition, comet.position) / SECONDS_TO_FRAMES(STAGE_CONFIG.timeToFirstTarget);
            comet.setTarget(firstTargetPosition, speed);
        }
    } else if (currentStage === 1) {
        // Stage 1: Moving to first target
        const distance = calc_distance(comet.position, firstTargetPosition);
        if (distance < 1) {
            // Reached first target, start staying
            currentStage = 2;
            stageStartFrame = frameCount;
            comet.setTarget(firstTargetPosition, 0); // Stop moving
        }
    } else if (currentStage === 2) {
        // Stage 2: Staying at first target
        if (elapsedFrames >= SECONDS_TO_FRAMES(STAGE_CONFIG.stayAtFirstTarget)) {
            // Start moving to second target
            currentStage = 3;
            stageStartFrame = frameCount;
            const speed = calc_distance(secondTargetPosition, comet.position) / SECONDS_TO_FRAMES(STAGE_CONFIG.timeToSecondTarget);
            comet.setTarget(secondTargetPosition, speed);
        }
    } else if (currentStage === 3) {
        // Stage 3: Moving to second target
        // Just keep moving, no transition needed
    }
}

function getStageProgress() {
    const elapsedFrames = frameCount - stageStartFrame;
    let progress = 0;
    
    if (currentStage === 0) {
        progress = elapsedFrames / SECONDS_TO_FRAMES(STAGE_CONFIG.delayBeforeAppear);
    } else if (currentStage === 1) {
        // Progress based on distance traveled
        const totalDistance = calc_distance(comet.startPosition, firstTargetPosition);
        const remainingDistance = calc_distance(comet.position, firstTargetPosition);
        if (totalDistance > 0) {
            progress = 1 - (remainingDistance / totalDistance);
        }
    } else if (currentStage === 2) {
        progress = elapsedFrames / SECONDS_TO_FRAMES(STAGE_CONFIG.stayAtFirstTarget);
    } else if (currentStage === 3) {
        // Progress based on distance traveled
        const totalDistance = calc_distance(comet.startPosition, secondTargetPosition);
        const remainingDistance = calc_distance(comet.position, secondTargetPosition);
        if (totalDistance > 0) {
            progress = 1 - (remainingDistance / totalDistance);
        }
    }
    
    return constrain(progress, 0, 1);
}

function renderCountdown() {
    const elapsedFrames = frameCount - stageStartFrame;
    let timeRemaining = 0;
    let stageName = "";
    
    if (currentStage === 0) {
        timeRemaining = STAGE_CONFIG.delayBeforeAppear - FRAMES_TO_SECONDS(elapsedFrames);
        stageName = "Comet appearing in";
    } else if (currentStage === 1) {
        const distance = calc_distance(comet.position, firstTargetPosition);
        const speed = comet.speed;
        if (speed > 0) {
            timeRemaining = distance / speed / 60; // Convert frames to seconds
        }
        stageName = "Moving towards Earth";
    } else if (currentStage === 2) {
        timeRemaining = STAGE_CONFIG.stayAtFirstTarget - FRAMES_TO_SECONDS(elapsedFrames);
        stageName = "Hovering around Earth";
    } else if (currentStage === 3) {
        const distance = calc_distance(comet.position, secondTargetPosition);
        const speed = comet.speed;
        if (speed > 0) {
            timeRemaining = distance / speed / 60; // Convert frames to seconds
        }
        stageName = "Moving away";
    }
    
    // Display countdown at bottom
    fill(100);
    textAlign(CENTER);
    textSize(16);
    const countdownText = `${stageName}: ${max(0, timeRemaining).toFixed(1)}s`;
    text(countdownText, width / 2, height - 50);
    
    // Render progress bar
    renderProgressBar();
}

function renderProgressBar() {
    const progress = getStageProgress();
    const barWidth = width * 0.6;
    const barHeight = 8;
    const barX = (width - barWidth) / 2;
    const barY = height - 30;
    
    // Background bar
    fill(50);
    noStroke();
    rect(barX, barY, barWidth, barHeight, 4);
    
    // Progress bar
    fill(150, 200, 255);
    rect(barX, barY, barWidth * progress, barHeight, 4);
    
    // Border
    noFill();
    stroke(100);
    strokeWeight(1);
    rect(barX, barY, barWidth, barHeight, 4);
}

function renderEarth() {
    fill(230);
    circle(earthPosition.x, earthPosition.y, earthRadius*2)
}