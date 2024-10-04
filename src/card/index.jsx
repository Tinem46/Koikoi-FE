/* eslint-disable react/prop-types */
import "./index.scss";
import { addToCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';

function Card({ fish }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(fish))
  };

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