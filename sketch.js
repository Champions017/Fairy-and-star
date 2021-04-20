var starImg,bgImg;
var star, starBody;
var fairy,fairyImg1,fairyImage2;
//create variable for fairy sprite and fairyImg

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var score;

var rightEdge,leftEdge;

var sound;

function preload()
{
	starImg = loadImage("star.png");
	bgImg = loadImage("starNight.png");
	//load animation for fairy here
	fairyImg1 = loadAnimation("fairyImage1.png","fairyImage2.png");
	fairyImg2 = loadAnimation("fairyImage1 - Copy.png","fairyImage2 - Copy.png")
	sound = loadSound("JoyMusic.mp3")
}

function setup() {
	createCanvas(800, 750);

	//write code to play fairyVoice sound
	sound.play();

	//create fairy sprite and add animation for fairy

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;

	
	fairy = createSprite(400,575);
	fairy.addAnimation("fairy_right",fairyImg1);
	fairy.addAnimation("fairy_left",fairyImg2)
	fairy.scale = 0.2

	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	Engine.run(engine);
	fairy.debug = true

	score = 0;

	rightEdge = createSprite(800,375,10,750);
	rightEdge.visible = false

	leftEdge = createSprite(0,375,10,750);
	leftEdge.visible = false
}


function draw() {
  background(bgImg);

  keyPressed();

  star.x= starBody.position.x 
  star.y= starBody.position.y 

  console.log(star.y);
  console.log("xPosition:", star.x)

  //write code to stop star in the hand of fairy
  if(fairy.isTouching(star)){
	  starBody.position.y = 30
	  Matter.Body.setStatic(starBody,true)
	  score = score + 1;

	
}

  fairy.bounceOff(rightEdge);
  fairy.bounceOff(leftEdge);
  star.collide(rightEdge);
  star.collide(leftEdge)
  

  drawSprites();
  textSize(40);
  fill("yellow");
  textAlign(CENTER)
  text("Score: " + score,width/2,100)
}

function keyPressed() {

	if (keyCode === DOWN_ARROW) {
		Matter.Body.setStatic(starBody,false); 
	}

	//write code to move fairy left and right
	if(keyDown("left")){
		fairy.x = fairy.x - 10;
		fairy.changeAnimation("fairy_left",fairyImg2)
	}

	if(keyDown("right")){
		fairy.x = fairy.x + 10;
		fairy.changeAnimation("fairy_right",fairyImg1)
	}
}
