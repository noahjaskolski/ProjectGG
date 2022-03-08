const form = document.getElementById('Login');

form.addEventListener('submit', login);
async function login(event) {
    //event.preventDefault() //to prevent refresh of page on clicking submit
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    const result = await fetch("/api/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    }).then((res) => res.json())

    if (result.status === 'ok') {
        console.log('TOKEN:', result.data)
        alert('successfull')
    } else {
        console.log(result.error)
        alert("ERROR")
    }
}