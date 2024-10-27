import { useState, useEffect } from 'react';
import { Table, Button, Image, Modal } from 'antd';
import api from '../../config/api';
import Navigation from '../../components/navigation';
import OrderDetails from '../../components/orderDetails';
import './index.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cartSlice';
import { toast } from 'react-toastify';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchUserProfile();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get('order/showKoiOrder');
    
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('account/Profile');
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await api.get(`order/details`, { params: { orderId } });
      console.log('Fetched order details:', response.data);
      setSelectedOrder(response.data);
    } catch (error) {
      console.error('Error fetching order details:', error);
    }
  };

  const handlePreview = (imageSrc) => {
    setPreviewImage(imageSrc);
    setPreviewVisible(true);
  };

  const handleClosePreview = () => {
    setPreviewVisible(false);
  };

  const handleCloseDetails = () => {
    setSelectedOrder(null);
  };

  const handleProceedToCheckout = async (order) => {
    try {
      let orderDetails = order.orderDetails;
      if (!orderDetails) {
        const response = await api.get(`order/details`, { params: { orderId: order.id } });
        orderDetails = response.data;
      }

      // Calculate subtotal
      const subTotal = orderDetails.reduce((total, item) => total + (item.quantity * item.price), 0);

      // Fetch cart total (keeping this for shippingPee and totalAmount)
      const cartTotalResponse = await api.get(`Cart/total`, {
        params: {
          cartId: order.id,
          voucherCode: '' // You can add voucher handling if needed
        }
      });

      const { shippingPee, totalAmount } = cartTotalResponse.data;

      // Ensure userProfile is available
      if (!userProfile) {
        await fetchUserProfile();
      }

      // Prepare cart data in the format expected by the checkout page
      const cartData = orderDetails.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }));

      navigate('/checkout', { 
        state: { 
          orderId: order.id,
          subTotal, // Use the calculated subTotal
          shippingPee,
          totalAmount,
          cart: cartData,
          userProfile: userProfile
        }
      });
    } catch (error) {
      console.error('Error fetching order details for checkout:', error);
      toast.error('Failed to proceed to checkout. Please try again.');
    }
  };

  const handleReorder = async (order) => {
    try {

      const orderDetails = selectedOrder ? selectedOrder : order.orderDetails;

      if (!orderDetails || orderDetails.length === 0) {
        toast.warn("Đơn hàng này không có sản phẩm nào để đặt lại.");
        return;
      }

      for (const item of orderDetails) {
        if (!item.id || !item.quantity) {
          console.error('Sản phẩm không hợp lệ trong chi tiết đơn hàng:', item);
          continue;
        }

        await api.post(`Cart/${item.id}`, {
          quantity: item.quantity
        });

        dispatch(addToCart({
          id: item.id,
          quantity: item.quantity,
        }));
      }

      toast.success("Đã thêm sản phẩm vào giỏ hàng thành công");
      navigate('/cart');
    } catch (error) {
      toast.error("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
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
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => fetchOrderDetails(record.id)}>View Details</Button>
          {record.orderStatus === 'PENDING' && (
            <Button onClick={() => handleProceedToCheckout(record)}> Checkout</Button>
          )}
          {record.orderStatus === 'CANCELED' && (
            <Button onClick={() => handleReorder(record)}>Re-order</Button>
          )}
        </>
      ),
    },
  ];

  return (
    <div className="order-history-container">
      <Navigation name="Order History" link="/order-history" />
      <div className="order-history">
        <h1>Order History</h1>
        <Table dataSource={orders} columns={columns} rowKey="id" />
      </div>
      {selectedOrder && (
        <OrderDetails
          selectedOrder={selectedOrder}
          onClose={handleCloseDetails}
          onPreview={handlePreview}
        />
      )}
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={handleClosePreview}
        width={800}
        centered
      >
        <img 
          alt="Preview" 
          style={{ 
            width: '100%', 
            height: 'auto', 
            objectFit: 'contain', 
            maxHeight: '80vh',
            display: 'block',
            margin: '0 auto',
            border: 'none',
            padding: 0,
          }} 
          src={previewImage} 
        />
      </Modal>
    </div>
  );
}

export default OrderHistory;
