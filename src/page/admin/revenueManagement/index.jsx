// src/page/admin/revenueManagement/index.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRevenueData } from '../../../redux/features/revenueSlice';
import { Table, Button, Card, Row, Col, DatePicker, Select, Statistic } from 'antd';
import { Line, Column, Pie, Radar } from '@ant-design/charts';
import api from '../../../config/api';


const RevenueManagement = () => {
  const dispatch = useDispatch();
  const revenueData = useSelector((state) => state.revenue.revenueData);
  const [statistics, setStatistics] = useState({
    totalProducts: 0,
    customerCount: 0,
    staffCount: 0,
    riskCount: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch statistics
        const statsResponse = await api.get('dashboard/stats');
        setStatistics(statsResponse.data);

        // Fetch monthly revenue data
        const revenueResponse = await api.get('dashboard/monthly-revenue');
        const monthlyData = revenueResponse.data.results.map(item => ({
          month: `${item.month}/${item.year}`,
          revenue: item.totalRevenue
        }));
        
        dispatch(setRevenueData(monthlyData));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const columns = [
    {
      title: 'Month',
      dataIndex: 'month',
      key: 'month',
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (text) => `$${text}`,
    },
  ];

  const config = {
    data: revenueData,
    xField: 'month',
    yField: 'revenue',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };

  const columnConfig = {
    data: revenueData,
    xField: 'month',
    yField: 'revenue',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
  };

  const pieConfig = {
    appendPadding: 10,
    data: revenueData,
    angleField: 'revenue',
    colorField: 'month',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Dashboard Statistics</h1>
      
      {/* Add statistics cards */}
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Products" value={statistics.totalProducts} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Total Customers" value={statistics.customerCount} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Staff Members" value={statistics.staffCount} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Fish Count" value={statistics.fishCount} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Row justify="space-between">
              <Col>
                <Select defaultValue="All" style={{ width: 120 }}>
                  <Select.Option value="All">All</Select.Option>
                  <Select.Option value="Category1">Category1</Select.Option>
                </Select>
              </Col>
              <Col>
                <DatePicker.RangePicker />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <Table columns={columns} dataSource={revenueData} rowKey="month" />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Line {...config} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Column {...columnConfig} />
          </Card>
        </Col>
        <Col span={24}>
          <Card>
            <Pie {...pieConfig} />
          </Card>
        </Col>
      </Row>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button type="primary">Refresh Data</Button>
      </div>
    </div>
  );
};

export default RevenueManagement;
