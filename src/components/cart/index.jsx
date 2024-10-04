import { useSelector, useDispatch } from 'react-redux';
import { remove, changeQuantity } from '../../redux/features/cartSlice';
import './index.scss';
import { toast } from 'react-toastify';
import { Button, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const cart = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemove = (id) => {
        dispatch(remove({ id }));
    };

    const handleChangeQuantity = (id, quantity) => {
        dispatch(changeQuantity({ id, quantity }));
    };

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <ul>
                    {cart.map((item) => (
                        <li key={item.id}>
                            <img src={item.image} alt={item.name} />
                            <div>
                                <h3>{item.name}</h3>
                                <p>${(item.price * item.quantity).toFixed(2)}</p>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => handleChangeQuantity(item.id, parseInt(e.target.value))}
                                    min="1"
                                />
                                {cart.length > 0 && (
                                    <Button type="primary" onClick={() => navigate('/checkout')}>Go to Checkout</Button>
                                )}
                                <Popconfirm
                                    title={`Are you sure you want to delete ${item.name}?`}
                                    onConfirm={() => handleRemove(item.id)}
                                    className="popconfirm-custom"
                                >
                                    <Button>Remove</Button>
                                </Popconfirm>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            
        </div>
    );
}

export default Cart;