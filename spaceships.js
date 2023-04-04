//Vars 
const database = [
    {
      username: "p",
      password: "123",
    },

  ];



// Menu Div
var div_visible = "Welcome_div";
function toggleDiv(div_id) {
    if (div_id == "sign_in" || div_id == "log_in"){
        document.getElementById("menu").style.display = 'block';
    }

    if (div_id == "Welcome_div"){
        document.getElementById("menu").style.display = 'none';

    }
    document.getElementById(div_visible).style.display = 'none';
    document.getElementById(div_id).style.display = 'block';
    div_visible = div_id;
}



// Contact 
function mailSend() {
    let message = document.getElementById("message").value;
    let mailtoUrl = "mailto:reutme@post.bgu.ac.il" + "?subject=" + "&body=" + encodeURIComponent(message);

    window.location.href = mailtoUrl;
}

function addSmileToMessage() {
    var message = document.getElementById("message").value;
    var emoji = document.getElementById("smile").value;

    document.getElementById("message").value = message + emoji;
}

// Model Dialog
function model_dialog_open() {
    document.getElementById("myDialog").showModal();
}
function model_dialog_close() {
    document.getElementById("myDialog").close();
}

// Sign in

// // Validation of Sign Up 
// $(document).ready(function() {
// 	$("#sign_in_form").validate({
// 		rules: {
// 			username: {
// 				required: true,
// 				isUserExist: true
// 			},
// 			password: {
//                 required: true,
//                 minlength: 8,
// 				pattern: true
// 			},
//             confirm_password: {
//                 required: true,
//                 equalTo: '#password',
//                 minlength: 8,
// 				pattern: true
//               },
// 			firstname: {
// 				required: true,
// 				lettersonly : true
// 			},
//             lastname: {
// 				required: true,
// 				lettersonly : true
// 			},
// 			email: {
// 				required: true,
// 				email: true
// 			},
// 			birthday: {
// 				required: true
// 			}
// 		},
// 		messages: {
// 			username: {
// 				required: "Please enter a valid User Name",
// 				isUserExist: "The User Name already exist, Enter new valid User Name"
// 			},
// 			password: {
// 				required: "Please enter a valid Password",
//                 minlength: "Password must be at least 8 characters long",
// 				pattern: "Password must contain at least one letter and one number"
// 			},
//             confirm_password:{
//                 requied: "Please enter a Confirmation Password",
//                 equalTo:"Passwords must match",
//                 minlength: "Password must be at least 8 characters long",
// 				pattern: "Password must contain at least one letter and one number"
               
//             },
// 			firstname: {
// 				required: "Please enter your First Name",
// 				lettersonly: "Your name must contain letters only"
// 			},
//             lastname: {
// 				required: "Please enter your Name Name",
// 				lettersonly: "Your name must contain letters only"
// 			},
// 			email: {
// 				required: "Please enter a password",
// 				email: "Invalid email address, Please enter a valid email address"
// 			},
// 			birthday: {
// 				required: "Please enter your birthday"
// 			}
// 		},
// 		submitHandler: function() {
//             // TO DO: check if the new user added to the database and if the form reset automaticly without the code
// 			let user1 = document.getElementById("username").value;
// 			let password1 = document.getElementById("password").value;
// 			database.push({
//                 username: user1,
//                 password: password1,
//               },)
// 			// let form = $("#sign_in_form");
// 			// form[0].reset();
// 			toggleDiv('log_in');
// 		}
// 	});
// $(function() {
// 	$.validator.addMethod('isUserExist', function (user) {
// 		for (let i = 0; i < database.length; i++) {
//             if (database[i].username == user) {
// 			    return true;
//             }
//         return false;     
//         }
// 	});
// });





// Log in

function LogIn(){
   
    // let user = document.getElementById("uname").value;
    // let password = document.getElementById("psw").value;
    // if (isUserValid(user,password)){
        toggleDiv("configuration"); 
    // }
    // else{
//         //TO DO - model dialog
//         alert("not good");
//     }
 }
function isUserValid(user, pass) {
    for (let i = 0; i < database.length; i++) {
      if (database[i].username == user && database[i].password == pass) {
        return true;
      }
    }
    return false;
  }


//variables

var intervalTimer;
var then;
var keysDown;
// Play Game
function StartGame(){
toggleDiv("play_game"); 
setupGame();
}

function setupGame(){
var canvas = document.getElementById("Canvas");
var context = canvas.getContext("2d")
// draw a circle


  
// Hero image
var spacehero;
var spaceheroImage;
spaceheroImage = new Image();
spaceheroImage.src = "photos/spaceship.jpg";

var boomball;
var ballImage;
ballImage = new Image();
ballImage.src = "photos/boomball.jpg";


// Game objects
spacehero = {speed: 256 }; // movement in pixels per second

// Handle keyboard controls
keysDown = {};

// Check for keys pressed where key represents the keycode captured
addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;}, false);

addEventListener("keyup", function (e) {delete keysDown[e.keyCode];}, false);

newGame();
//   document.getElementById("btn").addEventListener("click", move, false);
function newGame() {
  reset();
  intervalTimer = setInterval(main, 1);
}

// Reset the player and bad spaceships positions when player start new game

function reset(){
// Reset player's position to centre of canvas
spacehero.x = canvas.width / 2;
spacehero.y = canvas.height-20;

// // Throw the monster somewhere on the screen randomly
// monster.x = 32 + (Math.random() * (canvas.width - 64));
// monster.y = 32 + (Math.random() * (canvas.height - 64));
}



function main() {

var now = Date.now();
var delta = now - then;
updatePositions(delta / 1000);
draw();	
then = now;

}


// Update game objects - change player position based on key pressed

function updatePositions(modifier) {	

if ((32 in keysDown) ) { // boom up
    boomball.x = spacehero.x;
    boomball.y = spacehero.y;
    intervalTimer = setInterval(drawBall, 1);
}

if ((38 in keysDown) ) { // Player holding up
    if(spacehero.y > canvas.height - (canvas.height * 0.4))
    spacehero.y -= spacehero.speed * modifier;
}
if ((40 in keysDown) ) { // Player holding down
    if(spacehero.y<=canvas.height-20)
    spacehero.y += spacehero.speed * modifier;
}

if (37 in keysDown) { // Player holding left
    if(spacehero.x>=0)
    spacehero.x -= spacehero.speed * modifier;
}
if (39 in keysDown) { // Player holding right
    if(spacehero.x<=canvas.width-20)
    spacehero.x += spacehero.speed * modifier;	
}



}

function drawBall(){
boomball.y = boomball.y - 10;
draw();
context.drawImage(ballImage, boomball.x, boomball.y,20, 20);
}



function draw() {
  // draw a circle
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.drawImage(spaceheroImage, spacehero.x, spacehero.y,20, 20);
}

}