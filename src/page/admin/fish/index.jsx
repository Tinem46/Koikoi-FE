import { Form, Input, InputNumber,  Select,  Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import DashboardTemplate from '../../../dashboard-template';
import { useState, useEffect } from 'react';
import api from '../../../config/api'; 

function ManagementFish() {
    const [fileList, setFileList] = useState([]); 
    const [categories, setCategories] = useState([]); 

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('KoiTypes'); 
                setCategories(response.data);
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
                <Input/>
            </Form.Item>
            <Form.Item name="origin" label="Origin">
                <Input/>
            </Form.Item>
            <Form.Item name="quantity" label="Quantity">
                <InputNumber/>
            </Form.Item>
            <Form.Item 
              label="Category" 
              name="category"
              rules={[{ required: true, message: 'Please select a category!' }]}
            >
              <Select>
                {categories.map(category => (
                  <Select.Option key={category.category} value={category.category}>
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

    return (
        <DashboardTemplate columns={columns} apiURI="Koi" formItems={formItems} title="Fish"  resetImage={() => setFileList([])}  />
    )
}

export default ManagementFish