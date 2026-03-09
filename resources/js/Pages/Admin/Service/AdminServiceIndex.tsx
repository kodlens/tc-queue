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
  Modal,
  Pagination,
  Button,
  Form,
  Input,
  Checkbox,
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
const { Search } = Input
const { Text } = Typography

const PER_PAGE = 10

const AdminServiceIndex = () => {
  const [form] = Form.useForm()
  const { notification, modal } = App.useApp()

  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [errors, setErrors] = useState<any>({})
  const [id, setId] = useState<number | null>(null)
  const [loadingForm, setLoadingForm] = useState(false)

  /* ================= QUERY ================= */
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['services', page, PER_PAGE, search],
    queryFn: async () => {
      const params = {
        perpage: PER_PAGE,
        page,
        search,
      }
      const res = await axios.get('/admin/get-services', { params })
      return res.data
    },
    refetchOnWindowFocus: false,
  })

  /* ================= MODAL HANDLERS ================= */
  const openNew = () => {
    setId(null)
    setErrors({})
    form.resetFields()
    setOpen(true)
  }

  const openEdit = async (id: number) => {
    setId(id)
    setErrors({})
    setOpen(true)
    setLoadingForm(true)

    try {
      const res = await axios.get(`/admin/services/${id}`)
      form.setFieldsValue({
        name: res.data.name,
        description: res.data.description,
        active: !!res.data.active,
      })
    } finally {
      setLoadingForm(false)
    }
  }

  const closeModal = () => {
    setOpen(false)
    setErrors({})
    form.resetFields()
    setLoadingForm(false)
  }

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/admin/services/${id}`)
      notification.success({
        message: 'Deleted',
        description: 'Service successfully deleted.',
        placement: 'bottomRight',
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

  /* ================= SAVE ================= */
  const onFinish = async (values: Service) => {
    try {
      setSaving(true)
      setErrors({})

      if (id) {
        await axios.put(`/admin/services/${id}`, values)
        notification.success({ message: 'Updated successfully' })
      } else {
        await axios.post('/admin/services', values)
        notification.success({ message: 'Saved successfully' })
      }

      closeModal()
      refetch()
    } catch (err: any) {
      if (err.response?.status === 422) {
        const serverErrors = err.response.data.errors
        setErrors(serverErrors)

        const firstError = Object.keys(serverErrors)[0]
        form.scrollToField(firstError)
      } else {
        notification.error({
          message: 'Save failed',
          description: 'Unable to save service right now.',
          placement: 'bottomRight',
        })
      }
    } finally {
      setSaving(false)
    }
  }

  /* ================= RENDER ================= */
  return (
    <>
      <Head title="Services Management" />

      <div className="flex justify-center mt-10">
        <div className="w-full max-w-6xl bg-white p-6 rounded-2xl shadow-sm mx-3 border border-slate-100">
          <CardTitle title="LIST OF SERVICES" />
          <div className="mb-4 mt-1">
            <Text type="secondary">
              Manage service offerings, availability, and descriptions from one place.
            </Text>
          </div>

          {/* Toolbar */}
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
              className="md:ml-auto"
              onClick={openNew}
            >
              New Service
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
            <Column title="Service" dataIndex="name" />
            <Column
              title="Description"
              dataIndex="description"
              render={(description: string) => (
                <Tooltip title={description || '-'}>
                  <span className="block max-w-[380px] truncate">{description || '-'}</span>
                </Tooltip>
              )}
            />
            <Column
              title="Status"
              dataIndex="active"
              render={(active) =>
                active ? (
                  <Tag color="success">ACTIVE</Tag>
                ) : (
                  <Tag color="default">INACTIVE</Tag>
                )
              }
            />
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
      <Modal
        open={open}
        title={id ? 'Edit Service' : 'New Service'}
        okText={id ? 'Update Service' : 'Create Service'}
        cancelText="Cancel"
        confirmLoading={saving || loadingForm}
        onCancel={closeModal}
        maskClosable={false}
        width={560}
        okButtonProps={{ htmlType: 'submit' }}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ active: true }}
            disabled={loadingForm}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          name="name"
          label="Service Name"
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.[0]}
          rules={[{ required: true, message: 'Service name is required.' }]}
        >
          <Input placeholder="Service name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          validateStatus={errors.description ? 'error' : ''}
          help={errors.description?.[0]}
          rules={[{ required: true, message: 'Description is required.' }]}
        >
          <Input.TextArea rows={4} showCount maxLength={250} />
        </Form.Item>

        <Form.Item name="active" valuePropName="checked">
          <Checkbox>Active</Checkbox>
        </Form.Item>
      </Modal>
    </>
  )
}

AdminServiceIndex.layout = (page: any) => (
  <AdminLayout user={page.props.auth.user}>{page}</AdminLayout>
)

export default AdminServiceIndex
