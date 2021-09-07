import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
const useStyles = makeStyles({
  fullList: {
    width: "auto",
  },
  paper: {
    overflowY: "visible !important",
  },
});

export default function Sidebar(props) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const { toggled } = props;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    // classes.paper = "overflowY:visible";
    setState({ ...state, [anchor]: open });
  };

  let user = useSelector((state) => state.user);

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, true)}
      onKeyDown={toggleDrawer(anchor, true)}
    >
      <ul
        className={
          toggled
            ? "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
            : "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        }
        id="accordionSidebar"
      >
        {/* <!-- Sidebar - Brand --> */}
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          to="/classes"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-piggy-bank"></i>
          </div>
          <div className="sidebar-brand-text mx-3">TAX MATE</div>
        </Link>

        <hr className="sidebar-divider my-0" />

        {user.userData && (
          <>
            {/* 1. 학급 메인 */}
            <li className="nav-item">
              <Link className="nav-link" to="/classes/:classId">
                <i className="fas fa-home"></i>
                <span>학급 메인</span>
              </Link>
            </li>
            <hr className="sidebar-divider my-0" />
            {/* 2. 클래스 설정
                  1) 학생관리 [선생님] 
                  2) 직업 관리*/}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapse_class_setting"
                aria-controls="collapseTwo"
              >
                <i className="fas fa-fw fa-cog"></i>
                <span>클래스 설정</span>
              </a>
              <div
                id="collapse_class_setting"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  {/* 선생님 */}
                  {user.userData.role === 0 ? (
                    <>
                      <Link
                        className="collapse-item"
                        to="/classes/:classId/set-up/student"
                      >
                        학생관리
                      </Link>
                      <Link
                        className="collapse-item"
                        to="/classes/:classId/set-up/class"
                      >
                        학급관리
                      </Link>
                    </>
                  ) : null}
                  {/* 학생 */}
                  {user.userData.role === 1 ? (
                    <>
                      <h6 className="collapse-header">학생</h6>
                      <Link
                        className="collapse-item"
                        to="/classes/:classId/set-up/class"
                      >
                        직업
                      </Link>
                    </>
                  ) : null}
                </div>
              </div>
            </li>

            <hr className="sidebar-divider" />
            <div className="sidebar-heading">금융</div>
            {/* 3. 은행
                - 중앙은행 
                  1) 설정 [선생님]
                  2) 내계좌 [학생]*/}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapse_bank"
                aria-controls="collapseTwo"
              >
                <i className="fas fa-university"></i>
                <span>은행</span>
              </a>
              <div
                id="collapse_bank"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">중앙은행</h6>
                  {/* 선생님 */}
                  {user.userData.role === 0 ? (
                    <>
                      <Link
                        className="collapse-item"
                        to="/classes/:classId/bank/manage"
                      >
                        설정
                      </Link>
                    </>
                  ) : null}
                  {/* 학생 */}
                  {user.userData.role === 1 ? (
                    <>
                      <Link
                        className="collapse-item"
                        to="/classes/:classId/bank"
                      >
                        내계좌
                      </Link>
                    </>
                  ) : null}
                </div>
              </div>
            </li>
            {/* 4. 증권거래소
                  1) 호가창 
                  2) 내계좌 [학생] 
                  3) 설정 [선생님]*/}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapse_stock"
                aria-controls="collapseTwo"
              >
                <i className="fas fa-hand-holding-usd"></i>
                <span>증권거래소</span>
              </a>
              <div
                id="collapse_stock"
                className="collapse"
                aria-labelledby="collapseTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <h6 className="collapse-header">증권거래소</h6>
                  <Link className="collapse-item" to="/classes/:classId/stock">
                    호가창
                  </Link>
                  {user.userData.role === 1 ? (
                    <>
                      <Link
                        className="collapse-item"
                        to="/classes/:classId/stock/account"
                      >
                        내계좌
                      </Link>
                    </>
                  ) : null}
                  {user.userData.role === 0 ? (
                    <>
                      <Link
                        className="collapse-item"
                        to="/classes/:classId/stock/manage"
                      >
                        설정
                      </Link>
                    </>
                  ) : null}
                </div>
              </div>
            </li>
            <hr className="sidebar-divider" />
            {/* 5. 국세청 */}
            <div className="sidebar-heading">행정부</div>
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapse_revenue"
                aria-controls="collapseTwo"
              >
                <i className="fas fa-coins"></i>
                <span>국세청</span>
              </a>
              <div
                id="collapse_revenue"
                className="collapse"
                aria-labelledby="headingTwo"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <Link
                    className="collapse-item"
                    to="/classes/:classId/national-tax"
                  >
                    나라 통계
                  </Link>
                  {user.userData.role === 1 ? (
                    <>
                      <h6 className="collapse-header">학생</h6>
                      <Link
                        className="collapse-item"
                        to="/classes/:classId/tax-invoice"
                      >
                        나의 세금
                      </Link>
                    </>
                  ) : null}
                  {user.userData.role === 0 ? (
                    <>
                      <Link
                        className="collapse-item"
                        to="/classes/:classId/tax/manage"
                      >
                        세금 설정
                      </Link>
                    </>
                  ) : null}
                </div>
              </div>
            </li>

            <hr className="sidebar-divider" />
            <div className="sidebar-heading">입법부</div>
            {/* 6. 법률 */}
            <li className="nav-item">
              <a
                className="nav-link collapsed"
                href="#"
                data-toggle="collapse"
                data-target="#collapseLaws"
                aria-expanded="true"
                aria-controls="collapseLaws"
              >
                <i className="fas fas fa-balance-scale"></i>
                <span>법률</span>
              </a>
              <div
                id="collapseLaws"
                className="collapse"
                aria-labelledby="headingUtilities"
                data-parent="#accordionSidebar"
              >
                <div className="bg-white py-2 collapse-inner rounded">
                  <Link className="collapse-item" to="/classes/:classId/law">
                    법
                  </Link>
                </div>
              </div>
            </li>
            {/* 7. 국회 */}
            <li className="nav-item">
              <Link className="nav-link" to="/classes/:classId/congress">
                <i className="fas fa-vote-yea"></i>
                <span>국회</span>
              </Link>
            </li>

            <hr className="sidebar-divider" />
            <div className="sidebar-heading">사법부</div>
            {/* 8. 벌금 */}
            <li className="nav-item">
              <Link className="nav-link" to="/classes/:classId/penalty">
                <i className="fas fa-gavel"></i>
                <span>벌금</span>
              </Link>
            </li>
            <hr className="sidebar-divider d-none d-md-block" />
          </>
        )}
      </ul>
    </div>
  );

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer("left", true)}>
        <MenuIcon />
      </Button>
      <Drawer
        anchor={"left"}
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
        classes={{ paper: classes.paper }}
      >
        {list("left")}
      </Drawer>
    </React.Fragment>
  );
}
