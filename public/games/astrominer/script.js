// To Do List
// - Movement
// - Asteroid generation
// - Inventory
// - mining laser hitting asteroid
// - mining laster gets ore and destroys asteroid
// - ore goes into inventory
// - shop 


let player, interval, star, starcount, mainmenu, userinterface, boostinterval, mineinterval, asteroid, laser, rock, border, inventoryScreen, shopInterface, shop, roboto;
let started = false;
let inventoryOpen = false;
let boosting = false;

// let stars = [];

let asteroids = [];
let shops = [];

let images = {};
let audio = {};

let div = document.getElementById('canvas');

function preload() {
  images.oreimg = loadImage("images/ore.png");
  images.shipimg = loadImage("images/shipproto.png");
  images.menuwallpaper = loadImage("images/wallpaperwithbackground.png");
  images.rock = loadImage("images/asteroid.png");
  images.shop = loadImage("images/shop.png")

  audio.collide = loadSound("audio/collide.wav")
  audio.death = loadSound("audio/death.wav")
  audio.mining = loadSound("audio/mining.mp3")

  roboto = loadFont("fonts/Roboto.ttf")
}

let threshold = 5000;
let spawnBoundry = 500;

function setup() {

  let canvas = createCanvas(div.clientWidth, div.clientHeight);
  canvas.parent('canvas');

  textFont(roboto);

  shopInterface = new ShopInterface();
  inventoryScreen = new Inventory();
  border = new Border();
  player = new Player();
  laser = new Laser();
  shop = new Shop();

  for (let i = 0; i < 25; i++) {
    shops.push(
      new Shop(
        ~~random(player.pos.x - threshold, player.pos.x + threshold),
        ~~random(player.pos.y - threshold, player.pos.y + threshold)
      )
    );
  }

  for (let i = 0; i < 150; i++) {
    asteroids.push(
      new Asteroid(
        ~~random(player.pos.x - threshold, player.pos.x + threshold),
        ~~random(player.pos.y - threshold, player.pos.y + threshold)
      )
    );
  }

  mainmenu = new MainMenu();
  userinterface = new UserInterface();

  angleMode(DEGREES);

  $('#startGame')
    .click(function () {
      $(this).hide();
      startGame();
      $('#optionsButton').hide();
    });
  $('#optionsButton')
    .click(function () {
      $(this).hide();
    });
}

function draw() {

  if (width != div.clientWidth || height != div.clientHeight) {
    resizeCanvas(div.clientWidth, div.clientHeight);
  };
  if (started) {
    background(0);
    stars();

    player.update();

    push()
      shops.map(a => a.update());
    pop()

    asteroids.map(a => a.update());

    push();
    //middle of screen
    translate(width / 2, height / 2);

    player.show();

    //stays still no matter where player is
    translate(-player.pos.x, -player.pos.y);

    push()
    shops.map(a => a.show());
    pop()


    asteroids.map(a => a.show());


    pop();
    if (inventoryOpen) { inventoryScreen.show(); }
    userinterface.show();

  } else {
    mainmenu.show();
  }


}

function keyPressed() {
  if (keyCode === 70) {
    audio.mining.play();
    player.isShooting = true;
  }
  //Player controls
  if (keyCode === UP_ARROW) {
    player.isMovingForward = true;
    player.isMoving = true;
  }
  if (keyCode === DOWN_ARROW) {
    player.isMovingBackwards = true;
  }
  if (keyCode === RIGHT_ARROW) {
    player.isRotatingRight = true;
  }
  if (keyCode === LEFT_ARROW) {
    player.isRotatingLeft = true;
  }

  //boosting
  if (keyCode === 16 && player.boost > 0) {
    clearInterval(boostinterval);
    interval = setInterval(() => {
      if (player.boost > 0) {
        player.boost = player.boost - 1
        // player.isMovingForward = true;
      } else {
        clearInterval(interval);
        player.isBoosting = false;
      }

    }, 30);
    player.isBoosting = true;
  }

  //inventory
  if (keyCode === 73) {
    if (!inventoryOpen) { inventoryOpen = true; }
    else { inventoryOpen = false; }
  }

  if (keyCode === 80) {
    player.boost = 50000;
  }

  //shop
  if (keyCode === 69 && player.canShop === true){
    shopInterface.show();
  }
}

function keyReleased() {
  //movement
  if (keyCode === UP_ARROW) {
    player.isMovingForward = false;
    player.isMoving = false;
  }
  if (keyCode === DOWN_ARROW) {
    player.isMovingBackwards = false;
  }
  if (keyCode === RIGHT_ARROW) {
    player.isRotatingRight = false;
  }
  if (keyCode === LEFT_ARROW) {
    player.isRotatingLeft = false;
  }

  //boosting
  if (keyCode === 16) {
    player.speed = 2;
    clearInterval(interval);
    boostinterval = setInterval(() => {
      if (player.boost < 100) {
        player.boost = player.boost + 3
      } else {
        clearInterval(boostinterval);
      }
    }, 1000);
    player.isBoosting = false;
  }

  //shooting
  if (keyCode === 70) {
    audio.mining.stop();
    player.isShooting = false;
  }
}
