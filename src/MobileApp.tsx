import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, theme, Menu, Row, Col } from 'antd';
import { RegisterAssistance, RegisterSuscription, RegisterUser } from './components';
import { MenuOption, menuOptions } from './components/common/menuOptions';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './store/login.store';
import { AssisteancesOfTheDay } from './components/assistances/assistancesOfTheDay';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState('2');
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { accessToken, permissions, setAccessToken, setPermissions } = useAuthStore();
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    if (key === 'logout') {
      setAccessToken('');
      setPermissions([]);
      navigate('/login');
    }
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

    const options = {
      '1': <RegisterUser />,
      '2': <RegisterAssistance />,
      '3': <RegisterSuscription />,
      'sub-5': <AssisteancesOfTheDay />,
      'logout': null,
    }

    return options[selectedOption as keyof typeof options];

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
              defaultSelectedKeys={['2']}
              mode="horizontal"
              onClick={({ key }) => handleMenuClick(key.toString())}
            >
              {menuItems.map((option) => {
                if (option) {
                  if (option.subMenuOptions) {
                    return (
                      <Menu.SubMenu
                        key={`${option.key}-${option.label}`}
                        icon={option.icon}
                        title={option.label}
                        popupOffset={[ -130, 0]}
                      >
                        {option.subMenuOptions.map((subOption) => {
                          if (subOption) {
                            return (
                              <Menu.Item key={subOption.key} icon={subOption.icon}>
                                {subOption.label}
                              </Menu.Item>
                            );
                          }
                          return null;
                        })}
                      </Menu.SubMenu>
                    );
                  }
                  return (
                    <Menu.Item key={option.key} icon={option.icon}>
                      {option.label}
                    </Menu.Item>
                  );
                }
                return null;
              }
              )}
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
