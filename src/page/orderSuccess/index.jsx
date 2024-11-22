import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../../config/api';
import './index.scss';
import { alertSuccess } from '../../assets/image/hook';
import { Table, Image } from 'antd';

function formatToVND(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    alertSuccess('Order placed successfully!');

    const fetchOrderDetails = async () => {
      
        const urlParams = new URLSearchParams(window.location.search);
        const vnp_TxnRef = urlParams.get('vnp_TxnRef');
        const vnp_ResponseCode = urlParams.get('vnp_ResponseCode');
        
        if (vnp_TxnRef && vnp_ResponseCode) {
          await api.get('payment/response', {
            params: {
              vnp_TxnRef,
              vnp_ResponseCode
            }
          });
        }

        const pendingOrderDetails = localStorage.getItem('pendingOrderDetails');
        if (pendingOrderDetails) {
          const orderData = JSON.parse(pendingOrderDetails);
          setOrderDetails({
            id: orderData.orderId,
            items: orderData.cart,
            subTotal: orderData.subTotal,
            shippingFee: orderData.shippingPee,
            totalAmount: orderData.totalAmount,
            paymentMethod: orderData.paymentMethod,
            paymentType: orderData.paymentType
          });
          setUserProfile(orderData.userProfile);
          localStorage.removeItem('pendingOrderDetails');
        } else {
          
          const lastOrderResponse = await api.get('payment/lastPaidOrder');
          const orderData = lastOrderResponse.data;
          
          const detailsResponse = await api.get(`order/details`, {
            params: { orderId: orderData.id }
          });

          setOrderDetails({
            id: orderData.id,
            items: detailsResponse.data.items || detailsResponse.data,
            subTotal: orderData.totalAmount - (orderData.shippingFee || 0),
            shippingFee: orderData.shippingPee || '0.00',
            totalAmount: orderData.totalAmount || '0.00',
            paymentMethod: orderData.status === 'PAID' ? 'Bank Transfer' : 'Cash',
          });

          setUserProfile({
            fullname: orderData.fullName,
            email: orderData.email,
            phone_number: orderData.phone,
            specific_Address: orderData.address,
            city: orderData.city,
            country: orderData.country
          });
        }
      
    };

    fetchOrderDetails();
  }, [location, navigate]);

  const detailColumns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `$${parseFloat(text).toFixed(2)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 120,
      render: (text) => (
        <Image
          src={text}
          alt="Product"
          width={80}
          height={80}
          preview={{
            maskClassName: 'customize-mask',
            mask: <div>View</div>,
          }}
        />
      ),
    },
  ];

  return (
    <div className="order-success-container">
      {userProfile && (
        <div className="user-info">
          <h2>User Information</h2>
          <p>Name: {userProfile.fullname}</p>
          <p>Email: {userProfile.email}</p>
          <p>Phone: {userProfile.phone_number}</p>
          <p>Address: {userProfile.specific_Address}, {userProfile.city}, {userProfile.country}</p>
        </div>
      )}
      {orderDetails && (
        <div className="order-info">
          <h2>Order Summary</h2>
          <p>Order ID: {orderDetails.id}</p>
          <p>Shipping Fee: {formatToVND(orderDetails.shippingFee)}</p>
          <p>Total Amount: {formatToVND(orderDetails.totalAmount)}</p>
          <p>Payment Method: {orderDetails.paymentMethod}</p>
          
          <h2>Order Details</h2>
          <Table
            dataSource={orderDetails.items}
            columns={detailColumns}
            rowKey="id"
            pagination={false}
            size="small"
            style={{ width: '100%' }}
          />
        </div>
      )}
    </div>
  );
}

export default OrderSuccess;
