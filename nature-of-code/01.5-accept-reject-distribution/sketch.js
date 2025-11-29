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

// This is called as the "Monte Carlo" distribution as
// it will likely to pick a higher value mostly.
function draw() {

    const randomClass = floor(getAcceptReject() * classCount);
    classes[randomClass] += 3;

    const barWidth = (width - 2)/classCount;
    for (let i = 0; i < classCount; i++) {
        stroke(30)
        fill(100)
        const barHeight = classes[i];
        rect(1 + i * barWidth, height-barHeight, barWidth, barHeight);
    }
}

function getAcceptReject() {
    while(true) {
        // these are uniform random generators
        const r1 = random(1);
        const r2 = random(1);
        // if the r1 is higher, there's a more chance that r2 will be lower than it, it will be accepeted
        // if the r1 is lower, there's a higher chance r2 will be higher, it will be rejected
        if (r1 >= r2) {
            return r1;
        }
    }
}