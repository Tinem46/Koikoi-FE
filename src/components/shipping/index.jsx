import { Table, Button } from 'antd';
import { useEffect, useState } from 'react';
import api from '../../config/api';
import { toast } from 'react-toastify';
import './index.scss';

function Shipping() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleConfirm = async (id) => {
    try {
      await api.put(`shipping/confirm?id=${id}`);
      toast.success('Shipping confirmed successfully');
      fetchData();
    } catch (error) {
      console.error('Error confirming shipping:', error);
      toast.error('Failed to confirm shipping');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Code',
      dataIndex: 'codeShipping',
      key: 'codeShipping',
    },
    {
      title: 'Customer Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Total Amount',
      dataIndex: 'toTalAmount',
      key: 'toTalAmount',
      render: (text) => `${parseFloat(text).toLocaleString('vi-VN')}đ`,
    },
    {
      title: 'Shipping Fee',
      dataIndex: 'shippingPee',
      key: 'shippingPee',
      render: (text) => `${parseFloat(text).toLocaleString('vi-VN')}đ`,
    },
    {
      title: 'Delivery Date',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      render: (text) => text ? new Date(text).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) : '',
    },
    {
      title: 'Delivered Date',
      dataIndex: 'deliveredDate',
      key: 'deliveredDate',
      render: (text) => text ? new Date(text).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) : '',
    },
    {
      title: 'Status',
      dataIndex: 'shipping',
      key: 'shipping',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        record.shipping !== 'DELIVERED' && (
          <Button 
            style={{backgroundColor: '#000', color: '#fff'}}
            type="primary"
            onClick={() => handleConfirm(record.id)}
          >
            Confirm Delivery
          </Button>
        )
      )
    }
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get('shipping/shippings');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching shipping data:', error);
      toast.error('Failed to fetch shipping data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="shipping-container">
 
        <Table 
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="id"
          scroll={{ x: 'max-content' }}
          locale={{ emptyText: "No shipping data found" }}
          pagination={{ pageSize: 20 }}
        />
      </div>
  );
}

export default Shipping;