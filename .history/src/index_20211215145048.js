import './style.css';
let gameId;

async function createGame() {
  const result = await fetch("https://us-central1-js-capstone-backend.cloudfunctions.net/api/games", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: "My cool new game" }),
  });
  return result.json();
}

createGame().then(response => gameId = response.result.match(/(?<=ID: )[^ ]+/)[0]);

function addScore(obj) {
  fetch()
}