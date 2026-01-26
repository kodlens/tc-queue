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
import { QueueItem } from '@/types'




const statusColor: Record<string, string> = {
  waiting: 'default',
  processing: 'blue',
  completed: 'green',
}

export default function QueueDetailsDrawer({
  open,
  onClose,
  data,
  onRefresh
}: {
  open: boolean
  onClose: () => void
  data: QueueItem | null
  onRefresh: ()=> void
}) {

  const [actionModalOpen, setActionModalOpen] = useState(false)
  const [actionType, setActionType] = useState<'processing' | 'completed'>('processing')

  return (
    <>

      <Drawer
        open={open}
        onClose={onClose}
        width={420}
        destroyOnHidden={false} // 🔑 KEEP MOUNTED
        maskClosable
        placement="right"
        title={
          data && (
            <Space>
              <strong>{data.queue_number}</strong>
              <Tag color={data.status ? statusColor[data.status] : statusColor['waiting']}>
                {data.status?.toUpperCase()}
              </Tag>
              <Badge
                status={data.priority === 'urgent' ? 'error' : 'default'}
                text={data.priority?.toUpperCase()}
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
                {data.service?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Current Step">
                {data.current_step?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Submitted At">
                {data.created_at}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            {/* User Info */}
            <Descriptions column={1} size="small" title="User Information">
              <Descriptions.Item label="Name">
                {data.client_name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {data.client_name}
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
        id={data?.id}
        itemRef={data?.queue_number ? data.queue_number : ''}
        onCancel={() => setActionModalOpen(false)}
        onConfirm={async () => {
          onRefresh()
        }}
      />

    </>

  )
}
