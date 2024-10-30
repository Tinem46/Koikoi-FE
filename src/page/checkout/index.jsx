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
    const [userDetails, setUserDetails] = useState(userProfile || {});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prev => ({
            ...prev,
            [name]: value
        }));
    };

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
                const paymentData = {
                    phone: userDetails.phone_number,
                    fullName: userDetails.fullname,
                    orderDate: new Date().toISOString().split('T')[0],
                    note: userDetails.additionalInfo || '',
                    city: userDetails.city,
                    country: userDetails.country,
                    gmail: userDetails.email,
                    address: userDetails.specific_Address
                };

                const paymentResponse = await api.post('payment/VNPay', paymentData, {
                    params: {
                        koiOrderId: orderId
                    },
                });
                
                const paymentUrl = paymentResponse.data;
                window.location.href = paymentUrl;
            } else {
                dispatch(reset());
                navigate('/order-success', { 
                    state: { 
                        orderId,
                        userDetails,
                        cart,
                        subTotal,
                        shippingPee, 
                        totalAmount,
                        paymentMethod
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
                        <input 
                            type="text" 
                            name="fullname"
                            placeholder="Full Name" 
                            value={userDetails.fullname || ''} 
                            onChange={handleInputChange}
                        />
                    </div>
                    <select 
                        name="country"
                        value={userDetails.country || 'Country / Region'} 
                        onChange={handleInputChange}
                    >
                        <option>Country / Region</option>
                        <option>Sri Lanka</option>
                    </select>
                    <input 
                        type="text" 
                        name="specific_Address"
                        placeholder="Street Address" 
                        value={userDetails.specific_Address || ''} 
                        onChange={handleInputChange}
                    />
                    <input 
                        type="text" 
                        name="city"
                        placeholder="Town / City" 
                        value={userDetails.city || ''} 
                        onChange={handleInputChange}
                    />
                   
                    <input 
                        type="text" 
                        name="phone_number"
                        placeholder="Phone" 
                        value={userDetails.phone_number || ''} 
                        onChange={handleInputChange}
                    />
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Email Address" 
                        value={userDetails.email || ''} 
                        readOnly 
                    />
                    <textarea 
                        name="additionalInfo"
                        placeholder="Additional Information" 
                        value={userDetails.additionalInfo || ''} 
                        onChange={handleInputChange}
                    ></textarea>
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
                        style={{
                            width: '200px',
                            backgroundColor: 'black',
                            height: '50px',
                            fontSize: '18px',
                            marginTop: '20px'
                        }} 
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
