let earth;
let comet;
let loadingScreen;
let configUI;

// Stage configuration (in seconds)
let STAGE_CONFIG = {
    delayBeforeAppear: 1,      // Time before comet appears
    timeToFirstTarget: 4,      // Time to reach first target (close to earth)
    stayAtFirstTarget: 5,      // Time to stay at first target
    timeToSecondTarget: 1      // Time to reach second target (away from earth)
};

let currentStage = 0; // 0: waiting, 1: moving to first, 2: staying, 3: moving to second
let stageStartFrame = 0;
let firstTargetPosition;
let secondTargetPosition;

// Comet size configuration
const COMET_SIZE_CONFIG = {
    minSize: 1,        // Minimum size when far from first target
    maxSize: 20,       // Maximum size when at first target
    maxDistance: null  // Will be calculated based on canvas diagonal
};

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

    // Calculate max distance based on canvas diagonal
    COMET_SIZE_CONFIG.maxDistance = sqrt(width * width + height * height);

    earth = new Earth();
    loadingScreen = new LoadingScreen();

    // Comet starts at top-left corner (relative position)
    comet = new Comet(createVector(width * 0.05, height * 0.05), 10);
    comet.show(false); // Start hidden

    // First target: close to earth (center of screen)
    firstTargetPosition = createVector(width/2, height/2);
    
    // Second target: away from earth (top-right area)
    secondTargetPosition = createVector(width * 0.7, height * 0.3);

    currentStage = 0;
    stageStartFrame = frameCount;

    // Initialize config UI
    configUI = new ConfigUI(STAGE_CONFIG, resetAnimation, startFromStage);
    configUI.init();
}

function resetAnimation() {
    // Reset comet to initial position
    const initialPos = createVector(width * 0.05, height * 0.05);
    comet.position = initialPos;
    comet.startPosition = initialPos;
    comet.target = initialPos;
    comet.speed = 0;
    comet.totalDistance = 0;
    comet.trail = [];
    comet.show(false);
    
    // Reset stage
    currentStage = 0;
    stageStartFrame = frameCount;
}

function startFromStage(stage) {
    const initialPos = createVector(width * 0.05, height * 0.05);
    
    if (stage === 0) {
        // Stage 0: Waiting for comet to appear
        comet.position = initialPos;
        comet.startPosition = initialPos;
        comet.target = initialPos;
        comet.speed = 0;
        comet.totalDistance = 0;
        comet.trail = [];
        comet.show(false);
        currentStage = 0;
        stageStartFrame = frameCount;
    } else if (stage === 1) {
        // Stage 1: Moving to first target
        comet.position = initialPos;
        comet.startPosition = initialPos;
        comet.show(true);
        const speed = calc_distance(firstTargetPosition, comet.position) / SECONDS_TO_FRAMES(STAGE_CONFIG.timeToFirstTarget);
        comet.setTarget(firstTargetPosition, speed);
        currentStage = 1;
        stageStartFrame = frameCount;
    } else if (stage === 2) {
        // Stage 2: Staying at first target
        comet.position = createVector(firstTargetPosition.x, firstTargetPosition.y);
        comet.startPosition = firstTargetPosition;
        comet.target = firstTargetPosition;
        comet.speed = 0;
        comet.totalDistance = 0;
        comet.trail = [];
        comet.show(true);
        currentStage = 2;
        stageStartFrame = frameCount;
    } else if (stage === 3) {
        // Stage 3: Moving to second target
        comet.position = createVector(firstTargetPosition.x, firstTargetPosition.y);
        comet.startPosition = firstTargetPosition;
        comet.show(true);
        const speed = calc_distance(secondTargetPosition, comet.position) / SECONDS_TO_FRAMES(STAGE_CONFIG.timeToSecondTarget);
        comet.setTarget(secondTargetPosition, speed);
        currentStage = 3;
        stageStartFrame = frameCount;
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    
    // Recalculate max distance
    COMET_SIZE_CONFIG.maxDistance = sqrt(width * width + height * height);
    
    // Update Earth position
    earth.updatePosition();
    
    // Update target positions
    firstTargetPosition = createVector(width/2, height/2);
    secondTargetPosition = createVector(width * 0.7, height * 0.3);
    
    // Update config panel position
    if (configUI) {
        configUI.updatePanelPosition();
    }
}

function draw() {
    // Runs every frame (default ~60 fps)
    background(30);

    updateStages();
    
    earth.render();
    comet.update();
    loadingScreen.render(currentStage, stageStartFrame, comet, firstTargetPosition, secondTargetPosition, STAGE_CONFIG);

    // Render config UI
    if (configUI) {
        configUI.render();
    }

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