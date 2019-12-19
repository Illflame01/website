function Border(){
  this.show = function(){
    push();
      noFill();
      stroke("red");
      rect( -threshold, -threshold, threshold*2, threshold*2 );
    pop();
  }
  this.update = function(){
    if (player.pos.x > threshold || player.pos.x < -threshold || player.pos.y > threshold || player.pos.y < -threshold){
      let angle = player.pos.heading();

      let bounce = p5.Vector.fromAngle( radians(angle) );
      bounce.setMag( 5 );
      player.vel.sub( bounce );
    }
  }
}