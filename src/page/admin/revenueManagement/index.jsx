// src/page/admin/revenueManagement/index.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRevenueData } from '../../../redux/features/revenueSlice';
import { Table, Button, Card, Row, Col, DatePicker, Select } from 'antd';
import { Line, Column, Pie, Radar } from '@ant-design/charts';

const RevenueManagement = () => {
  const dispatch = useDispatch();
  const revenueData = useSelector((state) => state.revenue.revenueData);

  useEffect(() => {
    const fetchData = () => {
      const data = [
        { month: 'Jan', revenue: 1000 },
        { month: 'Feb', revenue: 1200 },
        { month: 'Mar', revenue: 1500 },
        // Add more data points...
      ];
      dispatch(setRevenueData(data));
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
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Revenue Management</h1>
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
