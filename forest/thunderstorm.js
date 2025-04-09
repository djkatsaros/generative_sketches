// tree parameters
let num_branches = 3;
let num_small_branches = 2;
let num_tiny_branches = 2;
let num_roots = 2;

// lightning parameters
var bright = 500;
var W = 550;
var num_bolts = 42;
var fewer_bolts = 33;
var far_fewer = 27;
var chance_bolt = 0.25;
var chance_small = 0.35;

function setup() {
  createCanvas(3.10*W, 1.60 * W);
  background(0)
  noStroke();
  frameRate(1.0);
  lineWidth = 5;
}

function dist__(p1x, p1y, p2x, p2y) {

    var d = ((p1x - p2x)**2 + (p1y - p2y)**2)**(1/2);
    return d
}

function draw() {
    if ( frameCount  == 1) {
        setup()
        random_x = 55;
        const bolt_tails = [];
        b1 = lightning_bolt(0.5 * W + random(-random_x, random_x), 0.05 * W );
        b2 = lightning_bolt(1.5 * W + random(-random_x, random_x), 0.05 * W );
        b3 = lightning_bolt(2.5 * W + random(-random_x, random_x), 0.05 * W );
        bolt_tails.push([b1[0], b1[1]]);
        bolt_tails.push(b2);
        bolt_tails.push(b3);

        translate(0, height);
        scale(1, -1);
        var tx = 0;
        var ty = 0;
        for (var lol = 0; lol < 13; lol ++) {
            //tree(0, 0, 0, 0);
            //tree(300 + random(-10, 10), 0, 0, 0);
            tx = lol * 120 + random(-20, 20);
            ty = random(10, 50);
            var tail = []
            for (var bdx = 0; bdx < bolt_tails.length; bdx++) {
                tail = [bolt_tails[bdx][0], bolt_tails[bdx][1]];   
                if (dist__(tx, ty+250, tail[0], tail[1]) < 50) {
                    tree(tx, ty, 0, 3);
                } 
            }

            tree(tx, ty, 0, 0);
        }

    } //else {
        //clear()
       // setup()
   // }
    }

function lightning_bolt(rootx, depth) {
    //if (frameCount < 2) {
    yscale = 33;
    xscale = 33;
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

    return bolts[bolts.length-1];
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

function tree(base, basey, sun, burst) {

  noFill();
  strokeWeight(1 + burst);
  stroke(500);
  // curve(x1, y1, 63, 24, 73, 161, 35, 65);
  let x1 = 5 + base;
  let y1 = 36 + basey;
  let p1x = 103  + base;
  let p1y = 24 + basey;
  let p2x = 43 + base;
  let p2y = 161 + basey;
  let p3x = 65 + base;
  let p3y = 24 + basey;

  for (var idx=0; idx < num_branches ; idx++) {
    strokeWeight(random(1, 1.5));
    stroke(500);

    // CentertTrunks
    var shifty = 0;
    var x_base = 105 + random(-5 ,5 );
    var ttax = x_base + random(-50, 50) + shifty + base;
    var ttay = y1 + basey;
    var ttbx = x_base + shifty + base;
    var ttby = 20 + basey;
    var ttcx = x_base + shifty + base;
    var ttcy = 220 + random(0, 20) + basey;
    var ttdx = random(-20,20) + x_base + shifty + base;
    var ttdy = random(200, 220) + basey;
    curve(ttax, ttay, ttbx, ttby, ttcx, ttcy, ttdx, ttdy);

      // roots for center trunks. 
    rootx = curvePoint(ttax, ttbx, ttcx, ttdx, 0);
    rooty = curvePoint(ttay, ttby, ttcy, ttdy, 0);
    for (var lkdx = 0; lkdx < num_roots; lkdx++) {
        strokeWeight(random(0.6, 1.5));
        if (random(0, 1) < 0.50001) {
            curve(ttbx + random(50, 350), ttby + random(-10, 50),
                rootx, rooty,
                rootx - random(20, 55), rooty - random(5, 15),
                rootx - random(10, 200), rooty - random(-10, 55));
        } else {
            curve(ttbx - random(50, 350), ttby + random(-10, 50),
                rootx, rooty,
                rootx + random(20, 55), rooty - random(5, 15),
                rootx + random(10, 200), rooty - random(-10, 55));
        }
        // code some roots that point more straight down.
        curve(ttbx + random(-50, 50), ttby + random(-10, 50),
            ttbx, ttby,
            ttbx - random(-5, 5), ttby - random(5, 15),
            ttbx - random(-50, 50), ttby - random(15, 30));
    }

    //branches for center trunks
    for (var j = 0; j < 2; j ++ ) {
        strokeWeight(burst + random(1, 1.2));
        let r_3 = random(0.7, 0.95);

        tbax = random(60, 170) + base;
        tbay = 50 + basey;
        tbbx = curvePoint(ttax, ttbx, ttcx, ttdx, r_3);
        tbby = curvePoint(ttay, ttby, ttcy, ttdy, r_3);
        tbcx = random(60, 160) + base;
        tbcy = random(220, 280) + basey;
        tbdx = random(60, 170) + base;
        tbdy = random(220, 330) + basey;
        curve(tbax, tbay, tbbx, tbby, tbcx, tbcy, tbdx, tbdy);

        // duplicate roots 
        /*
         * for (var ikdx = 0; ikdx < num_roots; ikdx++) {
            strokeWeight(random(0.6, 1.5));
            if (random(0, 1) < 0.50001) {
                curve(tbx + random(50, 350), tby + random(-100, 110),
                    tbx, tby,
                    tbx - random(20, 55), tby - random(5, 15),
                    tbx - random(10, 200), tby - random(-10, 55));
            }
            else {
                 curve(tbx - random(50, 350), tby + random(-100, 110), 
                     tbx, tby,      
                    tbx + random(20, 55), tby - random(5, 15),
                    tbx + random(10, 200), tby - random(-10, 55));
            }
        } */

        // center trunk tiny branches
        for (var jjj = 0; jjj < 3; jjj ++) {
            strokeWeight(random(0.2,0.7) + burst); // tiny branch tiny stroke
            var tbbax = tbax ;
            var tbbay = tbay + 200;
            trss = random(0.3,0.7); // randomize interpolated start point
            var tbbbx = curvePoint(tbax, tbbx, tbcx, tbdx, trss);
            var tbbby = curvePoint(tbay, tbby, tbcy, tbdy, trss);
            if (random(0, 1) < 0.50001) {
                var tbbcx = tbcx + random(5,10);
                var tbbax = tbax - 20;
            } else {
                var tbbcx = tbcx - random(5 , 10);
                var tbbax = tbax + 20
            }
            var tbbcy = tbcy + 5;
            var tbbdx = tbbcx + random(10,20);
            var tbbdy = tbbcy + random(10, 20);
            curve(tbbax, tbbay, tbbbx, tbbby, tbbcx, tbbcy, tbbdx, tbbdy);
        }
    }

    // right leaning trunks
    strokeWeight(random(1, 1.5) + burst);
    var shift = 0;
    var diff = 10;
    r_1 = random(-5, 5)
    var tax = shift +200 + diff + base;
    var tay = y1 + basey;
    var tbx = shift + 100 + diff + base;
    var tby = 20 + basey;
    var tcx = r_1 + shift + 100 + diff + base;
    var tcy = 170 + random(0,10) + basey;
    var tdx = shift + random(100,150) + diff + base;
    var tdy = 100 + basey;
            //
    curve(tax, tay, tbx, tby, tcx, tcy, tdx, tdy);
    // roots for right leaning trunks
    for (var i_dx = 0; i_dx < num_roots; i_dx ++) {
        strokeWeight(random(0.6, 1.5));
        if (random(0, 1) < 0.50001) {
            curve(tbx + random(50, 350), tby + random(-150, 100),
                tbx, tby,
                tbx - random(20, 55), tby - random(5, 15),
                tbx - random(10, 200), tby - random(-10, 55));
        }
        else {
             curve(tbx -random(50, 350), tby + random ( -150, 110),
                 tbx, tby,
                tbx + random(20, 55), tby - random(5, 15),
                tbx + random(10, 200), tby - random(-10, 55));
        }
    }

    // branches for right leaning trunks
    for (var kd_x = 0; kd_x < 2; kd_x ++) {
        let r_2 = random(0.7, 0.85);
        strokeWeight(random(0.5, 0.9) + burst);
        var rtax = random(50,100) + base;
        var rtay = 50 + basey;
        var rtbx = curvePoint(tax, tbx, tcx, tdx, r_2);
        var rtby = curvePoint(tay, tby, tcy, tdy, r_2);
        var rtcx = random(120, 150) + base;
        var rtcy = random(190, 230) + basey;
        var rtdx = 80 +base;
        var rtdy = random(210, 220) + basey;
        curve(rtax, rtay, rtbx, rtby, rtcx, rtcy, rtdx, rtdy);

        // extra special branch
        if (kd_x == 1) {
            if (random(0, 1) < 0.43 ) {
                strokeWeight(random(0.5, 0.9) + burst);
                curve(base + random(50,100), 50 + basey,
                    curvePoint(tax, tbx, tcx, tdx, 1),
                    curvePoint(tay, tby, tcy, tdy, 1),
                    random(120, 180) + base,
                    random(250, 280) + basey,
                    80 + base, random(210, 220) + basey);
            }
        }
        // tiny branches for right trunk branches 
        for (var j5 = 0; j5 < num_tiny_branches; j5 ++) {
            r_rrrSW = random(0.2,0.7); // tiny strokeWeight
            strokeWeight(r_rrrSW);
            r_rrr = random(0.2, 0.7);
            cpx = curvePoint(rtax, rtbx, rtcx, rtdx, r_rrr);
            cpy = curvePoint(rtay, rtby, rtcy, rtdy, r_rrr);
            if (random(0,1) < 0.50001) {
                rsign = -1;
            } else {
                rsign = 1;
            }
            // notice we scale the displacement away from cpx by the strokeweight, 
            // as thinner branches should be shorter. 
            curve(cpx - 100, cpy - 10, cpx, cpy, cpx + 40 * r_rrrSW, cpy + 40 * r_rrrSW,
                cpx + 100, cpy + 100);
        }
    }

    // left leaning trunks
    strokeWeight(random(1, 1.5) + burst);
    var ltax = shift + base;
    var ltay = y1 + basey;
    var ltbx = shift + 100 + base;
    var ltby = 20 + basey;
    var ltcx = r_1 + shift + 100 + base;
    var ltcy = 170 + random(0, 10) + basey;
    var ltdx =  shift + random( 30 , 80) + base;
    var ltdy = 100 + basey;
    curve(ltax, ltay, ltbx, ltby, ltcx, ltcy, ltdx, ltdy);

    // left leaning trunk branches
    for (var j = 0; j < 2; j ++ ) {
        let r_3 = random(0.7, 0.85);
        strokeWeight(random(0.5, 0.9) + burst);
        var lltax = random(50, 100) + base;
        var lltay = 50 + basey;
        var lltbx = curvePoint(ltax, ltbx, ltcx, ltdx, r_3);
        var lltby = curvePoint(ltay, ltby, ltcy, ltdy, r_3);
        var lltcx = random(50, 100) + base;
        var lltcy = random(180, 230) + basey;
        var lltdx = 120 + base;
        var lltdy = random(220, 230) + basey;
        curve(lltax, lltay, lltbx, lltby, lltcx, lltcy, lltdx, lltdy);

        if (j == 1) {
            if (random(0, 1) < 0.4) {
                curve(random(50, 100) + base, 50 + basey,
                    curvePoint(ltax, ltbx, ltcx, ltdx, 1),
                    curvePoint(ltay, ltby, ltcy, ltdy, 1),
                    random(40, 130) + base,
                    random(210, 250) + basey,
                    50 + base, random(220, 230) + basey);
            }
        }

        // tiny branches
        for (var j4 = 0; j4 < 1; j4 ++) {
            rrrSW = random(0.2,0.7);
            strokeWeight(rrrSW);
            rrr = random(0.2, 0.7);
            if (random(0, 1) < 0.50001) {
                // length must be proportional to the interpolated point and 
                // code in that it is proportional to the strokweight as longer
                // branches should be thicker 
                cxpt = lltbx - random(5, 10) - 110 * rrrSW * rrr;
                axplus = -50;
                cypt = lltcy - random(12,17)
            } else {
                cxpt = lltbx - random(5,10) - 110 * rrrSW * rrr;
                axplus = - 50;
                cypt = lltcy + random(12, 17);
            }
            curve(lltax - 10 , lltay + 150,
                curvePoint(lltax, lltbx, lltcx, lltdx, rrr),
                curvePoint(lltay, lltby, lltcy, lltdy, rrr),
                cxpt, cypt,
                lltdx - 200, lltcy + 300)
        }
    }

    strokeWeight(random(0.9, 1.2) + burst);
    // Branches. not translated by base displacement because this translation is already present        // in x1,y1, p1x etc which these limbs are written in terms of 
    let noi = 15;
    // left deviating branches
    var lax = x1 + random(0, 15) ;
    var lay = y1;
    var lbx = p1x + random(-noi/3, noi);
    var lby = p1y;
    var lcx = 10 + p2x + random(-noi/3, noi);
    var lcy = p2y + random(-noi * 2/3, noi* 2/3) + 20;
    var ldx = -200 + p3x + random(-noi, noi);
    var ldy = p3y + random(-noi, noi);
    curve(lax, lay, lbx, lby, lcx, lcy, ldx, ldy);
    //roots
    for (var k__ = 0; k__ < num_roots; k__ ++) {
        strokeWeight(random(0.3, 1.5));
        if (random(0, 1) < 0.50001) {
            curve(lbx + random(50, 350), lby + random(-150, 110),
                lbx, lby,
                lbx - random(20, 85), lby - random(5, 15),
                lbx - random(10, 200), lby - random(-10, 55));
        }
        else {
             curve(lbx - random(50, 350), lby + random(-150, 110),
                 lbx, lby,
                lbx + random(20, 85), lby - random(5, 15),
                lbx + random(10, 200), lby - random(-10, 55));
        }
    }

    // small branches
    for (var kdx = 0; kdx < num_small_branches; kdx ++) {
        let r2 = random(0.4, 0.75);
        let rswL =random(0.5, 0.9);
        strokeWeight(rswL + burst);
        var sax = random(50,300) + base;
        var say = 50 + basey;
        var sbx = curvePoint(lax, lbx, lcx, ldx, r2);
        var sby = curvePoint(lay, lby, lcy, ldy, r2);
        var scx = random(30, 50) + base;
        var scy = random(120, 170) + basey;
        var sdx = 50 + base;
        var sdy = random(150,180) + basey;
        curve(sax, say, sbx, sby, scx, scy, sdx, sdy);

        // tiny branches
        for (var kk = 0; kk < num_tiny_branches; kk ++) {
            strokeWeight(random(0.2, rswL) + burst); // strokeWeight limited to weight of
                                                     // the branch the tiny branch is rooted in
            var ssax = random(40,60) + base;
            var ssay = 50 + basey;
            rss = random(0.3, 0.85);
            var ssbx = curvePoint(sax, sbx, scx, sdx, rss);
            var ssby = curvePoint(say, sby, scy, sdy, rss);
            // need to scale length of the tiny branches by interpolate point on branch curve
            // so that branches are proportionally long to where they are rooted.
            // Because its negative, scaling by (1/rss) looks unnatural, rss is the more 
            // aesthetic and natural looking scaling factor.
            var sscx =  -rss * 30 +  random(45, 55) + base; //(rss) * random(35, 45) + base;
            // split into cases such that half the time tiny branches are 
            // below the branches and half the time above
            if (random(0, 1) < 0.5001) {
                var sscy = scy + random(10, 20);
            } else {
                ssay = scy + 50;
                var sscy = scy - random(10, 20);
            }
            var ssdx = random(scx -10, scx + 10);// + base;
            var ssdy = random(scy -10, scy + 50);
            curve(ssax, ssay, ssbx, ssby, sscx, sscy, ssdx, ssdy);
        }
    }

    // right deviating branches
    strokeWeight(random(0.9, 1.2) + burst);
    var ax = x1 + 200 + random(0, 15);
    var ay = y1;
    var bx = 10 + p1x + random(1, 1+ noi/5);
    var by = p1y;
    var cx = 100 + p2x + random(-noi, noi);
    var cy =  20 + p2y + random(-noi, noi);
    var dx = 190 + p3x + random(-noi, noi);
    var dy = p3y + random(-noi, noi);
    curve(ax, ay, bx, by, cx, cy, dx, dy);

    // small branches
    for (var jdx = 0; jdx < num_small_branches; jdx++) {
        let r1 = random(0.4, 0.75);
        rswR = random(0.5, 0.9);
        strokeWeight(rswR + burst);
        var rsax = 150 + base;
        var rsay = 50 + basey;
        var rsbx = curvePoint(ax, bx, cx, dx, r1);
        var rsby = curvePoint(ay, by, cy, dy, r1);
        var rscx = random(130, 200) + base;
        var rscy = random(130, 170) + basey;
        var rsdx= 150 + base;
        var rsdy = 170 + random(-noi, noi) + basey;
        curve(rsax, rsay, rsbx, rsby, rscx, rscy, rsdx, rsdy);

        // tiny branches
        for (var jj = 0; jj < num_tiny_branches; jj ++) {
            strokeWeight(random(0.2, rswR) + burst);
            var rssax = random(rsax -20, rsax + 20);
            var rssay = 50 + basey;
            let rrss = random(0.3, 0.85);
            var rssbx = curvePoint(rsax, rsbx, rscx, rsdx, rrss);
            var rssby = curvePoint(rsay, rsby, rscy, rsdy, rrss);
            // alternatively to using the scaling, just randomize a displacement from the 
            // root point of the tiny branch
            var rsscx = random(rssbx + 10, rssbx + 25);
            // cases for above/below branch
            if (random(0, 1) < 0.5001) {
                var rsscy = rscy + random(10, 20);
            } else {
                rssay = rscy + 50;
                var rsscy = rscy - random(10, 20);
            }
            var rssdx = random(rsscx - 10, rsscx + 10);// + ((rrss -1) / rrss) * base;
            var rssdy = rsscy + random(10, 70);
            curve(rssax, rssay, rssbx, rssby, rsscx, rsscy, rssdx, rssdy);
        }
    }
  }

}

