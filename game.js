
//variables
var intervalTimer;
var intervalTimer2;
var then;
var keysDown;
var playerSizeWidht = 20;
var playerSizeHigh = 20;
var StartedGame = false;
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
var shotSpeed = 3;
var shotSize = 5;
var shotsArray;
var lastShotTime;
var shot;
var speedCounter;
var lastSpeedTime;
var totalScore;
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
    init_shotEnemies();
    // Check for keys pressed where key represents the keycode captured
    addEventListener("keydown", function (e) { updatePositions(e.keyCode); }, false);
    addEventListener("keyup", function (e) { delete keysDown[e.keyCode]; }, false);
    document.getElementById("new_game_btn").addEventListener("click", new_game, false);
    // add event listener for space bar key press
    addEventListener("keydown", function (e) {
        if (e.keyCode === 32) {
            handle_shots();
        }
    }, false);
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
    enemySpeed = 5;
    enemyImage = new Image(enemySizeWeight, enemySizeHeight);
    enemyImage.src = "photos/spaceship.jpg";
    let padding = 30;
    let enemyScore=20;
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
            enemiesArray[i][j].score = enemyScore;
            
        }
        initPositionY = initPositionY + enemySizeHeight + padding;
        enemyScore-=5;
    }

}

//<-------start new game------->

function new_game() {
    StartedGame = true;   ///To Do:  if the game stops = > change this to false
    reset();
    intervalTimer = setInterval(game_loop, 1000 / 60);

};

// Reset the player and bad spaceships positions when player start new game

function reset() {
    window.clearInterval(intervalTimer);
    // window.clearInterval(intervalTimer2);
    moveDirection = "right";
    context.clearRect(0, 0, canvas.width, canvas.height);
    init_player();
    init_enemies();
    init_shotEnemies();
    lastSpeedTime = 0;
    speedCounter = 0;
    totalScore = 0;


};
function updateSpeed() {
    const currentSpeedTime = new Date().getTime(); // Get the current timestamp
    const elapsedSpeedTime = currentSpeedTime - lastSpeedTime; // Calculate elapsed time since last shot
    // if 5 seconds passed, speed of enemies rise
    if (elapsedSpeedTime >= 5000 && speedCounter < 4) {
        speedCounter += 1;
        lastSpeedTime = currentSpeedTime;
        enemySpeed += 1;
    }
}

function game_loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw_player(spacehero.originX, spacehero.originY);
    updateEnemiesPosition();
    updateShotEnemies();
    updateSpeed();
}


//<-------change player position based on key pressed------->

function updatePositions(keyBtn) {
    if (StartedGame == false) {
        return;
    }
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

    // get the leftmost enemy's x position
    let leftmostEnemyX = canvas.width; // set initial value to be greater than canvas width
    for (let i = 0; i < enemiesArray.length; i++) {
        for (let j = 0; j < enemiesArray[i].length; j++) {
            let enemy = enemiesArray[i][j];
            if (enemy.alive && enemy.x < leftmostEnemyX) {
                leftmostEnemyX = enemy.x;
            }
        }
    }

    // check if the leftmost enemy has collided with the left border of the canvas
    if (leftmostEnemyX <= 0) {
        moveDirection = "right";
    }
    return moveDirection;
}

//<------- updateShotEnemies Enemies Position ------->

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

    draw_enemies();
}

//<-------draw player------->

function draw_player(originX, originY) {
    // context.clearRect(originX, originY, playerSizeWidht, playerSizeHigh);
    context.drawImage(spaceheroImage, spacehero.x, spacehero.y, playerSizeWidht, playerSizeHigh);
};

//<-------draw enemies------->

function draw_enemies() {
    // context.clearRect(0, 0, canvas.width, canvas.height * 0.6);
    for (let i = 0; i < enemiesArray.length; i++) {
        for (let j = 0; j < enemiesArray[i].length; j++) {
            let enemy = enemiesArray[i][j];
            if (enemy.alive) {
                context.drawImage(enemyImage, enemiesArray[i][j].x, enemiesArray[i][j].y, enemySizeWeight, enemySizeHeight);
            }
        }
    }
    // draw_player(spacehero.x, spacehero.y);
}



// initialize the player's shots
function init_shotEnemies() {
    shotsArray = new Array();
    lastShotTime = 0;

}

// handle the player's shots
function handle_shots() {
    const currentTime = new Date().getTime(); // Get the current timestamp
    const elapsed = currentTime - lastShotTime; // Calculate elapsed time since last shot
    //only if 2 seconds passed, can shot again
    if (elapsed >= 200) {
        lastShotTime = currentTime;
        shot = new Object();
        shot.x = spacehero.x + (playerSizeWidht / 2) - (shotSize / 2);
        shot.y = spacehero.y - shotSize;
        shot.speed = shotSpeed;
        shot.oldXPosition = x;
        shot.oldYPosition = y;
        shot.shotAlive = true;
        shotsArray.push(shot);
    }


}

// updateShotEnemies the positions of the player's shots
function updateShotEnemiesPosition(curShot) {
    let killed = false;
    if (curShot.shotAlive) {
        // Move the shot forward based on its speed
        curShot.oldXPosition = x;
        curShot.oldYPosition = y;
        curShot.y -= curShot.speed;
        // Check for collision with enemies
        for (let i = 0; i < enemiesArray.length; i++) {
            for (let j = 0; j < enemiesArray[i].length; j++) {
                let enemy = enemiesArray[i][j];
                if (enemy.alive &&
                    ((curShot.x <= (enemy.x + enemySizeWeight)) && ((curShot.x + shotSize) >= enemy.x)) &&
                    (curShot.y >= enemy.y && curShot.y <= enemy.y + enemySizeHeight)) {
                    // Collision detected, mark the enemy as destroyed
                    enemy.alive = false;
                    // Stop updating the position of the shot
                    curShot.shotAlive = false;

                    // Update score or other game mechanics as needed
                    totalScore += enemy.score;

                    console.log(totalScore);
                    return;

                }

            }

        }

        // Check if the shot has gone out of bounds
        if (curShot.y < 0) {
            // Shot is out of bounds, mark it as destroyed
            curShot.shotAlive = false;
            // const index2 = shotsArray.indexOf(curShot);
            // shotsArray.splice(index2, 1);
        }
    }
}

// draw the player's shots
function draw_shots(curShot) {
    if (curShot.shotAlive) {
        //clear old shot from the canvas
        // context.clearRect(0, 0, canvas.width, canvas.height );
        context.fillStyle = "red"; // Set color of the shot
        context.fillRect(curShot.x, curShot.y, shotSize, shotSize); // Draw a rectangle to represent the shot
    }
    else {
        // removes dead shot from the array
        const index = shotsArray.indexOf(curShot);
        shotsArray.splice(index, 1);
    }
}

// updateShotEnemies the game
function updateShotEnemies() {
    for (let i = 0; i < shotsArray.length; i++) {
        updateShotEnemiesPosition(shotsArray[i]);
        draw_shots(shotsArray[i]);
    }

}
