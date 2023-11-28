/*
 * @Descripttion: ZJJ Code
 * @version: 1.0.0
 * @Author: ZJJ
 * @Date: 2023-05-09 17:18:15
 * @LastEditors: ZJJ
 * @LastEditTime: 2023-11-27 20:07:12
 */
// If you would like to see some examples of similar code to make an interface interact with an API,
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

//gameForm -> input
const gameForm = document.getElementById("gameForm");

gameForm.addEventListener("input", (event) => {
  const gameMode = document.querySelector(
    'input[name="gameMode"]:checked'
  )?.value;
  const playType = document.querySelector(
    'input[name="playType"]:checked'
  )?.value;

  if (gameMode) {
    document.getElementById("playOptions").classList.remove("hidden");
  }

  const moveOptions = document.getElementById("moveOptions");
  if (playType === "opponent") {
    moveOptions.classList.remove("hidden");
    // Dynamically add/remove Lizard and Spock based on game mode
    if (gameMode === "rpsls") {
      // Dynamically add Lizard and Spock options
      extraOptions.innerHTML = `
        <input type="radio" id="lizard" name="moveOptions" value="lizard" />
        <label for="lizard">Lizard</label>
        <input type="radio" id="spock" name="moveOptions" value="spock" />
        <label for="spock">Spock</label>
      `;
    } else {
      // Remove Lizard and Spock options here
      document.getElementById("moveOptions").classList.add("hidden");
    }
  } else {
    moveOptions.classList.add("hidden");
  }
});

//playGame
const playButton = document.getElementById("playGame");
playButton.addEventListener("click", playGame);

function playGame() {
  const gameMode = document.querySelector(
    'input[name="gameMode"]:checked'
  )?.value;
  const playType = document.querySelector(
    'input[name="playType"]:checked'
  )?.value;
  let endpoint;

  if (!gameMode) {
    alert("Please select a game mode.");
    return;
  }

  if (!playType) {
    alert("Please select your play type.");
  }

  if (playType === "opponent") {
    playerChoice = document.querySelector(
      'input[name="moveOptions"]:checked'
    )?.value;
    if (!playerChoice) {
      alert("Please select your move.");
      return;
    }
  }

  if (playType === "random") {
    endpoint = `/app/${gameMode}/`;
  } else {
    endpoint = `/app/${gameMode}/play/${playerChoice}`;
  }

  fetch(endpoint, {
    method: "GET", // or 'POST' if your API requires it
  })
    .then((response) => response.json())
    .then((data) => {
      // Update UI with the game result
      document.getElementById(
        "result"
      ).innerText = `Your choice: ${data.player}\nOpponent's choice: ${data.opponent}\nResult: ${data.result}`;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
//test
//gameForm reset
gameForm.addEventListener("reset", () => {
  document.getElementById("playOptions").classList.add("hidden");
  document.getElementById("moveOptions").classList.add("hidden");
});
