import { Role } from '@/types'
import { Head } from '@inertiajs/react'

import {
    FileAddOutlined,
    DeleteOutlined, EditOutlined,
    QuestionCircleOutlined
} from '@ant-design/icons';

import {
    Space, Table,
    Pagination, Button, Modal,
    Input,
    App
} from 'antd';

import { useState } from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import AdminLayout from '@/Layouts/AdminLayout';
import CardTitle from '@/Components/CardTitle';
import ModalRoleAddEdit from './ModalRoleAddEdit';


const { Column } = Table;
const { Search } = Input;

const AdminRoleIndex = () => {

    const { notification } = App.useApp();
    const [open, setOpen] = useState(false); //for modal

    //const [perPage] = useState(10);

    const perPage=  10;
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');


    const [id, setId] = useState(0);


    const { data, isFetching, refetch } = useQuery({
        queryKey: ['roles', perPage, page],
        queryFn: async () => {
            const params = new URLSearchParams({
                perpage: perPage.toString(),
                search: search.toString(),
                page: page.toString(),
            })

            const res = await axios.get(`/admin/get-roles?${params}`);

            return res.data
        },
        refetchOnWindowFocus: false
    });

    const onPageChange = (index: number) => {
        setPage(index)
    }

    const handClickNew = () => {
        //router.visit('/');
        setId(0)
        setOpen(true)
    }

    const handleEditClick = (id: number) => {
        setId(id);
        setOpen(true)

    }


    const handleDeleteClick = async (id: number) => {
        const res = await axios.delete('/admin/roles/' + id);
        if (res.data.status === 'deleted') {
            notification.success({
                message: 'Deleted!',
                description: 'Role successfully deleted.',
                placement: 'bottomRight'
            })
            refetch()
        }
    }



    return (
        <>
            <Head title="Role Management"></Head>

            <div className='flex mt-10 justify-center items-center'>

                {/* card */}
                <div className='p-6 w-full overflow-auto mx-2 bg-white shadow-sm rounded-md
					md:w-[900px]
					sm:w-[740px]'>
                    {/* card header */}
                    <CardTitle title="LIST OF ROLES" />
                    {/* card body */}
                    <div>
                        <div className='mb-2'>
                            <Search placeholder="Search..."
                                autoComplete='off'
                                enterButton="Search"
                                size="large"
                                id="search"
                                onChange={(e) => setSearch(e.target.value)}
                                loading={isFetching}
                                onSearch={() => refetch()} />
                        </div>

                        <div className='flex flex-end my-4'>
                            <Button className='ml-auto'
                                icon={<FileAddOutlined />}
                                type="primary" onClick={handClickNew}>
                                New
                            </Button>
                        </div>

                        <Table dataSource={data ? data?.data : []}
                            loading={isFetching}
                            rowKey={(data) => data.id}
                            pagination={false}>

                            <Column title="Id" dataIndex="id" />
                            <Column title="Role" dataIndex="name" key="name" />
                            <Column title="Slug" dataIndex="slug" key="slug" />
                            <Column title="Description" dataIndex="description" key="description" />

                            <Column title="Action" key="action"
                                render={(_, data: Role) => (
                                    <Space size="small">
                                        <Button icon={<EditOutlined />} onClick={() => handleEditClick(data.id)} />

                                        <Button danger
                                            onClick={() => (
                                                Modal.confirm({
                                                    title: 'Delete?',
                                                    icon: <QuestionCircleOutlined />,
                                                    content: 'Are you sure you want to delete this role?',
                                                    okText: 'Yes',
                                                    cancelText: 'No',
                                                    onOk() {
                                                        handleDeleteClick(data.id)
                                                    }
                                                })
                                            )}
                                            icon={<DeleteOutlined />} />
                                    </Space>
                                )}
                            />
                        </Table>

                        <Pagination className='mt-4'
                            onChange={onPageChange}
                            pageSize={10}
                            defaultCurrent={1}
                            total={data?.total} />

                    </div>
                </div>
                {/* card */}

            </div>


            <ModalRoleAddEdit
                id={id}
                isOpen={open}
                refetch={refetch}
                onCancel={()=>setOpen(false)}
                closeModal={(value)=>{
                    setOpen(!value)

                }}
            />


        </>
    )
}


AdminRoleIndex.layout = (page: any) => <AdminLayout user={page.props.auth.user}>{page}</AdminLayout>
export default AdminRoleIndex;
