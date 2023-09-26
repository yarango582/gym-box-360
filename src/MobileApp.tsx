import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, theme, Menu, Row, Col } from 'antd';
import { RegisterAssistance, RegisterSuscription, RegisterUser } from './components';
import { MenuOption, menuOptions } from './components/common/menuOptions';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './store/login.store';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('2');
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { accessToken,  permissions, setAccessToken, setPermissions } = useAuthStore();
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    setSelectedOption(key);
  };

  const menuItems = menuOptions.map((option: MenuOption) => {
    if (option.permissions.includes(permissions.map(permission => permission).join(''))) {
      return {
        ...option,
        icon: option.icon,
      }
    }
    return null;
  });

  const renderSelectedComponent = () => {

    switch (selectedOption) {
      case '1':
        return <RegisterUser />;
      case '2':
        return <RegisterAssistance />;
      case '3':
        return <RegisterSuscription />;
        case '4':
          if (accessToken !== '') {
            setAccessToken('');
            setPermissions([]);
          }
    }

  };

  useEffect(() => {
    if (!accessToken || accessToken === '') {
      navigate('/login');
    }
  }, [accessToken, navigate]);

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
          <Col span={6}>
            <Menu
              theme="dark"
              defaultSelectedKeys={['1']}
              mode="horizontal"
              items={menuItems}
              onClick={({ key }) => handleMenuClick(key.toString())}
            />
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
          {renderSelectedComponent()}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Yarangodev ©2023</Footer>
    </Layout>

  );
};

export default App;
