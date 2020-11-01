var gameState = "play"
var tower_1, tower;
var door_1, door, doorsGroup;
var climber_1, climber, climbersGroup;
var ghost, ghostImg;
var invisibleclimbGroup, invisibleclimb;


function preload(){
  tower_1 = loadImage("tower.png");
  door_1 = loadImage("door.png");
  climber_1 = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
   spookySound.loop();
  
  tower = createSprite(300,300);
   tower.addImage("tower",tower_1);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  
invisibleclimbGroup = new Group();
  
  ghost = createSprite(170,200,50,50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
}





function draw(){
  background(0);


  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 600){
      tower.y = 300
    }
    spawnDoors();

    
    
    
   
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    
    if(invisibleclimbGroup.isTouching(ghost) || ghost.y > 600){
      
      
      ghost.destroy();
      gameState = "end";
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(45);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
    if (frameCount % 200 === 0) {
    var door = createSprite(250, 50);
    var climber = createSprite(200,100);
    var invisibleclimb = createSprite(200,115);
    invisibleclimb.width = climber.width;
    invisibleclimb.height = (2);
    door.x = Math.round(random(120,500));
    climber.x = door.x;
    invisibleclimb.x = door.x;
    door.addImage(door_1);  
    climber.addImage(climber_1);
    door.velocityY = 3;
    climber.velocityY = 1;
    invisibleclimb.velocityY = 1;
     ghost.depth = door.depth;
    ghost.depth = door.depth+1;
    door.lifetime = 600;
    climber.lifetime = 600;
    invisibleclimb.lifetime = 750;
    
      
    
    doorsGroup.add(door);
    invisibleclimb.debug = true;
    climbersGroup.add(climber);
    invisibleclimbGroup.add(invisibleclimb);
  }
}

