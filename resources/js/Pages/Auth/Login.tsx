import { useEffect, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

import { LoginOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

import axios from 'axios';

export default function Login() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const submit = (values: object) => {
    setLoading(true);
    setErrors({});

    axios.post('/login', values)
      .then(() => {
        router.visit('/');
      })
      .catch(err => {
        const serverErrors = err.response?.data?.errors || {};
        setErrors(serverErrors);

         if (Object.keys(serverErrors).length > 0) {
            form.scrollToField(Object.keys(serverErrors)[0]); // 👈 scroll to first error
          }

        form.resetFields(['password']);
        setLoading(false);
      });
  };

  return (
    <>
      <Head title="Log in" />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">

          {/* Logo */}
          <div className="flex justify-center mb-4">
            <ApplicationLogo />
          </div>

          {/* Title */}
          <h1 className="text-center text-xl font-bold text-gray-800">
            Sign in to your account
          </h1>
          <p className="text-center text-sm text-gray-500 mb-6">
            Enter your credentials to continue
          </p>

          {/* Form */}
          <Form
            form={form}
            layout="vertical"
            onFinish={submit}
            autoComplete="off"
            initialValues={{ username: '', password: '' }}
          >
            <Form.Item
              label="Username"
              name="username"
              validateStatus={errors?.username ? 'error' : ''}
              help={errors?.username?.[0]}
            >
              <Input
                size="large"
                placeholder="Username"
                prefix={<UserOutlined />}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              validateStatus={errors?.password ? 'error' : ''}
              help={errors?.password?.[0]}
            >
              <Input.Password
                size="large"
                placeholder="Password"
                prefix={<LockOutlined />}
              />
            </Form.Item>

            <Button
              htmlType="submit"
              type="primary"
              size="large"
              block
              icon={<LoginOutlined />}
              loading={loading}
              className="mt-2 font-semibold"
            >
              Log In
            </Button>
          </Form>

        </div>
      </div>
    </>
  );
}
