import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

//modal import
import { DataGrid, GridToolbarFilterButton } from "@material-ui/data-grid";
import { Box, Button, ButtonGroup, Paper } from "@material-ui/core";
import {
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridCellParams,
  GridColDef,
} from "@material-ui/data-grid";
import AddRoundedIcon from "@material-ui/icons/AddRounded";


function PenaltyTable(props) {


  const columns = props.columns;
  const [data, setData] = useState(props.data);


  let user = useSelector((state) => state.user);

  function filterRow(status) {
    status !== null
      ? setData(props.data.filter((data) => data.isPayed === status))
      : setData(props.data);
  }

  function PaneltyToolbar() {
    return (
      <GridToolbarContainer className="card-header py-1 d-flex flex-row align-items-center justify-content-between">
        <div className="m-0 font-weight-bold text-primary mx-2">
          {user.role === 0 ? (
            <ButtonGroup color="primary" variant="text" spacing={1}>
              <Button onClick={props.jobAddModalOpen}>
                <AddRoundedIcon />
              </Button>
            </ButtonGroup>
          ) : null}
        </div>

        {/* status에 따라서 필터링하기 */}
        <div className="dropdown no-arrow mx-3">
          <a
            className="dropdown-toggle"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
          </a>

          <div
            className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
            aria-labelledby="dropdownMenuLink"
          >
            <a
              className="dropdown-item"
              role="button"
              onClick={() => filterRow(null)}
            >
              전체
            </a>
            <a
              className="dropdown-item"
              role="button"
              onClick={() => filterRow(false)}
            >
              미납
            </a>
            <a
              className="dropdown-item"
              role="button"
              onClick={() => filterRow(true)}
            >
              납부
            </a>
          </div>
        </div>
      </GridToolbarContainer>
    );
  }

  return (
    <div className="row justify-content-center">
      <div style={{ height: 500, width: "100%" }}>
      <DataGrid
          rows={props.data}
          columns={columns}
          components={{
            Toolbar: PaneltyToolbar,
          }}
          disableSelectionOnClick
          autoPageSize
        />
      </div>
    </div>
  );
}

export default PenaltyTable;
