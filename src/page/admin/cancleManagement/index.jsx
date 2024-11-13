import DashboardTemplate from '../../../dashboard-template';
import { Button } from 'antd';
import api from '../../../config/api';
import { toast } from 'react-toastify';

function CancelManagement() {
    const handleRefund = async (orderId) => {
        await api.post(`transactions/refund`, {}, { 
          params: { 
            koiOrderId: Number(orderId) 
          } 
        });
        toast.success('Order refunded successfully');
    };

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Cancel Date',
            dataIndex: 'cancelDate',
            key: 'cancelDate',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (text) => `$${text}`,
        },
        {
            title: 'orderStatus',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
           
        },

       
    ];

    return (
        <DashboardTemplate 
            columns={columns} 
            apiURI="order/canceled"
            title="Canceled Orders" 
            customActions={[
                {
                    label: 'Refund Order',
                    condition: (record) => record.status !== 'REFUND',
                    action: handleRefund,
                },
            ]}
            showAddButton={false} 
            disableCreate={true}
            combineActions={true}
            showEditDelete={false} 
                    

        />
    );
}

export default CancelManagement;
