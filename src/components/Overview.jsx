import { useAtomValue } from "jotai";

// states
import {
  inningsOneAllOvers, inningsOneBattingScoreCard, inningsOneBowlingScoreCard,
  inningsTwoAllOvers, inningsTwoBattingScoreCard, inningsTwoBowlingScoreCard,
  teamOne, teamTwo
} from "../jotai/atom";

// functions
import addRuns from "../function/addRuns";
import wicketsCounter from "../function/wicketsCounter";


export const Overview = () => {

  const _teamOne = useAtomValue(teamOne);
  const _teamTwo = useAtomValue(teamTwo);

  const _inningsOneBattingScoreCard = useAtomValue(inningsOneBattingScoreCard);
  const _inningsOneBowlingScoreCard = useAtomValue(inningsOneBowlingScoreCard);

  const _inningsTwoBattingScoreCard = useAtomValue(inningsTwoBattingScoreCard);
  const _inningsTwoBowlingScoreCard = useAtomValue(inningsTwoBowlingScoreCard);

  const _inningsOneAllOvers = useAtomValue(inningsOneAllOvers);
  const _inningsTwoAllOvers = useAtomValue(inningsTwoAllOvers);

  const _inningsOneTotalOvers = [..._inningsOneAllOvers.flatMap(data => data.overRuns)];
  const _inningsTwoTotalOvers = [..._inningsTwoAllOvers.flatMap(data => data.overRuns)];


  return (

    <div style={styles.container}>

      <InningsOverView
        battingCard={_inningsOneBattingScoreCard}
        bowlingCard={_inningsOneBowlingScoreCard}
        battingTeamName={_teamOne.tag}
        bowlingTeamName={_teamTwo.tag}
        oversArray={_inningsOneTotalOvers}
      />

      <InningsOverView
        battingCard={_inningsTwoBattingScoreCard}
        bowlingCard={_inningsTwoBowlingScoreCard}
        battingTeamName={_teamTwo.tag}
        bowlingTeamName={_teamOne.tag}
        oversArray={_inningsTwoTotalOvers}
      />

    </div>
  )
};

function InningsOverView({ battingCard, bowlingCard, battingTeamName, bowlingTeamName, oversArray }) {

  const filterBatsman = battingCard?.length > 0
    && [...battingCard]
      ?.sort((a, b) => b.totalRuns - a.totalRuns)
      ?.slice(0, 3)
    || [];

  const filterBowler = bowlingCard?.length > 0
    && [...bowlingCard]
      ?.sort((a, b) => {
        if (b.wickets !== a.wickets) return b.wickets - a.wickets;
        return a.totalRuns - b.totalRuns;
      })?.slice(0, 3)
    || [];

  const score = addRuns(oversArray);
  const wickets = wicketsCounter(oversArray);


  return (
    <div>

      <p style={styles.sectionTitle}>
        <span>{battingTeamName}</span>
        <span>{score} / {wickets}</span>
      </p>

      {
        filterBatsman.map((batsman, id) => <p key={id} style={styles.subContainer}>
          <span>{batsman.playerName}</span>
          <span>{batsman.totalRuns} ({batsman.totalDeliveries})</span>
        </p>)
      }

      <p style={styles.sectionTitle}>
        <span>{bowlingTeamName}</span>
      </p>

      {
        filterBowler.map((bowler, id) => <p key={id} style={styles.subContainer}>
          <span>{bowler.playerName}</span>
          <span>{bowler.wickets} / {bowler.totalRuns}</span>
        </p>)
      }

    </div>
  )
}


const styles = {
  container: {
    minWidth: "350px",
    margin: "1.5em auto",
    border: "5px double #ccc",
    borderRadius: "2em",
  },
  subContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0.5em 1.4em",
    fontSize: "0.9em",
  },
  sectionTitle: {
    width: "90%",
    margin: "0.75em auto",
    fontSize: "0.95em",
    fontWeight: "600",
    backgroundColor: "#ccc",
    color: "black",
    borderRadius: "1em",
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
    padding: "0.25em 0.5em",
  },
};
