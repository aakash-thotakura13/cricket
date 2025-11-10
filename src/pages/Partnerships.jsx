import { useAtom } from "jotai"
import { activePartnership, inningsOnePartnershipCard, inningsTwoPartnershipCard } from "../jotai/atom";
import addRuns from "../function/addRuns";


export function Partnerships() {

  const [_activePartnership, setActivePartnership] = useAtom(activePartnership);
  const [_inningsOnePartnershipCard, setInningsOnePartnershipCard] = useAtom(inningsOnePartnershipCard);
  const [_inningsTwoPartnershipCard, setInningsTwoPartnershipCard] = useAtom(inningsTwoPartnershipCard);
  // console.clear();
  // console.log(_inningsOnePartnershipCard[0]);
  // console.log(_activePartnership)

  return (
    <div>

      <h2>Active Partnerships</h2>
      <ActivePartnership singlePartnership={_activePartnership} />

      <h2>Innings-One Partnerships</h2>
      <AllPartnerships partnerships={_inningsOnePartnershipCard} />

      <h2>Innings-Two Partnerships</h2>
      <AllPartnerships partnerships={_inningsTwoPartnershipCard} />

    </div>
  )
};


function AllPartnerships({ partnerships }) {

  return (
    <div style={{ margin: "1em 0em", }}>
      {partnerships.map((singlePartnership, index) => (
        <ActivePartnership key={index} singlePartnership={singlePartnership} />
      ))}
    </div>
  )
}


function ActivePartnership({ singlePartnership }) {

  const totalRuns = addRuns([singlePartnership?.playerOne?.runs, singlePartnership?.playerTwo?.runs].flat());
  const totalDeliveries = singlePartnership?.playerOne?.totalDeliveries + singlePartnership?.playerTwo?.totalDeliveries;
  const strikeRate = ((totalRuns / totalDeliveries) * 100).toFixed(2);

  console.log(singlePartnership);

  return (
    <div style={{ fontSize: "0.85em", margin: "1em 0em", }}>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1.5fr", }}>

        <div style={{ textAlign: "left", }}>
          <p>{singlePartnership?.playerOne?.playerName}</p>
          <p>{singlePartnership?.playerOne?.totalRuns} ({singlePartnership?.playerOne?.totalDeliveries})</p>
        </div>

        <div style={{ backgroundColor: "#ccc", color: "black", padding: "0em", borderRadius: "1em", width: "100px", aspectRatio: "1.2/1", placeContent: "center", placeItems: "center", }}>
          <p style={{ padding: "0em", margin: "0em 0em 0.7em", fontSize: "1.1em", }}>{totalRuns} ({totalDeliveries})</p>
          <p style={{ fontWeight: "bold", fontSize: "0.95em" }}>{strikeRate}</p>
        </div>

        <div style={{ textAlign: "right", }}>
          <p>{singlePartnership?.playerTwo?.playerName}</p>
          <p>{singlePartnership?.playerTwo?.totalRuns} ({singlePartnership?.playerTwo?.totalDeliveries})</p>
        </div>

      </div>

    </div>
  )
};