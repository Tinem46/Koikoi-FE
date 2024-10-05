import AuthLayout from '../../auth-layout'
import { Form, Input, Button, Spin, Modal } from 'antd' // Import Button
import api from '../../config/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useRef, useState,useEffect } from 'react'

function ForgotPassword() {
    const navigate = useNavigate()
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const inputRefs = useRef([]);
    const [email, setEmail] = useState("");
    const [timer, setTimer] = useState(70);
    const [loading, setLoading] = useState(false);
    const [loadingVerify, setLoadingVerify] = useState(false);

    const resetOtpState = () => {
        setOtp(Array(6).fill(""));
        setTimer(70);
    };

  

    const handleSubmit = async (values) => {
        const emailValue = values.email; // Access email directly from values
        setEmail(emailValue);
        setLoading(true);
    
        try {
          const response = await api.post(`account/verifyEmail/${emailValue}`);
          
          console.log(response.data); // Check the response data
          if (response.data.code === 1000) {
            setShowOtpModal(true); // Show OTP modal
            resetOtpState();
            // Assuming the OTP is returned in the response, you can set it here
            // setOtp(response.data.otp.split('')); // Uncomment if OTP is returned
          }
        } catch (error) {
          console.error(error);
          toast.error({
            type: 'error',
            content: error.response.data.message,
          });
        } finally {
          setLoading(false);
        }
      };

      const handleChange = (e, index) => {
        const { value } = e.target;
        if (/^[0-9]$/.test(value) || value === "") {
          const newOtp = [...otp];
          newOtp[index] = value;
          setOtp(newOtp);
    
          // Move to the next input if not empty
          if (value !== "" && index < otp.length - 1) {
            inputRefs.current[index + 1].focus();
          }
        }
      };

      const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
          inputRefs.current[index - 1].focus();
        }
      };
    
  

      const handleOtpSubmit = async (values) => {
     
        
        setLoadingVerify(true);
        
        try {
          const response = await api.post(`account/verifyOtp/${values.email}/${values.otp}`);
          if (response.data.code === 1000) {
            setShowOtpModal(false);
            navigate("/resetPassword", { 
              state: { verified: true, email: values.email } 
            });
          } else {
            toast.error("Invalid OTP");
          }
        } catch (error) {
          console.error(error);
          toast.error("Failed to verify OTP");
        } finally {
          setLoadingVerify(false);
        }
      };

    return (
        <div>
            <AuthLayout>
                <Form layout="vertical" onFinish={handleSubmit} className="login-form">
                    <Form.Item
                        name="email" // Add name attribute
                        rules={[{ required: true, message: "Please enter your email" }]} // Add validation
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                   
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block disabled={loading} >{loading ? <Spin size="small" /> : "CONTINUE"} Send OTP by Email</Button> 
                    </Form.Item>
   
                </Form>

                <Modal
                    title="Enter OTP"
                    visible={showOtpModal} // Ensure this is correctly set
                    onCancel={() => setShowOtpModal(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setShowOtpModal(false)}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={loadingVerify} onClick={handleOtpSubmit}>
                            Verify OTP
                        </Button>,
                    ]}
                >
                    {otp.map((_, index) => (
                        <Input
                            key={index}
                            value={otp[index]}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            maxLength={1}
                            ref={(el) => (inputRefs.current[index] = el)}
                            style={{ width: '3rem', marginRight: '0.5rem', textAlign: 'center' }}
                        />
                    ))}
                    <div>{timer} seconds remaining</div>
                </Modal>
            </AuthLayout>

        </div>
    )
}

export default ForgotPassword