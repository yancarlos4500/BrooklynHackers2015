$(document).ready(function(){
    
  
    
var counter = 0;
var seconds = 0;
var score = 0;
var ship={x: 0, y: 0, health: 100, speed:20, height: 150, width: 150};
var enemies=[];
var gameOver = false;


var player = $("#Player");

DetectKey();
CreateEnemy();


//Move ship functions

function moveUp (){
    ship.y = ship.y - ship.speed;
}

function moveDown (){
    ship.y = ship.y + ship.speed;
}

function moveLeft (){
    ship.x = ship.x - ship.speed;
}

function moveRight (){
    ship.x = ship.x + ship.speed;
}

function DetectKey()
{
    
    $("body").keydown(function(event)
    {
        
        
        if(event.which == 37)
        {
            if(player.position().left - 30 >= 0)
            {
                moveLeft();// Moves player left
            }
        }
        else if(event.which == 38)
        {
            if(player.position().top - 30 >= 0)
            {
               moveUp(); // Moves player up
            }
        }
        
         else if(event.which == 39)
        {
             if(player.position().left + player.width() + 30 <= $(window).outerWidth())
            {
                moveRight();  // Moves player right
            }
        }
        else if(event.which == 40)
        {
            if(player.position().top + player.height() + 30 <= $(window).outerHeight())
            {
               moveDown();
            }
        }
    });

}


function drawShip(){
    
    player.css("top", ship.y + "px");
    player.css("left", ship.x + "px");
    
    
}

var IDEnemy = 1;

function CreateEnemy()
{
    
    var img = document.createElement("img");
    img.src = "http://www.asteroidmission.org/wp-content/themes/osiris/public_assets/images/bennu-rendered.png";
    img.className = "asteroids";
    
    var enemy = {};
    enemy.x = Math.floor((Math.random() *  ($(window).outerWidth()) - 100) + 1);
    enemy.y = 0;
    enemy.speed = 1;
    enemy.height = 50;
    enemy.width = 56;
    enemy.id = "enemy" + IDEnemy;
    
    img.id = enemy.id
    $("body").append(img);
    
    enemy.sel = $('#' + enemy.id);
    enemies.push(enemy);
    
    IDEnemy++;
    
    console.log("working");
}

function drawEnemy(enemy)
{
    enemy.sel.css("left", enemy.x + "px");
    enemy.sel.css("top", enemy.y + "px");
}

function updateEnemies () {
  for (var i = 0; i < enemies.length; i++){
      updateEnemy(enemies[i]);
  }
}

function updateEnemy(enemy){
  enemy.y = enemy.y + enemy.speed;
}


    
function CheckifAsteroidPassScreen()
{
     $('.asteroids').each(function(asteroid) {
      if ($(this).position().top >= $(window).outerHeight())
      {
        
        $(this).remove();
    
        score++;
    
        $('.panel-body center').text(score);
     }
     });
}
    
function drawEnemies(){
  for (var i = 0; i < enemies.length; i++){
      drawEnemy(enemies[i]);
  }
}


function checkShipCollision() {
  for (var i = 0; i < enemies.length; i++){
     var enemy = enemies[i];
     if (didEnemyHitShip(enemy)){
       shipHitBy(enemy);
     }
  }
}

function shipHitBy(enemy) {
  console.log("HIT!");
  gameOver = true;
  window.location.href = "loose.html?score=" + score;
}

function didEnemyHitShip(enemy){
  //Google Helps 
  //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
//   console.log("enemy x: " +enemy.x);
//   console.log("enemy y: " +enemy.y);
//   console.log("enemy height: " +enemy.height);
//   console.log("enemy width: " +enemy.width);
//   console.log("ship x: " +ship.x);
//   console.log("ship y: " +ship.y);
//   console.log("ship height: " +ship.height);
//   console.log("ship width: " +ship.width);
  
  return (enemy.x < ship.x + ship.width &&
   enemy.x + enemy.width > ship.x &&
   enemy.y < ship.y + ship.height &&
   enemy.height + enemy.y > ship.y);
}
    
function gameLoop() {
  if(counter == 60)
  {
      seconds++;
      console.log("Seconds");
      if(seconds == 3)
      {
            console.log("New Enemy");
          CreateEnemy();
          seconds = 0;
      }
      
      counter = 0;
  }
  
  counter++;
  
  updateEnemies();
  checkShipCollision();
  drawEnemies();
  drawShip();
  CheckifAsteroidPassScreen();
  window.requestAnimationFrame(gameLoop);
}

gameLoop();

});
