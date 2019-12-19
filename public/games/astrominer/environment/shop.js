function Shop(x, y){
    //stats
    this.r = 300;
    this.pos = createVector(x, y);
    let borderColor;
    let shopr = 250;

    this.show = function(){
        fill("cyan");

        let renderDistance = dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y);
        
        if (renderDistance < 1050){
            ellipseMode(CENTER);
            noStroke();
            ellipse(this.pos.x, this.pos.y, shopr);

            textAlign(CENTER);
            textSize(25);
            fill(0);
            text("shop", this.pos.x, this.pos.y);

            noFill();
            stroke(borderColor);

            tint(175, 127);

            strokeWeight(5);
            ellipseMode(CENTER);
            ellipse(this.pos.x, this.pos.y, this.r * 2);
        }
    }

    this.update = function(){
         //checking if in range
         let d2 = dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y)
         if(d2 < this.r){
             player.canShop = true;
             borderColor = [20, 252, 3, 80];
             push();
             fill("white");
             textSize(25)
             text("Press E to enter shop", 5, height-5);
             pop();
         } else if (d2 > this.r){
             // player.canShop = false;
             borderColor = [252, 36, 3, 80];
         }
     
    }
    
}