import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./index.scss";
import { addToCart } from "../../redux/features/cartSlice";
import api from "../../config/api";
import FishList from "../../components/fishList";
import NarBar from "../../components/navigation2";

function ProductDetails() {
  const dispatch = useDispatch();
  const selectedFish = useSelector((state) => state.fish.selectedFish);

  if (!selectedFish) {
    return <div>Loading...</div>;
  }

  const {
    id,
    name,
    image,
    price,
    size,
    age,
    origin,
    description,
    category,
    tags,
  } = selectedFish;

  const oldPrice = price + 500000;

  const descriptionGen = `This beautiful ${name} koi fish, originating from ${origin}, 
                      is ${age} years old and has an impressive width of ${size} cm. 
                      It's a perfect choice for any koi enthusiast looking to add a unique fish to their collection.`;

  const handleAddToCart = async () => {
    try {
      await api.post(`Cart/${id}`, { quantity: 1 });
      dispatch(addToCart(selectedFish));
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  return (
    <div className="product-details">
      <NarBar preOn="FishShop" standOn={name} />
      <div className="product-details__header">
        <div className="product-details__image">
          <img src={image} alt={name} />
        </div>
        <div className="product-details__info">
          <h1>{name}</h1>
          <p className="product-details__price">
            ${price}{" "}
            <span className="product-details__old-price">${oldPrice}</span>
          </p>
          <ul className="product-details__specs">
            <li>Width: {size} cm</li>
            <li>Age: {age} years</li>
            <li>Origin: {origin}</li>
          </ul>
          <p className="product-details__descriptionGen">{descriptionGen}</p>
          <div className="product-details__actions">
            <button className="button add-to-cart" onClick={handleAddToCart}>
              Add To Cart
            </button>
            <button className="button compare">+ Compare</button>
          </div>
          <div className="product-details__divider2"></div>
          <div className="product-details__meta">
            <p>Number: #{id}</p>
            <p>Category: {category}</p>
            <p>Tags: {Array.isArray(tags) ? tags.join(", ") : "#Fish"}</p>
          </div>
        </div>
      </div>

      <div className="product-details__divider"></div>

      <div className="product-details__footer">
        <div className="product-details__description">
          <h2>Description</h2>
          <p>{description}</p>
        </div>
      </div>
      <FishList Type={category} />
    </div>
  );
}

export default ProductDetails;
