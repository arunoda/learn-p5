class LoadingScreen {
    constructor() {
        // This class will access global variables from sketch.js
    }

    getStageProgress(currentStage, stageStartFrame, comet, firstTargetPosition, secondTargetPosition, STAGE_CONFIG) {
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

    render(currentStage, stageStartFrame, comet, firstTargetPosition, secondTargetPosition, STAGE_CONFIG) {
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
        const progress = this.getStageProgress(currentStage, stageStartFrame, comet, firstTargetPosition, secondTargetPosition, STAGE_CONFIG);
        this.renderProgressBar(progress);
    }

    renderProgressBar(progress) {
        const barWidth = width * 0.6;
        const barHeight = 8;
        const barX = (width - barWidth) / 2;
        const barY = height - 30;
        
        // Background bar
        fill(50);
        noStroke();
        rect(barX, barY, barWidth, barHeight, 4);
        
        // Progress bar
        fill(200);
        rect(barX, barY, barWidth * progress, barHeight, 4);
        
        // Border
        noFill();
        stroke(150);
        strokeWeight(1);
        rect(barX, barY, barWidth, barHeight, 4);
    }
}

