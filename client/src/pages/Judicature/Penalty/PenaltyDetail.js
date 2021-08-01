import React, { Component,useEffect, useState } from "react";
import CardBasic from "../../../components/Cards/Basic"
import TableTheme from "../../../components/Table/TableTheme"
import axios from 'axios';
import Error from "../../../components/Error";

function PenaltyDetail() {

    const [isLoading, setIsLoading] = useState(false)
    const [columns, setColumns] = useState([])
    const [data, setData] = useState([])
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
            try {
                const result = await axios.get('/api/stats/nation');
                setData(result.data['data']);
                setColumns(result.data['columns'])
            } catch (error) {
                setIsError(true);

            }
            setIsLoading(false);

        };
        fetchData();
    }, []);
    
    return (
    <div>
        <ul className="nav nav-tabs" id="penalty_tabs" role="tablist">
        <li className="nav-item">
            <a className="nav-link active " id="impose_tab" data-toggle="tab" href="#impose" role="tab"
                aria-controls="impose" aria-selected="true">벌금부과</a>
        </li>
        <li className="nav-item">
            <a className="nav-link" id="penal_list_tab" data-toggle="tab" href="#penal_list" role="tab"
                aria-controls="penal_list" aria-selected="false">형법</a>
        </li>

        </ul>

        <div className="tab-content" id="penalTabContent">
            <div className="tab-pane fade show active" id="impose" role="tabpanel" aria-labelledby="impose_tab">
    
            <CardBasic title="금액보내기">
                    <div className="mb-4"></div>

                    <div className="input-group input-group-newsletter col-lg-12 py-3">
                        <input className="form-control nav-item dropdown nav-link" type="text"
                        placeholder="이름" aria-describedby="submit-button"
                        id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false" />

                        <div className="dropdown-menu dropdown-menu animated--grow-in"
                        aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="#">김승주</a>
                        <a className="dropdown-item" href="#">박은정</a>
                        <a className="dropdown-item" href="#">배미혜</a>

                    </div>
                </div>
                
                <div className="mb-2"></div>

                <div>
    <div className="input-group input-group-newsletter col-lg-12 py-3">
                    <input className="form-control nav-item dropdown nav-link" type="text"
                        placeholder="사유" aria-describedby="submit-button"
                        id="navbarDropdown" role="button" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false" />

                    <div className="dropdown-menu dropdown-menu animated--grow-in"
                        aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="#">절도</a>
                    </div>
                </div>

        <div className="mb-4"></div>
        <div className="mb-3">
                <nav className="bg-light py-4">


        <div className="row text-center">
            <div className="text-lg font-weight-bold text-primary text-uppercase col-lg-4">
                부과 금액</div>
            <div className="col-lg-4">

                <input data-nemo="sender-pays-amount" dir="ltr"
                    autocomplete="off" type="tel" name="senderPaysAmount"
                    id="fn-senderPaysAmount" required="" className="ppaf-input text-lg"
                    value="0.00"/>
            </div>

            <div className="font-weight-bold text col-lg-4 text-center">미소</div>
        </div>
    </nav>

        </div>

        </div>
                

                <div className="col-lg-12 text-center py-4" >
                    <a href="#"
                        className="btn btn-primary btn-icon-split btn-lg font-weight-bold">
                        <span className="text">벌금 부과</span>
                    </a>

                </div>
       
            </CardBasic>
            </div>
            
<div className="tab-pane fade" id="penal_list" role="tabpanel" aria-labelledby="penal_list_tab">

    <CardBasic >
    {isError && <Error></Error>}
        {isLoading ?
                    <div>loading</div> : (
                        <TableTheme
                            title="제출여부"
                            columns={columns[0]}
                            data={data[0]}
                            options={{
                                sorting: true, filtering: true, exportButton: true,
                                grouping: true,
                                headerStyle: {
                                     whiteSpace: 'nowrap'
                                  }
                            }}
                        />
                    )}

           
    </CardBasic>
</div>
</div>
</div>



    )

}

/*
function Criminal_law(){


   
}

function criminal_law_list(){

    const criminal_laws =[

        {
            name: '도로교통법',
            fine: 200,
        }
,
        {
            name: '욕설',
            fine: 100,
        }
,
        {
            name: '절도',
            fine: 500,
        }
,
    ]

    return (
        <a>
          {criminal_laws.map(criminal_law => (
            <Criminal_law criminal_law={criminal_law} key={criminal_law.name} />
          ))}
        </a>
      );

}*/

export default PenaltyDetail;