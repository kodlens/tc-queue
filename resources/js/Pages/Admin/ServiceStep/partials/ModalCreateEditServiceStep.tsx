import { Service } from '@/types'
import { Modal, Form, Input, Checkbox, Select } from 'antd'
import { useState, useEffect } from 'react'

type Props = {
  open: boolean
  form: any
  errors: any
  id: number | null
  closeModal: () => void
  onFinish: (values: any) => void
}



const ModalCreateEditServiceStep = ( { open, form, errors, id, closeModal, onFinish }: Props ) => {

  const [loading, setLoading] = useState(false)
  const [services, setServices] = useState<Service[]>([])

  const loadServices = async () => {
    setLoading(true)
    try {
      const res = await fetch('/admin/get-services')
      const data = await res.json()
      setServices(data.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error('Failed to load services:', error)
    }
  }

  useEffect(() => {
    if (open) {
      loadServices()
    }
  }, [open])


  return (
    <Modal
        open={open}
        title={id ? 'Edit Service Step' : 'New Service Step'}
        okText={id ? 'Update Service Step' : 'Create Service Step'}
        cancelText="Cancel"
        confirmLoading={loading}
        onCancel={closeModal}
        maskClosable={false}
        width={560}
        okButtonProps={{ htmlType: 'submit' }}
        destroyOnHidden
        modalRender={(dom) => (
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ active: true }}
            disabled={loading}
          >
            {dom}
          </Form>
        )}
      >

         <Form.Item
          name="service_id"
          label="Service Name"
          validateStatus={errors.service_id ? 'error' : ''}
          help={errors.service_id?.[0]}
          rules={[{ required: true, message: 'Service name is required.' }]}
        >
          <Select
            placeholder="Select a service"
            options={services.map((service) => ({
              label: service.name,
              value: service.id
            }))}
          />

        </Form.Item>

        <Form.Item
          name="name"
          label="Service Step Name"
          validateStatus={errors.name ? 'error' : ''}
          help={errors.name?.[0]}
          rules={[{ required: true, message: 'Service step name is required.' }]}
        >
          <Input placeholder="Service step name" />
        </Form.Item>

        <Form.Item
          name="step_order"
          label="Step Order"
          validateStatus={errors.step_order ? 'error' : ''}
          help={errors.step_order?.[0]}
        >
          <Input type='number' placeholder='e.g. 1' />
        </Form.Item>

        <Form.Item
          name="sla_minutes"
          label="SLA (minutes)"
          validateStatus={errors.sla_minutes ? 'error' : ''}
          help={errors.sla_minutes?.[0]}
        >
          <Input type='number' placeholder='e.g. 10' />
        </Form.Item>

        <Form.Item name="active" valuePropName="checked">
          <Checkbox>Active</Checkbox>
        </Form.Item>
      </Modal>
  )
}

export default ModalCreateEditServiceStep
