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
    }).then((res) => res.json())
}