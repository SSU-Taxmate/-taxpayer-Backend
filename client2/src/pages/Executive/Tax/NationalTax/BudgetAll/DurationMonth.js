import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Error from "../../../../../components/Error";
import Loading from "../../../../../components/Loading";
function DurationMonth() {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [budget, setbudget] = useState();
    let classData = useSelector((state) => state.classInfo.classData);

    const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
        try {
            const result = await axios.get("/api/budget/month", {
                params: { classId: classData.classId },
            });
            console.log('>>>>>>>>>>>>>>>>>',result.data)
            setbudget(result.data);
        } catch (error) {
            setIsError(true);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [classData.classId]);
    return (
        <> {isError && <Error></Error>}
            {isLoading ? 
                <Loading />
            : (
                budget && 
                <>
                    <div style={{ marginLeft: "-1rem", fontSize: "1.5rem" }}>
                        이번달 재정 현황
                    </div>
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
                                    {budget.revenue.income +
                                        budget.revenue.realestate +
                                        budget.revenue.vat +
                                        budget.revenue.stock+
                                        budget.revenue.fine}
                                    미소
                                </td>
                            </tr>
                            <tr>
                                <td>세출</td>
                                <td style={{ float: "right", marginRight: "1rem" }}>
                                    {budget.expenditure.culture +
                                        budget.expenditure.education +
                                        budget.expenditure.environment+
                                        budget.expenditure.etc}
                                    미소
                                </td>
                            </tr>
                            <tr>
                                <td>발행국채</td>
                                <td style={{ float: "right", marginRight: "1rem" }}>
                                    {budget.debet}미소
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </>
    )
}

export default DurationMonth
