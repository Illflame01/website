p5.Image.prototype.colourize = function(colour){
  if(this.coloured==undefined){this.coloured={};}
  if(this.coloured[colour]==undefined){
    let cnv = createGraphics(this.width, this.height);
    cnv.noSmooth();
    cnv.tint(colour);
    cnv.image(this, 0, 0);
    this.coloured[colour] = cnv;
  }
  return this.coloured[colour];
}

function startGame(){
  started = true;
}