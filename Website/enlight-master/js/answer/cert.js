let token = document.cookie;
let jsontoken = JSON.parse(atob(token.split('.')[1]));

document.getElementById("email").innerHTML = jsontoken.email;

let date = new Date();
document.getElementById("date").innerHTML = date
