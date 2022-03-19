const form = document.getElementById('Login');

form.addEventListener('submit', login);
async function login(event) {
    event.preventDefault() //to prevent refresh of page on clicking submit
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const response = await fetch("/api/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    const body = await response.json();
    console.log(body)
    if (body.message) {
        alert(body.message)
        window.location.href = "/levels"
    } else {
        console.log("error")
        alert(body.error)
    }
}