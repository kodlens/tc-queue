import { Service } from '@/types'
import { Head } from '@inertiajs/react'
import {
  FileAddOutlined,
  DeleteOutlined,
  EditOutlined,
  QuestionCircleOutlined,
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
} from 'antd'
import { useState } from 'react'
import axios from 'axios'
import AdminLayout from '@/Layouts/AdminLayout'
import CardTitle from '@/Components/CardTitle'
import { useQuery } from '@tanstack/react-query'

const { Column } = Table
const { Search } = Input

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

    const res = await axios.get(`/admin/services/${id}`)
    form.setFieldsValue({
      name: res.data.name,
      description: res.data.description,
      active: !!res.data.active,
    })
  }

  const closeModal = () => {
    setOpen(false)
    setErrors({})
    form.resetFields()
  }

  /* ================= DELETE ================= */
  const handleDelete = async (id: number) => {
    await axios.delete(`/admin/services/${id}`)
    notification.success({
      message: 'Deleted',
      description: 'Service successfully deleted.',
      placement: 'bottomRight',
    })
    refetch()
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
        <div className="w-full max-w-5xl bg-white p-6 rounded-xl shadow-sm mx-3">

          <CardTitle title="LIST OF SERVICES" />

          {/* Toolbar */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Search
              placeholder="Search services..."
              allowClear
              onSearch={(v) => {
                setPage(1)
                setSearch(v)
              }}
              loading={isFetching}
              className="max-w-sm"
            />

            <Button
              type="primary"
              icon={<FileAddOutlined />}
              className="ml-auto"
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
            locale={{ emptyText: 'No services found' }}
          >
            <Column title="ID" dataIndex="id" width={80} />
            <Column title="Service" dataIndex="name" />
            <Column title="Description" dataIndex="description" />
            <Column
              title="Status"
              dataIndex="active"
              render={(active) =>
                active ? <Tag color="green">ACTIVE</Tag> : <Tag color="red">INACTIVE</Tag>
              }
            />
            <Column
              title="Action"
              width={120}
              render={(_, record: Service) => (
                <Space>
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => openEdit(record.id)}
                  />
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() =>
                      modal.confirm({
                        title: 'Delete service?',
                        icon: <QuestionCircleOutlined />,
                        content: 'This action cannot be undone.',
                        onOk: () => handleDelete(record.id),
                      })
                    }
                  />
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
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={open}
        title={id ? 'Edit Service' : 'New Service'}
        okText="Save"
        cancelText="Cancel"
        confirmLoading={saving}
        onCancel={closeModal}
        okButtonProps={{ htmlType: 'submit' }}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ active: true }}
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
        >
          <Input placeholder="Service name" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          validateStatus={errors.description ? 'error' : ''}
          help={errors.description?.[0]}
        >
          <Input.TextArea rows={3} />
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
