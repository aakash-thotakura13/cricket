import { createBrowserRouter } from "react-router";
import App from "../App";
import { SelectTeam   } from "../pages/SelectTeam";
import { ScoreCard    } from "../pages/ScoreCard";
import { OverDetails  } from "../pages/OverDetails";
import { Partnerships } from "../pages/Partnerships";
import { Graphs       } from "../pages/Graphs";
import { Comparison   } from "../pages/Comparison";


export const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "select",
        element: <SelectTeam />,
      },
      {
        path: "scorecard",
        element: <ScoreCard />,
      },
      {
        path: "partnership",
        element: <Partnerships />
      },
      {
        path: "overs",
        element: <OverDetails />
      },
      {
        path: "graphs",
        element: <Graphs />,
      },
      {
        path: "comparison",
        element: <Comparison />
      },
    ],
  }
]);