import React, { Component } from 'react'

export default class TradeStockDetail extends Component {
    render() {
        return (
            <div className="col-lg-12">
              <div className="container mb-4">
                <div className="row">
                  <div className="col-10">
                    <div className="tab-content" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="kospi"
                        role="tabpanel"
                        aria-labelledby="kospi-tab"
                      >
                        <div className="card shadow h-0 py-2">
                          <div className="card-body">
                            <div className="row no-gutters align-items-center">
                              <div className="col mr-2">
                                <div
                                  className="text-xl font-weight-bold text-info text-uppercase mb-1"
                                >
                                  kospi
                                  <i
                                    className="fas fa-chart-area text-gray-300"
                                  ></i>
                                  <sub className="text-gray-600 pl-2"
                                    >2020.08.15.</sub
                                  >
                                  <button
                                    className="btn btn-sm text-warning btn-link float-right"
                                    data-toggle="modal"
                                    data-target="#EditStockModal"
                                  >
                                    edit
                                  </button>
                                </div>
                                <div className="row">
                                  <p className="h2 pl-1">1921</p>
                                  <p className="p-2 text-danger">
                                    <i className="fas fa-arrow-up"></i>
                                    20 (+0.13%)
                                  </p>
                                </div>

                                <div className="row">
                                  <img
                                    className="img-fluid ml-1"
                                    src="https://placeimg.com/480/300/any"
                                  />
                                  <p className="p5 ml-3">오늘의 뉴스</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="kosdaq"
                        role="tabpanel"
                        aria-labelledby="kosdaq-tab"
                      >
                        <div className="card shadow h-0 py-2">
                          <div className="card-body">
                            <div className="row no-gutters align-items-center">
                              <div className="col mr-2">
                                <div
                                  className="text-xl font-weight-bold text-info text-uppercase mb-1"
                                >
                                  kospi
                                  <i
                                    className="fas fa-chart-area text-gray-300"
                                  ></i>
                                  <sub className="text-gray-600 pl-2"
                                    >2020.08.15.</sub
                                  >

                                  <button
                                    className="btn btn-sm text-warning btn-link float-right"
                                    data-toggle="modal"
                                    data-target="#EditStockModal"
                                  >
                                    edit
                                  </button>
                                </div>
                                <div className="row">
                                  <p className="h2 pl-1">1921</p>
                                  <p className="p-2 text-danger">
                                    <i className="fas fa-arrow-up"></i>
                                    20 (+0.13%)
                                  </p>
                                </div>

                                <div className="row">
                                  <img
                                    className="img-fluid ml-1"
                                    src="https://placeimg.com/480/300/animals"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="dollar"
                        role="tabpanel"
                        aria-labelledby="dollar-tab"
                      >
                        <div className="card shadow h-0 py-2">
                          <div className="card-body">
                            <div className="row no-gutters align-items-center">
                              <div className="col mr-2">
                                <div
                                  className="text-xl font-weight-bold text-info text-uppercase mb-1"
                                >
                                  kospi
                                  <i
                                    className="fas fa-chart-area text-gray-300"
                                  ></i>
                                  <sub className="text-gray-600 pl-2"
                                    >2020.08.15.</sub
                                  >

                                  <button
                                    className="btn btn-sm text-warning btn-link float-right"
                                    data-toggle="modal"
                                    data-target="#EditStockModal"
                                  >
                                    edit
                                  </button>
                                </div>
                                <div className="row">
                                  <p className="h2 pl-1">1921</p>
                                  <p className="p-2 text-danger">
                                    <i className="fas fa-arrow-up"></i>
                                    20 (+0.13%)
                                  </p>
                                </div>

                                <div className="row">
                                  <img
                                    className="img-fluid ml-1"
                                    src="https://placeimg.com/480/300/any"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <ul
                      className="nav flex-column nav-pills"
                      id="myTab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="kospi-tab"
                          data-toggle="tab"
                          href="#kospi"
                          role="tab"
                          aria-controls="kospi"
                          aria-selected="true"
                          >kospi</a
                        >
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="kosdaq-tab"
                          data-toggle="tab"
                          href="#kosdaq"
                          role="tab"
                          aria-controls="kosdaq"
                          aria-selected="false"
                          >kosdaq</a
                        >
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="dollar-tab"
                          data-toggle="tab"
                          href="#dollar"
                          role="tab"
                          aria-controls="dollar"
                          aria-selected="false"
                          >dollar</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
    
              <div className="container mb-4">
                <div className="row">
                  <div className="col-6">
                 

                    <div className="card border-left-info shadow h-0 py-2">
                      <div className="card-body">
                        <div className="row no-gutters align-items-center">
                          <div className="col mr-2">
                            <div
                              className="text-xl font-weight-bold text-info text-uppercase mb-3"
                            >
                              시장 운영 공지 / 신규 상장 회사
                              <i
                                className="fas fa-clipboard-list text-gray-300"
                              ></i>
                              <button
                                className="btn btn-sm text-warning btn-link float-right"
                                data-toggle="modal"
                                data-target="#EditStockModal"
                              >
                                edit
                              </button>
                            </div>
                          </div>
                          
                        </div>
                      
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card border-bottom-info shadow h-0 py-2">
                      <div className="card-body">
                        <div className="row">
                          <div className="col mr-2">
                            <div
                              className="text-xl font-weight-bold text-info text-uppercase mb-3"
                            >
                              매매 동향
                              <i
                                className="fas fa-clipboard-list text-gray-300"
                              ></i>
                              <button
                                className="btn btn-sm text-warning btn-link float-right"
                                data-toggle="modal"
                                data-target="#EditStockModal"
                              >
                                edit
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div
                            className="btn-group btn-group-toggle m-auto"
                            data-toggle="buttons"
                          >
                            <label
                              className="btn btn-sm btn-outline-secondary active"
                            >
                              <input
                                type="radio"
                                name="options"
                                id="opt-day"
                                autoComplete="off"
                                defaultChecked
                                />
                              Day
                            </label>
                            <label className="btn btn-sm btn-outline-secondary">
                              <input
                                type="radio"
                                name="options"
                                id="opt-weeks"
                                autoComplete="off"
                              />
                              Weeks
                            </label>
                          </div>
                        </div>
                        <div className="row">
                          <canvas id="stock_sale_bar"></canvas>
                          <script src="../../js/BarChart.js"></script>
                        </div>
                        <div className='row'>
                          <canvas id="stock_sale_line"></canvas>
                          <script src="../../js/LineChart.js"></script>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}
