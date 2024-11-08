import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { addToCart } from "../../redux/features/cartSlice";
import api from "../../config/api";
import Feedback from "../../components/feedbacks";
import FishList from "../../components/fishList";
import NarBar from "../../components/navigation2";

function ProductDetails() {
  const selectedFish = useSelector((state) => state.fish.selectedFish);
  const dispatch = useDispatch();
  const FishShop = "FishShop";
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

  // Hàm tính giá cũ (old price) với 500000 đắt hơn giá hiện tại
  const oldPrice = price + 500000;

  return (
    <div className="product-details">
      <NarBar preOn={FishShop} standOn={name} />
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
          <p className="product-details__description">{description}</p>
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
        <FishList Type={category} />
        <Feedback productId={id} />
      </div>
    </div>
  );
}

export default ProductDetails;
