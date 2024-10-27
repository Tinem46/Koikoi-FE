import React, { useState } from 'react';
import DashboardTemplate from '../../../dashboard-template';
import api from '../../../config/api';
import { toast } from 'react-toastify';
import OrderDetails from '../../../components/orderDetails'; // Import the OrderDetails component
import { Button } from 'antd';

function OrderManagement() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Customer',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount) => `$${amount.toFixed(2)}`,
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
        <Button onClick={() => handleViewDetails(record)}>View Details</Button>
      ),
    },
  ];

  const handleConfirmPayment = async (orderId) => {
    try {
      await api.post(`transactions/transactions?koiOrderId=${Number(orderId)}`);
      toast.success('Payment confirmed successfully');
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw error;
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await api.put(`order/cancel/${orderId}`, { note: "Order cancelled" });
      toast.success('Order cancelled successfully');
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order');
    }
  };

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
    fetchOrderDetails(order.id); // Fetch order details before opening
    setIsDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
    setIsDetailsOpen(false);
  };

  return (
    <div>
      <DashboardTemplate 
        columns={columns} 
        apiURI="order/all"
        title="Order Management"
        customActions={[
          {
            label: 'Confirm Payment',
            condition: (record) => record.orderStatus === '	CONFIRMED',
            action: handleConfirmPayment,
            successMessage: 'Payment confirmed successfully',
            errorMessage: 'Failed to confirm payment',
          },
          {
            label: 'Cancel Order',
            condition: (record) => record.orderStatus !== 'CANCELED',
            action: handleCancelOrder,
            successMessage: 'Order cancelled successfully',
            errorMessage: 'Failed to cancel order',
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
    </div>
  );
}

export default OrderManagement;
