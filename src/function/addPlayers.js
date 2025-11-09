export function addBatsman(
  player,
  _playerOne,
  setPlayerOne,
  _playerTwo,
  setPlayerTwo,
  setPartnerOne,
  setPartnerTwo,
  battingCard,
  setBattingCard,
  outPlayer,
) {

  const isEmpty = p => !p || Object.keys(p).length === 0;

  const alreadyExists = battingCard.some((p) => p.playerName === player);
  if (alreadyExists) {
    alert(`${player} is already in the batting card`);
    return;
  };

  const playerEntry = { playerName: player, runs: [], };

  if (outPlayer === "playerOne") {
    console.log("setting up playerOne,", outPlayer)
    setPlayerOne(playerEntry);
    setPartnerOne(playerEntry);

  } else if (outPlayer === "playerTwo") {
    console.log("setting up playerTwo,", outPlayer)
    setPlayerTwo(playerEntry);
    setPartnerTwo(playerEntry);

  } else {

    if (isEmpty(_playerOne)) {
      console.log("isEmpty playerOne,", outPlayer)
      setPlayerOne(playerEntry);
      setPartnerOne(playerEntry);

    } else if (isEmpty(_playerTwo)) {
      console.log("isEmpty playerTwo,", outPlayer)
      setPlayerTwo(playerEntry);
      setPartnerTwo(playerEntry);

    } else {

      alert("Both batsman are already selected")
      return;

    }
  }

  setBattingCard((prev) => [...prev, playerEntry]);
};

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
