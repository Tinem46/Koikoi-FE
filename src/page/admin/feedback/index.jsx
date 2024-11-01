import { Form } from 'antd';
import DashboardTemplate from '../../../dashboard-template';

function ManagementFeedback() {
    const columns = [
        {
            title: 'User',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Product',
            dataIndex: 'productName',
            key: 'productName',
        },
        {
            title: 'Feedback Content',
            dataIndex: 'feedBackContent',
            key: 'feedBackContent',
        },
        {
            title: 'Created Date',
            dataIndex: 'createDate',
            key: 'createDate',
            render: (date) => new Date(date).toLocaleDateString(),
        }
    ];

    // Empty form items since we don't need to create/edit feedback
    const formItems = (
        <>
        </>
    );

    return (
        <DashboardTemplate 
            columns={columns} 
            apiURI="feedback" 
            formItems={formItems} 
            title="Feedback" 
            disableCreate={true} // Disable create button since admin only views feedback
        />
    );
}

export default ManagementFeedback;
