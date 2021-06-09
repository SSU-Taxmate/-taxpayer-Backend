import React, { Component } from 'react';

//Navigation
import Card from '../../components/Cards/MiniCard';
class T_market_porduct extends Component {
    componentWillMount() {
        document.getElementById('body').className = 'page-top'
    }

    render() {
        return (
            

            <Card title="야채시장" img="https://www.kyeonggi.com/news/photo/201907/2126550_917024_5351.jpg" comment="햇빛반은 6-3반!"/>
            
        )
    }
}

// page/classlistDEtail 참고하기

export default T_market_porduct;