import './index.scss';
import { Form, Input, Button, message } from 'antd';
import api from '../../config/api';
import { useState, useEffect } from 'react';
import Navigation from '../../components/navigation';
import NavBar from '../../components/navigation2';
function WalletUser() {
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchBalance();
    fetchTransactionData();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await api.get('account/balance');
      if (response.data) {
        setBalance(response.data);
      }
    } catch (error) {
      message.error('Failed to fetch balance');
      console.error('Balance fetch error:', error);
    }
  };

  const fetchTransactionData = async () => {
    try {
      const response = await api.get('transactions/Withdrawals');
      if (response.data) {
        setTransactions(Array.isArray(response.data) ? response.data : []);
      }
    } catch (error) {
      message.error('Failed to fetch transaction data');
      console.error('Transaction data fetch error:', error);
      setTransactions([]);
    }
  };

  const handleWithdraw = async (values) => {
    setLoading(true);
    try {
      const response = await api.post('transactions/withdraw', values);
      message.success('Withdrawal request submitted successfully');
      console.log('Withdrawal response:', response.data);
    } catch (error) {
      message.error(error.response?.data || 'Failed to process withdrawal');
      console.error('Withdrawal error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="wallet-user">
      <NavBar standOn="Wallet" />
      <div className="wallet-balance">
        <h3>Current Balance: ${balance}</h3>
      </div>
      <Form layout="vertical" onFinish={handleWithdraw}>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Please enter amount' }]}
        >
          <Input type="number" min={0} placeholder="Enter amount to withdraw" />
        </Form.Item>

        <Form.Item
          name="accountNumber"
          label="Account Number"
          rules={[{ required: true, message: 'Please enter account number' }]}
        >
          <Input placeholder="Enter bank account number" />
        </Form.Item>

        <Form.Item
          name="accountName"
          label="Account Name"
          rules={[{ required: true, message: 'Please enter account name' }]}
        >
          <Input placeholder="Enter account holder name" />
        </Form.Item>

        <Form.Item
          name="bankName"
          label="Bank Name"
          rules={[{ required: true, message: 'Please enter bank name' }]}
        >
          <Input placeholder="Enter bank name" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block style={{ backgroundColor: '#000', color: '#fff' }}>
            Submit Withdrawal
          </Button>
        </Form.Item>
      </Form>

      <div className="transaction-history">
        <h2>Transaction History</h2>
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Account Number</th>
              <th>Account Name</th>
              <th>Bank Name</th>
              <th>Status</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{new Date(transaction.transactionsDate).toLocaleDateString()}</td>
                <td>${transaction.totalAmount}</td>
                <td>{transaction.accountNumber || '-'}</td>
                <td>{transaction.accountName || '-'}</td>
                <td>{transaction.bankName || '-'}</td>
                <td>{transaction.status}</td>
                <td>{transaction.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WalletUser;