var bright = 500;
var W = 500;
var num_bolts = 29;
var fewer_bolts = 25;
var far_fewer = 27;
var chance_bolt = 0.55;
var chance_small = 0.35;

function setup() {
  createCanvas(3.0*W, 2.5 * W);
  background(25)
  noStroke();
  frameRate(1.0);
  lineWidth = 5;
}

function draw() {
    if (frameCount == 1) {
        r = random(-20,20);
  
        for (i=0; i<100; i++) {
            if (i < 80) {
                var wt = (-0.125*i + 25);
            } else {
                var wt = ( -(21/20) * i + 109);
            }
            strokeWeight(wt);
            // light intensity is inversely proportional to distance.
            stroke(bright / (1 + (wt - 4)**(1.000000000000001)));
            line(1.5 * W , 0, 1.5 * W , 50 );
        }
    }

    stroke(200);
    line(20, 0, 20, 50);

    stroke(300);
    line(40, 0, 40, 50);

    stroke(400);
    line(60, 0, 60, 50);

    stroke(500);
    line(80,0, 80, 50);

    stroke(600);
    line(100, 0, 100, 50);
}
