import DashboardTemplate from '../../../dashboard-template'
import { Form, Input } from 'antd'

function ManageCategory() {

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
    ]

    const formItems = (
        <>
        <Form.Item name="name" label="Name">
            <Input/>
        </Form.Item>
        <Form.Item name="description" label="Description">
            <Input.TextArea/>
        </Form.Item>
        </>
    )

  return (
    <DashboardTemplate columns={columns} apiURI="category" formItems={formItems} title="Category" />
  )
}

export default ManageCategory