import { useState } from 'react';
import {
    PieChartOutlined,
    LogoutOutlined, // Add this import
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/features/userSlice';

const { Header, Content, Footer, Sider } = Layout;

function getItem(
    label,
    key,
    icon,
    children,
) {
    return {
        key,
        icon,
        children,
        label: <Link to={`/dashboard/${key}`}>{label}</Link>,
    };
}

const items = [
    getItem('Category', 'category', <PieChartOutlined />),
    getItem('Voucher', 'voucher', <PieChartOutlined />),
    getItem('Fish', 'fish', <PieChartOutlined />),
];

const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleLogout() {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  }

    return (
        <Layout style={{ minHeight: '100vh' }} >
            <Header style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#000038' }}>
                <h1 style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>Dashboard</h1>
                <Button onClick={handleLogout} style={{ position: 'absolute', right: '20px' }}>
                    <LogoutOutlined style={{ fontSize: '18px', color: 'blue' }} /> 
                </Button>
            </Header>
            <Layout>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}  >
                    <div className="demo-logo-vertical" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
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
                        Ant Design ©{new Date().getFullYear()} Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Dashboard;