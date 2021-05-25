import React from 'react'

function ClassMainDetail() {
    return (
        <div class="row">
        <div class="col-md-6">
            <div class="card mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary text-center">신용등급 현황</h6>
                </div>
                <div class="card-body">
                    <div class="px-3 py-4 bg-primary text-white">
                        <div class="creditClass" ><b>1000-800</b></div>
                        <div class="creditnum" ><b>13명</b></div>
                        <div class="creditProfile" >
                            <a href="#" class="btn btn-circle btn-sm ">
                                <img class="img-profile rounded-circle"
                                    src="img/undraw_profile.svg"/></a>
                        </div>
                    </div>
                    <div class="px-3 py-4 bg-info text-white"><b>800-600</b></div>
                    <div class="px-3 py-4 bg-success text-white"><b>600-400</b></div>
                    <div class="px-3 py-4 bg-warning text-white"><b>400-200</b></div>
                    <div class="px-3 py-4 bg-danger text-white"><b>200-0</b></div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="card mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">의결</h6>
                </div>
                <div class="card-body">
                    <div class="mb-1 small">DJ 직업개설</div>
                    <div class="progress progress-sm mb-2">
                        <div class="progress-bar" role="progressbar"
                            aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <div class="mb-1 small">세금 올리기</div>
                    <div class="progress progress-sm mb-2">
                        <div class="progress-bar" role="progressbar" 
                            aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ClassMainDetail
