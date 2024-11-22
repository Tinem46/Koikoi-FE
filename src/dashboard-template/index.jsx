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

function DashboardTemplate({ columns, apiURI, formItems, title, customActions, disableCreate, showEditDelete, hideEdit, resetImage, onEdit }) {
    const [dashboard, setDashboard] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [editingRecord, setEditingRecord] = useState(null); // New state for editing record
    const [actionLoading, setActionLoading] = useState({});

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            const uri = typeof apiURI === 'function' ? apiURI('get') : apiURI;
            const response = await api.get(uri);
            setDashboard(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Error fetching dashboard:", err);
            toast.error(err.response?.data?.message || "An error occurred while fetching dashboard");
            setDashboard([]);
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
            const uri = typeof apiURI === 'function' ? apiURI(editingRecord ? 'put' : 'post') : apiURI;
            if (editingRecord) {
                await api.put(`${uri}/${values.id}`, values);
            } else {
                const response = await api.post(`${uri}`, values);
                setDashboard((prevDashboard) => [...prevDashboard, response.data]); 
                resetImage && resetImage();
            }
            setOpen(false);
            setEditingRecord(null);
            fetchDashboard(); 
        } catch (err) {
            toast.error(err.response?.data || "An error occurred");
        } finally {
            setLoading(false);
            resetImage();
        }
    };

    const handleDelete = async (id) => {
        try {
            const uri = typeof apiURI === 'function' ? apiURI('delete') : apiURI;
            await api.delete(`${uri}/${id}`);
            toast.success("Delete successful");
            fetchDashboard();
        } catch (err) {
            toast.error(err.response?.data || "An error occurred");
        }
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
        onEdit(record);
        form.setFieldsValue(record);
        setOpen(true);
    };

    const handleCustomAction = async (actionConfig, recordId) => {
        setActionLoading(prev => ({ ...prev, [`${actionConfig.label}-${recordId}`]: true }));
        try {
            await actionConfig.action(recordId);
            const uri = typeof apiURI === 'function' ? apiURI('get') : apiURI;
            const response = await api.get(uri);
            setDashboard(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            toast.error(actionConfig.errorMessage || err.response?.data || 'An error occurred');
        } finally {
            setActionLoading(prev => ({ ...prev, [`${actionConfig.label}-${recordId}`]: false }));
        }
    };

    const getColumns = () => [
        ...columns,
        ...(showEditDelete || (customActions && customActions.length > 0) ? [{
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <React.Fragment>
                    {customActions && customActions.map((action, index) => (
                        action.condition(record) && (
                            <Button
                                key={index}
                                onClick={() => handleCustomAction(action, record.id)}
                                loading={actionLoading[`${action.label}-${record.id}`]}
                                style={{ marginRight: '8px' }}
                            >
                                {action.label}
                            </Button>
                        )
                    ))}
                    {showEditDelete && (
                        <>
                            {!hideEdit && (
                                <Button 
                                    type="primary" 
                                    onClick={() => handleEdit(record)} 
                                    style={{ marginRight: '8px' }}
                                >
                                    <EditOutlined />
                                </Button>
                            )}
                            <Popconfirm 
                                title={`Are you sure you want to delete ${record.name}?`}
                                onConfirm={() => handleDelete(record.id)}
                            >
                                <Button 
                                    type="primary" 
                                    danger 
                                    style={{ backgroundColor: '#f44336', borderColor: '#f44336' }}
                                >
                                    <DeleteOutlined />
                                </Button>
                            </Popconfirm>
                        </>
                    )}
                </React.Fragment>
            )
        }] : [])
    ];

    useEffect(() => {
        fetchDashboard();
    }, []);

    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
        if (!editingRecord) {
            setFileList([]);
        }
        setEditingRecord(null); 
    };

    return (
        <div>
            {!disableCreate && (
                <Button onClick={() => { form.resetFields(); setOpen(true); setEditingRecord(null); setFileList([]); }}>
                    Create new {title.toLowerCase()}
                </Button>
            )}
            <Table 
                columns={getColumns()} 
                dataSource={dashboard} 
                loading={loading} 
                rowKey={(record) => record.id || Math.random()}
            />
            <Modal 
                title={`${editingRecord ? 'Edit' : 'Create'} ${title}`}
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
    customActions: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        condition: PropTypes.func.isRequired,
        action: PropTypes.func.isRequired,
    })),
    disableCreate: PropTypes.bool,
    combineActions: PropTypes.bool,
    showEditDelete: PropTypes.bool,
    hideEdit: PropTypes.bool,
    onEdit: PropTypes.func,
};

DashboardTemplate.defaultProps = {
    showEditDelete: true,
    hideEdit: false,
};

export default DashboardTemplate;
