// If you would like to see some examples of similar code to make an interface interact with an API,
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

const gameForm = document.getElementById("gameForm");

//gameForm -> input
gameForm.addEventListener("input", (event) => {
  const gameMode = document.querySelector(
    'input[name="gameMode"]:checked'
  )?.value;
  console.log(gameMode);
  const playType = document.querySelector(
    'input[name="playType"]:checked'
  )?.value;
  console.log(playType);

  if (gameMode) {
    document.getElementById("playOptions").classList.remove("hidden");
  }

  const extraOptions = document.getElementById("extraOptions");

  if (playType === "opponent" && gameMode === "rpsls") {
    // Dynamically add Lizard and Spock options
    extraOptions.classList.remove("hidden");
  }
});

//playGame
const playButton = document.getElementById("playGame");
playButton.addEventListener("click", playGame);

function playGame() {
  console.log(111);
  const gameMode = document.querySelector(
    'input[name="gameMode"]:checked'
  )?.value;
  console.log(gameMode);
  const playType = document.querySelector(
    'input[name="playType"]:checked'
  )?.value;
  console.log(playType);
  let endpoint = "http://localhost:5000/";

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
    endpoint += `app/${gameMode}/`;
    fetch(endpoint, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // Update UI with the game result
        document.getElementById(
          "result"
        ).innerText = `Your choice: ${data.player}\n`;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    endpoint += `app/${gameMode}/play/${playerChoice}`;
    fetch(endpoint, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // Update UI with the game result
        document.getElementById(
          "result"
        ).innerText = `Your choice: ${data.player}\nOpponent's choice: ${data.opponent}\nResult: ${data.result}\n`;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}

//gameForm reset
gameForm.addEventListener("reset", () => {
  // Clear the result text
  document.getElementById("result").innerText = "";

  // If you have extra options dynamically added, you can clear them as well
  const extraOptions = document.getElementById("extraOptions");
  extraOptions.classList.add("hidden");
});
