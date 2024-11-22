import { useState } from 'react';
import DashboardTemplate from '../../../dashboard-template';
import { toast } from 'react-toastify';
import OrderDetails from '../../../components/orderDetails';
import OrderInformation from '../../../components/OrderInformation';
import { Button, Modal, Input } from 'antd';
import api from '../../../config/api';

function OrderManagement() {
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
      title: 'Customer',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text) => `${parseFloat(text).toLocaleString('vi-VN')}đ`,
    },
    {
        title: 'Status',
        dataIndex: 'orderStatus',
      key: 'orderStatus',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
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

  const handleConfirmPayment = async (orderId) => {
      await api.post(`transactions/transactions`, {}, { 
        params: { 
          koiOrderId: Number(orderId) 
        } 
      });
      toast.success('Order refunded successfully');
  };

  const handleCancelOrder = async (orderId) => {
    await api.put(`order/cancel/${orderId}`, { note: "Order cancelled" });
    toast.success('Order cancelled successfully');
  };

  const handleRefund = async (orderId) => {
      await api.post(`transactions/refund`, {}, { 
        params: { 
          koiOrderId: Number(orderId) 
        } 
      });
      toast.success('Order refunded successfully');
  };

  const handleCreateShipping = async (orderId, tempShippingCode,tempDeliveryDate,tempDeliveredDate) => {
  
    
    Modal.confirm({
      title: 'Create Shipping',
      content: (
        <div>
          <Input
            placeholder="Enter shipping code"
            onChange={(e) => {
              tempShippingCode = e.target.value;
            }}
            style={{ marginBottom: '10px' }}
          />
          <Input
            type="date"
            placeholder="Delivery Date"
            onChange={(e) => {
              tempDeliveryDate = e.target.value;
            }}
            style={{ marginBottom: '10px' }}
          />
          <Input
            type="date"
            placeholder="Delivered Date"
            onChange={(e) => {
              tempDeliveredDate = e.target.value;
            }}
          />
        </div>
      ),
      onOk: async () => {
        if (!tempShippingCode.trim()) {
          toast.error('Please enter a shipping code');
          return;
        }
        try {
          await api.post(`shipping/create/${orderId}`, {
            shippingCode: tempShippingCode,
            deliveryDate: tempDeliveryDate,
            deliveredDate: tempDeliveredDate
          });
          toast.success('Shipping created successfully');
          window.location.reload();
        } catch (error) {
          console.error('Error creating shipping:', error);
          toast.error('Failed to create shipping');
        }
      },
      onCancel: () => {},
    });
  };

  return (
    <div>
      <DashboardTemplate 
        columns={columns} 
        apiURI="order/buy"
        title="Order Management"
        customActions={[
          {
            label: 'Confirm Payment',
            condition: (record) => record.orderStatus === 'PAID',
            action: handleConfirmPayment,
            
          },
          {
            label: 'Cancel Order',
            condition: (record) => !['CANCELED', 'REFUND'].includes(record.orderStatus),
            action: handleCancelOrder,
          },
          {
            label: 'Refund Order',
            condition: (record) => record.orderStatus === 'CANCELED',
            action: handleRefund,
          },
          {
            label: 'Create Shipping',
            condition: (record) => record.orderStatus === 'CONFIRMED' && !record.hasShipping,
            action: handleCreateShipping,
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
          isCareManagement={false}
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
export default OrderManagement;