import PropTypes from 'prop-types';
import "./index.scss";

function Card({ fish }) {
  const { name, price, description, image } = fish;

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
      <button>Add to cart</button>
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