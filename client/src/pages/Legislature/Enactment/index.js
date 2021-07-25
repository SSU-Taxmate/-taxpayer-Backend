import React ,{useState}from 'react'
import Draft from '../../../components/Editor'
import 'draft-js/dist/Draft.css';
//Navigation
import Sidebar from '../../../components/Navigation/Sidebar';
import Topbar from '../../../components/Navigation/Topbar';
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll';
import Footer from '../../../components/Footer'

function Entactment() {
    const [title, settitle] = useState()
    const [content, setcontent] = useState()

    const onChange = (content) => {
        setcontent(content)
    };

    return (
        <div>
            {/* <!-- Page Wrapper --> */}
            <div id="wrapper">

                {/* <!-- Sidebar --> */}
                <Sidebar />
                {/* <!-- End of Sidebar --> */}

                {/* <!-- Content Wrapper --> */}
                <div id="content-wrapper" className="d-flex flex-column">

                    {/* <!-- Main Content --> */}
                    <div id="content">

                        {/* <!-- Topbar --> */}
                        <Topbar />
                        {/* <!-- End of Topbar --> */}

                        {/* <!-- Begin Page Content --> */}
                        <div className="container-fluid">

                            {/* <!-- Page Heading --> */}

                            <PageHeading title="법 개정 공지"></PageHeading>

                            {/* <!-- Content Row --> */}
                            <form>
                                <div className="form-inline mb-3">
                                    <label className="mr-2 my-1" htmlFor="lawtitle">제목</label>
                                    <input type="text" className="form-control" id="lawtitle" />
                                </div>
                                <div className="form-inline">

                                    <label className="mr-2 my-1" htmlFor="lawcontent">내용</label>
                                    <Draft onChange={onChange} />
                                </div>
                                <button className='btn btn-md btn-outline-primary float-right'>등록</button>
                            </form>
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

    )
}

export default Entactment
