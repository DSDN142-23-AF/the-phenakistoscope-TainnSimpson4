const SLICE_COUNT = 18;
const imageName = 'assets/ghost';
let img1, img2, img3, img4; 
var frame = 0; 

function setup_pScope(pScope){
  pScope.output_mode(OUTPUT_GIF(1000));
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(false);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);
}

function setup_layers(pScope){

  img1 = loadImage(imageName + '1.png');
  img2 = loadImage(imageName + '2.png');
  img3 = loadImage(imageName + '3.png');
  img4 = loadImage(imageName + '4.png');
  new PLayer(null, 220);  //lets us draw the whole circle background, ignoring the boundaries

  var layer1 = new PLayer(faces);
  layer1.mode( RING);
  layer1.set_boundary( 200, 1000 );

  var layer2 = new PLayer(squares);
  layer2.mode( RING );
  layer2.set_boundary( 0, 400 );

}

function faces(x, y, animation, pScope){
  
  scale(animation.frame*2);

  fill(255,0,0); 
  ellipse(0,0,50,50); // draw head
  rect(-5,20,10,15);
  curve(10,30,10,40,-10,50,10,60); // draw mouth

}

function squares(x, y, animation, pScope){

  // this is how you set up a background for a specific layer
  let angleOffset = (360 / SLICE_COUNT) / 2
  let backgroundArcStart = 270 - angleOffset;
  let backgroundArcEnd = 270 + angleOffset;

  fill(66, 135, 245)
  arc(x,y,800,800,backgroundArcStart,backgroundArcEnd); // draws "pizza slice" in the background

  fill(255)
  rect(-10,-300-animation.wave()*50,20,20) // .wave is a cosine wave btw
  if(frame < 4){
    image(img1, 0, -800); // draw eyes
  }
  else if(frame < 8){
    image(img2, 0, -800); // draw eyes
  }
  else if(frame < 12){
    image(img3, 0, -800); // draw eyes
  }
  else{
    image(img4, 0, -800); // draw eyes
  }

  frame++; 
  if(frame == SLICE_COUNT){
    frame = 0; 
  }

}
