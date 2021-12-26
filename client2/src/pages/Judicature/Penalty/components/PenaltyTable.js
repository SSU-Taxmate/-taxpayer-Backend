import React from "react";

import { DataGrid } from "@material-ui/data-grid";

function PenaltyTable(props) {
  const columns = props.columns;
  return (
    <div className="row justify-content-center mt-3">
      <div style={{ height: 500, width: "80%" }}>
        <DataGrid
          rows={props.data}
          columns={columns}
          disableSelectionOnClick
          autoPageSize
        />
      </div>
    </div>
  );
}

export default PenaltyTable;
