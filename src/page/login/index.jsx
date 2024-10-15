/* eslint-disable react/no-unescaped-entities */
import { Button, Form, Input, Spin } from 'antd'
import api from '../../config/api'
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../auth-layout';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/features/userSlice';
import {signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import './index.scss'; // Add this impor
import { useState } from 'react';


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Check for token in localStorage on component mount

  const handleLogin = async (values) => {
    setLoading(true); // Start loading
    try {
      const response = await api.post("account/login", values);
      const {token, role} = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if(role === "MANAGER"){
        
        navigate("/dashboard");
        // toast.success("Login success!");
        alertSuccess("Login success!");



      }
      else if(role === "STAFF"){
        navigate("/dashboard");
        alertSuccess("Login success!");
      }
      else{
        navigate("/");
        // toast.success("Login success!");
        alertSuccess("Login success!");
      }
     

      // Dispatch login action with user data
      dispatch(login(response.data));
    } catch (err) {
      setLoading(false);
      toast.error(err.response?.data || "Login failed");
    }   
  };

  const handleLoginGoogle = async () => {
    setLoading(true); // Start loading
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Đăng nhập thành công:", result.user);
      // Lưu thông tin người dùng vào state hoặc context nếu cần
      // Chuyển hướng người dùng sau khi đăng nhập thành công
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      // Hiển thị thông báo lỗi cho người dùng
      alert("Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false); // Stop loading
    }
  };


  return (
    <AuthLayout>
      <Form layout="vertical" onFinish={handleLogin} className="login-form">
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input placeholder="Enter your UserName" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block disabled={loading}>{loading ? <Spin size="small" /> : "Login"}</Button>
        </Form.Item>

        <div className="or-divider">or</div>

        <Form.Item>
          <Button className="google-login-btn" onClick={handleLoginGoogle} loading={loading} block>
            <img
              src="https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0"
              alt="google"
              width={20}
            />
            <span>Login with Google</span>
          </Button>
        </Form.Item>

        <Form.Item className="signup-link">
          You don't have account? <Link to="/register">Sign up</Link>
        </Form.Item>
              <Form.Item className="forgot-link">
        Forgot your password? <Link to="/forgot-password">Reset password</Link>
      </Form.Item>
      </Form>

    </AuthLayout>
  )
}

export default Login
