import {useDispatch } from 'react-redux';
import { Button } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.scss';
import { toast } from 'react-toastify';
import { reset } from '../../redux/features/cartSlice';
import api from '../../config/api';
import Naviagtion from '../../components/navigation';

function Checkout() {
    const location = useLocation();
    const { subTotal, shippingPee, totalAmount, cart } = location.state || {};
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('bank');

    useEffect(() => {
        fetchUserCheckout();
    }, []);

    const fetchUserCheckout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("No token found. Please log in.");
                navigate('/login');
                return; 
            }
            const response = await api.get(`account/Profile`);
            
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            toast.error("Failed to load user profile. Please try again.");
            setUser(null);
        }
    };

    const handlePayment = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("Please login to proceed to checkout");
                navigate('/login');
                return; 
            }

            const orderData = {
                id: user?.id, 
                customer_Name: user?.username,
                customer_Email: user?.email,
                product_Name: cart.map(item => item.name).join(', '),
                quantity: cart.reduce((total, item) => total + item.quantity, 0),
                price: totalAmount
            };

            const orderResponse = await api.post('order', orderData);
            const orderId = orderResponse.data.id; 

            if (paymentMethod === 'bank') {
                const paymentResponse = await api.post(`payment/VNPay/${orderId}`);
                const paymentUrl = paymentResponse.data; 

                const transactionData = {
                    koiOrderId: orderId
                };
                await api.post('transactions/transactions', transactionData);

                window.location.href = paymentUrl;
            } else {
                toast.success('Order placed successfully!');
                dispatch(reset());
                navigate('/');
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
                        <input type="text" placeholder="First Name" defaultValue={user?.firstName || ''} />
                        <input type="text" placeholder="Last Name" defaultValue={user?.lastName || ''} />
                    </div>
                    <input type="text" placeholder="Company Name (Optional)" defaultValue={user?.companyName || ''} />
                    <select defaultValue={user?.country || 'Country / Region'}>
                        <option>Country / Region</option>
                        <option>Sri Lanka</option>
                    </select>
                    <input type="text" placeholder="Street Address" defaultValue={user?.streetAddress || ''} />
                    <input type="text" placeholder="Town / City" defaultValue={user?.city || ''} />
                    <select defaultValue={user?.province || 'Province'}>
                        <option>Province</option>
                        <option>Western Province</option>
                    </select>
                    <input type="text" placeholder="ZIP Code" defaultValue={user?.zipCode || ''} />
                    <input type="text" placeholder="Phone" defaultValue={user?.phone_number || ''} />
                    <input type="email" placeholder="Email Address" defaultValue={user?.email || ''} />
                    <textarea placeholder="Additional Information" defaultValue={user?.additionalInfo || ''}></textarea>
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
