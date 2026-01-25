import { Table, Dropdown, Button, Tag, MenuProps, message } from 'antd'
import { MoreOutlined, EyeOutlined, SyncOutlined, CheckOutlined } from '@ant-design/icons'
import { useState } from 'react'
import QueueDetailsDrawer from './QueueDetailsDrawer'
import { Footprints } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Column from 'antd/es/table/Column'
import { Step } from '@/types'

type QueueItem = {
  id: number
  reference: string
  service: string
  user: string
  email: string
  status: 'waiting' | 'processing' | 'completed'
  priority: 'normal' | 'urgent'
  created_at: string
  service_steps: string[]
}

export default function QueueTable() {
  const [selected, setSelected] = useState<QueueItem | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const { data, isFetching } = useQuery({
    queryKey: ['queues'],
    queryFn: async() => {
      const res = await axios.get('/staff/get-queues')
      return res.data
    },
  })



  const handleAction = (type: string, record: QueueItem, step?: string) => {
    if (type === 'view') {
      setSelected(record)
      setDrawerOpen(true)
    } else if (type === 'step') {
      message.info(`Step "${step}" selected for ${record.reference}`)
      // Here you can call backend API to update step
    } else if (type === 'processing' || type === 'completed') {
      message.success(`${type.toUpperCase()} action for ${record.reference}`)
    }
  }

  const columns = [
    { title: 'Queue #', dataIndex: 'reference', key: 'reference', width: 120 },
    { title: 'Service', dataIndex: 'service', key: 'service' },
    { title: 'User', dataIndex: 'user', key: 'user' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color: Record<string, string> = { waiting: 'default', processing: 'blue', completed: 'green' }
        return <Tag color={color[status]}>{status.toUpperCase()}</Tag>
      },
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => {
        const color: Record<string, string> = { normal: 'default', urgent: 'red' }
        return <Tag color={color[priority]}>{priority.toUpperCase()}</Tag>
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,

    },
  ]

  return (
    <>
      <Table
        dataSource={data ? data?.data : []}
        className='overflow-auto'
        loading={isFetching}
        rowKey={(data) => data.id}
        pagination={{ pageSize: 5 }}
       >

        <Column title="Queue #" dataIndex="queue_number" key="queue_number" width={120}/>
        <Column title="Service" dataIndex="service" key="service"
        render={(service)=>(
          <>
            {service.name}
          </>
        )}/>
        <Column title="Client" dataIndex="client_name" key="client_name" />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status: string) => (
            <Tag
              color={
                status === 'waiting'
                  ? 'default'
                  : status === 'processing'
                  ? 'blue'
                  : 'green'
              }
            >
              {status.toUpperCase()}
            </Tag>
          )}
        />
        <Column
          title="Priority"
          dataIndex="priority"
          key="priority"
          render={(priority: string) => (
            <Tag
              color={
                priority === 'normal'
                  ? 'default'
                  : priority === 'urgent'
                  ? 'orange'
                  : 'green'
              }
            >
              {priority.toUpperCase()}
            </Tag>
          )}
        />
        <Column
          title="Actions"
          key="actions"
          width={120}
          render={(_: any, record: QueueItem) => {
            console.log(record.service_steps);

            const menuItems: MenuProps['items'] = [
              {
                key: 'view',
                label: 'View Details',
                icon: <EyeOutlined />,
                onClick: () => handleAction('view', record),
              },
              {
                key: 'processing',
                label: 'Start Processing',
                icon: <SyncOutlined />,
                disabled: record.status !== 'waiting',
                onClick: () => handleAction('processing', record),
              },
              {
                key: 'completed',
                label: 'Mark Completed',
                icon: <CheckOutlined />,
                disabled: record.status !== 'processing',
                onClick: () => handleAction('completed', record),
              },
              {
                key: 'set-step',
                icon: <Footprints size={15} />,
                label: 'Set Step',
                children: record.service_steps.map((step:Step, idx:number) => ({
                  key: `step-${idx}`,
                  label: step?.name,
                  onClick: () => handleAction('step', record, step),
                })),
              },
            ]

            return (
              <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                <Button type="text" icon={<MoreOutlined />} />
              </Dropdown>
            )
          }}
        />


       </Table>

      {/* Drawer for View Details */}
      {selected && (
        <QueueDetailsDrawer
          open={drawerOpen}
          data={selected}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </>
  )
}
