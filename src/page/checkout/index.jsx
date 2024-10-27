import {useDispatch } from 'react-redux';
import { Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './index.scss';
import { toast } from 'react-toastify';
import { reset } from '../../redux/features/cartSlice';
import api from '../../config/api';
import Naviagtion from '../../components/navigation';

function Checkout() {
    const location = useLocation();
    const { subTotal, shippingPee, totalAmount, cart, orderId, userProfile } = location.state || {};
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('bank');

    const handlePayment = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("Please login to proceed to checkout");
                navigate('/login');
                return; 
            }

            if (!orderId) {
                toast.error("Order information is missing. Please try again.");
                navigate('/cart');
                return;
            }

            if (paymentMethod === 'bank') {
                // Prepare the data to send to the backend
                const paymentData = {
                    orderId,
                    userProfile,
                    cart,
                    subTotal,
                    shippingPee,
                    totalAmount,
                    paymentMethod
                };

                const paymentResponse = await api.post(`payment/VNPay`, paymentData, {
                    params: {
                        koiOrderId: orderId
                    }
                });
                const paymentUrl = paymentResponse.data; 

                window.location.href = paymentUrl;
            } else {
                dispatch(reset());
                navigate('/order-success', { 
                    state: { 
                        orderId,
                        userProfile
                    }
                });
            }
        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Failed to process payment. Please try again.');
        }
    };

    return (
        <div className="checkout-container">
           <Naviagtion name="Checkout" link="/checkout"/>
            <div className="checkout">
                <div className="billing-details">
                    <h2>Billing Details</h2>
                    <div className="name-fields">
                        <input type="text" placeholder="Full Name" defaultValue={userProfile?.fullname || ''} readOnly />
                    </div>
                    <select defaultValue={userProfile?.country || 'Country / Region'} disabled>
                        <option>Country / Region</option>
                        <option>Sri Lanka</option>
                    </select>
                    <input type="text" placeholder="Street Address" defaultValue={userProfile?.specific_Address|| ''} readOnly />
                    <input type="text" placeholder="Town / City" defaultValue={userProfile?.city || ''} readOnly />
                   
                    <input type="text" placeholder="Phone" defaultValue={userProfile?.phone_number || ''} readOnly />
                    <input type="email" placeholder="Email Address" defaultValue={userProfile?.email || ''} readOnly />
                    <textarea placeholder="Additional Information" defaultValue={userProfile?.additionalInfo || ''} readOnly></textarea>
                </div>
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <ul>
                        {cart && cart.map((item) => (
                            <li key={item.id}>
                                <div className="item-info">
                                    <img src={item.image} alt={item.name} />
                                    <span className="item-name">{item.name}</span>
                                </div>
                                <div className="item-details">
                                    <span>Quantity: {item.quantity}</span>
                                    <span>Price: ${new Intl.NumberFormat('en-US').format(item.price * item.quantity)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-totals">
                        <p>Subtotal: ${new Intl.NumberFormat('en-US').format(subTotal)}</p>
                        <p>Shipping: ${new Intl.NumberFormat('en-US').format(shippingPee)}</p>
                        <h3>Total: ${new Intl.NumberFormat('en-US').format(totalAmount)}</h3>
                    </div>
                    
                    {/* Payment Methods */}
                    <div className="payment-methods">
                        <h3>Payment Methods</h3>
                        <label>
                            <input 
                                type="radio" 
                                name="payment" 
                                value="bank" 
                                checked={paymentMethod === 'bank'}
                                onChange={() => setPaymentMethod('bank')}
                            />
                            Direct Bank Transfer
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="payment" 
                                value="cash"
                                checked={paymentMethod === 'cash'}
                                onChange={() => setPaymentMethod('cash')}
                            />
                            Cash on Delivery
                        </label>
                    </div>

                    <Button 
                        style={{width: '30%', justifyContent: 'center', marginLeft: '35%', marginTop: '60px', backgroundColor: 'black', height: '50px', fontSize: '18px'}} 
                        type="primary" 
                        onClick={handlePayment}
                    >
                        Place Order
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
