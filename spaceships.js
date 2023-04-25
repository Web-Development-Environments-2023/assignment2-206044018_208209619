var activeUser; // after log in this will be the active user
var userTimeInput;

var database = [
  {
    username: "p",
    password: "testuser",
    scores: [],
  }
];
// Function to add event listener for game controls
function addGameControlsListener() {
  addEventListener("keydown", gameControlsHandler, false);
}

// Function to remove event listener for game controls
function removeGameControlsListener() {
  removeEventListener("keydown", gameControlsHandler, false);
}

// Event handler for game controls
function gameControlsHandler(e) {
  e.preventDefault();
  updatePlayerPosition(e.keyCode);
}

// Menu Div
var div_visible = "Welcome_div";
function changeDiv(div_id) {
  if (div_visible == "sign_in") {
    resetFormSignIn();
  }
  if (div_visible == "log_in") {
    resetLogin();
  }


  if (div_id == "play_game") {
    document.getElementById(div_visible).style.display = 'none';
    document.getElementById(div_id).style.display = 'block';
    div_visible = div_id;
    document.body.style.background = "url('photos/space_star.jpg')";
    document.body.style.backgroundSize = 'cover';
    addGameControlsListener();
    return;
  }

  else {
    removeGameControlsListener();
    document.getElementById(div_visible).style.display = 'none';
    document.getElementById(div_id).style.display = 'block';
    div_visible = div_id;
    document.body.style.background = "url('photos/space2.gif')";
    document.body.style.backgroundSize = 'cover';
  }
  if (div_visible == "configuration") {
    resetConfig();
  }
}



function changeToHome(toDiv) {
  if (div_visible == "play_game") {
    exit_game();
  }
  else {
    changeDiv(toDiv)
  }

}

// Model Dialog for about
function model_dialog_open() {
  document.getElementById("myDialog").showModal();
}
function model_dialog_close() {
  document.getElementById("myDialog").close();
}

document.getElementById("myDialog").addEventListener("click", function (event) {
  // Close the dialog if the click target is the overlay element
  if (event.target == this) {
    this.close();
  }
});

// Model Dialog for instraction
function insta_dialog_open() {
  document.getElementById("myInstraction").showModal();
}
function insta_dialog_close() {
  document.getElementById("myInstraction").close();
}

document.getElementById("myInstraction").addEventListener("click", function (event) {
  // Close the dialog if the click target is the overlay element
  if (event.target == this) {
    this.close();
  }
});




//  ------------- log in ------------- 
function LogIn() {

  let user = document.getElementById("uname").value;
  let password = document.getElementById("psw").value;
  if (isUserValid(user, password)) {
    changeDiv("configuration");
    activeUser = user;

    resetLogin();
  }
}

function isUserValid(user, pass) {
  for (let i = 0; i < database.length; i++) {
    if (database[i].username === user) {
      if (database[i].password === pass) {
        return true;
      }
      else { // found the user but its not his password
        alert("Wrong password");
        return false;
      }
    }
  }
  alert("User does not exist");
  return false;
}
function cancelLogIn() {
  resetLogin();
  changeDiv('Welcome_div');
}
function resetLogin() {
  document.getElementById("uname").value = "";
  document.getElementById("psw").value = "";
}

//  ------------- Sign in ------------- 

// Validation of Sign Up 
$(document).ready(function () {
  $("#sign_in_form").validate({
    rules: {
      username: {
        required: true,
        isUserExist: true
      },
      password: {
        required: true,
        minlength: 8,
        pattern: true
      },
      confirm_password: {
        required: true,
        equalTo: '#password',
        minlength: 8,
        pattern: true
      },
      firstname: {
        required: true,
        isLettersOnly: true
      },
      lastname: {
        required: true,
        isLettersOnly: true
      },
      email: {
        required: true,
        validEmail: true
      },
      birthday: {
        required: true
      }
    },
    messages: {
      username: {
        required: "Please enter a valid User Name",
        isUserExist: "The User Name already exist, Enter new valid User Name"
      },
      password: {
        required: "Please enter a valid Password",
        minlength: "Password must be at least 8 characters long",
        pattern: "Password must contain at least one letter and one number"
      },
      confirm_password: {
        required: "Please enter a Confirmation Password",
        equalTo: "Passwords must match",
        minlength: "Password must be at least 8 characters long",
        pattern: "Password must contain at least one letter and one number"

      },
      firstname: {
        required: "Please enter your First Name",
        isLettersOnly: "Your name must contain letters only"
      },
      lastname: {
        required: "Please enter your Last Name",
        isLettersOnly: "Your name must contain letters only"
      },
      email: {
        required: "Please enter your email",
        validEmail: "Please enter a valid email address"
      },
      birthday: {
        required: "Please enter your birthday"
      }
    },

    submitHandler: function () {
      let user1 = document.getElementById("username").value;
      let password1 = document.getElementById("password").value;
      database.push({
        username: user1,
        password: password1,
        scores: [],
      },)
      
      console.log(user1 + " and " + password1 + " added to the database");
      resetFormSignIn();
      changeDiv('Welcome_div');
    }
  });
  $.validator.addMethod('pattern', function (value, element) {
    return this.optional(element) || /^(?=.*[a-zA-Z])(?=.*\d)/.test(value);
  }, "Password must contain at least one letter and one number");
  $.validator.addMethod('isLettersOnly', function (value, element) {
    // Use a regular expression to match only letters (a-zA-Z)
    return this.optional(element) || /^[a-zA-Z]+$/.test(value);
  }, 'Please enter letters only.');
  $.validator.addMethod('validEmail', function (value, element) {
    return this.optional(element) || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }, 'Please enter a valid email address.');
  $.validator.addMethod('isUserExist', function (user) {
    for (let i = 0; i < database.length; i++) {
      if (database[i].username === user) {
        return false; // should return false when user exists
      }
    }
    return true; // should return true when user does not exist
  });
});
function resetFormSignIn() {
  $("#sign_in_form").validate().resetForm();
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
  document.getElementById("confirm_password").value = "";
  document.getElementById("firstname").value = "";
  document.getElementById("lastname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("birthday").value = "";
}

function cancelSignin() {
  resetFormSignIn();
  changeDiv('Welcome_div');
}
//<--------------------------- Configuration -------------------------------->

// choose Image for player 
function ChoosePlayer(photo_number) {
  playerPhoto = "photos/player_photo" + photo_number + ".png";
}


// choose Image for player bullet
function Chooseshot(photo_number) {
  shotImage = "photos/bullet_photo" + photo_number + ".png";
}

// choose Image for Enemy bullet
function ChooseshotE(photo_number) {
  enemyShotImage = "photos/bullet_photo" + photo_number + ".png";
}

document.getElementById('playerButton1').addEventListener('click', function () {
  document.getElementById('playerButton1').classList.add('selected');
  document.getElementById('playerButton2').classList.remove('selected');
  document.getElementById('playerButton3').classList.remove('selected');
});

document.getElementById('playerButton2').addEventListener('click', function () {
  document.getElementById('playerButton1').classList.remove('selected');
  document.getElementById('playerButton2').classList.add('selected');
  document.getElementById('playerButton3').classList.remove('selected');
});

document.getElementById('playerButton3').addEventListener('click', function () {
  document.getElementById('playerButton1').classList.remove('selected');
  document.getElementById('playerButton2').classList.remove('selected');
  document.getElementById('playerButton3').classList.add('selected');
});



document.getElementById('bulletButton2').addEventListener('click', function () {
  document.getElementById('bulletButton2').classList.add('selected');
  document.getElementById('bulletButton3').classList.remove('selected');
  document.getElementById('bulletButton1').classList.remove('selected');
});

document.getElementById('bulletButton3').addEventListener('click', function () {
  document.getElementById('bulletButton2').classList.remove('selected');
  document.getElementById('bulletButton3').classList.add('selected');
  document.getElementById('bulletButton1').classList.remove('selected');
});

document.getElementById('bulletButton1').addEventListener('click', function () {
  document.getElementById('bulletButton2').classList.remove('selected');
  document.getElementById('bulletButton3').classList.remove('selected');
  document.getElementById('bulletButton1').classList.add('selected');
});



document.getElementById('EbulletButton1').addEventListener('click', function () {
  document.getElementById('EbulletButton1').classList.add('selected');
  document.getElementById('EbulletButton2').classList.remove('selected');
  document.getElementById('EbulletButton3').classList.remove('selected');
});

document.getElementById('EbulletButton2').addEventListener('click', function () {
  document.getElementById('EbulletButton1').classList.remove('selected');
  document.getElementById('EbulletButton2').classList.add('selected');
  document.getElementById('EbulletButton3').classList.remove('selected');
});

document.getElementById('EbulletButton3').addEventListener('click', function () {
  document.getElementById('EbulletButton1').classList.remove('selected');
  document.getElementById('EbulletButton2').classList.remove('selected');
  document.getElementById('EbulletButton3').classList.add('selected');
});



function checkConfigurationInputCorrect() {


  if (document.getElementById('playerButton1').classList.contains('selected') ||
    document.getElementById('playerButton2').classList.contains('selected') ||
    document.getElementById('playerButton3').classList.contains('selected')) {
    canPlay = true;
  } else {
    // Show an error message or take appropriate action
    alert('Please select a player before proceeding!');
    canPlay = false;
    return;
  }

  if (document.getElementById('bulletButton1').classList.contains('selected') ||
    document.getElementById('bulletButton2').classList.contains('selected') ||
    document.getElementById('bulletButton3').classList.contains('selected')) {
    canPlay = true;
  } else {
    // Show an error message or take appropriate action
    alert('Please select a bullet for the player before proceeding!');
    canPlay = false;
    return;
  }

  if (document.getElementById('EbulletButton1').classList.contains('selected') ||
    document.getElementById('EbulletButton2').classList.contains('selected') ||
    document.getElementById('EbulletButton3').classList.contains('selected')) {
    canPlay = true;
  } else {
    // Show an error message or take appropriate action
    alert('Please select a bullet for the enemies before proceeding!');
    canPlay = false;
    return;
  }
  let selectKey = document.getElementById('selectKey');
  if (selectKey.value === '') {
    alert('Please select a key for shooting before proceeding.');
    canPlay = false;
    return;
  } else {
    canPlay = true;
  }

  var inputTime = document.getElementById("inputTime");
  //check if the time input is a valid number:
  if (inputTime.value.trim() !== '' && Number(inputTime.value) >= Number(inputTime.min) && Number(inputTime.value) <= Number(inputTime.max)) {
    canplay = true;
  } else {
    alert('Please select a valid time for the game before proceeding.');
    canPlay = false;
    return;
  }


  return canPlay;
}

// Add event listener to capture user's key selection
document.getElementById('selectKey').addEventListener('change', function (e) {
  shootingKey = e.target.value.toLowerCase();
});

//resets all configuration choices
function resetConfig() {

  document.querySelectorAll('#playerButton1, #playerButton2, #playerButton3').forEach(function (button) {
    button.classList.remove('selected');
  });

  document.querySelectorAll('#bulletButton1, #bulletButton2, #bulletButton3').forEach(function (button) {
    button.classList.remove('selected');
  });

  document.querySelectorAll('#EbulletButton1, #EbulletButton2, #EbulletButton3').forEach(function (button) {
    button.classList.remove('selected');
  });

  document.getElementById('selectKey').selectedIndex = 0;
  document.getElementById('inputTime').value = 120;

}