import { useAtom } from "jotai";

// states
import { inningsOneAllOvers, inningsTwoAllOvers } from "../jotai/atom";

// components
import { PageTitle } from "../components/PageTitle"
import { SimpleBarChart } from "../components/chart/SimpleBarChart";
import { SimpleLineChart } from "../components/chart/SimpleLineChart";
import { SimpleAreaChart } from "../components/chart/SimpleAreaChart";

// functions
import { combineData } from "../function/combineData";

export const Graphs = () => {

  const [_inningsOneAllovers, setInningsOneAllOvers] = useAtom(inningsOneAllOvers);
  const [_inningsTwoAllovers, setInningsTwoAllOvers] = useAtom(inningsTwoAllOvers);

  const displayData = combineData(_inningsOneAllovers, _inningsTwoAllovers) || [];


  return (
    <div>
      <PageTitle title="Graphs" />

      <SimpleBarChart
        data={displayData}
        dataKeyOne="oneRun"
        dataKeyTwo="twoRun"
        xAxisKey="over"
        yAxisKey="runs"
        title="Runs per Over Comparison"
        colorOne="green"
        colorTwo="orange"
      />

      <SimpleLineChart
        data={displayData}
        dataKeyOne="oneTotalRuns"
        dataKeyTwo="twoTotalRuns"
        xAxisKey="over"
        yAxisKey="runs"
        title="Runs per Over Comparison"
        colorOne="green"
        colorTwo="orange"
      />

      <SimpleAreaChart
        data={displayData}
        dataKeyOne="oneRunRate"
        dataKeyTwo="twoRunRate"
        xAxisKey="over"
        yAxisKey="runs"
        title="Runs per Over Comparison"
        colorOne="green"
        colorTwo="orange"
      />

    </div>
  )
}