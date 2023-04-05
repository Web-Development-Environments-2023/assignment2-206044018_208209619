

//variables

var intervalTimer;
var then;
var keysDown;
var playerSizeWidht = 20;
var playerSizeHigh = 20;
var spacehero = new Object();
var spaceheroImage;
var canvas;
var context;

//<-------Play Game------->
function StartGame(){
toggleDiv("play_game"); 
setupGame();
}


//<-------initialize the game------->
function setupGame(){
canvas = document.getElementById("Canvas");
context = canvas.getContext("2d");

init_player();
// init_enemies();
// Check for keys pressed where key represents the keycode captured
addEventListener("keydown", function (e) {updatePositions(e.keyCode);}, false);
addEventListener("keyup", function (e) {delete keysDown[e.keyCode];}, false);
document.getElementById("new_game_btn").addEventListener("click",new_game,false);
}

//<-------initialize the player------->
function init_player(){
// Hero image
// spacehero = new Object();

spacehero.speed = 10;

spaceheroImage = new Image(playerSizeWidht, playerSizeHigh);
spaceheroImage.src = "photos/spaceship.jpg";

spacehero.x = canvas.width / 2;
spacehero.y = canvas.height-playerSizeHigh;
}	


//<-------initialize the enemies spaceships------->
function init_enemies(){

}

//<-------start new game------->
function new_game() {
// reset();
draw_player(0,0);
put_enemies();

};

// Reset the player and bad spaceships positions when player start new game

function reset(){
context.clearRect(0, 0, canvas.width, canvas,height);
init_player();
draw_player(0,0);
// init_enemies();
};


//<-------change player position based on key pressed------->

function updatePositions(keyBtn) {	

x=spacehero.x;
y=spacehero.y;


if ((38 == keyBtn) ) { // Player holding up
    if(spacehero.y > canvas.height - (canvas.height * 0.4))
    spacehero.y -= spacehero.speed;

}
if ((40 == keyBtn) ) { // Player holding down
    if(spacehero.y<=canvas.height-playerSizeHigh)
    spacehero.y += spacehero.speed;
}

if (37 == keyBtn) { // Player holding left
    if(spacehero.x>=0)
    spacehero.x -= spacehero.speed;
}
if (39 == keyBtn) { // Player holding right
    if(spacehero.x<=canvas.width-playerSizeWidht)
    spacehero.x += spacehero.speed;	
}

draw_player(x, y);

};


//<-------draw player------->
function draw_player(originX, originY) {
  context.clearRect(originX, originY ,playerSizeWidht, playerSizeHigh);
  context.drawImage(spaceheroImage, spacehero.x, spacehero.y ,playerSizeWidht, playerSizeHigh);
};
function put_enemies(){
intervalTimer = setInterval(draw_enemies, 1);
}

function draw_enemies(){

}



// terminate interval timer
function stopTimer()
{
window.clearInterval( intervalTimer );
} 


// window.addEventListener("load", setupGame, false)