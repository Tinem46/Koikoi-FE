import { useState, useEffect } from 'react';
import { Button, Form, Input, message, Modal } from 'antd'; // Import Modal
import { useNavigate, useLocation } from 'react-router-dom';
import api from "../../config/api";
import AuthLayout from "../../auth-layout";

function ResetPassword() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state || {};
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility

  useEffect(() => {
    // Check if the user was verified
    if (!location.state?.verified) {
      navigate('/login/forgetPassword');
    } else {
      setIsModalVisible(true); // Show modal if verified
    }
  }, [location.state, navigate]);

  const handleResetPassword = async (values) => {
    setLoading(true);

    try {
      const response = await api.post(`account/changePassword/${email}`, { 
        password: values.password,
        repassword: values.repeatPassword
      });
      if (response.data.code === 1000) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      messageApi.open({
        type: 'error',
        content: error.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  return (
    <AuthLayout>
      {contextHolder}
      <Modal
        title="Email Verified"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalOk}
        footer={[
          <Button key="ok" type="primary" onClick={handleModalOk}>
            OK
          </Button>,
        ]}
      >
        <p>Your email has been successfully verified. You can now reset your password.</p>
      </Modal>
      <Form layout="vertical" onFinish={handleResetPassword} className="login-form" name="reset-password" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
        <Form.Item name="otp" rules={[{ required: true, message: "Please enter the OTP" }]}>
          <Input placeholder="OTP" />
        </Form.Item>
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