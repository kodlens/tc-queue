import { Service } from '@/types'
import { Head } from '@inertiajs/react'
import {
  FileAddOutlined,
  DeleteOutlined,
  EditOutlined,
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

  App,
  Tooltip,
  Typography,
  Empty,
  Select,
} from 'antd'
import { useState } from 'react'
import axios from 'axios'
import AdminLayout from '@/Layouts/AdminLayout'
import CardTitle from '@/Components/CardTitle'
import { useQuery } from '@tanstack/react-query'
import ModalCreateEditServiceStep from './partials/ModalCreateEditServiceStep'

const { Column } = Table
const { Search } = Input
const { Text } = Typography

const PER_PAGE = 10

const AdminServiceStepIndex = ( { services }: { services: Service[] }) => {
  const [form] = Form.useForm()
  const { notification, modal } = App.useApp()

  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [errors, setErrors] = useState<any>({})
  const [id, setId] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [filterServices, setFilterServices] = useState<number>(0)


  /* ================= QUERY ================= */
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['service-steps', page, PER_PAGE, search, filterServices],
    queryFn: async () => {
      const params = {
        perpage: PER_PAGE,
        page,
        search,
        services: filterServices,
      }
      const res = await axios.get('/admin/get-service-steps', { params })
      return res.data
    },
    refetchOnWindowFocus: false,
  })

  /* ================= MODAL HANDLERS ================= */
  const openNew = () => {
    setId(0)
    setErrors({})
    form.resetFields()
    setOpen(true)
  }

  const openEdit = async (id: number) => {
    setId(id)
    setErrors({})
    setOpen(true)

    try {
      const res = await axios.get(`/admin/service-steps/${id}`)
      form.setFieldsValue({
        name: res.data.name,
        description: res.data.description,
        active: !!res.data.active,
      })
    } finally {
    }
  }

  const closeModal = () => {
    setOpen(false)
    setErrors({})
    form.resetFields()
  }

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    setLoading(true)
    try {
      await axios.delete(`/admin/service-steps/${id}`).then(res => {
        setLoading(false)
        if(res.data.status === 'deleted') {
          notification.success({ message: 'Deleted successfully' })
        } else {
          notification.error({ message: 'Delete failed', description: res.data.message })
        }
      })
      refetch()
    } catch {
      setLoading(false)
      notification.error({
        message: 'Delete failed',
        description: 'Unable to delete this service step right now.',
        placement: 'bottomRight',
      })
    }
  }

  /* ================= SAVE ================= */
  const onFinish = async (values: Service) => {
    try {
      setLoading(true)
      setErrors({})

      if (id > 0) {
        await axios.put(`/admin/service-steps/${id}`, values).then(res => {
          setLoading(false)
          if(res.data.status === 'updated') {
            notification.success({ message: 'Updated successfully' })
            closeModal()
            refetch()
          } else {
            notification.error({ message: 'Update failed', description: res.data.message })
          }
        })
      } else {
        await axios.post('/admin/service-steps', values).then(res => {
          setLoading(false)

          if(res.data.status === 'saved') {
            notification.success({ message: 'Created successfully' })
            closeModal()
            refetch()
          } else {
            notification.error({ message: 'Creation failed', description: res.data.message })
          }
        })
      }
    
    } catch (err: any) {
      setLoading(false)

      if (err.response?.status === 422) {
        const serverErrors = err.response.data.errors
        setErrors(serverErrors)

        const firstError = Object.keys(serverErrors)[0]
        form.scrollToField(firstError)
      } else {
        notification.error({
          message: 'Save failed',
          description: 'Unable to save service step right now.',
          placement: 'bottomRight',
        })
      }
    } 
  }

  const onChangeService = (value: number) => {
    setFilterServices(value)
  }

  /* ================= RENDER ================= */
  return (
    <>
      <Head title="Service Step Management" />

      <div className="flex justify-center mt-10">
        <div className="w-full max-w-6xl bg-white p-6 rounded-2xl shadow-sm mx-3 border border-slate-100">
          <CardTitle title="LIST OF SERVICE STEPS" />
          <div className="mb-4 mt-1">
            <Text type="secondary">
              Manage service offerings, availability, and descriptions from one place.
            </Text>
          </div>

          {/* Toolbar */}
          <div className='font-bold'>
            Select Service
          </div>
          <div className='my-2'>
            <Select className='w-full' options={services.map(item => ({
              label: item.name,
              value: item.id,
            }))} 
            onChange={onChangeService} allowClear/>
          </div>
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            <Search
              placeholder="Search services..."
              allowClear
              onSearch={(v) => {
                setPage(1)
                setSearch(v)
              }}
              enterButton={<SearchOutlined />}
              loading={isFetching}
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

            <Button
              type="primary"
              icon={<FileAddOutlined />}
              loading={loading}
              className="md:ml-auto"
              onClick={openNew}
            >
              New Service Step
            </Button>
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
            <Column title="ID" dataIndex="id" width={80} />
            <Column title="Service" dataIndex="service.code"
              render={(_, record) => (
                <Tooltip title={record.service?.name || '-'}>
                  <span className="block max-w-[380px] truncate">{record.service?.code || '-'}</span>
                </Tooltip>
              )}
            />
            <Column
              title="Description"
              dataIndex="description"
              render={(_, record) => (
                <Tooltip title={record.name || '-'}>
                  <span className="block max-w-[380px] truncate">{record.name || '-'}</span>
                </Tooltip>
              )}
            />
            {/* <Column
              title="Status"
              dataIndex="active"
              render={(active) =>
                active ? (
                  <Tag color="success">ACTIVE</Tag>
                ) : (
                  <Tag color="default">INACTIVE</Tag>
                )
              }
            /> */}
            <Column
              title="Action"
              width={140}
              render={(_, record: Service) => (
                <Space>
                  <Tooltip title="Edit service">
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => openEdit(record.id)}
                    />
                  </Tooltip>
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

      {/* Modal */}
      <ModalCreateEditServiceStep
        open={open}
        form={form}
        id={id}
        errors={errors}
        closeModal={closeModal}
        onFinish={onFinish} />
    </>
  )
}

AdminServiceStepIndex.layout = (page: any) => (
  <AdminLayout user={page.props.auth.user}>{page}</AdminLayout>
)

export default AdminServiceStepIndex
