import { PropsWithChildren, ReactNode } from 'react';

import { Layout } from 'antd';
import AdminLayout from './AdminLayout';
import StaffLayout from './StaffLayout';

export default function AuthenticatedLayout(
  { user, children }: PropsWithChildren<{ user: any, header?: ReactNode }>) {

  return (

    <>
      <Layout>
        {user.role.toLowerCase() === 'admin' && (
          <AdminLayout user={user} children={children}></AdminLayout>
        )}
        {user.role.toLowerCase() === 'staff' && (
          <StaffLayout user={user} children={children}></StaffLayout>
        )}

      </Layout>
    </>


  );
}
