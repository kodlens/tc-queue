import { Table, Dropdown, Button, Tag, MenuProps, App, Pagination, Input, Select } from 'antd'
import { MoreOutlined, EyeOutlined, SyncOutlined, CheckOutlined, SearchOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { Footprints, Mail } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Column from 'antd/es/table/Column'
import { QueueItem, Step } from '@/types'
import QueueDetailsDrawer from './QueueDetailsDrawer'


export type QueueFilters = {
  queue: string
  status: string | null
}

type Props = {
  status: 'waiting' | 'processing' | 'claimed' | 'completed' | 'pending'
}

export default function QueueTableWithStatus({ status }: Props) {

  const { notification } = App.useApp();

  const [selected, setSelected] = useState<QueueItem | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuLoading, setMenuLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState<QueueFilters>({ queue: '', status: status});


  const { data, isFetching, refetch } = useQuery({
    queryKey: ['queues', page],
    queryFn: async() => {
      const params = new URLSearchParams({
        page: page.toString(),
        queue: (search?.queue ?? '').toString(),
        status: search?.status || '',
      })
      const res = await axios.get(`/staff/get-queues?${params}`)
      return res.data
    },
  })




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
    else if(type === 'claimed') {
      markClaimed(queue)
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

  const markClaimed = async(queue: QueueItem) => {
    setMenuLoading(true)
    await axios.post('/staff/queue/mark-claimed/' + queue.id).then(res => {
      if(res.data.status === 'claimed') {
         notification.success({
          description: `Queue ${queue.queue_number} marked as claimed successfully.`,
          placement: 'bottomRight',
          message: 'Marked Claimed',
        })
      }
      setMenuLoading(false)
      refetch()
    })
  }

  return (
    <>

      <div className="flex mb-4 gap-3 p-4 bg-white rounded-md shadow">

        <Input
          allowClear
          placeholder="Search queue #, user, service"
          prefix={<SearchOutlined />}
          value={search?.queue || ''}
          onChange={(e) => setSearch({ ...search, queue: e.target.value })}
          style={{ width: 260 }}
        />

        <Button
          className='justify-end'
          icon={<SearchOutlined />}
          onClick={() => {refetch()}}>
          Search
        </Button>

      </div>

      <div className='bg-white rounded-md shadow p-4'>
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
                    : status === 'claimed'
                    ? 'green'
                    : status === 'pending'
                    ? 'orange'
                    : 'red'
                }
              >
                {status.toUpperCase()}
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
                  key: 'set-step',
                  icon: <Footprints size={15} />,
                  label: 'Set Step',
                  disabled: record.status === 'completed' || record.status === 'waiting',
                  children: record.service_steps?.map((step:Step) => ({
                    key: `step-${step.id}`,
                    label: step?.name,
                    onClick: () => handleMoveStep(record, step),
                  }))
                },
                {
                  key: 'completed',
                  label: 'Mark Completed',
                  icon: <CheckOutlined />,
                  disabled: record.status !== 'processing',
                  onClick: () => handleAction('completed', record),
                },
                {
                  key: 'claimed',
                  label: 'Claimed',
                  icon: <Mail size={15}/>,
                  disabled: record.status === 'claimed' || record.status === 'waiting' || record.status === 'processing',
                  onClick: () => handleAction('claimed', record),
                },
              ]

              return (
                <Dropdown menu={{ items: menuItems,  selectedKeys: [`step-${record.current_step?.id}`] }} trigger={['click']}>
                  <Button loading={menuLoading} type="text" icon={<MoreOutlined />} />
                </Dropdown>
              )
            }}
          />

        </Table>

        <div className="flex mt-4 justify-end">
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
