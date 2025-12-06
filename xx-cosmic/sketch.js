let earth;
let comet;
let loadingScreen;

// Stage configuration (in seconds)
const STAGE_CONFIG = {
    delayBeforeAppear: 1,      // Time before comet appears
    timeToFirstTarget: 1,      // Time to reach first target (close to earth)
    stayAtFirstTarget: 1,      // Time to stay at first target
    timeToSecondTarget: 1      // Time to reach second target (away from earth)
};

let currentStage = 0; // 0: waiting, 1: moving to first, 2: staying, 3: moving to second
let stageStartFrame = 0;
let firstTargetPosition;
let secondTargetPosition;

// Comet size configuration
const COMET_SIZE_CONFIG = {
    minSize: null,     // Will be calculated based on screen size
    maxSize: null,     // Will be calculated based on screen size
    maxDistance: null  // Will be calculated based on canvas diagonal
};

function updateCometSizeConfig() {
    // Calculate sizes relative to screen dimensions
    // Use average of width and height for balanced scaling
    const avgDimension = (width + height) / 2;
    COMET_SIZE_CONFIG.minSize = avgDimension * 0.005;  // 0.5% of average dimension
    COMET_SIZE_CONFIG.maxSize = avgDimension * 0.03;    // 3% of average dimension
    COMET_SIZE_CONFIG.maxDistance = sqrt(width * width + height * height);
}

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
    // Runs once - use full window size
    createCanvas(windowWidth, windowHeight);

    // Calculate comet size configuration based on screen dimensions
    updateCometSizeConfig();

    earth = new Earth();
    loadingScreen = new LoadingScreen();

    // Comet starts at top-left corner (relative position)
    // Initial size is based on screen dimensions
    const initialSize = (width + height) / 2 * 0.01; // 1% of average dimension
    comet = new Comet(createVector(width * 0.05, height * 0.05), initialSize);
    comet.show(false); // Start hidden

    // First target: close to earth (center of screen)
    firstTargetPosition = createVector(width/2, height/2);
    
    // Second target: away from earth (top-right area)
    secondTargetPosition = createVector(width * 0.7, height * 0.3);

    currentStage = 0;
    stageStartFrame = frameCount;
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    
    // Recalculate comet size configuration
    updateCometSizeConfig();
    
    // Update Earth position
    earth.updatePosition();
    
    // Update target positions
    firstTargetPosition = createVector(width/2, height/2);
    secondTargetPosition = createVector(width * 0.7, height * 0.3);
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    updateStages();
    
    earth.render();
    comet.update();
    loadingScreen.render(currentStage, stageStartFrame, comet, firstTargetPosition, secondTargetPosition, STAGE_CONFIG);

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
