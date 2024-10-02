import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../config/api';
import './index.scss';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(null);
    const navigate = useNavigate();

    const fetchUserProfile = async () => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.put('account/Profile', editedUser);
            setUser(response.data);
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile. Please try again.");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedUser(null);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-image">
                <img src="://th.bing.com/th/id/R.e7f026e16798c830e44144bd461bcde1?rik=9A%2f8JXrjYat9kA&pid=ImgRaw&r=0" alt="Profile" />
            </div>
            {isEditing ? (
                <form className="edit-form" onSubmit={handleSubmit}>
                    <h2>Edit Profile</h2>
                    <div className="form-group">
                        <label>Full Name:</label>
                        <input
                            type="text"
                            name="fullname"
                            value={editedUser.fullname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={editedUser.phone_number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={editedUser.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>State:</label>
                        <input
                            type="text"
                            name="state"
                            value={editedUser.state}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Country:</label>
                        <input
                            type="text"
                            name="country"
                            value={editedUser.country}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Specific Address:</label>
                        <input
                            type="text"
                            name="specific_Address"
                            value={editedUser.specific_Address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit">Save Changes</button>
                        <button type="button" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            ) : (
                <>
                    <table className="profile-table">
                        <thead>
                            <tr>
                                <th colSpan="2">User Profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Username:</td>
                                <td>{user.username}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <td>Full Name:</td>
                                <td>{user.fullname}</td>
                            </tr>
                            <tr>
                                <td>Phone Number:</td>
                                <td>{user.phone_number}</td>
                            </tr>
                            <tr>
                                <td>Create Date:</td>
                                <td>{user.create_date || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>City:</td>
                                <td>{user.city || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>State:</td>
                                <td>{user.state || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Country:</td>
                                <td>{user.country || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td>Specific Address:</td>
                                <td>{user.specific_Address || 'N/A'}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <button className="edit-button" onClick={handleEdit}>Edit Profile</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default Profile;