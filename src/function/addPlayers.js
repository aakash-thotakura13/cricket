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

  const playerEntry = { playerName: player, runs: [], status: "not out", totalRuns: 0, totalDeliveries: 0, strikeRate: 0.0, fours: 0, sixes: 0, };

  if (outPlayer === "playerOne") {
    
    setPlayerOne(playerEntry);
    setPartnerOne(playerEntry);

  } else if (outPlayer === "playerTwo") {
    
    setPlayerTwo(playerEntry);
    setPartnerTwo(playerEntry);

  } else {

    if (isEmpty(_playerOne)) {
      
      setPlayerOne(playerEntry);
      setPartnerOne(playerEntry);

    } else if (isEmpty(_playerTwo)) {
      
      setPlayerTwo(playerEntry);
      setPartnerTwo(playerEntry);

    } else {

      alert("Both batsman are already selected")
      return;

    }
  }

  setBattingCard([...battingCard, playerEntry]);
};

export function addBowler(player, setBowler, bowlingCard, setBowlingCard) {

  const findBowler = bowlingCard.find((bowler) => bowler.playerName === player);

  if (findBowler) {

    setBowler(findBowler);

  } else {

    const newBowler = {
      playerName: player,
      runs: [],
      bowlerOvers: [],
    };

    setBowler(newBowler);
    setBowlingCard([...bowlingCard, newBowler]);

  }
}
