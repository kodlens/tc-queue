import { App, Button, Input, Modal, Pagination, Space, Table } from 'antd'
import { useEffect, useState } from 'react'

import { Service, User } from '@/types';
import axios from 'axios';
import { ArrowRightFromLine } from 'lucide-react';
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
  const [page, setPage] = useState<number>(1)
  const [search, setSearch] = useState<string>('')
  const { notification, } = App.useApp();

  function assignService(values: Service): void {
    setLoading(true)
    axios.post('/admin/users-assign-service/' + user.id, values)
      .then(res => {
        if (res.data.status === 'assigned') {
          notification.success({ message: "Service successfully assigned.", duration: 2, showProgress: true })
        }
        setLoading(false)
        onSuccess()

      }).catch(err => {
        notification.error({ message: err.response.data.message, duration: 2, showProgress: true })
        setLoading(false)
        onSuccess()
      })
  }

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['services', search],
    queryFn: async () => {
      const params = new URLSearchParams({
        perpage: '10',
        search: search.toString(),
        page: page.toString(),
      })
      const res = await axios.get(`/admin/get-services?${params}`)
      return res.data
    },
    refetchOnWindowFocus: false
  })

  const handleDelete = (id: number) => () => {
    axios.delete('/admin/users-unassign-service/' + id).then(res => {
      if (res.data.status === 'unassigned') {
        notification.success({ message: "Service successfully unassigned.", duration: 2, showProgress: true })
      }
      onSuccess()
    })
  }

  return (
    <>
      <Modal
        open={open}
        title="SELECT SERVICE"
        width={640}
        onCancel={() => onClose()}
        destroyOnHidden
        footer={null}
      >

        <div className='my-6'>
          {Array.isArray(user.services) && (
            <>
              <div className='font-bold'>Assigned Services</div>
              {user.services.length > 0 && (
                user.services.map((service: any) => (
                  <div key={service.id} className='flex text-sm p-2 bg-gray-100 m-2'>{service.service.name}
                    <Button size='small' className='ml-auto' danger onClick={handleDelete(service.id)}>x</Button>
                  </div>
                ))
              )}
            </>
          )}

        </div>

        <Input.Search placeholder="Search" onSearch={(value) => {
          setSearch(value)
        }} enterButton />

        <Table dataSource={data ? data?.data : []}
          loading={isFetching}
          rowKey={(data) => data.id}
          pagination={false}>

          <Column title="Id" dataIndex="id" />
          <Column title="Role" dataIndex="name" key="name" />
          {/* <Column title="Slug" dataIndex="slug" key="slug" /> */}
          <Column title="Action" key="action"
            render={(_, data: Service) => (
              <Space size="small">
                <Button loading={loading}
                  icon={<ArrowRightFromLine size={16} />}
                  onClick={() => assignService(data)} />
              </Space>
            )}
          />
        </Table>

        <Pagination className='mt-4'
          onChange={(page: number) => {
            setPage(page)
          }}
          pageSize={10}
          defaultCurrent={1}
          total={data?.total} />

      </Modal>
    </>
  )
}
