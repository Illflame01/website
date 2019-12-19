const asteroidColours = {
  //copper
  "copper": [255, 173, 6],
  //gold
  "gold": [247, 247, 7],
  //uranium
  "uranium": [9, 255, 0],
  //diamond
  "diamond": [0, 255, 247],
  //cobalt
  "cobalt": [5, 134, 255]
}



function Asteroid(x, y) {
  this.r = floor(random(100, 150));
  this.pos = createVector(x, y);//floor(random(-5000,5000)), floor(random(-5000,5000)));

  for (i=0; i<asteroids.length;i++){
    let dif = dist(this.pos.x, asteroids[i].pos.x);
    if(dif<60){
      this.pos.x += 100;
    }
  }

  let typeTemp = floor(random(100));
  if (typeTemp <= 10) {
    this.type = "diamond"
  } else if (typeTemp > 10 && typeTemp <= 25) {
    this.type = "uranium"
  } else if (typeTemp > 25 && typeTemp <= 50) {
    this.type = "gold"
  } else if (typeTemp > 50) {
    this.type = "copper"
  }

  this.show = function () {

    push()

    let rockid = images.rock.colourize(asteroidColours[this.type]);

    let d1 = dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y)

    if (d1 < 1050){
      imageMode(CENTER);
      image(rockid, this.pos.x, this.pos.y, this.r * 2.5, rockid.height * (this.r * 2.5 / rockid.width));
    
      noFill();
      stroke(170, 170, 170);
  
      tint(175, 127);
  
      strokeWeight(1);
  
      ellipseMode(CENTER);
      ellipse(this.pos.x, this.pos.y, this.r * 2);
    }

    pop()

    border.update();
    border.show();

  }

  this.update = function () {
    let d = dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y)

    let speed = map(d, 0, this.r, 0.2, 0.8)

    if (d < this.r) {
      let angle = player.pos.copy().sub(this.pos).heading();

      var circx = this.r * cos(angle);
      var circy = this.r * sin(angle);

      player.pos.set(circx + this.pos.x, circy + this.pos.y);

      player.isMovingForward = false;

      let bounce = p5.Vector.fromAngle(radians(angle));
      bounce.setMag(5);
      player.vel.add(bounce);

      player.health -= 20;
      audio.collide.play();

    }


  }

















}
