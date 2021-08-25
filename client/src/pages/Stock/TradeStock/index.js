import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Topbar from '../../../components/Navigation/Topbar';
import Footer from '../../../components/Footer'
import Error from '../../../components/Error'
import PageHeading from '../../../components/PageHeading';
import ScrollToTop from '../../../components/Scroll'
import TradeSection from './sections/TradeSection'
import StockList from './sections/StockList'
import { useSelector } from "react-redux";
import Loading from '../../../components/Loading';

export default function TradeStock() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [stocks, setstocks] = useState([])
  let classData = useSelector(state => state.classInfo.classData);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const result = await axios.get('/api/stocks', { params: { classId: classData.classId } });//클래스에서 사용하는 stock가져와야함
        setstocks(result.data)

      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
    return () => {
    }
  }, [classData.classId])
  return (
    <div>
      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">



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

              <PageHeading title="주식거래창" />

              {/* <!-- Content Row --> */}
              <h4 className='pt-2'>오늘의 주식</h4>
              
              {isError && <Error></Error>}
              {isLoading ? <Loading /> :
                  <StockList data={stocks} /> }
              <h4 className='pt-2'>주식 매수 창</h4>
              <div className="card shadow py-2" style={{ minHeight: '30vh' }}>
                {isError && <Error></Error>}
                {isLoading ? <Loading /> :
                  <TradeSection stocks={stocks} />}
              </div>


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
