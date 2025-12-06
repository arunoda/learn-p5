let earth;
let comet;
let loadingScreen;

// Stage configuration (in seconds)
const STAGE_CONFIG = {
    delayBeforeAppear: 5,      // Time before comet appears
    timeToFirstTarget: 10,      // Time to reach first target (close to earth)
    stayAtFirstTarget: 5,      // Time to stay at first target
    timeToSecondTarget: 10      // Time to reach second target (away from earth)
};

let currentStage = 0; // 0: waiting, 1: moving to first, 2: staying, 3: moving to second
let stageStartFrame = 0;
let firstTargetPosition;
let secondTargetPosition;

// Comet size configuration
const COMET_SIZE_CONFIG = {
    minSize: 1,        // Minimum size when far from first target
    maxSize: 20,       // Maximum size when at first target
    maxDistance: 600   // Maximum distance for size calculation (canvas diagonal)
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
    // Runs once
    createCanvas(600, 400); // width, height

    earth = new Earth(350);
    loadingScreen = new LoadingScreen();

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
