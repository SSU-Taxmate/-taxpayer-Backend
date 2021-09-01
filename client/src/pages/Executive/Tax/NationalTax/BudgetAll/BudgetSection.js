import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Error from "../../../../../components/Error";
import Loading from "../../../../../components/Loading";
function BudgetSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [budget, setbudget] = useState();
  let classData = useSelector((state) => state.classInfo.classData);

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await axios.get("/api/budget", {
        params: { classId: classData.classId },
      });
      setbudget({
        balance: result.data.balance,
        debet: result.data.debet,
        expenditure: result.data.expenditure,
      });
      console.log("/api/budget", result.data);
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [classData.classId]);
  return (
    <div className="card py-1 col-md-4 border-0">
      {isError && <Error></Error>}
      {isLoading ? (
        <Loading />
      ) : (
        budget && (
          <>
            {" "}
            <div style={{ marginLeft: "-1rem", fontSize: "1.5rem" }}>
              이번달 재정 현황
            </div>
            <div
              className="row d-flex pt-3"
              style={{ height: "100%", flexDirection: "column" }}
            >
              <table
                className="border-right h5 mb-2"
                style={{
                  borderCollapse: "separate",
                  borderSpacing: "0 0.5rem",
                }}
              >
                <tbody>
                  <tr>
                    <td>보유세금</td>
                    {/*국채+세금*/}
                    <td style={{ float: "right", marginRight: "1rem" }}>
                      {budget.balance.income +
                        budget.balance.realestate +
                        budget.balance.place +
                        budget.balance.electric +
                        budget.balance.stamp +
                        budget.balance.vat +
                        budget.balance.stock +
                        budget.debet}
                      미소
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td>국채</td>
                    <td style={{ float: "right", marginRight: "1rem" }}>
                      {budget.debet}미소
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                className="border-right h5 mt-2"
                style={{
                  borderCollapse: "separate",
                  borderSpacing: "0 0.5rem",
                }}
              >
                <tbody>
                  <tr>
                    <td>세입</td>
                    <td style={{ float: "right", marginRight: "1rem" }}>
                      {budget.balance.income +
                        budget.balance.realestate +
                        budget.balance.place +
                        budget.balance.electric +
                        budget.balance.stamp +
                        budget.balance.vat +
                        budget.balance.stock}
                      미소
                    </td>
                  </tr>
                  <tr>
                    <td>세출</td>
                    <td style={{ float: "right", marginRight: "1rem" }}>
                      {budget.expenditure.culture +
                        budget.expenditure.education +
                        budget.expenditure.environment}
                      미소
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )
      )}
    </div>
  );
}

export default BudgetSection;
