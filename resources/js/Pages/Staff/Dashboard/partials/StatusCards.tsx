import { Card, Tag } from 'antd';
import {
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

interface Props {
  waiting: number;
  processing: number;
  completed: number;
}

export default function StatusCards({
  waiting,
  processing,
  completed,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      {/* Waiting */}
      <Card className="shadow-sm">
        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Waiting</span>
            <span className="text-3xl font-bold">{waiting}</span>
          </div>

          <div className="ml-auto">
            <Tag
              icon={<ClockCircleOutlined />}
              color="default"
              className="px-3 py-1 rounded-full"
            >
              Pending
            </Tag>
          </div>
        </div>
      </Card>

      {/* Processing */}
      <Card className="shadow-sm">
        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Processing</span>
            <span className="text-3xl font-bold text-blue-600">
              {processing}
            </span>
          </div>

          <div className="ml-auto">
            <Tag
              icon={<SyncOutlined spin />}
              color="processing"
              className="px-3 py-1 rounded-full"
            >
              In Progress
            </Tag>
          </div>
        </div>
      </Card>

      {/* Completed */}
      <Card className="shadow-sm">
        <div className="flex items-center">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Completed</span>
            <span className="text-3xl font-bold text-green-600">
              {completed}
            </span>
          </div>

          <div className="ml-auto">
            <Tag
              icon={<CheckCircleOutlined />}
              color="success"
              className="px-3 py-1 rounded-full"
            >
              Done
            </Tag>
          </div>
        </div>
      </Card>

    </div>
  );
}
