import { useAtom } from "jotai"
import { NavLink } from "react-router"
import { teamOne, teamTwo } from "../jotai/atom"

const definedRoutes = [
  { path: "/select", element: "Select", },
  { path: "/scorecard", element: "Scorecards", },
  { path: "/partnership", element: "Partnerships", },
  { path: "/overs", element: "Overs", },
  { path: "/graphs", element: "Graphs", },
  { path: "/comparison", element: "Comparisons", },
];

export default function HeaderComponent() {

  const [teamOneValue] = useAtom(teamOne);
  const [teamTwoValue] = useAtom(teamTwo);

  const showGame = Object.keys(teamOneValue).length > 0 && Object.keys(teamTwoValue).length > 0;

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        overflowY: "hidden",
        position: "sticky",
        top: 0, borderBottom: "2.5px solid #ccc",
        backgroundColor: "#1c1c1c",
        zIndex: 1000,
        padding: "0.35em 0.7em",
      }}
    >
      {
        definedRoutes.map((route, id) =>
          <NavLink
            key={id}
            to={route.path}
            style={({ isActive }) => ({
              textDecoration: "none",
              padding: "0.25em 0.5em",
              color: "#fff",
              fontWeight: isActive ? "bold" : "normal",
              borderTop: isActive ? "1.75px solid grey" : "1px solid transparent",
              borderBottom: isActive ? "1.75px solid grey" : "1px solid transparent",
              backgroundColor: isActive ? "#3c3c3c" : "transparent",
              borderRadius: "1em",
            })}
          >
            {
              route.element === "Select"
                ? (
                  showGame
                    ? "Game"
                    : route.element
                )
                : route.element
            }
          </NavLink>
        )
      }
    </nav>
  )
};