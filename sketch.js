const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var corda;
var corda2,corda3;
var melao; 
var melao_corda;
var melao_corda2;
var melao_corda3;
var backgroundIMG;
var melaoImage;
var coelho;
var coelho_nao_IMG;
let engine;
let world;
var butao;
var butao2;
var butao3;
var ground;
var blink;
var papinha;
var triste;
var soundbackground;
var soundbalao;
var soundcoelhotriste;
var soundnhamnham;
var soundmurasama;
var balao;
var canW;
var canH;

function preload(){
  backgroundIMG=loadImage("background.png");
  melaoImage=loadImage("melon.png");
  mute=loadImage("mute.png");
  coelho=loadImage("Rabbit-01.png");
  blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  papinha=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  triste=loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  soundbackground=loadSound("sound1.mp3");
  soundbalao=loadSound("air.wav");
  soundcoelhotriste=loadSound("sad.wav");
  soundnhamnham=loadSound("eating_sound.mp3");
  soundmurasama=loadSound("rope_cut.mp3");
  blink.playing=true;
  papinha.playing=true;
  papinha.looping=false;
  triste.playing=true;
  triste.looping=false;
}
function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }

  engine = Engine.create();
  world = engine.world;
  corda=new Rope(8,{x:40,y:30});
  corda2=new Rope(7,{x:370,y:40});
  corda3=new Rope(4,{x:400,y:225});

  ground = new Ground(200,canH,600,20);
  var melao_options={
    density:0.001
  }
  melao=Bodies.circle(260,40,15,melao_options);
  Matter.Composite.add(corda.body,melao);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  imageMode(CENTER);
  melao_corda=new Link(corda,melao);
  melao_corda2=new Link(corda2,melao);
  melao_corda3=new Link(corda3,melao);
  butao=createImg("cut_button.png");
  butao.position(20,30);
  butao.size(50,50);
  butao.mouseClicked(a_morte_de_newton);

  butao2=createImg("cut_button.png");
  butao2.position(330,35);
  butao2.size(50,50);
  butao2.mouseClicked(a_morte_de_newton2);

  butao3=createImg("cut_button.png");
  butao3.position(360,200);
  butao3.size(50,50);
  butao3.mouseClicked(a_morte_de_newton3);

  blink.frameDelay=15;
  papinha.frameDelay=15;
  triste.frameDelay=15;
  coelho_nao_IMG=createSprite(250,canH-90,100,100);
  coelho_nao_IMG.addAnimation("piscando",blink);
  coelho_nao_IMG.addAnimation("hora do almoço",papinha);
  coelho_nao_IMG.addAnimation("mo fome",triste);
  coelho_nao_IMG.changeAnimation("piscando");
  
  coelho_nao_IMG.scale=0.2;
  balao=createImg("balloon.png");
  balao.position(10,200);
  balao.size(144,130);
  balao.mouseClicked(btbtbtbtbtb);

  soundbackground.play();
  soundbackground.setVolume(0.5);
}

function draw() 
{
  image(backgroundIMG,width/2,height/2,displayWidth+101,displayHeight);
  corda.show();
  corda2.show();
  corda3.show();
  Engine.update(engine);
  
  if(melao!==null ){
    image(melaoImage,melao.position.x,melao.position.y,60,60);
  }
  
  drawSprites();
  
  if(colisao(melao,coelho_nao_IMG)){
    coelho_nao_IMG.changeAnimation("hora do almoço");
    World.remove(engine.world,melao);
    melao=null;
    soundnhamnham.play();
    soundnhamnham.setVolume(1);
  }
  
  else if(melao!==null&&melao.position.y>650){
    coelho_nao_IMG.changeAnimation("mo fome");
    soundcoelhotriste.play();
    soundcoelhotriste.setVolume(1);
  }
  
}
function a_morte_de_newton(){
  corda.break();
  melao_corda.dettach();
  melao_corda=null;
  soundmurasama.play();
  soundmurasama.setVolume(1);
}

function colisao(body,sprite){
  if(body!==null){
    var alguma_coisa=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
    if(alguma_coisa<=81){
      return true;
    }
    else{
      return false;
    }
  }
}

function btbtbtbtbtb(){
  Body.applyForce(melao,{x:0,y:0},{x:0.01,y:0});
  soundbalao.play();
}

function a_morte_de_newton2(){
  corda2.break();
  melao_corda2.dettach();
  melao_corda2=null;
  soundmurasama.play();
  soundmurasama.setVolume(1);
}

function a_morte_de_newton3(){
  corda3.break();
  melao_corda3.dettach();
  melao_corda3=null;
  soundmurasama.play();
  soundmurasama.setVolume(1);
}