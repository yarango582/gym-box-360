import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { RegisterUser, RegisterAssistance, RegisterSuscription } from './components';
import { MenuOption, menuOptions } from './components/common/menuOptions';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './store/login.store';
import logo from './assets/img/logo.png';
import { AssisteancesOfTheDay } from './components/assistances/assistancesOfTheDay';

const { Header, Content, Sider, Footer } = Layout;


const App: React.FC = () => {

  const [collapsed, setCollapsed] = useState(false);
  const [selectedOption, setSelectedOption] = useState('2');
  const { accessToken,  permissions, setAccessToken, setPermissions } = useAuthStore();

  const navigate = useNavigate();

  const menuItems = menuOptions.map((option: MenuOption) => {
    if (option.permissions.includes(permissions.map(permission => permission).join(''))) {
      return {
        ...option,
        icon: option.icon,
        subMenuOptions: option.subMenuOptions?.map((subOption: MenuOption) => {
          if (subOption.permissions.includes(permissions.map(permission => permission).join(''))) {
            return {
              ...subOption,
              icon: subOption.icon,
            };
          }
          return null;
        }),
      }
    }
    return null;
  });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = (key: string) => {
    if(key === 'logout') {
      setAccessToken('');
      setPermissions([]);
      navigate('/login');
    }
    setSelectedOption(key);
  };

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
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo" style={{ textAlign: 'center' }}>
          <img src={logo} alt="logo" style={{ width: '100%', height: '100%', padding: '20px' }} />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={['2']}
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
            {renderSelectedComponent()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Yarangodev ©2023</Footer>
      </Layout>
    </Layout>
  );
};

export default App;
