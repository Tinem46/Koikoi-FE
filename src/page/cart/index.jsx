import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; // Corrected import
import "./index.scss";
import { Image, Table, InputNumber, Button, Space, Input, Popconfirm } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Naviagtion from "../../components/navigation";
import api from "../../config/api";
import { reset } from "../../redux/features/cartSlice";


function Cart() {
  const [cart, setCart] = useState([]); // Local state for cart
  const [dataSource, setDataSource] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cartTotal, setCartTotal] = useState([]);
  const [voucherCode, setVoucherCode] = useState(""); // State for voucher code
  const [cartId, setCartId] = useState(null);

  const [subTotal, setSubTotal] = useState(0);
  const [shippingPee,  setShippingPee] = useState(0);    
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchCard = async () => {
    try {
      const response = await api.get('Cart');
      setCartId(response.data.id); // Assuming the account ID is in the response
    } catch (error) {
      console.error("Failed to fetch account ID:", error.response);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await api.get('Cart');
      const cartData = response.data.cartDetails; // Extract cartDetails array
      setCart(cartData);
    } catch (error) {
      console.error("Failed to fetch cart:", error.response);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchCard(); 
  }, []);

  const handleRemove = async (id) => {
    try {
      await api.delete(`Cart/${id}`);
      const updatedCart = cart.filter(item => item.id !== id);
      setCart(updatedCart);

      // Dispatch reset if the cart is empty
      if (updatedCart.length === 0) {
        dispatch(reset());
      }
    } catch (error) {
      console.error("Failed to remove item:", error.response ? error.data : error);
    }
  };

  const handleIncreaseQuantity = async (id) => {
    try {
      await api.put(`Cart/increase/${id}`);
      setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    } catch (error) {
      console.error("Failed to increase quantity:", error.response ? error.data : error);
    }
  };

  const handleDecreaseQuantity = async (id) => {
    try {
      await api.put(`Cart/decrease/${id}`);
      setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
    } catch (error) {
      console.error("Failed to decrease quantity:", error.response ? error.data : error);
    }
  };

  const addCartTotal = async () => {
    if (!cartId) {
      console.error("Account ID is not available");
      return;
    }
    try {
      const response = await api.get(`Cart/total`, {
        params: {
          accountId: cartId,
          voucherCode: voucherCode 
        }
      });
      console.log(response.data);
      const { subTotal, shippingPee, totalAmount } = response.data; // Assuming these fields are in the response
      setSubTotal(subTotal);
      setShippingPee(shippingPee);
      setTotalAmount(totalAmount);
      console.log(subTotal, shippingPee, totalAmount);
    } catch (error) {
      console.error("Failed to fetch cart total:", error.response ? error.response.data : error);
    }
  };



  useEffect(() => {
    if (Array.isArray(cart)) { // Ensure cart is an array
      const tableData = cart.map((item) => ({
        key: item.id,
        name: item.name,
        price: "$" + new Intl.NumberFormat('en-US').format(item.price * item.quantity),
        image: item.image,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        id: item.id,
      }));
      setDataSource(tableData);
    } else {
      console.error("Cart is not an array:", cart);
    }
  }, [cart]);

  const columns = [
    {
      title: "Picture",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={image} width={100} />,
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, record) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) => {
            if (value > quantity) {
              handleIncreaseQuantity(record.id);
            } else if (value < quantity) {
              handleDecreaseQuantity(record.id);
            }
          }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm 
          title={`Are you sure you want to delete ${record.name}?`}
          onConfirm={() => handleRemove(record.id)}
        >
          <Button danger>Remove</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <>
      <div className="outlet-Cart">
        <Naviagtion name="Cart" link="/cart"/>
        <div className="cart">
          <span className="title-Cart">Cart</span>
          <ShoppingCartOutlined className="icon-Cart" />
          {Array.isArray(cart) && cart.length === 0 ? ( // Ensure cart is an array
            <p className="empty-p">Your cart is empty</p>
          ) : (
            <Table columns={columns} dataSource={dataSource} />
          )}
        </div>
        <div className="return-update-cart">
          <Link to="/">
            <Button>Return To Shop</Button>
          </Link>
          <Button onClick={addCartTotal}>Update Cart Total</Button>
        </div>
        <div className="coupon-Checkout">
          <Space.Compact className="coupon-Input">
            <Input 
              placeholder="Enter your voucher"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)} // Update voucherCode state
            />
            <Button type="primary" onClick={addCartTotal}>Submit</Button> 
          </Space.Compact>
          <section className="checkOut-Box">
            <h1>Cart Total</h1>
            <div className="modify-Checkout">
              <p>Subtotal: </p>
              <p>${subTotal.toFixed(2)}</p>
            </div>
            <div className="modify-Checkout">
              <p>Shipping: </p>
              <p>${shippingPee.toFixed(2)}</p>
            </div>
            <div className="modify-Checkout">
              <p>Total amount: </p>
              <p>${totalAmount.toFixed(2)}</p>
            </div>
            <br />
            {Array.isArray(cart) && cart.length > 0 && (
              <button onClick={() => navigate('/checkout')}>Proceed to checkout</button>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default Cart;
