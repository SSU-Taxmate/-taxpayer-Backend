import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loading from "../../../components/Loading";

import Transfer from "./components/Transfer";
import PenaltyTable from "./components/PenaltyTable";
import FinePayDialog from "./components/FinePayDialog";

import CheckIcon from "@material-ui/icons/Check";
import PageFrame from "../../PageFrame";

function Penalty() {
  //job date 요청
  const [isLoading, setIsLoading] = useState(false);
  const [err, setIsError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let classData = useSelector((state) => state.classInfo.classData);
  let user = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [laws, setLaws] = useState([]);
  const [fines, setFine] = useState([]);
  const [modalRow, setModalRow] = useState([]);
  const [select, setSelection] = useState([]);

  function FineSelected(params) {
    setModalRow(params.row);
    // FineDetailModalOpen();
  }

  const handleRowSelection = (items) => {
    //선택된 row의 id값들의 배열=items
    setSelection(items);
  };

  useEffect(() => {
    const getUsers = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get("/api/students", {
          params: { classId: classData.classId },
        });

        let temp = [];
        for (let i = 0; i < result.data.length; i++) {
          temp.push({ ...result.data[i], id: result.data[i].studentId });
        }
        setUsers(temp);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    const getLaws = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get("/api/laws", {
          params: { classId: classData.classId },
        });
        let temp = [];
        for (let i = 0; i < result.data.length; i++) {
          temp.push({ ...result.data[i], id: result.data[i]._id });
        }
        setLaws(temp);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    const getFines = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get("/api/fine", {
          params: { classId: classData.classId },
        });
        let fines = [];
        for (let i = 0; i < result.data.length; i++) {
          fines.push({ ...result.data[i], id: result.data[i]._id });
        }
        setFine(fines);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };

    getLaws();
    getUsers();
    getFines();
  }, []);

  const columns = [
    { field: "name", headerName: "학생이름", flex: 3, minWidth: 150 },
    { field: "lawReason", headerName: "사유", flex: 3, minWidth: 150 },
    { field: "Amount", headerName: "금액", flex: 3, minWidth: 150 },
    {
      field: "isPayed",
      headerName: "납부",
      flex: 3,
      minWidth: 150,
      type: "boolean",
    },
  ];

  const columnStudent = [
    { field: "name", headerName: "학생이름", flex: 3, minWidth: 150 },
    { field: "lawReason", headerName: "사유", flex: 3, minWidth: 150 },
    { field: "Amount", headerName: "금액", flex: 3, minWidth: 150 },
    {
      field: "isPayed",
      headerName: "납부",
      flex: 3,
      minWidth: 150,
      type: "boolean",
      renderCell: (params) =>
        params.value === false ? (
          <FinePayDialog data={params.row}></FinePayDialog>
        ) : (
          <CheckIcon />
        ),
    },
  ];
  return (
    <PageFrame>
      {/* <!-- Page Heading --> */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center py-5 mx-4">
            {user.userData && user.userData.role === 0 ? (
              <h3>벌금</h3>
            ) : (
              <h3>나의 벌금 내역</h3>
            )}
            {isLoading ? (
              <Loading />
            ) : (
              user.userData &&
              fines && (
                <PenaltyTable
                  data={
                    user.userData.role === 0
                      ? fines
                      : fines.filter(
                        (v) => v.studentId_id == user.userData._id
                      )
                  }
                  columns={
                    user.userData.role === 0 ? columns : columnStudent
                  }
                />
              )
            )}
          </div>
          {user.userData && user.userData.role === 0 ? (
            <div className="text-center card py-5 shadow">
              <h4>벌금부과</h4>
              <div className="row justify-content-center">
                {isLoading ? null : (
                  <Transfer users={users} laws={laws} />
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </PageFrame>
  );
}
export default Penalty;
