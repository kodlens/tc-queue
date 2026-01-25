import { Table, Dropdown, Button, Tag, MenuProps, message } from 'antd'
import { MoreOutlined, EyeOutlined, SyncOutlined, CheckOutlined } from '@ant-design/icons'
import { useState } from 'react'
import QueueDetailsDrawer from './QueueDetailsDrawer'
import { Footprints } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Column from 'antd/es/table/Column'
import { QueueItem, Step } from '@/types'



export default function QueueTable() {``
  const [selected, setSelected] = useState<QueueItem | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const { data, isFetching } = useQuery({
    queryKey: ['queues'],
    queryFn: async() => {
      const res = await axios.get('/staff/get-queues')
      return res.data
    },
  })



  const handleAction = (type: string, queue: QueueItem) => {
    //console.log(queue);
    if (type === 'view') {
      setSelected(queue)
      setDrawerOpen(true)
    } else if (type === 'step') {
      message.info(`Step "${queue.current_step?.name}" selected for ${queue.queue_number}`)
      // Here you can call backend API to update step
    } else if (type === 'processing' || type === 'completed') {
      message.success(`${type.toUpperCase()} action for ${queue.queue_number}`)
    }
  }



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
        <Column
          title="Service"
          dataIndex="service"
          key="service"
          render={(_, queue) => (
            <div className="space-y-2">
              {/* Service Name */}
              <div className="text-sm font-semibold text-gray-900">
                {queue.service?.name}
              </div>

              {/* Current Step */}
              <div className="flex items-start gap-2 rounded-md border border-orange-200 bg-orange-50 px-3 py-2">
                <div className="mt-1 h-2 w-2 rounded-full bg-orange-500" />

                <div>
                  <div className="text-[11px] font-medium uppercase tracking-wide text-orange-700">
                    Current Step
                  </div>
                  <div className="text-xs font-semibold text-gray-800">
                    {queue.current_step?.name ?? '—'}
                  </div>
                </div>
              </div>
            </div>
          )}
        />

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
          render={(_, record: QueueItem) => {
            //console.log(record.service_steps);

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
                children: record.service_steps?.map((step:Step, idx:number) => ({
                  key: `step-${idx}`,
                  label: step?.name,
                  onClick: () => handleAction('step', record),
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
