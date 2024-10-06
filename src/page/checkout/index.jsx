import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.scss';
import { toast } from 'react-toastify';
import { reset } from '../../redux/features/cartSlice';
import cartNo from '../../assets/image/profile.jpeg';
import api from '../../config/api';

function Checkout() {
    const cart = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    

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

    const handlePayment = () => {
       
            toast.success('Payment successful!');
            dispatch(reset());
            navigate('/');
        
    };

    return (
        <div className="checkout-container">
            <img src={cartNo} alt="" className='img'/>
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
                        {cart.map((item) => (
                            <li key={item.id}>
                                <span>{item.name}</span>
                                <div>
                                    <span>Quantity: {item.quantity}</span><br />
                                    <span>Price: ${item.price.toFixed(2)}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ${totalAmount.toFixed(2)}</h3>
                    
                    {/* Payment Methods */}
                    <div className="payment-methods">
                        <h3>Payment Methods</h3>
                        <label>
                            <input type="radio" name="payment" value="bank" defaultChecked />
                            Direct Bank Transfer
                        </label>
                        <label>
                            <input type="radio" name="payment" value="cash" />
                            Cash on Delivery
                        </label>
                    </div>

                    <Button style={{width: '30%', justifyContent: 'center',marginLeft: '35%',marginTop: '60px',backgroundColor: 'black',height: '50px',fontSize: '18px'}} type="primary" onClick={handlePayment}>Place Order</Button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
