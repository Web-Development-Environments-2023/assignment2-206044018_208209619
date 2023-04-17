
//Vars 
var activeUser; // after log in this will be the active user
var database = [
  {
    username: "p",
    password: "testuser",
  },

];



// Menu Div
var div_visible = "Welcome_div";
function changeDiv(div_id) {
  // if (div_id == "sign_in" || div_id == "log_in"){
  //     document.getElementById("menu").style.display = 'block';
  // }

  if (div_id == "Welcome_div") {
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


//  ------------- log in ------------- 
function LogIn() {

  let user = document.getElementById("uname").value;
  let password = document.getElementById("psw").value;
  if (isUserValid(user, password)) {
    changeDiv("configuration");
  }
  else {
    //TO DO - model dialog
    alert("wrong user or password, try again");
  }

}

function isUserValid(user, pass) {
  for (let i = 0; i < database.length; i++) {
    if (database[i].username === user && database[i].password === pass) {
      return true;
    }
  }
  return false;
}

//  ------------- Sign in ------------- 

// Validation of Sign Up 
$(document).ready(function () {
  $("#sign_in_form").validate({
    rules: {
      username: {
        required: true,
        isUserExist: false
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
        email: true
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
        required: "Please enter a password",
        email: "Invalid email address, Please enter a valid email address"
      },
      birthday: {
        required: "Please enter your birthday"
      }
    },

    submitHandler: function () {
      // TO DO: check if the new user added to the database and if the form reset automaticly without the code
      let user1 = document.getElementById("username").value;
      let password1 = document.getElementById("password").value;
      database.push({
        username: user1,
        password: password1,
      },)
      // let form = $("#sign_in_form");
      // form[0].reset();
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
  $.validator.addMethod('isUserExist', function (user) {
    for (let i = 0; i < database.length; i++) {
      if (database[i].username == user) {
        return true;
      }
    }
    return false;
  });
});

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
  } else {
    canPlay = true;
  }
  return canPlay;
}

// Add event listener to capture user's key selection
document.getElementById('selectKey').addEventListener('change', function (e) {
  // Update shooting key with user's selected value
  shootingKey = e.target.value.toLowerCase();
});

// JavaScript code for handling game over event and button click event

