import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Statistic, Progress, List, Typography, Tag, Button, Space, Divider } from 'antd';
import { 
  ClockCircleOutlined, 
  FireOutlined, 
  TrophyOutlined, 
  RiseOutlined,
  BookOutlined,
  CheckCircleOutlined,
  StarOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReactECharts from 'echarts-for-react';
import { selectLearningData } from '../store/slices/learningSlice';
import { selectAchievements } from '../store/slices/achievementsSlice';
import { selectThemeSettings } from '../store/slices/settingsSlice';

const { Title, Text } = Typography;

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const learningData = useSelector(selectLearningData);
  const achievements = useSelector(selectAchievements);
  const themeSettings = useSelector(selectThemeSettings);
  
  // 确保achievements.recentAchievements存在
  const recentAchievements = achievements?.recentAchievements || [];
  
  // 学习时间统计图表选项
  const getTimeChartOption = () => {
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const data = [2.5, 3.8, 4.2, 2.1, 5.3, 6.2, 4.5]; // 示例数据
    
    return {
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c} 小时'
      },
      xAxis: {
        type: 'category',
        data: days,
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      },
      yAxis: {
        type: 'value',
        name: '学习时长(小时)',
        nameTextStyle: {
          color: '#666'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#eee'
          }
        }
      },
      series: [{
        data: data,
        type: 'bar',
        name: '学习时长',
        itemStyle: {
          color: themeSettings.theme === 'tsinghua' ? '#660874' : 
                 themeSettings.theme === 'scut' ? '#c62828' : 
                 themeSettings.theme === 'pku' ? '#162447' : '#1890ff'
        },
        emphasis: {
          itemStyle: {
            color: themeSettings.theme === 'tsinghua' ? '#9c27b0' : 
                   themeSettings.theme === 'scut' ? '#e53935' : 
                   themeSettings.theme === 'pku' ? '#1f4068' : '#40a9ff'
          }
        }
      }]
    };
  };
  
  // 学习进度雷达图选项
  const getRadarChartOption = () => {
    return {
      tooltip: {},
      radar: {
        indicator: [
          { name: '数学', max: 100 },
          { name: '英语', max: 100 },
          { name: '物理', max: 100 },
          { name: '化学', max: 100 },
          { name: '生物', max: 100 },
          { name: '历史', max: 100 }
        ],
        radius: '65%',
        axisName: {
          color: '#666'
        }
      },
      series: [{
        name: '学习进度',
        type: 'radar',
        data: [
          {
            value: [85, 70, 90, 65, 75, 60],
            name: '当前进度',
            areaStyle: {
              color: themeSettings.theme === 'tsinghua' ? 'rgba(102, 8, 116, 0.2)' : 
                     themeSettings.theme === 'scut' ? 'rgba(198, 40, 40, 0.2)' : 
                     themeSettings.theme === 'pku' ? 'rgba(22, 36, 71, 0.2)' : 'rgba(24, 144, 255, 0.2)'
            },
            lineStyle: {
              color: themeSettings.theme === 'tsinghua' ? '#660874' : 
                     themeSettings.theme === 'scut' ? '#c62828' : 
                     themeSettings.theme === 'pku' ? '#162447' : '#1890ff'
            },
            itemStyle: {
              color: themeSettings.theme === 'tsinghua' ? '#660874' : 
                     themeSettings.theme === 'scut' ? '#c62828' : 
                     themeSettings.theme === 'pku' ? '#162447' : '#1890ff'
            }
          }
        ]
      }]
    };
  };
  
  // 学习习惯饼图选项
  const getHabitChartOption = () => {
    return {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center',
        data: ['早晨学习', '下午学习', '晚间学习', '深夜学习'],
        textStyle: {
          color: '#666'
        }
      },
      series: [
        {
          name: '学习习惯',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 35, name: '早晨学习' },
            { value: 25, name: '下午学习' },
            { value: 30, name: '晚间学习' },
            { value: 10, name: '深夜学习' }
          ],
          color: [
            themeSettings.theme === 'tsinghua' ? '#660874' : 
            themeSettings.theme === 'scut' ? '#c62828' : 
            themeSettings.theme === 'pku' ? '#162447' : '#1890ff',
            
            themeSettings.theme === 'tsinghua' ? '#9c27b0' : 
            themeSettings.theme === 'scut' ? '#e53935' : 
            themeSettings.theme === 'pku' ? '#1f4068' : '#40a9ff',
            
            themeSettings.theme === 'tsinghua' ? '#d05ce3' : 
            themeSettings.theme === 'scut' ? '#ff5252' : 
            themeSettings.theme === 'pku' ? '#e43f5a' : '#69c0ff',
            
            themeSettings.theme === 'tsinghua' ? '#e1bee7' : 
            themeSettings.theme === 'scut' ? '#ffcdd2' : 
            themeSettings.theme === 'pku' ? '#8d99ae' : '#bae7ff'
          ]
        }
      ]
    };
  };
  
  // 最近学习活动
  const recentActivities = [
    { id: 1, subject: '高等数学', activity: '完成了微积分练习', time: '今天 14:30', tag: '作业' },
    { id: 2, subject: '英语', activity: '背诵了50个单词', time: '今天 11:20', tag: '背诵' },
    { id: 3, subject: '物理', activity: '观看了力学视频课程', time: '昨天 19:45', tag: '视频' },
    { id: 4, subject: '编程', activity: '完成了Python项目', time: '昨天 16:10', tag: '项目' },
    { id: 5, subject: '化学', activity: '参加了在线测验', time: '前天 10:30', tag: '测验' }
  ];
  
  // 即将到来的任务
  const upcomingTasks = [
    { id: 1, task: '高等数学期中考试', deadline: '3天后', priority: 'high' },
    { id: 2, task: '英语演讲准备', deadline: '5天后', priority: 'medium' },
    { id: 3, task: '物理实验报告', deadline: '1周后', priority: 'medium' },
    { id: 4, task: '编程项目提交', deadline: '2周后', priority: 'low' }
  ];
  
  // 优先级标签颜色
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high':
        return 'red';
      case 'medium':
        return 'orange';
      case 'low':
        return 'green';
      default:
        return 'blue';
    }
  };
  
  // 优先级标签文本
  const getPriorityText = (priority) => {
    switch(priority) {
      case 'high':
        return '高';
      case 'medium':
        return '中';
      case 'low':
        return '低';
      default:
        return '未设置';
    }
  };
  
  return (
    <div className="dashboard-container">
      <Title level={2}>学习仪表盘</Title>
      <Text type="secondary">欢迎回来！这是您的学习概览</Text>
      
      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="今日学习时长"
              value={4.5}
              suffix="小时"
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">目标: 6小时</Text>
              <Progress percent={75} showInfo={false} strokeColor="#1890ff" />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="连续学习天数"
              value={12}
              prefix={<FireOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">历史最高: 21天</Text>
              <Progress percent={57} showInfo={false} strokeColor="#ff4d4f" />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="获得成就"
              value={8}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">总成就: 25个</Text>
              <Progress percent={32} showInfo={false} strokeColor="#faad14" />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="学习效率"
              value={85}
              suffix="%"
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div style={{ marginTop: 8 }}>
              <Text type="secondary">较上周: +5%</Text>
              <Progress percent={85} showInfo={false} strokeColor="#52c41a" />
            </div>
          </Card>
        </Col>
      </Row>
      
      {/* 图表区域 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="本周学习时间统计" bordered={false}>
            <ReactECharts option={getTimeChartOption()} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="学习进度分布" bordered={false}>
            <ReactECharts option={getRadarChartOption()} style={{ height: 300 }} />
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="学习习惯分析" bordered={false}>
            <ReactECharts option={getHabitChartOption()} style={{ height: 300 }} />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="最近学习活动" bordered={false} style={{ height: 342 }}>
            <List
              itemLayout="horizontal"
              dataSource={recentActivities}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<BookOutlined style={{ fontSize: 24, color: '#1890ff' }} />}
                    title={<span>{item.subject} - {item.activity}</span>}
                    description={item.time}
                  />
                  <Tag color="blue">{item.tag}</Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      
      {/* 任务和成就 */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={12}>
          <Card title="即将到来的任务" bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={upcomingTasks}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button type="text" icon={<CheckCircleOutlined />}>完成</Button>
                  ]}
                >
                  <List.Item.Meta
                    title={item.task}
                    description={`截止时间: ${item.deadline}`}
                  />
                  <Tag color={getPriorityColor(item.priority)}>
                    {getPriorityText(item.priority)}优先级
                  </Tag>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="最近获得的成就" bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={recentAchievements?.slice(0, 4) || []}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<StarOutlined style={{ fontSize: 24, color: '#faad14' }} />}
                    title={item?.name || '未命名成就'}
                    description={item?.description || '成就描述'}
                  />
                  <Text type="secondary">{item?.date || '未知日期'}</Text>
                </List.Item>
              )}
            />
            <Divider style={{ margin: '12px 0' }} />
            <div style={{ textAlign: 'center' }}>
              <Button type="link" onClick={() => navigate('/achievements')}>
                查看全部成就
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;