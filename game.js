

//variables
var intervalTimer;
var then;
var keysDown;
var playerSizeWidht = 20;
var playerSizeHigh = 20;

var enemySizeWeight = 20;
var enemySizeHeight = 20;
var spacehero;
var spaceheroImage;
var canvas;
var context;
var enemiesArray;
var enemyImage;
var enemySpeed;
var moveDirection = "right"; // initialize move direction to right



//<-------Play Game------->
function StartGame() {
    toggleDiv("play_game");
    setupGame();
}


//<-------initialize the game------->

function setupGame() {
    canvas = document.getElementById("Canvas");
    context = canvas.getContext("2d");

    init_player();
    init_enemies();
    init_shots();
    // Check for keys pressed where key represents the keycode captured
    addEventListener("keydown", function (e) { updatePositions(e.keyCode); }, false);
    addEventListener("keyup", function (e) { delete keysDown[e.keyCode]; }, false);
    document.getElementById("new_game_btn").addEventListener("click", new_game, false);
}

//<-------initialize the player------->

function init_player() {
    // Hero image
    spacehero = new Object();
    spacehero.speed = 10;

    spaceheroImage = new Image(playerSizeWidht, playerSizeHigh);
    spaceheroImage.src = "photos/spaceship.jpg";

    spacehero.x = canvas.width / 2;
    spacehero.y = canvas.height - playerSizeHigh;
}


//<-------initialize the enemies spaceships------->

function init_enemies() {
    enemySpeed = 10;
    enemyImage = new Image(enemySizeWeight, enemySizeHeight);
    enemyImage.src = "photos/spaceship.jpg";
    let padding = 20;
    enemiesArray = new Array(4);
    for (let i = 0; i < enemiesArray.length; i++) {
        enemiesArray[i] = new Array(5);
    }

    let initPositionY = 0;
    for (let i = 0; i < enemiesArray.length; i++) {
        let initPositionX = canvas.width / 2 - (4 * padding + 5 * enemySizeWeight) / 2
        for (let j = 0; j < enemiesArray[i].length; j++) {
            enemiesArray[i][j] = new Object();
            enemiesArray[i][j].x = initPositionX;
            initPositionX = initPositionX + enemySizeWeight + padding;
            enemiesArray[i][j].y = initPositionY;
            enemiesArray[i][j].alive = true;
            enemiesArray[i][j].image = enemyImage;
        }
        initPositionY = initPositionY + enemySizeWeight + padding;
    }

}

//<-------start new game------->

function new_game() {
    reset();
    draw_player(0, 0);
    move_enemies();
    shot();
    

};

// Reset the player and bad spaceships positions when player start new game

function reset() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    init_player();
    init_enemies();   
};


//<-------change player position based on key pressed------->

function updatePositions(keyBtn) {
    x = spacehero.x;
    y = spacehero.y;

    if ((38 == keyBtn)) { // Player holding up
        if (spacehero.y > canvas.height - (canvas.height * 0.4))
            spacehero.y -= spacehero.speed;

    }
    if ((40 == keyBtn)) { // Player holding down
        if (spacehero.y <= canvas.height - playerSizeHigh)
            spacehero.y += spacehero.speed;
    }

    if (37 == keyBtn) { // Player holding left
        if (spacehero.x >= 0)
            spacehero.x -= spacehero.speed;
    }
    if (39 == keyBtn) { // Player holding right
        if (spacehero.x <= canvas.width - playerSizeWidht)
            spacehero.x += spacehero.speed;
    }
    draw_player(x, y);

};
//<------- move enemies ------->
function shot(){
    intervalTimer = setInterval(updateShotsPosition,250);
}
function move_enemies() {
    intervalTimer = setInterval(updateEnemiesPosition, 250);
}

//<------- check enemies collision with border ------->

function checkEnemiesCollisionWithBorder(moveDirection) {
    // get the rightmost enemy's x position
    let rightmostEnemyX = 0;
    for (let i = 0; i < enemiesArray.length; i++) {
        for (let j = 0; j < enemiesArray[i].length; j++) {
        let enemy = enemiesArray[i][j];
        if (enemy.alive && enemy.x > rightmostEnemyX) {
            rightmostEnemyX = enemy.x;
        }
        }
    }

    // check if the rightmost enemy has collided with the right border of the canvas
    if (rightmostEnemyX + enemySizeWeight >= canvas.width) {
        moveDirection = "left";
    }
    if (enemiesArray[0][0].x < 0) {
        moveDirection = "right";
    }
    return moveDirection;
}

//<------- update Enemies Position ------->

function updateEnemiesPosition() {
    moveDirection = checkEnemiesCollisionWithBorder(moveDirection);
    for (let i = 0; i < enemiesArray.length; i++) {
        for (let j = 0; j < enemiesArray[i].length; j++) {
            let enemy = enemiesArray[i][j];
            if (enemy.alive) {
                if (moveDirection === "right") {
                    enemy.x += enemySpeed;
                } 
                else {
                    enemy.x -= enemySpeed;
                }
            }
        }
    }
    
    checkShotsCollisionWithEnemies();
    draw_enemies();
}

//<-------draw player------->

function draw_player(originX, originY) {
    context.clearRect(originX, originY, playerSizeWidht, playerSizeHigh);
    context.drawImage(spaceheroImage, spacehero.x, spacehero.y, playerSizeWidht, playerSizeHigh);
};

//<-------draw enemies------->

function draw_enemies() {
    //clear before draw
    context.clearRect(0, 0, (canvas.width), canvas.height * 0.4);
    let padding = 20;
    for (let i = 0; i < enemiesArray.length; i++) {
        for (let j = 0; j < enemiesArray[i].length; j++) {
            let enemy = enemiesArray[i][j];
            if (enemy.alive) {
                context.drawImage(enemyImage, enemiesArray[i][j].x, enemiesArray[i][j].y, enemySizeWeight, enemySizeHeight);
            }
        }
    }
}


// // terminate interval timer
// function stopTimer() {
//     window.clearInterval(intervalTimer);
// }



// variables
var shotsArray;
var shotSpeed = 10;
var shotSize = 5;

// initialize the player's shots
function init_shots() {
    shotsArray = new Array();
}

// handle the player's shots
function handle_shots() {
    var shot = new Object();
    shot.x = spacehero.x + (playerSizeWidht / 2) - (shotSize / 2);
    shot.y = spacehero.y - shotSize;
    shot.speed = shotSpeed;
    shotsArray.push(shot);
}

// update the positions of the player's shots
function updateShotsPosition() {
    for (var i = 0; i < shotsArray.length; i++) {
        shotsArray[i].y -= shotsArray[i].speed;
        if (shotsArray[i].y < 0) {
            shotsArray.splice(i, 1);
        }
    }
    draw_shots();
}

// check if the player's shots have hit an enemy
function checkShotsCollisionWithEnemies() {
    for (var i = 0; i < shotsArray.length; i++) {
        for (var j = 0; j < enemiesArray.length; j++) {
            for (var k = 0; k < enemiesArray[j].length; k++) {
                var enemy = enemiesArray[j][k];
                if (enemy.alive && shotsArray[i].x >= enemy.x && shotsArray[i].x <= enemy.x + enemySizeWeight && shotsArray[i].y <= enemy.y + enemySizeHeight) {
                    enemy.alive = false;
                    shotsArray.splice(i, 1);
                }
            }
        }
    }
}

// draw the player's shots
function draw_shots() {
    context.fillStyle = "#fff";
    for (var i = 0; i < shotsArray.length; i++) {
        context.fillRect(shotsArray[i].x, shotsArray[i].y, shotSize, shotSize);
    }
}

// update the game
function update() {
    updateShotsPosition();
    checkShotsCollisionWithEnemies();
    draw();
}

// add event listener for space bar key press
addEventListener("keydown", function (e) { 
    if (e.keyCode === 75) {
        handle_shots(); 
    }
}, false);