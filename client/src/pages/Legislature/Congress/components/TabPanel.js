import React, { useState } from "react";

import List from "@material-ui/core/List";

import moment from "moment-timezone";
import Pagination from "@material-ui/lab/Pagination";
import LawListHeader from "./LawListHeader";
import SuggestDetail from "../modals/SuggestDetail";
import BillDetail from "../modals/BillDetail";

export default function TabPanel(props) {
  const [page, setPage] = useState(1);
  const pageChange = (event, value) => {
    setPage(value);
  };

  const quorum = 3;

  const { children, value, index, data, numofstudent, ...other } = props;

  const [suggestOpen, setSuggestOpen] = useState(false);
  const [billOpen, setBillOpen] = useState(false);
  const [selected, setselected] = useState();
  const modalOpen = (item) => {
    setselected(item);

    if (index === 0) {
      setSuggestOpen(true);
    } else if (index === 1) {
      setBillOpen(true);
    }
  };

  const suggestClose = () => {
    setSuggestOpen(false);
  };

  const billClose = () => {
    setBillOpen(false);
  };

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`congress-tabpanel-${index}`}
      aria-labelledby={`congress-tab-${index}`}
      {...other}
    >
      {index === 0 ? (
        <LawListHeader types={"suggest"} />
      ) : (
        <LawListHeader types={"vote"} />
      )}
      <hr className="m-0 py-1" />
      {/* Tab안의 게시판*/}
      <List>
        {data.slice((page - 1) * 5, page * 5).map((item, i) => (
          <div key={i} onClick={() => modalOpen(item)}>
            <div className="card-body" id={"law" + item.id}>
              <div className="row no-gutters align-items-center">
                <div className="col-2 mr-2 d-none d-sm-inline">
                  <div className="mb-0 font-weight-bold text-gray-500">
                    D-
                    {moment(item.createdAt)
                      .tz("Asia/Seoul")
                      .add(7, "d")
                      .diff(moment().tz("Asia/Seoul"), "days")}
                  </div>
                </div>
                <div className="col mr-2">
                  <div className="h6 mb-0 text-gray-800 font-weight-bold ">
                    {item.title}
                  </div>
                </div>
                {index === 0 ? (
                  <div className="col-auto h5 font-weight-bold text-primary">
                    {Math.round((item.numvoter / quorum) * 100) + "%"}
                  </div>
                ) : (
                  <div className="col-auto h5 font-weight-bold text-primary">
                    {numofstudent === 0
                      ? 0
                      : Math.round((item.numvoter / numofstudent) * 100) + "%"}
                  </div>
                )}
                {/* ayes:numvoter */}
              </div>
              <div className="d-block d-sm-none">
                <div className="py-2"></div>
                <div className="row no-gutters align-items-center justify-content-end">
                  <div className="col-auto ">
                    <div className="mb-0 font-weight-bold text-gray-500">
                      ~ 10/2
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <hr className="m-0" />
          </div>
        ))}
      </List>

      <Pagination
        className="row justify-content-center"
        size="small"
        page={page}
        count={Math.ceil(data.length / 5)}
        color="primary"
        onChange={pageChange}
      />
      {/* 해당 row 선택했을 때 */}
      {selected && (
        <>
          <SuggestDetail
            open={suggestOpen}
            modalClose={suggestClose}
            data={selected}
          />
          <BillDetail
            open={billOpen}
            modalClose={billClose}
            data={selected}
            numofstudent={numofstudent}
          />
        </>
      )}
    </div>
  );
}
