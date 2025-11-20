import { useMemo, useState } from "react";
import { useAtom } from "jotai"

// states
import { activePartnership, inningsOnePartnershipCard, inningsTwoPartnershipCard } from "../jotai/atom";

// components
import { StraightAnglePieChart } from "../components/chart/StraightAnglePieChart"
import { PageTitle } from "../components/PageTitle";
import { PageNavBar } from "../components/PageNavBar";

// functions
import addRuns from "../function/addRuns";

export function Partnerships() {

  const [_activePartnership] = useAtom(activePartnership);
  const [_inningsOnePartnershipCard] = useAtom(inningsOnePartnershipCard);
  const [_inningsTwoPartnershipCard] = useAtom(inningsTwoPartnershipCard);

  const [displayInnings, setDisplayInnings] = useState(true);
  const activePartnershipDisplayStatus = Object.keys(_activePartnership).length > 0;

  return (
    <div>
      <PageTitle title="Partnerships" />
      <PageNavBar displayInnings={displayInnings} setDisplayInnings={setDisplayInnings} />

      {activePartnershipDisplayStatus && <ActivePartnership singlePartnership={_activePartnership} />}

      <div style={{ fontSize: "0.8em", }}>
        {
          displayInnings
            ? <><AllPartnerships partnerships={_inningsOnePartnershipCard} /></>
            : <><AllPartnerships partnerships={_inningsTwoPartnershipCard} /></>
        }
      </div>

    </div>
  )
};


function AllPartnerships({ partnerships }) {

  return (
    <div style={{ margin: "1em 0em", }}>
      {partnerships?.map((singlePartnership, id) => (
        <ActivePartnership key={id} singlePartnership={singlePartnership} />
      ))}
    </div>
  )
};


function ActivePartnership({ singlePartnership }) {

  const {
    partnerOneName, partnerOneRuns, partnerOneBalls,
    partnerTwoName, partnerTwoRuns, partnerTwoBalls,
    totalRuns, totalBalls, strikeRate, chartData
  } = useMemo(() => {

    const partnerOneRuns = addRuns(singlePartnership?.partnerOne?.runs || []);
    const partnerOneBalls = singlePartnership?.partnerOne?.runs?.length || 0;

    const partnerTwoRuns = addRuns(singlePartnership?.partnerTwo?.runs || []);
    const partnerTwoBalls = singlePartnership?.partnerTwo?.runs?.length || 0;

    const totalRuns = partnerOneRuns + partnerTwoRuns;
    const totalBalls = partnerOneBalls + partnerTwoBalls;

    return {
      partnerOneName: singlePartnership?.partnerOne?.playerName,
      partnerOneRuns, partnerOneBalls,
      partnerTwoName: singlePartnership?.partnerTwo?.playerName,
      partnerTwoRuns, partnerTwoBalls,
      totalRuns, totalBalls,
      strikeRate: totalBalls ? ((totalRuns / totalBalls) * 100).toFixed(2) : "0.00",
      chartData: [
        { name: singlePartnership?.partnerOne?.playerName, value: partnerOneRuns },
        { name: singlePartnership?.partnerTwo?.playerName, value: partnerTwoRuns },
      ]
    }
  }, [singlePartnership]);


  return (
    <details style={{ margin: "1em 0em", }}>

      <summary style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1.5fr", gap: "0.5em", alignItems: "center", }}>

        <PlayerDisplay name={partnerOneName} runs={partnerOneRuns} balls={partnerOneBalls} alignment="left" />

        <div style={{ backgroundColor: "#ccc", color: "black", padding: "0em", borderRadius: "1em", width: "100px", aspectRatio: "1.2/1", placeContent: "center", placeItems: "center", }}>
          <p style={{ padding: "0em", margin: "0em 0em 0.5em", fontWeight: "bold", fontSize: "1.5em", }}>{totalRuns} ({totalBalls})</p>
          <p style={{ fontWeight: "bold", fontSize: "0.95em", color: "#5f5f5fff", }}>{strikeRate}</p>
        </div>

        <PlayerDisplay name={partnerTwoName} runs={partnerTwoRuns} balls={partnerTwoBalls} alignment="right" />

      </summary>

      <StraightAnglePieChart data={chartData} />

    </details>
  )
};

const PlayerDisplay = ({name, runs, balls, alignment}) => (
  <div style={{ textAlign: alignment, }}>
    <p>{name}</p>
    <p>{runs} ({balls})</p>
  </div>
)