import { Modal, App } from 'antd'
import axios from 'axios'
import { useState } from 'react'

type ActionConfirmModalProps = {
  id?: number
  open: boolean
  action: 'processing' | 'completed'
  onConfirm: () => Promise<void>
  onCancel: () => void
  itemRef: string // queue reference for display
}

export default function ActionConfirmModal({
  id,
  open,
  action,
  onConfirm,
  onCancel,
  itemRef,
}: ActionConfirmModalProps) {
  const [loading, setLoading] = useState(false)
  const { notification } = App.useApp()

  const handleConfirm = async () => {
    setLoading(true)
    try {
      onConfirm()
      if(action === 'processing') {
        await axios.post('/staff/queue/start-processing/' +  id).then(res => {
          if(res.data.status === 'process') {
            notification.success({
              description: `Queue ${itemRef} successfully started processing.`,
              placement: 'bottomRight',
              message: 'Process Started',
            })
          }
        })
      }else if (action === 'completed') {
        await axios.post('/staff/queue/mark-completed/' + id).then(res => {
          if(res.data.status === 'completed') {
             notification.success({
              description: `Queue ${itemRef} successfully completed.`,
              placement: 'bottomRight',
              message: 'Process Completed',
            })
          }
        })
      }

      setLoading(false)
      onCancel()
    } catch (err) {
      notification.error({
        message: 'Error',
        description: 'Something went wrong. Please try again.',
        placement: 'bottomRight',
      })
      setLoading(false)
    }
  }

  return (
    <Modal
      open={open}
      title="Confirm Action"
      okText={action === 'processing' ? 'Start Processing' : 'Mark Completed'}
      cancelText="Cancel"
      okButtonProps={{ loading }}
      onOk={handleConfirm}
      onCancel={onCancel}
      centered
      maskClosable={false}
    >
      <p>
        Are you sure you want to{' '}
        <strong>
          {action === 'processing' ? 'start processing' : 'mark as completed'}
        </strong>{' '}
        queue <strong>{itemRef}</strong>?
      </p>
    </Modal>
  )
}
