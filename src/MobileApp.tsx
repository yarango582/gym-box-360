import React, { useState } from 'react';
import { Breadcrumb, Layout, theme, Menu, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { LoginUser, RegisterUser, menuOptions } from './components';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleMenuClick = (key: string) => {
    if (key === '1') {
      setShowRegisterForm(true);
    } else {
      setShowRegisterForm(false);
    }
  };

  return (
    <Layout>
      <Header
        style={{

        }}
      >
        <Row justify="space-between" align="middle" style={{ height: '100%' }}>
          <Col span={12}>
            <div className="demo-logo">
              <h1 style={{ color: 'white', fontSize: '18px', margin: '0 0 0 0', fontFamily: "'Carter One', cursive", padding: 0 }}>
                GYM BOX 360
              </h1>
            </div>
          </Col>
          <Col span={12}>
            <Menu theme="dark" mode="horizontal" style={{justifyContent: 'right'}}>
              <Menu.SubMenu key="actions" title="Acciones" icon={<DownOutlined />}>
                {menuOptions.map((option) => (
                  <Menu.Item
                    icon={option.icon as JSX.Element}
                    key={option.key}
                    onClick={() => handleMenuClick(option.key)}
                  >
                    {option.label}
                  </Menu.Item>
                ))}
              </Menu.SubMenu>
            </Menu>
          </Col>
        </Row>
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px' }}>
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
          {showRegisterForm ? <RegisterUser /> : <LoginUser/>}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Yarangodev ©2023</Footer>
    </Layout>
  );
};

export default App;
