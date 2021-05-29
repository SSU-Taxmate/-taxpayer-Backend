import React from 'react'

function ClassListDetail() {
    return (
        
        <div class="row">

        {/*<!--class 추가-->*/}
        <div class="col-lg-3">
            <div class="card mb-4">
                <div class="card-body">
                    <i class="far fa-plus-square" 
                        data-toggle="modal" data-target="#AddClassModal"></i>
                </div>
            </div>
        </div>

        <div class="col-lg-3">
             {/*<!-- Dropdown Card Example -->*/}
            <div class="card shadow mb-4">
                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 class="m-0 font-weight-bold text-primary"><i class="fas fa-star"></i>
                        <a href="/Classes/:classId">꿈나무 반 </a>
                    </h6>
                     {/*<!--꿈나무반 card 시작-->*/}
                    <div class="dropdown no-arrow">
                        <i class="fas fa-external-link-alt"
                             data-toggle="modal"
                            data-target="#DisplayCode"></i>
                         {/*<!--참가코드 생성 창 띄우기-->*/}
                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400" ></i>
                        </a>
                         {/*<!--꿈나무 반 설정-->*/}
                        <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                            aria-labelledby="dropdownMenuLink">
                            <div class="dropdown-header">꿈나무 반 설정:</div>
                            <a class="dropdown-item" href="#">삭제</a>
                            <a class="dropdown-item" href="#">뭐시기</a>
                        </div>
                    </div>
                     {/* <!--꿈나무반 card 끝-->*/}

                </div>
                {/*<!-- Card Body 사진을 올리면 사이즈에 맞게 조정해서 fit하게 들어가기 -->*/}
                <div class="card-body">
                    <img class="card-img-bottom rounded" src="https://assets.tvo.org/prod/s3fs-public/styles/full_width_1280/public/article-thumbnails/kids%20in%20classroom.JPG?KgEyQTBORydSiHj.xIj8ROjMdJvgPW4r&itok=G4OLcZhp"
                  ></img>
                    <br/>
                    <p >숭실초등학교 6-2반 (2021)</p>
                </div>

            </div>
        </div>

    </div>
    )
}

export default ClassListDetail
