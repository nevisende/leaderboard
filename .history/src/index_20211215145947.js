import './style.css';
let gameId;
const submitButton = document.getElementById('submit-button');
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
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

async function addScore(obj) {
  const score = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  })
  return score.json();
}

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  const scoreObj = {
    name: nameInput.value,
    score: scoreInput.value
  }
  addScore(scoreObj).then(response=> response.result);

})