/* eslint-disable react/prop-types */
import "./index.scss"; // Add this import
import { Col, Row, Divider } from "antd"; // Add Divider to imports
import logo from '../assets/image/logo.png'

function AuthLayout({ children }) {
  return (
    <div className="auth-layout">
      <div className="video-container">
        <video
          className="background-video"
          src="https://motionbgs.com/media/29/kio-pond.960x540.mp4"
          autoPlay
          muted
          loop
          playsInline
        ></video>
      </div>
      <div className="content-overlay">
        <Row justify="center" align="middle" gutter={[48, 0]} style={{ height: "100vh" }}>
          <Col xs={24} sm={24} md={10} lg={8} style={{ display: 'flex', justifyContent: 'center' }}>
            <img src={logo} alt="logo" style={{ width: '60%', height: 'auto' }} />
          </Col>
          <Divider type="vertical" style={{ height: '350px', borderColor: 'grey', borderWidth: '1px', marginLeft: '-80px', marginTop: '60px' }} />
          <Col xs={24} sm={24} md={10} lg={8}>
            {children}
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default AuthLayout;
