import { Form, Input, InputNumber, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DashboardTemplate from '../../../dashboard-template';
import { useState, useEffect } from 'react';
import api from '../../../config/api'; 

function ManagementFish() {
    const [fileList, setFileList] = useState([]); 
    const [categories, setCategories] = useState([]); 
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // New state for selected category ID

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('KoiTypes'); 
                setCategories(response.data);
                if (response.data.length > 0) {
                    setSelectedCategoryId(response.data[0].id); // Set default category ID
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        };

        fetchCategories();
    }, []); 

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: 'description',
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
          render: (text) => `$${text}`, // Optionally format the price
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Size',
          dataIndex: 'size',
          key: 'size',
        },
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },
        {
          title: 'Origin',
          dataIndex: 'origin',
          key: 'origin',
        },
        {
          title: 'Quantity',
          dataIndex: 'quantity',
          key: 'quantity',
        },
        {
          title: 'Category',
          dataIndex: 'category',
          key: 'category',
        },

        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
          title: 'Image',
          dataIndex: 'image',
          key: 'image',
          render: (text) => <img src={text} alt="product" style={{ width: 50 }} />, // Render an image
        }
        
    ];

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const formItems = (
        <>
            <Form.Item name="name" label="Name">
                <Input/>
            </Form.Item>
            <Form.Item name="description" label="Description">
                <Input.TextArea/>
            </Form.Item>
            <Form.Item name="price" label="Price">
                <InputNumber/>
            </Form.Item>
            <Form.Item name="age" label="Age">
                <InputNumber/>
            </Form.Item>
            <Form.Item name="size" label="Size">
                <InputNumber/>
            </Form.Item>
            <Form.Item name="status" label="Status">
                <Select>
                    <Select.Option value="IN STOCK">IN STOCK</Select.Option>
                    <Select.Option value="SOLD OUT">SOLD OUT</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="origin" label="Origin">
                <Select>
                    <Select.Option value="Vietnam">Vietnam</Select.Option>
                    <Select.Option value="Laos">Laos</Select.Option>
                    <Select.Option value="Cambodia">Cambodia</Select.Option>
                    <Select.Option value="Thailand">Thailand</Select.Option>
                    <Select.Option value="Myanmar">Myanmar</Select.Option>
                    <Select.Option value="Malaysia">Malaysia</Select.Option>
                    <Select.Option value="Singapore">Singapore</Select.Option>
                    <Select.Option value="Indonesia">Indonesia</Select.Option>
                    <Select.Option value="Philippines">Philippines</Select.Option>
                    <Select.Option value="Brunei">Brunei</Select.Option>
                    <Select.Option value="Timor-Leste">Timor-Leste</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="quantity" label="Quantity">
                <InputNumber/>
            </Form.Item>
            <Form.Item 
              label="Category" 
              name="category"
              rules={[{ required: true, message: 'Please select a category!' }]}
            >
              <Select onChange={(value) => setSelectedCategoryId(value)}> {/* Update state on change */}
                {categories.map(category => (
                  <Select.Option key={category.id} value={category.id}> {/* Use category ID */}
                    {category.category}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="gender" label="Gender">
                <Select>
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                name="image"
                label="Image"
                rules={[{ required: true, message: 'Please upload an image!' }]}
            >
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={handleChange}
                    beforeUpload={() => false}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
            </Form.Item>
        </>
    );

    const getApiURI = (action) => {
        if (action === 'post') {
            return selectedCategoryId ? `Koi/${selectedCategoryId}` : 'Koi';
        }
        return 'Koi'; 
    };

    return (
        <DashboardTemplate 
            columns={columns} 
            apiURI={getApiURI} // Pass the function instead of a string
            formItems={formItems} 
            title="Fish" 
            resetImage={() => setFileList([])} 
        />
    )
}

export default ManagementFish
