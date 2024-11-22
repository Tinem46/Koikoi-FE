import DashboardTemplate from '../../../dashboard-template';

function ShippingManagement() {
  const columns = [
    {
      title: 'Shipping ID',
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
      title: 'Delivery Date',
      dataIndex: 'deliveryDate',
      key: 'deliveryDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Total Amount',
      dataIndex: 'toTalAmount',
      key: 'toTalAmount',
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    {
      title: 'Shipping Fee',
      dataIndex: 'shippingPee',
      key: 'shippingPee',
      render: (fee) => `$${fee.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'shipping',
      key: 'shipping',
    }
  ];

  

  return (
    <div>
      <DashboardTemplate 
        columns={columns} 
        apiURI="shipping/searchAll"
        title="Shipping Management"
        disableCreate={true}
        combineActions={true}
        showEditDelete={false} 
        hideEdit={true}
      />
    </div>
  );
}

export default ShippingManagement;
