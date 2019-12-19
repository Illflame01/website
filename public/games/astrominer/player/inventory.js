let materials = ["copper", "gold", "uranium", "diamond", "cobalt"];

function Inventory(){
    this.show = function(){
        push();
        rectMode(CENTER);
        
        let x = width/2;
        let y = height/2;

        let w = width*0.75;
        let h = height*0.75;

        let padding = w*0.05;

        // Box
        stroke(201, 201, 201);
        strokeWeight(15);
        fill(122, 122, 122);

        rect(x, y, w, h, 30);

        // Box br
        strokeWeight(5);
        line( x - w/2 + padding, y + h/2 - padding*2, x + w/2 - padding ,y + h/2 - padding*2 );

        // Money
        noStroke();
        textSize(padding);
        textAlign(LEFT, CENTER);


        let tw1 = textWidth( `money: ` );
        let tw2 = textWidth( `$${player.money}` );
        let tw  = tw1 + tw2;

        fill('black');
        text( `money: `, x - tw/2, y + h/2 - padding - textDescent()/4 );
        fill('gold');
        text( `$${player.money}`, x - tw/2 + tw1, y + h/2 - padding - textDescent()/4 );
        // Items
        push();

        // - start
        translate( x - w/2 + padding, y - h/2 + padding );

        rectMode(CORNER);
        stroke(201, 201, 201);
        strokeWeight(10);
        fill(122, 122, 122);

        let size = 100;
        let gap  = (w - padding*2 - size*5) / 4;

        // for(i=0;i<5;i++){
        for (let material in player.inventory){

            rect( 0, 0, size, size, 30 );
            image(images.oreimg.colourize(asteroidColours[material]), 0, 0, size, size);

            push()
            textAlign(LEFT);
            noStroke();
            fill(0);
            textSize(25);

            text(material, 0, 125);
            text(floor(player.inventory[material]), 0, 125+textSize());
            pop()

            translate( size+gap, 0 );
        }

        pop();
        pop();
    }
}