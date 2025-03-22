var W = 500
function setup() {
  createCanvas(3.0*W, W);
  background(25)
  noStroke();
  frameRate(0.3);
}

function draw() {
//TODO create a generalized scaling
    const branches = [];
    for (var ll=0; ll<6; ll++) {
    var h = 200;
    stroke(150);
    var rt1=225*(ll+1)+random(-5,5);
    var tk1=W;
    var rt2=rt1;
    var tk2=W-h;
    line(rt1,tk1,rt2,tk2);
    for (var i = 0; i < 2   ; i++) {
        // trunk height 
        var r = random(-15,15)  
        
        // branches
        var l = random(-10+r, 10-r); //length
        var h1 = random(80, 250); //height randomness
        stroke( random( 80, 128) );
        var x1=rt1
        var y1=W-h 
        var x2=rt1-5*l
        var y2=W-h1
        line(x1,y1,x2,y2);

        for (var j=0; j <4 ; j++) {
            var q=random(-10,10)
            var l2 = random(-5+q, 5-q); //length
            var h2 = random(-10,  83); //height randomness
            stroke(random(84,196));
            //line(W/2-5*l, W-h2-h1, W/2-5*l-5*l2, W-h1-h2-hh1-hh2);  
            var x3=x2-5*l2
            var y3=y2-h2
            line(x2,y2,x3, y3);  

            for (var k=0; k <8 ; k++) {
                var p=random(-5,5)
                var l3 = random(-5+p,5-p); //length
                var h3 = random(-10,  23); //height randomness
                var hh3 = random(-10, 20);
                stroke(random( 80,256));
                //line(W/2-5*l, W-h2-h1, W/2-5*l-5*l2, W-h1-h2-hh1-hh2);  
                var x4=x3-5*l3
                var y4=y3-h3
                line(x3,y3,x4, y4); 
            }
        }
    }     
}
}
