import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, theme, Menu, Row, Col } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { RegisterAssistance, RegisterSuscription, RegisterUser } from './components';
import { menuOptions } from './components/common/menuOptions';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('2');
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const isLogged = localStorage.getItem('isLogged');

  const handleMenuClick = (key: string) => {
    setSelectedOption(key);
  };

  const renderSelectedComponent = () => {

    switch (selectedOption) {
      case '1':
        return <RegisterUser />;
      case '2':
        return <RegisterAssistance />;
      case '3':
        return <RegisterSuscription />;
      case '4':
        window.localStorage.removeItem('isLogged');
    }
  };

  useEffect(() => {
    if (isLogged !== 'true') {
      navigate('/login');
    }
  }, [isLogged, navigate]);

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
            <Menu theme="dark" mode="horizontal" style={{ justifyContent: 'right' }}>
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
          {renderSelectedComponent()}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Yarangodev ©2023</Footer>
    </Layout>

  );
};

export default App;
