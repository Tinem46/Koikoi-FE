import { DatePicker, Form, Input } from 'antd'
import dayjs from 'dayjs'

import DashboardTemplate  from '../../../dashboard-template'



function ManageVoucher() {
 
   

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
            title: "Start At",
            dataIndex: "startAt",
            key: "startAt",
            render: (value) => dayjs(value).format("DD/MM/YYYY HH:mm"),
        },
        {
            title: "End At",
            dataIndex: "endAt",
            key: "endAt",
            render: (value) => dayjs(value).format("DD/MM/YYYY HH:mm" ),
        },
        {
            title: "Create At",
            dataIndex: "createAt",
            key: "createAt",
            render: (value) => dayjs(value).format("DD/MM/YYYY HH:mm" ),
        },
        {
            title: "Value",
            dataIndex: "value",
            key: "value",
        },
    ]

    const formIterms = <>
    <Form.Item name="code" label="Code">
        <Input/>
    </Form.Item>
    <Form.Item name="startAt" label="Start At">
        <DatePicker showTime/>
    </Form.Item>
    <Form.Item name="endAt" label="End At">
        <DatePicker showTime/>
    </Form.Item>
    <Form.Item name="value" label="Value">
        <Input type='number'/>
    </Form.Item>
    <Form.Item name="description" label="Description">
        <Input.TextArea/>
    </Form.Item>
    </>
  return (
    <DashboardTemplate columns={columns} apiURI="voucher" formItems={formIterms} title="Voucher" resetImage={[]} />
  )
}

export default ManageVoucher