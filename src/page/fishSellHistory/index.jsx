import { Table } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../config/api';
import { toast } from 'react-toastify';
import './index.scss';
import Navigation from '../../components/navigation';
function FishSellHistory() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (value) => `$${new Intl.NumberFormat('en-US').format(value)}`
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
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
    },
    {
      title: 'Approval Status',
      dataIndex: 'approvalStatus',
      key: 'approvalStatus',
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get('Consignment/user');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to fetch consignment history');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="fish-sell-history-container">
      <Navigation name="Fish Sell History" link="/fishSellHistory" />
      <div style={{ padding: '24px' }}>
        <Table 
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="id"
          scroll={{ x: true }}
        />
      </div>
    </div>
  );
}

export default FishSellHistory;   