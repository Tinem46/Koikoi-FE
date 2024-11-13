import { useState, useEffect } from "react";
import { useDispatch } from "react-redux"; // Corrected import
import "./index.scss";
import { Image, Table, InputNumber, Button, Space, Input, Popconfirm } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import Naviagtion from "../../components/navigation";
import api from "../../config/api";
import { reset, syncWithApi } from "../../redux/features/cartSlice";
import { toast } from 'react-toastify';

function Cart() {
  const [cart, setCart] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [voucherCode, setVoucherCode] = useState(""); 
  const [cartId, setCartId] = useState(null);

  const [subTotal, setSubTotal] = useState(0);
  const [shippingPee, setShippingPee] = useState(0);    
  const [totalAmount, setTotalAmount] = useState(0);

  const [userProfile, setUserProfile] = useState(null);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get(`account/Profile`);
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      toast.error("Failed to load user profile. Please try again.");
    }
  };

  const fetchCart = async () => {
    try {
      const response = await api.get('Cart');
      const cartData = response.data.activeCartDetails || []; 
      setCart(cartData);
      dispatch(syncWithApi(cartData)); 
      setCartId(response.data.id);
      await updateCartTotal(response.data.id);
    } catch (error) {
      console.error("Failed to fetch cart:", error.response);
      setCart([]); 
      dispatch(syncWithApi([])); // Sync với Redux store khi có lỗi
    }
  };

  useEffect(() => {
    fetchCart();
    fetchUserProfile(); 
  }, []);

  const handleRemove = async (id) => {
    try {
      await api.delete(`Cart/${id}`);
      const updatedCart = cart.filter(item => item.id !== id);
      setCart(updatedCart);
      if (updatedCart.length === 0) {
        dispatch(reset());
      }
      await updateCartTotal(cartId); // Update cart total after removing item
    } catch (error) {
      console.error("Failed to remove item:", error.response ? error.data : error);
    }
  };

  const handleIncreaseQuantity = async (id) => {
    try {
      await api.put(`Cart/increase/${id}`);
      setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
      await updateCartTotal(cartId); // Update cart total after increasing quantity
    } catch (error) {
      console.error("Failed to increase quantity:", error.response ? error.data : error);
    }
  };

  const handleDecreaseQuantity = async (id) => {
    try {
      await api.put(`Cart/decrease/${id}`);
      setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
      await updateCartTotal(cartId); // Update cart total after decreasing quantity
    } catch (error) {
      console.error("Failed to decrease quantity:", error.response ? error.data : error);
    }
  };

  const handleApplyVoucher = () => {
    updateCartTotal(cartId, voucherCode);
  };

  const updateCartTotal = async (cartId, voucherCode) => {
    if (!cartId) {
      console.error("Cart ID is not available");
      return;
    }
    try {
      const response = await api.get(`Cart/total`, {
        params: {
          cartId,
          voucherCode: voucherCode || undefined
        }
      });
      const { subTotal = 0, shippingPee = 0, totalAmount = 0 } = response.data;
      setSubTotal(subTotal);
      setShippingPee(shippingPee);
      setTotalAmount(totalAmount);
    } catch (error) {
      console.error("Failed to fetch cart total:", error.response ? error.response.data : error);
      toast.error("Failed to apply voucher. Please check your code and try again.");
      setSubTotal(0);
      setShippingPee(0);
      setTotalAmount(0);
    }
  };

  useEffect(() => {
    if (Array.isArray(cart)) {
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
      setDataSource([]); // Set dataSource to an empty array if cart is not an array
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

  const handleProceedToCheckout = async () => {
    if (!userProfile) {
      toast.error("User profile information is not available. Please try again.");
      return;
    }

    try {
      // Create the order here
      const orderData = {
        phone: userProfile?.phone_number || "",
        fullName: `${userProfile?.firstName || ""} ${userProfile?.lastName || ""}`.trim(),
        orderDate: new Date().toISOString(),
        note: "",
        address: userProfile?.streetAddress || "",
        voucherCode: voucherCode,
        orderStatus: "PENDING",
        subTotal,
        shippingPee,
        totalAmount
      };

      const orderResponse = await api.post('order', orderData);
      const orderId = orderResponse.data.id;

      navigate('/checkout', { 
        state: { 
          orderId,
          subTotal, 
          shippingPee, 
          totalAmount,
          cart,
          userProfile
        }
      });
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("An error occurred while creating the order. Please try again.");
    }
  };

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
        </div>
        <div className="coupon-Checkout">
          <Space.Compact className="coupon-Input">
            <Input 
              placeholder="Enter your voucher"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
            />
            <Button type="primary" onClick={handleApplyVoucher}>Apply Voucher</Button> 
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
              <button 
                onClick={handleProceedToCheckout}
              >
                Proceed to checkout
              </button>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default Cart;
