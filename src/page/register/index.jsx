import {Button, Form, Input} from 'antd'
import AuthLayout from '../../auth-layout'
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom'; // Add Link to the import
import api from '../../config/api';
import { Row, Col } from 'antd'; // Make sure this import is present

function Register() {
    const navigate = useNavigate();
    const handleRegister = async (values) => {
        try {
            await api.post("account/register", values);
            toast.success("Register successful");
            navigate("/login");
        } catch (err) {
            if (err instanceof Error) {
                toast.error(err.message);
            } else if (typeof err === 'object' && err !== null && 'response' in err) {
                const axiosError = err;
                toast.error(axiosError.response?.data || "Register failed");
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    }
  return (
    <AuthLayout>
        <div className="login-form">
            <Form
                layout="vertical"
                name="userForm"
                onFinish={handleRegister}
                className="register-form"
                initialValues={{
                    role: "ADMIN"
                }}
            >
                <Row gutter={[64, 16]}> {/* Increased gutter for more space between columns */}
                    <Col xs={24} md={12}>
                        {/* Left column form items */}
                        <Form.Item
                            name="fullname"
                            label="Full Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Full Name!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your Full Name" />
                        </Form.Item>

                        <Form.Item
                            name="username"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your Username" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },
                                {
                                    type: 'email',
                                    message: 'Invalid email format!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your Email" />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                        {/* Right column form items */}
                        <Form.Item
                            name="phone_number"
                            label="Phone Number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Phone number!',
                                },
                                {
                                    pattern: /^(\+84|0)([1-9]{1}[0-9]{8})$/,
                                    message:
                                        'Invalid phone number format! Please use +84 or 0 prefix followed by 9 digits!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your Phone Number" />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                                {
                                    min: 6,
                                    message: 'Password must be at least 6 characters long!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password placeholder="Enter your Password" />
                        </Form.Item>

                        <Form.Item
                            name="confirm_password"
                            label="Confirm Password"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please confirm your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Passwords do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password placeholder="Confirm your Password" />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>Register</Button>
                </Form.Item>
                <div className="login-link">
                    Already have an account? <Link to="/login">Log in</Link>
                </div>
            </Form>
        </div>
    </AuthLayout>
  )
}

export default Register
