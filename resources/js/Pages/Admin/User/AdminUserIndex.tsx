import { User } from '@/types'
import { Head } from '@inertiajs/react'

import { FileAddOutlined, EditOutlined } from '@ant-design/icons';

import { Space, Table,
    Pagination, Button,
    MenuProps,
    Dropdown} from 'antd';


import { useEffect, useState } from 'react'
import axios from 'axios';
import ChangePassword from './partials/ChangePassword';
import AdminLayout from '@/Layouts/AdminLayout';
import CardTitle from '@/Components/CardTitle';
import { ArrowBigRight, KeySquare } from 'lucide-react';
import { ModalUserAddEdit } from './partials/ModalUserAddEdit';
import ModalRoleService from './partials/ModalRoleService';

const { Column } = Table;

interface PaginateResponse {
    data: User[],
    total: number;
}

const AdminUserIndex = () => {

    const [data, setData] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const [userOpen, setUserOpen] = useState(false); //for modal
    const [changePasswordOpen, setChangePasswordOpen] = useState(false);
    const [roleServiceOpen, setRoleServiceOpen] = useState(false);

	const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [user, setUser] = useState<User>({} as User);



    const createMenuItems = ( userData:User) => {

		const items: MenuProps['items'] = [];

		items.push({
			label: 'Edit',
			key: 'admin.posts-edit',
			icon: <EditOutlined />,
			onClick: () => handleEditClick(userData),
		},
    {
			label: 'Change Password',
			key: 'admin.users.change-password',
			icon: <KeySquare size={14}/>,
			onClick: () => {
          setUser(user)
          setChangePasswordOpen(true)
      },
    },
    {
			label: 'Assign Services',
			key: 'admin.users.assign-services',
			icon: <ArrowBigRight size={14}/>,
			onClick: () => {
        setUser(user)
        setRoleServiceOpen(true)
      },
    },
    );

		return items;
	}



	const loadDataAsync = async () => {

    setLoading(true)
    const params = [
        `perpage=${perPage}`,
        `page=${page}`
    ].join('&');

		try{
			const res = await axios.get<PaginateResponse>(`/admin/get-users?${params}`);
        setData(res.data.data)
        setTotal(res.data.total)
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    }

    useEffect(()=>{
        loadDataAsync()
    },[perPage, page])


    const onPageChange = (index:number, perPage:number) => {
      setPage(index)
      setPerPage(perPage)
    }



	const handClickNew = () => {
		setUser({} as User)
    setUserOpen(true)
  }

	const handleEditClick = ( nUser:User) => {
    setUser(nUser);
    setUserOpen(true)
	}

	// const handleDeleteClick = async (id:number) => {
	// 	const res = await axios.delete('/admin/users/{id}');
	// 	if(res.data.status === 'deleted'){
	// 		loadDataAsync()
	// 	}
	// }


	return (
		<>
			<Head title="User Management"></Head>

			<div className='flex mt-10 justify-center items-center'>
				{/* card */}
				<div className='p-6 w-full mx-2 bg-white shadow-sm rounded-md
					sm:w-[640px]
					md:w-[990px]'>
					{/* card header */}
                    <CardTitle title="LIST OF USERS" />

					{/* card body */}
					<div>
						<Table dataSource={data}
                            className='overflow-auto'
							loading={loading}
							rowKey={(data) => data.id}
							pagination={false}>

							<Column title="Id" dataIndex="id" key="id"/>
							<Column title="Username" dataIndex="username" key="username"/>
							<Column title="Last Name" key="lname" dataIndex="lname"/>
							<Column title="First Name" key="fname" dataIndex="fname"/>
							<Column title="Middle Name" key="mname" dataIndex="mname"/>
							<Column title="Email" dataIndex="email" key="email"/>
							<Column title="Role" dataIndex="role" key="role"/>
							{/* <Column title="Active" dataIndex="active" key="active" render={(_, active)=>(
								active ? (
									<span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES</span>
								) : (
									<span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
								)
							)}/> */}
							<Column title="Action" key="action"
								render={(_, user:User) => (
									// <Space size="small">
									// 	<Button type='text' icon={<EditOutlined/>}
									// 		onClick={ ()=> handleEditClick(data.id) } />
                                    //     <ModalRoleService user={data} onSuccess={loadDataAsync}/>
									// 	<ChangePassword data={data} onSuccess={loadDataAsync}/>
									// </Space>
                                    <Space size="small">
										<Dropdown  trigger={['click']}
											menu={{items: createMenuItems(user) }} >
											<Button >
												<Space>
												...
												</Space>
											</Button>

										</Dropdown>
									</Space>
								)}
							/>
						</Table>

						<Pagination className='mt-4'
							onChange={onPageChange}
							defaultCurrent={1}
							total={total} />

						<div className='flex flex-end mt-2'>
							<Button className='ml-auto'
								icon={<FileAddOutlined />}
								type="primary" onClick={handClickNew}>
								New
							</Button>
						</div>
					</div>
				</div>
				{/* card */}
			</div>

            <ModalUserAddEdit
                user={user}
                open={userOpen}
                onClose={()=>{
                    setUserOpen(false)
                }} onSuccess={()=>{
                    setUserOpen(false)
                    loadDataAsync()
                }}/>


            <ChangePassword data={user}
                open={changePasswordOpen}
                onClose={() => {
                    setChangePasswordOpen(false);
                }}
                onSuccess={() => {
                    setChangePasswordOpen(false);
                }}
            />

            <ModalRoleService
                user={user}
                open={roleServiceOpen}
                onClose={() => {
                    setRoleServiceOpen(false);
                }}
                onSuccess={() => {
                    setRoleServiceOpen(false);
                    loadDataAsync()
                }}
            />

        </>
	)
}

AdminUserIndex.layout =  (page:any) => <AdminLayout user={page.props.auth.user}>{page}</AdminLayout>

export default AdminUserIndex;
