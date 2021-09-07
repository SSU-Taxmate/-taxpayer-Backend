import React, { Component } from "react";

//Navigation
import PageHeading from "../../components/PageHeading";
import PageFrame from '../../pages/PageFrame'
import CreditDetail from "./CreditDetail";

class Credit extends Component {
  componentWillMount() {
    document.getElementById("body").className = "page-top";
  }

  render() {
    return (
      <PageFrame>
        <PageHeading title="신용 등급" />
        <CreditDetail />
      </PageFrame>
    );
  }
}

export default Credit;
