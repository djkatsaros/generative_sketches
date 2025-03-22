function setup() {
  createCanvas(900, 900);
  background(25)
  noStroke();
  frameRate(10);
}

function draw() {
  var thet = -1* Math.PI / 6;
  for (var i = 0; i < 400; i++) {
    var r = random(0, 200);
    var q = random(0,10);
    stroke(r );
    line(i+410, 470, 510 , 370+r);
    line(i+10, 470, 310 , 370+r);
    line(410, i+470, 310+r , 570);
    line(410, i+70, 310+r , 370);
  } 
}

