import { Table, Dropdown, Button, Tag, MenuProps, App, Pagination } from 'antd'
import { MoreOutlined, EyeOutlined, SyncOutlined, CheckOutlined } from '@ant-design/icons'
import { useState } from 'react'
import QueueDetailsDrawer from './QueueDetailsDrawer'
import { Footprints } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Column from 'antd/es/table/Column'
import { QueueItem, Step } from '@/types'
import QueueFilterBar from './QueueFilterBar'


export type QueueFilters = {
  search: string
  status: string | null
  priority: string | null
}

export default function QueueTable() {

  const { notification } = App.useApp();

  const [selected, setSelected] = useState<QueueItem | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuLoading, setMenuLoading] = useState(false);
  const [page, setPage] = useState(1);


  const { data, isFetching, refetch } = useQuery({
    queryKey: ['queues', page],
    queryFn: async() => {
      const params = new URLSearchParams({
        page: page.toString()
      })
      const res = await axios.get(`/staff/get-queues?${params}`)
      return res.data
    },
  })


    const handleFilterChange = (filters: QueueFilters) => {
      console.log('Filters:', filters)
      // later: pass to table or backend
    }


  const handleAction = (type: string, queue: QueueItem) => {
    //console.log(queue);
    if (type === 'view') {
      setSelected(queue)
      setDrawerOpen(true)
    } else if (type === 'processing') {
      startProcessing(queue)
    }
    else if (type === 'completed') {
      markAsCompleted(queue)
    }

  }

  const startProcessing = async (queue: QueueItem) => {
    setMenuLoading(true)
    await axios.post('/staff/queue/start-processing/' + queue.id).then(res => {
      if(res.data.status === 'process') {
         notification.success({
          description: `Queue ${queue.queue_number} successfully started processing.`,
          placement: 'bottomRight',
          message: 'Process Started',
        })
      }
      setMenuLoading(false)
      refetch()
    })
  }

  const markAsCompleted = async (queue: QueueItem) => {
    setMenuLoading(true)
    await axios.post('/staff/queue/mark-completed/' + queue.id).then(res => {
      if(res.data.status === 'complete') {
         notification.success({
          description: `Queue ${queue.queue_number} successfully completed.`,
          placement: 'bottomRight',
          message: 'Process Completed',
        })
      }
      setMenuLoading(false)
      refetch()
    })
  }

   const handleMoveStep = async (queue: QueueItem, step:Step) => {

    setMenuLoading(true)
    await axios.post('/staff/queue/move-to-step/' + queue.id, {
      current_step_id: step.id
    }).then(res => {
      if(res.data.status === 'moved') {
         notification.success({
          description: `Queue ${queue.queue_number} step moved successfully.`,
          placement: 'bottomRight',
          message: 'Move Successfully',
        })
      }
      setMenuLoading(false)
      refetch()
    })
  }

  return (
    <>

      <QueueFilterBar onChange={handleFilterChange} onRefresh={refetch}/>

      <Table
        dataSource={data ? data?.data : []}
        className='overflow-auto'
        loading={isFetching}
        rowKey={(data) => data.id}
        pagination={false}
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
                disabled: record.status === 'completed' || record.status === 'waiting',
                children: record.service_steps?.map((step:Step, idx:number) => ({
                  key: `step-${idx}`,
                  label: step?.name,
                  onClick: () => handleMoveStep(record, step),
                })),
              },
            ]

            return (
              <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                <Button loading={menuLoading} type="text" icon={<MoreOutlined />} />
              </Dropdown>
            )
          }}
        />

       </Table>

       <div className="flex">
          <Pagination
            className="ml-auto"
            onChange={(value) => {
              setPage(value)
            }}
            defaultCurrent={1}
            pageSize={data ? data?.per_page : 10}
            total={data?.total}
          />
        </div>

      {/* Drawer for View Details */}
      {selected && (
        <QueueDetailsDrawer
          onRefresh={()=> {
            refetch()
          }}
          open={drawerOpen}
          data={selected}
          onClose={() => setDrawerOpen(false)}
        />
      )}
    </>
  )
}
