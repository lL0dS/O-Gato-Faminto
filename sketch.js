var gato, gatoIMG, mortoIMG;
var peixe, peixeIMG;
var fundo, fundoIMG;
var lixeira, lixeiraIMG;
var PLAY=1;
var END=0;
var estadoDoJogo=PLAY;
var ponto=0;
var pontoPeixe=0;
var chao;

function preload(){
    gatoIMG = loadAnimation("cat_running.gif")
    peixeIMG = loadImage("peixe2.png")
    fundoIMG = loadImage("fundo2.png");
    obstaculoIMG = loadImage("lixeira1.png")
    mortoIMG = loadAnimation("morto3.png");
}

function setup() {
    createCanvas(400,400)

    gato=createSprite(30,350,20,20);
    gato.addAnimation("gatoCorrendo",gatoIMG)
    gato.addAnimation("morto",mortoIMG);
    gato.scale=0.3;
    gato.setCollider("circle",0,80,30);
    //gato.debug=true;

    fundo=createSprite(1200,35,400,400);
    fundo.addImage("cidade",fundoIMG);
    
    chao=createSprite(30,390,1000,10);
    chao.visible=false;

    grupoP = createGroup();   
    grupoL = createGroup();
    }

function draw() {
    background("black");

    //console.log(gato.y)
    
    gato.depth=fundo.depth;
    gato.depth +=1;

    if(fundo.x==-800){
       fundo.x=fundo.width/2;
    }
      
    if(estadoDoJogo==PLAY){
        fundo.velocityX=-5;

        gato.collide(chao);

        if(keyDown("space")&& gato.y>=352){
            gato.velocityY=-8;
        }

        if(gato.isTouching(grupoP)){
            pontoPeixe = pontoPeixe +1;
            grupoP.destroyEach();
        }

        if(gato.isTouching(grupoL)){
            estadoDoJogo=END;
            gato.changeAnimation("morto",mortoIMG);
            gato.scale=0.1;
            gato.y+=20;
        }

        gato.velocityY=gato.velocityY+0.6;
        
        ponto = ponto + 1;

        peixe();
        lixo();
            
    }
    else if(estadoDoJogo==END){
        fundo.velocityX=0;
        grupoP.setVelocityXEach(0);
        grupoL.setVelocityXEach(0);
        gato.velocityY=0;

    }
    drawSprites();
    fill(0);
    text("Distância: "+ ponto,300,60);
    text("Peixes: "+ pontoPeixe,300,75);
}

function peixe(){
    if(frameCount % 100 ==0){
        var peixe=createSprite(500-Math.round(random(1,100)),330,30,30);
        peixe.velocityX= -5;
        peixe.scale=0.05;
        grupoP.add(peixe);
        peixe.addImage("peixeIMG",peixeIMG);
    }
}

function lixo(){
    if(frameCount % 60 ==0){
        var lixeira=createSprite(500-Math.round(random(1,100)),360+Math.round(random(1,20)),30,30);
        lixeira.velocityX= -5;
        lixeira.depth=gato.depth;
        gato.depth+=1;
        lixeira.scale=0.15;
        grupoL.add(lixeira);
        lixeira.addImage("lixoIMG",obstaculoIMG);
    }
}