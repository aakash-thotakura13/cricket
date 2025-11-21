import { useEffect, useState } from "react";
import addRuns from "../function/addRuns";
import wicketsCounter from "../function/wicketsCounter";

export const ScoreBar = ({ team, allOvers, activeOver }) => {

  const overs = allOvers?.flatMap(over => over.overRuns) || [];
  
  const totalRuns = addRuns(overs);
  const wickets = wicketsCounter(overs);
  
  // Correct run rate
  const totalBalls = overs.length;
  const completedOvers = Math.floor(overs.length / 6) || 0
  const currentBalls = activeOver?.length || 0;

  const oversDecimal = totalBalls / 6;
  const runRate =
    oversDecimal > 0 ? (totalRuns / Number(`${completedOvers}.${currentBalls}`)).toFixed(2) : "0.00";

  // 🔥 RUN ANIMATION LOGIC
  const [animatedRuns, setAnimatedRuns] = useState(totalRuns);

  useEffect(() => {

    let start = animatedRuns;
    let end = totalRuns;
    let duration = 800; // ms
    let frameRate = 16; // smooth

    if (start === end) return;

    const step = (end - start) / (duration / frameRate);

    const interval = setInterval(() => {
      start += step;

      if ((step > 0 && start >= end) || (step < 0 && start <= end)) {
        start = end;
        clearInterval(interval);
      }

      setAnimatedRuns(Math.round(start));

    }, frameRate);

    return () => clearInterval(interval);

  }, [totalRuns]);


  return (
    <div style={styles.wrapper}>
      <div style={styles.glassCard}>
        <span style={styles.teamText}>
          {team.tag}: {animatedRuns}/{wickets}
        </span>

        <span style={styles.rr}>RR: {runRate}</span>

        <span style={styles.ovr}>
          Ovr: {completedOvers}.{currentBalls}
        </span>
      </div>
    </div>
  );
};

// ------------------------------
// 🎨 IPL THEME STYLES
// ------------------------------
const styles = {
  wrapper: {
    padding: "1em 0",
  },
  glassCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    padding: "0.9em 1.4em",
    borderRadius: "50px",

    background: "linear-gradient(135deg, #4b0082 0%, #8a2be2 50%, #c77dff 100%)",
    color: "white",

    boxShadow: "0 4px 12px rgba(0,0,0,0.4), 0 0 10px #a36bff inset",
    // border: "2px solid rgba(255,255,255,0.25)",

    fontWeight: "500",
    backdropFilter: "blur(8px)",
    transition: "all 0.3s ease",
  },
  teamText: {
    fontSize: "1.4em",
    letterSpacing: "0.5px",
    textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
  },
  rr: {
    fontSize: "1em",
  },
  ovr: {
    fontSize: "1.2em",
  },
};
