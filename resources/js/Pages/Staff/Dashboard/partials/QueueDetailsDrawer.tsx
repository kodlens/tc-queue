import {
  Drawer,
  Tag,
  Descriptions,
  Divider,
  Button,
  Space,
  Timeline,
  Badge,
} from 'antd'
import {
  ClockCircleOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import ActionConfirmModal from './ActionConfirmModal'

type QueueItem = {
  id: number
  reference: string
  service: string
  user: string
  email: string
  status: 'waiting' | 'processing' | 'completed'
  priority: 'normal' | 'urgent'
  created_at: string
}

const statusColor: Record<string, string> = {
  waiting: 'default',
  processing: 'blue',
  completed: 'green',
}

export default function QueueDetailsDrawer({
  open,
  onClose,
  data,
}: {
  open: boolean
  onClose: () => void
  data: QueueItem | null
}) {

  const [actionModalOpen, setActionModalOpen] = useState(false)
  const [actionType, setActionType] = useState<'processing' | 'completed'>('processing')


  return (
    <>

      <Drawer
        open={open}
        onClose={onClose}
        width={420}
        destroyOnClose={false} // 🔑 KEEP MOUNTED
        maskClosable
        placement="right"
        title={
          data && (
            <Space>
              <strong>{data.reference}</strong>
              <Tag color={statusColor[data.status]}>
                {data.status.toUpperCase()}
              </Tag>
              <Badge
                status={data.priority === 'urgent' ? 'error' : 'default'}
                text={data.priority.toUpperCase()}
              />
            </Space>
          )
        }
      >
        {data && (
          <>
            {/* Request Info */}
            <Descriptions column={1} size="small" title="Request Information">
              <Descriptions.Item label="Service">
                {data.service}
              </Descriptions.Item>
              <Descriptions.Item label="Submitted At">
                {data.created_at}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* User Info */}
            <Descriptions column={1} size="small" title="User Information">
              <Descriptions.Item label="Name">
                {data.user}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {data.email}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* Timeline */}
            <strong>Timeline</strong>
            <Timeline
              className="mt-3"
              items={[
                {
                  dot: <ClockCircleOutlined />,
                  color: 'gray',
                  children: 'Request created',
                },
                {
                  dot: <SyncOutlined />,
                  color: data.status !== 'waiting' ? 'blue' : 'gray',
                  children: 'Processing started',
                },
                {
                  dot: <CheckCircleOutlined />,
                  color: data.status === 'completed' ? 'green' : 'gray',
                  children: 'Completed',
                },
              ]}
            />

            <Divider />

            {/* Actions */}
            <Space className="w-full justify-end">
              {data.status === 'waiting' && (
                <Button
                  type="primary"
                  onClick={() => {
                    setActionType('processing')
                    setActionModalOpen(true)
                  }}
                >
                  Start Processing
                </Button>
              )}

              {data.status === 'processing' && (
                <Button
                  type="primary"
                  onClick={() => {
                    setActionType('completed')
                    setActionModalOpen(true)
                  }}
                >
                  Mark Completed
                </Button>
              )}
              <Button onClick={onClose}>Close</Button>
            </Space>
          </>
        )}
      </Drawer>

      <ActionConfirmModal
        open={actionModalOpen}
        action={actionType}
        itemRef={data? data.reference : ''}
        onCancel={() => setActionModalOpen(false)}
        onConfirm={async () => {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))
          // Here you would call your backend to update status
          console.log('Action performed:', actionType)
        }}
      />
    </>

  )
}
