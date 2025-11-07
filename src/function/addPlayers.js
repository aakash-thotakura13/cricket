export function addBatsman(
  player,
  _playerOne,
  setPlayerOne,
  _playerTwo,
  setPlayerTwo,
  setPartnerOne,
  setPartnerTwo,
  battingCard,
  setBattingCard
) {
  const isEmpty = (p) => !p || Object.keys(p).length === 0;

  // 🧩 1️⃣ Check if player already exists in batting card
  const alreadyExists = battingCard.some((p) => p.playerName === player);
  if (alreadyExists) {
    alert(`${player} is already in the batting card`);
    return;
  }

  // 🧩 2️⃣ Check if both batsmen are already selected
  if (!isEmpty(_playerOne) && !isEmpty(_playerTwo)) {
    alert("Both batsmen are already selected");
    return;
  }

  // 🧩 3️⃣ Create player entry
  const playerEntry = { playerName: player, runs: [] };

  // 🧩 4️⃣ Assign to available slot
  if (isEmpty(_playerOne)) {
    setPlayerOne(playerEntry);
    setPartnerOne(playerEntry);
  } else {
    setPlayerTwo(playerEntry);
    setPartnerTwo(playerEntry);
  }

  // 🧩 5️⃣ Add to batting card
  setBattingCard((prev) => [...prev, playerEntry]);
}

export function addBowler(player, setBowler, bowlingCard, setBowlingCard) {
  const findBowler = bowlingCard.find((bowler) => bowler.playerName === player);

  if (findBowler) {
    setBowler(findBowler);
  } else {
    const newBowler = {
      playerName: player,
      runs: [],
    };
    setBowler(newBowler);
    setBowlingCard([...bowlingCard, newBowler]);
  }
}
