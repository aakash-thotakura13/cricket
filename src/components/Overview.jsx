
export const Overview = ({ battingCard, bowlingCard }) => {

  const filterBatsman = battingCard.length > 0 && [...battingCard].sort((a, b) => b.totalRuns - a.totalRuns).slice(0, 3) || []
  const filterBowler = bowlingCard.length > 0 && [...bowlingCard].sort((a, b) => b.runsConceded - a.runsConceded).sort((a, b) => b.wickets - a.wickets).slice(0, 3) || []

  return (

    <div style={styles.container}>

      <h3>Overview</h3>

      <p style={styles.sectionTitle}>Batting</p>

      {
        filterBatsman.map((batsman, id) => <p key={id} style={styles.subContainer}>
          <span>{batsman.playerName}</span> <span>{batsman.totalRuns} ({batsman.totalDeliveries})</span>
        </p>)
      }

      <p style={styles.sectionTitle}>Bowling</p>

      {
        filterBowler.map((bowler, id) => <p key={id} style={styles.subContainer}>
          <span>{bowler.playerName}</span> <span>{bowler.wickets} / {bowler.runsConceded}</span>
        </p>)
      }

    </div>
  )
};


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
    fontSize:"0.9em",
  },
  sectionTitle: {
    width: "90%",
    margin: "0.75em auto",
    fontSize:"0.95em",
    backgroundColor: "#ccc",
    color: "black",
    textShadow: "1px 1px 1px black",
    borderRadius: "1em",
    textAlign: "center",
  },
};
