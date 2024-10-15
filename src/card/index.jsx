/* eslint-disable react/prop-types */
import "./index.scss";
import { addToCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import api from "../config/api";
import { setSelectedFish } from "../redux/features/fishSlice";
import { useNavigate } from "react-router-dom";
function Card({ fish }) {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.user);
   const navigate = useNavigate();
  // ... existing code ...

  const handleAddToCart = async () => {
    try {
      const response = await api.post(`Cart/${fish.id}`);
      console.log(response.data);
    } catch (err) {
      console.error(err.response.data);
    }
    dispatch(addToCart(fish))
  };


  const handleCardClick = () => {
    dispatch(setSelectedFish(fish)); // Dispatch the entire fish object
    navigate(`/product-details/${fish.id}`);
  };
// ... existing code ...
  return (
    <div className="fish-card" >
      <img src={fish.image} alt={fish.name} onClick={handleCardClick}/>
      <div className="eye-icon">👁️</div>
      <div className="fish-card__content">
        <div className="fish-card__info">
          <div className="id">ID: {fish.id}</div>
          <div className="name">Name: {fish.name}</div>
          <div className="price">
            Price: {new Intl.NumberFormat('en-US').format(fish.price)}$
          </div>
          <div className="category">Category: {fish.category}</div>
        </div>
        <p className="fish-card__description">Description:
          {fish.description && fish.description.length > 100
            ? `${fish.description.substring(0, 100)}...`
            : fish.description || "No description available"}
        </p>
        <button className="button" onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
      </div>
    </div>
  );
}

export default Card;
