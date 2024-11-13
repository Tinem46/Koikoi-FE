/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import "./index.scss";
import backgroundform from "../../assets/image/backgroundform.png";
import { Col, Form, Input, Row, Select, Button, Upload, Image } from "antd";
import { useState, useEffect } from "react";
import TextArea from "antd/es/input/TextArea";
import { PlusOutlined } from "@ant-design/icons";
import StepsComponent from "../../components/steps";
import api from "../../config/api"; // Import API config
import uploadFile from "../../utils/upload";

const { Option } = Select;

function ConsignmentForm() {
  const location = useLocation();
  const { consignmentType } = location.state || {
    consignmentType: "Consignment Form",
  };
  
  const [formData, setFormData] = useState({
    
    type: "",
    size: "",
    origin: "",
    description: "",
    gender: "",
    price: "",
    age: "",
    quantity: "",
    image: "",
    status: "", 
    name: "", 
  });

  const [koiTypes, setKoiTypes] = useState([]);
  const [fileList, setFileList] = useState([]); // Đảm bảo chỉ khai báo một lần
  const [previewImage, setPreviewImage] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get(`KoiTypes`);
        setKoiTypes(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("Submitting form data:", formData);
    setLoading(true);
    try {
      if (fileList.length > 0) {
        const img = await uploadFile(fileList[0].originFileObj);
        formData.image = img;
      }

      if ( !formData.type || !formData.size || !formData.origin || 
          !formData.description || !formData.gender || !formData.price || 
          !formData.age || !formData.quantity || !formData.status || !formData.name){
        console.error("All required fields must be filled.");
        setLoading(false);
        return;
      }

      const selectedType = koiTypes.find(
        (type) => type.category === formData.type
      );
      const typeId = selectedType ? selectedType.id : null;

      await api.post(`Consignment/sell/${typeId}`, formData);
      console.log("Form submitted successfully:", formData);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setLoading(false);
    }
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <div className="formcontainer">
      <img src={backgroundform} alt="Background" />
      <div className="formcontainer__Content">
        <StepsComponent current={1} />
        <div className="formcontainer__Content__form">
          <div className="formcontainer__Content__form__left">
            <Form layout="vertical" size="large">
              <Row gutter={24}>
               
                <Col span={12}>
                  <Form.Item label="Type" required>
                    <Select
                      name="type"
                      value={formData.type}
                      onChange={(value) =>
                        setFormData({ ...formData, type: value })
                      }
                      placeholder="Select Koi type"
                    >
                      {koiTypes.map((type) => (
                        <Option key={type.id} value={type.category}>
                          {type.category}
                        </Option>
                      ))}
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
                      onChange={(e) =>
                        setFormData({ ...formData, size: e.target.value })
                      }
                      placeholder="Enter size in cm"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Origin" required>
                    <Select
                      name="origin"
                      value={formData.origin}
                      onChange={(value) =>
                        setFormData({ ...formData, origin: value })
                      }
                      placeholder="Select Origin"
                    >
                      <Select.Option value="Vietnam">Vietnam</Select.Option>
                      <Select.Option value="Laos">Laos</Select.Option>
                      {/* Add other options here */}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="Gender" required>
                    <Select
                      name="gender"
                      value={formData.gender}
                      onChange={(value) =>
                        setFormData({ ...formData, gender: value })
                      }
                      placeholder="Select Gender"
                    >
                      <Option value="Male">Male</Option>
                      <Option value="Female">Female</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Price" required>
                    <Input
                      name="price"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="Enter price"
                      type="number"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="Age" required>
                    <Input
                      name="age"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      placeholder="Enter age"
                      type="number"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Quantity" required>
                    <Input
                      name="quantity"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                      placeholder="Enter quantity"
                      type="number"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item label="Status" required>
                    <Input
                      name="status"
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value })
                      }
                      placeholder="Enter status"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Name" required>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter name"
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
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
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
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
                    <Form.Item
                      name="image"
                      label="Upload Image"
                      rules={[
                        { required: true, message: "Please upload an image!" },
                      ]}
                    >
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={handleChange}
                        beforeUpload={() => false}
                      >
                        {fileList.length >= 1 ? null : uploadButton}
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
          className="formcontainer__Content__btn"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default ConsignmentForm;
