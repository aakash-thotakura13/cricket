import { useAtom } from "jotai"
import { NavLink } from "react-router"
import { teamOne, teamTwo } from "../jotai/atom"

const definedRoutes = [
  {
    path: "/select",
    element: "Select",
  },
  {
    path: "/scorecard",
    element: "Scorecards",
  },
  {
    path: "/partnership",
    element: "Partnerships",
  },
  {
    path: "/overs",
    element: "Overs",
  },
  {
    path: "/graphs",
    element: "Graphs",
  },
  {
    path: "/comparison",
    element: "Comparisons",
  },
]

export default function HeaderComponent() {

  const _teamOne = useAtom(teamOne)
  const _teamTwo = useAtom(teamTwo)

  return (
    <div>
      <nav style={{ display: "flex", justifyContent: "space-between", overflowY: "hidden", scrollbarWidth: "0.1em", scrollbars: "none" }}>
        {
          definedRoutes.map((route, id) =>
            <NavLink
              key={id}
              to={route.path}
              style={({ isActive }) => ({ textDecoration: "none",  padding: "0.35em 0.7em", color: "white", fontWeight: isActive ? "bold" : "normal", borderBottom: isActive ? "3px solid white" : "none", })}
            >
              {route.element === "Select"
                ? (Object.keys(_teamOne[0]).length > 0 && Object.keys(_teamTwo[0]).length > 0) ? "Game" : route.element
                : route.element}
            </NavLink>
          )
        }
      </nav>

    </div>
  )
}