import { useState } from 'react';
import DashboardTemplate from '../../../dashboard-template';
import api from '../../../config/api';
import { toast } from 'react-toastify';
import OrderDetails from '../../../components/orderDetails';
import OrderInformation from '../../../components/OrderInformation';
import { Button } from 'antd';
import dayjs from 'dayjs';

function CareManagement() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [orderInfo, setOrderInfo] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await api.get(`order/details`, { params: { orderId } });
      console.log('Fetched order details:', response.data);
      setSelectedOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error.response ? error.response.data : error.message);
      toast.error('Failed to fetch order details');
    }
  };

  const handleViewDetails = (order) => {
    fetchOrderDetails(order.id); 
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
    setIsDetailsOpen(false);
  };

  const fetchOrderUserInfo = async (orderId) => {
    try {
      const response = await api.get(`order/${orderId}`);
      const orderData = response.data;
      
      return {
        fullName: orderData.fullName,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        city: orderData.city,
        country: orderData.country
      };
    } catch (error) {
      console.error('Error fetching order information:', error);
      return null;
    }
  };

  const handleViewOrderInfo = async (orderId) => {
    try {
      const userInfo = await fetchOrderUserInfo(orderId);
      if (userInfo) {
        setOrderInfo(userInfo);
        setIsInfoModalOpen(true);
      } else {
        toast.warning('No order information found');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast.error('Failed to fetch order information');
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text) => `${parseFloat(text).toLocaleString('vi-VN')}đ`,
    },
   
    {
      title: 'Confirm Date',
      dataIndex: 'confirmDate',
      key: 'confirmDate',
      render: (date) => date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      title: 'Processing Date',
      dataIndex: 'processingDate',
      key: 'processingDate',
      render: (date) => date ? dayjs(date).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
    },
  
    {
      title: 'Details',
      key: 'actions',
      render: (text, record) => (
        <>
          <Button onClick={() => handleViewDetails(record)} style={{ marginRight: '8px' }}>
            View Details
          </Button>
          <Button onClick={() => handleViewOrderInfo(record.id)}>
            Information
    </Button>
        </>
      ),
    },
  ];

  const handleConfirmPayment = async (koiOrderId) => {
    try{
    await api.post(`transactions/transactionsCosign`, {}, { 
      params: { 
        koiOrderId: Number(koiOrderId) 
      } 
    });
    toast.success('Order refunded successfully');
  }catch(error){
    console.error('Error confirming payment:', error);
    toast.error(error.response?.data?.message || 'Failed to confirm payment');
  }
};

  const handleCancelOrder = async (orderId) => {
    try {
      await api.post(`transactions/cancelConsign?koiOrderId=${Number(orderId)}`, { note: "Order cancelled" });
      toast.success('Order cancelled successfully');
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order');
    }
  };

  return (
    <div>
      <DashboardTemplate 
        columns={columns} 
        apiURI="order/consign"
        title="Consignment Management"
        customActions={[
          {
            label: 'Confirm Payment',
            action: handleConfirmPayment,
            successMessage: 'Payment confirmed successfully',
            errorMessage: 'Failed to confirm payment',
            condition: (record) => record.orderStatus === 'PAID',
          },
          {
            label: 'Cancel Order',
            action: handleCancelOrder,
            successMessage: 'Order cancelled successfully',
            errorMessage: 'Failed to cancel order',
            condition: (record) => !['CANCELED', 'REFUND'].includes(record.orderStatus),
          },
        ]}
        disableCreate={true}
        combineActions={true}
        showEditDelete={false} 
      />
      {isDetailsOpen && selectedOrder && (
        <OrderDetails 
          selectedOrder={selectedOrder} 
          onClose={handleCloseDetails} 
          onPreview={(image) => console.log('Preview image:', image)}
        />
      )}
      
      {isInfoModalOpen && orderInfo && (
        <OrderInformation 
          orderInfo={orderInfo}
          onClose={() => setIsInfoModalOpen(false)}
        />
      )}
    </div>
  );
}

export default CareManagement;