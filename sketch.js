var count=0
var gameState=1
var timer =0
function preload(){
  groundImg=loadImage("ground.png")
  carImg=loadAnimation("car/car-main/car-0.png","car/car-main/car-1.png","car/car-main/car-2.png",
  "car/car-main/car-3.png","car/car-main/car-4.png","car/car-main/car-5.png",
  "car/car-main/car-6.png","car/car-main/car-7.png","car/car-main/car-8.png",
  "car/car-main/car-9.png","car/car-main/car-10.png","car/car-main/car-11.png",
  "car/car-main/car-12.png","car/car-main/car-13.png","car/car-main/car-14.png",
  "car/car-main/car-15.png","car/car-main/car-16.png","car/car-main/car-17.png",
  "car/car-main/car-18.png","car/car-main/car-19.png","car/car-main/car-20.png",
  "car/car-main/car-21.png","car/car-main/car-22.png","car/car-main/car-23.png",
  "car/car-main/car-24.png","car/car-main/car-25.png","car/car-main/car-26.png",
  "car/car-main/car-27.png","car/car-main/car-28.png","car/car-main/car-29.png")
  coinImg=loadImage("coin.png")
  carstop = loadAnimation("car.gif")
  obImg=loadImage("Obsticle.png")
  bgImg=loadImage("skyImage.jpg")
  s1=loadSound("coin-drop-4.mp3")
  s2=loadSound("sfx-defeat1.mp3")
  restartImg=loadImage("restart.png")
  gameOverImg=loadImage("game over.png")
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  obg=createGroup()
 ground= createSprite(width/2, height-350, width, 60);
 ground.addImage(groundImg)
 ground.scale=2.9
 ground2= createSprite(width/2, height-100, width, 30);
 ground2.visible = false
 car= createSprite(250, height-200, width, 60);
 car.addAnimation("car",carImg)
 car.addAnimation("stop",carstop)
 car.scale=0.7
 car.debug = false
 car.setCollider("rectangle",0,0,500,300)
coinG=createGroup()
accelarate=createImg("UpArrow.png")
accelarate.position(width-230,height-200)
accelarate.size(150,150)
accelarate.mouseClicked(function(){
  if(car.y>height-300){
  car.velocityY=-14
  }
})
restart=createSprite(width/2,height/2+150)
restart.addImage(restartImg)
restart.scale=0.4

gameOver=createSprite(width/2,height/2)
gameOver.addImage(gameOverImg)
gameOver.scale=0.6
}

function draw() {
  background(bgImg); 
  if(gameState===1){
    restart.visible=false
    gameOver.visible=false
    car.velocityY+=0.4 
    car.collide(ground2 )
   ground.velocityX=-10
   if(ground.x<0){
     ground.x=width
   }

   if(car.isTouching(obg)){
     s2.play()
     gameState=0
   }
 
  for(var i=0;i<coinG.length;i++){
   if(car.isTouching(coinG.get(i))){
     count+=1
     s1.play()
     coinG.get(i).velocityX=7
     coinG.get(i).velocityY=-5
   }
  }
  obs()
}
drawSprites();
if(gameState===0){
  gameOver.visible=true
  car.changeAnimation("stop",carstop)
  timer+=1
  if(timer>100){
    restart.visible=true
    gameOver.visible=false
  }
  coinG.setVelocityXEach(0)
  obg.setVelocityXEach(0)
  car.velocityY=0 
  car.y=height-200
  ground.velocityX=0
  coinG.setVelocityYEach(0)
  
accelarate.hide()
if(mousePressedOver(restart)){
  location.reload()
}
}
  
  textSize(25)
  
  stroke("black")
  fill("white")
  rect(width-175, 40, 150,50)
  fill("black")
  text("Coins: "+ count, width-150, 70)
}



function obs(){
  if(frameCount%200===0 || frameCount===0){
    coin1=createSprite(width+400,height-280)
    coin1.addImage(coinImg)
    coin2=createSprite(width,height-150)
    coin2.addImage(coinImg)  
    coin1.velocityX=-9
    coin1.scale=0.2
    coinG.add(coin1)
    coin2.velocityX=-9
    coin2.scale=0.2
    coinG.add(coin2)
    gameOver.depth = coin1.depth+1
    gameOver.depth = coin2.depth+1
    ob=createSprite(width+400,height-150)
    ob.addImage(obImg)
    ob.velocityX=-9
    ob.scale=0.5
    obg.add(ob)
    ob.setCollider("rectangle", 0, 0, 100, 200)
  }
}