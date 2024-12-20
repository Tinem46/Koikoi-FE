import { useState } from "react";
import {
  PieChartOutlined,
  LogoutOutlined, // Add this import
} from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { Wallet as WalletIcon } from "@mui/icons-material";
import "./index.scss";
import LogoutIcon from '@mui/icons-material/Logout';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label: <Link to={`/dashboard/${key}`}>{label}</Link>,
  };
}

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();

    const role = localStorage.getItem("role");

    const items = role === "STAFF" ? [
        getItem('Feedback', 'feedback', <PieChartOutlined />), 
        getItem('Customer Account', 'customerAccount', <PieChartOutlined />),
        getItem('Fish', 'fish', <PieChartOutlined />),
        getItem('Order Management', 'orderManagement', <PieChartOutlined />),
        getItem('Consignment Management', 'consignmentManagement', <PieChartOutlined />),
        getItem('Fish Sell Management', 'fishSellManagement', <PieChartOutlined />),
        getItem('Cancel Management', 'cancelManagement', <PieChartOutlined />),

    ] : [

        getItem('Certificate', 'certificate', <PieChartOutlined />),
        getItem('Category', 'category', <PieChartOutlined />),
        getItem('Voucher', 'voucher', <PieChartOutlined />),
        getItem('Fish', 'fish', <PieChartOutlined />),
        getItem('Staff', 'staff', <PieChartOutlined />),
        getItem('Feedback', 'feedback', <PieChartOutlined />), 
        getItem('Order Management', 'orderManagement', <PieChartOutlined />),
        getItem('Revenue Management', 'revenueManagement', <PieChartOutlined />),
        getItem('Care Management', 'careManagement', <PieChartOutlined />),
        getItem('Cancel Management', 'cancelManagement', <PieChartOutlined />),
        getItem('Customer Account', 'customerAccount', <PieChartOutlined />),
        getItem('Fish Sell Management', 'fishSellManagement', <PieChartOutlined />),
        getItem('Shipping Management', 'shippingManagement', <PieChartOutlined />),
        
    ];

  function handleLogout() {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  }

    return (
        <Layout className="dashboard-layout" style={{ minHeight: '100vh' }} >
            <Header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000038' }}>
                <h1 style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>{role === "MANAGER" ? "Manager" : "Staff"}</h1>
                {role === "MANAGER" && (
                    <WalletIcon 
                        onClick={() => navigate('/dashboard/walletManager')} 
                        style={{ position: 'absolute', right: '35px', color: 'white', cursor: 'pointer', fontSize: '30px' }}
                    />
                )}
            </Header>
            <Layout>
                <Sider 
                    width={250}
                    collapsible 
                    collapsed={collapsed} 
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <div className="demo-logo-vertical" />
                    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
                        <Button 
                            onClick={handleLogout} 
                            style={{ 
                                margin: '200px auto',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <LogoutIcon style={{ fontSize: '18px', color: 'blue' }} /> 
                        </Button>
                    </div>
                </Sider>
                <Layout>
                    <Content style={{ margin: '0 16px'}}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Outlet />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Koi Store ©{new Date().getFullYear()} Created by Team number 1
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Dashboard;
