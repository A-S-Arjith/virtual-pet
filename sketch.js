var dog, sadDog, happyDog, milk, milkImg;


function preload() {
  sadDog = loadImage("Images/Dog.png");
  happyDog = loadImage("Images/happy dog.png");
  milkImg = loadImage("Images/Milk.png")
}

function setup() {
  createCanvas(1000, 400);

  dog = createSprite(800, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  milk = createSprite(100, 100, 50, 50);
  milk.addImage(milkImg);
  milk.scale = 0.07;

  Feed = createButton("Feed Dog");
  Feed.position(displayWidth / 2 + 180, displayHeight / 2);
  Feed.mousePressed(feedDog)

  Add = createButton("Add Food");
  Add.position(displayWidth / 2 + 30, displayHeight / 2);
}

function draw() {
  background(46, 139, 87);
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){lastFed=data.val()});
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+lastFed%12+" PM",350,30);
  }
  else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }
  else{
    text("Last Feed : "+lastFed+" AM",350,30);
  }
  drawSprites();
}

//function to read food Stock
function feedDog() {
  dog.addImage(happyDog);

  if (foodObj.getFoodStock() <= 0) {
    foodObj.updateFoodStock(foodObj.getFoodStock() * 0);
  }
  else {
    foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  }
}

//function to update food stock and last fed time
function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({Food:foodS})
}