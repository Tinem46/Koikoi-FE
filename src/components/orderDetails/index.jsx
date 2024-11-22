import { Table, Button, Image, Modal, Input } from 'antd';
import { toast } from 'react-toastify';
import api from '../../config/api';
import './index.scss';

function OrderDetails({ selectedOrder, onClose, isCareManagement = true}) {

  const handleCreateIndividualShipping = async (productId, individualShippingCode, deliveryDate, deliveredDate) => {
    if (!individualShippingCode.trim()) {
      toast.error('Please enter a shipping code');
      return;
    }
    try {
      await api.post(`shipping/create2/${productId}`, {
        shippingCode: individualShippingCode,
        deliveryDate,
        deliveredDate
      });
      toast.success('Shipping created successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error creating shipping:', error);
      toast.error('Failed to create shipping');
    }
  };

  const detailColumns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `${parseFloat(text).toLocaleString('vi-VN')}đ`,
    },
   
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 120,
      render: (text) => (
        <Image
          src={text}
          alt="Product"
          width={80}
          height={80}
          preview={{
            maskClassName: 'customize-mask',
            mask: <div>Xem</div>
          }}
        />
      ),
    },
    ...(!isCareManagement ? [{
      title: 'Shipping',
      key: 'shipping',
      render: (_, record) => (
        record.status !== 'DELIVERY' && record.status !== 'DELIVERED'&&record.status !== 'CONSIGN' ? (
          <Button 
            onClick={() => {
              let tempShippingCode = '';
              let tempDeliveryDate = null;
              let tempDeliveredDate = null;
              Modal.confirm({
                title: 'Create Shipping',
                content: (
                  <div>
                    <Input
                      placeholder="Enter shipping code"
                      onChange={(e) => {
                        tempShippingCode = e.target.value;
                      }}
                      style={{ marginBottom: '10px' }}
                    />
                    <Input
                      type="date"
                      placeholder="Delivery Date"
                      onChange={(e) => {
                        tempDeliveryDate = e.target.value;
                      }}
                      style={{ marginBottom: '10px' }}
                    />
                    <Input
                      type="date"
                      placeholder="Delivered Date"
                      onChange={(e) => {
                        tempDeliveredDate = e.target.value;
                      }}
                    />
                  </div>
                ),
                onOk: () => handleCreateIndividualShipping(
                  record.id, 
                  tempShippingCode, 
                  tempDeliveryDate, 
                  tempDeliveredDate
                ),
                onCancel: () => {},
              });
            }}
          >
            Create Shipping
          </Button>
        ) : null
      ),
    }] : []),
  ];

  return (
    <div className="order-details" style={{ width: '75%', margin: '0 auto' }}>
      <div className="order-details-header">
        <h2>Order Details</h2>
        <Button className="close-button" onClick={onClose}>
          <span >×</span>
        </Button>
      </div>
      <Table 
        dataSource={Array.isArray(selectedOrder) ? selectedOrder : [selectedOrder]} 
        columns={detailColumns} 
        rowKey="id" 
        pagination={false}
        size="small"
        style={{ width: '100%' }}
      />
    </div>
  );
}

export default OrderDetails;
