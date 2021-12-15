import './style.css';
let gameId;




createGame().then(response => gameId = response.result.match(/(?<=ID: )[^ ]+/)[0]);


