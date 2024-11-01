import { useState, useEffect } from 'react';
import { Table } from 'antd';
import api from '../../config/api';
import Naviagtion from '../../components/navigation';
import './index.scss';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [userFullName, setUserFullName] = useState('');

  useEffect(() => {
    fetchOrders();
    fetchUserProfile();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('order');
      const ordersWithTotalAmount = response.data.map(order => ({
        ...order,
        totalAmount: order.price // Assuming 'price' in the API response corresponds to 'totalAmount'
      }));
      setOrders(ordersWithTotalAmount);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('account/Profile');
      setUserFullName(response.data.fullname);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text) => `$${parseFloat(text).toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
    },
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
      render: () => userFullName || 'N/A',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div className="order-history-container">
      <Naviagtion name="Order History" link="/order-history" />
      <div className="order-history">
        <h1>Order History</h1>
        <Table dataSource={orders} columns={columns} rowKey="id" />
      </div>
    </div>
  );
}

export default OrderHistory;
