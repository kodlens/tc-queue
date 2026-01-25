import { Table, Tag, Dropdown, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import QueueDetailsDrawer from './QueueDetailsDrawer'

import {
  MoreOutlined,
  EyeOutlined,
  SyncOutlined,
  CheckOutlined,
} from '@ant-design/icons'
import { useState } from 'react'

type QueueItem = {
  id: number
  reference: string
  service: string
  user: string
  status: 'waiting' | 'processing' | 'completed'
  priority: 'normal' | 'urgent'
  created_at: string
}

const dummyData: QueueItem[] = [
  {
    id: 1,
    reference: 'Q-0001',
    service: 'Document Request',
    user: 'Juan Dela Cruz',
    status: 'waiting',
    priority: 'normal',
    created_at: '2026-01-25',
  },
  {
    id: 2,
    reference: 'Q-0002',
    service: 'License Renewal',
    user: 'Maria Santos',
    status: 'processing',
    priority: 'urgent',
    created_at: '2026-01-24',
  },
  {
    id: 3,
    reference: 'Q-0003',
    service: 'Certification',
    user: 'Pedro Reyes',
    status: 'completed',
    priority: 'normal',
    created_at: '2026-01-23',
  },
]

const statusColor: Record<string, string> = {
  waiting: 'default',
  processing: 'blue',
  completed: 'green',
}

const priorityColor: Record<string, string> = {
  normal: 'default',
  urgent: 'red',
}

export default function QueueTable() {

  const [selected, setSelected] = useState<any>(null)
  const [open, setOpen] = useState(false)

  const columns: ColumnsType<QueueItem> = [
    {
      title: 'Queue #',
      dataIndex: 'reference',
      key: 'reference',
      width: 120,
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={statusColor[status]}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag color={priorityColor[priority]}>
          {priority.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 80,
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: 'view',
                icon: <EyeOutlined />,
                label: 'View Details',
                onClick: () => {
                  setSelected(record)
                  setOpen(true)
                },
              },
              {
                key: 'process',
                icon: <SyncOutlined />,
                label: 'Start Processing',
                disabled: record.status !== 'waiting',
              },
              {
                key: 'complete',
                icon: <CheckOutlined />,
                label: 'Mark Completed',
                disabled: record.status !== 'processing',
              },
            ],
          }}
          trigger={['click']}
        >
          <Button
            type="text"
            icon={<MoreOutlined />}
          />
        </Dropdown>
      ),
    },
  ]

  return (
    <>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dummyData}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
        }}
      />

      <QueueDetailsDrawer
        open={open}
        data={selected}
        onClose={() => {
          setOpen(false)
          setSelected(null)
        }}
      />
    </>
  )
}
