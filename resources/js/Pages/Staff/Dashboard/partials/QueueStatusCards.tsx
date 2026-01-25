import { Card, Tag } from 'antd'
import {
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'

const stats = [
  {
    title: 'Waiting',
    count: 12,
    color: 'orange',
    gradient: 'linear-gradient(135deg, #ff9f43, #ff6f00)',
    icon: <ClockCircleOutlined />,
  },
  {
    title: 'Processing',
    count: 7,
    color: 'blue',
    gradient: 'linear-gradient(135deg, #4facfe, #00c6ff)',
    icon: <SyncOutlined spin />,
  },
  {
    title: 'Completed',
    count: 34,
    color: 'green',
    gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)',
    icon: <CheckCircleOutlined />,
  },
]

export default function QueueStatusCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((item) => (
        <Card
          key={item.title}
          className="shadow-md"
          style={{
            background: item.gradient,
            color: 'white',
            borderRadius: 12,
          }}
        >
          <div className="flex items-center p-[20px]">
            <div className="text-3xl mr-4">{item.icon}</div>

            <div className="flex-1">
              <div className="text-sm uppercase opacity-90">
                {item.title}
              </div>
              <div className="text-3xl font-bold">
                {item.count}
              </div>
            </div>

            <Tag color={item.color} className="uppercase">
              {item.title}
            </Tag>
          </div>
        </Card>
      ))}
    </div>
  )
}
