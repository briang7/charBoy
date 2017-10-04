'use strict';

var score = 100;

var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 400;
};


var Enemy = function(x, y) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = Math.floor((Math.random() * 200) + (Math.random() * 150) + 100);
};


 // Updates location of enemy and changes the speed each time they cross the board. 
// Also checks for collision and resets charboy and score.
Enemy.prototype.update = function(dt) {
  if(this.x <= 505){
    this.x += this.speed * dt;
  }else{
    this.speed = Math.floor((Math.random() * 200) + (Math.random() * 150) + 100);
    this.x = -2;
  }

  if (player.x >= this.x - 40
    && player.x <= this.x + 40){
    if(player.y >= this.y - 50
      && player.y <= this.y + 25) {
        player.reset();
        score-=1;
    }
  }
};

// draws bugs
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// resets char boy after collision or victory
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};

// draws char boy
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// moves charboy, also resets for victory and score
Player.prototype.update = function() {
  if(this.ctlKey === 'left' && this.x > 0){
    this.x = this.x - 10;
  } else if(this.ctlKey === 'right' && this.x != 400){
    this.x = this.x + 10;
  } else if(this.ctlKey === 'up'){
    this.y = this.y - 10;
  } else if (this.ctlKey === 'down' && this.y != 400){
    this.y = this.y + 10;
  }
  this.ctlKey = null;
  // Victory
  if(this.y < 20){
    score+=1;
    this.reset();
  }
};



Player.prototype.handleInput = function(e) {
  this.ctlKey = e;
};

// creates new player
var player = new Player();

// array of enemies
var allEnemies = [];

// creates new enemies and gives their starting locations
var addEnemies = function() {
  allEnemies.push(new Enemy(-150, 50));
  allEnemies.push(new Enemy(-2, 50));
  allEnemies.push(new Enemy(-150, 140));
  allEnemies.push(new Enemy(-2,140));
  allEnemies.push(new Enemy(-150,230));
  allEnemies.push(new Enemy(-2,230));
};
addEnemies();

/** This listens for key presses and sends the keys to your Player.handleInput() method. You don't need to modify this. */
document.addEventListener('keydown', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

