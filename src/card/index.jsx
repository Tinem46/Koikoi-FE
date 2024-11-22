/* eslint-disable react/prop-types */
import "./index.scss";
import { addToCart } from '../redux/features/cartSlice';
import { useDispatch } from 'react-redux';
import api from "../config/api";
import { setSelectedFish } from "../redux/features/fishSlice";
import { useNavigate } from "react-router-dom";
import { addToCompare } from '../redux/features/compareSlice';
import { toast } from "react-toastify";

function Card({ fish }) {
  const dispatch = useDispatch();
   const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (fish.status.toLowerCase() === "SOLD OUT") {
      toast.error("This fish is sold out!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      toast.error("Please login to add to cart");
      return;
    }

    try {
      const response = await api.post(`Cart/${fish.id}`);
      console.log(response.data);
      dispatch(addToCart(fish));
    } catch (err) {
      console.error(err.response.data);
    }
  };


  const handleCardClick = () => {
    dispatch(setSelectedFish(fish)); 
    navigate(`/product-details/${fish.id}`);
  };
  
  const handleCompareClick = (e) => {
    e.stopPropagation();
    dispatch(addToCompare(fish));
  };

  return (
    <div className="fish-card">
      <img src={fish.image} alt={fish.name} onClick={handleCardClick}/>
      <div className="fish-card__actions">
        <button className="action-button" onClick={handleCompareClick}>
          <span className="icon">⇄</span> Compare
        </button>
      </div>
      <div className="fish-card__content">
        <div className="fish-card__info">
          <div className="name">Name: {fish.name}</div>
          <div className="price">
            Price: {new Intl.NumberFormat('vi-VN', { 
              style: 'currency', 
              currency: 'VND' 
            }).format(fish.price)}
          </div>
          <div className="category">Category: {fish.category}</div>
          <div className="status" title={fish.status.toLowerCase() === "sold out" ? "×" : ""}>
            Status: {fish.status}
          </div>
        </div>
        <button 
          className={`button ${fish.status.toLowerCase() === "sold out" ? "disabled" : ""}`} 
          onClick={handleAddToCart}
          disabled={fish.status.toLowerCase() === "sold out"}
        >
          {fish.status.toLowerCase() === "sold out" ? "Sold Out" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default Card;
