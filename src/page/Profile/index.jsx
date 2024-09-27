import { useSelector } from 'react-redux';
import './index.scss';

const Profile = () => {
    const user = useSelector((state) => state.user);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-container">
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
                </tbody>
            </table>
        </div>
    );
};

export default Profile;
