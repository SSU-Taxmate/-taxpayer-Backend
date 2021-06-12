import React from 'react'
import ClassCard from './ClassCard'

function ClassListDetail() {
    return (
        
        <div className="row">

        {/*<!--className 추가-->*/}
        <div className="col-lg-3">
            <div className="card mb-4">
                <div className="card-body">
                    <i className="far fa-plus-square" 
                        data-toggle="modal" data-target="#AddClassModal"></i>
                </div>
            </div>
        </div>

         <ClassCard title="햇빛반" img="https://assets.tvo.org/prod/s3fs-public/styles/full_width_1280/public/article-thumbnails/kids%20in%20classroom.JPG?KgEyQTBORydSiHj.xIj8ROjMdJvgPW4r&itok=G4OLcZhp" comment="햇빛반은 6-3반!"></ClassCard>
        </div>
    )
}

export default ClassListDetail
