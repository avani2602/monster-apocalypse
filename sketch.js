var monkey, monkeyAnimation;

var city, cityImage;

var invisibleGround;

var obstacle, zombieImage, monsterImage, obstaclesgroup;

var supplies, bagImage, suppliesGroup;

var cureImage, antidote, cureGroup;

var antidotes, score, injeries;

var fireball, fireballImg, fireballGroup

var dieImage;

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var jumpSound, dieSound, pointSound;

function preload(){
  monkeyAnimation = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png  ","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  cityImage = loadImage("buildings.png");

  zombieImage = loadImage("zombie.png");
  
  monsterImage = loadImage("monster.png");
  
  bagImage = loadImage("supplies.png");
  
  cureImage = loadImage("cure.png");
  
  fireballImg  = loadImage("fireball.png");
  
  dieImage = loadAnimation("cover.png");
  
  jumpSound = loadSound("cartoon_hop_jump_bounce.mp3");
  
  dieSound = loadSound("zapsplat_human_male_voice_says_game_over_001_15726.mp3");
  
  pointSound = loadSound("noisecreations_SFX-NCFREE02_Flabby-Burd.mp3");
}

function setup() {
  
  createCanvas(600,600);
  
  city = createSprite(600,325,20,20);
  city.addImage("destroyed",cityImage);
  city.scale = 0.2;
  city.velocityX = -6;
  
  monkey = createSprite(100,500,20,20);
  monkey.addAnimation("running",monkeyAnimation);
  monkey.addAnimation("dead", dieImage);
  monkey.scale = 0.2;

  invisibleGround = createSprite(300,610,600,50);
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  suppliesGroup = createGroup();
  cureGroup = createGroup();
  fireballGroup = createGroup();
  
  antidotes = 0;
  score = 0;
  injeries = 0;
  
}

function draw() {
  
  background("grey");
  
  if(gameState === PLAY){
    
      if(city.x < 0){
    city.x = 600;
  }
 
  if(keyDown("space") && monkey.y > 200){
    monkey.velocityY = -12;
    jumpSound.play();
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
    
  spawnMonsters();
  spawnSupplies();
  spawnCure();
  spawnFireball();
    
    if(cureGroup.isTouching(monkey)){
      antidotes = antidotes + 1;
      cureGroup.destroyEach();
      score = score + 7;
      pointSound.play();
    }
    
    if(keyDown("I")){
      monkey.visible = false;
    }
    
    if(keyWentUp("I")){
      monkey.visible = true;
    }
    
    if(fireballGroup.isTouching(monkey) && monkey.visible === true){
      injeries = injeries + 3;
      fireballGroup.destroyEach();
    }
    
    if(suppliesGroup.isTouching(monkey)){
      score = score + 2;
      suppliesGroup.destroyEach();
      pointSound.play();
    }
    
    if(obstaclesGroup.isTouching(monkey)){
      obstaclesGroup.destroyEach();
      injeries = injeries + 1;
    }
    
   if(injeries === 5 || injeries > 5){
     gameState = END;
     dieSound.play();
   }
    
  } else if(gameState === END){
    
    obstacle.visible = false;
    supplies.visible = false;
    fireball.visible = false;
    
    obstaclesGroup.setVelocityXEach(0);
    suppliesGroup.setVelocityXEach(0);
    cureGroup.setVelocityXEach(0);
    fireballGroup.setVelocityYEach(0);

    monkey.changeAnimation("dead", dieImage);
    monkey.x = 300;
    monkey.y = 500;
    
    city.velocityX =  0;
    
    if(mousePressedOver(monkey)){
      reset();
    }
    
  }
  
  monkey.collide(invisibleGround);
  
  drawSprites();
  
  fill("black");
  text("ANTIDOTES = " + antidotes, 50, 50);
  
  fill("red");
  text("INJERIES = " + injeries, 270, 50);
  
  fill("black");
  text("SCORE = " + score, 500, 50);
  
  if(gameState === END){
    textSize = 30;
    fill("red");
    text("GAME OVER", 280, 100);
    fill("black")
    text("click on the hand to restart",250,150)
    
  }
}

function reset(){
  gameState = PLAY;
  
  obstaclesGroup.destroyEach();
  suppliesGroup.destroyEach();
  cureGroup.destroyEach();
  fireballGroup.destroyEach();

  
  monkey.changeAnimation("running", monkeyAnimation);
  
  score = 0;
  injeries = 0;
  antidote = 0;
  
  monkey.x = 100;
  monkey.y = 500;
  
  city.velocityX = -6;
}

function spawnMonsters(){
  if(frameCount % 150 === 0){
    obstacle = createSprite(600,500,20,20);
    obstacle.velocityX = -6;    
    
    var rand = Math.round(random(1,2))
    
    switch(rand){
      case 1: obstacle.addImage("zombie", zombieImage);
              obstacle.scale = 0.4;
              break;
      case 2: obstacle.addImage("monster", monsterImage)
              obstacle.scale = 0.2;
              break;
      default:
              break;
    }
    
    obstacle.lifetime = 150;
    
    obstaclesGroup.add(obstacle);
  }
}

function spawnSupplies(){
  if(frameCount % 200 === 0){
    supplies = createSprite(600,Math.round(random(100,400)),20,20)
    supplies.velocityX = -6;

    supplies.addImage("supplies", bagImage)
    supplies.scale = 0.2;
    
    supplies.lifetime = 150;
    
    suppliesGroup.add(supplies);
  }
}

function spawnCure(){
    if(frameCount % 1030 === 0){
    antidote = createSprite(600,Math.round(random(100,400)),20,20)
    antidote.velocityX = -6;

    antidote.addImage("cure", cureImage)
    antidote.scale = 0.2;
    
    antidote.lifetime = 150;
    
    cureGroup.add(antidote);
  }
  
}

function spawnFireball(){
  if(frameCount % 670 === 0){
    fireball = createSprite(100,0,30,30);
    fireball.velocityY = 7;
    fireball.addImage("sky",fireballImg);
    fireball.scale = 0.3;
    
    fireball.lifetime = 150;
    
    fireballGroup.add(fireball);
  }
}