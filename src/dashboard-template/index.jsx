/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Image, Input, Modal, Popconfirm, Table, Upload } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "antd/es/form/Form";
import api from "../config/api";
import dayjs from "dayjs";
import PropTypes from 'prop-types';
import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import uploadFile from '../utils/upload'; // Import the uploadFile utility

function DashboardTemplate({ columns, apiURI, formItems, title }) {
    const [categories, setCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [form] = useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const fetchCategory = async () => {
        try {
            setLoading(true);
            const response = await api.get(apiURI);
            setCategories(response.data);
        } catch (err) {
            console.error("Error fetching categories:", err);
            toast.error(err.response?.data?.message || "An error occurred while fetching categories");
        } finally {
            setLoading(false);
        }
    };
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleSubmit = async (values) => {
        console.log(values)
        setLoading(true);
        try {
         const img =  await uploadFile(values.image[0].originFileObj);
            console.log(img)
            values.image = img
            if (values.id) {
                await api.put(`${apiURI}/${values.id}`, values);
            } else {
                await api.post(`${apiURI}`,values);
            }
            toast.success("Operation successful!");
            setOpen(false);
            fetchCategory();
        } catch (err) {
            toast.error(err.response?.data || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`${apiURI}/${id}`);
            toast.success("Delete successful");
            fetchCategory();
        } catch (err) {
            toast.error(err.response?.data || "An error occurred");
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);

    const handleEdit = (record) => {
        const newRecord = Object.entries(record).reduce((acc, [key, value]) => {
            acc[key] = dayjs(value).isValid() ? dayjs(value) : value;
            return acc;
        }, {});

        form.setFieldsValue(newRecord);
        if (record.image) {
            setFileList([
                {
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: record.image,
                },
            ]);
        } else {
            setFileList([]);
        }
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
        setFileList([]);
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <div>
            <Button onClick={() => {form.resetFields(); setOpen(true)}}>
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
                                >
                                    Edit
                                </Button>
                                <Popconfirm 
                                    title={`Are you sure you want to delete ${record.name}?`}
                                    onConfirm={() => handleDelete(record.id)}
                                >
                                    <Button type="primary" danger>Delete</Button>
                                </Popconfirm>
                            </React.Fragment>
                        )
                    }
                ]} 
                dataSource={categories} 
                loading={loading} 
            />
            <Modal 
                title={`Create/Edit ${title}`}
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
                    {React.Children.map(formItems, child => {
                        if (child.props.name === 'image') {
                            return (
                                <Form.Item
                                    label="Image"
                                    name="image"
                                    valuePropName="fileList"
                                    getValueFromEvent={(e) => {
                                        if (Array.isArray(e)) {
                                            return e;
                                        }
                                        return e && e.fileList;
                                    }}
                                    rules={[{ required: true, message: 'Please upload an image!' }]}
                                >
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        onPreview={handlePreview}
                                        onChange={handleChange}
                                        beforeUpload={() => false}
                                    >
                                        {fileList.length >= 1 ? null : uploadButton}
                                    </Upload>
                                </Form.Item>
                            );
                        }
                        return child;
                    })}
                </Form>
            </Modal>
            {previewImage && (
                <Image
                    wrapperStyle={{
                        display: "none",
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                />
            )}
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