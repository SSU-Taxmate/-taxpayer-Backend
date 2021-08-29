import React, { useState, useEffect } from "react";
import ChartBar from "../../../../../components/Charts/Bar";
import Error from "../../../../../components/Error";
import Loading from "../../../../../components/Loading";
import axios from "axios";
import { useSelector } from "react-redux";

function BudgetStatistics() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  let classData = useSelector((state) => state.classInfo.classData);
  const [data, setdata] = useState([]);
  const [revenue, setrevenue] = useState();
  const [expend, setexpend] = useState();
  const finance_labels = [
    //현재 날자까지
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];
  const finance_last_data = {
    labels: finance_labels,
    datasets: [
      {
        label: "세입",
        data: revenue,
        backgroundColor: "rgba(201, 203, 207, 0.2)",
        borderColor: "rgb(153, 102, 255)",
        borderWidth: 1,
      },
      {
        label: "세출",
        data: expend,
        backgroundColor: "rgba(255, 159, 64, 0.2)",
        borderColor: "rgb(255, 99, 132)",

        borderWidth: 1,
      },
    ],
  };

  const fetchData = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      const result = await axios.get("/api/budget/history", {
        params: { classId: classData.classId },
      });
      console.log("budget>>>>", result.data);
      setdata(result.data);

      const revenue = result.data.filter((v) => v._id.transType === 1);
      setrevenue(revenue.map((v, i) => v.sum));

      const expend = result.data.filter((v) => v._id.transType === 0);
      setexpend(expend.map((v, i) => v.sum));
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="col-md-7">
      <div
        className="card py-1 border-0"
        style={{ justifyContent: "space-evenly" }}
      >
        {isError && <Error></Error>}
        {isLoading ? (
          <Loading />
        ) : (
          data && (
            <>
              <ChartBar
                id="finance_last"
                title="재정 상황"
                data={finance_last_data}
              />
            </>
          )
        )}
      </div>
    </div>
  );
}

export default BudgetStatistics;
