import React from 'react'
import ClassCard from './ClassCard'

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

         <ClassCard title="햇빛반" img="https://assets.tvo.org/prod/s3fs-public/styles/full_width_1280/public/article-thumbnails/kids%20in%20classroom.JPG?KgEyQTBORydSiHj.xIj8ROjMdJvgPW4r&itok=G4OLcZhp" comment="햇빛반은 6-3반!"></ClassCard>
        </div>
    )
}

export default ClassListDetail
