const asteroidColours = {
  //copper
  0:[255,173,6],
  //gold
  1:[247,247,7],
  //uranium
  2:[9,255,0],
  //diamond
  3:[0,255,247],
  //cobalt
  4:[5, 134, 255]
}

function Asteroid( x, y ){
  this.r = floor(random(100, 150));
  this.pos = createVector( x, y );//floor(random(-5000,5000)), floor(random(-5000,5000)));


  let typeTemp = floor(random(100));
  if (typeTemp <= 10){
    this.type = 3
  } else if (typeTemp > 10 && typeTemp <= 25){
    this.type = 2
  } else if (typeTemp > 25 && typeTemp <= 50){
    this.type = 1
  } else if (typeTemp > 50){
    this.type = 0
  }

  this.show = function(){
//     text(this.type +" "+ typeTemp + " " + this.r, 275, 100);

    push()
    
    let rockid = images.rock.colourize( asteroidColours[this.type] );
    
    
    imageMode(CENTER);
    image(rockid, this.pos.x, this.pos.y, this.r*2.5, rockid.height*(this.r*2.5/rockid.width));
    
    noFill();
    stroke(170, 170, 170);

    tint(175, 127);

    strokeWeight(10);
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.r*2);
    pop()
  

    border.update();
    border.show();

  }

  this.update = function(){
    let d = dist(this.pos.x, this.pos.y , player.pos.x, player.pos.y)

    let speed = map(d, 0, this.r, 0.2, 0.8)

    if (d < this.r){
      let angle = player.pos.copy().sub( this.pos ).heading();

      var circx = this.r*cos(angle);
      var circy = this.r*sin(angle);

      player.pos.set( circx + this.pos.x, circy + this.pos.y );
      
      player.isMovingForward = false;

      let bounce = p5.Vector.fromAngle( radians(angle) );
      bounce.setMag( 5 );
      player.vel.add( bounce );

      player.health -= 20;
    }

    // for(i=0;i<asteroids.length-1;i++){
    //   d1 = dist(asteroids[i].pos.x, asteroids[i].pos.y, player.pos.x, player.pos.y);
    //   d2 = dist(asteroids[i+1].pos.x, asteroids[i+1].pos.y, player.pos.x, player.pos.y);
      
    //   console.log("yes");
    // }

  }

















}
