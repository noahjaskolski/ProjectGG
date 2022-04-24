const form = document.getElementById('answer');

form.addEventListener('submit', checkAnswer);
async function checkAnswer(event) {
    event.preventDefault() //to prevent refresh of page on clicking submit
    const answer = document.getElementById("la").value
    const level = Number(document.getElementById('hidden').value)
    const response = await fetch("/api/checkAnswer", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            level,
            answer
        })
    })
    const body = await response.json();
    if (body.message) {
        alert(body.message)
        window.location.href = `/levels/cert.html`
    } else {
        console.log("error")
        alert(body.error)
    }
}