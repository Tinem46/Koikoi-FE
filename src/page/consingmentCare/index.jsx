import { useState, useEffect } from "react";
import { Table, Button, Modal, DatePicker, message } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../../config/api";
import dayjs from "dayjs";
import "./index.scss";
import Navigation from "../../components/Navigation";
function ConsignmentCare() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [isConsignmentModalVisible, setIsConsignmentModalVisible] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0); // State to hold total amount
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConfirmedOrders = async () => {
      try {
        setLoadingOrders(true);
        const response = await api.get("order/confirmed");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching confirmed orders:", error);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchConfirmedOrders();
  }, []);

  const fetchOrderDetails = async (orderId) => {
    try {
      setLoadingDetails(true);
      const response = await api.get(`order/details`, { params: { orderId } });
      setSelectedOrderDetails(response.data);
      setSelectedOrderId(orderId);
      setDetailsModalVisible(true);
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeDetailsModal = () => {
    setDetailsModalVisible(false);
    setSelectedOrderDetails([]);
    setSelectedOrderId(null);
  };

  const handleConsignmentClick = (product) => {
    setSelectedProduct(product);
    setIsConsignmentModalVisible(true);
  };

  const handleConsignment = async () => {
    try {
      if (!selectedProduct) {
        message.error("No product selected");
        return;
      }

      const createResponse = await api.post(
        `Consignment/care/${selectedProduct.id}`,
        {
          start_date: startDate.format("YYYY-MM-DD"),
          end_date: endDate.format("YYYY-MM-DD"),
        }
      );

      if (!createResponse?.data?.id) {
        throw new Error("Invalid response from server");
      }

      const detailsResponse = await api.get(
        `Consignment/showConsignment/${createResponse.data.id}`
      );
      if (detailsResponse.data) {
        setTotalAmount(detailsResponse.data.totalAmount);
        setSelectedOrderId(createResponse.data.id);
      }
    } catch (error) {
      console.error("Error creating consignment:", error);
      message.error(
        error.response?.data?.message || "Failed to create consignment"
      );
    }
  };

  const handleProceedToCheckout = async () => {
    setIsConsignmentModalVisible(false);
    try {
      const response = await api.post(
        `order/consignOrder`,
        {
          id: selectedOrderId,
          totalAmount: totalAmount,
        },
        {
          params: { id: selectedOrderId },
        }
      );
      navigate("/checkout", {
        state: {
          totalAmount: totalAmount,
          orderId: response.data.id,
          paymentType: "consignment",
        },
      });
    } catch (error) {
      console.error("Error processing consignment order:", error);
      message.error("Failed to process consignment order");
    }
  };

  const orderColumns = [
    { title: "Order ID", dataIndex: "id", key: "id" },

    {
      title: "Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (text) => `$${parseFloat(text).toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "type",
      key: "type",
    },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => fetchOrderDetails(record.id)}>
          View More For Consign
        </Button>
      ),
    },
  ];

  const orderDetailsColumns = [
    { title: "Product ID", dataIndex: "id", key: "id" },
    { title: "Product Name", dataIndex: "name", key: "name" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => `$${parseFloat(text).toFixed(2)}`,
    },
    {
      title: "Total",
      key: "total",
      render: (record) => `$${(record.quantity * record.price).toFixed(2)}`,
    },
    {
      title: "Consignment",
      key: "consignment",
      render: (_, record) => (
        <Button onClick={() => handleConsignmentClick(record)}>
          Consignment
        </Button>
      ),
    },
  ];
  return (
    <div className="consignment-care-container1">
      <Navigation name="Consignment Care" link="/consignmentCare" />
      <Table
        dataSource={orders}
        columns={orderColumns}
        rowKey="id"
        loading={loadingOrders}
        className="tableLoadingOrder"
      />

      <Modal
        visible={detailsModalVisible}
        title={`Order Details for Order ID: ${selectedOrderId}`}
        onCancel={closeDetailsModal}
        footer={[
          <Button key="close" onClick={closeDetailsModal}>
            Close
          </Button>,
        ]}
        width={800}
        centered
      >
        <Table
          dataSource={selectedOrderDetails}
          columns={orderDetailsColumns}
          rowKey="id"
          loading={loadingDetails}
          pagination={false}
        />
      </Modal>

      <Modal
        title="Select Start and End Date"
        visible={isConsignmentModalVisible}
        onOk={
          totalAmount > 0 ? () => handleProceedToCheckout() : handleConsignment
        }
        onCancel={() => {
          setIsConsignmentModalVisible(false);
          setTotalAmount(0); // Reset total amount on close
        }}
        okText={totalAmount > 0 ? "Proceed to Checkout" : "Ok"} // Change button text based on totalAmount
      >
        <DatePicker
          placeholder="Start Date"
          value={startDate}
          onChange={(date) => setStartDate(date)}
          style={{ width: "45%", marginRight: "10%" }}
        />
        <DatePicker
          placeholder="End Date"
          value={endDate}
          onChange={(date) => setEndDate(date)}
          style={{ width: "45%" }}
        />

        {/* Show totalAmount if available */}
        {totalAmount > 0 && (
          <div style={{ marginTop: "20px" }}>
            <h3>Consignment Total</h3>
            <p>Total amount: ${totalAmount.toFixed(2)}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ConsignmentCare;
