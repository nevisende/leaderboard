let gameId;

export async function createGame() {
  const result = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'My cool new game' }),
  });
  return result.json();
}

createGame().then((response) => {
  [gameId] = response.result.match(/(?<=ID: )[^ ]+/)
});

export async function addScore(obj) {
  const score = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  return score.json();
}

export async function getScores() {
  const allScores = await fetch(`https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores`);
  return allScores.json();
}