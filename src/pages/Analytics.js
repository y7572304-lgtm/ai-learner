import React, { useState } from 'react';
import { Card, Row, Col, Typography, Select, Button, Tabs, Empty } from 'antd';
import { 
  BarChartOutlined, 
  LineChartOutlined, 
  PieChartOutlined, 
  ReloadOutlined,
  DownloadOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectLearningData, refreshAnalytics } from '../store/slices/learningSlice';
import { selectThemeSettings } from '../store/slices/settingsSlice';
import ReactECharts from 'echarts-for-react';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const Analytics = () => {
  const dispatch = useDispatch();
  const learningData = useSelector(selectLearningData);
  const themeSettings = useSelector(selectThemeSettings);
  // 修正数据访问路径
  const learningPlan = learningData?.learningPlan || { daily: [], weekly: [], monthly: [] }; // 提供默认值以防止 undefined
  
  const [timeRange, setTimeRange] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');
  
  // 计算学习时间数据（每日学习时长）
  const getStudyTimeChartOption = () => {
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const dailyStudyTime = days.map(() => 0); // 初始化每周学习时间为0

    // 确保 daily 存在
    if (learningPlan.daily && Array.isArray(learningPlan.daily)) {
      learningPlan.daily.forEach(task => {
        const dayIndex = (new Date().getDay() + parseInt(task.id.slice(1))) % 7; // 简单分配到周一到周日
        dailyStudyTime[dayIndex] += (task.duration || 0) / 60; // 转换为小时，防止 duration undefined
      });
    }

    return {
      title: {
        text: '学习时间分析',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c} 小时'
      },
      xAxis: {
        type: 'category',
        data: days
      },
      yAxis: {
        type: 'value',
        name: '学习时长(小时)'
      },
      series: [{
        data: dailyStudyTime,
        type: 'bar',
        name: '学习时长',
        itemStyle: {
          color: themeSettings.theme === 'tsinghua' ? '#660874' : 
                 themeSettings.theme === 'scut' ? '#c62828' : 
                 themeSettings.theme === 'pku' ? '#162447' : '#1890ff'
        }
      }]
    };
  };
  
  // 计算学科进度数据（基于月度目标）
  const getSubjectProgressChartOption = () => {
    const subjects = learningPlan.monthly && Array.isArray(learningPlan.monthly) 
      ? learningPlan.monthly.map(goal => goal.subject || '未知学科')
      : ['无数据'];
    const progress = learningPlan.monthly && Array.isArray(learningPlan.monthly) 
      ? learningPlan.monthly.map(goal => goal.progress || 0)
      : [0];

    return {
      title: {
        text: '学科进度分析',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c}%'
      },
      xAxis: {
        type: 'category',
        data: subjects
      },
      yAxis: {
        type: 'value',
        name: '完成度(%)',
        max: 100
      },
      series: [{
        data: progress,
        type: 'bar',
        name: '学科进度',
        itemStyle: {
          color: themeSettings.theme === 'tsinghua' ? '#9c27b0' : 
                 themeSettings.theme === 'scut' ? '#e53935' : 
                 themeSettings.theme === 'pku' ? '#1f4068' : '#40a9ff'
        }
      }]
    };
  };
  
  // 计算学习习惯数据（基于每日任务的时间分布）
  const getLearningHabitsChartOption = () => {
    const habits = [
      { name: '早晨学习', value: 0 },
      { name: '下午学习', value: 0 },
      { name: '晚间学习', value: 0 },
      { name: '深夜学习', value: 0 }
    ];

    // 确保 daily 存在
    if (learningPlan.daily && Array.isArray(learningPlan.daily)) {
      learningPlan.daily.forEach(task => {
        if (task.priority === 'high') habits[0].value += task.duration || 0; // 高优先级归为早晨
        else if (task.priority === 'medium') habits[1].value += task.duration || 0; // 中优先级归为下午
        else if (task.priority === 'low') habits[2].value += task.duration || 0; // 低优先级归为晚间
        else habits[3].value += task.duration || 0; // 其他归为深夜
      });
    }

    return {
      title: {
        text: '学习习惯分析',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} 分钟 ({d}%)'
      },
      legend: {
        orient: 'vertical',
        right: 10,
        top: 'center'
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
            show: false
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
          data: habits.filter(habit => habit.value > 0) // 仅显示有数据的习惯
        }
      ]
    };
  };
  
  // 计算学习效率趋势（基于每日任务完成率）
  const getEfficiencyTrendChartOption = () => {
    const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    const efficiency = days.map(() => 0);
    const taskCounts = days.map(() => 0);

    // 确保 daily 存在
    if (learningPlan.daily && Array.isArray(learningPlan.daily)) {
      learningPlan.daily.forEach(task => {
        const dayIndex = (new Date().getDay() + parseInt(task.id.slice(1))) % 7;
        efficiency[dayIndex] += task.completed ? 100 : 0;
        taskCounts[dayIndex]++;
      });
    }

    // 计算平均效率
    efficiency.forEach((value, index) => {
      efficiency[index] = taskCounts[index] > 0 ? value / taskCounts[index] : 0;
    });

    return {
      title: {
        text: '学习效率趋势',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: days
      },
      yAxis: {
        type: 'value',
        name: '效率(%)',
        max: 100
      },
      series: [{
        data: efficiency,
        type: 'line',
        name: '学习效率',
        smooth: true,
        lineStyle: {
          color: themeSettings.theme === 'tsinghua' ? '#660874' : 
                 themeSettings.theme === 'scut' ? '#c62828' : 
                 themeSettings.theme === 'pku' ? '#162447' : '#1890ff',
          width: 3
        },
        areaStyle: {
          color: themeSettings.theme === 'tsinghua' ? 'rgba(102, 8, 116, 0.2)' : 
                 themeSettings.theme === 'scut' ? 'rgba(198, 40, 40, 0.2)' : 
                 themeSettings.theme === 'pku' ? 'rgba(22, 36, 71, 0.2)' : 'rgba(24, 144, 255, 0.2)'
        }
      }]
    };
  };
  
  return (
    <div className="analytics-container">
      <div className="analytics-header" style={{ marginBottom: 24 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2}>学习数据分析</Title>
            <Text type="secondary">深入了解您的学习模式和进度</Text>
          </Col>
          <Col>
            <Select 
              defaultValue="week" 
              style={{ width: 120, marginRight: 16 }} 
              onChange={value => setTimeRange(value)}
            >
              <Option value="day">今日</Option>
              <Option value="week">本周</Option>
              <Option value="month">本月</Option>
              <Option value="year">今年</Option>
            </Select>
            <Button 
              type="primary" 
              icon={<ReloadOutlined />} 
              onClick={() => dispatch(refreshAnalytics())}
            >
              刷新数据
            </Button>
          </Col>
        </Row>
      </div>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane 
          tab={<span><BarChartOutlined />总览</span>} 
          key="overview"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card title="学习时间分析" extra={<Button type="text" icon={<DownloadOutlined />} />}>
                <ReactECharts option={getStudyTimeChartOption()} style={{ height: 300 }} />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="学科进度分析" extra={<Button type="text" icon={<FilterOutlined />} />}>
                <ReactECharts option={getSubjectProgressChartOption()} style={{ height: 300 }} />
              </Card>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} md={12}>
              <Card title="学习习惯分析" extra={<Button type="text" icon={<PieChartOutlined />} />}>
                <ReactECharts option={getLearningHabitsChartOption()} style={{ height: 300 }} />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card title="学习效率趋势" extra={<Button type="text" icon={<LineChartOutlined />} />}>
                <ReactECharts option={getEfficiencyTrendChartOption()} style={{ height: 300 }} />
              </Card>
            </Col>
          </Row>
        </TabPane>
        <TabPane 
          tab={<span><LineChartOutlined />趋势</span>} 
          key="trends"
        >
          <Empty description="更多详细趋势分析即将推出" />
        </TabPane>
        <TabPane 
          tab={<span><PieChartOutlined />习惯</span>} 
          key="habits"
        >
          <Empty description="更多详细习惯分析即将推出" />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Analytics;
