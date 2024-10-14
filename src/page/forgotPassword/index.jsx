import AuthLayout from '../../auth-layout';
import { Form, Input, Button, Spin } from 'antd';
import api from '../../config/api';
import { toast } from 'react-toastify';
import { useState } from 'react';

function ForgotPassword() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    const { email } = values;
    try {
      const response = await api.post(`forgot-password`, { email });
      const token = response.data.token;
      localStorage.setItem('resetToken', token);
      console.log(response.data);
      toast.success('Email sent successfully. Please check your inbox.');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Error sending email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AuthLayout>
        <Form layout="vertical" onFinish={handleSubmit} className="login-form">
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={loading}
          >
            {loading ? <Spin size="small" /> : 'Send by Email'}
          </Button>
        </Form>
      </AuthLayout>
    </div>
  );
}

export default ForgotPassword;
