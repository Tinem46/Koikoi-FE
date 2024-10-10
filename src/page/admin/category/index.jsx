import { useState } from 'react'
import DashboardTemplate from '../../../dashboard-template'
import { Form, Input } from 'antd'

function ManageCategory() {
const [fileList, setFileList] = useState([])
    const columns = [
     
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        }
    ]

    const formItems = (
        <>
        <Form.Item name="category" label="Category">
            <Input/>
        </Form.Item>
        </>
    )

  

  return (
    <DashboardTemplate columns={columns} apiURI="KoiTypes" formItems={formItems} title="Category" resetImage={() => setFileList([])}/>
    
  )
}

export default ManageCategory