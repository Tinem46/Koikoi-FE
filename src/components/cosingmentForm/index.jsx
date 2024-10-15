import { useLocation } from "react-router-dom";
import "./index.scss";
import backgroundform from "../../assets/image/backgroundform.png";
import { Col, Form, Input, Row, DatePicker, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";

function ConsignmentForm() {
  const location = useLocation();
  const { consignmentType } = location.state || {
    consignmentType: "Consignment Form",
  };

  const [formData, setFormData] = useState({
    fullname: "",
    phoneNumber: "",
    email: "",
    address: "",
    koiName: "",
    type: "",
    size: "",
    origin: "",
    startDate: null,
    endDate: null,
    description: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,  
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="formcontainer">
      <img src={backgroundform} alt="Background" />
      <div className="formcontainer__Content">
        <h1>{consignmentType}</h1>
        <div className="formcontainer__Content__firstElement">
          <Form
            className="formcontainer__Content__firstElement__form"
            layout="vertical"
            onFinish={handleSubmit}
            size="large"
          >
            {/* Personal Information */}
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Full Name" required>
                  <Input
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone Number" required>
                  <Input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Email" required>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Address" required>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ConsignmentForm;
