import { App, Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { SaveOutlined } from "@ant-design/icons";
import { PageProps } from "@/types";
import axios from "axios";

export default function MyAccount({ auth }: PageProps) {

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm()
  const { modal } = App.useApp();

  const initials = `${auth.user.fname?.[0] ?? ""}${auth.user.lname?.[0] ?? ""}`.toUpperCase()

  const loadAuthUser = () => {
    form.setFieldValue('username', auth.user.username)
    form.setFieldValue('lname', auth.user.lname)
    form.setFieldValue('fname', auth.user.fname)
    form.setFieldValue('mname', auth.user.mname)
    form.setFieldValue('sex', auth.user.sex)
  }

  useEffect(() => {
    loadAuthUser()
  }, [])
  const submit = (values: any) => {
    setLoading(true)
    setErrors({})
    axios.patch('/my-account-update', values).then(res => {
      if (res.data.status === "updated") {
        modal.success({
          title: "Updated!",
          content: <div>Your account successfully updated.</div>,
          onOk() {
            loadAuthUser()
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
      <div className="relative overflow-hidden rounded-2xl border border-orange-100 bg-white p-4 shadow-lg shadow-black/5">
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-orange-100 via-white to-orange-100" />
        <div className="relative flex flex-wrap items-center gap-4 pb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-lg font-semibold text-orange-900 shadow-sm ring-1 ring-orange-200">
            {initials || "AA"}
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-700/80">
              My Account
            </p>
            <h1 className="text-2xl font-semibold text-orange-900">
              Personal details
            </h1>
            <p className="text-sm text-orange-800/70">
              Keep your profile information up to date for smoother transactions.
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
              username: '',
              lname: '',
              fname: '',
              mname: '',
              sex: '',
            }}
          >
            <Form.Item
              label="Username"
              name="username"
              validateStatus={errors?.username ? 'error' : ''}
              help={errors?.username ? errors?.username[0] : ''}
            >
              <Input placeholder="Username" size="large" />
            </Form.Item>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Form.Item
                label="Last name"
                name="lname"
                validateStatus={errors?.lname ? 'error' : ''}
                help={errors?.lname ? errors?.lname[0] : ''}
              >
                <Input placeholder="Last name" size="large" />
              </Form.Item>

              <Form.Item
                label="First name"
                name="fname"
                validateStatus={errors?.fname ? 'error' : ''}
                help={errors?.fname ? errors?.fname[0] : ''}
              >
                <Input placeholder="First name" size="large" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Form.Item
                label="Middle name"
                name="mname"
                validateStatus={errors?.mname ? 'error' : ''}
                help={errors?.mname ? errors?.mname[0] : ''}
              >
                <Input placeholder="Middle name" size="large" />
              </Form.Item>

              <Form.Item
                name="sex"
                label="Sex"
                validateStatus={errors.sex ? "error" : ""}
                help={errors.sex ? errors.sex[0] : ""}
              >
                <Select size="large" placeholder="Select sex">
                  <Select.Option value="MALE">
                    Male
                  </Select.Option>
                  <Select.Option value="FEMALE">
                    Female
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>

            <Button
              htmlType="submit"
              className="w-full"
              type="primary"
              icon={<SaveOutlined />}
              size="large"
              loading={loading}
            >
              Save changes
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
