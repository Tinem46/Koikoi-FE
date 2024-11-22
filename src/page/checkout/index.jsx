import { Button, Input, Select} from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.scss';
import { toast } from 'react-toastify';
import api from '../../config/api';
import Navigation from '../../components/navigation'; 
import NavBar from '../../components/navigation2';
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
        paymentType,
        orderDetails 
    } = location.state || {};

    const finalTotalAmount = paymentType === 'consignment' ? cartTotalAmount : cartTotalAmount; 

    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    toast.error("Please login to proceed to checkout");
                    navigate('/login');
                    return;
                }

                const response = await api.get('account/Profile');
                setUserDetails(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                toast.error("Failed to load user profile. Please try again.");
            }
        };

        fetchUserProfile();
    }, [navigate]);

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

            const pendingOrderDetails = {
                orderId,
                cart: paymentType === 'consignment' ? orderDetails : cart,
                subTotal,
                shippingPee,
                totalAmount: cartTotalAmount,
                userProfile: userDetails,
                paymentMethod: 'Bank Transfer',
                paymentType
            };
            localStorage.setItem('pendingOrderDetails', JSON.stringify(pendingOrderDetails));

            const paymentResponse = await api.post('payment/VNPay', paymentData, {
                params: {
                    koiOrderId: orderId
                },
            });
            
            const paymentUrl = paymentResponse.data;
            window.location.href = paymentUrl;
        } catch (error) {
            console.error('Error processing payment:', error);
            toast.error('Failed to process payment. Please try again.');
        }
    };

    return (
        <div className="checkout-container">
            <NavBar standOn="Checkout" />
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
                        onChange={handleInputChange}
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
                                            <span>Price: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="cart-totals">
                                <p>Subtotal: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subTotal)}</p>
                                <p>Shipping: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shippingPee)}</p>
                                <h3>Total: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(finalTotalAmount)}</h3>
                            </div>
                        </>
                    ) : (
                        <div className="cart-totals">
                            <h3>Consignment Total: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(finalTotalAmount)}</h3>
                        </div>
                    )}
                    
                    {/* Payment Methods */}
                    <div className="payment-methods">
                        <h3>Payment Methods</h3>
                        <div className="payment-method-item">
                            <span>Direct Bank Transfer</span>
                        </div>
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
