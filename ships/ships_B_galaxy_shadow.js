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
    //line(i, 400, 50+r , 398 + 0.5*r);
    line(i+10, 450, 60 + 0.4*r, 323 + 1.1*r);
    //point(500+0.1*r, r + 2*r);
    //point(500-0.2*r, r +2*r);
  } 
  for (var i=0; i< 700; i++) {
    var r = random(-600,600);
    var q = random(0,600);
    point(i+r, 50*r);
    point(  Math.cos(thet)*q- Math.sin(thet)* ( (0.02*q)**2+400 ),Math.sin(thet)*q
        + Math.cos(thet)* ( (0.02*q)**2+400 ) );
    point( q, -2*(0.02*q)**2+300);
  }
}

