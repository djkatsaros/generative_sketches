var W = 500
function setup() {
  createCanvas(W, W);
  background(25)
  noStroke();
  frameRate(0.5);
}

function draw() {
//TODO create a generalized scaling
    var h = 150;
    stroke(100);
    line(W/2,W,W/2,W-h);
    for (var i = 0; i < 10  ; i++) {
        // trunk height 
        var r = random(-5,5)  
        
        // branches
        var l = random(-12+r,13-r); //length
        var h2 = random(50, 150); //height randomness
        var h1 = random(-10,100);
        stroke( l*l);
        line(W/2, W-h2, W/2-5*l, W-h1-h2);             

        for (var j=0; j <2 ; j++) {
            var red = random(0,1)
            var q=random(-6,6)
            var l2 = random(-10+q,10-q); //length
            var hh2 = random(50, 150); //height randomness
            var hh1 = random(-10,100);
            stroke( l2*l2);
            line(W/2-5*l, W-h2-h1, W/2-5*l-5*l2, W-h1-h2-hh1-hh2);  
            line(W/2-5*l, W-h2-h1, (W/2-5*l-5*l2), (W-h1-h2-hh1-hh2));  
        }
    }     
}

