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
  
  const [timeRange, setTimeRange] = useState('week');
  const [activeTab, setActiveTab] = useState('overview');
  
  // 学习时间图表选项
  const getStudyTimeChartOption = () => {
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
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value',
        name: '学习时长(小时)'
      },
      series: [{
        data: [3.5, 4.2, 5.0, 4.8, 3.9, 5.5, 4.5],
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
  
  // 学科进度图表选项
  const getSubjectProgressChartOption = () => {
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
        data: ['数学', '英语', '物理', '化学', '生物', '历史']
      },
      yAxis: {
        type: 'value',
        name: '完成度(%)',
        max: 100
      },
      series: [{
        data: [85, 70, 90, 65, 75, 60],
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
  
  // 学习习惯图表选项
  const getLearningHabitsChartOption = () => {
    return {
      title: {
        text: '学习习惯分析',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
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
          data: [
            { value: 35, name: '早晨学习' },
            { value: 25, name: '下午学习' },
            { value: 30, name: '晚间学习' },
            { value: 10, name: '深夜学习' }
          ]
        }
      ]
    };
  };
  
  // 效率趋势图表选项
  const getEfficiencyTrendChartOption = () => {
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
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value',
        name: '效率(%)',
        max: 100
      },
      series: [{
        data: [75, 82, 78, 85, 80, 88, 85],
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