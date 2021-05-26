import React from 'react'
import CardBasic from '../../../components/Cards/Basic';

function MyTaxDetail() {
    return (
        <CardBasic title='이번달 내가 내야할 세금'>
            {/* <!--직접세  시작-->*/}
            <p className="h5 mb-3">직접세</p>
            <form className="ml-1">
                <div className="form-row">
                    <div className="form-group col-md-4">
                        <label htmlFor="incometaxrate">소득세</label>

                        <div className="input-group mb-3">
                            <input
                                readOnly={true}
                                type="number"
                                className="form-control"
                                id="incometaxrate"
                                placeholder="소득세"
                                min="0"
                                max="100"
                                step="5"
                            />
                            <div className="input-group-append">
                                <span className="input-group-text"
                                >미소</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="realestatetaxrate">부동산세</label>
                        <div className="input-group mb-3">
                            <input
                                readOnly={true}
                                type="number"
                                className="form-control"
                                id="realestatetaxrate"
                                placeholder="부동산세"
                                min="0"
                                max="100"
                                step="5"
                            />
                            <div className="input-group-append">
                                <span className="input-group-text" 
                                >미소</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-md-4">
                        <label htmlFor="seattaxrate">자리세</label>
                        <div className="input-group mb-3">
                            <input
                                readOnly={true}
                                type="number"
                                className="form-control"
                                id="seattaxrate"
                                placeholder="자리세"
                                min="0"
                                max="100"
                                step="5"
                            />
                            <div className="input-group-append">
                                <span className="input-group-text" id="percent12"
                                >미소</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/*<!--직접세  끝-->*/}

            {/*<!--   간접세  시작     -->*/}
            <div className="row mb-3">
                <div className="col">
                    <p className="h5">
                        간접세
                <i
                            className="fas fa-info-circle"
                            id="popover_btn"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="right"
                            data-content="간접세 설명을 적어봅시다"
                        ></i>
                    </p>
                </div>
            </div>
            <form className="ml-1">
                <div className="form-row">
                    <div className="form-group col-lg-3">
                        <label htmlFor="electrictaxrate">전기세</label>

                        <div className="input-group mb-3">
                            <input
                                readOnly={true}
                                type="number"
                                className="form-control"
                                id="electrictaxrate"
                                placeholder="전기세"
                                min="0"
                                max="100"
                                step="5"
                            />
                            <div className="input-group-append">
                                <span className="input-group-text" id="percent">미소</span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-lg-3">
                        <label htmlFor="stamptaxrate">인지세</label>
                        <div className="input-group mb-3">
                            <input
                                readOnly={true}
                                type="number"
                                className="form-control"
                                id="stamptaxrate"
                                placeholder="인지세"
                                min="0"
                                max="100"
                                step="5"
                            />
                            <div className="input-group-append">
                                <span className="input-group-text" id="percent2"
                                >미소</span
                                >
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-lg-3">
                        <label htmlFor="vatrate">부가가치세</label>
                        <div className="input-group mb-3">
                            <input
                                readOnly={true}
                                type="number"
                                className="form-control"
                                id="vatrate"
                                placeholder="부가가치세"
                                min="0"
                                max="100"
                                step="5"
                            />
                            <div className="input-group-append">
                                <span className="input-group-text" id="percent3"
                                >미소</span
                                >
                            </div>
                        </div>
                    </div>

                    <div className="form-group col-lg-3">
                        <label htmlFor="transactiontax">증권거래세</label>
                        <div className="input-group mb-3">
                            <input
                                readOnly={true}
                                type="number"
                                className="form-control"
                                id="transactiontax"
                                placeholder="증권거래세"
                                min="0"
                                max="100"
                                step="5"
                            />
                            <div className="input-group-append">
                                <span className="input-group-text" id="percent4"
                                >미소</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/*<!--   간접세  끝     -->*/}

            {/*<!--   벌금  시작     -->*/}
            <p className="h5 mb-3">
                벌금
            <i
                    className="fas fa-info-circle"
                    id="popover_btn"
                    data-container="body"
                    data-toggle="popover"
                    data-placement="right"
                    data-content="벌금 탭에서 자세한 설정 확인하세요"
                ></i>
            </p>
            <div className="form-row col-lg-4">
                <div className="input-group mb-3">
                    <input
                        type="number"
                        className="form-control"
                        id="electrictaxrate"
                        placeholder="벌금"
                        min="0"
                        max="100"
                        step="5"
                        readOnly={true}
                    />
                    <div className="input-group-append">
                        <span className="input-group-text" id="basic-addon2"
                        >미소</span
                        >
                    </div>
                </div>
            </div>
            {/*<!--   벌금  끝     --> */}

        </CardBasic>

    )
}

export default MyTaxDetail
