import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../config/api';
import './index.scss';
import NavBar from '../../components/navigation2';
import { Spin, Table, Input, Form, Button } from 'antd';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("No token found. Please log in.");
                navigate('/login');
                return; 
            }
            const response = await api.get(`account/Profile`);
            
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user profile:", error);
            toast.error("Failed to load user profile. Please try again.");
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedUser({ ...user });
    };

    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await api.put(`account/${user.id}`, {
                token: localStorage.getItem('token'),
                ...editedUser,
                id: user.id,
                username: user.username
            });
            setUser(response.data);
            setIsEditing(false);
            toast.success("Profile updated successfully!");
            await fetchUserProfile();
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedUser(null);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <NavBar standOn="Profile" />
            <Spin spinning={loading}>
                {isEditing ? (
                    <Form
                        className="edit-form"
                        onFinish={handleSubmit}
                        initialValues={editedUser}
                    >
                        <h2>Edit Profile</h2>
                        <Form.Item
                            label="Full Name"
                            name="fullname"
                        >
                            <Input 
                                onChange={(e) => handleChange({ target: { name: 'fullname', value: e.target.value } })}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Phone Number"
                            name="phone_number"
                        >
                            <Input 
                                onChange={(e) => handleChange({ target: { name: 'phone_number', value: e.target.value } })}
                            />
                        </Form.Item>
                        <Form.Item
                            label="City"
                            name="city"
                        >
                            <Input 
                                onChange={(e) => handleChange({ target: { name: 'city', value: e.target.value } })}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Country"
                            name="country"
                        >
                            <Input 
                                onChange={(e) => handleChange({ target: { name: 'country', value: e.target.value } })}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Specific Address"
                            name="specific_Address"
                        >
                            <Input 
                                onChange={(e) => handleChange({ target: { name: 'specific_Address', value: e.target.value } })}
                            />
                        </Form.Item>
                        <div className="button-group">
                            <Button type="primary" htmlType="submit">Save Changes</Button>
                            <Button onClick={handleCancel}>Cancel</Button>
                        </div>
                    </Form>
                ) : (
                    <Table
                        className="profile-table"
                        pagination={false}
                        columns={[
                            {
                                title: 'Field',
                                dataIndex: 'field',
                                width: 200,
                            },
                            {
                                title: 'Value',
                                dataIndex: 'value',
                            }
                        ]}
                        dataSource={[
                            { key: '1', field: 'Username', value: user.username },
                            { key: '2', field: 'Email', value: user.email },
                            { key: '3', field: 'Full Name', value: user.fullname },
                            { key: '4', field: 'Phone Number', value: user.phone_number },
                            { key: '5', field: 'Create Date', value: formatDate(user.create_date) },
                            { key: '6', field: 'City', value: user.city || 'N/A' },
                            { key: '7', field: 'Country', value: user.country || 'N/A' },
                            { key: '8', field: 'Specific Address', value: user.specific_Address || 'N/A' },
                        ]}
                        footer={() => (
                            <Button type="primary" onClick={handleEdit} >
                                Edit Profile
                            </Button>
                        )}
                    />
                )}
            </Spin>
        </div>
    );
};

export default Profile;
