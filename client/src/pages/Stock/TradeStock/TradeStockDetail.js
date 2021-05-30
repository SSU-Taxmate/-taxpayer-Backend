import React, { Component } from 'react'

export default class TradeStockDetail extends Component {
    render() {
        return (
            <div class="col-lg-12">
              <div class="container mb-4">
                <div class="row">
                  <div class="col-10">
                    <div class="tab-content" id="myTabContent">
                      <div
                        class="tab-pane fade show active"
                        id="kospi"
                        role="tabpanel"
                        aria-labelledby="kospi-tab"
                      >
                        <div class="card shadow h-0 py-2">
                          <div class="card-body">
                            <div class="row no-gutters align-items-center">
                              <div class="col mr-2">
                                <div
                                  class="text-xl font-weight-bold text-info text-uppercase mb-1"
                                >
                                  kospi
                                  <i
                                    class="fas fa-chart-area text-gray-300"
                                  ></i>
                                  <sub class="text-gray-600 pl-2"
                                    >2020.08.15.</sub
                                  >
                                  <button
                                    class="btn btn-sm text-warning btn-link float-right"
                                    data-toggle="modal"
                                    data-target="#EditStockModal"
                                  >
                                    edit
                                  </button>
                                </div>
                                <div class="row">
                                  <p class="h2 pl-1">1921</p>
                                  <p class="p-2 text-danger">
                                    <i class="fas fa-arrow-up"></i>
                                    20 (+0.13%)
                                  </p>
                                </div>

                                <div class="row">
                                  <img
                                    class="img-fluid ml-1"
                                    src="https://placeimg.com/480/300/any"
                                  />
                                  <p class="p5 ml-3">오늘의 뉴스</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="kosdaq"
                        role="tabpanel"
                        aria-labelledby="kosdaq-tab"
                      >
                        <div class="card shadow h-0 py-2">
                          <div class="card-body">
                            <div class="row no-gutters align-items-center">
                              <div class="col mr-2">
                                <div
                                  class="text-xl font-weight-bold text-info text-uppercase mb-1"
                                >
                                  kospi
                                  <i
                                    class="fas fa-chart-area text-gray-300"
                                  ></i>
                                  <sub class="text-gray-600 pl-2"
                                    >2020.08.15.</sub
                                  >

                                  <button
                                    class="btn btn-sm text-warning btn-link float-right"
                                    data-toggle="modal"
                                    data-target="#EditStockModal"
                                  >
                                    edit
                                  </button>
                                </div>
                                <div class="row">
                                  <p class="h2 pl-1">1921</p>
                                  <p class="p-2 text-danger">
                                    <i class="fas fa-arrow-up"></i>
                                    20 (+0.13%)
                                  </p>
                                </div>

                                <div class="row">
                                  <img
                                    class="img-fluid ml-1"
                                    src="https://placeimg.com/480/300/animals"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="dollar"
                        role="tabpanel"
                        aria-labelledby="dollar-tab"
                      >
                        <div class="card shadow h-0 py-2">
                          <div class="card-body">
                            <div class="row no-gutters align-items-center">
                              <div class="col mr-2">
                                <div
                                  class="text-xl font-weight-bold text-info text-uppercase mb-1"
                                >
                                  kospi
                                  <i
                                    class="fas fa-chart-area text-gray-300"
                                  ></i>
                                  <sub class="text-gray-600 pl-2"
                                    >2020.08.15.</sub
                                  >

                                  <button
                                    class="btn btn-sm text-warning btn-link float-right"
                                    data-toggle="modal"
                                    data-target="#EditStockModal"
                                  >
                                    edit
                                  </button>
                                </div>
                                <div class="row">
                                  <p class="h2 pl-1">1921</p>
                                  <p class="p-2 text-danger">
                                    <i class="fas fa-arrow-up"></i>
                                    20 (+0.13%)
                                  </p>
                                </div>

                                <div class="row">
                                  <img
                                    class="img-fluid ml-1"
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
                  <div class="col-2">
                    <ul
                      class="nav flex-column nav-pills"
                      id="myTab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          id="kospi-tab"
                          data-toggle="tab"
                          href="#kospi"
                          role="tab"
                          aria-controls="kospi"
                          aria-selected="true"
                          >kospi</a
                        >
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          id="kosdaq-tab"
                          data-toggle="tab"
                          href="#kosdaq"
                          role="tab"
                          aria-controls="kosdaq"
                          aria-selected="false"
                          >kosdaq</a
                        >
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
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
    
              <div class="container mb-4">
                <div class="row">
                  <div class="col-6">
                 

                    <div class="card border-left-info shadow h-0 py-2">
                      <div class="card-body">
                        <div class="row no-gutters align-items-center">
                          <div class="col mr-2">
                            <div
                              class="text-xl font-weight-bold text-info text-uppercase mb-3"
                            >
                              시장 운영 공지 / 신규 상장 회사
                              <i
                                class="fas fa-clipboard-list text-gray-300"
                              ></i>
                              <button
                                class="btn btn-sm text-warning btn-link float-right"
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
                  <div class="col-6">
                    <div class="card border-bottom-info shadow h-0 py-2">
                      <div class="card-body">
                        <div class="row">
                          <div class="col mr-2">
                            <div
                              class="text-xl font-weight-bold text-info text-uppercase mb-3"
                            >
                              매매 동향
                              <i
                                class="fas fa-clipboard-list text-gray-300"
                              ></i>
                              <button
                                class="btn btn-sm text-warning btn-link float-right"
                                data-toggle="modal"
                                data-target="#EditStockModal"
                              >
                                edit
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div
                            class="btn-group btn-group-toggle m-auto"
                            data-toggle="buttons"
                          >
                            <label
                              class="btn btn-sm btn-outline-secondary active"
                            >
                              <input
                                type="radio"
                                name="options"
                                id="opt-day"
                                autocomplete="off"
                                checked
                              />
                              Day
                            </label>
                            <label class="btn btn-sm btn-outline-secondary">
                              <input
                                type="radio"
                                name="options"
                                id="opt-weeks"
                                autocomplete="off"
                              />
                              Weeks
                            </label>
                          </div>
                        </div>
                        <div class="row">
                          <canvas id="stock_sale_bar"></canvas>
                          <script src="../../js/BarChart.js"></script>
                        </div>
                        <div class='row'>
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
