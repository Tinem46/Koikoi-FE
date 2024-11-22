import { Form, Input, Upload, DatePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DashboardTemplate from '../../../dashboard-template';
import { useState } from 'react';
import dayjs from 'dayjs';

function Certificate() {
  const [fileList, setFileList] = useState([]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="certificate" style={{ width: 50 }} />,
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Breeder',
      dataIndex: 'breeder',
      key: 'breeder',
    },
    {
      title: 'Variety',
      dataIndex: 'variety',
      key: 'variety',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'date_Of_Birth',
      key: 'date_Of_Birth',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Date of Import',
      dataIndex: 'date_Of_Import',
      key: 'date_Of_Import',
      render: (date) => new Date(date).toLocaleDateString(),
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
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="size" label="Size" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="breeder" label="Breeder" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="variety" label="Variety" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item 
        name="date_Of_Birth" 
        label="Date of Birth" 
        rules={[{ required: true }]}
        getValueProps={(i) => ({
          value: i ? dayjs(i) : null
        })}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item 
        name="date_Of_Import" 
        label="Date of Import" 
        rules={[{ required: true }]}
        getValueProps={(i) => ({
          value: i ? dayjs(i) : null
        })}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item
        name="image"
        label="Certificate Image"
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
    <DashboardTemplate 
      columns={columns} 
      apiURI="Certificate" 
      formItems={formItems} 
      title="Certificate"
      resetImage={() => setFileList([])}
    />
  );
}

export default Certificate;