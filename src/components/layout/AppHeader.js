import React from 'react';
import { Layout, Menu, Button, Avatar, Badge, Dropdown, Space, Typography } from 'antd';
import { 
  MenuUnfoldOutlined, 
  MenuFoldOutlined, 
  BellOutlined, 
  UserOutlined,
  LogoutOutlined,
  SettingOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const { Header } = Layout;
const { Text } = Typography;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: var(--primary-color, #1890ff);
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  height: 32px;
  margin-right: 24px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const StyledBadge = styled(Badge)`
  margin-right: 24px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled(Text)`
  color: white;
  margin: 0 8px;
`;

const LevelBadge = styled.div`
  background-color: #52c41a;
  color: white;
  border-radius: 10px;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 8px;
`;

const AppHeader = ({ collapsed, setCollapsed }) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
      onClick: () => navigate('/profile')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
      onClick: () => navigate('/settings')
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => {
        // 这里应该有登出逻辑
        console.log('用户登出');
      }
    }
  ];
  
  const notificationMenuItems = [
    {
      key: '1',
      label: '你解锁了新成就：学习先锋！',
      onClick: () => navigate('/achievements')
    },
    {
      key: '2',
      label: '今日学习计划已生成',
      onClick: () => navigate('/learning-plan')
    },
    {
      key: '3',
      label: '你已连续学习7天！',
      onClick: () => navigate('/profile')
    },
    {
      type: 'divider'
    },
    {
      key: 'all',
      label: '查看全部通知',
      onClick: () => console.log('查看全部通知')
    }
  ];
  
  return (
    <StyledHeader>
      <LeftSection>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{ fontSize: '16px', color: 'white' }}
        />
        <Logo>AI学习动力引擎</Logo>
      </LeftSection>
      
      <RightSection>
        <Dropdown
          menu={{ items: notificationMenuItems }}
          placement="bottomRight"
          arrow
        >
          <StyledBadge count={3}>
            <Button
              shape="circle"
              icon={<BellOutlined />}
              style={{ border: 'none', background: 'transparent', color: 'white' }}
            />
          </StyledBadge>
        </Dropdown>
        
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          arrow
        >
          <UserInfo>
            <Avatar src={user.avatar} size="small" />
            <UserName>{user.name}</UserName>
            <LevelBadge>Lv.{user.level}</LevelBadge>
          </UserInfo>
        </Dropdown>
      </RightSection>
    </StyledHeader>
  );
};

export default AppHeader;