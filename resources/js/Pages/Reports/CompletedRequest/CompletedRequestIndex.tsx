import { useEffect, useState } from "react";
import axios from "axios";
import './style.css'
import { Button } from "antd";

export default function CompletedRequestIndex() {
  const [data, setData] = useState<any[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const loadData = () => {
    if (!from || !to) return;

    axios
      .get("/reports/get-completed-requests", {
        params: { from, to },
      })
      .then((res) => setData(res.data));
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="report-container">
      {/* Controls */}
      <div className="no-print">
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        <Button onClick={loadData}>Load</Button>
        <Button onClick={handlePrint}>Print</Button>
      </div>

      {/* Header */}
      <div className="report-header">
        <h3>Republic of the Philippines</h3>
        <h4>Tangub City</h4>
        <h2>COMPLETED REQUESTS REPORT</h2>
        <p>
          Date: {from || "____"} to {to || "____"}
        </p>
      </div>

      {/* Table */}
      <table className="print-table">
        <thead>
          <tr>
            <th>Queue #</th>
            <th>Client</th>
            <th>Service</th>
            <th>Office</th>
            <th>Reference</th>
            <th>Completed</th>
            <th>Claimed</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.queue_number}</td>
              <td>{item.client_name}</td>
              <td>{item.service}</td>
              <td>{item.requesting_office}</td>
              <td>{item.reference_no}</td>
              <td>{item.completed_at}</td>
              <td>{item.claimed_at || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Footer */}
      <div className="report-footer">
        <p>Total Records: {data.length}</p>

        <div className="signatures">
          <div>
            <p>Prepared by:</p>
            <br />
            <p>______________________</p>
          </div>
          <div>
            <p>Approved by:</p>
            <br />
            <p>______________________</p>
          </div>
        </div>
      </div>
    </div>
  );
}