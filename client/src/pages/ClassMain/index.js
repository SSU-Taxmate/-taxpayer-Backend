import React from "react";
//Navigation
import PageHeading from "../../components/PageHeading";
import ClassMainDetail from "./ClassMainDetail";
import PageFrame from "../PageFrame";
function ClassMain() {
  return (
    <PageFrame>
      <PageHeading title="클래스 Dashboard" />
      <ClassMainDetail />
    </PageFrame>
  );
}

export default ClassMain;
