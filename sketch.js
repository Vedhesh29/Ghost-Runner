var tower, towerImage;  
var door, doorImage; 
var doorGroup; 
var railing, railImage, railGroup; 
var ghost, ghostImage;
var invisible, invisibleG; 
var gameState="play";  
var spookySound; 

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  railImage = loadImage("climber.png"); 
  ghostImage = loadImage("ghost-standing.png");
  spookySound= loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);

  tower = createSprite(300,300); 
  tower.addImage("tower",towerImage);
  tower.velocityY=2; 
  
  doorGroup = new Group();
  railGroup = new Group(); 
  invisibleG = new Group(); 
  
  ghost = createSprite(200,200,50,50);
  ghost.scale=0.3;
  ghost.addImage("ghost", ghostImage); 
  
  spookySound.loop();
}
function draw(){
  background(0); 
  
  
  
if (gameState==="play"){
  
    if (keyDown("space")){
    ghost.velocityY= -5;
  }
  
  if (keyDown("right")){
    ghost.x=ghost.x+3;
  }
  
  if (keyDown("left")){
    ghost.x=ghost.x-3; 
  }
  ghost.velocityY = ghost.velocityY+0.5; 
  
   if (tower.y>400){
   tower.y=300;
   }
     if (ghost.isTouching(railGroup)){
    ghost.velocityY=0; 
    
  }
     if (ghost.isTouching(invisibleG)|| ghost.y>600){
    ghost.destroy(); 
    gameState = "end"; 
  }
     
   spawnDoors();
   drawSprites(); 
  }
  

  
  if (gameState==="end"){
    stroke("yellow");
    fill("yellow"); 
    textSize(30);
    text("GAME OVER", 230,258); 
  }
  

}

function spawnDoors(){
  if (frameCount%240===0){
   door = createSprite(200,-50);
   door.addImage(doorImage);
   
  railing= createSprite(200,10);
  railing.addImage(railImage); 
  railing.velocityY=1;
  railing.lifetime=800;
    
   
   
    door.x = Math.round(random(120,400)); 
    railing.x = door.x;
    door.velocityY=1;
    door.lifetime=800;
    
    invisible = createSprite(200,15);
    invisible.width= railing.width;
    invisible.height=2;
    invisible.x=door.x;
    invisible.velocityY=1; 
    invisible.lifetime=800; 
    invisible.debug=true;
    
    ghost.depth=door.depth; 
    ghost.depth=ghost.depth+1; 
    
    doorGroup.add(door); 
    railGroup.add(railing); 
    invisibleG.add(invisible);
  }
  }
  


