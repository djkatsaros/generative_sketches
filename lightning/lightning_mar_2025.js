
var bright = 500;
var W = 500;
var num_bolts = 49;
var fewer_bolts = 40;
var far_fewer = 27;
var chance_bolt = 0.25;
var chance_small = 0.35;
function setup() {
  createCanvas(3.0*W, 2.5 * W);
  background(0)
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
    yscale = 40;
    xscale = 40;
    strokeWeight(4);
    stroke(bright);
    const bolts = [];
    const last = [rootx, 0];
    const next = [rootx + random(-50,50), depth + random(-10, 10)];
    bolts.push([last[0], last[1]]); //need to use values to avoid reference updating issues
    line(last[0], last[1], next[0], next[1] );
    for (var idx=0; idx < num_bolts; idx++) {
        last[0] = next[0];
        last[1] = next[1];
        next[0] += xscale*random(-1,1);
        next[1] += yscale*random( 0,1.01) + random(-10 ,0);
        bolts.push([last[0], last[1]]);
//            strokeWeight(6)
//            stroke(bright/5);
//            line(last[0], last[1], next[0], next[1] );
    }

    //for (var jdx = 0; jdx < bolts.length; jdx += 1) {
      //  if (random(0,1) < chance_bolt) {
        //    bolt(100, bolts[jdx], random(70,310), random(num_bolts - fewer_bolts, num_bolts - fewer_bolts + 3), 30, 80);
     //   }
   // }

    for (var i=0; i<100; i++) {
        //if (i < 80) {
        //    var wt = (-(1/15)*i + 25);
        //} else {
        //    var wt = ( -(8/15) * i + 172/3);
        //}

        // smooth interpolating function  
        wt = 20 * ( 1 - i/100)**(2.0**(-0.9))
        strokeWeight(wt);
        // light intensity is inversely proportional to distance.
        stroke(bright / (1 + (wt - 4)**(0.91)));
        for (var ldx = 0; ldx < bolts.length - 1; ldx++) { 
            line(bolts[ldx][0], bolts[ldx][1], bolts[ldx + 1][0], bolts[ldx + 1][1] );
        }
    } 

    for (var jdx = 0; jdx < bolts.length; jdx += 1) {
        if (random(0,1) < chance_bolt) {
            bolt(bolts[bolts.length - 1][1], 100, bolts[jdx], random(70,310), random(num_bolts - fewer_bolts, num_bolts - fewer_bolts + 3), 30, 80);                     
        }
    }
    //}

}

function bolt(endy, noisy, start, stroke_, num_bs, xscaling, yscaling) {
    start__ = start[0];
    start_wt = random(0,2.03);
    strokeWeight(start_wt);
    stroke_wt = 90 + 100 * start_wt;
    stroke(stroke_wt);
    small_bolts = [[start[0], start[1]]];
    const end = [start[0] + xscaling * random(-1,1), start[1] + random(50, yscaling) * random(0,1)];
    line(start[0], start[1], end[0], end[1]);  
    for (var jdx=0; jdx<num_bs; jdx++) {
        start[0] = end[0];
        start[1] = end[1];
        small_bolts.push([start[0], start[1]]);
        //  conditional so bolts generally trend right or left only.
        if (end[0] >= start__) {
            end[0] += random(-xscaling / 12, xscaling);
        //line(start[0], start[1], end[0], end[1] );
        } else {
            end[0] += random(-xscaling, xscaling / 12)
        }
        end[1] += random(0, yscaling) * random(-0.25,1) + noise(-10 ,0);
    }

    M = 50;

    for (var j = 0; j<M; j++) {

        wt = 3 * start_wt * ( 1 - j/M)**(2.0**(-0.9))
        strokeWeight(wt);
        // light intensity is inversely proportional to distance.
        stroke( stroke_wt / (1 + (wt - start_wt)**(0.71)));
        for (var kdx = 0; kdx < small_bolts.length - 1; kdx++) { 
            if (small_bolts[kdx + 1][1] <= endy) { 
            line(small_bolts[kdx][0], small_bolts[kdx][1], small_bolts[kdx + 1][0], small_bolts[kdx + 1][1]);
            }
        }
    }

    //for (var kdx=0; kdx < small_bolts.length; kdx += 2) {
    //    if (random(0, 1) < chance_small) {
    //    small_bolt(200, small_bolts[kdx], random(stroke_-10, stroke_), random(num_bolts-far_fewer, num_bolts - far_fewer + 3),  30, 50);
    //    }
    //}
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
