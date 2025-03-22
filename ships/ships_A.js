function setup() {
  createCanvas(600, 600);
  background(40)
  noStroke();
  frameRate(05);
}

function draw() {
  for (var i = 0; i < 400; i++) {
    var r = random(0,200);
    stroke(r *0.75 );
    line(i+10, 150, 60 + 0.4*r, 50+r);
    line(i+10, 250, 60 + 0.8*r, 105+r);
    line(i+10, 350, 60 + 1.2*r, 175+r);
    line(i+10, 350, 60 + 0.8*r, 248+r);
    //line(i, 400, 50+r , 398 + 0.5*r);
    line(i+10, 450, 60 + 0.4*r, 323 + 1.1*r);
  } 
}

