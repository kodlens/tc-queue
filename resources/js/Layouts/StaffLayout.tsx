import { useState, PropsWithChildren } from 'react';
import { Link, router, useForm } from '@inertiajs/react';

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { Button, ConfigProvider, Layout, Menu, MenuProps } from 'antd';
import PanelSideBarLogo from '@/Components/PanelSideBarLogo';
import { BookCopy, ChartCandlestick, KeySquare, Loader, LogOut, Rows4, ThumbsUp } from 'lucide-react';

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

interface LayoutProps {
  user: {
    fname: string;
    lname: string;
  };
}

export default function StaffLayout({
  user,
  children,
}: PropsWithChildren<LayoutProps>) {
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
      key: 'staff.dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => router.visit('/staff/dashboard'),
    },

    { type: 'divider' },

    {
      key: 'staff.queues',
      icon: <Rows4 size={15}  />,
      label: 'My Queues',
      children: [
        {
          key: 'staff.waiting-queues',
          icon: <Loader size={15}  />,
          label: 'Waiting Queues',
          onClick: () => router.visit('/staff/waiting-queues'),
        },
        {
          key: 'staff.processing-queues',
          icon: <ChartCandlestick size={15}  />,
          label: 'Processing Queues',
          onClick: () => router.visit('/staff/processing-queues'),
        },
        {
          key: 'staff.completed-queues',
          icon: <ThumbsUp size={15}  />,
          label: 'Completed Queues',
          onClick: () => router.visit('/staff/completed-queues'),
        },
        {
          key: 'staff.claimed-queues',
          icon: <Rows4 size={15}  />,
          label: 'Claimed Queues',
          onClick: () => router.visit('/staff/claimed-queues'),
        },
      ]

    },

    { type: 'divider' },

    {
      key: 'staff.my-account',
      icon: <UserOutlined />,
      label: 'My Account',
      onClick: () => router.visit('/my-account'),
    },
    {
      key: 'staff.change-password',
      icon: <KeySquare size={15} />,
      label: 'Change Password',
      onClick: () => router.visit('/change-password'),
    },

    {
      key: 'reports',
      icon: <BookCopy size={15} />,
      label: 'Reports',
      children: [
        {
          key: 'reports.completed-request-reports',
          label: 'Completed Request Reports',
          onClick: () => router.visit('/reports/completed-request-reports'),
        },
        // {
        //   key: 'staff.posts.featureds',
        //   label: 'Featured Posts',
        //   onClick: () => router.visit('/staff/post-featured'),
        // },
        // {
        //   key: 'staff.posts.archives',
        //   label: 'Archives',
        //   onClick: () => router.visit('/staff/post-archives'),
        // },
      ],
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
        breakpoint='md'
        style={siderStyle}
        onBreakpoint={(broken) => setCollapsed(broken)}
      >
        <PanelSideBarLogo collapse={!collapsed}/>

        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemColor: '#ffffff',
                itemHoverColor: '#ffffff',
                itemSelectedColor: '#f4f0bd',

                itemHoverBg: 'rgba(255,255,255,0.15)',
                itemSelectedBg: 'rgba(255,255,255,0.25)',

                subMenuItemBg: 'transparent',
                subMenuItemSelectedColor: '#ffb82b',

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
