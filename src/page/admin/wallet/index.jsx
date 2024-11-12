import { Table, Button, Form, Input, Modal } from 'antd';
import api from '../../../config/api';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
function WalletAdmin() {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [transactionId, setTransactionId] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [balance, setBalance] = useState(0);
  const [isWithdrawModalVisible, setIsWithdrawModalVisible] = useState(false);
  const [isTopUpModalVisible, setIsTopUpModalVisible] = useState(false);

  useEffect(() => {
    fetchTransactionData();
    fetchBalance();
  }, []);

  const fetchTransactionData = async () => {
    try {
      const response = await api.get('transactions/Withdrawals');  
      if (response.data) {
        setTransactions(Array.isArray(response.data) ? response.data : []);
        setTransactionId(response.data[0].id);
      }
    } catch (error) {
      toast.error('Failed to fetch transaction data');
      console.error('Transaction data fetch error:', error);
      setTransactions([]);
    }
  };

  const fetchBalance = async () => {
    try {
      const response = await api.get('account/balance');
      if (response.data) {
        setBalance(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch balance');
      console.error('Balance fetch error:', error);
    }
  };

  const handleApprove = async (transactionId) => {
    setActionLoading(prev => ({ ...prev, [`approve-${transactionId}`]: true }));
    try {
      await api.post(`transactions/approveWithdrawal?transactionId=${transactionId}`);
      toast.success('Transaction approved successfully');
      fetchTransactionData();
    } catch (error) {
      toast.error('Failed to approve transaction');
      console.error('Approval error:', error);
    } finally {
      setActionLoading(prev => ({ ...prev, [`approve-${transactionId}`]: false }));
    }
  };

  const handleReject = async (transactionId) => {
    setActionLoading(prev => ({ ...prev, [`reject-${transactionId}`]: true }));
    try {
      await api.put(`transactions/rejectWithdrawal/${transactionId}`);
      toast.success('Transaction rejected successfully');
      fetchTransactionData();
    } catch (error) {
      toast.error('Failed to reject transaction');
    } finally {
      setActionLoading(prev => ({ ...prev, [`reject-${transactionId}`]: false }));
    }
  };

  const showWithdrawModal = () => {
    setIsWithdrawModalVisible(true);
  };

  const handleModalCancel = () => {
    setIsWithdrawModalVisible(false);
  };

  const handleWithdraw = async (values) => {
    setLoading(true);
    try {
      await api.post('transactions/withdraw', values);
      toast.success('Withdrawal request submitted successfully');
      setIsWithdrawModalVisible(false);
      fetchTransactionData();
      fetchBalance();
    } catch (error) {
      toast.error(error.response?.data || 'Failed to process withdrawal');
    } finally {
      setLoading(false);
    }
  };

  const showTopUpModal = () => {
    setIsTopUpModalVisible(true);
  };

  const handleTopUpModalCancel = () => {
    setIsTopUpModalVisible(false);
  };

  const handleTopUp = async (values) => {
    setLoading(true);
    try {
      await api.post('transactions/top-up', values);
      toast.success('Top-up request submitted successfully');
      setIsTopUpModalVisible(false);
      fetchTransactionData();
      fetchBalance();
    } catch (error) {
      toast.error(error.response?.data || 'Failed to process top-up');
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'transactionsDate',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      render: (amount) => `$${amount}`,
    },
    {
      title: 'Account Number',
      dataIndex: 'accountNumber',
    },
    {
      title: 'Account Name',
      dataIndex: 'accountName',
    },
    {
      title: 'Bank Name',
      dataIndex: 'bankName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Actions',
      render: (_, record) => {
        if (record.status === 'PENDING') {
          return (
            <>
              <Button 
                type="primary" 
                onClick={() => handleApprove(record.id)} 
                loading={actionLoading[`approve-${record.id}`]}
                style={{ marginRight: '8px' }}
              >
                Approve
              </Button>
              <Button 
                type="primary" 
                danger 
                onClick={() => handleReject(record.id)}
                loading={actionLoading[`reject-${record.id}`]}
              >
                Reject
              </Button>
            </>
          );
        }
        return null;
      },
    },
  ];

  return (
    <>
      <div style={{ padding: '24px' }}>
        <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>💰 Balance: ${balance}</h3>
          <div>
            <Button type="primary" onClick={showTopUpModal} style={{ marginRight: '8px' }}>
              Top Up Money
            </Button>
            <Button type="primary" onClick={showWithdrawModal} style={{backgroundColor: 'red'}}>
              Withdraw Money
            </Button>
          </div>
        </div>

        <Modal
          title="Withdraw Money"
          open={isWithdrawModalVisible}
          onCancel={handleModalCancel}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleWithdraw}>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, toast: 'Please enter amount' }]}
            >
              <Input type="number" min={0} placeholder="Enter amount to withdraw" />
            </Form.Item>

            <Form.Item
              name="accountNumber"
              label="Account Number"
              rules={[{ required: true, toast: 'Please enter account number' }]}
            >
              <Input placeholder="Enter bank account number" />
            </Form.Item>

            <Form.Item
              name="accountName"
              label="Account Name"
              rules={[{ required: true, toast: 'Please enter account name' }]}
            >
              <Input placeholder="Enter account holder name" />
            </Form.Item>

            <Form.Item
              name="bankName"
              label="Bank Name"
              rules={[{ required: true, toast: 'Please enter bank name' }]}
            >
              <Input placeholder="Enter bank name" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Submit Withdrawal
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="Top Up Money"
          open={isTopUpModalVisible}
          onCancel={handleTopUpModalCancel}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleTopUp}>
            <Form.Item
              name="amount"
              label="Amount"
              rules={[{ required: true, toast: 'Please enter amount' }]}
            >
              <Input type="number" min={0} placeholder="Enter amount to top up" />
            </Form.Item>

            <Form.Item
              name="accountNumber"
              label="Account Number"
              rules={[{ required: true, toast: 'Please enter account number' }]}
            >
              <Input placeholder="Enter bank account number" />
            </Form.Item>

            <Form.Item
              name="accountName"
              label="Account Name"
              rules={[{ required: true, toast: 'Please enter account name' }]}
            >
              <Input placeholder="Enter account holder name" />
            </Form.Item>

            <Form.Item
              name="bankName"
              label="Bank Name"
              rules={[{ required: true, toast: 'Please enter bank name' }]}
            >
              <Input placeholder="Enter bank name" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading} block>
                Submit Top Up
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Table
          columns={columns}
          dataSource={transactions}
          rowKey="id"
          loading={loading}
        />
      </div>
    </>
  );
}

export default WalletAdmin;
