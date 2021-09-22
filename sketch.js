var dog, sadDog, happydog, database;
var foodS, foodStock;
var addFood, foodObj;
var feed, lastFed;
var bedroomImg, gardenImg, washroomImg, bedroom, garden, washroom;
var milkImg, milk, livingroomImg;
var gameState = 1;

function preload(){
  sadDog=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
  bedroomImg=loadImage("images/Bed Room.png")
  gardenImg=loadImage("images/Garden.png")
  washroomImg=loadImage("images/Wash Room.png")
  milkImg=loadImage("images/Milk.png")
  livingroomImg=loadImage("images/virtual pet images/Living Room.png")
}

function setup() {
  database=firebase.database()
  createCanvas(700,600)

  foodObj= new Food()

  foodStock=database.ref('Food')
  foodStock.on("value", readStock)

  readState=database.ref('gameState')
  readState.on("value", function(data){
    gameState=data.val()
  })

  dog = createSprite(425,500,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;


  /*addFood=createButton("Add Food")
  addFood.position(820,65)
  addFood.mousePressed(addFoods)

  feed=createButton("Feed the Dog");
  feed.position(720,65)
  feed.mousePressed(feedDog)*/

}

function draw() {
  background(46,139,87)

  foodObj.display()
  //writeStock(foodS)

  if(foodS == 0) {
    dog.addImage(happyDog)
    //milk.visible=false
  } else {
    dog.addImage(sadDog)
    //milk.visible=false
  }

  fedTime=database.ref('FeedTime')
  fedTime.on("value", function(data){
    lastFed=data.val()
  })

  fill(255,255,255)
  textSize(15)

  if(lastFed>=12){
    text("Last Fed: " + lastFed%12 + "PM", 250,30)
  } else if(lastFed==0) {
    text("Last Fed: 12 AM", 250,30)
  } else{
    text("Last Fed: " + lastFed + "AM", 250,30)
  }


  if(gameState != 1) {
    feed.hide()
    addFood.hide()
    dog.remove()
  } else {
    feed.show()
    addFood.show()
    dog.addImage(sadDog)
  }

  

  if(gameState===1){
    dog.addImage(happyDog)
    dog.scale=0.175
    dog.y=250
  }

  if(gameState===2) {
    dog.addImage(sadDog)
    dog.scale=0.175
    dog.y=250
    //milk.visible=false
  }

  var Bath=createButton("I want to take a bath")
  Bath.position(580,125)
  if(Bath.mousePressed(function(){
    gameState=3
    database.ref('/').update({'gameState':gameState})
  }))
  if(gameState===3) {
    dog.addImage(washroomImg)
    //milk.visible=false
  }

  var Sleep=createButton("I'm Sleepy")
  Sleep.position(710,125)
  if(Sleep.mousePressed(function() {
    gameState=4
    database.ref('/').update({'gameState':gameState})
  }))
  if(gameState===4) {
    dog.addImage(bedroomImg)
    //milk.visible=false
  }

  var Play=createButton("Let's Play")
  Play.position(500,160)
  if(Sleep.mousePressed(function() {
    gameState=5
    database.ref('/').update({'gameState':gameState})
  }))
  if(gameState===5) {
    dog.addImage(livingroomImg)
    //milk.visible=false
  }

  var playInPark=createButton("Let's play at the park")
  playInPark.position(585,160)
  if(playInParkp.mousePressed(function() {
    gameState=6
    database.ref('/').update({'gameState':gameState})
  }))
  if(gameState===6) {
    dog.addImage(gardenImg)
    //milk.visible=false
  }

  var button=createButton("Feed the Dog")
    button.position(400,125)

    if(button.mousePressed(function(){
      foodS=foodS-1
      gameState=1
      database.ref('/').update({'gameState':gameState})
    }))

    var addFood=createButton("Add Food")
    addFood.position(400,125)

    if(addFood.mousePressed(function(){
      foodS=foodS+1
      gameState=1
      database.ref('/').update({'gameState':gameState})
    }))

  drawSprites()
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
}

/*function writeStock(x) {
  database.ref('/').update({food: x})
}*/

/*function feedDog() {
  dog.addImage(happyDog)
  
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    FeedTime:hour()
  })

  }


function addFoods() {
  dog.addImage(sadDog)
  foodS++
  database.ref('/'). update( {
    Food: foodS
  })
}*/

function update(state) {
  database.ref('/').update({
    gameState: state
  })
}

