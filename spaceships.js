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
      if (database[i].username === user && database[i].password === pass) {
        return true;
      }
    }
    return false;
  }

//  ------------- Sign in ------------- 

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
// 	});
// });
