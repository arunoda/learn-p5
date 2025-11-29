const classes = [];
const classCount = 20;

function setup() {
    // Runs once
    createCanvas(600, 400); // width, height

    background(30);

    for (let i = 0; i < classCount; i++) {
        classes[i] = 0;
    }
}

function draw() {
    // fill classes randomly
    const randomClass = floor(random(classCount));
    classes[randomClass] += 1;

    const barWidth = (width - 2)/classCount;
    for (let i = 0; i < classCount; i++) {
        stroke(30)
        fill(100)
        const barHeight = classes[i];
        rect(1 + i * barWidth, height-barHeight, barWidth, barHeight);
    }
}