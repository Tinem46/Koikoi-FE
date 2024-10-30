import { useDispatch, useSelector } from 'react-redux';
import "./index.scss";
import { addToCart } from '../../redux/features/cartSlice';
import { addToCompare } from '../../redux/features/compareSlice';
import api from '../../config/api';
import Naviagtion from '../../components/navigation';
import Feedback from '../../components/feedbacks';

function ProductDetails() {
  const selectedFish = useSelector((state) => state.fish.selectedFish); // Get the fish object
  const dispatch = useDispatch();
  if (!selectedFish) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = async () => {
    try {
      const response = await api.post(`Cart/${selectedFish.id}`);
      console.log(response.data);
    } catch (err) {
      console.error(err.response.data);
    }
    dispatch(addToCart(selectedFish));
  };

  const handleCompareClick = () => {
    dispatch(addToCompare(selectedFish));
  };

  const { id, name, image, price, size, age, origin, description, category, tags } = selectedFish;

  return (
    <div className="product-details">
        <Naviagtion name="Product Details" link="/"/>
      <div className="product-details__header">
        <div className="product-details__image">
          <img src={image} alt={name} />
        </div>
        <div className="product-details__info">
          <h1>{name}</h1>
          <p className="product-details__price">
            ${price} <span className="product-details__old-price"></span>
          </p>
          <ul className="product-details__specs">
            <li>Size: {size} cm</li>
            <li>Age: {age} years</li>
            <li>Origin: {origin}</li>
          </ul>
          <p className="product-details__description">{description}</p>
          <div className="product-details__actions">
            <button className="button" onClick={handleAddToCart}>Add To Cart</button>
            <button className="button" onClick={handleCompareClick}>Compare</button>
          </div>
          <div className="product-details__divider2"></div>
          <div className="product-details__meta">
            <p>Number: #{id}</p>
            <p>Category: {category}</p>
            <p>Tags: {Array.isArray(tags) ? tags.join(', ') : '#Fish'}</p>
          </div>
        </div>
      </div>

      <div className="product-details__divider"></div>

      <div className="product-details__footer">
        <div className="product-details__description">
          <h2>Description</h2>
          <p>{description}</p>
        </div>
        <Feedback productId={id} />
      </div>
    </div>
  );
}

export default ProductDetails;
