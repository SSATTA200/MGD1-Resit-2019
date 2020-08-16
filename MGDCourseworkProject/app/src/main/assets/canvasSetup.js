var canvas;
var canvasContext;
var canvasX;
var canvasY;
var mouseIsDown = 0;

var lastPt=null;
var startTimeMS;

var gameOverScreen = false;

document.write("<script src='particles.js' type='text/javascript'></script>");

//window.onload =
function load() {
canvas = document.getElementById('gameCanvas');
canvasContext = canvas.getContext('2d');
canvasX = canvas.width/2;
canvasY = canvas.height-30;

init();

if(!gameOverScreen)
{
gameLoop();
}

}

function aSprite(x, y, imageSRC, velx, vely)
{
this.zindex = 0;
this.x = x;
this.y = y;
this.vx = velx;
this.vy = vely;
this.sImage = new Image();
this.sImage.src = imageSRC;
}
aSprite.prototype.renderF = function(width, height)
 {
 canvasContext.drawImage(this.sImage,this.x, this.y, width, height );
 }
 aSprite.prototype.render = function()
 {
 canvasContext.drawImage(this.sImage,this.x, this.y);
 }
 aSprite.prototype.update = function(deltaTime)
 {
 this.x += deltaTime * this.vx;
 this.y += deltaTime * this.vy;
 }

 function init() {

 if (canvas.getContext) {
 //Set Event Listeners for window, mouse and touch

 window.addEventListener('resize', resizeCanvas, false);
 window.addEventListener('orientationchange', resizeCanvas, false);

 canvas.addEventListener("touchstart", touchDown, false);
 canvas.addEventListener("touchmove", touchXY, true);
 canvas.addEventListener("touchend", touchUp, false);

 document.body.addEventListener("touchcancel", touchUp, false);

 resizeCanvas();

 startTimeMS = Date.now();
 }
 }

 function resizeCanvas() {
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;
 }

 function gameLoop(){
 console.log("gameLoop");
 var elapsed = (Date.now() - startTimeMS)/1000;
 update(elapsed);
 render(elapsed);
 startTimeMS = Date.now();
 requestAnimationFrame(gameLoop);
 }

 function render(delta) {
 canvasContext.clearRect(0, 0, canvas.width, canvas.height);
 if(particles.length > 0)
 {
 renderP(canvasContext);
 }
 }
 function update(delta) {

  }

  function collisionDetection() {

  }

  function styleText(txtColour, txtFont, txtAlign, txtBaseline)
  {
  canvasContext.fillStyle = txtColour;
  canvasContext.font = txtFont;
  canvasContext.textAlign = txtAlign;
  canvasContext.textBaseline = txtBaseline;
  }

  function touchUp(evt) {
  evt.preventDefault();
  // Terminate touch path
  lastPt=null;
  }

  function touchDown(evt) {
  evt.preventDefault();
  if(gameOverScreen) {
  return;
  }
  touchXY(evt);
  }

  function touchXY(evt) {
  evt.preventDefault();
  if(lastPt!=null) {
  var touchX = evt.touches[0].pageX - canvas.offsetLeft;
  var touchY = evt.touches[0].pageY - canvas.offsetTop;
  }
  lastPt = {x:evt.touches[0].pageX, y:evt.touches[0].pageY};
  console.log("lastPt.x = " + lastPt.x + " lastPt.x = " + lastPt.y)
  createParticleArray(lastPt.x, lastPt.y, canvasContext);
  }