import React from 'react';
import { Layout, Menu } from 'antd';
import { 
  DashboardOutlined, 
  CalendarOutlined, 
  TrophyOutlined, 
  BarChartOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../store/slices/settingsSlice';

const { Sider } = Layout;

const AppSider = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTheme = useSelector(selectTheme);
  
  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '仪表盘',
      onClick: () => navigate('/')
    },
    {
      key: '/learning-plan',
      icon: <CalendarOutlined />,
      label: '学习计划',
      onClick: () => navigate('/learning-plan')
    },
    {
      key: '/achievements',
      icon: <TrophyOutlined />,
      label: '成就',
      onClick: () => navigate('/achievements')
    },
    {
      key: '/leaderboard',
      icon: <BarChartOutlined />,
      label: '排行榜',
      onClick: () => navigate('/leaderboard')
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: '个人资料',
      onClick: () => navigate('/profile')
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '设置',
      onClick: () => navigate('/settings')
    }
  ];
  
  // 根据当前路径确定选中的菜单项
  const selectedKey = location.pathname;
  
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme={currentTheme === 'tsinghua' ? 'dark' : 'light'}
      width={200}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div style={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        margin: 0,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
      }}>
        {!collapsed && 'AI学习动力引擎'}
        {collapsed && 'AI'}
      </div>
      <Menu
        theme={currentTheme === 'tsinghua' ? 'dark' : 'light'}
        mode="inline"
        selectedKeys={[selectedKey]}
        items={menuItems}
      />
    </Sider>
  );
};

export default AppSider;