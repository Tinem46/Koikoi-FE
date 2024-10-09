import AuthLayout from '../../auth-layout'
import { Form, Input, Button, Spin, Modal } from 'antd' // Import Button
import api from '../../config/api'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'

function ForgotPassword() {
    const navigate = useNavigate()
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const inputRefs = useRef([]);
    const [isemail, setEmail] = useState("");
    const [timer, setTimer] = useState(10);
    const [loading, setLoading] = useState(false);
    const [loadingVerify, setLoadingVerify] = useState(false);

    useEffect(() => {
        if (showOtpModal) { // Start the timer only when the OTP modal is shown
            const interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer > 0) {
                        return prevTimer - 1;
                    } else {
                        clearInterval(interval);
                        setShowOtpModal(false);
                        return 0;
                    }
                });
            }, 1000);

            return () => clearInterval(interval); // Cleanup interval on component unmount or when modal closes
        }
    }, [showOtpModal]); // Dependency array includes showOtpModal

    const resetOtpState = () => {
        setOtp(Array(6).fill(""));
        setTimer(70);
    };

    const handleSubmit = async (values) => { 
        const emailValue = values.email; 
        setEmail(emailValue); 
        setLoading(true);
    
        try {
          //const response = await api.post(`account/verifyEmail/${emailValue}`, isemail);
          const response = await api.post(`account/verifyEmail/${emailValue}`); // Send email in the request body
          
          console.log(response.data); 
          setShowOtpModal(true);
          resetOtpState();

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
    
      const handleOtpSubmit = async () => {
        console.log(otp)
        console.log(Number(otp.join('')))
        console.log(isemail)
        setLoadingVerify(true);
        
        try {
          const response = await api.post(`account/verifyOtp/${Number(otp.join(''))}/${isemail }`);
          navigate("/resetPassword", { 
            state: { verified: true, email: isemail.email } 
          }); 
          console.log(response)
          }  
            
        
         catch (error) {
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
                        name="email" 
                        rules={[{ required: true, message: "Please enter your email" }]} // Add validation
                    >
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                        <Button type="primary" htmlType="submit" block disabled={loading} >{loading ? <Spin size="small" /> : "CONTINUE"} Send OTP by Email</Button> 
                </Form>

                <Modal
                    title="Enter OTP"
                    open={showOtpModal} // Ensure this is correctly set
                    onCancel={() => setShowOtpModal(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setShowOtpModal(false)}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" loading={loadingVerify} onClick={handleOtpSubmit}  >  
                            Verify OTP
                        </Button>,
                    ]}
                >
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}> 
                        {otp.map((_, index) => (
                            <Input
                                key={index}
                                value={otp[index]}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                maxLength={1} // Ensure only one character is allowed
                                ref={(el) => (inputRefs.current[index] = el)}
                                style={{
                                    width: '3rem',
                                    height: '3rem',
                                    marginRight: '0.5rem',
                                    textAlign: 'center',
                                    fontSize: '1.5rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #d9d9d9',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        ))}

                    </div>
                    <div style={{ textAlign: 'center', fontSize: '1rem', color: '#888' }}>
                        <span style={{ color: '#000' }}>{timer} seconds remaining</span> 
                    </div>
                </Modal>
            </AuthLayout>

        </div>
    )
}

export default ForgotPassword
