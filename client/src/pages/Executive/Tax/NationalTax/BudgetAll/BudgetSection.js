import React from "react";

import DurationAll from "./DurationAll";
import DurationMonth from "./DurationMonth";

function BudgetSection() {

  return (
    <div className="card py-1 col-md-4 border-0">
      <div className="row d-flex pt-3" style={{ height: "100%", flexDirection: "column" }}>
        <DurationAll />
        <DurationMonth />
      </div>
    </div>
  );
}

export default BudgetSection;
