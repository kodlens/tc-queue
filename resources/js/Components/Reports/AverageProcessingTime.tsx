import { Row, Col, Card } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AverageProcessingTime = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    axios.get('/reports/processing-time')
      .then(res => setData(res.data));
  }, []);
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Avg Processing Time">{data?.avg_hours} hrs</Card>
      </Col>
      <Col span={8}>
        <Card title="Fastest">{data?.min_hours} hrs</Card>
      </Col>
      <Col span={8}>
        <Card title="Slowest">{data?.max_hours} hrs</Card>
      </Col>
    </Row>
  )
}

export default AverageProcessingTime