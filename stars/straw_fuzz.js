function setup() {
  createCanvas(900, 900);
  background(25)
  noStroke();
  frameRate(06);
}

function draw() {
  for (var i = 0; i < 400; i++) {
    var r = random(0, 200);
    var q = random(-10,10);
    stroke(r**(60/59) );
  
    line(i+410, 470 + 0.5*q*(0.015*(400-1.1*i)), 510, 370+r);
    line(i+10, 470+0.3*q, 310 , 370+r);
    line(410+0.5*q, i+470, 310+r , 570);
    line(410+0.4*q, i+70, 310+r , 370);
  } 
}

