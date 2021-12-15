import React from 'react'
import Topbar from '../components/Navigation/Topbar';
import Footer from '../components/Footer'
import ScrollToTop from '../components/Scroll';
function PageFrame(props) {
    return (
        <>
            <div id="wrapper">
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <Topbar />
                        <div className="container-fluid">
                            {/*내용 */}
                            {props.children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
            <ScrollToTop />
        </>
    )
}

export default PageFrame
