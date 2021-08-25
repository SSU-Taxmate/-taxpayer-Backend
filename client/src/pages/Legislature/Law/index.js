import React, { useEffect, useState } from "react";
import axios from "axios";
//Navigation
import Sidebar from "../../../components/Navigation/Sidebar";
import Topbar from "../../../components/Navigation/Topbar";
import PageHeading from "../../../components/PageHeading";
import ScrollToTop from "../../../components/Scroll";
import Footer from "../../../components/Footer";
import { List, ListItem } from "@material-ui/core";
import AddLawDialog from "./sections/AddLawDialog";
import PreviewDialog from "./sections/PreviewDialog";
import EditLawDialog from "./sections/EditLawDialog";
import DeleteLawDialog from "./sections/DeleteLawDialog";
import CardCollapse from "../../../components/Cards/Collapse";
import Viewer from "../../../components/Editor/Viewer";
import moment from 'moment-timezone'
import { useSelector } from 'react-redux';
import Loading from "../../../components/Loading";

export default function Law() {
  const [laws, setlaws] = useState([]);
  const [updateTime, setupdateTime] = useState("****-**-**");
  const [isLoading, setIsLoading] = useState(false);
  const [err, setIsError] = useState(false);
  let classData = useSelector(state => state.classInfo.classData);
  let user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.get("/api/laws", { params: { classId: classData.classId } });
        console.log(result.data)
        setlaws(result.data);
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [classData.classId]);
  const getDate = (date) => {
    const localtime = moment(date).tz("Asia/Seoul").format();
    let res =
      "" +
      localtime.split("T")[0].split(".")[0] +
      " " +
      localtime.split("T")[1].split("+")[0];
    return res;
  };
  return (
    <div>
      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">


        {/* <!-- End of Sidebar --> */}

        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* <!-- Main Content --> */}
          <div id="content" >
            {/* <!-- Topbar --> */}
            <Topbar />
            {/* <!-- End of Topbar --> */}

            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid">
              {/* <!-- Page Heading --> */}
              <PageHeading title="법">
              {user.userData && user.userData.role === 0 ? <PreviewDialog laws={laws} />:<></>}
              </PageHeading>
              {user.userData && user.userData.role === 0 ?
                <AddLawDialog /> :null }

              <List>
                {/* <!-- Content Row --> */}
                {isLoading ? (
                  <Loading />
                ) : laws.length == 0 ? (
                  <div>법 추가 부탁</div>
                ) : (
                  laws.map((law, i) => (
                    <ListItem key={law._id}>
                      <div className="col-11">
                        <div style={{ textAlign: "right" }}>
                          <sub>시행일 : {getDate(law.updatedAt)}</sub>
                        </div>
                        <CardCollapse
                          title={law.title}
                          area_id={`id${law.title}`}
                          key={law.title}
                        >
                          <Viewer content={law.content} />
                        </CardCollapse>
                      </div>
                      {user.userData && user.userData.role === 0 ?
                        <div className="col-1">
                        <EditLawDialog data={law} />
                        <DeleteLawDialog data={law} />
                      </div> : null}
                    </ListItem>
                  ))
                )}
              </List>
            </div>
            {/* <!-- /.container-fluid --> */}
          </div>
          {/* <!-- End of Main Content --> */}

          {/* <!-- Footer --> */}
          <Footer />
          {/* <!-- End of Footer --> */}
        </div>
        {/* <!-- End of Content Wrapper --> */}
      </div>
      {/* <!-- End of Page Wrapper --> */}

      {/* <!-- Scroll to Top Button--> */}

      <ScrollToTop />
    </div>
  );
}
