import { useMemo, useState } from "react";
import { useAtom } from "jotai"

// states
import { inningsOneAllOvers, inningsTwoAllOvers } from "../jotai/atom"

// components
import { PageTitle } from "../components/PageTitle";
import { PageNavBar } from "../components/PageNavBar";

// functions
import addRuns from "../function/addRuns";
import wicketsCounter from "../function/wicketsCounter";


export const OverDetails = () => {

  const [_inningsOneAllOvers] = useAtom(inningsOneAllOvers);
  const [_inningsTwoAllOvers] = useAtom(inningsTwoAllOvers);

  const [displayInnings, setDisplayInnings] = useState(true);

  return (
    <div>
      <PageTitle title="Over Details" />
      <PageNavBar displayInnings={displayInnings} setDisplayInnings={setDisplayInnings} />

      <div style={{ fontSize: "0.8em" }}>
        {
          displayInnings
            ? <><EachInnings allOvers={_inningsOneAllOvers} /></>
            : <><EachInnings allOvers={_inningsTwoAllOvers} /></>
        }
      </div>

    </div>
  )
}

function EachInnings({ allOvers }) {

  const computeOverData = (overRuns) => {

    const hasWicket = overRuns?.some(run => typeof run === "string");
    const totalRuns = addRuns(overRuns);
    const totalWickets = wicketsCounter(overRuns);

    return { hasWicket, totalRuns, totalWickets };

  }

  return (
    <div>
      {
        allOvers.map((entry, id) => {

          const overData = useMemo(() => computeOverData(entry.overRuns), [entry.overRuns]);

          return (
            <details key={id} style={{ padding: "0em", margin: "0.5em 0em", border: overData?.hasWicket ? "0.1em solid red" : "1px solid #ccc", borderRadius: "2.5em", }} open={overData?.hasWicket}>

              <summary style={{ margin: "0em 0em", padding: "0.7em 1.4em 0.7em 0.7em", display: "grid", gridTemplateColumns: "1fr 3fr 1fr", alignItems: "center", gap: "1em", }}>

                <p style={{ width: "60px", height: "60px", display: "flex", placeContent: "center", placeItems: "center", fontSize: "3em", backgroundColor: "#ccc", color: "black", borderRadius: "50%", }}>{id + 1}</p>

                <div>

                  <BowlerDisplay name={entry.bowler.playerName} />

                  <BatsmanDisplay name={entry.playerOne.playerName} runs={entry.playerOne.totalRuns} balls={entry.playerOne.totalDeliveries} />

                  <BatsmanDisplay name={entry.playerTwo.playerName} runs={entry.playerTwo.totalRuns} balls={entry.playerTwo.totalDeliveries} />

                </div>

                <div style={{ fontSize: "1.5em" }}>
                  <p>{overData.totalRuns}</p>
                  <hr />
                  <p>{overData.totalWickets}</p>
                </div>

              </summary>

              <hr style={{ width: "90%", margin: "auto" }} />

              <BallDisplayContainer eachOver={entry?.overRuns} />

            </details>
          )
        })
      }
    </div>
  )
};

const BatsmanDisplay = ({ name, runs, balls }) => (
  <p style={{ display: "flex", justifyContent: "space-between", margin: "0.25em 0em", padding: "0em 0.3em", }}>
    <span>{name}</span>
    <span>{runs} ({balls})</span>
  </p>
);

const BowlerDisplay = ({ name }) => (
  <p style={{ textAlign: "left", background: "#ccc", color: "black", borderRadius: "0.5em 0.7em", margin: "0.5em 0em", padding: "0em 0.3em", }}>{name}</p>
);

const BallDisplayContainer = ({ eachOver }) => (
  <div style={{ display: "flex", justifyContent: "space-evenly", margin: "0.5em 0em", }}>
    {
      eachOver?.map((run, id) => <BallDisplay key={id} run={run} />)
    }
  </div>
);

const BallDisplay = ({ run }) => (
  <span style={{ width: "30px", height: "30px", fontSize: "1.7em", backgroundColor: "#ccc", color: "black", borderRadius: "50%", }} >
    {typeof run === "string" ? "W" : run}
  </span>
);