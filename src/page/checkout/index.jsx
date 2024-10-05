import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { toast } from 'react-toastify';
import { reset } from '../../redux/features/cartSlice';
import cartNo from '../../assets/image/profile.jpeg';

function Checkout() {
    const cart = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const user = useSelector((state) => state.user);
    const isLoggedIn = user ? user.isLoggedIn : false;

    const handlePayment = () => {
        if(isLoggedIn){
            toast.success('Payment successful!');
            dispatch(reset());
            navigate('/');
        }else{
            toast.error('Please login to proceed to payment');
            navigate('/login');
        }
    };

    return (
        <div className="checkout-container">
            <img src={cartNo} alt="" className='img'/>
            <div className="checkout">
                <div className="billing-details">
                    <h2>Billing Details</h2>
                    <div className="name-fields">
                        <input type="text" placeholder="First Name" />
                        <input type="text" placeholder="Last Name" />
                    </div>
                    <input type="text" placeholder="Company Name (Optional)" />
                    <select>
                        <option>Country / Region</option>
                        <option>Sri Lanka</option>
                    </select>
                    <input type="text" placeholder="Street Address" />
                    <input type="text" placeholder="Town / City" />
                    <select>
                        <option>Province</option>
                        <option>Western Province</option>
                    </select>
                    <input type="text" placeholder="ZIP Code" />
                    <input type="text" placeholder="Phone" />
                    <input type="email" placeholder="Email Address" />
                    <textarea placeholder="Additional Information"></textarea>
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
