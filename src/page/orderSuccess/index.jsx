import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../config/api';
import './index.scss';
import { alertSuccess } from '../../assets/image/hook';

function OrderSuccess() {
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    alertSuccess('Order placed successfully!');

    const fetchOrderDetails = async () => {
      try {
        const { orderId, userProfile, cart, subTotal, shippingPee, totalAmount, paymentMethod } = location.state || {};

        if (orderId) {
          setOrderDetails({
            id: orderId,
            items: cart,
            subTotal,
            shippingPee,
            totalAmount,
            paymentMethod
          });
          setUserProfile(userProfile);
        } else {
          const searchParams = new URLSearchParams(location.search);
          const urlOrderId = searchParams.get('orderId');
          console.log(urlOrderId);

          if (urlOrderId) {
            const response = await api.get(`order/${urlOrderId}`);
            setOrderDetails(response.data);
            setUserProfile(response.data.userProfile);
          } else {
            console.error('Order ID not found in state or URL parameters');
          }
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [location]);

  return (
    <div className="order-success-container">
      <h1>Order Success!</h1>
      {userProfile && (
        <div className="user-info">
          <h2>User Information</h2>
          <p>Name: {userProfile.firstName} {userProfile.lastName}</p>
          <p>Email: {userProfile.email}</p>
          <p>Phone: {userProfile.phone_number}</p>
          <p>Address: {userProfile.specific_Address}, {userProfile.city}, {userProfile.country}</p>
        </div>
      )}
      {orderDetails && (
        <div className="order-info">
          <h2>Order Details</h2>
          <p>Order ID: {orderDetails.id}</p>
          <p>Subtotal: ${orderDetails.subTotal}</p>
          <p>Shipping Fee: ${orderDetails.shippingPee}</p>
          <p>Total Amount: ${orderDetails.totalAmount}</p>
          <p>Payment Method: {orderDetails.paymentMethod}</p>
          {orderDetails.items && orderDetails.items.length > 0 ? (
            <ul>
              {orderDetails.items.map(item => (
                <li key={item.id}>
                  {item.name} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items found in this order.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default OrderSuccess;
