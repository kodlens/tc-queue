import axios from 'axios';
import { useEffect, useState } from 'react'
import { Card, Col, Row, Spin } from "antd";

const QueueSummaryStatus = () => {


  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get('/reports/queue-status-summary')
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, []);


  return (


    <Spin spinning={loading}>
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Total">{data?.total || 0}</Card>
        </Col>
        <Col span={6}>
          <Card title="Pending">{data?.pending || 0}</Card>
        </Col>
        <Col span={6}>
          <Card title="In Progress">{data?.in_progress || 0}</Card>
        </Col>
        <Col span={6}>
          <Card title="Completed">{data?.completed || 0}</Card>
        </Col>
      </Row>
    </Spin>
  );

}

export default QueueSummaryStatus