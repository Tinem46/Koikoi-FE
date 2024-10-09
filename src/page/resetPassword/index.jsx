import { useState, useEffect } from 'react';
import { Button, Form, Input } from 'antd'; // Import Modal
import { useNavigate, useLocation } from 'react-router-dom';
import api from "../../config/api";
import AuthLayout from "../../auth-layout";
import { alertFail, alertSuccess } from '../../assets/image/hook';

function ResetPassword() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    if (!location.state?.verified) {
      navigate('/login/forgetPassword');
    } else {
      alertSuccess("success OTP");
    }
  }, [location.state, navigate]);

  const handleResetPassword = async (values) => {
    setLoading(true);

    try {
      const response = await api.post(`account/changePassword/${email}`, { 
        password: values.password,
        repassword: values.repeatPassword
      });
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alertFail(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <AuthLayout>

      <Form layout="vertical" onFinish={handleResetPassword} className="login-form" name="reset-password" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
       
        <Form.Item name="password" rules={[{ required: true, message: "Please enter your new password" }]}>
          <Input.Password 
            placeholder="New Password" 
            visibilityToggle={{ 
              visible: passwordVisible, 
              onVisibleChange: setPasswordVisible 
            }}
          />
        </Form.Item>
        <Form.Item name="repeatPassword" rules={[
          { required: true, message: "Please confirm your new password" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords do not match'));
            },
          }),
        ]}>
          <Input.Password 
            placeholder="Confirm Password" 
            visibilityToggle={{ 
              visible: confirmPasswordVisible, 
              onVisibleChange: setConfirmPasswordVisible 
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
}
export default ResetPassword;