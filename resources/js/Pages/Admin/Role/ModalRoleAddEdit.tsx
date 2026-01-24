import { Role } from '@/types';
import { App, Checkbox, Form, Input, Modal } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react'

const ModalRoleAddEdit = (
    { id, isOpen, refetch, onCancel, closeModal }
    :
    { id: number, isOpen: boolean, refetch: () => void, onCancel: () => void , closeModal: (close: boolean) => void }
) => {

    const [form] = Form.useForm();
    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const { notification } = App.useApp();
    const [loading, setLoading] = React.useState<boolean>(false);


    useEffect(() => {
        setErrors({})
        if (id > 0) {
            getData(id)
        }
    }, [id])

    const onFinish = async (values: Role) => {
        setLoading(true)
        if (id > 0) {
            try {
                const res = await axios.put('/admin/roles/' + id, values)
                if (res.data.status === 'updated') {
                    notification.success({
                        message: 'Updated!',
                        description: 'Role successfully update.',
                        placement: 'bottomRight'
                    })
                    closeModal(true)
                    refetch()
                }
                setLoading(false)
            } catch (err:any) {
                if (err?.response.status === 422) {
                    setErrors(err.response.data.errors)
                }
                setLoading(false)

            }
        } else {
            try {
                const res = await axios.post('/admin/roles', values)
                if (res.data.status === 'saved') {
                    notification.success({
                        message: 'Saved!',
                        description: 'Role successfully save.',
                        placement: 'bottomRight'
                    })
                    closeModal(true)
                    refetch()
                }
                 setLoading(false)
            } catch (err: any) {
                if (err.response.status === 422) {
                    setErrors(err.response.data.errors)
                }
                setLoading(false)

            }
        }
    }



    const getData = async (id: number) => {
        try {
            const res = await axios.get(`/admin/roles/${id}`);
            form.setFields([
                { name: 'name', value: res.data.name },
                { name: 'slug', value: res.data.slug },
                { name: 'description', value: res.data.description },
                { name: 'active', value: res.data.active ? true : false },
            ]);

            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>

            {/* Modal with Cancel and Save button*/}
            <Modal
                open={isOpen}
                title="ROLE INFORMATION"
                okText="Save"
                cancelText="Cancel"
                okButtonProps={{
                    autoFocus: true,
                    htmlType: 'submit',
                    loading: loading
                }}
                onCancel={onCancel}
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
                    label="Role"
                    validateStatus={errors.name ? 'error' : ''}
                    help={errors.name ? errors.name[0] : ''}
                >
                    <Input placeholder="Role" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Description"
                    validateStatus={errors.description ? 'error' : ''}
                    help={errors.description ? errors.description[0] : ''}
                >
                    <Input placeholder="Description" />
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

export default ModalRoleAddEdit
