import DashboardTemplate from '../../../dashboard-template';
import { toast } from 'react-toastify';
import api from '../../../config/api';

function FishSellManagement() {
    const handleApprove = async (id) => {
        try {
            await api.post(`Consignment/approve/${id}`);
        } catch (error) {
            toast.error(error.response?.data || 'Failed to approve consignment');
        }
    };

    const handleCancel = async (id) => {
        try {
            await api.post(`Consignment/reject/${id}`);
        } catch (error) {
            toast.error(error.response?.data || 'Failed to rejected consignment');
        }
    };

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img src={text} alt="product" style={{ width: 50 }} />, // Render an image
          },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (text) => `$${text}`
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
       
        {
            title: 'Approval Status',
            dataIndex: 'approvalStatus',
            key: 'approvalStatus',
        }
    ];

    return (
        <DashboardTemplate 
            columns={columns} 
            apiURI="Consignment/allOfSell"
            title="Fish Sell Management" 
            hideAddButton={true}
            customActions={[
                {
                    label: 'Approve',
                    condition: (record) => record.approvalStatus === null || record.approvalStatus === 'PENDING',
                    action: handleApprove,
                    successMessage: 'Consignment approved successfully',
                    errorMessage: 'Failed to approve consignment'
                },
                {
                    label: 'Reject',
                    condition: (record) => record.approvalStatus !== 'REJECTED',
                    action: handleCancel,
                    successMessage: 'Consignment rejected successfully',
                    errorMessage: 'Failed to rejected consignment'
                }
            ]}
            showEditDelete={false}
        />
    );
}

export default FishSellManagement;
