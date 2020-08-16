// Create an array for the particles
 var particles = [];

 function createParticleArray(xPos, yPos, theCanvasContext)
 {
 // Adds 10 particles to the array with random positions
 for(var i = 0; i < 10; i++)
 {
 particles.push(new create(xPos, yPos));
 }
 renderP(theCanvasContext);
 }

 function create(startX, startY)
 {
 // Point of touch
 this.x = startX;
 this.y = startY;

 // Add random velocity to each particle
 this.vx = Math.random()*5-2;
 this.vy = Math.random()*5-2;

  //Random colours
  var red = Math.random()*255>>0;
  var green = Math.random()*255>>0;
  var blue = Math.random()*255>>0;
  this.color = "rgba("+red+", "+green+", "+blue+", 0.5)";

  //Random size
  this.radius = Math.random()*5;

  // fade value
  this.fade = Math.random()*500;

  // particle dead
  this.dead = false;
  }

  // Render and move the particle
  function renderP(theCanvasContext)
  {
  var aCanvasContext = theCanvasContext;
  aCanvasContext.globalCompositeOperation = "source-over";
  // Reduce the opacity of the BG paint
  aCanvasContext.fillStyle = "rgba(0, 0, 0, 0.3)";
  // Blend the particle with the background
  aCanvasContext.globalCompositeOperation = "lighter";

  // Render the particles
  for(var t = 0; t < particles.length; t++)
  {
  var p = particles[t];

  aCanvasContext.beginPath();

  // Mix the colours
  var gradient = aCanvasContext.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
  gradient.addColorStop(0, "white");
  gradient.addColorStop(0.4, "white");
  gradient.addColorStop(0.4, p.color);
  gradient.addColorStop(1, "black");

  aCanvasContext.fillStyle = gradient;
  aCanvasContext.arc(p.x, p.y, p.radius, Math.PI*2, false);
  aCanvasContext.fill();

  // Add velocity
  p.x += p.vx;
  p.y += p.vy;

  // Decrease fade and if particle is dead remove it
  p.fade -= 10;

  if(p.fade < 0)
  {
  p.dead = true;
  }

  if(p.dead == true)
  {
  particles.splice(t,1);
  }

  }
 }