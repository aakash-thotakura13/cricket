import { useAtom } from "jotai";

// states
import { inningsOneAllOvers, inningsTwoAllOvers } from "../jotai/atom";

// functions
import { combineData } from "../function/combineData";

export const Comparison = () => {

  const [_inningsOneAllovers, setInningsOneAllOvers] = useAtom(inningsOneAllOvers);
  const [_inningsTwoAllovers, setInningsTwoAllOvers] = useAtom(inningsTwoAllOvers);

  const displayData = combineData(_inningsOneAllovers, _inningsTwoAllovers) || [];

  console.clear();
  console.table(displayData);

  return (
    <div>

    </div>
  )
}