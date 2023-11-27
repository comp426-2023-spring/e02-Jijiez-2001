// Export the Rock Paper Scissors function
export function rps(playerShot) {
  const options = ["rock", "paper", "scissors"];

  if (playerShot === undefined) {
    const randomChoice = options[Math.floor(Math.random() * options.length)];
    return { player: randomChoice };
  }

  playerShot = playerShot.toLowerCase();
  if (!options.includes(playerShot)) {
    console.error(`${playerShot} is out of range`);
    throw new RangeError(`${playerShot} is out of range`);
  }

  const opponentShot = options[Math.floor(Math.random() * options.length)];
  const result =
    options.indexOf(playerShot) ===
    (options.indexOf(opponentShot) + 1) % options.length
      ? "win"
      : playerShot === opponentShot
      ? "tie"
      : "lose";

  return { player: playerShot, opponent: opponentShot, result: result };
}

// Export the Rock Paper Scissors Lizard Spock function
export function rpsls(playerShot) {
  const options = ["rock", "paper", "scissors", "lizard", "spock"];
  const winConditions = {
    rock: ["scissors", "lizard"],
    paper: ["rock", "spock"],
    scissors: ["paper", "lizard"],
    lizard: ["spock", "paper"],
    spock: ["scissors", "rock"],
  };

  if (playerShot === undefined) {
    const randomChoice = options[Math.floor(Math.random() * options.length)];
    return { player: randomChoice };
  }

  playerShot = playerShot.toLowerCase();
  if (!options.includes(playerShot)) {
    console.error(`${playerShot} is out of range`);
    throw new RangeError(`${playerShot} is out of range`);
  }

  const opponentShot = options[Math.floor(Math.random() * options.length)];
  const result = winConditions[playerShot].includes(opponentShot)
    ? "win"
    : playerShot === opponentShot
    ? "tie"
    : "lose";

  return { player: playerShot, opponent: opponentShot, result: result };
}
