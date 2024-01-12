const SLICE_COUNT = 18;
const imageName = 'assets/frame';
// let img1, img2, img3, img4; 
let img = []; 
let back; 
let popImage; 
var frame = 0; 

var balframe = 1;

var ballsize = 6; 
var ballX = -50; 
var ballY = 24; 

function setup_pScope(pScope){
  pScope.output_mode(OUTPUT_GIF(1000));
  pScope.scale_for_screen(true);
  pScope.draw_layer_boundaries(false);
  pScope.set_direction(CCW);
  pScope.set_slice_count(SLICE_COUNT);
}

function setup_layers(pScope){
  //load images of ghost
  for(let i = 0; i < SLICE_COUNT; i++)
  {
    img[i] = loadImage(imageName + (i+ 1) + '.png');
  }
  back = loadImage('assets/background.jpeg');
  popImage = loadImage('assets/pop.png');

  new PLayer(null, 220);  //lets us draw the whole circle background, ignoring the boundaries

  var layer2 = new PLayer(ghost);
  layer2.mode( RING );
  layer2.set_boundary( 0, 400 );

  var layer1 = new PLayer(balloon);
  layer1.mode( RING);
  layer1.set_boundary( 0, 800 );
}

function balloon(x, y, animation, pScope){
  stroke(0,0,0);
  let red = Math.floor(Math.random() * 15);  //adds a bit of randomness to the color

  fill(205 - red, 96,84); 
  balframe++;
  fFrame = balframe - 5;  //what frame will it be shown on
  if(fFrame < 0)
  {
    fFrame = SLICE_COUNT + fFrame; 
  }

  //if the balloon is at the top of the screen, it will stop moving
  if(fFrame < 4)
  {
    fFrame = 17; 
  }

  //calculations for triangle
  var size = ballsize * fFrame * 0.25; 
  var centerY = (ballY * fFrame) - size;
  var centerX = (ballX * fFrame) + size; 


  //line for balloon
  stroke(0,0,0);
  line(centerX, centerY, centerX + size * 3, centerY - size * 2.5);

  //triangle at bottom
  beginShape();
  vertex(centerX + size, centerY + size);
  vertex(centerX + size, centerY - size);
  vertex(centerX - size, centerY - size);
  vertex(centerX - size, centerY + size);
  endShape(CLOSE);

  //balloon circle
  ellipse(ballX * fFrame, ballY * fFrame, ballsize * fFrame, ballsize * fFrame); 


  stroke(205 - red, 96, 84);

  //triangle at bottom, overlaps top line
  size = size * 0.9; 
  beginShape();
  vertex(centerX + size, centerY + size);
  vertex(centerX + size, centerY - size );
  vertex(centerX - size , centerY - size);
  vertex(centerX - size, centerY + size);
  endShape(CLOSE);



  //ellipse(centerX, centerY, ballsize * fFrame, ballsize * fFrame); // draw head

  if(balframe == SLICE_COUNT)
  {
    balframe = 0; 
  }
  
  noFill();


}

function ghost(x, y, animation, pScope){
  fill(66, 135, 245)
  fill(255, 0 ,0 );
  if(frame == 0)
  {
     image(back, 0, 0); //draws background
  }
  image(img[frame], 22, -800); // draw ghost

  if(frame == 1){
    image(popImage, 75, -900);
  }

  frame++; 
  if(frame == SLICE_COUNT){
    frame = 0; 
  }

}
