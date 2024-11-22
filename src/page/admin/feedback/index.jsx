import { Form } from 'antd';
import DashboardTemplate from '../../../dashboard-template';

function ManagementFeedback() {
    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Feedback Content',
            dataIndex: 'feedBackContent',
            key: 'feedBackContent',
        },
        {
            title: 'Feedback Day',
            dataIndex: 'feedBackDay',
            key: 'feedBackDay',
            render: (date) => new Date(date).toLocaleDateString(),
        }
    ];

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
            disableCreate={true} 
            hideEdit={true}
        />
    );
}

export default ManagementFeedback;
