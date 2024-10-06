import { useSelector, useDispatch } from "react-redux"; // Use both useSelector and useDispatch

// Import actions for removing and updating items
import { remove, changeQuantity } from "../../redux/features/cartSlice";

import "./index.scss";
import { Image, Table, InputNumber, Button, Space, Input, Popconfirm } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  // Redux: Getting cart data from the store
  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  // Local state to manage table data
  const [dataSource, setDataSource] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0); // State to store total price
  const navigate = useNavigate();

  // Function to handle removing a product from the cart
  const handleRemove = (id) => {
    dispatch(remove({ id }));
  };

  // Function to handle changing the quantity of a product
  const handleChangeQuantity = (id, quantity) => {
    dispatch(changeQuantity({ id, quantity }));
  };

  // Mapping cart data to be used in the table
  useEffect(() => {
    
    if (cart) {
      const tableData = cart.map((item) => ({
        key: item.id,
        name: item.name,
        price: item.price * item.quantity,
        image: item.image,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        id: item.id,
      }));
      setDataSource(tableData);
      // Calculate total price
      const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalPrice(total);
    }
  }, [cart]);

  // Table configuration
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
          onChange={(value) => handleChangeQuantity(record.id, value)}
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
          <Button danger>
            Remove
          </Button>
        </Popconfirm>
      ),
    },
  ];
  //checkout

  return (
    <div className="outlet-Cart">
      <div className="cart">
        <span className="title-Cart">Cart</span>
        <ShoppingCartOutlined className="icon-Cart" />

        {cart.length === 0 ? (
          <p className="emty-p">Your cart is empty</p>
        ) : (
          <Table columns={columns} dataSource={dataSource} />
        )}
      </div>
      <div className="return-update-cart">
        <Link to="/">
          <Button>Return To Shop</Button>
        </Link>
        <Button>Update Cart</Button>
      </div>
      <div className="coupon-Checkout">
        <Space.Compact className="coupon-Input">
          <Input placeholder="Enter your voucher"></Input>
          <Button type="primary">Submit</Button>
        </Space.Compact>
        <section className="checkOut-Box">
          <h1>Cart Total</h1>
          <div className="modify-Checkout">
            <p>Subtotal: </p>
            <p>{totalPrice}</p>
          </div>
          <div className="modify-Checkout">
            <p>Shipping: </p> <p></p>
          </div>
          <div className="modify-Checkout">
            <p>Total amount: </p> <p></p>
          </div>
          <br></br>
          {cart.length > 0 && (
            <button  onClick={() => navigate('/checkout')}>Proceed to checkout</button>
          )}
          
        </section>
      </div>
    </div>
  );
}

export default Cart;
