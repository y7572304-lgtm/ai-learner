import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, Tabs, List, Tag, Progress, Divider, Modal, Form, Input, Select, InputNumber, DatePicker } from 'antd';
import { 
  CalendarOutlined, 
  ClockCircleOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  PlusOutlined,
  RocketOutlined,
  BookOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectLearningPlan, selectSubjects, selectRecommendations, updateLearningPlan, generateAIRecommendations } from '../store/slices/learningSlice';
import { selectThemeSettings } from '../store/slices/settingsSlice';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

const LearningPlan = () => {
  const dispatch = useDispatch();
  const themeSettings = useSelector(selectThemeSettings);
  const learningPlan = useSelector(state => state.learning.learningData.learningPlan);
  const subjects = useSelector(state => state.learning.learningData.subjects);
  const recommendations = useSelector(state => state.learning.learningData.recommendations);
  
  const [activeTab, setActiveTab] = useState('daily');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form] = Form.useForm();
  
  // 显示添加/编辑任务模态框
  const showModal = (task = null) => {
    setEditingTask(task);
    if (task) {
      form.setFieldsValue({
        subject: task.subject,
        duration: task.duration,
        priority: task.priority
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };
  
  // 处理模态框确认
  const handleOk = () => {
    form.validateFields().then(values => {
      const newTask = {
        id: editingTask ? editingTask.id : `d${Date.now()}`,
        subject: values.subject,
        duration: values.duration,
        priority: values.priority,
        completed: editingTask ? editingTask.completed : false
      };
      
      let updatedDailyTasks;
      if (editingTask) {
        // 编辑现有任务
        updatedDailyTasks = learningPlan.daily.map(task => 
          task.id === editingTask.id ? newTask : task
        );
      } else {
        // 添加新任务
        updatedDailyTasks = [...learningPlan.daily, newTask];
      }
      
      dispatch(updateLearningPlan({
        ...learningPlan,
        daily: updatedDailyTasks
      }));
      
      setIsModalVisible(false);
    });
  };
  
  // 处理模态框取消
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  // 生成AI推荐
  const handleGenerateRecommendations = () => {
    dispatch(generateAIRecommendations());
  };
  
  // 标记任务完成/未完成
  const toggleTaskCompletion = (taskId) => {
    const updatedDailyTasks = learningPlan.daily.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    
    dispatch(updateLearningPlan({
      ...learningPlan,
      daily: updatedDailyTasks
    }));
  };
  
  // 删除任务
  const deleteTask = (taskId) => {
    Modal.confirm({
      title: '确认删除',
      content: '您确定要删除这个任务吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const updatedDailyTasks = learningPlan.daily.filter(task => task.id !== taskId);
        
        dispatch(updateLearningPlan({
          ...learningPlan,
          daily: updatedDailyTasks
        }));
      }
    });
  };
  
  // 更新周计划任务完成状态
  const toggleWeeklyTaskCompletion = (planId, taskIndex) => {
    const updatedWeeklyPlans = learningPlan.weekly.map(plan => {
      if (plan.id === planId) {
        const updatedCompleted = [...plan.completed];
        updatedCompleted[taskIndex] = !updatedCompleted[taskIndex];
        return { ...plan, completed: updatedCompleted };
      }
      return plan;
    });
    
    dispatch(updateLearningPlan({
      ...learningPlan,
      weekly: updatedWeeklyPlans
    }));
  };
  
  // 更新月度目标进度
  const updateMonthlyGoalProgress = (goalId, newProgress) => {
    const updatedMonthlyGoals = learningPlan.monthly.map(goal => {
      if (goal.id === goalId) {
        return { ...goal, progress: newProgress };
      }
      return goal;
    });
    
    dispatch(updateLearningPlan({
      ...learningPlan,
      monthly: updatedMonthlyGoals
    }));
  };
  
  // 获取优先级标签颜色
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
  
  // 获取优先级标签文本
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
    <div className="learning-plan-container">
      <div className="learning-plan-header" style={{ marginBottom: 24 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={2}>学习计划</Title>
            <Text type="secondary">管理您的学习任务和目标</Text>
          </Col>
          <Col>
            <Button 
              type="primary" 
              icon={<RocketOutlined />} 
              onClick={handleGenerateRecommendations}
              style={{ marginRight: 16 }}
            >
              AI推荐
            </Button>
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              onClick={() => showModal()}
            >
              添加任务
            </Button>
          </Col>
        </Row>
      </div>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane 
          tab={<span><CalendarOutlined />每日计划</span>} 
          key="daily"
        >
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4 }}
            dataSource={learningPlan.daily}
            renderItem={item => (
              <List.Item>
                <Card 
                  title={item.subject}
                  extra={
                    <Tag color={getPriorityColor(item.priority)}>
                      {getPriorityText(item.priority)}优先级
                    </Tag>
                  }
                  actions={[
                    <Button 
                      type="text" 
                      icon={<CheckCircleOutlined />} 
                      onClick={() => toggleTaskCompletion(item.id)}
                    >
                      {item.completed ? '已完成' : '完成'}
                    </Button>,
                    <Button 
                      type="text" 
                      icon={<EditOutlined />} 
                      onClick={() => showModal(item)}
                    />,
                    <Button 
                      type="text" 
                      icon={<DeleteOutlined />} 
                      onClick={() => deleteTask(item.id)}
                    />
                  ]}
                  style={{ 
                    opacity: item.completed ? 0.7 : 1,
                    backgroundColor: item.completed ? '#f6ffed' : 'white'
                  }}
                >
                  <div>
                    <ClockCircleOutlined /> 学习时长: {item.duration} 分钟
                  </div>
                  {item.completed && (
                    <div style={{ marginTop: 8 }}>
                      <Tag color="green">已完成</Tag>
                    </div>
                  )}
                </Card>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane 
          tab={<span><BookOutlined />周计划</span>} 
          key="weekly"
        >
          {learningPlan.weekly.map(plan => (
            <Card 
              key={plan.id}
              title={`${plan.subject}周计划`}
              style={{ marginBottom: 16 }}
            >
              <List
                dataSource={plan.tasks}
                renderItem={(task, index) => (
                  <List.Item
                    actions={[
                      <Button 
                        type="text" 
                        icon={<CheckCircleOutlined />} 
                        onClick={() => toggleWeeklyTaskCompletion(plan.id, index)}
                      >
                        {plan.completed[index] ? '已完成' : '完成'}
                      </Button>
                    ]}
                    style={{ 
                      opacity: plan.completed[index] ? 0.7 : 1,
                      backgroundColor: plan.completed[index] ? '#f6ffed' : 'white'
                    }}
                  >
                    <List.Item.Meta
                      title={task}
                    />
                    {plan.completed[index] && <Tag color="green">已完成</Tag>}
                  </List.Item>
                )}
              />
            </Card>
          ))}
        </TabPane>
        <TabPane 
          tab={<span><RocketOutlined />月度目标</span>} 
          key="monthly"
        >
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
            dataSource={learningPlan.monthly}
            renderItem={item => (
              <List.Item>
                <Card title={`${item.subject}月度目标`}>
                  <p>{item.goal}</p>
                  <div style={{ marginTop: 16 }}>
                    <Text>进度: {item.progress}%</Text>
                    <Progress percent={item.progress} />
                  </div>
                  <div style={{ marginTop: 16, textAlign: 'right' }}>
                    <Button 
                      type="primary" 
                      size="small"
                      onClick={() => {
                        const newProgress = Math.min(100, item.progress + 5);
                        updateMonthlyGoalProgress(item.id, newProgress);
                      }}
                    >
                      更新进度
                    </Button>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
      
      {/* AI推荐区域 */}
      {recommendations.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <Divider orientation="left">AI学习推荐</Divider>
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 3, xl: 3, xxl: 4 }}
            dataSource={recommendations}
            renderItem={item => (
              <List.Item>
                <Card 
                  size="small"
                  title={item.title}
                  extra={<Tag color="blue">{item.type}</Tag>}
                >
                  <p>{item.description}</p>
                  <div style={{ textAlign: 'right', marginTop: 8 }}>
                    <Button type="link" href={item.link}>
                      查看详情
                    </Button>
                  </div>
                </Card>
              </List.Item>
            )}
          />
        </div>
      )}
      
      {/* 添加/编辑任务模态框 */}
      <Modal
        title={editingTask ? "编辑任务" : "添加新任务"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={editingTask ? "保存" : "添加"}
        cancelText="取消"
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="subject"
            label="学科"
            rules={[{ required: true, message: '请选择学科' }]}
          >
            <Select placeholder="选择学科">
              {subjects.map(subject => (
                <Option key={subject.id} value={subject.name}>{subject.name}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="duration"
            label="学习时长(分钟)"
            rules={[{ required: true, message: '请输入学习时长' }]}
          >
            <InputNumber min={5} max={240} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="priority"
            label="优先级"
            rules={[{ required: true, message: '请选择优先级' }]}
          >
            <Select placeholder="选择优先级">
              <Option value="high">高优先级</Option>
              <Option value="medium">中优先级</Option>
              <Option value="low">低优先级</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LearningPlan;