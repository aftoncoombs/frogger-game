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
    this.lose = false;
	if (Math.abs(this.x - player.x) <= 50 & Math.abs(this.y - player.y) <= 50) {
		this.lose = true;
        player.active = false;
	}
    if (this.y >= 230 | this.y <= 50 | this.x <= 1 | this.x >= 420) {
        this.speed = this.speed * -1;
    }
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
    this.active = true;
};

Player.prototype.update = function (key, allEnemies) {
    var message = "";
    var gameOverFlag = false;

    // Set modal box message for win/lose
    winState = this.handleInput(key);
    if (winState) {
    	message = ("You won!");
    	gameOverFlag = true;
    } else if (enemy1.lose | enemy2.lose | enemy3.lose) {
    	message = ("Sorry! You lost!");
        this.x = 1;
        this.y = 300;
    	gameOverFlag = true;
    }

    // If the win or lose, then freeze player and display modal
    if (gameOverFlag){
    	var modal = document.getElementById("win-modal");
    	var modalText = document.getElementById("message");
        modalText.innerHTML = message;
        modal.style.display = "block";
    }
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleEnemy = function(enemy) {
	var lose = false;
	if (Math.abs(this.x - enemy.x) <= 10 | Math.abs(this.y - enemy.y) <= 10) {
		lose = true;
	}
	return(lose);
}

Player.prototype.handleInput = function (key) {
	win = false;

    // If the water is reached, then win
	if (this.y === -10) {
		win = true;
	}

    // Update position based on key
    if (this.active) {
        if (key === 'left' & this.x > -19) {
            this.x = this.x - 10;
        } else if (key === 'right' & this.x < 421) {
            this.x = this.x + 10;
        } else if (key === 'up' & this.y > -10) {
            this.y = this.y - 10;
        } else if (key === 'down' & this.y < 440) {
            this.y = this.y + 10;
        }
    }
    return(win);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
enemy1 = new Enemy(300,150,5);
enemy2 = new Enemy(100,200,-10);
enemy3 = new Enemy(200,150,20);
allEnemies = [enemy1, enemy2, enemy3];
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

// Close the modal box if "Try Again" is clicked. Reset player and enemies.
// Credit: Modal box functionality was used in a previous submission for the Udacity memory game project
window.onclick = function(event) {
    var modalButton = document.getElementById("modal-button");
    var modal = document.getElementById("win-modal");
    if (event.target == modalButton) {
        modal.style.display = "none";
    }
    player.x = 1;
    player.y = 300;
    player.active = true;
    enemy1.x = 300;
    enemy1.y = 150;
    enemy1.rate = 5;
    enemy2.x = 100;
    enemy2.y = 200;
    enemy2.rate = -10;
    enemy3.x = 200;
    enemy3.y = 150;
    enemy3.rate = 20;
}
