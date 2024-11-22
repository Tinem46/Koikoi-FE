import { useState } from 'react';
import { Tabs } from 'antd';
import './index.scss';
import OrderHistory from '../../components/orderHistory';
import ConsignmentHistory from '../../components/consignmentHistory';
import FishSellHistory from '../../components/fishSellHistory';
import NarBar from '../../components/navigation2';
import Shipping from '../../components/shipping';


const { TabPane } = Tabs;

function History() {
  const [activeTab, setActiveTab] = useState('1');
  const [selectedMenu, setSelectedMenu] = useState("Order History");

  const handleTabChange = (key) => {
    setActiveTab(key);
    // Update selectedMenu based on tab key
    const menuMap = {
      '1': 'Order History',
      '2': 'Consignment History',
      '3': 'Fish Sell History',
      '4': 'Shipping'
    };
    setSelectedMenu(menuMap[key]);
  };

  return (
    <div className="history-container">
     <NarBar standOn="History" selectedMenu={selectedMenu}/>
      <div className="history-content">
        <Tabs 
          activeKey={activeTab} 
          onChange={handleTabChange}
          className="history-tabs"
        >
          <TabPane tab="Order History" key="1">
            <OrderHistory />
          </TabPane>
          <TabPane tab="Consignment History" key="2">
            <ConsignmentHistory />
          </TabPane>
          <TabPane tab="Fish Sell History" key="3">
            <FishSellHistory />
          </TabPane>
          <TabPane tab="Shipping" key="4">
            <Shipping />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default History; 