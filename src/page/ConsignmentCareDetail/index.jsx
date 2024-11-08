import React, { useState, useEffect } from "react";
import { Table, DatePicker, Button, Image, Popconfirm, message } from "antd";
import dayjs from "dayjs";
import Naviagtion from "../../components/navigation";
import api from "../../config/api"; // Thêm import API
import "./index.scss";
import NarBar from "../../components/navigation2";

function ConsignmentCareMain() {
  const [dataSource, setDataSource] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchConsignments = async () => {
      try {
        const response = await api.get("/Consignment/getAll");
        const data = response.data.map((item, index) => ({
          key: index.toString(),
          name: item.product_name,
          startDate: item.start_date ? dayjs(item.start_date) : null,
          endDate: item.end_date ? dayjs(item.end_date) : null,
          totalAmount: item.totalAmount,
          note: item.note,
        }));
        setDataSource(data);
        setCart(data);
        // Tính tổng số tiền
        const subTotalAmount = data.reduce((acc, curr) => acc + curr.totalAmount, 0);
        setSubTotal(subTotalAmount);
        setTotalAmount(subTotalAmount + 10); // Giả sử shipping phí cố định là 10
      } catch (error) {
        console.error("Error fetching consignment data:", error);
        message.error("Failed to load consignment data.");
      }
    };

    fetchConsignments();
  }, []);

  const handleProceedToCheckout = () => {
    message.success("Proceeding to checkout...");
  };

  const handleDateChange = (date, dateString, recordKey, dateType) => {
    setDataSource((prevData) =>
      prevData.map((item) => {
        if (item.key !== recordKey) return item;

        const newItem = { ...item, [dateType]: date ? dayjs(date) : null };

        if (dateType === "endDate" && newItem.startDate && date && date.isBefore(newItem.startDate)) {
          message.error("End Date cannot be earlier than Start Date.");
          return item;
        }

        if (dateType === "startDate" && newItem.endDate && date && date.isAfter(newItem.endDate)) {
          message.error("Start Date cannot be later than End Date.");
          return item;
        }

        return newItem;
      })
    );
  };

  const handleRemove = (recordKey) => {
    setDataSource((prevData) => prevData.filter((item) => item.key !== recordKey));
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (startDate, record) => (
        <DatePicker
          value={startDate ? dayjs(startDate) : null}
          onChange={(date, dateString) =>
            handleDateChange(date, dateString, record.key, "startDate")
          }
        />
      ),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate, record) => (
        <DatePicker
          value={endDate ? dayjs(endDate) : null}
          onChange={(date, dateString) =>
            handleDateChange(date, dateString, record.key, "endDate")
          }
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title={`Are you sure you want to delete ${record.name}?`}
          onConfirm={() => handleRemove(record.key)}
        >
          <Button danger>Remove</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="outlet-ConsignmentCareDetail">
      <NarBar preOn="ConsignmentCare" standOn="ConsignmentCareDetail"/>
      <div className="consignment-care-detail">
        <h1>Consignment Care Detail</h1>
        <Table columns={columns} dataSource={dataSource} />
      </div>

      <div className="total-amount-container">
        <div className="blankDiv"></div>
        <section className="TotalAmount">
          <h1>Total Amount</h1>
          <div className="modify-Checkout">
            <p>Subtotal: </p>
            <p>${subTotal.toFixed(2)}</p>
          </div>
         
          <div className="modify-Checkout">
            <p>Total amount: </p>
            <p>${totalAmount.toFixed(2)}</p>
          </div>
          <br />
          {Array.isArray(cart) && cart.length > 0 && (
            <button onClick={handleProceedToCheckout}>Proceed to checkout</button>
          )}
        </section>
      </div>
    </div>
  );
}

export default ConsignmentCareMain;
