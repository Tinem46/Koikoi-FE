/* eslint-disable react/no-unescaped-entities */
import { Button, Form, Input } from 'antd'
import api from '../../config/api'
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../auth-layout';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/features/userSlice';
import {signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import './index.scss'; // Add this import

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async (values) => {
    try {
      const response = await api.post("account/login", values);
      const { token, ...userData } = response.data.token;
      
      localStorage.setItem("token", token);
      toast.success("Login success!");
      navigate(`/`);

      // Dispatch login action with user data
      dispatch(login(userData));
    } catch (err) {
      toast.error(err.response.data);
    }





    // try {
    //   const reponse = await api.post("account/login", values);

    //   const { token } = reponse.data;
    //   console.log(reponse.data)
      
    //   localStorage.setItem("token", reponse.data.username);
    //   console.log(token)
    //   // chạy xuống đây => account này có tồn tại
    //   toast.success("Login success!");
    //   // chuyển đến trang chủ
    //   navigate(`/`);

    //   // lưu trữ thông tin của user
    //   // dispatch action
    //   dispatch(login(reponse.data));
    // } catch (err) {
    //   toast.error(err.response.data);
    }

  

  const handleLoginGoogle = async () => {
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
          <Button type="primary" htmlType="submit" block>Login</Button>
        </Form.Item>

        <div className="or-divider">or</div>

        <Form.Item>
          <Button className="google-login-btn" onClick={handleLoginGoogle} block>
            <img
              src="https://th.bing.com/th/id/R.0fa3fe04edf6c0202970f2088edea9e7?rik=joOK76LOMJlBPw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fgoogle-logo-png-open-2000.png&ehk=0PJJlqaIxYmJ9eOIp9mYVPA4KwkGo5Zob552JPltDMw%3d&risl=&pid=ImgRaw&r=0"
              alt="google"
              width={20}
            />
            <span>Login with Google</span>
          </Button>
        </Form.Item>

        <div className="signup-link">
          You don't have account? <Link to="/register">Sign up</Link>
        </div>
      </Form>
    </AuthLayout>
  )
}


export default Login
