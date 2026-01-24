import { useState, PropsWithChildren } from 'react';
import { Link, router, useForm } from '@inertiajs/react';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  ProfileOutlined,
  BarsOutlined,
  DashboardOutlined,
} from '@ant-design/icons';

import { Button, ConfigProvider, Layout, Menu, MenuProps } from 'antd';
import PanelSideBarLogo from '@/Components/PanelSideBarLogo';
import { LogOut, Shield } from 'lucide-react';

const { Header, Sider, Content } = Layout;

/* =======================
   ORANGE GRADIENT SIDEBAR
======================= */
const siderStyle: React.CSSProperties = {
  background: 'linear-gradient(180deg, #ff7a18 80%, #ff9f1c 100%, #ffb347 100%)',
  boxShadow: '4px 0 15px rgba(0,0,0,0.15)',
};

/* =======================
   TYPES
======================= */
type MenuItem = Required<MenuProps>['items'][number];

interface AdminLayoutProps {
  user: {
    fname: string;
    lname: string;
  };
}

export default function AdminLayout({
  user,
  children,
}: PropsWithChildren<AdminLayoutProps>) {
  const { post } = useForm();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    post(route('logout'));
  };

  /* =======================
     NAVIGATION
  ======================= */
  const navigationItems = (): MenuItem[] => [
    {
      key: 'admin.dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => router.visit('/admin/dashboard'),
    },
    {
      key: 'admin.services',
      icon: <ProfileOutlined />,
      label: 'Services',
      onClick: () => router.visit('/admin/services'),
    },
    {
      key: 'admin.service-steps',
      icon: <BarsOutlined />,
      label: 'Service Steps',
      onClick: () => router.visit('/admin/service-steps'),
    },
    //{ type: 'divider' },

    //{ type: 'divider' },
    // {
    //   key: 'posts',
    //   icon: <FormOutlined />,
    //   label: 'Posts',
    //   children: [
    //     {
    //       key: 'admin.posts.articles',
    //       label: 'Articles',
    //       onClick: () => router.visit('/admin/posts'),
    //     },
    //     {
    //       key: 'admin.posts.featureds',
    //       label: 'Featured Posts',
    //       onClick: () => router.visit('/admin/post-featured'),
    //     },
    //     {
    //       key: 'admin.posts.archives',
    //       label: 'Archives',
    //       onClick: () => router.visit('/admin/post-archives'),
    //     },
    //   ],
    // },
    { type: 'divider' },
    {
      key: 'admin.roles',
      icon: <Shield size={16}/> ,
      label: 'Roles',
      onClick: () => router.visit('/admin/roles'),
    },
    {
      key: 'admin.users',
      icon: <UserOutlined />,
      label: 'Users',
      onClick: () => router.visit('/admin/users'),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* =======================
           SIDEBAR
      ======================= */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={300}
        breakpoint="md"
        style={siderStyle}
        onBreakpoint={(broken) => setCollapsed(broken)}
      >
        <PanelSideBarLogo collapse={collapsed}/>

        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemColor: '#ffffff',
                itemHoverColor: '#ffffff',
                itemSelectedColor: '#ffffff',

                itemHoverBg: 'rgba(255,255,255,0.15)',
                itemSelectedBg: 'rgba(255,255,255,0.25)',

                subMenuItemBg: 'transparent',
                groupTitleColor: 'rgba(255,255,255,0.7)',
              },
            },
          }}
        >
          <Menu
            mode="inline"
            style={{
              background: 'transparent',
              borderRight: 0,
            }}
            defaultSelectedKeys={[
              route().current()?.split('.')?.slice(0, -1).join('.') ?? '',
            ]}
            items={navigationItems()}
          />
        </ConfigProvider>
      </Sider>

      {/* =======================
           MAIN CONTENT
      ======================= */}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
          }}
        >
          <div className="flex items-center h-full">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ width: 64, height: 64, fontSize: 16 }}
            />

            <div className="ml-auto mr-4 flex items-center gap-4">
              <Link href="#" className="font-medium text-gray-700">
                {user.lname} {user.fname[0]}.
              </Link>

              <Button
                danger
                onClick={handleLogout}
                icon={<LogOut size={16} />}
              />
            </div>
          </div>
        </Header>

        <Content
          style={{
            background: '#f1f5f9',
            padding: 24,
            overflow: 'auto',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
