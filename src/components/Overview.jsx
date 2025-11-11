import addRuns from "../function/addRuns";
import wicketsCounter from "../function/wicketsCounter";

export const Overview = ({ playerOne, playerTwo, bowler, prevBowler }) => {

  const getBattingStats = player => ({
    playerName: player?.playerName || "",
    runs: addRuns(player?.runs) || 0,
    balls: player?.runs?.length || 0,
  });

  const getBowlingStats = player => ({
    playerName: player?.playerName || "",
    runs: addRuns(player?.runs) || 0,
    wickets: wicketsCounter(player?.runs) || 0,
  });

  const batsmen = [getBattingStats(playerOne), getBattingStats(playerTwo)];
  const bowlers = [getBowlingStats(bowler), getBowlingStats(prevBowler)];

  return (

    <div style={styles.container}>

      <h3>Overview</h3>

      <Section title="Batting">
        {batsmen.map((b, i) => (
          <StatRow key={i} label={b.playerName} value={`${b.runs} (${b.balls})`} />
        ))}
      </Section>

      <Section title="Bowling">
        {bowlers.map((b, i) => (
          <StatRow key={i} label={b.playerName} value={`${b.wickets}/${b.runs}`} />
        ))}
      </Section>

    </div>
  )
};

const Section = ({ title, children }) => (
  <>
    <p style={styles.sectionTitle}>
      {title}
    </p>
    {children}
  </>
);

const StatRow = ({ label, value }) => (
  <p style={styles.statRow}>
    <span>{label}</span> <span>{value}</span>
  </p>
);


const styles = {
  container: {
    minWidth: "350px",
    margin: "1.5em auto",
    border: "5px double #ccc",
    borderRadius: "2em",
  },
  sectionTitle: {
    width: "90%",
    margin: "0.75em auto",
    backgroundColor: "#ccc",
    color: "black",
    textShadow: "1px 1px 1px black",
    borderRadius: "1em",
    textAlign: "center",
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0.75em 1.4em",
  },
};
