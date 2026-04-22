import React, { useState } from 'react';
import {
  AppstoreOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, Avatar } from 'antd';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const { Sider, Header, Content } = Layout;

const items = [
  {
    key: '/dashboard',
    label: 'Dashboard',
    icon: <AppstoreOutlined />,
  },
  {
    type: 'divider',
  },
  {
    key: '/dashboard/users',
    label: 'User',
    icon: <UserOutlined />,
  },
];

function DashboardLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const onClickMenuSidebar = (event) => {
    navigate(event.key);
  };

  return (
    <Layout className="min-h-screen">

      {/* sidebar */}
      <Sider
        collapsible
        trigger={null}
        collapsed={collapsed}
        width={220}
        className="!bg-white border-r border-gray-100 relative"
      >
        
        {/* header sidebar */}
        <div className="flex items-center justify-center py-5 px-4 border-b border-gray-100">
          {collapsed ? (
            <span className="text-indigo-600 text-xl font-extrabold">LPK</span>
          ) : (
            <span className="text-xl font-extrabold text-gray-900">
              LPK Geo <span className="text-indigo-600">System</span>
            </span>
          )}
        </div>

        {/* menu sidebar */}
        <Menu
          onClick={onClickMenuSidebar}
          selectedKeys={[location.pathname]}
          mode="inline"
          items={items}
          className="!border-none mt-2"
        />

        {/* logout sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
          <Button
            type="primary"
            icon={<LogoutOutlined />}
            className="w-full !bg-indigo-600"
          >
            {!collapsed && 'Logout'}
          </Button>
        </div>

      </Sider>

      {/* content */}
      <Layout className="flex flex-col">

        {/* header content */}
        <Header className="!bg-white px-6 border-b border-gray-100 flex items-center justify-between">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-lg"
          />

          <div className="flex items-center gap-2">
            <Avatar
              size={34}
              className="bg-indigo-600"
              icon={<UserOutlined />}
            />
            <p className="text-sm font-medium text-gray-700">Admin</p>
          </div>
        </Header>

        {/* content */}
        <Content className="m-6 p-6 bg-white rounded-xl min-h-[360px]">
          {children}
        </Content>

      </Layout>
    </Layout>
  );
}

export default DashboardLayout;