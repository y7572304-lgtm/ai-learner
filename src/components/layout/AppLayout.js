import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, Badge, Drawer, Typography, Space } from 'antd';
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined, 
  DashboardOutlined,
  BookOutlined,
  BarChartOutlined,
  TrophyOutlined,
  SettingOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  SoundOutlined,
  OrderedListOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../store/slices/userSlice';
import { selectThemeSettings } from '../../store/slices/settingsSlice';
import { selectNotifications, markNotificationAsRead } from '../../store/slices/userSlice';
import VoiceAssistant from '../voice/VoiceAssistant';
import styled from 'styled-components';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: ${props => props.theme === 'tsinghua' ? '#f0f2f5' : 
              props.theme === 'scut' ? '#f5f5f5' : 
              props.theme === 'pku' ? '#f8f8f8' : '#f0f2f5'};
`;

const StyledHeader = styled(Header)`
  background: ${props => props.theme === 'tsinghua' ? '#660874' : 
              props.theme === 'scut' ? '#c62828' : 
              props.theme === 'pku' ? '#162447' : '#1890ff'};
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const StyledSider = styled(Sider)`
  box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
  
  .logo {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.theme === 'tsinghua' ? '#4a0454' : 
                props.theme === 'scut' ? '#b71c1c' : 
                props.theme === 'pku' ? '#0d1b36' : '#096dd9'};
    
    h1 {
      color: white;
      margin: 0;
      font-size: ${props => props.collapsed ? '0' : '18px'};
      transition: font-size 0.3s;
      white-space: nowrap;
      overflow: hidden;
    }
  }
  
  .menu-container {
    flex: 1;
    overflow-y: auto;
  }
`;

const StyledContent = styled(Content)`
  margin: 24px;
  padding: 24px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  min-height: 280px;
  overflow: auto;
`;

const NotificationItem = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
  
  .notification-title {
    font-weight: bold;
    margin-bottom: 4px;
  }
  
  .notification-time {
    font-size: 12px;
    color: #999;
  }
`;

const AppLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const user = useSelector(selectUser);
  const themeSettings = useSelector(selectThemeSettings);
  const notifications = useSelector(selectNotifications);
  
  const [collapsed, setCollapsed] = useState(false);
  const [notificationDrawerVisible, setNotificationDrawerVisible] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  
  // 响应式处理
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 切换侧边栏
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  
  // 显示通知抽屉
  const showNotificationDrawer = () => {
    setNotificationDrawerVisible(true);
  };
  
  // 关闭通知抽屉
  const closeNotificationDrawer = () => {
    setNotificationDrawerVisible(false);
  };
  
  // 标记通知为已读
  const handleNotificationClick = (id) => {
    dispatch(markNotificationAsRead(id));
  };
  
  // 用户下拉菜单
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        个人资料
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />} onClick={() => navigate('/settings')}>
        设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        退出登录
      </Menu.Item>
    </Menu>
  );
  
  // 菜单项
  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '学习仪表盘'
    },
    {
      key: '/learning-plan',
      icon: <BookOutlined />,
      label: '学习计划'
    },
    {
      key: '/analytics',
      icon: <BarChartOutlined />,
      label: '数据分析'
    },
    {
      key: '/achievements',
      icon: <TrophyOutlined />,
      label: '成就与徽章'
    },
    {
      key: '/leaderboard',
      icon: <OrderedListOutlined />,
      label: '学习排行榜'
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '设置'
    }
  ];
  
  return (
    <StyledLayout theme={themeSettings.theme}>
      <StyledSider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth={0}
        onBreakpoint={(broken) => {
          if (broken) {
            setCollapsed(true);
          }
        }}
        theme={themeSettings.enableDarkMode ? 'dark' : 'light'}
      >
        <div className="logo">
          <h1>AI学习动力引擎</h1>
        </div>
        <div className="menu-container">
          <Menu
            theme={themeSettings.enableDarkMode ? 'dark' : 'light'}
            mode="inline"
            selectedKeys={[location.pathname]}
            onClick={({ key }) => {
              navigate(key);
              if (window.innerWidth < 768) {
                setCollapsed(true);
              }
            }}
            items={menuItems}
          />
        </div>
      </StyledSider>
      <Layout>
        <StyledHeader theme={themeSettings.theme}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
              style={{ color: '#fff', fontSize: '16px' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <VoiceAssistant />
            <Badge count={unreadNotificationsCount} overflowCount={99}>
              <Button
                type="text"
                icon={<BellOutlined />}
                onClick={showNotificationDrawer}
                style={{ color: '#fff', fontSize: '16px' }}
              />
            </Badge>
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Button
                type="text"
                style={{ color: '#fff', marginLeft: 16 }}
              >
                <Space>
                  <Avatar icon={<UserOutlined />} />
                  {!collapsed && <span>{user.name}</span>}
                </Space>
              </Button>
            </Dropdown>
          </div>
        </StyledHeader>
        <StyledContent>
          {children}
        </StyledContent>
      </Layout>
      
      {/* 通知抽屉 */}
      <Drawer
        title="通知中心"
        placement="right"
        onClose={closeNotificationDrawer}
        open={notificationDrawerVisible}
        width={320}
      >
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <NotificationItem 
              key={notification.id}
              onClick={() => handleNotificationClick(notification.id)}
              style={{ opacity: notification.read ? 0.7 : 1 }}
            >
              <div className="notification-title">
                {!notification.read && (
                  <Badge status="processing" style={{ marginRight: 8 }} />
                )}
                {notification.title}
              </div>
              <div className="notification-content">{notification.content}</div>
              <div className="notification-time">{notification.time}</div>
            </NotificationItem>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <Text type="secondary">暂无通知</Text>
          </div>
        )}
      </Drawer>
      
      {/* 移动端菜单抽屉 */}
      <Drawer
        title="菜单"
        placement="left"
        onClose={() => setMobileMenuVisible(false)}
        open={mobileMenuVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => {
            navigate(key);
            setMobileMenuVisible(false);
          }}
          items={menuItems}
        />
      </Drawer>
    </StyledLayout>
  );
};

export default AppLayout;