import { App, Button, Form, Input } from "antd";
import { useState } from "react";
import { LockOutlined, SaveOutlined } from "@ant-design/icons";

import axios from "axios";

export default function ChangePassword() {

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm()
  const { modal } = App.useApp();



  const submit = (values: any) => {
    setLoading(true)
    setErrors({})
    axios.post('/change-password', values).then(res => {
      if (res.data.status === "changed") {
        modal.success({
          title: "Success!",
          content: <div>Password successfully changed.</div>,
          onOk() {
            form.setFieldValue('old_password', '')
            form.setFieldValue('password', '')
            form.setFieldValue('password_confirmation', '')
          },
        });
      }
    }).catch(err => {
      if (err.response.status === 422) {
        setErrors(err.response.data.errors)
      }
    }).finally(() => {
      setLoading(false)
    })
  }


  return (

    <div className="mx-auto w-full max-w-2xl px-4 sm:px-0">
      <div className="relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-6 shadow-lg shadow-black/5">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-orange-100 via-white to-orange-100" />
        <div className="relative flex flex-wrap items-center gap-4 pb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-semibold text-orange-900 shadow-sm ring-1 ring-orange-200">
            <LockOutlined />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700/80">
              Security
            </p>
            <h1 className="text-2xl font-semibold text-orange-900">
              Change password
            </h1>
            <p className="text-sm text-orange-800/70">
              Use a strong password you do not reuse on other accounts.
            </p>
          </div>
        </div>

        <div className="relative rounded-xl bg-white p-5 shadow-sm ring-1 ring-orange-100">
          <Form
            form={form}
            layout="vertical"
            onFinish={submit}
            autoComplete="off"
            className="space-y-2"
            initialValues={{
              old_password: '',
              password: '',
              password_confirmation: '',
            }}
          >
            <Form.Item
              label="Current password"
              name="old_password"
              validateStatus={errors?.old_password ? 'error' : ''}
              help={errors?.old_password ? errors?.old_password[0] : ''}
            >
              <Input.Password placeholder="Enter current password" size="large" />
            </Form.Item>

            <Form.Item
              label="New password"
              name="password"
              validateStatus={errors?.password ? 'error' : ''}
              help={errors?.password ? errors?.password[0] : ''}
            >
              <Input.Password placeholder="Create a new password" size="large" />
            </Form.Item>

            <Form.Item
              label="Confirm new password"
              name="password_confirmation"
              validateStatus={errors?.password_confirmation ? 'error' : ''}
              help={errors?.password_confirmation ? errors?.password_confirmation[0] : ''}
            >
              <Input.Password placeholder="Re-enter new password" size="large" />
            </Form.Item>

            <Button
              htmlType="submit"
              className="w-full"
              type="primary"
              icon={<SaveOutlined />}
              size="large"
              loading={loading}
            >
              Update password
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
