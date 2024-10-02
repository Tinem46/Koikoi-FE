import PropTypes from 'prop-types';
import "./index.scss";
import { addToCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';

function Card({ fish }) {
  const { name, price, description, image } = fish;

  const handleAddToCart = ()=>{
    dispatch(addToCart(fish));
  }
const dispatch = useDispatch();
  return (
    <div className="fish-card">
      <img src={image} alt={name} />
      <div className="fish-card__content">
        <div className="fish-card__info">
          <span>{name}</span>
          <span>{price}</span>
        </div>
        <p className="description">
          {description.length > 100
            ? `${description.substring(0, 100)}...`
            : description}
        </p>
        </div>
        <button className="button" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
      </div>
  );
}

Card.propTypes = {
  fish: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;