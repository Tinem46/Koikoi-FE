import { useEffect, useState } from "react";
import {
  Table,
  Spin,
  Typography,
  Button,
  Modal,
  DatePicker,
  message,
} from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import api from "../../config/api";
import "./index.scss";
import dayjs from "dayjs";

const { Text } = Typography;

function ConsignmentHistory() {
  const [consignmentData, setConsignmentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCancelConfirmVisible, setIsCancelConfirmVisible] = useState(false);
  const [selectedConsignment, setSelectedConsignment] = useState(null);
  const [newEndDate, setNewEndDate] = useState(null);
  const [cancelEndDate, setCancelEndDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [isCheckoutStage, setIsCheckoutStage] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchConsignmentData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/Consignment/showConsign");
        setConsignmentData(response.data);
      } catch (error) {
        console.error("Error fetching consignment data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsignmentData();
  }, []);

  const calculateRemainingDays = (endDate) => {
    const end = dayjs(endDate);
    const today = dayjs();
    const remainingDays = end.diff(today, "day");
    return remainingDays > 0 ? remainingDays : 0;
  };

  const handleRenew = (record) => {
    setSelectedConsignment(record);
    setNewEndDate(dayjs(record.end_date).add(1, "day"));
    setIsModalVisible(true);
    setTotalAmount(null);
    setIsCheckoutStage(false);
  };

  const confirmCancelConsignment = async () => {
    if (!cancelEndDate) {
      message.error("Please select an end date for cancellation.");
      return;
    }

    try {
      const { id } = selectedConsignment;
      const formattedEndDate = cancelEndDate.format("YYYY-MM-DD");

      await api.post(`/Consignment/cancel/${id}`, { end_date: formattedEndDate });
      message.success("Consignment has been cancelled.");
      setIsCancelConfirmVisible(false);
      setCancelEndDate(null);

      // Fetch updated data after cancellation
      const updatedData = await api.get("/Consignment/showConsign");
      setConsignmentData(updatedData.data);
    } catch (error) {
      console.error("Error cancelling consignment:", error);
      message.error("Failed to cancel consignment.");
    }
  };

  const handleConfirmExtend = async () => {
    if (!newEndDate) {
      message.error("Please select an end date");
      return;
    }

    try {
      if (!isCheckoutStage) {
        // First stage - Show total amount
        const response = await api.post(
          `Consignment/care/${selectedConsignment.id}`,
          {
            start_date: dayjs(selectedConsignment.end_date).add(1, 'day').format("YYYY-MM-DD"),
            end_date: newEndDate.format("YYYY-MM-DD"),
          }
        );

        const detailsResponse = await api.get(
          `Consignment/showConsignment/${response.data.id}`
        );

        setTotalAmount(detailsResponse.data.totalAmount);
        setIsCheckoutStage(true);
      } else {
        // Second stage - Process to checkout
        const createResponse = await api.post(
          `Consignment/care/${selectedConsignment.id}`,
          {
            start_date: dayjs(selectedConsignment.end_date).add(1, 'day').format("YYYY-MM-DD"),
            end_date: newEndDate.format("YYYY-MM-DD"),
          }
        );

        const orderResponse = await api.post(
          `order/consignOrder`,
          {
            id: createResponse.data.id,
            totalAmount: totalAmount,
          },
          {
            params: { id: createResponse.data.id },
          }
        );

        // Navigate to checkout
        navigate('/checkout', {
          state: {
            totalAmount: totalAmount,
            orderId: orderResponse.data.id,
            paymentType: 'consignment',
          },
        });
        setIsModalVisible(false);
      }
    } catch (error) {
      console.error("Error extending consignment:", error);
      message.error(
        error.response?.data?.message || "Failed to extend consignment"
      );
    }
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setNewEndDate(null);
    setTotalAmount(null);
    setIsCheckoutStage(false);
  };

  const handleCancelConfirmationClose = () => {
    setIsCancelConfirmVisible(false);
    setCancelEndDate(null);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const columns = [
    {
      title: "ID",
      key: "id",
      render: (_, __, index) => index + 1,
      className: "consignment-column-id",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      className: "consignment-column-product-name",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      className: "consignment-column-start-date",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      className: "consignment-column-end-date",
      render: (text) => dayjs(text).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: "Remaining Days",
      key: "remaining_days",
      className: "consignment-column-remaining-days",
      render: (_, record) => {
        const remainingDays = calculateRemainingDays(record.end_date);
        return (
          <Text className="consignment-remaining-days">
            {remainingDays} days
          </Text>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "consignment-column-status",
      render: (status) => <Text className="consignment-status">{status}</Text>,
    },
    {
      title: "Action",
      key: "action",
      className: "consignment-column-action",
      render: (_, record) => {
        if (record.status === "VALID") {
          return (
            <>
              <Button
                type="primary"
                className="extend-button custom-extend-button"
                onClick={() => handleRenew(record)}
              >
                Extend
              </Button>
              <Button
                type="primary"
                className="cancel-button"
                onClick={() => {
                  setSelectedConsignment(record);
                  setIsCancelConfirmVisible(true);
                }}
                style={{ marginLeft: 8 }}
              >
                Cancel
              </Button>
            </>
          );
        } else if (record.status === "CANCELLED") {
          return (
            <Button
              type="primary"
              className="extend-button custom-extend-button"
              onClick={() => handleRenew(record)}
            >
              Extend
            </Button>
          );
        }
        return null;
      },
    },
  ];

  return (
    <div className="consignment-history-page">
      
      <div className="consignment-history-container">
        {loading ? (
          <Spin tip="Loading..." className="consignment-loading" />
        ) : (
          <Table
            className="consignment-table"
            dataSource={consignmentData}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 20 }}
            locale={{ emptyText: "No consignments found" }}
          />
        )}
      </div>

      <Modal
        title="Extend Consignment"
        visible={isModalVisible}
        centered
        onOk={handleConfirmExtend}
        onCancel={handleModalCancel}
        okText={isCheckoutStage ? "Process to Checkout" : "Confirm"}
        cancelText="Cancel"
        className="renew-modal"
        okButtonProps={{ className: "custom-ok-button" }}
        cancelButtonProps={{ className: "custom-cancel-button" }}
      >
        <p>
          <strong>Current Start Date:</strong>{" "}
          {dayjs(selectedConsignment?.end_date)
            .add(1, "day")
            .format("YYYY-MM-DD")}
        </p>
        <p>
          <strong>Select New End Date:</strong>
        </p>
        <DatePicker
          value={newEndDate}
          onChange={(date) => setNewEndDate(date)}
          format="YYYY-MM-DD"
          placeholder="Select end date"
          className="date-picker"
        />
        {isCheckoutStage && totalAmount && (
          <p>
            <strong>Total Amount:</strong> {formatCurrency(totalAmount)}
          </p>
        )}
      </Modal>

      <Modal
        title="Confirm Cancellation"
        visible={isCancelConfirmVisible}
        centered
        onOk={confirmCancelConsignment}
        onCancel={handleCancelConfirmationClose}
        okText="Yes, Cancel"
        cancelText="No"
        className="cancel-confirm-modal"
        okButtonProps={{ className: "custom-ok-button" }}
        cancelButtonProps={{ className: "custom-cancel-button" }}
      >
        <p>Please select an end date for cancellation:</p>
        <DatePicker
          value={cancelEndDate}
          onChange={(date) => setCancelEndDate(date)}
          format="YYYY-MM-DD"
          placeholder="Select end date"
          className="date-picker"
        />
      </Modal>
    </div>
  );
}

export default ConsignmentHistory;
