// Enemies our player must avoid
var Enemy = function(pX, pY, pSpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = pX;
    this.y = pY;
    this.speed = pSpeed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    this.y = this.y + this.speed * dt;
    // to do: implement collision
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-cat-girl.png';
    this.x = 1;
    this.y = 300;
    this.speed = 1;
};

Player.prototype.update = function (key) {
    this.handleInput(key);
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    if (key === 'left' & this.x > -19) {
        this.x = this.x - 10;
    } else if (key === 'right' & this.x < 421) {
        this.x = this.x + 10;
    } else if (key === 'up' & this.y > -10) {
        this.y = this.y - 10;
    } else if (key === 'down' & this.y < 440) {
        this.y = this.y + 10;
    }
    // to do: player enemy collision resets game
    // to do: something happens when win
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
enemy1 = new Enemy(150,150,5);
enemy2 = new Enemy(100,200,-10);
enemy3 = new Enemy(200,150,20);
allEnemies = [enemy1, enemy2, enemy3]; // TO DO add random change in bug direction after x seconds
player = new Player;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
