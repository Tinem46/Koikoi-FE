import { Form, Input } from "antd";
import DashboardTemplate from "../../../dashboard-template";
import { useState} from "react";


function CreateStaffAccount() {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);

    const columns = [
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Phone Number",
            dataIndex: "phone_number",
            key: "phone_number",
        },
    ];

    const formItems = (
        <>
            <Form.Item name="username" label="Username">
                <Input/>
            </Form.Item>
            <Form.Item name="fullName" label="Fullname">
                <Input/>
            </Form.Item>
            <Form.Item name="password" label="Password">
                <Input/>
            </Form.Item>
            <Form.Item name="email" label="Email">
                <Input/>
            </Form.Item>
            <Form.Item name="phone_number" label="Phone Number">
                <Input/>
            </Form.Item>
        </>
    );

    // Thêm phương thức mới để lấy và hiển thị profile
    const getApiURI = (action) => {
        switch (action) {
            case 'post':
                return 'Staff/StaffAccount';
            case 'get':
                return 'Staff/Profile';
            case 'put':
                return 'Staff';
            default:
                return 'Staff/StaffAccount';
        }
    };

    return (
        <DashboardTemplate
            columns={columns}
            apiURI={getApiURI}
            formItems={formItems}
            title="Staff Account"
            resetImage={() => setFileList([])}
            form={form}
        />
    );
}

export default CreateStaffAccount;
