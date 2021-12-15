import { result } from 'lodash';
import './style.css';


async function getResults() {
  const result = await fetch("https://us-central1-js-capstone-backend.cloudfunctions.net/api/games", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name: "My cool new game" }),
  });
  return result.json();
}

getResults().then(result=> console.log(result))