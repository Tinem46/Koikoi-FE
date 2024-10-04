import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { toast } from 'react-toastify';
import { reset } from '../../redux/features/cartSlice'; // Import the reset action

function Checkout() {
    const cart = useSelector((state) => state.cart.products);
    const dispatch = useDispatch(); // Initialize dispatch
    const navigate = useNavigate();

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const user = useSelector((state) => state.user);
    const isLoggedIn = user ? user.isLoggedIn : false;

    const handlePayment = () => {
        // Implement payment logic here
        if(isLoggedIn){
            toast.success('Payment successful!');
            dispatch(reset()); // Reset the cart after successful payment
            navigate('/');
        }else{
            toast.error('Please login to proceed to payment');
            navigate('/login');
        }
    };

    return (
        <div className="checkout">
            <h2>Checkout</h2>
            <ul>
                {cart.map((item) => (
                    <li key={item.id}>
                        <span>{item.name}</span>
                        <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <Button type="primary" onClick={handlePayment}>Proceed to Payment</Button>
        </div>
    );
}

export default Checkout;
