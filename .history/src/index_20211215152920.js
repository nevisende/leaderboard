import './style.css';
let gameId;
const submitButton = document.getElementById('score-button');
const refreshButton = document.getElementById('refresh');
const nameInput = document.querySelector('#name');
const scoreInput = document.querySelector('#score');
const scoreBoard = document.querySelector('.leaderboard')

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
    body: JSON.stringify(obj),
  })
  return score.json();
}

async function getScores() {
  const allScores = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`)
  return allScores.json();
}

submitButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const scoreObj = {
    user: nameInput.value,
    score: scoreInput.value
  }
  await addScore(scoreObj).then(response => console.log(response.result));
});

refreshButton.addEventListener('click', async (e) => {
  e.preventDefault();
  let scoreArray;
  let list = '';
  getScores().then(response => scoreArray = response);
  scoreArray.map(score => {
    list += `
    <li><span class="name">${score.user}</span> <span class="score">${score.score}</span> </li>`
  })
scoreBoard.innerHTML = list;
})