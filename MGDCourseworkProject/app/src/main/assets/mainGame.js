class aSprite
{
    constructor(x, y, imageSRC)
    {
        this.zindex = 0;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.sImage = new Image();
        this.sImage.src = imageSRC;
    }
    // Getter
    get xPos()
    {
        return this.x;
    }

    get yPos()
    {
        return this.y;
    }

    // Setter
    set xPos(newX)
    {
        this.x = newX;
    }

    set yPos(newY)
    {
        this.y = newY;
    }

    // Method
    render()
    {
        canvasContext.drawImage(this.sImage,this.x, this.y);
    }
    // Method
      scrollBK(delta)
      {
      //var xPos = delta * this.vx;

        canvasContext.save();
        canvasContext.translate(-delta, 0);
        canvasContext.drawImage(this.sImage,0, 0);
        canvasContext.drawImage(this.sImage,this.sImage.width, 0);
        canvasContext.restore();
      }

    update(elapsed)
    {
        this.xPos += this.vx * elapsed;
        this.yPos += this.vy * elapsed;
    }

    // Method
    sPos(newX,newY)
    {
        this.x = newX;
        this.y = newY;
    }

    // Method
    sVel(newX, newY){
    this.vx = newX;
    this.vy = newY;
    }

    // Static Method
    static distance(a, b)
    {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.hypot(dx, dy);
    }

    // Method
      spriteType()
      {
        console.log('I am an instance of aSprite!!!');
      }
 }
//Background class--------------------------------------------------------------
class Enemy extends aSprite {
// Method
  spriteType()
  {
    super.spriteType();
    console.log('I am a ' + this.sType + ' instance of aSprite!!!');
  }
}


//Meteor Class--------------------------------------------------------------------
 class Ball extends aSprite
 {
    constructor(x, y, radius)
    {
        super(x, y, '');
        this.radius = radius;
        this.vx = Math.random() * 400 - 200;
    }

    render()
    {
        canvasContext.beginPath();
        canvasContext.fillStyle = 'blue';
        canvasContext.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        canvasContext.fill();
        canvasContext.closePath();
    }

    update(elapsed)
    {
        super.update(elapsed);
        this.sVel(this.vx, this.vy + (gravity * elapsed));
        if (this.y + this.radius > canvas.height)
        {
            this.y = canvas.height - this.radius - 1;
            this.vy = -1200;
            if(soundMgr != null) soundMgr.playSound(0); //Play ball hit sound
        }
        if (this.x + this.radius > canvas.width)
        {
            this.x = canvas.width - this.radius;
            this.vx = -this.vx;
        }
        if (this.x - this.radius < 0)
        {
            this.x = this.radius;
            this.vx = -this.vx;
        }
    }
 }

 //Ship Class--------------------------------------------------------------------
 class Paddle extends aSprite
 {
    constructor(x, y, imageSRC, sx, sy)
    {
        super(x, y, imageSRC);
        this.sx = sx;
        this.sy = sy;
        this.speed = 15;
    }

    render()
    {
        canvasContext.drawImage(this.sImage, this.x, this.y, this.sx, this.sy);
    }

    update(elapsed)
    {
        if (lastPt != null)
        {
            var dir = 1;
            var disSquared = Math.pow(this.x - (lastPt.x - this.sx * 0.5), 2);
            if (this.x > lastPt.x-this.sx*0.5) dir = -1;
            this.x += dir * this.speed * elapsed * ((disSquared / (this.speed* this.speed)));
            if (disSquared < 15) this.x = lastPt.x - this.sx * 0.5;
        }
    }
 }

 //Global variables
 var canvas;
 var canvasContext;
 var canvasX;
 var canvasY;
 var mouseIsDown = 0;
 var gravity = 1000;
//Meteors
//Had to change the variable names to get the game working
 var gBall;
 var gBall2;
 var gBall3;
 var gBall4;
 //Ship
 var gPaddle;
 //Background
 var bg;
 var lastPt = null;
 var startTimeMS;

 var score = 0;
 var health = 100;
 var gameOverScreen = false;

 document.write("<script src='particlesLight.js' type='text/javascript'></script>");

 var soundMgr;

 function resizeCanvas()
 {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
 }

 function load()
 {
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');
    canvasX = canvas.width/2
    canvasY = canvas.height-30;
    init();

    if(!gameOverScreen)
    {
        gameLoop();
        render();
    }

 }

function styleText(txtColour, txtFont, txtAlign, txtBaseline)
{
  canvasContext.fillStyle = txtColour;
  canvasContext.font = txtFont;
  canvasContext.textAlign = txtAlign;
  canvasContext.textBaseline = txtBaseline;
}
   //this code was taken from the canvasSetup js file

  //function aSprite(x, y, imageSRC, velx, vely)
    //{
   // this.zindex = 0;
   // this.x = x;
   // this.y = y;
   // this.vx = velx;
   // this.vy = vely;
   // this.sImage = new Image();
   // this.sImage.src = imageSRC;
   // }
   // aSprite.prototype.renderF = function(width, height)
   //  {
   //  canvasContext.drawImage(this.sImage,this.x, this.y, width, height );
   //  }
   //  aSprite.prototype.render = function()
   //  {
   //  canvasContext.drawImage(this.sImage,this.x, this.y);
   //  }
   //  aSprite.prototype.update = function(deltaTime)
   //  {
   //  this.x += deltaTime * this.vx;
   //  this.y += deltaTime * this.vy;
   //  }

 function init()
 {

    if (canvas.getContext)
    {
        //Set Event Listeners for window, mouse and touch

        window.addEventListener('resize', resizeCanvas, false);
        window.addEventListener('orientationchange', resizeCanvas, false);

        canvas.addEventListener("touchstart", touchDown, false);
        canvas.addEventListener("touchmove", touchXY, true);
        canvas.addEventListener("touchend", touchUp, false);

        document.body.addEventListener("touchcancel", touchUp, false);

        canvas.addEventListener("mousedown", mouseDown, false);
        canvas.addEventListener("mousemove", mouseDown, false);

        resizeCanvas();

        //code for the score Text and health Text that broke the game

        //styleText('#005A31', '16px impact', 'left', 'middle');
         //canvasContext.fillText("Score: "+score, 8, 20);
         //styleText('#005A31', '16px impact', 'left', 'middle');
         //canvasContext.fillText("Lives: "+lives, canvas.width, 20);

        //initialises the objects. For some reason the background refuses to work
        bg = new aSprite(0,0,"space.png", 100, 0, "Generic");
        gBall = new Ball(canvas.width * 0.5, canvas.height * 0.25, 20);
        gBall2 = new Ball(canvas.width * 0.5, canvas.height * 0.25, 20);
        gBall3 = new Ball(canvas.width * 0.5, canvas.height * 0.25, 20);
        gBall4 = new Ball(canvas.width * 0.5, canvas.height * 0.25, 20);
        gPaddle = new Paddle(0, canvas.height - 160, 'Ship.png', 80, 80);

        if (soundMgr != null) soundMgr.playMusic(0); //Play main music

        startTimeMS = Date.now();
        gameLoop();
    }
 }

 function gameLoop()
 {
    console.log("gameLoop");
    var elapsed = (Date.now() - startTimeMS)/1000;
    update(elapsed);
    render(elapsed);
    startTimeMS = Date.now();
    requestAnimationFrame(gameLoop);
 }

 function render(elapsed)
 {
    canvasContext.clearRect(0,0,canvas.width, canvas.height);
    //renders the game objects
    gBall.render();
    gBall2.render();
    gBall3.render();
    gBall4.render();
    gPaddle.render();

  //if(particles.length > 0)
    // {
     //    renderP(canvasContext);
    // }

    //if(gameOverScreen)
    //{

    //code for the game over screen. Fully coded but broke the game
    //Also updates the score and health texts

     //styleText('white', '30px Courier New', 'center', 'middle');
    // canvasContext.fillText("Game Over!!!!", canvas.width/2, canvas.height/2);
    // canvasContext.fillText("Your score is: "+score, canvas.width/2, canvas.height/2 + 40);
    // return;
    // }
     //score and lives text
    // styleText('#005A31', '16px impact', 'left', 'middle');
     //canvasContext.fillText("Score: "+score, 8, 20);
     //styleText('#005A31', '16px impact', 'left', 'middle');
     //canvasContext.fillText("Health: "+health, canvas.width-100, 20);

     //runs the collision detection function
     collisionDetection();

 }

 function update(elapsed)
 {
    //updates the objects per frame
    gBall.update(elapsed);
    gBall2.update(elapsed);
    gBall3.update(elapsed);
    gBall4.update(elapsed);
    gPaddle.update(elapsed);

    score++;
 }

//collision detection code implemented but commented out to run the game
 function collisionDetection()

 {
        //detects collision between Meteor1 and ship
        //    if((gMet.x >0 && gShip.x <0) && gMet.y + gShip.y >300) //&& gMet.y == gShip.y)
         //           {
        //                health--;
         //           }
             //detects collision between Meteor2 and ship
          //   if((gMet2.x + gShip.x <0) && gMet2.y + gShip.y >300) //&& gMet.y == gShip.y)
          //               {
           //                 health--;
           //              }
           //  //detects collision between Meteor3 and ship
           //  if((gMet3.x + gShip.x <0) && gMet3.y + gShip.y >300) //&& gMet.y == gShip.y)
            //             {
           //                 health--;
            //             }
           //  //detects collision between Meteor4 and ship
           //  if((gMet4.x + gShip.x <0) && gMet4.y + gShip.y >300) //&& gMet.y == gShip.y)
           //                   {
           //                       health--;
            //                  }
            //  else if health == 0)
             //                {
             //                    gameOverScreen = true;
//
              //               }
 }

 //touch events-----------------------------------------------------------------
 function touchUp(evt)
 {
    evt.preventDefault();
    // Terminate touch path
    lastPt=null;
 }

 function touchDown(evt)
 {
    evt.preventDefault();

    if(gameOverScreenScreen)
    {
        return;
    }
    touchXY(evt);
 }

 function touchXY(evt)
 {
    evt.preventDefault();
    //if(lastPt!=null)
     //{
      // var touchX = evt.touches[0].pageX - canvas.offsetLeft;
      // var touchY = evt.touches[0].pageY - canvas.offsetTop;
      // }
    lastPt = {x:evt.touches[0].pageX, y:evt.touches[0].pageY};
    //console.log("lastPt.x = " + lastPt.x + " lastPt.x = " + lastPt.y)
    //createParticleArray(lastPt.x, lastPt.y, canvasContext);
 }

 function mouseDown(evt)
 {
    evt.preventDefault();
    lastPt = { x: evt.pageX, y: evt.pageY };
 }