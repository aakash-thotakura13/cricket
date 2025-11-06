import { createBrowserRouter } from "react-router";
import App from "../App";
import { SelectTeam } from "../pages/SelectTeams";
import { ScoreCard } from "../pages/ScoreCard";

export const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/select",
        element: <SelectTeam />,
      },
      {
        path: "/scorecard",
        element: <ScoreCard />,
      },
      {
        path: "/partnership",
        element: <>Partnerships</>
      },
      {
        path: "/overs",
        element: <>Overs</>
      },
      {
        path: "/graphs",
        element: <>Graphs</>
      },
      {
        path: "/comparison",
        element: <>Comparisons</>
      },
    ],
  }
]);