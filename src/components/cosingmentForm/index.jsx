/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import "./index.scss";
import backgroundform from "../../assets/image/backgroundform.png";
import {
  Col,
  Form,
  Input,
  Row,
  DatePicker,
  Select,
  Button,
  Upload,
  Image,
} from "antd";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../config/api";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import StepsComponent from "../steps";

const { Option } = Select;

function ConsignmentForm() {
  const location = useLocation();
  const { consignmentType } = location.state || {
    consignmentType: "Consignment Form",
  };

  // Initialize form state with default values
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
    service: consignmentType, // Use consignmentType to set the default value for service
    description: "",
  });

  const [dateError, setDateError] = useState(null); // Error state for date validation
  const [fileList, setFileList] = useState([]); // Manage uploaded files
  const [previewImage, setPreviewImage] = useState(""); // Preview for uploaded images
  const [previewOpen, setPreviewOpen] = useState(false); // State to manage image preview modal

  // Fetch user profile when component mounts
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await api.get(`account/Profile`);
        const userData = response.data;

        // Populate form fields with user data
        setFormData((prevFormData) => ({
          ...prevFormData,
          fullname: userData?.name || "",
          phoneNumber: userData?.phoneNumber || "",
          email: userData?.email || "",
        }));
      } catch (error) {
        toast.error("Failed to load user profile");
      }
    }

    fetchUserProfile();
  }, []);

  // Handle changes to text input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle changes to Select component (Type and Service)
  const handleSelectChange = (name, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Validate start and end dates
  const validateDates = (startDate, endDate) => {
    if (startDate && endDate ) {
      setDateError("Start date must be before the end date");
      return false;
    }
    setDateError(null); // No error if valid
    return true;
  };

  // Handle changes to the date range picker
  const handleDateChange = (dates, dateStrings) => {
    const [startDate, endDate] = dateStrings;
    if (validateDates(startDate, endDate)) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        startDate,
        endDate,
      }));
    }
  };

  // Handle file upload changes
  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  // Preview image when file is clicked
  const handlePreview = (file) => {
    setPreviewImage(file.thumbUrl || file.url);
    setPreviewOpen(true);
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateDates(formData.startDate, formData.endDate)) {
      console.log("Form data submitted:", formData);
      // Handle form submission logic here
    } else {
      toast.error("Please ensure the start date is before the end date.");
    }
  };

  // Render the upload button for image upload
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="formcontainer">
      <img src={backgroundform} alt="Background" />
      <div className="formcontainer__Content">
        <StepsComponent current={1} />
        <div className="formcontainer__Content__form">
          <div className="formcontainer__Content__form__left">
            <div className="formcontainer__Content__form__left__first">
              <Form layout="vertical" onFinish={handleSubmit} size="large">
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="Full Name" required>
                      <Input
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Phone Number" required>
                      <Input
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
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
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Address" required>
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your address"
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>

            <div className="formcontainer__Content__form__left__second">
              <Form layout="vertical" onFinish={handleSubmit} size="large">
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="Koi Name" required>
                      <Input
                        name="koiName"
                        value={formData.koiName}
                        onChange={handleInputChange}
                        placeholder="Enter Koi name"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Type" required>
                      <Select
                        name="type"
                        value={formData.type}
                        onChange={(value) => handleSelectChange("type", value)}
                        placeholder="Select Koi type"
                      >
                        <Option value="Kohaku">Kohaku</Option>
                        <Option value="Sanke">Sanke</Option>
                        <Option value="Showa">Showa</Option>
                        <Option value="Shiro Utsuri">Shiro Utsuri</Option>
                        <Option value="Tancho">Tancho</Option>
                        <Option value="Asagi">Asagi</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="Size (in cm)" required>
                      <Input
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        placeholder="Enter size in cm"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Origin" required>
                      <Input
                        name="origin"
                        value={formData.origin}
                        onChange={handleInputChange}
                        placeholder="Enter origin"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="Start Date" required>
                      <DatePicker.RangePicker
                        onChange={handleDateChange}
                        placeholder={["Start date", "End date"]}
                      />
                      {dateError && <p style={{ color: "red" }}>{dateError}</p>}{" "}
                      <p style={{ fontSize: "12px", color: "#888" }}>
                        Note: The cost for consignment is 50,000 VND per day.
                      </p>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Service" required>
                      <Select
                        name="service"
                        value={
                          formData.service === "Online Consignment"
                            ? "OnlineConsignment"
                            : formData.service
                        }
                        onChange={(value) =>
                          handleSelectChange("service", value)
                        }
                        placeholder="Select Service"
                      >
                        <Option value="OnlineConsignment">
                          Online Consignment
                        </Option>
                        <Option value="Offline Consignment">
                          Offline Consignment
                        </Option>
                      </Select>
                      {/* Thêm chú thích về chi phí */}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>

          <div className="formcontainer__Content__form__right">
            <div className="formcontainer__Content__form__right__first">
              <Form layout="vertical" size="large">
                <Row>
                  <Col span={24}>
                    <Form.Item label="Description" required>
                      <TextArea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Enter description"
                        rows={5}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>

            <div className="formcontainer__Content__form__right__second">
              <Form layout="vertical" size="large">
                <Row>
                  <Col span={24}>
                    <Form.Item label="Upload Photo" required>
                      <Upload
                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleUploadChange}
                      >
                        {fileList.length >= 8 ? null : uploadButton}
                      </Upload>
                      {previewImage && (
                        <Image
                          preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) =>
                              setPreviewOpen(visible),
                            afterOpenChange: (visible) =>
                              !visible && setPreviewImage(""),
                          }}
                          src={previewImage}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>

        <Button
          type="primary"
          size="large"
          onClick={handleSubmit}
          className="formcontainer__Content__btn"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default ConsignmentForm;
