

function stars(){
  push()
  fill(255);
  randomSeed(0);

  //Main cluster 1
  push()
  fill(129, 207, 214)
  for(i=0;i<100;i++){
    let r = random(4);
    let x = random(width)+random(-frameCount, frameCount/2);
    let y = random(height)+random(-frameCount, frameCount/2);
    x = width - (x%width)
    y = (y%height)

    ellipse(x, y, r)
  } 
  pop()

  //Main cluster 2
  push()
    for(i=0;i<30;i++){
      let r = random(4);
      let x = random(width)+frameCount/2;
      let y = random(height)+frameCount/2;
      x = (x%width)
      y = (y%height)
      ellipse(x, y, r)
    } 
  pop()

  //Yellow Stars
  push()
    fill(251, 255, 0)
    for(i=0;i<15;i++){
    let r = random(4);
    let x = random(width)+frameCount/2;
    let y = random(height)+frameCount/2;
    x = width - (x%width)
    y = (y%height)
    ellipse(x, y, r)
  } 
  pop()
  
  pop()
}