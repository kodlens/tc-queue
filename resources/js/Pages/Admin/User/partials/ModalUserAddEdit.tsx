import { User } from '@/types';
import { App, Form, Input, Modal, Select } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

interface Props {
  user: User;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}
export const ModalUserAddEdit = ({ user, open, onClose, onSuccess }: Props) => {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const { notification, } = App.useApp();


  useEffect(() => {
    if(!open) return

    setErrors({})
    if (user.id) {
      try {
        //const response = axios.get<User>(`/admin/users/${dataId}`);
        form.setFieldsValue(
          {
            username: user.username,
            lname: user.lname,
            fname: user.fname,
            mname: user.mname,
            email: user.email,
            role: user.role,
          }
        );
      } catch (err) {
      }
    }

  }, [user])



  const onFinish = async (values: User) => {
    setLoading(true)
    if (user.id > 0) {
      try {
        const res = await axios.put('/admin/users/' + user.id, values)
        if (res.data.status === 'updated') {
          notification.info({ placement: 'bottomRight', message: 'Updated!', description: 'User successfully updated.' })
          onSuccess()

        }
        setLoading(false)

      } catch (err: any) {
        if (err.response.status === 422) {
          setErrors(err.response.data.errors)
        }
        setLoading(false)

      }
    } else {
      try {
        const res = await axios.post('/admin/users', values)
        if (res.data.status === 'saved') {
          notification.info({ placement: 'bottomRight', message: 'Saved!', description: 'User successfully saved.' })
          onSuccess()
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



  return (
    <>
      {/* Modal */}
      <Modal
        open={open}
        title="USER INFORMATION"
        okText="Save"
        cancelText="Cancel"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          loading: loading
        }}
        onCancel={() => onClose()}
        destroyOnHidden
        modalRender={(dom) => (
          <Form
            layout="vertical"
            form={form}
            name="form_in_modal"
            autoComplete="off"
            initialValues={{
              username: '',
              password: '',
              email: '',
              lname: '',
              fname: '',
              mname: '',
              role: '',
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
          name="username"
          label="Username"
          validateStatus={errors.username ? "error" : ""}
          help={errors.username ? errors.username[0] : ""}
        >
          <Input placeholder="Username" />
        </Form.Item>

        {user && !user.id ? (
          <>
            <Form.Item
              name="password"
              label="Password"
              validateStatus={errors.password ? "error" : ""}
              help={errors.password ? errors.password[0] : ""}
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone />
                  ) : (
                    <EyeInvisibleOutlined />
                  )
                }
                placeholder="Re-type Password"
              />
            </Form.Item>

            <Form.Item
              name="password_confirmation"
              label="Re-type Password"
              validateStatus={
                errors.password_confirmation ? "error" : ""
              }
              help={
                errors.password_confirmation
                  ? errors.password_confirmation[0]
                  : ""
              }
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? (
                    <EyeTwoTone />
                  ) : (
                    <EyeInvisibleOutlined />
                  )
                }
                placeholder="Re-type Password"
              />
            </Form.Item>
          </>
        ) : (
          ""
        )}

        <Form.Item
          name="lname"
          label="Last Name"
          validateStatus={errors.lname ? "error" : ""}
          help={errors.lname ? errors.lname[0] : ""}
        >
          <Input placeholder="Last Name" />
        </Form.Item>

        <Form.Item
          name="fname"
          label="First Name"
          validateStatus={errors.fname ? "error" : ""}
          help={errors.fname ? errors.fname[0] : ""}
        >
          <Input placeholder="First Name" />
        </Form.Item>

        <Form.Item
          name="mname"
          label="Middle Name"
          validateStatus={errors.mname ? "error" : ""}
          help={errors.mname ? errors.mname[0] : ""}
        >
          <Input placeholder="FiMiddlerst Name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email ? errors.email[0] : ""}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          className="w-full"
          validateStatus={errors.role ? "error" : ""}
          help={errors.role ? errors.role[0] : ""}
        >
          <Select
            options={[
              { value: "staff", label: "STAFF" },
              { value: "admin", label: "ADMINISTRATOR" },
            ]}
          />
        </Form.Item>
      </Modal>


    </>
  )
}
