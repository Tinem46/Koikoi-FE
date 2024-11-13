import DashboardTemplate from '../../../dashboard-template';
import api from '../../../config/api';

function CustomerAccount() {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullname',
            key: 'fullname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone_number',
            key: 'phone_number',
        },
        {
            title: 'Created Date',
            dataIndex: 'create_date',
            key: 'create_date',
            render: (date) => {
                if (!date) return 'N/A';
                return new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
            }
        },
        {
            title: 'Address',
            render: (record) => (
                <span>
                    {[
                        record.specific_Address,
                        record.city,
                        record.state,
                        record.country
                    ].filter(Boolean).join(', ') || 'N/A'}
                </span>
            ),
            key: 'address',
        }
    ];

    return (
        <DashboardTemplate 
            columns={columns} 
            apiURI="account"
            title="Customer Accounts" 
            showAddButton={false}
            disableCreate={true}
            showEditDelete={false}
        />
    );
}

export default CustomerAccount;
