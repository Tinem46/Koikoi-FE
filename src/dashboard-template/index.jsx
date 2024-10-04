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
import { DeleteOutlined } from '@ant-design/icons';

function DashboardTemplate({ columns, apiURI, formItems, title, resetImage}) {
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
         const img =  await uploadFile(values.image.fileList[0].originFileObj);
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
            resetImage();
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



    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
        setFileList([]);
    };



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
                                    
                                >
                                    Edit
                                </Button>
                                <Popconfirm 
                                    title={`Are you sure you want to delete ${record.name}?`}
                                    onConfirm={() => handleDelete(record.id)}
                                >
                                    <Button type="primary" danger><DeleteOutlined /></Button>
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
                   {formItems}
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