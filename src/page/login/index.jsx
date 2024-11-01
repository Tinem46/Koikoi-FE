/* eslint-disable react/no-unescaped-entities */
import { Button, Form, Input, Spin } from 'antd'
import api from '../../config/api'
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../auth-layout';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/features/userSlice';
import './index.scss'; // Add this import
import { alertSuccess } from '../../assets/image/hook';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react';
import { googleProvider } from '../../config/firebase';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Check for token in localStorage on component mount

  const handleLogin = async (values) => {
    setLoading(true); 
    try {
      console.log('Login values:', values); // Log values for debugging

      const response = await api.post("account/login", values);

      console.log('Login response:', response); // Log response for debugging

      if (response.data && response.data.token) {
        const { token, role } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);

        // Navigate and show success message based on role
        if (role === "MANAGER" || role === "STAFF") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }

        alertSuccess("Login success!");
        dispatch(login(response.data));
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setLoading(false);
      console.error('Login error:', err); // Log error for debugging
      toast.error(err.response?.data || "Login failed. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };
const handleLoginGoogle = () =>{
  setLoading(true);
  const auth = getAuth();
  signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token);
      const user = result.user;
      console.log(user);
      console.log(user.accessToken);

      const response = await api.post("account/loginGoogle", {
        token: user.accessToken
      });
      localStorage.setItem("token", token);
      console.log(response.data);

      // Dispatch login action with user data
      dispatch(login({
        id: user.uid,
        username: user.displayName,
        token: user.accessToken
      }));
      
      navigate("/");
      alertSuccess("Login success!");
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
}
  

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
          <Button type="primary" htmlType="submit" block disabled={loading}>
            {loading ? <Spin size="small" /> : "Login"}
          </Button>
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
          You don't have an account? <Link to="/register">Sign up</Link>
        </Form.Item>

        <Form.Item className="forgot-link">
          Forgot your password? <Link to="/forgot-password">Reset password</Link>
        </Form.Item>
      </Form>
    </AuthLayout>
  );
}

export default Login;
