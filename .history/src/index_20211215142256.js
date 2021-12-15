import './style.css';

async function getResults() {
  const result = await fetch("https://us-central1-js-capstone-backend.cloudfunctions.net/api/games", {
    method: "POST",
    body: JSON.stringify({name: })
  })
}