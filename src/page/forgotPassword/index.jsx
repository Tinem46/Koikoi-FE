import { useDispatch } from 'react-redux'
import AuthLayout from '../../auth-layout'
import { Form, Input, Button } from 'antd' // Import Button
import { verifyEmail } from '../../redux/features/userSlice'
import api from '../../config/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleForgotPassword = async(values) => {
        try {
            const response = await api.post(`account/verifyEmail/${values.email}`) // Update endpoint and payload
            dispatch(verifyEmail(response.data))
            toast.success("Password reset link sent successfully")
            navigate("/reset-password")
            console.log(response.data)
        } catch (error) {
            toast.error(error.response?.data || "Forgot password failed")
        }
    }

    return (
        <div>
            <AuthLayout>
                <Form layout="vertical" onFinish={handleForgotPassword} className="login-form">
                    <Form.Item
                        name="email" // Add name attribute
                        rules={[{ required: true, message: "Please enter your email" }]} // Add validation
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                   
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block>Send OTP by Email</Button> 
                    </Form.Item>
  
                </Form>
            </AuthLayout>

        </div>
    )
}

export default ForgotPassword