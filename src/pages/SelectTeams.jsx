import { useAtom } from "jotai"
import { inningsOne, inningsOneBattingScoreCard, inningsOneBowlingScoreCard, inningsOneAllOvers, inningsOnePartnershipCard, inningsTwo, inningsTwoBattingScoreCard, inningsTwoBowlingScoreCard, inningsTwoAllOvers, inningsTwoPartnershipCard, startGame, teamOne, teamTwo } from "../jotai/atom"
import { australia2025, india2025, indianW, southAfricaW } from "../database"
import { Pitch } from "../components/Pitch";
import { SelectedTeam } from "../components/SelectedTeam";

const allTeams = [indianW, southAfricaW, india2025, australia2025,];

export const SelectTeam = () => {

  const [_teamOne, setTeamOne] = useAtom(teamOne);
  const [_teamTwo, setTeamTwo] = useAtom(teamTwo);

  const [_inningsOne, setInningsOne] = useAtom(inningsOne);
  const [_inningsTwo, setInningsTwo] = useAtom(inningsTwo);

  const [_inningsOneBattingScoreCard, setInningsOneBattingScoreCard] = useAtom(inningsOneBattingScoreCard);
  const [_inningsOneBowlingScoreCard, setInningsOneBowlingScoreCard] = useAtom(inningsOneBowlingScoreCard);
  const [_inningsOnePartnershipCard, setInningsOnePartnershipCard] = useAtom(inningsOnePartnershipCard);
  const [_inningsOneAllovers, setInningsOneAllOvers] = useAtom(inningsOneAllOvers);

  const [_inningsTwoBattingScoreCard, setInningsTwoBattingScoreCard] = useAtom(inningsTwoBattingScoreCard);
  const [_inningsTwoBowlingScoreCard, setInningsTwoBowlingScoreCard] = useAtom(inningsTwoBowlingScoreCard);
  const [_inningsTwoPartnershipCard, setInningsTwoPartnershipCard] = useAtom(inningsTwoPartnershipCard);
  const [_inningsTwoAllovers, setInningsTwoAllOvers] = useAtom(inningsTwoAllOvers);

  const [game, setGame] = useAtom(startGame);


  function teamSelection(selectedTeam) {

    const teamOneEmpty = !_teamOne || Object.keys(_teamOne).length === 0;
    const teamTwoEmpty = !_teamTwo || Object.keys(_teamTwo).length === 0;

    if (!teamOneEmpty && !teamTwoEmpty) {
      return alert("Select only one team");
    }

    if (teamOneEmpty) {
      setTeamOne(selectedTeam);
    } else if (teamTwoEmpty) {
      setTeamTwo(selectedTeam);
    }

  };

  return (
    <section style={{ fontSize: "0.95em" }}>

      {
        !game
          ? <>
            <h2>Select Teams</h2>
            {
              (Object.keys(_teamOne).length > 0 && Object.keys(_teamTwo).length > 0)
                ? <>
                  <div style={{ display: "grid", placeContent: "center", }}>

                    <SelectedTeam teamName={_teamOne?.teamName} />

                    <p style={{ fontSize: "5em", padding: "0em", margin: "0em", fontStyle: "italic" }}>Vs</p>

                    <SelectedTeam teamName={_teamTwo?.teamName} />

                  </div>

                  <div>
                    <button onClick={() => setGame(true)}>Start</button>
                  </div>
                </>
                : <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.7em", }}>
                  {
                    allTeams
                      .map((team, id) =>
                        <li
                          key={id}
                          onClick={() => teamSelection(team)}
                          style={{
                            border: "1px solid #ccc",
                            borderRadius: "1em",
                            padding: "0.5em",
                            cursor: "pointer",
                            backgroundColor: team.teamName === _teamOne?.teamName || team.teamName === _teamTwo?.teamName ? "grey" : ""
                          }}
                        >
                          {team.teamName}
                        </li>
                      )
                  }
                </div>
            }
          </>
          : <>
            {
              !_inningsOne
                ? <Pitch
                  battingTeam={_teamOne}
                  setBattingTeam={setTeamOne}
                  bowlingTeam={_teamTwo}
                  setBowlingTeam={setTeamTwo}
                  battingCard={_inningsOneBattingScoreCard}
                  setBattingCard={setInningsOneBattingScoreCard}
                  bowlingCard={_inningsOneBowlingScoreCard}
                  setBowlingCard={setInningsOneBowlingScoreCard}
                  partnershipData={_inningsOnePartnershipCard}
                  setPartnershipData={setInningsOnePartnershipCard}
                  allOvers={_inningsOneAllovers}
                  setAllOvers={setInningsOneAllOvers}
                />
                : <Pitch
                  battingTeam={_teamTwo}
                  setBattingTeam={setTeamTwo}
                  bowlingTeam={_teamOne}
                  setBowlingTeam={setTeamOne}
                  battingCard={_inningsTwoBattingScoreCard}
                  setBattingCard={setInningsTwoBattingScoreCard}
                  bowlingCard={_inningsTwoBowlingScoreCard}
                  setBowlingCard={setInningsTwoBowlingScoreCard}
                  partnerShipData={_inningsTwoPartnershipCard}
                  setPartnershipData={setInningsTwoPartnershipCard}
                  allOvers={_inningsTwoAllovers}
                  setAllOvers={setInningsTwoAllOvers}
                />
            }
          </>
      }

    </section>

  )
}
