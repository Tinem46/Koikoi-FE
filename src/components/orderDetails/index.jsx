import { Table, Button, Image } from 'antd';
import './index.scss';

function OrderDetails({ selectedOrder, onClose, onPreview }) {
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
      render: (text) => `$${parseFloat(text).toFixed(2)}`,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
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
