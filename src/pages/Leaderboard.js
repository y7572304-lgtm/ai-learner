import React, { useState, useEffect } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Tabs, 
  Table, 
  Typography, 
  Tag, 
  Divider, 
  Avatar,
  Button,
  Statistic,
  Tooltip,
  Badge,
  List
} from 'antd';
import { 
  TrophyOutlined, 
  RiseOutlined, 
  BarChartOutlined,
  UserOutlined,
  ReloadOutlined,
  CrownOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectLeaderboards, 
  selectUserRanking, 
  selectCategories, 
  selectActiveCategory,
  setActiveCategory,
  refreshLeaderboards
} from '../store/slices/leaderboardSlice';
import { selectUser } from '../store/slices/userSlice';
import { selectPrivacySettings } from '../store/slices/settingsSlice';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const StyledCard = styled(Card)`
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
`;

const RankBadge = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: white;
  background-color: ${props => {
    switch (props.rank) {
      case 1:
        return '#ffd700'; // 金色
      case 2:
        return '#c0c0c0'; // 银色
      case 3:
        return '#cd7f32'; // 铜色
      default:
        return '#1890ff'; // 蓝色
    }
  }};
`;

const UserRankCard = styled(Card)`
  border-radius: 8px;
  margin-bottom: 16px;
  background-color: #f0f5ff;
  border: 1px solid #d6e4ff;
`;

const Leaderboard = () => {
  const dispatch = useDispatch();
  const leaderboards = useSelector(selectLeaderboards);
  const userRanking = useSelector(selectUserRanking);
  const categories = useSelector(selectCategories);
  const activeCategory = useSelector(selectActiveCategory);
  const user = useSelector(selectUser);
  const privacySettings = useSelector(selectPrivacySettings);
  
  const [loading, setLoading] = useState(false);
  
  // 刷新排行榜
  const handleRefresh = () => {
    setLoading(true);
    
    // 模拟刷新过程
    setTimeout(() => {
      dispatch(refreshLeaderboards());
      setLoading(false);
    }, 1000);
  };
  
  // 切换排行榜类别
  const handleCategoryChange = (category) => {
    dispatch(setActiveCategory(category));
  };
  
  // 表格列定义
  const columns = [
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      render: (rank) => (
        <RankBadge rank={rank}>
          {rank <= 3 ? <CrownOutlined /> : rank}
        </RankBadge>
      ),
    },
    {
      title: '用户',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={record.avatar} size="small" style={{ marginRight: 8 }} />
          <Text>{name}</Text>
          {record.id === user.id && (
            <Tag color="blue" style={{ marginLeft: 8 }}>你</Tag>
          )}
        </div>
      ),
    },
    {
      title: '积分',
      dataIndex: 'points',
      key: 'points',
      render: (points) => (
        <Text strong>{points}</Text>
      ),
    },
  ];
  
  // 获取当前排行榜数据
  const currentLeaderboard = leaderboards[activeCategory] || [];
  
  // 获取用户当前排名
  const currentUserRanking = userRanking[activeCategory] || { rank: '-', total: 0 };
  
  return (
    <div>
      <Title level={2}>学习排行榜</Title>
      <Text type="secondary">查看学习者的排名，激励自己不断进步。</Text>
      
      <Divider />
      
      {!privacySettings.participateInLeaderboard && (
        <Paragraph type="warning" style={{ marginBottom: 16 }}>
          你当前已关闭排行榜参与功能。你可以在设置中开启此功能，与其他学习者一起竞争。
        </Paragraph>
      )}
      
      <Row gutter={16}>
        <Col xs={24} md={16}>
          <StyledCard
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>
                  <TrophyOutlined style={{ marginRight: 8 }} />
                  {categories.find(c => c.id === activeCategory)?.name || '排行榜'}
                </span>
                <Button 
                  icon={<ReloadOutlined />} 
                  loading={loading}
                  onClick={handleRefresh}
                >
                  刷新
                </Button>
              </div>
            }
          >
            <Tabs activeKey={activeCategory} onChange={handleCategoryChange}>
              {categories.map(category => (
                <TabPane 
                  tab={category.name} 
                  key={category.id}
                />
              ))}
            </Tabs>
            
            <Table
              dataSource={currentLeaderboard}
              columns={columns}
              rowKey="id"
              pagination={false}
              loading={loading}
            />
          </StyledCard>
        </Col>
        
        <Col xs={24} md={8}>
          <UserRankCard>
            <Statistic
              title="你的排名"
              value={currentUserRanking.rank}
              suffix={`/ ${currentUserRanking.total}`}
              prefix={<BarChartOutlined />}
            />
            <Divider />
            <div>
              <Text>当前积分：</Text>
              <Text strong style={{ fontSize: 18 }}>{user.totalPoints}</Text>
            </div>
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">
                距离上一名还需 {currentLeaderboard[0]?.points - user.totalPoints || 0} 积分
              </Text>
            </div>
          </UserRankCard>
          
          <StyledCard title="排行榜规则">
            <Paragraph>
              1. 排行榜根据学习积分进行排名
            </Paragraph>
            <Paragraph>
              2. 完成学习任务可获得积分
            </Paragraph>
            <Paragraph>
              3. 解锁成就可获得额外积分
            </Paragraph>
            <Paragraph>
              4. 日榜每天更新，周榜每周一更新，月榜每月1日更新
            </Paragraph>
            <Paragraph>
              5. 保持学习连续性可获得额外积分加成
            </Paragraph>
          </StyledCard>
          
          <StyledCard title="获取积分方式">
            <List
              size="small"
              dataSource={[
                { action: '完成每日学习目标', points: '+10' },
                { action: '连续学习7天', points: '+50' },
                { action: '解锁成就', points: '+20~100' },
                { action: '完成测验（优秀）', points: '+30' },
                { action: '完成测验（良好）', points: '+20' },
                { action: '完成测验（及格）', points: '+10' },
              ]}
              renderItem={item => (
                <List.Item>
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Text>{item.action}</Text>
                    <Text type="success" strong>{item.points}</Text>
                  </div>
                </List.Item>
              )}
            />
          </StyledCard>
        </Col>
      </Row>
    </div>
  );
};

export default Leaderboard;