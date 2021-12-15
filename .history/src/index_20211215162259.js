import './style.css';
let gameId;
const submitButton = document.getElementById('score-button');
const refreshButton = document.getElementById('refresh');
const nameInput = document.querySelector('#name');
const scoreInput = document.querySelector('#score');
const scoreBoard = document.querySelector('.leaderboard')



createGame().then(response => gameId = response.result.match(/(?<=ID: )[^ ]+/)[0]);



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
  scoreBoard.innerHTML = '';
  let list = await getScores().then(response => response.result.map(el => `<li><span class="name">${el.user}</span> <span class="score">${el.score}</span> </li>`));
  list.map(li => scoreBoard.insertAdjacentHTML('beforeend', li))  
});