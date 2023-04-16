
//variables
var canvas;
var intervalTimer;
var intervalTimer2;
var then;
var keysDown;
var playerSizeWidth = 30;
var playerSizeHeight = 30;
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
var moveDirection;
var shotEnemiesSpeed;
var shootPlayerSpeed;
var shotSize = 10;
var shotsArray;
var shootPlayerArray;
var lastShotTime;
var enemyPhoto;
var playerPhoto;
var shotImage;
var enemyShotImage;
var shot;
var speedCounter;
var lastSpeedTime;
var totalScore;
var playerLives;
var firstShootPlayer;
var enemyDeathSound;
var shotSound;
var playerHitSound;
var extraLifeSound;
var gameOverSound;
var backgroundMusic;
var WinSound;
var time; // variable to keep track of time
var timerInterval; // variable to store the interval ID
var userTimeInput;
var timeOver;
var playButton;
var pauseButton;
var heartFlag;
var clockFlag;
var clockImg;
var clockRandomX;
var clockRandomY;
var heartAndClockImgSize = 15;

//<-------------------------------------- Configuration -------------------------------------->

// choose Image for player 
function ChoosePlayer(photo_number) {
    if (photo_number == 1) {
        playerPhoto = "photos/player_photo1.jpg";
    }
    if (photo_number == 2) {
        playerPhoto = "photos/player_photo2.jpg";
    }
    if (photo_number == 3) {
        playerPhoto = "photos/player_photo3.jpg";
    }

}

// choose Image for Enemy
function ChooseEnemy(photo_number) {
    if (photo_number == 1) {
        enemyPhoto = "photos/enemy_photo1.jpg";
    }
    if (photo_number == 2) {
        enemyPhoto = "photos/enemy_photo2.jpg";
    }
    if (photo_number == 3) {
        enemyPhoto = "photos/enemy_photo3.jpg";
    }
}

// choose Image for player bullet
function Chooseshot(photo_number) {
    if (photo_number == 1) {
        shotImage = "photos/bullet_photo1.png";
    }
    if (photo_number == 2) {
        shotImage = "photos/bullet_photo2.png";
    }
    if (photo_number == 3) {
        shotImage = "photos/bullet_photo3.png";
    }

}

// choose Image for Enemy bullet
function ChooseshotE(photo_number) {
    if (photo_number == 1) {
        enemyShotImage = "photos/bullet_photo4.png";
    }
    if (photo_number == 2) {
        enemyShotImage = "photos/bullet_photo2.png";
    }
    if (photo_number == 3) {
        enemyShotImage = "photos/bullet_photo3.png";
    }

}

//<-------------------------------------- Play Game -------------------------------------->

//------- Start Game--------
function StartGame() {
    if (!checkConfigurationInput()) {
        return;
    }
    toggleDiv("play_game");
    setupGame();

}
function checkConfigurationInput() {
    // Get the user-specified time from the input field
    userTimeInput = document.getElementById("inputTime").value;
    // Convert the user input to a number
    time = parseInt(userTimeInput, 10);
    // Validate the user input to ensure it's a positive number
    if (!isNaN(time) && time > 0) {
        return true;
    } else {
        // Display an error message for invalid input
        alert("Please enter a valid positive number for time.");
    }
    
}


//-------initialize the game-------

function setupGame() {

    canvas = document.getElementById("Canvas");
    context = canvas.getContext("2d");

    init_player();
    init_enemies();
    init_shotEnemies();

    playButton = document.getElementById('playButton');
    pauseButton = document.getElementById('pauseButton');
    // Check for keys pressed where key represents the keycode captured
    addEventListener("keydown", function (e) {
        e.preventDefault();
        updatePlayerPosition(e.keyCode);
    }, false);
    addEventListener("keyup", function (e) { delete keysDown[e.keyCode]; }, false);
    document.getElementById("new_game_btn").addEventListener("click", new_game, false);
    document.getElementById("new_game_btn").addEventListener("click", new_game, false);
    // Add event listener for play button click
    playButton.addEventListener('click', function () {
        backgroundMusic.play(); // Play the background music
    });

    // Add event listener for pause button click
    pauseButton.addEventListener('click', function () {
        backgroundMusic.pause(); // Pause the background music
    });
    // add event listener for space bar key press
    addEventListener("keydown", function (e) {
        if (e.keyCode === 32) {
            handle_shots();
        }
    }, false);

    backgroundMusic = document.getElementById('backgroundMusic'); // Access the audio element by its ID
    backgroundMusic.volume = 0.3; 

    enemyDeathSound = new Audio('photos/shortEnemyHit.mp4');
    enemyDeathSound.volume = 0.5;

    shotSound = new Audio('photos/shoot.mp3');
    shotSound.volume = 0.5;

    playerHitSound = new Audio('photos/playerHit.wav');
    playerHitSound.volume = 0.8;

    extraLifeSound = new Audio('photos/extraLife.wav');
    extraLifeSound.volume = 0.5;

    gameOverSound = new Audio('photos/gameOverSound.wav');
    gameOverSound.volume = 0.7;

    WinSound = new Audio('photos/winSound.wav');
    gameOverSound.volume = 0.7;

    clockSound = new Audio('photos/clock sound.mp3');
    clockSound.volume = 0.5;


    heartImg = new Image(heartAndClockImgSize, heartAndClockImgSize);
    heartImg.src = "photos/heart.png";

    clockImg = new Image(heartAndClockImgSize, heartAndClockImgSize);
    clockImg.src = "photos/clockImg.png";
}

// -------initialize the player------- 

function init_player() {
    // Hero image
    spacehero = new Object();
    spacehero.speed = 10;
    spacehero.alive = true;

    shotEnemiesSpeed = 2;
    firstShootPlayer = true;


    spaceheroImage = new Image(playerSizeWidth, playerSizeHeight);
    spaceheroImage.src = playerPhoto;

    spacehero.x = canvas.width / 2;
    spacehero.y = canvas.height - playerSizeHeight;
}


// -------initialize the enemies spaceships------- 

function init_enemies() {
    moveDirection = "right"; // initialize move direction to right
    enemySpeed = 1;
    shootPlayerSpeed = 1;
    enemyImage = new Image(enemySizeWeight, enemySizeHeight);
    enemyImage.src = enemyPhoto;
    let padding = 30;
    let enemyScore = 20;
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
        enemyScore -= 5;
    }

}

// -------Start new game------- 

function new_game() {
    canvas.focus();
    StartedGame = true;   ///To Do:  if the game stops = > change this to false
    reset();
    intervalTimer = setInterval(game_loop, 1000 / 60);
    startTimer();

};

// Reset game

function reset() {
    const resetCanvasBackground = document.getElementById('Canvas');
    resetCanvasBackground.className = 'canvas';

    window.clearInterval(intervalTimer);
    context.clearRect(0, 0, canvas.width, canvas.height);
    init_player();
    init_enemies();
    init_shotEnemies();
    init_shootPlayer();

    lastSpeedTime = 0;
    speedCounter = 0;

    playerLives = 3;
    document.getElementById("featureLive").textContent = playerLives + " Lives!";

    totalScore = 0;
    document.getElementById("featureScore").textContent = 0 + " Points!";

    stopTimer();
    resetTimer();
    resetHeartAndClock();
    backgroundMusic.play();


};
function resetHeartAndClock() {
    heartRandomX = 20 + Math.random() * (canvas.width - heartAndClockImgSize - 20);
    const minY = canvas.height - (canvas.height * 0.4) + heartAndClockImgSize;
    const maxY = canvas.height - heartAndClockImgSize;
    heartRandomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
    heartFlag = false;
    clockRandomX = 20 + Math.random() * (canvas.width - heartAndClockImgSize - 20);
    const clockminY = canvas.height - (canvas.height * 0.4) + heartAndClockImgSize;
    const clockmaxY = canvas.height - heartAndClockImgSize;
    clockRandomY = Math.floor(Math.random() * (clockmaxY - clockminY + 1)) + clockminY;
    clockFlag = false;
}
// --exit game function--
function exit_game() {
    reset();
    setupGame();
    toggleDiv('Welcome_div');
    StartedGame = false;
    backgroundMusic.pause();


}

//--------- game loop --------
function game_loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (checkWinOrLose()) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        window.clearInterval(intervalTimer);
        StartedGame = false;
        stopTimer();
        backgroundMusic.pause();
        return;
    }
    draw_player(spacehero.originX, spacehero.originY);
    updateEnemiesPosition();
    updateShotEnemies();
    updateShootPlayer();
    updateSpeed();
    if (playerLives < 3 && heartFlag == false) {
        drawExtraLife();
        checkCollideWithHeart();
    }
    if (time <= 120 && clockFlag == false) {
        drawExtraTime();
        checkCollideWithClock();
    }



}

function checkWinOrLose() {
    if (spacehero.alive) {
        if (checkAllEnemiesDead()) { //space hero killed all enemies
            console.log("win- Champion!");
            const WinSoundInstance = WinSound.cloneNode();
            WinSoundInstance.play();
            const newcan = document.getElementById('Canvas');
            newcan.className = 'canvas-bg-winning';
            context.clearRect(0, 0, canvas.width, canvas.height);
            return true;
        }
    }

    else { //spacehero is dead
        console.log("You Lost - space hero died");
        context.clearRect(0, 0, canvas.width, canvas.height);
        const gameOverSoundInstance = gameOverSound.cloneNode();
        gameOverSoundInstance.play();
        const newcan = document.getElementById('Canvas');
        newcan.className = 'canvas-bg-losing';
        context.clearRect(0, 0, canvas.width, canvas.height);
        return true;
    }
    if (timeOver) { //time over
        if (totalScore < 100) {
            console.log("you can do better than " + totalScore + " points!");
            const gameOverSoundInstance = gameOverSound.cloneNode();
            gameOverSoundInstance.play();
        }
        else {
            console.log("Winner " + totalScore + " points!");
            const WinSoundInstance = WinSound.cloneNode();
            WinSoundInstance.play();
        }
        const newcan = document.getElementById('Canvas');
        newcan.className = 'canvas-bg-timeOver';
        return true;
    }
    return false;
}
//<-------change player position based on key pressed------->

function updatePlayerPosition(keyBtn) {
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
        if (spacehero.y <= canvas.height - playerSizeHeight)
            spacehero.y += spacehero.speed;
    }

    if (37 == keyBtn) { // Player holding left
        if (spacehero.x >= 0)
            spacehero.x -= spacehero.speed;
    }
    if (39 == keyBtn) { // Player holding right
        if (spacehero.x <= canvas.width - playerSizeWidth)
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
    context.drawImage(spaceheroImage, spacehero.x, spacehero.y, playerSizeWidth, playerSizeHeight);
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
}

// Changing the enemies speed 

function updateSpeed() {
    const currentSpeedTime = new Date().getTime(); // Get the current timestamp
    const elapsedSpeedTime = currentSpeedTime - lastSpeedTime; // Calculate elapsed time since last shot
    // if 5 seconds passed, speed of enemies rise
    if (elapsedSpeedTime >= 5000 && speedCounter < 4) {
        speedCounter += 1;
        lastSpeedTime = currentSpeedTime;
        enemySpeed += 1;
        shootPlayerSpeed += 0.5;

    }
}


// initialize the player's shots
function init_shotEnemies() {
    shotsArray = new Array();
    lastShotTime = 0;

}

// initialize the shoot player
function init_shootPlayer() {
    
    enemyShotImage1 = new Image(playerSizeWidth, playerSizeHeight);
    enemyShotImage1.src = enemyShotImage;

    shootPlayerArray = new Array();
}

// handle the player's shots
function handle_shots() {

    const currentTime = new Date().getTime(); // Get the current timestamp
    const elapsed = currentTime - lastShotTime; // Calculate elapsed time since last shot
    //only if 500 mili seconds passed, can shot again
    if (elapsed >= 500) {
        const shotSoundInstance = shotSound.cloneNode();
        shotSoundInstance.play();
        lastShotTime = currentTime;
        shot = new Object();
        shot.x = spacehero.x + (playerSizeWidth / 2) - (shotSize / 2);
        shot.y = spacehero.y - shotSize;
        shot.speed = shotEnemiesSpeed;
        shot.shotAlive = true;
        shotsArray.push(shot);
    }


}

// updateShotEnemies the positions of the player's shots and check collision with enemies
function updateShotEnemiesPosition(curShot) {
    if (curShot.shotAlive) {
        // Move the shot forward based on its speed
        curShot.y -= curShot.speed;
        // Check for collision with enemies
        for (let i = 0; i < enemiesArray.length; i++) {
            for (let j = 0; j < enemiesArray[i].length; j++) {
                let enemy = enemiesArray[i][j];
                if (enemy.alive &&
                    ((curShot.x <= (enemy.x + enemySizeWeight)) && ((curShot.x + shotSize) >= enemy.x)) &&
                    (curShot.y >= enemy.y && curShot.y <= enemy.y + enemySizeHeight)) {
                    // Collision detected, mark the enemy as destroyed
                    const enemyDeathSoundInstance = enemyDeathSound.cloneNode(); // Create a new audio instance
                    enemyDeathSoundInstance.play(); // Play the sound
                    enemy.alive = false;

                    // Stop updating the position of the shot
                    curShot.shotAlive = false;
                    // Update score or other game mechanics as needed
                    totalScore += enemy.score;
                    document.getElementById("featureScore").textContent = totalScore + " Points!";

                    return;
                }
            }
        }

        // Check if the shot has gone out of bounds
        if (curShot.y < 0) {
            // Shot is out of bounds, mark it as destroyed
            curShot.shotAlive = false;

        }
    }
}

// draw the player's shots
function drawshotEnemies(curShot) {
    if (curShot.shotAlive) {
        context.drawImage(shotImage1, curShot.x, curShot.y, shotSize, shotSize); //TO DO ->draw with image
        // context.fillStyle = "red"; // Set color of the shot
        // context.fillRect(curShot.x, curShot.y, shotSize, shotSize); // Draw a rectangle to represent the shot
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
        drawshotEnemies(shotsArray[i]);
    }

}

function shootPlayer() {
    //only if last bullet is 3/4 of the screen or dead, can shot again
    if (firstShootPlayer == true) {
        createShootEnemies();
    }
    else if (shootPlayerArray[shootPlayerArray.length - 1].shotAlive == false || shootPlayerArray[shootPlayerArray.length - 1].y > canvas.height * 0.75) {
        createShootEnemies();
    }
}
function createShootEnemies() {
    
    shotImage1 = new Image(shotSize, shotSize);
    shotImage1.src = shotImage;

    firstShootPlayer = false;
    shot = new Object();
    //choose random enemy
    let enemy = randomAliveEnemyToShoot();
    // let enemy = enemiesArray[0][0];
    shot.x = enemy.x + (enemySizeWeight / 2) - (shotSize / 2);
    shot.y = enemy.y - shotSize;
    shot.speed = shootPlayerSpeed;
    shot.shotAlive = true;
    shootPlayerArray.push(shot);
}
function randomAliveEnemyToShoot() {
    // Step 1: Create an array to store indices of alive enemies
    let aliveEnemiesIndices = [];

    // Step 2: Iterate through enemiesArray and push alive enemy indices into the array
    for (let i = 0; i < enemiesArray.length; i++) {
        for (let j = 0; j < enemiesArray[i].length; j++) {
            if (enemiesArray[i][j].alive) {
                aliveEnemiesIndices.push([i, j]);
            }
        }
    }

    // Step 3: Check if there are alive enemies and generate a random index
    if (aliveEnemiesIndices.length > 0) {
        let randomIndex = Math.floor(Math.random() * aliveEnemiesIndices.length);
        let randomEnemyIndex = aliveEnemiesIndices[randomIndex];
        let row = randomEnemyIndex[0];
        let col = randomEnemyIndex[1];

        // Step 4: Use the randomly selected alive enemy index to perform shooting action
        let randomEnemy = enemiesArray[row][col];
        return randomEnemy;
    } else {
        console.log("No alive enemies to shoot.");
    }
}

function updateShootPlayer() {
    shootPlayer();
    for (let i = 0; i < shootPlayerArray.length; i++) {
        updateShootPlayerPosition(shootPlayerArray[i]);
        drawShootPlayer(shootPlayerArray[i]);
    }
}

function updateShootPlayerPosition(curShot) {
    if (curShot.shotAlive) {
        // Move the shot forward based on its speed
        curShot.y += curShot.speed;
        // Check for collision with player
        if (spacehero.alive &&
            ((curShot.x <= (spacehero.x + playerSizeWidth)) && ((curShot.x + shotSize) >= spacehero.x)) &&
            (curShot.y >= spacehero.y && curShot.y <= spacehero.y + playerSizeHeight)) {
            // Collision detected, mark the enemy as destroyed

            const playerHitSoundInstance = playerHitSound.cloneNode(); // Create a new audio instance
            playerHitSoundInstance.play(); // Play the sound

            playerLives -= 1;
            document.getElementById("featureLive").textContent = playerLives + " Lives!";
            if (playerLives == 0) {
                spacehero.alive = false;
                //game over
                console.log("game over");
            }
            // Stop updating the position of the shot
            curShot.shotAlive = false;
            // reset players position to the start position
            spacehero.x = canvas.width / 2;
            spacehero.y = canvas.height - playerSizeHeight;
            return;
        }

        // Check if the shot has gone out of bounds
        if (curShot.y > canvas.height) {
            // Shot is out of bounds, mark it as destroyed
            curShot.shotAlive = false;
        }
    }
}

function drawShootPlayer(curShot) {
    if (curShot.shotAlive) {
        context.drawImage(enemyShotImage1, curShot.x, curShot.y, shotSize, shotSize); 
        // context.fillStyle = "white"; // Set color of the shot
        // context.fillRect(curShot.x, curShot.y, shotSize, shotSize); // Draw a rectangle to represent the shot
    }
}


function checkAllEnemiesDead() {
    for (let i = 0; i < enemiesArray.length; i++) {
        for (let j = 0; j < enemiesArray[i].length; j++) {
            if (enemiesArray[i][j].alive) {
                return false; // if any enemy is alive, return false
            }
        }
    }
    console.log("all enemies are dead");
    return true; // if no enemy is alive, return true

}


function startTimer() {
    // Start the timer by setting up an interval that increments the time variable every second
    timerInterval = setInterval(function () {
        time--;
        // Check if the timer has reached 0
        if (time <= 0) {
            stopTimer();
            
            timeOver = true;
        }
        if (time == 10) {
            //10 seconds left clock sound
            const clockSoundInstance = clockSound.cloneNode();
            clockSoundInstance.play();
        }
        document.getElementById("featureTime").textContent = "Time: " + time + " seconds";

    }, 1000); // 1000 milliseconds = 1 second
}
function stopTimer() {
    // Stop the timer by clearing the interval
    clearInterval(timerInterval);
}
function resetTimer() {
    timeOver = false;
    // Convert the user input to a number
    time = parseInt(userTimeInput, 10);
    document.getElementById("featureTime").textContent = "Time: " + time + " seconds";
}
function drawExtraLife() {
    heartAndClockImgSize = 15;
    context.drawImage(heartImg, heartRandomX, heartRandomY, heartAndClockImgSize, heartAndClockImgSize);
}

function drawExtraTime() {
    heartAndClockImgSize = 15;
    context.drawImage(clockImg, clockRandomX, clockRandomY, heartAndClockImgSize, heartAndClockImgSize);
}

function checkCollideWithHeart() {
    // Check for collision
    if (heartRandomX < spacehero.x + playerSizeWidth &&
        heartRandomX + heartAndClockImgSize > spacehero.x &&
        heartRandomY < spacehero.y + playerSizeHeight &&
        heartRandomY + heartAndClockImgSize > spacehero.y) {
        // Collision detected between image and player
        playerLives += 1;
        document.getElementById("featureLive").textContent = playerLives + " Lives!";
        const extraLifeSoundInstance = extraLifeSound.cloneNode();
        extraLifeSoundInstance.play();
        heartFlag = true;
    }
}

function checkCollideWithClock() {
    // Check for collision
    if (clockRandomX < spacehero.x + playerSizeWidth &&
        clockRandomX + heartAndClockImgSize > spacehero.x &&
        clockRandomY < spacehero.y + playerSizeHeight &&
        clockRandomY + heartAndClockImgSize > spacehero.y) {
        // Collision detected between image and player
        time += 10;
        document.getElementById("featureTime").textContent = "Time: " + time + " seconds";
        const extraLifeSoundInstance = extraLifeSound.cloneNode();
        extraLifeSoundInstance.play();
        clockFlag = true;
    }
}