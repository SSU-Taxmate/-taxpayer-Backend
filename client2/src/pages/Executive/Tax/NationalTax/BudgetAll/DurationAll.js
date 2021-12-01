import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Error from "../../../../../components/Error";
import Loading from "../../../../../components/Loading";
function DurationAll() {
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
            });
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [classData.classId]);

    return (
        <>
        {isError && <Error></Error>}
        {isLoading ? 
            <Loading />
        : (
            budget && 
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
                      {budget.balance+budget.debet}미소
                    </td>
                  </tr>
                  <tr></tr>
                  <tr>
                    <td>누적국채</td>
                    <td style={{ float: "right", marginRight: "1rem" }}>
                      {budget.debet}미소
                    </td>
                  </tr>
                </tbody>
              </table>
              )}
        </>
    )
}

export default DurationAll
