var W = 500
function setup() {
  createCanvas(3.0*W, W);
  background(25)
  noStroke();
  frameRate(0.5);
}

function draw() {
//TODO create a generalized scaling
    var x1=W/2+random(-15,15);
    var y1=W-100+random(-15,15);
    var x2=W/2+random(-15,15);
    var y2=y1-random(100,150);
    stroke(150);
    line(x1,y1,x2,y2);

    for (var i = 0; i < 2   ; i++) {
        // branches
        for (var j=0; j < i+1; j++) {
            stroke( random( 80, 160) );
            line(x1,y1,x1+random(-30,30),y2+random(-30,30));
            line(x2,y2,x2+random(-30,30),y2+random(-30,30));
        }
    } 
}
