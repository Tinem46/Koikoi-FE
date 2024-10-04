import { Button, Form, Input } from "antd"
import { toast } from "react-toastify"
import { forgotPassword } from "../../redux/features/userSlice"
import { useDispatch } from "react-redux"
import api from "../../config/api"
import AuthLayout from "../../auth-layout"

function ResetPassword() {
  const dispatch = useDispatch()

  const handleResetPassword = async (values) => {
    try {
      const { otp, password, repeatPassword } = values
      console.log("OTP:", otp); // Debugging line to check OTP value
      if (password !== repeatPassword) {
        toast.error("Passwords do not match")
        return
      }
      // Ensure OTP is sent as an integer
      const parsedOtp = parseInt(otp, 10);
      console.log("Parsed OTP:", parsedOtp); // Debugging line to check parsed OTP value
      const response = await api.post(`account/ForgotPassword`, { otp: parsedOtp, password })
      dispatch(forgotPassword(response.data))
      toast.success("Password reset successfully")
      console.log(response.data)
    } catch (error) {
      toast.error(error.response?.data || "Reset password failed")
    }
  }

  return (
    <AuthLayout>
      <Form layout="vertical" onFinish={handleResetPassword} className="login-form" name="reset-password" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item name="otp" rules={[{ required: true, message: "Please enter the OTP" }]}>
          <Input placeholder="OTP" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "Please enter your new password" }]}>
          <Input.Password placeholder="New Password" />
        </Form.Item>
        <Form.Item name="repeatPassword" rules={[{ required: true, message: "Please confirm your new password" }]}>
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  )
}

export default ResetPassword