/* eslint-disable react/prop-types */
import "./index.scss";
import { addToCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import axios from "axios";

function Card({ fish }) {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.user);
   
  // ... existing code ...

  const handleAddToCart = async (values) => {
    try {
      const response = await axios.post(`/cart`);
      console.log(response.data);
    } catch (err) {
      console.error(err.response.data);
    }
    dispatch(addToCart(fish));
  };

// ... existing code ...
  return (
    <div className="fish-card">
      <img src={fish.image} />
      <div className="fish-card__content">
        <div className="fish-card__info">
          <div className="name">{fish.name}</div>
          <div className="price">{fish.price}</div>
        </div>
        <p className="fish-card__description">
          {fish.description.length > 100
            ? `${fish.description.substring(0, 100)}...`
            : fish.description}
        </p>
        <button className="button" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
}

export default Card;