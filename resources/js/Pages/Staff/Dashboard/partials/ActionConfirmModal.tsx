import { Modal, Button, App } from 'antd'
import { useState } from 'react'

type ActionConfirmModalProps = {
  open: boolean
  action: 'processing' | 'completed'
  onConfirm: () => Promise<void>
  onCancel: () => void
  itemRef: string // queue reference for display
}

export default function ActionConfirmModal({
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
      await onConfirm()
      notification.success({
        message: `Queue ${action === 'processing' ? 'started' : 'completed'}!`,
        description: `Queue ${itemRef} successfully ${action === 'processing' ? 'started processing' : 'marked as completed'}.`,
        placement: 'bottomRight',
      })
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
