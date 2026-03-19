import { Service } from '@/types'
import { Head } from '@inertiajs/react'
import {
  DeleteOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import {
  Space,
  Table,
  Pagination,
  Button,
  Form,
  Input,
  Tag,
  App,
  Tooltip,
  Typography,
  Empty,
} from 'antd'
import { useState } from 'react'
import axios from 'axios'
import AdminLayout from '@/Layouts/AdminLayout'
import CardTitle from '@/Components/CardTitle'
import { useQuery } from '@tanstack/react-query'

const { Column } = Table
const { Text } = Typography

const PER_PAGE = 10

const AdminQueueIndex = () => {
  const { notification, modal } = App.useApp()

  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [client, setClient] = useState('')


  /* ================= QUERY ================= */
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['queues', page, PER_PAGE],
    queryFn: async () => {
      const params = {
        perpage: PER_PAGE,
        page,
        search,
        client
      }
      const res = await axios.get('/admin/get-queues', { params })
      return res.data
    },
    refetchOnWindowFocus: false,
  })




  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/admin/services/${id}`)
      notification.success({
        message: 'Deleted',
        description: 'Service successfully deleted.',
        placement: 'topRight',
      })
      refetch()
    } catch {
      notification.error({
        message: 'Delete failed',
        description: 'Unable to delete this service right now.',
        placement: 'bottomRight',
      })
    }
  }


  /* ================= RENDER ================= */
  return (
    <>
      <Head title="Services Management" />

      <div className="flex justify-center mt-10">
        <div className="w-full max-w-6xl bg-white p-6 rounded-2xl shadow-sm mx-3 border border-slate-100">
          <CardTitle title="LIST OF QUEUES" />
          <div className="mb-4 mt-1">
            <Text type="secondary">
              Manage service offerings, availability, and descriptions from one place.
            </Text>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            <Input
              placeholder="Search queue no..."
              allowClear
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter'){
                  refetch()
                }
              }}
              className="w-full md:w-[360px]"
            />

            <Input
              placeholder="Search Client name..."
              allowClear
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClient(e.target.value)}
              onKeyDown={(e) => {
                if(e.key === 'Enter'){
                  refetch()
                }
              }}
              className="w-full md:w-[360px]"
            />

            <Button
              icon={<ReloadOutlined />}
              onClick={() => refetch()}
              loading={isFetching}
            >
              Refresh
            </Button>
            <Text className="text-slate-500 text-sm md:ml-2">
              {data?.total ?? 0} total services
            </Text>

          </div>

          {/* Table */}
          <Table
            dataSource={data?.data ?? []}
            rowKey="id"
            loading={isFetching}
            pagination={false}
            size="middle"
            scroll={{ x: 760 }}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No services found"
                />
              ),
            }}
          >
            {/* <Column title="ID" dataIndex="id" width={80} /> */}
            <Column title="Queue No" dataIndex="queue_number" />
            <Column title="Client Name" dataIndex="client_name" />
            <Column title="Service" dataIndex={['service', 'name']} />
            <Column title="Requesting Office" dataIndex="requesting_office"/>
            {/* <Column
              title="Description"
              dataIndex="description"
              render={(description: string) => (
                <Tooltip title={description || '-'}>
                  <span className="block max-w-[380px] truncate">{description || '-'}</span>
                </Tooltip>
              )}
            /> */}
            <Column
              title="Status"
              dataIndex="status"
              render={(status) =>
                status === 'waiting' ? (
                  <Tag color="orange">WAITING</Tag>
                ) : status === 'processing' ? (
                  <Tag color="blue">IN PROGRESS</Tag>
                ) : status === 'completed' ? (
                  <Tag color="orange">COMPLETED</Tag>
                ) : status === 'claimed' ? (
                  <Tag color="green">CLAIMED</Tag>
                ) : null
              }
            />
            <Column
              title="Action"
              width={140}
              render={(_, record: Service) => (
                <Space>
                  {/* <Tooltip title="Edit service">
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => openEdit(record.id)}
                    />
                  </Tooltip> */}
                  <Tooltip title="Delete service">
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() =>
                        modal.confirm({
                          title: 'Delete service?',
                          icon: <QuestionCircleOutlined />,
                          content: 'This action cannot be undone.',
                          okText: 'Delete',
                          okButtonProps: { danger: true },
                          onOk: () => handleDelete(record.id),
                        })
                      }
                    />
                  </Tooltip>
                </Space>
              )}
            />
          </Table>

          {/* Pagination */}
          <div className="flex justify-end mt-4">
            <Pagination
              current={page}
              pageSize={PER_PAGE}
              total={data?.total}
              onChange={setPage}
              showTotal={(total, range) => `${range[0]}-${range[1]} of ${total}`}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>

     
    </>
  )
}

AdminQueueIndex.layout = (page: any) => (
  <AdminLayout user={page.props.auth.user}>{page}</AdminLayout>
)

export default AdminQueueIndex
