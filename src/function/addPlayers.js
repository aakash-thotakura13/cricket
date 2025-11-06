
export function addBatsman(
  player,
  _playerOne, setPlayerOne,
  _playerTwo, setPlayerTwo,
  setPartnerOne,
  setPartnerTwo,
  battingCard, setBattingCard,
) {

  const playerOneEmpty = !_playerOne || Object.keys(_playerOne).length === 0;
  const playerTwoEmpty = !_playerTwo || Object.keys(_playerTwo).length === 0;

  if (!playerOneEmpty && !playerTwoEmpty) {
    return alert("Select player");
  };

  if (playerOneEmpty) {

    const playerEntry = {
      playerName: player,
      runs: [],
    };

    setPlayerOne(playerEntry);
    setPartnerOne(playerEntry);
    setBattingCard([...battingCard, playerEntry]);

  } else if (playerTwoEmpty) {

    const playerEntry = {
      playerName: player,
      runs: [],
    };

    setPlayerTwo(playerEntry);
    setPartnerTwo(playerEntry);
    setBattingCard([...battingCard, playerEntry]);

  };

};


export function addBowler(player, bowlingCard, setBowler,) {

  const findBowler = bowlingCard.find(bowler => bowler.playerName === player);

  if (findBowler) {
    setBowler(findBowler);
  } else {
    setBowler({ playerName: player, runs: [], });
  }

};