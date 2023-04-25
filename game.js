
//variables
var canvas;
var intervalTimer;
var intervalTimer2;
var then;
var keysDown;
var playerSizeWidth = 35;
var playerSizeHeight = 35;
var StartedGame = false;
var enemySizeWeight = 35;
var enemySizeHeight = 30;
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
var time;
var timerInterval;
var timeOver;
var playButton;
var pauseButton;
var heartFlag;
var clockFlag;
var clockImg;
var clockRandomX;
var clockRandomY;
var heartAndClockImgSize = 25;
var canPlay;
var shootingKey;
var modal;
var btnYes;
var btnNo;
var table;
var currentTimeChosen;
var keysDown = {};

//<-------------------------------------- Play Game -------------------------------------->

//------- Start Game--------
function StartGame() {
    if (!checkConfigurationInputCorrect()) {
        return;
    }
    setupGame();
    resetConfig();
    changeDiv("play_game");
    document.getElementById("featureUser").textContent = activeUser;

}

//-------initialize the game-------

function setupGame() {
    // Store the user's selected key
    canvas = document.getElementById("Canvas");
    context = canvas.getContext("2d");

    init_player();
    init_enemies();
    init_shotEnemies();

    playButton = document.getElementById('playButton');
    pauseButton = document.getElementById('pauseButton');

    // Add event listeners for keydown and keyup
    window.addEventListener('keydown', function (e) {
        keysDown[e.keyCode] = true;
    });
    window.addEventListener('keyup', function (e) {
        delete keysDown[e.keyCode];
    });

    document.getElementById("new_game_btn").addEventListener("click", new_game, false);
    document.getElementById("new_game_btn").addEventListener("click", new_game, false);

    playButton.addEventListener('click', function () {
        backgroundMusic.play(); // Play the background music
    });

    pauseButton.addEventListener('click', function () {
        backgroundMusic.pause(); // Pause the background music
    });
    addEventListener('keydown', function (e) {
        if (shootingKey && e.key && typeof shootingKey === 'string' && e.key.toLowerCase() === shootingKey.toLowerCase()) {
            handle_shots();
        }
    }, false);


    backgroundMusic = document.getElementById('backgroundMusic'); // Access the audio element by its ID
    backgroundMusic.volume = 0.1;

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

    clockImg = new Image(heartAndClockImgSize + 10, heartAndClockImgSize + 10);
    clockImg.src = "photos/oldClockImg.png";


    userTimeInput = document.getElementById('inputTime').value;;
    time = parseInt(userTimeInput);



}

// -------initialize the player------- 

function init_player() {
    spacehero = new Object();
    spacehero.speed = 10;
    spacehero.alive = true;

    shotEnemiesSpeed = 3;
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

    let enemyImageRow = 1;
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
            let enemyImage = new Image(enemySizeWeight, enemySizeHeight);
            enemyImage.src = "photos/enemy" + enemyImageRow + ".png";
            enemiesArray[i][j].image = enemyImage;
            enemiesArray[i][j].score = enemyScore;

        }
        initPositionY = initPositionY + enemySizeHeight + padding;
        enemyScore -= 5;
        enemyImageRow += 1;

    }

}

// -------Start new game------- 

function new_game() {
    canvas.focus();
    StartedGame = true;
    reset();
    intervalTimer = setInterval(game_loop, 8);
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
    document.getElementById("featureLive").textContent = playerLives + " Lives";

    totalScore = 0;
    document.getElementById("featureScore").textContent = 0 + " Points";


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
    clockRandomX = 30 + Math.random() * (canvas.width - heartAndClockImgSize - 20);
    const clockminY = canvas.height - (canvas.height * 0.4) + heartAndClockImgSize + 10;
    const clockmaxY = canvas.height - heartAndClockImgSize;
    clockRandomY = Math.floor(Math.random() * (clockmaxY - clockminY + 1)) + clockminY;
    clockFlag = false;
}

// --exit game function--
function exit_game() {
    reset();
    setupGame();
    changeDiv('Welcome_div');
    StartedGame = false;
    backgroundMusic.pause();

}

//--------- game loop --------
function game_loop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (checkWinOrLose()) {
        window.clearInterval(intervalTimer);
        StartedGame = false;
        stopTimer();
        backgroundMusic.pause();
        displayScoreHistory(activeUser);
        showGameOverMessage();

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
    if (time <= 110 && clockFlag == false) {
        drawExtraTime();
        checkCollideWithClock();
    }

}

function checkWinOrLose() {
    if (spacehero.alive) {
        if (checkAllEnemiesDead()) { //space hero killed all enemies
            showWinOrLoseMessage('Champion!');
            const WinSoundInstance = WinSound.cloneNode();
            WinSoundInstance.play();
            saveScore(activeUser, totalScore, "Win");
            return true;
        }
    }

    else { //spacehero is dead
        showWinOrLoseMessage('You Lost!');
        const gameOverSoundInstance = gameOverSound.cloneNode();
        gameOverSoundInstance.play();
        saveScore(activeUser, totalScore, "Lose");

        return true;
    }
    if (timeOver) { //time over
        if (totalScore < 100) {
            YouCanDoBetterMsg('You can do better than ' + totalScore + ' points!');
            const gameOverSoundInstance = gameOverSound.cloneNode();
            gameOverSoundInstance.play();
            saveScore(activeUser, totalScore, "Lose");

        }
        else {
            showWinOrLoseMessage('Winner ' + totalScore + ' points!');
            const WinSoundInstance = WinSound.cloneNode();
            WinSoundInstance.play();
            saveScore(activeUser, totalScore, "Win");

        }
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
    // draw_player(x, y);

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
    for (let i = 0; i < enemiesArray.length; i++) {
        for (let j = 0; j < enemiesArray[i].length; j++) {
            let enemy = enemiesArray[i][j];
            if (enemy.alive) {
                context.drawImage(enemy.image, enemiesArray[i][j].x, enemiesArray[i][j].y, enemySizeWeight, enemySizeHeight);
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
                    document.getElementById("featureScore").textContent = totalScore + " Points";
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
    shot.x = enemy.x + (enemySizeWeight / 2) - (shotSize / 2);
    shot.y = enemy.y - shotSize;
    shot.speed = shootPlayerSpeed;
    shot.shotAlive = true;
    shootPlayerArray.push(shot);
}
function randomAliveEnemyToShoot() {
    let aliveEnemiesIndices = [];
    for (let i = 0; i < enemiesArray.length; i++) {
        for (let j = 0; j < enemiesArray[i].length; j++) {
            if (enemiesArray[i][j].alive) {
                aliveEnemiesIndices.push([i, j]);
            }
        }
    }

    if (aliveEnemiesIndices.length > 0) {
        let randomIndex = Math.floor(Math.random() * aliveEnemiesIndices.length);
        let randomEnemyIndex = aliveEnemiesIndices[randomIndex];
        let row = randomEnemyIndex[0];
        let col = randomEnemyIndex[1];

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
            document.getElementById("featureLive").textContent = playerLives + " Lives";
            if (playerLives == 0) {
                spacehero.alive = false;
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
        document.getElementById("featureTime").textContent = time + " seconds";

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
    document.getElementById("featureTime").textContent = time + " seconds";
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
        document.getElementById("featureLive").textContent = playerLives + " Lives";
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
        document.getElementById("featureTime").textContent = time + " seconds";
        const extraLifeSoundInstance = extraLifeSound.cloneNode();
        extraLifeSoundInstance.play();
        clockFlag = true;
    }
}

function showWinOrLoseMessage(message) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "bold 50px 'Permanent Marker', cursive";
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.shadowColor = 'rgba(0, 0, 0, 0.5)';
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.fillText(message, canvas.width / 2, 80);
}

function YouCanDoBetterMsg(message) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let fontSize = 30;
    context.font = `bold ${fontSize}px 'Permanent Marker', cursive`;
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.shadowColor = 'rgba(0, 0, 0, 0.5)';
    context.shadowBlur = 10;
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.fillText(message, canvas.width / 2, 80);
}


// Get modal element and buttons
modal = document.getElementById('gameOverModal');
btnYes = document.getElementById('btnYes');
btnNo = document.getElementById('btnNo');
// Get the modal overlay and modal content
var modalOverlay = document.getElementById('gameOverModal');
var modalContent = document.querySelector('.modal-content');


// Add event listener to game over event or condition where you want to show the message
function showGameOverMessage() {
    modal.style.display = 'block';
}

// Add event listener to Yes button
btnYes.addEventListener('click', () => {
    // Define action for Yes button
    reset();
    setupGame();
    changeDiv("configuration");
    StartedGame = false;
    backgroundMusic.pause();
    console.log('Yes button clicked');
    modal.style.display = 'none';
});

// Add event listener to No button
btnNo.addEventListener('click', () => {
    modal.style.display = 'none';
    console.log('No button clicked');
});

// To close the modal if clicked outside of the modal content
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});


// Add event listener to modal overlay to close modal on click outside modal content
modalOverlay.addEventListener('click', function (event) {
    if (event.target === modalOverlay) {
        modalOverlay.style.display = 'none';
    }
});



// Function to add a score for the active user
function saveScore(activeUser, score, gameStatus) {
    // Find the user object in the database based on the username
    var user = database.find(function (user) {
        return user.username === activeUser;
    });

    // If user is found, add the score with timestamp and game status to their scores array
    if (user) {
        var currentTime = new Date();
        var scoreObject = {
            score: score,
            timestamp: currentTime,
            gameStatus: gameStatus
        };
        user.scores.push(scoreObject);
    }
}

// Function to display history of scores for the active user
function displayScoreHistory(activeUser) {
    var user = database.find(function (user) {
        return user.username === activeUser;
    });

    if (user) {
        var tableWidth = 600;
        var tableHeight = (Math.min(user.scores.length, 10) + 1) * 30;
        var tableX = (canvas.width - tableWidth) / 2 + 120;
        var tableY = (canvas.height - tableHeight) / 2 + 50;
        var rowHeight = 30;
        var colWidth = 200;
        var headerColor = "white";
        var rowColor = "white";
        var textColor = "white";
        var headerFont = "bold 20px fantasy";
        var rowFont = "16px fantasy";

        context.fillStyle = headerColor;
        context.font = headerFont;
        context.fillStyle = textColor;
        context.fillText("Date", tableX, tableY);
        context.fillText("Score", tableX + colWidth, tableY);
        context.fillText("Status", tableX + colWidth * 2, tableY);

        context.fillStyle = rowColor;
        context.font = rowFont;
        context.fillStyle = textColor;
        for (var i = 0; i < Math.min(user.scores.length, 10); i++) {
            var scoreObject = user.scores[user.scores.length - i - 1]; // Get score object from the end of the array
            var score = scoreObject.score;
            var timestamp = scoreObject.timestamp;
            var gameStatus = scoreObject.gameStatus;
            var rowY = tableY + (i + 1) * rowHeight;
            if (i === 0) {
                // Mark the last score with a special color
                context.fillStyle = "red";
                context.fillText(timestamp.toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                }), tableX, rowY);
                context.fillText(score, tableX + colWidth, rowY);
                context.fillText(gameStatus, tableX + colWidth * 2, rowY);
                context.fillStyle = textColor;
            } else {
                context.fillText(timestamp.toLocaleString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric"
                }), tableX, rowY);
                context.fillText(score, tableX + colWidth, rowY);
                context.fillText(gameStatus, tableX + colWidth * 2, rowY);
            }
        }
    }
}

