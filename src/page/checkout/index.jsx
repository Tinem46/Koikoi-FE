import {useDispatch } from 'react-redux';
import { Button, Input, Select, Radio} from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './index.scss';
import { toast } from 'react-toastify';
import { reset } from '../../redux/features/cartSlice';
import api from '../../config/api';
import Navigation from '../../components/Navigation'; // Corrected casing
const { TextArea } = Input;
const { Option } = Select;

function Checkout() {
    const location = useLocation();
    const { 
        subTotal, 
        shippingPee, 
        totalAmount: cartTotalAmount, 
        cart, 
        orderId,
        userProfile,
        paymentType 
    } = location.state || {};

    // Use consignment total amount if payment type is consignment, otherwise use cart total
    const finalTotalAmount = paymentType === 'consignment' ? cartTotalAmount : cartTotalAmount; // Corrected undefined variable

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
                        totalAmount: cartTotalAmount, // Corrected undefined variable
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
           <Navigation name="Checkout" link="/checkout"/> 
            <div className="checkout">
                <div className="billing-details">
                    <h2>Billing Details</h2>
                    <Input 
                        name="fullname"
                        placeholder="Full Name" 
                        value={userDetails.fullname || ''} 
                        onChange={handleInputChange}
                    />
                    
                    <Select 
                        name="country"
                        value={userDetails.country || 'Country / Region'} 
                        onChange={(value) => handleInputChange({ target: { name: 'country', value }})}
                        style={{ width: '100%' }}
                    >
                        <Option value="Country / Region">Country / Region</Option>
                        <Option value="Sri Lanka">Sri Lanka</Option>
                        <Option value="Vietnam">Vietnam</Option>
                        <Option value="Laos">Laos</Option>
                        <Option value="Cambodia">Cambodia</Option>
                        <Option value="Thailand">Thailand</Option>
                        <Option value="Myanmar">Myanmar</Option>
                        <Option value="Malaysia">Malaysia</Option>
                        <Option value="Singapore">Singapore</Option>
                        <Option value="Indonesia">Indonesia</Option>
                        <Option value="Philippines">Philippines</Option>
                        <Option value="Brunei">Brunei</Option>
                        <Option value="Timor-Leste">Timor-Leste</Option>
                    </Select>

                    <Input 
                        name="specific_Address"
                        placeholder="Street Address" 
                        value={userDetails.specific_Address || ''} 
                        onChange={handleInputChange}
                    />
                    
                    <Input 
                        name="city"
                        placeholder="Town / City" 
                        value={userDetails.city || ''} 
                        onChange={handleInputChange}
                    />
                    
                    <Input 
                        name="phone_number"
                        placeholder="Phone" 
                        value={userDetails.phone_number || ''} 
                        onChange={handleInputChange}
                    />
                    
                    <Input 
                        name="email"
                        placeholder="Email Address" 
                        value={userDetails.email || ''} 
                        readOnly 
                    />
                    
                    <TextArea 
                        name="additionalInfo"
                        placeholder="Additional Information" 
                        value={userDetails.additionalInfo || ''} 
                        onChange={handleInputChange}
                        rows={4}
                    />
                </div>
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    {paymentType !== 'consignment' ? (
                        <>
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
                                <h3>Total: ${new Intl.NumberFormat('en-US').format(finalTotalAmount)}</h3>
                            </div>
                        </>
                    ) : (
                        <div className="cart-totals">
                            <h3>Consignment Total: ${new Intl.NumberFormat('en-US').format(finalTotalAmount)}</h3>
                        </div>
                    )}
                    
                    {/* Payment Methods */}
                    <div className="payment-methods">
                        <h3>Payment Methods</h3>
                        <Radio.Group 
                            value={paymentMethod} 
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <Radio value="bank">Direct Bank Transfer</Radio>
                            <Radio value="cash">Cash on Delivery</Radio>
                        </Radio.Group>
                    </div>

                    <Button 
                        type="primary" 
                        onClick={handlePayment}
                        style={{
                            width: '200px',
                            backgroundColor: 'black',
                            height: '50px',
                            fontSize: '18px',
                            marginTop: '20px'
                        }} 
                    >
                        Place Order
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
