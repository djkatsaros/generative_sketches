
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
    if ( frameCount == 1) {
        setup()
        random_x = 55;
        lightning_bolt(0.5 * W + random(-random_x, random_x), 0.05 * W );
        lightning_bolt(1.5 * W + random(-random_x, random_x), 0.05 * W );
        lightning_bolt(2.5 * W +random(-random_x, random_x), 0.05 * W );
    } //else {
      //  clear()
      //  setup()
    //}
    }
function lightning_bolt(rootx, depth) {
    //if (frameCount < 2) {
    for (i=0; i<100; i++) {
        if (i < 80) {
            var wt = (-0.125*i + 25);
        } else {
            var wt = ( -(21/20) * i + 109);
        }

        yscale = 40;
        xscale = 40;
        const bolts = [];
        const last = [rootx, 0];
        const next = [rootx + random(-50,50), depth + random(-10, 10)];
        bolts.push([last[0], last[1]]); //need to use values to avoid reference updating issues
        strokeWeight(wt);
        // light intensity is inversely proportional to distance.
        stroke(bright / (1 + (wt - 4)**(1.000000000000001)));    
        line(last[0], last[1], next[0], next[1] );
        for (var idx=0; idx < num_bolts; idx++) {
            last[0] = next[0];
            last[1] = next[1];
            next[0] += xscale*random(-1,1);
            next[1] += yscale*random( 0,1) + random(-10 ,0);
            bolts.push([last[0], last[1]]);
    //            strokeWeight(6)
    //            stroke(bright/5);
    //            line(last[0], last[1], next[0], next[1] );
            stroke(bright / (1 + (wt - 4)**(1.000000000000001)));
            strokeWeight(wt);
            line(last[0], last[1], next[0], next[1] );
        }
    }

    for (var jdx = 0; jdx < bolts.length; jdx += 1) {
        if (random(0,1) < chance_bolt) {
       bolt(100, bolts[jdx], random(30,210), random(num_bolts - fewer_bolts, num_bolts - fewer_bolts + 3), 50, 100);                     
        }
    }
    //}

}

function bolt(noisy, start, stroke_, num_bs, xscaling, yscaling) {
    strokeWeight(random(0,2));
    stroke(stroke_);
    var noi = noisy * noise(-1,1);
    var r1 = random(-1,1);
    var r2 = random(0,1);
    small_bolts = [[start[0], start[1]]];
    const end = [start[0] + xscaling * random(-1,1), start[1] + random(50, yscaling) * random(0,1)];
    line(start[0], start[1], end[0], end[1]);  
    for (var jdx=0; jdx<num_bs; jdx++) {
        start[0] = end[0];
        start[1] = end[1];
        small_bolts.push([start[0], start[1]]);
        end[0] += random(-xscaling, xscaling);
        end[1] += random(0, yscaling) * random(0,1) + noise(-10 ,0);
        line(start[0], start[1], end[0], end[1] );
    }

    for (var kdx=0; kdx < small_bolts.length; kdx += 2) {
        if (random(0, 1) < chance_small) {
        small_bolt(200, small_bolts[kdx], random(stroke_-10, stroke_), random(num_bolts-far_fewer, num_bolts - far_fewer + 3),  30, 50);
        }
    }
}

function small_bolt(noisy_, start_, stroke__, num_bes, xscale, yscale) {
    strokeWeight(random(0,1));
    stroke(stroke__);
    var noi = noisy_ * noise(-1,1);
    var r1 = random(-1,1);
    var r2 = random(0,1);
    const end_ = [start_[0] + random(xscale, yscale) * random(-1,1), start_[1] + random(xscale, yscale) * random(0,1)];
    line(start_[0], start_[1], end_[0], end_[1]);  
    for (var jdx=0; jdx<num_bes; jdx++) {
        start_[0] = end_[0];
        start_[1] = end_[1];
        end_[0] += random(-xscale, xscale);
        end_[1] += random(0, yscale) * random(0,1) + noise(-1 ,0);
        line(start_[0], start_[1], end_[0], end_[1] );
    }   
}
