const form = document.getElementById('account');

form.addEventListener('submit', createAccount);
async function createAccount(event) {
    event.preventDefault() //to prevent refresh of page on clicking submit
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const result = await fetch("/api/post", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    const body = await result.json();
    console.log(body.message)
    if (body.message == 'Success') {
        alert(body.message)
        window.location.href = "/login.html"
    } else {
        console.log("error")
        alert(body.error)
    }
}