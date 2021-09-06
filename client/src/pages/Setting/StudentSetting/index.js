import React, { useState, useEffect } from "react";
import PageHeading from "../../../components/PageHeading";

//modal import
import { DataGrid } from "@material-ui/data-grid";

import { useSelector } from "react-redux";
import axios from "axios";

import StudentCard from "./components/StudentCard";
import PageFrame from "../../PageFrame";

function StudentSetting() {
  //job date 요청
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [err, setIsError] = useState(false);
  const showapplicant = () => {
    //modal 띄워서 axios요청 보냄
  };
  let classData = useSelector((state) => state.classInfo.classData);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get("/api/students", {
          params: { classId: classData.classId },
        });
        console.log("student", result);

        let temp = [];
        for (let i = 0; i < result.data.length; i++) {
          temp.push({ ...result.data[i], id: result.data[i].studentId });
        }
        setData(temp);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const columns = [
    { field: "name", headerName: "이름", flex: 3, minWidth: 150 },
    { field: "balance", headerName: "계좌", flex: 3, minWidth: 150 },
    { field: "email", headerName: "이메일", flex: 3, minWidth: 150 },
  ];

  const [row, setRow] = useState([]);

  function studentSelected(params) {
    setRow(params.row);
  }

  return (
    <PageFrame>




      <PageHeading title="학생 세팅" />
      {/* <!-- Content Row --> */}

      <div className="row justify-content-center">
        <div
          style={{ height: 500, width: "100%" }}
          className="col-lg-4"
        >
          <DataGrid
            columns={columns}
            rows={data}
            autoPageSize
            onRowDoubleClick={(params) => studentSelected(params)}
            disableSelectionOnClick
          />
        </div>
        <div className="col-lg-6 card shadow m-4">
          <StudentCard row={row} />
        </div>
      </div>




    </PageFrame>
  );
}

export default StudentSetting;
