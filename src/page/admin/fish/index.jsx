import { Form, Input, InputNumber, Select, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DashboardTemplate from '../../../dashboard-template';
import { useState, useEffect } from 'react';
import api from '../../../config/api'; 
import { useForm } from 'antd/es/form/Form';

function ManagementFish() {
    const [fileList, setFileList] = useState([]); 
    const [categories, setCategories] = useState([]); 
    const [certificates, setCertificates] = useState([]); 
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); 
    const [selectedCertificateId, setSelectedCertificateId] = useState(null); 
    const [editingRecord, setEditingRecord] = useState(null);
    const [form] = useForm();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [categoriesResponse, certificatesResponse] = await Promise.all([
                    api.get('KoiTypes'),
                    api.get('Certificate')
                ]);
                
                setCategories(categoriesResponse.data);
                setCertificates(certificatesResponse.data);
                
                if (categoriesResponse.data.length > 0) {
                    setSelectedCategoryId(categoriesResponse.data[0].id);
                }
                if (certificatesResponse.data.length > 0) {
                    setSelectedCertificateId(certificatesResponse.data[0].id);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, []); 

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
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
          render: (text) => `${text.toLocaleString('vi-VN')}đ`, 
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
          render: (text) => <img src={text} alt="product" style={{ width: 50 }} />,
        },
        {
            title: 'Certificate Image',
            dataIndex: ['identificationCertificate', 'image'],
            key: 'certificateImage',
            render: (text) => <img src={text} alt="certificate" style={{ width: 50 }} />,
        },
        {
            title: 'Certificate Name',
            dataIndex: ['identificationCertificate', 'name'],
            key: 'certificateName',
        },
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
            <Form.Item 
                name="name" 
                label="Name"
                rules={[{ required: true, message: 'Please input the name!' }]}
            >
                <Input/>
            </Form.Item>
            <Form.Item 
                name="description" 
                label="Description"
                rules={[{ required: true, message: 'Please input the description!' }]}
            >
                <Input.TextArea/>
            </Form.Item>
            <Form.Item 
                name="price" 
                label="Price"
                rules={[
                    { required: true, message: 'Please input the price!' },
                    { type: 'number', min: 0, message: 'Price must be greater than or equal to 0!' }
                ]}
            >
                <InputNumber
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\D/g, '')}
                    addonAfter="đ"
                />
            </Form.Item>
            <Form.Item 
                name="age" 
                label="Age"
                rules={[
                    { required: true, message: 'Please input the age!' },
                    { type: 'number', min: 0, message: 'Age must be greater than or equal to 0!' }
                ]}
            >
                <InputNumber addonAfter="months"/>
            </Form.Item>
            <Form.Item 
                name="size" 
                label="Size"
                rules={[
                    { required: true, message: 'Please input the size!' },
                    { type: 'number', min: 0, message: 'Size must be greater than or equal to 0!' }
                ]}
            >
                <InputNumber addonAfter="cm"/>
            </Form.Item>
            <Form.Item 
                name="status" 
                label="Status"
                rules={[{ required: true, message: 'Please select the status!' }]}
            >
                <Select>
                    <Select.Option value="IN STOCK">IN STOCK</Select.Option>
                    <Select.Option value="SOLD OUT">SOLD OUT</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item 
                name="origin" 
                label="Origin"
                rules={[{ required: true, message: 'Please select the origin!' }]}
            >
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
            <Form.Item 
              label="Category" 
              name="category"
              rules={[{ required: true, message: 'Please select a category!' }]}
            >
              <Select onChange={(value) => setSelectedCategoryId(value)}> 
                {categories.map(category => (
                  <Select.Option key={category.id} value={category.id}> 
                    {category.category}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item 
                name="gender" 
                label="Gender"
                rules={[{ required: true, message: 'Please select the gender!' }]}
            >
                <Select>
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item 
              label="Certificate" 
              name="certificateId"
              rules={[{ required: true, message: 'Please select a certificate!' }]}
            >
              <Select onChange={(value) => setSelectedCertificateId(value)}> 
                {certificates.map(cert => (
                  <Select.Option key={cert.id} value={cert.id}> 
                    {cert.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <div style={{ display: 'flex', gap: '20px' }}>
                <Form.Item
                    name="image"
                    label="Koi Image"
                    rules={[{ required: true, message: 'Please upload an image!' }]}
                    style={{ flex: 1 }}
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
               
            </div>
        </>
    );

    const prepareFormForEdit = (record) => {
       
        
        if (record.image) {
            setFileList([{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: record.image,
            }]);
        }
    };

    const getApiURI = (action) => {
        let postUri = 'Koi';
        if (action === 'post') {
            if (selectedCategoryId) {
                postUri += `/${selectedCategoryId}`;
            }
            if (selectedCertificateId) {
                postUri += `/${selectedCertificateId}`;
            }
        } else if (action === 'put') {
            postUri = `Koi/${editingRecord?.id}`;
        }
        return postUri;
    };

    return (
        <DashboardTemplate 
            columns={columns} 
            apiURI={getApiURI} 
            formItems={formItems} 
            title="Fish"    
            onEdit={prepareFormForEdit}
            resetImage={() => setFileList([])}
        />
    )
}

export default ManagementFish

