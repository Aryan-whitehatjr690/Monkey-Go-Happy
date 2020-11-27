var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0,ground,survivalTime;
var PLAY=1,END=0,gameState=PLAY;
var score=0,survivalTime=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  ground=createSprite(400,350,900,10);
   ground.shapecolor="lightgreen";
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  FoodGroup=createGroup();
  obstaclesGroup=createGroup();
}


function draw() {
  background("lightblue");
  if(gameState===PLAY){
    
    ground.velocityX=-4;
    
    
      if(keyDown("space")&&(monkey.y>306)){
    monkey.velocityY=-12;
  }
   monkey.velocityY=monkey.velocityY+0.35;
    ground.x=ground.width/2;
    monkey.collide(ground);
    food();
    obstacles();
    if(monkey.isTouching(FoodGroup)){
      score=score+1;
      FoodGroup.destroyEach();
    }
  stroke("white");
  textSize(20);
  fill("white");
  text("Score : "+score,300,50); 
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survial Time : "+survivalTime,100,50);
    if(monkey.isTouching(obstaclesGroup)){
      gameState=END;
    }
  }else if(gameState===END){
    FoodGroup.destroyEach();
    obstaclesGroup.destroyEach();
    monkey.destroy();
    ground.destroy();
    
background("black");
    stroke("white");
  textSize(35);
  fill("white");
  text("Game Over ",100,200);

  }

  drawSprites();
}

function food(){
  if(frameCount%80===0){
    var r=Math.round(random(120,200));
    banana=createSprite(350,r,20,20);
    banana.velocityX=-4;
    banana.addImage(bananaImage);
    banana.scale=0.1;
    FoodGroup.add(banana);
    banana.lifetime=85;
  }     
}

function obstacles(){
  if(frameCount%300===0){
    obstacle=createSprite(300,326,20,20);
    obstacle.velocityX=-4;   
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1
    obstacle.lifetime=85;
    obstaclesGroup.add(obstacle);
  }
  
}





