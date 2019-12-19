const _speed = 2;
const _bspeed = _speed * 2;

function Player() {
  //upgrades
  this.inventoryUpgrade = 1;
  this.speedUpgrade = 1;
  this.miningUpgrade = 1;
  this.healthUpgrade = 1;

  //stats
  this.health = 100;
  this.maxBoost = 100;
  this.rotationSpeed = 0;
  this.maxSpeed = 2;
  this.facing = 0;

  this.inventory = {
    "copper": 2,
    "gold": 0,
    "uranium": 0,
    "diamond": 0,
    "cobalt": 0

  };

  //resources
  this.boost = 100;
  this.fuel = 100;
  this.money = 10;

  //shooting
  this.isShooting = false;
  this.laserLimit = 200;

  //movement
  this.pos = createVector(0, 0);
  this.vel = createVector(0, 0);
  this.acc = 0.2;

  //triggers
  this.isMoving = false;
  this.isMovingForward = false;
  this.isMovingBackwards = false;
  this.isRotatingLeft = false;
  this.isRotatingRight = false;
  this.isBoosting = false;
  this.canShop = false;

  this.show = function () {
    push();
    //translate (this.pos);
    noStroke();
    rotate(this.facing);
    imageMode(CENTER)


    if (this.isMovingForward) {
      push()
      fill(0, 140, 255)
      ellipse(-15, 0, 20)
      pop()
    } if (this.isBoosting === true) {
      push()
      fill("red")
      ellipse(-15, 0, 25)
      pop()
    }
    noStroke();
    image(images.shipimg, 0, 0, 700 / 12, 500 / 12);
    pop();
  }

  this.update = function () {

    //Turning

    if (this.isRotatingRight) {
      this.rotationSpeed = 2;
    }
    if (this.isRotatingLeft) {
      this.rotationSpeed = -2;
    }
    else {
      this.rotationSpeed *= 0.9;
    }

    this.facing += this.rotationSpeed;
    if (this.facing > 360 || this.facing < 0) {
      this.facing %= 360
    }

    //movement force

    let vel = this.vel.copy();


    let force = p5.Vector.fromAngle(radians(this.facing));
    force.setMag(this.acc);

    if (this.isMovingForward || this.isBoosting) {
      vel.add(force);
    } else if (this.isMovingBackwards) {
      vel.sub(force);
    }

    vel.limit((this.isBoosting) ? _bspeed : _speed);

    this.vel = vel;

    // movement

    this.pos.add(this.vel);

    // friction
    this.vel.mult(0.98);

    //losing fuel

    if (player.isMoving && player.fuel > 0) {
      floor(player.fuel = player.fuel - 0.01)
    }

    //DEATH

    if (player.health <= 0) {
      player.pos.x = 0;
      player.pos.y = 0;
      this.health = 100;
      audio.death.play();
    }

    //Shooting

    if (this.isShooting) {
      laser.show();
    }
  }
}