import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Service, PageProps, User } from '@/types'
import { Head } from '@inertiajs/react'

import { FileAddOutlined,
    DeleteOutlined, EditOutlined,
    QuestionCircleOutlined } from '@ant-design/icons';

import { Card, Space, Table, Modal,
    Pagination, Button,
    Form, Input, Select, Checkbox,
	App} from 'antd';


import { useState } from 'react'
import axios from 'axios';
import AdminLayout from '@/Layouts/AdminLayout';
import CardTitle from '@/Components/CardTitle';
import { useQuery } from '@tanstack/react-query';

const { Column } = Table;
const { Search } = Input;

const AdminServiceIndex = () => {

	const [form] = Form.useForm();

	const { notification, modal } = App.useApp();

    const [open, setOpen] = useState(false); //for modal

	const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [errors, setErrors] = useState<any>({});

    const [sortBy, setSortBy] = useState<any>('id.desc');

    const [id, setId] = useState(0);



    const  { data, isFetching, error, refetch } = useQuery({
        queryKey: ['categories', page, perPage, sortBy],
        queryFn: async () => {
            const params = new URLSearchParams({
                perpage: perPage.toString(),
                search: search.toString(),
                page: page.toString(),
                sort_by: sortBy.toString(),
            });
            const res = await axios.get(`/admin/get-services?${params}`)
            return res.data
        }
    })


    const onPageChange = (index:number, perPage:number) => {
        setPage(index)
    }


	const getData = async (id:number) => {
		try{
			const res = await axios.get(`/admin/services/${id}`);
			form.setFields([
				{ name: 'name', value: res.data.name },
				{ name: 'description', value: res.data.description },
				{ name: 'active', value: res.data.active ? true : false },
			]);
		}catch(err){
            //console.log(err);
		}
    }


	const handClickNew = () => {
        //router.visit('/');
		setId(0)
        setOpen(true)
    }

	const handleEditClick = (id:number) => {
		setErrors({})
		setId(id);
        setOpen(true);
        getData(id);
	}

	const handleDeleteClick = async (id:number) => {
		const res = await axios.delete('/admin/services/' + id);
		if(res.data.status === 'deleted'){
			notification.success({
				message: 'Deleted!',
				description:'Service successfully deleted.',
				placement: 'bottomRight'
			})
			refetch()
		}
	}

	const onFinish = async (values:Service) =>{

		if(id > 0){
			try{
				const res = await axios.put('/admin/services/' + id, values)
				if(res.data.status === 'updated'){
					notification.success({
						message: 'Updated!',
						description:'Service successfully update.',
						placement: 'bottomRight'
					})
					setOpen(false)
					refetch()
				}
			}catch(err:any){
				if(err.response.status === 422){
					setErrors(err.response.data.errors)
				}
			}
		}else{
			try{
				const res = await axios.post('/admin/services', values)
				if(res.data.status === 'saved'){
					notification.success({
						message: 'Saved!',
						description:'Service successfully save.',
						placement: 'bottomRight'
					})
					setOpen(false)
					refetch()
				}
			}catch(err:any){
				if(err.response.status === 422){
					setErrors(err.response.data.errors)

				}
			}
		}
	}

	return (
		<>
			<Head title="Services Management"></Head>

			<div className='flex mt-10 justify-center items-center'>

				{/* card */}
				<div className='p-6 w-full overflow-auto mx-2 bg-white shadow-sm rounded-md
					md:w-[900px]
					sm:w-[740px]'>
					{/* card header */}
					<CardTitle title={'LIST OF SERVICES'} />
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
								onSearch={()=>refetch()} />
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

							<Column title="Id" dataIndex="id"/>
							<Column title="Service" dataIndex="name" key="name"/>
							<Column title="Description" dataIndex="description" key="description"/>
							<Column title="Active" dataIndex="active" key="active" render={(active)=>(
								active ? (
									<span className='bg-green-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>YES</span>
								) : (
									<span className='bg-red-600 font-bold text-white text-[10px] px-2 py-1 rounded-full'>NO</span>
								)
							)}/>

							<Column title="Action" key="action"
								render={(_, data:Service) => (
									<Space size="small">

										<Button
											icon={<EditOutlined/>} onClick={ ()=> handleEditClick(data.id) } />

										<Button danger
											onClick={()=> (
												modal.confirm({
													title: 'Delete?',
													icon: <QuestionCircleOutlined />,
													content: 'Are you sure you want to delete this data?',
													okText: 'Yes',
													cancelText: 'No',
													onOk() {
														handleDeleteClick(data.id)
													}
												})
											)}
											icon={<DeleteOutlined/>} />
									</Space>
								)}
							/>
						</Table>

						<Pagination className='mt-4'
							onChange={onPageChange}
							defaultCurrent={1}
							total={data?.total} />

					</div>
				</div>
				{/* card */}

			</div>


			{/* Modal with Cancel and Save button*/}
			<Modal
                open={open}
                title="SERVICE INFORMATION"
                okText="Save"
                cancelText="Cancel"
                okButtonProps={{
                    autoFocus: true,
                    htmlType: 'submit',
                }}
                onCancel={() => setOpen(false)}
                destroyOnHidden
                modalRender={(dom) => (
                    <Form
                        layout="vertical"
                        form={form}
                        name="form_in_modal"
						autoComplete='off'
                        initialValues={{
							name: '',
							description: '',
                            active: true,
                        }}
                        clearOnDestroy
                        onFinish={(values) => onFinish(values)}
                    >
                        {dom}
                    </Form>
                )}
            >
                <Form.Item
                    name="name"
                    label="Service Name"
                    validateStatus={errors.name ? 'error' : ''}
                    help={errors.name ? errors.name[0] : ''}
                >
                    <Input placeholder="Service Name"/>
                </Form.Item>

				<Form.Item
                    name="description"
                    label="Description"
                    validateStatus={errors.description ? 'error' : ''}
                    help={errors.description ? errors.description[0] : ''}
                >
                    <Input.TextArea placeholder="Description"/>
                </Form.Item>

                <Form.Item
                    name="active"
                    valuePropName="checked"
                >
                    <Checkbox>Active</Checkbox>
                </Form.Item>

            </Modal>

		</>
	)
}

AdminServiceIndex.layout = (page:any) => <AdminLayout user={page.props.auth.user}>{page}</AdminLayout>
export default AdminServiceIndex;
