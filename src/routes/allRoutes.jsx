import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import App from "../App";

// Lazy load named exports
const SelectTeam   = lazy(() => import("../pages/SelectTeam"  ).then((m) => ({ default: m.SelectTeam })));
const ScoreCard    = lazy(() => import("../pages/ScoreCard"   ).then((m) => ({ default: m.ScoreCard })));
const OverDetails  = lazy(() => import("../pages/OverDetails" ).then((m) => ({ default: m.OverDetails })));
const Partnerships = lazy(() => import("../pages/Partnerships").then((m) => ({ default: m.Partnerships })));
const Graphs       = lazy(() => import("../pages/Graphs"      ).then((m) => ({ default: m.Graphs })));
const Comparison   = lazy(() => import("../pages/Comparison"  ).then((m) => ({ default: m.Comparison })));

export const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "select",      element: <SelectTeam />   },
      { path: "scorecard",   element: <ScoreCard />    },
      { path: "partnership", element: <Partnerships /> },
      { path: "overs",       element: <OverDetails />  },
      { path: "graphs",      element: <Graphs />       },
      { path: "comparison",  element: <Comparison />   },
    ],
  },
]);
