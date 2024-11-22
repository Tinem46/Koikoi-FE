import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./index.scss";
import { addToCart } from "../../redux/features/cartSlice";
import api from "../../config/api";
import FishList from "../../components/fishList";
import { Modal } from 'antd';
import NavBar from "../../components/navigation2";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedFish = useSelector((state) => state.fish.selectedFish);

  if (!selectedFish) {
    return <div>Loading...</div>;
  }

  const {
    name,
    image,
    price,
    size,
    age,
    origin,
    description,
    category,
    tags,
    quantity,
    author,
    status,
  } = selectedFish;

  const oldPrice = price + 500000;

  const descriptionGen = `This beautiful ${name} koi fish, originating from ${origin}, 
                      is ${age} years old and has an impressive width of ${size} cm. 
                      It's a perfect choice for any koi enthusiast looking to add a unique fish to their collection.`;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certificate, setCertificate] = useState(null);

  const handleAddToCart = async () => {
    if (selectedFish.status.toLowerCase() === "sold out") {
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
      const response = await api.post(`Cart/${selectedFish.id}`);
      console.log(response.data);
      dispatch(addToCart(selectedFish));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  const handleViewCertificate = async () => {
    try {
      const response = await api.get(`Koi/certificate?id=${selectedFish.id}`);
      setCertificate(response.data);
      setIsModalOpen(true);
    } catch (err) {
      console.error("Error fetching certificate:", err);
    }
  };

  const formatVND = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className="product-details">
      <NavBar standOn="FishShop" selectedMenu={name} />
      <div className="product-details__header">
        <div className="product-details__image">
          <img src={image} alt={name} />
        </div>
        <div className="product-details__info">
          <h1>{name}</h1>
          <p className="product-details__price">
            {formatVND(price)}{" "}
            <span className="product-details__old-price">{formatVND(oldPrice)}</span>
          </p>
          <ul className="product-details__specs">
            <li>Width: {size} cm</li>
            <li>Age: {age} month</li>
            <li>Origin: {origin}</li>
            <li>Author: {author}</li>
            <li>Status: {status}</li>
          </ul>
          <p className="product-details__descriptionGen">{descriptionGen}</p>
          <div className="product-details__actions">
            <button className="button add-to-cart" onClick={handleAddToCart}>
              Add To Cart
            </button>
            <button className="button certificate" onClick={handleViewCertificate}>
              View Certificate
            </button>
          </div>
          <div className="product-details__divider2"></div>
          <div className="product-details__meta">
            <p>Number: {quantity}</p>
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

      <Modal className="certificate-modal"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {certificate && (
          <div className="certificate-content">
            <img src={certificate.image} alt="Certificate" className="certificate-image" />
            <div className="certificate-details">
              
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ProductDetails;
