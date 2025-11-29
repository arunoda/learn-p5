const classes = [];
const classCount = 30;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height

    background(30);

    for (let i = 0; i < classCount; i++) {
        classes[i] = 0;
    }
}

// fill classes using a normal distribution
function draw() {
    // we choose mean from the classCount
    const mean = classCount/2;
    // 65%      will be around the 1*standardDeviation from mean
    // 95%      will be around the 2*standardDeviation from mean
    // 99.7%    will be around the 3*standardDeviation from mean
    const spread = 0.3;
    const standardDeviation = mean * spread;
    const randomClass = floor((randomGaussian() * standardDeviation) + mean);
    classes[randomClass] += 1;

    const barWidth = (width - 2)/classCount;
    for (let i = 0; i < classCount; i++) {
        stroke(30)
        fill(100)
        const barHeight = classes[i];
        rect(1 + i * barWidth, height-barHeight, barWidth, barHeight);
    }
}