// If you would like to see some examples of similar code to make an interface interact with an API,
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

// Define the rules for RPS and RPSLS
const rpsRules =
  "Rules for Rock Paper Scissors:\n" +
  "\n" +
  "  - Scissors CUTS Paper\n" +
  "  - Paper COVERS Rock\n" +
  "  - Rock CRUSHES Scissors\n";
const rpslsRules = `Rules for the Lizard-Spock Expansion of Rock Paper Scissors:\n\n',
' - Scissors CUTS Paper\n',
' - Paper COVERS Rock\n',
' - Rock SMOOSHES Lizard\n',
' - Lizard POISONS Spock\n',
' - Spock SMASHES Scissors\n',
' - Scissors DECAPITATES Lizard\n',
' - Lizard EATS Paper\n',
' - Paper DISPROVES Spock\n',
' - Spock VAPORIZES Rock\n',
' - Rock CRUSHES Scissors`;

// This function will be called to update the available moves based on the selected game type
function updateMoveOptions() {
  const gameType = getSelectedGameType();
  const playerChoiceElement = document.getElementById("playerChoice");
  if (gameType === "RPSLS") {
    if (
      !Array.from(playerChoiceElement.options).some(
        (option) => option.value === "lizard"
      )
    ) {
      playerChoiceElement.add(new Option("Lizard", "lizard"));
      playerChoiceElement.add(new Option("Spock", "spock"));
    }
  } else {
    removeOption(playerChoiceElement, "lizard");
    removeOption(playerChoiceElement, "spock");
  }
}

// Helper function to remove an option from a select element
function removeOption(selectElement, value) {
  Array.from(selectElement.options).forEach((option) => {
    if (option.value === value) {
      selectElement.remove(option.index);
    }
  });
}

// Fetch the result of the game from the server
function fetchGameResult(gameType, playerChoice) {
  const url = `/api/${gameType}/play`;
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ choice: playerChoice }),
  }).then((response) => response.json());
}

// Function to handle game play
function playGame() {
  const gameType = getSelectedGameType();
  const playerChoice = getPlayerChoice();
  fetchGameResult(gameType, playerChoice)
    .then((data) => {
      updateResultsUI(data);
    })
    .catch((error) => {
      console.error("Error playing the game:", error);
    });
}

// Function to reset the UI
function resetUI() {
  document.getElementById("results").style.display = "none";
}

// Function to update the UI with the game results
function updateResultsUI(data) {
  document.getElementById(
    "playerMove"
  ).textContent = `Your move: ${data.playerMove}`;
  document.getElementById(
    "computerMove"
  ).textContent = `Computer's move: ${data.computerMove}`;
  document.getElementById("outcome").textContent = `Outcome: ${data.outcome}`;
  document.getElementById("results").style.display = "block";
}

// Add event listeners once the DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("rps").addEventListener("change", updateMoveOptions);
  document
    .getElementById("rpsls")
    .addEventListener("change", updateMoveOptions);
  document.getElementById("playButton").addEventListener("click", playGame);
  document.getElementById("resetButton").addEventListener("click", resetUI);

  // Initially set the move options based on the default selected game type
  updateMoveOptions();
});
