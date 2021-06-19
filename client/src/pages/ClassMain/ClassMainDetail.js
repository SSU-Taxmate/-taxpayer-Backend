import React from 'react'

export default function ClassMainDetail() {
    return (
        <div className="row">
        <div className="col-md-6">
            <div className="card mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary text-center">신용등급 현황</h6>
                </div>
                <div className="card-body">
                    <div className="px-3 py-4 bg-primary text-white">
                        <div className="creditClass" ><b>1000-800</b></div>
                        <div className="creditnum" ><b>13명</b></div>
                        <div className="creditProfile" >
                                <img className="img-profile rounded-circle"
                                    src="img/undraw_profile.svg"/>
                        </div>
                    </div>
                    <div className="px-3 py-4 bg-info text-white"><b>800-600</b></div>
                    <div className="px-3 py-4 bg-success text-white"><b>600-400</b></div>
                    <div className="px-3 py-4 bg-warning text-white"><b>400-200</b></div>
                    <div className="px-3 py-4 bg-danger text-white"><b>200-0</b></div>
                </div>
            </div>
        </div>
        <div className="col-md-6">
            <div className="card mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">의결</h6>
                </div>
                <div className="card-body">
                    <div className="mb-1 small">DJ 직업개설</div>
                    <div className="progress progress-sm mb-2">
                        <div className="progress-bar" role="progressbar"
                            aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div className="mb-1 small">세금 올리기</div>
                    <div className="progress progress-sm mb-2">
                        <div className="progress-bar" role="progressbar" 
                            aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

