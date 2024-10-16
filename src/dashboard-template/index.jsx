/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, Modal, Popconfirm, Table} from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import api from "../config/api";
import PropTypes from 'prop-types';
import React from 'react';

import uploadFile from '../utils/upload'; // Import the uploadFile utility
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'; // Import the EditOutlined icon

function DashboardTemplate({ columns, apiURI, formItems, title, resetImage  }) {
    const [dashboard, setDashboard] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [editingRecord, setEditingRecord] = useState(null); // New state for editing record

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            const response = await api.get(apiURI);
            setDashboard(response.data);
        } catch (err) {
            console.error("Error fetching dashboard:", err);
            toast.error(err.response?.data?.message || "An error occurred while fetching dashboard");
        } finally {
            setLoading(false);
        }
    };
 
    const handleSubmit = async (values) => {
        console.log(values);
        setLoading(true);
        try {
            if (values.image) {
                const img = await uploadFile(values.image.fileList[0].originFileObj);
                console.log(img);
                values.image = img;
            }
            if (editingRecord) {
                await api.put(`${apiURI}/${values.id}`, values);
            } else {
                const response = await api.post(`${apiURI}`, values);
                setDashboard((prevDashboard) => [...prevDashboard, response.data]); 
            }
            toast.success("Operation successful!");
            setOpen(false);
            setEditingRecord(null);
        } catch (err) {
            toast.error(err.response?.data || "An error occurred");
        } finally {
            setLoading(false);
            resetImage();
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`${apiURI}/${id}`);
            toast.success("Delete successful");
                fetchDashboard();
        } catch (err) {
            toast.error(err.response?.data || "An error occurred");
        }
    };

    const handleEdit = (record) => {
        setEditingRecord(record); 
        form.setFieldsValue(record); 
        setOpen(true); 
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
        setFileList([]);
        setEditingRecord(null); 
    };

    return (
        <div>
            <Button onClick={() => { form.resetFields(); setOpen(true); setEditingRecord(null); }}>
                Create new {title.toLowerCase()}
            </Button>
            <Table 
                columns={[
                    ...columns,
                    {
                        title: "Action",
                        key: "action",
                        render: (_, record) => (
                            <React.Fragment key={record.id}>
                                <Button 
                                    type="primary" 
                                    onClick={() => handleEdit(record)} 
                                    // Inline styles for Edit button
                                >
                                    <EditOutlined /> {/* Use the EditOutlined icon */}
                                </Button>
                                <Popconfirm 
                                    title={`Are you sure you want to delete ${record.name}?`}
                                    onConfirm={() => handleDelete(record.id)}
                                >
                                    <Button 
                                        type="primary" 
                                        danger 
                                        style={{ backgroundColor: '#f44336', borderColor: '#f44336',marginLeft:'10px' }} // Inline styles for Delete button
                                    >
                                        <DeleteOutlined />
                                    </Button>
                                </Popconfirm>
                            </React.Fragment>
                        )
                    }
                ]} 
                dataSource={dashboard} 
                loading={loading} 
            />
            <Modal 
                title={`${editingRecord ? 'Edit' : 'Create'} ${title}`} // Change title based on mode
                open={open}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" type="dashed" onClick={handleCancel}>Cancel</Button>,
                    <Button key="submit" type="primary" onClick={() => form.submit()} loading={loading}>
                        Save
                    </Button>
                ]}
            >
                <Form 
                    labelCol={{
                        span: 24,
                    }}
                    onFinish={handleSubmit}
                    form={form}
                >
                    <Form.Item name="id" label="id" hidden>
                        <Input/>
                    </Form.Item>
                   {formItems}
                </Form>
            </Modal>
    
        </div>
    );
}

DashboardTemplate.propTypes = {
    columns: PropTypes.array.isRequired,
    apiURI: PropTypes.string.isRequired,
    formItems: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
};

export default DashboardTemplate;
