var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  ghostImg2=loadImage("ghost-jumping.png")
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup= new Group();
  ghost= createSprite(300,300);
  ghost.addImage(ghostImg2)
  ghost.scale=(0.3)

  invisibleBlockGroup= new Group()
  climbersGroup= new Group()
  doorsGroup= new Group()
}

function draw() {
  background(0);

  if (gameState==='play'){
    if(tower.y > 400){
      tower.y = 300
    
    }
    if(keyDown("space")){
      ghost.addImage(ghostImg2)
      ghost.velocityY=-12
    }
    ghost.velocityY=ghost.velocityY+0.5
    if(keyDown("left")){
      ghost.x=ghost.x-5
      
    }
    if(keyDown("right")){
      ghost.x=ghost.x+5
      
    }
    if (ghost.isTouching(climbersGroup)){
      //ghost should come in standing position,
      //ghost should move along with the climber
      ghost.addImage(ghostImg)
      ghost.velocityY=0
    }
    spawnDoors()
    drawSprites()
    if(ghost.y>600 || ghost.isTouching(invisibleBlockGroup)){
      //gameEnd
      gameState='end'
    }

  }

  else if(gameState==='end'){
    stroke("yellow")
    fill('yellow')
    textSize(36)
    text("Game Over", 210, 300)
    if (keyDown('r')){
      reset()
    }
  }
  
  
}

function spawnDoors(){
  if(frameCount % 300===0){
    door=createSprite(500,-50)
    door.addImage ("door", doorImg)
    door.velocityY=1
    door.x=Math.round(random(100,500))
    door.lifeTime=800
    doorsGroup.add(door);
    door.depth=tower.depth
    doorsGroup.add(door)

    climber=createSprite(100,0)
    climber.x=door.x
    climber.addImage ("climber", climberImg)
    climber.velocityY=1
    climber.lifetime= 600
    climbersGroup.add(climber)
    climber.depth= door.depth+1
    
    invisibleBlock=createSprite(100, 7, 10, 3)
    invisibleBlock.x= climber.x
    invisibleBlock.velocityY=1
    invisibleBlock.lifetime= 600
    invisibleBlock.visible= false
    invisibleBlock.width= climber.width
    invisibleBlock.debug=false
    invisibleBlockGroup.add(invisibleBlock)


  }

}

function reset(){
  if(doorsGroup.length>0 ||climbersGroup.length>0 || invisibleBlockGroup.length>0){
    doorsGroup.destroyEach()
    climbersGroup.destroyEach()
    invisibleBlock.destroyEach()
  }
  
  gameState='play'
  ghost.x=300
  ghost.y=300
 

}
