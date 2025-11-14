import { useState } from "react";
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

  const [_activePartnership, setActivePartnership] = useAtom(activePartnership);
  const [_inningsOnePartnershipCard, setInningsOnePartnershipCard] = useAtom(inningsOnePartnershipCard);
  const [_inningsTwoPartnershipCard, setInningsTwoPartnershipCard] = useAtom(inningsTwoPartnershipCard);

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
      {partnerships.map((singlePartnership, id) => (
        <ActivePartnership key={id} singlePartnership={singlePartnership} />
      ))}
    </div>
  )
};


function ActivePartnership({ singlePartnership }) {

  const partnerOneName = singlePartnership?.partnerOne?.playerName;
  const partnerOneRuns = addRuns(singlePartnership?.partnerOne?.runs) || 0;
  const partnerOneTotalDeliveries = singlePartnership?.partnerOne?.runs?.length || 0;

  const partnerTwoName = singlePartnership?.partnerTwo?.playerName;
  const partnerTwoRuns = addRuns(singlePartnership?.partnerTwo?.runs) || 0;
  const partnerTwoTotalDeliveries = singlePartnership?.partnerTwo?.runs?.length || 0;

  const totalRuns = partnerOneRuns + partnerTwoRuns;
  const totalDeliveries = partnerOneTotalDeliveries + partnerTwoTotalDeliveries;
  const strikeRate = ((totalRuns / totalDeliveries) * 100).toFixed(2);

  const chartData = [
    { name: partnerOneName, value: partnerOneRuns },
    { name: partnerTwoName, value: partnerTwoRuns },
  ];


  return (
    <details style={{ margin: "1em 0em", }}>

      <summary style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1.5fr", gap: "0.5em", alignItems: "center", }}>

        <div style={{ textAlign: "left", }}>
          <p>{partnerOneName}</p>
          <p>{partnerOneRuns} ({partnerOneTotalDeliveries})</p>
        </div>

        <div style={{ backgroundColor: "#ccc", color: "black", padding: "0em", borderRadius: "1em", width: "100px", aspectRatio: "1.2/1", placeContent: "center", placeItems: "center", }}>
          <p style={{ padding: "0em", margin: "0em 0em 0.5em", fontWeight: "bold", fontSize: "1.5em", }}>{totalRuns} ({totalDeliveries})</p>
          <p style={{ fontWeight: "bold", fontSize: "0.95em", color: "#5f5f5fff", }}>{strikeRate}</p>
        </div>

        <div style={{ textAlign: "right", }}>
          <p>{partnerTwoName}</p>
          <p>{partnerTwoRuns} ({partnerTwoTotalDeliveries})</p>
        </div>

      </summary>

      <StraightAnglePieChart data={chartData} />

    </details>
  )
};