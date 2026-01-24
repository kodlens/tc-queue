import { App, Button, Form, Modal, Pagination, Space, Table } from 'antd'
import { useState } from 'react'

import { EditOutlined } from '@ant-design/icons';
import { Service, User } from '@/types';
import axios from 'axios';
import { ArrowRightFromLine, Server } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Column from 'antd/es/table/Column';

interface Props {
  user: User;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ModalRoleService({ user, open, onClose, onSuccess }: Props) {

  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [page, setPage] = useState<number>(1)

  const [form] = Form.useForm();
  const { notification, } = App.useApp();

  function onFinish(values: any): void {
    setLoading(true)
    axios.post('/admin/get-services')
      .then(res => {
        if (res.data.status === 'success') {
          notification.info({ message: "Service successfully assigned.", duration: 2, showProgress: true })
        }
        setLoading(false)

      }).catch(err => {
        if (err.response.status === 422)
          setErrors(err.response.data.errors)

        setLoading(false)
      })
  }

  const { data, isFetching } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await axios.get('/admin/get-services')
      return res.data
    },
    refetchOnWindowFocus: false
  })

  return (
    <>
      <Modal
        open={open}
        title="SELECT SERVICE"
        width={640}
        onCancel={() => onClose() }
        destroyOnHidden
        footer={null}
      >

      <Table dataSource={data ? data?.data : []}
        loading={isFetching}
        rowKey={(data) => data.id}
        pagination={false}>

        <Column title="Id" dataIndex="id" />
        <Column title="Role" dataIndex="name" key="name" />
        <Column title="Slug" dataIndex="slug" key="slug" />
        <Column title="Action" key="action"
          render={(_, data: Service) => (
            <Space size="small">
              <Button icon={<ArrowRightFromLine size={16} />} onClick={() => {

              }} />
            </Space>
          )}
        />
      </Table>

      <Pagination className='mt-4'
        onChange={(page:number)=>{
          setPage(page)
        }}
        pageSize={10}
        defaultCurrent={1}
        total={data?.total} />

      </Modal>
    </>
  )
}
