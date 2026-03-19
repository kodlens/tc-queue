import { useEffect, useState } from 'react'
import { Table } from "antd";
import axios from 'axios';
import AverageProcesingTimeChart from './AverageProcesingTimeChart';

const ProcessingTImePerService = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: "Service", dataIndex: "name" },
    { title: "Total Requests", dataIndex: "total_requests" },
    { title: "Avg (hrs)", dataIndex: "avg_hours" },
    { title: "Fastest (hrs)", dataIndex: "min_hours" },
    { title: "Slowest (hrs)", dataIndex: "max_hours" },
  ];


  useEffect(() => {
    setLoading(true);
    axios.get('/reports/processing-time-per-service')
      .then(res => setData(res.data))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={data}
        loading={loading}
      />

      <div>
        <AverageProcesingTimeChart data={data} />
      </div>
    </>

  )
}

export default ProcessingTImePerService