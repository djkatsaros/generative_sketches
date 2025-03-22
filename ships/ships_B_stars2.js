function setup() {
  createCanvas(600, 600);
  background(25)
  noStroke();
  frameRate(50);
}

function draw() {
  var thet = -1* Math.PI / 6;
  for (var i = 0; i < 400; i++) {
    var r = random(0,200);
    stroke(r *0.75 );
    line(i+10, 150, 60 + 0.4*r, 50+r);
    line(i+10, 250, 60 + 0.8*r, 105+r);
    line(i+10, 350, 60 + 1.2*r, 175+r);
    line(i+10, 350, 60 + 0.8*r, 248+r);
    line(i+10, 450, 60 + 0.4*r, 323 + 1.1*r);
  } 
  for (var i=0; i< 700; i++) {
    stroke(r*0.75);  
    var r = random(-600,600);
    var p1 = random(-13,80);
    var p2 = random(-83,10)  
    var q = random(-1000,600);
    point(i+r, 50*r);
    if (i % 50 ==0) {
        stroke(r*2);
        point(  Math.cos(thet)*q- Math.sin(thet)* ( (0.02*q)**2+300+p2 ),2*(Math.sin(thet)*q
            + Math.cos(thet)* ( (0.02*q)**2+300+p2 )) );
        point( q, -2*(0.02*q)**2+300+p1);
    }
  }
}

