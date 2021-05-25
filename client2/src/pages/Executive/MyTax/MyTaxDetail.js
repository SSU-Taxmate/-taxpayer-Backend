import React from 'react'
import CardBasic from '../../../components/Cards/Basic';

function MyTaxDetail() {
    return (
        <CardBasic title='이번달 내가 내야할 세금'>
            {/* <!--직접세  시작-->*/}
            <p class="h5 mb-3">직접세</p>
            <form class="ml-1">
                <div class="form-row">
                    <div class="form-group col-md-4">
                        <label for="incometaxrate">소득세</label>

                        <div class="input-group mb-3">
                            <input
                                readOnly='true'
                                type="number"
                                class="form-control"
                                id="incometaxrate"
                                placeholder="소득세"
                                min="0"
                                max="100"
                                step="5"
                            />
                            <div class="input-group-append">
                                <span class="input-group-text"
                                >미소</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-md-4">
                        <label for="realestatetaxrate">부동산세</label>
                        <div class="input-group mb-3">
                            <input
                                readOnly='true'
                                type="number"
                                class="form-control"
                                id="realestatetaxrate"
                                placeholder="부동산세"
                                min="0"
                                max="100"
                                step="5"
                            />
                            <div class="input-group-append">
                                <span class="input-group-text" 
                                >미소</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-md-4">
                        <label for="seattaxrate">자리세</label>
                        <div class="input-group mb-3">
                            <input
                                readOnly='true'
                                type="number"
                                class="form-control"
                                id="seattaxrate"
                                placeholder="자리세"
                                min="0"
                                max="100"
                                step="5"
                            />
                            <div class="input-group-append">
                                <span class="input-group-text" id="percent12"
                                >미소</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/*<!--직접세  끝-->*/}

            {/*<!--   간접세  시작     -->*/}
            <div class="row mb-3">
                <div class="col">
                    <p class="h5">
                        간접세
                <i
                            class="fas fa-info-circle"
                            id="popover_btn"
                            data-container="body"
                            data-toggle="popover"
                            data-placement="right"
                            data-content="간접세 설명을 적어봅시다"
                        ></i>
                    </p>
                </div>
            </div>
            <form class="ml-1">
                <div class="form-row">
                    <div class="form-group col-lg-3">
                        <label for="electrictaxrate">전기세</label>

                        <div class="input-group mb-3">
                            <input
                                readOnly='true'
                                type="number"
                                class="form-control"
                                id="electrictaxrate"
                                placeholder="전기세"
                                min="0"
                                max="100"
                                step="5"
                            />
                            <div class="input-group-append">
                                <span class="input-group-text" id="percent">미소</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-lg-3">
                        <label for="stamptaxrate">인지세</label>
                        <div class="input-group mb-3">
                            <input
                                readOnly='true'
                                type="number"
                                class="form-control"
                                id="stamptaxrate"
                                placeholder="인지세"
                                min="0"
                                max="100"
                                step="5"
                            />
                            <div class="input-group-append">
                                <span class="input-group-text" id="percent2"
                                >미소</span
                                >
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-lg-3">
                        <label for="vatrate">부가가치세</label>
                        <div class="input-group mb-3">
                            <input
                                readOnly='true'
                                type="number"
                                class="form-control"
                                id="vatrate"
                                placeholder="부가가치세"
                                min="0"
                                max="100"
                                step="5"
                            />
                            <div class="input-group-append">
                                <span class="input-group-text" id="percent3"
                                >미소</span
                                >
                            </div>
                        </div>
                    </div>

                    <div class="form-group col-lg-3">
                        <label for="transactiontax">증권거래세</label>
                        <div class="input-group mb-3">
                            <input
                                readOnly='true'
                                type="number"
                                class="form-control"
                                id="transactiontax"
                                placeholder="증권거래세"
                                min="0"
                                max="100"
                                step="5"
                            />
                            <div class="input-group-append">
                                <span class="input-group-text" id="percent4"
                                >미소</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            {/*<!--   간접세  끝     -->*/}

            {/*<!--   벌금  시작     -->*/}
            <p class="h5 mb-3">
                벌금
            <i
                    class="fas fa-info-circle"
                    id="popover_btn"
                    data-container="body"
                    data-toggle="popover"
                    data-placement="right"
                    data-content="벌금 탭에서 자세한 설정 확인하세요"
                ></i>
            </p>
            <div class="form-row col-lg-4">
                <div class="input-group mb-3">
                    <input
                        type="number"
                        class="form-control"
                        id="electrictaxrate"
                        placeholder="벌금"
                        min="0"
                        max="100"
                        step="5"
                        readOnly='true'
                    />
                    <div class="input-group-append">
                        <span class="input-group-text" id="basic-addon2"
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
