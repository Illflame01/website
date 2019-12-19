function UserInterface(){

  this.show = function(){
    //health bar
    let r = map(player.health, 0, 100, 255, 0);
    let g = map(player.health, 0, 100, 0, 255);
    let b = 0;

    fill(r, g, b);
    rect(5, 5, player.health*3, height/25);

    //Boost bar
    fill("purple")
    arc(width-85, height-45, 70, 70, 0, map(player.boost, 0, 100, 0, 360));

    //Fuel bar
    push()
    rectMode(CORNER)
    fill("orange")
    rect(width-30, height-5, 25, -player.fuel*2)
    pop()

    //frameRate
    push()
    fill("white")
    text(floor(frameRate()), width/2-15, height-5)
    text(`x: ${~~player.pos.x}, y: ${~~player.pos.y}`, width/2, height-5)
    pop()

    //new inventory
    push()
    fill("white")
    let item1 = "";
    let item2 = "";
    let item3 = "";
    pop()

    noStroke();
  }
}