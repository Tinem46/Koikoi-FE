import { DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs'

import DashboardTemplate  from '../../../dashboard-template'
import { useState } from 'react';



function ManageVoucher() {
    const[fileList, setFileList] = useState([]);
    const columns= [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Discount Amount",
            dataIndex: "discount_amount",
            key: "discount_amount",
        },
        {
            title: "Start Date",
            dataIndex: "start_date",
            key: "start_date",
            render: (value) => dayjs(value).format("DD/MM/YYYY HH:mm"),
        },
        {
            title: "End Date",
            dataIndex: "end_date",
            key: "end_date",
            render: (value) => dayjs(value).format("DD/MM/YYYY HH:mm"),
        },
        {
            title: "Is Active",
            dataIndex: "is_active",
            key: "is_active",
            render: (value) => (value ? "Yes" : "No"),
        },
        
    ]

    const formIterms = <>
    <Form.Item name="code" label="Code">
        <Input/>
    </Form.Item>
    <Form.Item name="description" label="Description">
        <Input.TextArea/>
    </Form.Item>
    <Form.Item name="discount_amount" label="Discount Amount">
        <Input type='number'/>
    </Form.Item>
    <Form.Item 
        name="start_date" 
        label="Start Date"
        getValueProps={(i) => ({ value: i ? dayjs(i) : null })}
    >
        <DatePicker showTime/>
    </Form.Item>
    <Form.Item 
        name="end_date" 
        label="End Date"
        getValueProps={(i) => ({ value: i ? dayjs(i) : null })}
    >
        <DatePicker showTime/>
    </Form.Item>
    <Form.Item name="is_active" label="Is Active" valuePropName="checked">
        <Input type="checkbox" />
    </Form.Item>
    </>
  return (
    <DashboardTemplate columns={columns} apiURI="voucher" formItems={formIterms} title="Voucher"   resetImage={() => setFileList([])}  />
    
  )
}

export default ManageVoucher
