import { useSelector, useDispatch } from 'react-redux';
import { removeFromCompare, clearCompare } from '../../redux/features/compareSlice';
import { addToCart } from '../../redux/features/cartSlice';
import api from '../../config/api';
import { Modal, Table, Button, Image } from 'antd';
import './index.scss';

function CompareModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const compareItems = useSelector((state) => state.compare.items);

  if (!isOpen) return null;

  const handleRemoveItem = (id) => {
    dispatch(removeFromCompare(id));
  };

  const handleClearAll = () => {
    dispatch(clearCompare());
    onClose();
  };

  const handleAddToCart = async (fish) => {
    try {
      const response = await api.post(`Cart/${fish.id}`);
      console.log(response.data);
      dispatch(addToCart(fish));
    } catch (err) {
      console.error(err.response.data);
    }
  };


  const columns = [
    {
      title: 'Attribute',
      dataIndex: 'attribute',
      key: 'attribute',
    },
    ...compareItems.map((fish) => ({
      title: (
        <div className="image-container">
          <Image src={fish.image} alt={fish.name} width={100} />
          <h3>{fish.name}</h3>
        </div>
      ),
      dataIndex: fish.id,
      key: fish.id,
      render: (text, record) => {
        if (record.attribute === 'Action') {
          return (
            <>
              <Button onClick={() => handleRemoveItem(fish.id)}>Remove</Button>
              <Button onClick={() => handleAddToCart(fish)}>Add to Cart</Button>
            </>
          );
        }
        const value = record[fish.id];
        return (
          <span>
            {(() => {
              switch (record.attribute.toLowerCase()) {
                case 'price':
                  return `$${new Intl.NumberFormat('en-US').format(value)}`;
                case 'age':
                  return `${value} months`;
                case 'size':
                  return `${value} cm`;
                case 'origin':
                  return value ? value.charAt(0).toUpperCase() + value.slice(1) : '';
                default:
                  return value;
              }
            })()}
          </span>
        );
      },
    })),
  ];

  const dataSource = ['price', 'category', 'age', 'size', 'origin', 'gender', 'Action'].map(
    (attribute) => ({
      key: attribute,
      attribute: attribute.charAt(0).toUpperCase() + attribute.slice(1),
      ...compareItems.reduce((acc, fish) => {
        acc[fish.id] = attribute === 'Action' ? null : fish[attribute];
        return acc;
      }, {}),
    })
  );

  return (
    <Modal
      visible={isOpen}
      onCancel={onClose}
      width="90%"
      footer={[
        <Button key="clear" onClick={handleClearAll}>
          Clear All
        </Button>,
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <h2>Compare Fish</h2>
      <Table columns={columns} dataSource={dataSource} pagination={false} scroll={{ x: true }} />
    </Modal>
  );
}

export default CompareModal;
