import React, { useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd';
import { RegisterUser, menuOptions, MenuOption, LoginUser } from './components';

const { Header, Content, Sider, Footer } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  items?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    items,
    label,
  } as MenuItem;
}

const menuItems: MenuItem[] = menuOptions.map((option: MenuOption) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  getItem(option.label, option.key, option.icon),
);

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (key: string) => {
    if (key === '1') {
      setShowRegisterForm(true);
    } else {
      setShowRegisterForm(false);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo" style={{textAlign: 'center'}}>
          <h1 style={{ color: 'white', fontSize: '24px', fontFamily: "'Carter One', cursive" }}>
            GYM BOX 360
          </h1>
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key.toString())}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: '6px',
            }}
          >
            {showRegisterForm ? <RegisterUser /> : <LoginUser />}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Yarangodev ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
