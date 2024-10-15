import { Button, Modal } from "antd";
import backGroundConsignment from "../../assets/image/BackgroundConsignment.webp";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ConsignmentScreen() {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleGetStart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Nếu chưa đăng nhập, hiển thị pop-up
      setIsModalVisible(true);
    } else {
      // Nếu đã đăng nhập, chuyển tới trang ConsignmentPage
      navigate("/ConsignmentPage");
    }
  };

  const handleSignIn = () => {
    // Chuyển tới trang đăng nhập
    navigate("/login");
  };

  const handleSignUp = () => {
    // Chuyển tới trang đăng ký
    navigate("/register");
  };

  const handleCancel = () => {
    // Đóng modal
    setIsModalVisible(false);
  };

  return (
    <div className="consignment-container">
      <img src={backGroundConsignment} alt="Background" />
      <div className="consignment-container__content">
        <h1 className="consignment-container__content__title">
          Consignment Now!
        </h1>

        <p className="consignment-container__content__description">
          Our Koi Consignment Service allows customers to consign their Koi fish
          to our farm for sale. Whether you are a regular Koi enthusiast or a
          business-minded breeder, you can choose between two consignment
          options:
          <br />
          <strong>Offline Consignment:</strong> Suitable for hobbyist Koi owners
          who want to send their fish directly to our farm for consignment.
          <br />
          <strong>Online Consignment:</strong> Ideal for business breeders,
          allowing you to manage the consignment process online while we take
          care of the sales.
        </p>

        <Button
          className="consignment-container__content__btn"
          onClick={handleGetStart}
        >
          Get Start
        </Button>
        <Modal
          className="consignment-container__content__modal"
          title="Authentication Required"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="signIn" type="primary" onClick={handleSignIn}>
              Sign In
            </Button>,
            <Button key="signUp" onClick={handleSignUp}>
              Sign Up
            </Button>,
          ]}
        >
          <p>You need to Sign in or Sign Up</p>
        </Modal>
      </div>
    </div>
  );
}

export default ConsignmentScreen;
