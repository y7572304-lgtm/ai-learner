import React, { useState } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Tabs, 
  List, 
  Progress, 
  Typography, 
  Tag, 
  Divider, 
  Badge,
  Avatar,
  Empty,
  Tooltip
} from 'antd';
import { 
  TrophyOutlined, 
  LockOutlined, 
  UnlockOutlined,
  StarOutlined,
  FireOutlined,
  ClockCircleOutlined,
  BookOutlined,
  RocketOutlined
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { 
  selectAchievements, 
  selectBadges, 
  selectUnlockedAchievements, 
  selectLockedAchievements 
} from '../store/slices/achievementsSlice';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const StyledCard = styled(Card)`
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const AchievementIcon = styled.div`
  font-size: 32px;
  margin-bottom: 16px;
  color: ${props => props.unlocked ? '#faad14' : '#d9d9d9'};
`;

const BadgeAvatar = styled(Avatar)`
  background-color: ${props => {
    switch (props.tier) {
      case 'bronze':
        return '#cd7f32';
      case 'silver':
        return '#c0c0c0';
      case 'gold':
        return '#ffd700';
      case 'platinum':
        return '#e5e4e2';
      default:
        return '#d9d9d9';
    }
  }};
`;

const getAchievementIcon = (icon) => {
  switch (icon) {
    case 'trophy':
      return <TrophyOutlined />;
    case 'fire':
      return <FireOutlined />;
    case 'clock':
      return <ClockCircleOutlined />;
    case 'star':
      return <StarOutlined />;
    case 'book':
      return <BookOutlined />;
    case 'rocket':
      return <RocketOutlined />;
    case 'calculator':
      return <span>📊</span>;
    default:
      return <TrophyOutlined />;
  }
};

const Achievements = () => {
  const achievements = useSelector(selectAchievements);
  const badges = useSelector(selectBadges);
  const unlockedAchievements = useSelector(selectUnlockedAchievements);
  const lockedAchievements = useSelector(selectLockedAchievements);
  
  const [activeTab, setActiveTab] = useState('all');
  
  // 渲染所有成就
  const renderAllAchievements = () => {
    if (achievements.length === 0) {
      return (
        <Empty
          description="暂无成就"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      );
    }
    
    return (
      <Row gutter={[16, 16]}>
        {achievements.map(achievement => (
          <Col xs={24} sm={12} md={8} lg={6} key={achievement.id}>
            <StyledCard
              hoverable
              style={{ 
                opacity: achievement.unlocked ? 1 : 0.7,
                backgroundColor: achievement.unlocked ? '#fff' : '#f5f5f5'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <AchievementIcon unlocked={achievement.unlocked}>
                  {getAchievementIcon(achievement.icon)}
                </AchievementIcon>
                <Badge 
                  count={achievement.unlocked ? <UnlockOutlined style={{ color: '#52c41a' }} /> : <LockOutlined />} 
                  offset={[-5, 5]}
                >
                  <Title level={4}>{achievement.title}</Title>
                </Badge>
                <Paragraph>{achievement.description}</Paragraph>
                {achievement.unlocked ? (
                  <Tag color="success">已解锁于 {achievement.unlockedAt}</Tag>
                ) : (
                  <Progress percent={achievement.progress} status="active" />
                )}
                <Divider />
                <div>
                  <Text strong>奖励：</Text>
                  <div style={{ marginTop: 8 }}>
                    <Tag color="gold">{achievement.reward.points} 积分</Tag>
                    <Tag color="purple">徽章</Tag>
                  </div>
                </div>
              </div>
            </StyledCard>
          </Col>
        ))}
      </Row>
    );
  };
  
  // 渲染已解锁成就
  const renderUnlockedAchievements = () => {
    if (unlockedAchievements.length === 0) {
      return (
        <Empty
          description="暂无已解锁成就"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      );
    }
    
    return (
      <Row gutter={[16, 16]}>
        {unlockedAchievements.map(achievement => (
          <Col xs={24} sm={12} md={8} lg={6} key={achievement.id}>
            <StyledCard hoverable>
              <div style={{ textAlign: 'center' }}>
                <AchievementIcon unlocked={true}>
                  {getAchievementIcon(achievement.icon)}
                </AchievementIcon>
                <Badge 
                  count={<UnlockOutlined style={{ color: '#52c41a' }} />} 
                  offset={[-5, 5]}
                >
                  <Title level={4}>{achievement.title}</Title>
                </Badge>
                <Paragraph>{achievement.description}</Paragraph>
                <Tag color="success">已解锁于 {achievement.unlockedAt}</Tag>
                <Divider />
                <div>
                  <Text strong>奖励：</Text>
                  <div style={{ marginTop: 8 }}>
                    <Tag color="gold">{achievement.reward.points} 积分</Tag>
                    <Tag color="purple">徽章</Tag>
                  </div>
                </div>
              </div>
            </StyledCard>
          </Col>
        ))}
      </Row>
    );
  };
  
  // 渲染未解锁成就
  const renderLockedAchievements = () => {
    if (lockedAchievements.length === 0) {
      return (
        <Empty
          description="暂无未解锁成就"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      );
    }
    
    return (
      <Row gutter={[16, 16]}>
        {lockedAchievements.map(achievement => (
          <Col xs={24} sm={12} md={8} lg={6} key={achievement.id}>
            <StyledCard
              hoverable
              style={{ 
                opacity: 0.7,
                backgroundColor: '#f5f5f5'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <AchievementIcon unlocked={false}>
                  {getAchievementIcon(achievement.icon)}
                </AchievementIcon>
                <Badge 
                  count={<LockOutlined />} 
                  offset={[-5, 5]}
                >
                  <Title level={4}>{achievement.title}</Title>
                </Badge>
                <Paragraph>{achievement.description}</Paragraph>
                <Progress percent={achievement.progress} status="active" />
                <Divider />
                <div>
                  <Text strong>奖励：</Text>
                  <div style={{ marginTop: 8 }}>
                    <Tag color="gold">{achievement.reward.points} 积分</Tag>
                    <Tag color="purple">徽章</Tag>
                  </div>
                </div>
              </div>
            </StyledCard>
          </Col>
        ))}
      </Row>
    );
  };
  
  // 渲染徽章
  const renderBadges = () => {
    if (badges.length === 0) {
      return (
        <Empty
          description="暂无徽章"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      );
    }
    
    return (
      <Row gutter={[16, 16]}>
        {badges.map(badge => (
          <Col xs={12} sm={8} md={6} lg={4} key={badge.id}>
            <Tooltip title={badge.obtained ? '已获得' : '未获得'}>
              <StyledCard
                hoverable
                style={{ 
                  opacity: badge.obtained ? 1 : 0.5,
                  textAlign: 'center'
                }}
              >
                <BadgeAvatar 
                  size={64} 
                  tier={badge.tier}
                  icon={getAchievementIcon(badge.icon)}
                />
                <div style={{ marginTop: 16 }}>
                  <Text strong>{badge.name}</Text>
                  <div>
                    <Tag color={
                      badge.tier === 'bronze' ? 'orange' :
                      badge.tier === 'silver' ? 'default' :
                      badge.tier === 'gold' ? 'gold' :
                      badge.tier === 'platinum' ? 'blue' : 'default'
                    }>
                      {badge.tier === 'bronze' ? '铜级' :
                       badge.tier === 'silver' ? '银级' :
                       badge.tier === 'gold' ? '金级' :
                       badge.tier === 'platinum' ? '白金级' : '普通'}
                    </Tag>
                  </div>
                </div>
              </StyledCard>
            </Tooltip>
          </Col>
        ))}
      </Row>
    );
  };
  
  return (
    <div>
      <Title level={2}>成就与徽章</Title>
      <Text type="secondary">展示你的学习成就和收集的徽章。</Text>
      
      <Divider />
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane 
          tab={
            <span>
              <TrophyOutlined />
              所有成就
            </span>
          } 
          key="all"
        >
          {renderAllAchievements()}
        </TabPane>
        <TabPane 
          tab={
            <span>
              <UnlockOutlined />
              已解锁成就
            </span>
          } 
          key="unlocked"
        >
          {renderUnlockedAchievements()}
        </TabPane>
        <TabPane 
          tab={
            <span>
              <LockOutlined />
              未解锁成就
            </span>
          } 
          key="locked"
        >
          {renderLockedAchievements()}
        </TabPane>
        <TabPane 
          tab={
            <span>
              <StarOutlined />
              徽章收藏
            </span>
          } 
          key="badges"
        >
          {renderBadges()}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Achievements;