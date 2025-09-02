import React, { useState } from 'react';
import { 
  Row, 
  Col, 
  Card, 
  Form, 
  Switch, 
  Select, 
  Button, 
  Typography, 
  Divider, 
  Radio,
  Slider,
  InputNumber,
  message,
  Collapse,
  Space,
  Tag
} from 'antd';
import { 
  SettingOutlined, 
  BellOutlined, 
  LockOutlined,
  SoundOutlined,
  ThemeOutlined,
  SaveOutlined,
  ExperimentOutlined,
  UserOutlined,
  TrophyOutlined,
  BookOutlined
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectSettings, 
  updateNotificationSettings,
  updatePrivacySettings,
  updateVoiceSettings,
  updateThemeSettings,
  updateLearningSettings,
  resetSettings
} from '../store/slices/settingsSlice';
import { selectThemes } from '../store/slices/settingsSlice';
import styled from 'styled-components';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const StyledCard = styled(Card)`
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
`;

const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector(selectSettings);
  const themes = useSelector(selectThemes);
  
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  // 保存设置
  const handleSave = (values) => {
    setLoading(true);
    
    // 更新通知设置
    dispatch(updateNotificationSettings({
      enableNotifications: values.enableNotifications,
      notificationFrequency: values.notificationFrequency,
      enableSoundAlerts: values.enableSoundAlerts,
      enableProgressNotifications: values.enableProgressNotifications,
      enableAchievementNotifications: values.enableAchievementNotifications
    }));
    
    // 更新隐私设置
    dispatch(updatePrivacySettings({
      shareProgress: values.shareProgress,
      participateInLeaderboard: values.participateInLeaderboard,
      showRealName: values.showRealName,
      dataCollection: values.dataCollection
    }));
    
    // 更新语音设置
    dispatch(updateVoiceSettings({
      enableVoiceAssistant: values.enableVoiceAssistant,
      voiceGender: values.voiceGender,
      voiceSpeed: values.voiceSpeed,
      voiceVolume: values.voiceVolume,
      enableVoiceCommands: values.enableVoiceCommands
    }));
    
    // 更新主题设置
    dispatch(updateThemeSettings({
      theme: values.theme,
      enableDarkMode: values.enableDarkMode,
      fontSize: values.fontSize,
      animationLevel: values.animationLevel
    }));
    
    // 更新学习设置
    dispatch(updateLearningSettings({
      dailyGoalMinutes: values.dailyGoalMinutes,
      weeklyGoalDays: values.weeklyGoalDays,
      reminderTime: values.reminderTime,
      difficultyLevel: values.difficultyLevel
    }));
    
    // 模拟保存过程
    setTimeout(() => {
      setLoading(false);
      message.success('设置已保存');
    }, 1000);
  };
  
  // 重置设置
  const handleReset = () => {
    dispatch(resetSettings());
    form.resetFields();
    message.info('设置已重置为默认值');
  };
  
  return (
    <div>
      <Title level={2}>设置</Title>
      <Text type="secondary">自定义你的学习体验和偏好设置。</Text>
      
      <Divider />
      
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          // 通知设置
          enableNotifications: settings.notifications.enableNotifications,
          notificationFrequency: settings.notifications.notificationFrequency,
          enableSoundAlerts: settings.notifications.enableSoundAlerts,
          enableProgressNotifications: settings.notifications.enableProgressNotifications,
          enableAchievementNotifications: settings.notifications.enableAchievementNotifications,
          
          // 隐私设置
          shareProgress: settings.privacy.shareProgress,
          participateInLeaderboard: settings.privacy.participateInLeaderboard,
          showRealName: settings.privacy.showRealName,
          dataCollection: settings.privacy.dataCollection,
          
          // 语音设置
          enableVoiceAssistant: settings.voice.enableVoiceAssistant,
          voiceGender: settings.voice.voiceGender,
          voiceSpeed: settings.voice.voiceSpeed,
          voiceVolume: settings.voice.voiceVolume,
          enableVoiceCommands: settings.voice.enableVoiceCommands,
          
          // 主题设置
          theme: settings.theme.theme,
          enableDarkMode: settings.theme.enableDarkMode,
          fontSize: settings.theme.fontSize,
          animationLevel: settings.theme.animationLevel,
          
          // 学习设置
          dailyGoalMinutes: settings.learning.dailyGoalMinutes,
          weeklyGoalDays: settings.learning.weeklyGoalDays,
          reminderTime: settings.learning.reminderTime,
          difficultyLevel: settings.learning.difficultyLevel
        }}
        onFinish={handleSave}
      >
        <Collapse defaultActiveKey={['notifications', 'theme']}>
          <Panel 
            header={
              <span>
                <BellOutlined style={{ marginRight: 8 }} />
                通知设置
              </span>
            } 
            key="notifications"
          >
            <StyledCard>
              <Form.Item
                name="enableNotifications"
                label="启用通知"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item
                name="notificationFrequency"
                label="通知频率"
                dependencies={['enableNotifications']}
              >
                <Select disabled={!form.getFieldValue('enableNotifications')}>
                  <Option value="high">高（每天多次）</Option>
                  <Option value="medium">中（每天一次）</Option>
                  <Option value="low">低（每周几次）</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="enableSoundAlerts"
                label="启用声音提醒"
                valuePropName="checked"
                dependencies={['enableNotifications']}
              >
                <Switch disabled={!form.getFieldValue('enableNotifications')} />
              </Form.Item>
              
              <Form.Item
                name="enableProgressNotifications"
                label="学习进度通知"
                valuePropName="checked"
                dependencies={['enableNotifications']}
              >
                <Switch disabled={!form.getFieldValue('enableNotifications')} />
              </Form.Item>
              
              <Form.Item
                name="enableAchievementNotifications"
                label="成就解锁通知"
                valuePropName="checked"
                dependencies={['enableNotifications']}
              >
                <Switch disabled={!form.getFieldValue('enableNotifications')} />
              </Form.Item>
            </StyledCard>
          </Panel>
          
          <Panel 
            header={
              <span>
                <LockOutlined style={{ marginRight: 8 }} />
                隐私设置
              </span>
            } 
            key="privacy"
          >
            <StyledCard>
              <Form.Item
                name="shareProgress"
                label="分享学习进度"
                valuePropName="checked"
                extra="允许其他用户查看你的学习进度"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item
                name="participateInLeaderboard"
                label="参与排行榜"
                valuePropName="checked"
                extra="你的学习数据将用于排行榜排名"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item
                name="showRealName"
                label="显示真实姓名"
                valuePropName="checked"
                extra="在排行榜和社区中显示你的真实姓名"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item
                name="dataCollection"
                label="数据收集"
                valuePropName="checked"
                extra="允许收集匿名学习数据以改进AI算法"
              >
                <Switch />
              </Form.Item>
            </StyledCard>
          </Panel>
          
          <Panel 
            header={
              <span>
                <SoundOutlined style={{ marginRight: 8 }} />
                语音助手设置
              </span>
            } 
            key="voice"
          >
            <StyledCard>
              <Form.Item
                name="enableVoiceAssistant"
                label="启用语音助手"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item
                name="voiceGender"
                label="语音性别"
                dependencies={['enableVoiceAssistant']}
              >
                <Radio.Group disabled={!form.getFieldValue('enableVoiceAssistant')}>
                  <Radio value="male">男声</Radio>
                  <Radio value="female">女声</Radio>
                </Radio.Group>
              </Form.Item>
              
              <Form.Item
                name="voiceSpeed"
                label="语音速度"
                dependencies={['enableVoiceAssistant']}
              >
                <Slider
                  min={0.5}
                  max={2}
                  step={0.1}
                  disabled={!form.getFieldValue('enableVoiceAssistant')}
                  marks={{
                    0.5: '慢',
                    1: '正常',
                    1.5: '快',
                    2: '很快'
                  }}
                />
              </Form.Item>
              
              <Form.Item
                name="voiceVolume"
                label="语音音量"
                dependencies={['enableVoiceAssistant']}
              >
                <Slider
                  min={0}
                  max={100}
                  step={10}
                  disabled={!form.getFieldValue('enableVoiceAssistant')}
                  marks={{
                    0: '静音',
                    50: '中等',
                    100: '最大'
                  }}
                />
              </Form.Item>
              
              <Form.Item
                name="enableVoiceCommands"
                label="启用语音命令"
                valuePropName="checked"
                dependencies={['enableVoiceAssistant']}
                extra="允许通过语音控制应用"
              >
                <Switch disabled={!form.getFieldValue('enableVoiceAssistant')} />
              </Form.Item>
            </StyledCard>
          </Panel>
          
          <Panel 
            header={
              <span>
                <ExperimentOutlined style={{ marginRight: 8 }} />
                主题设置
              </span>
            } 
            key="theme"
          >
            <StyledCard>
              <Form.Item
                name="theme"
                label="校园主题"
              >
                <Select>
                  {themes.map(theme => (
                    <Option key={theme.id} value={theme.id}>
                      <Space>
                        {theme.name}
                        {theme.isNew && <Tag color="green">新</Tag>}
                      </Space>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              
              <Form.Item
                name="enableDarkMode"
                label="深色模式"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              
              <Form.Item
                name="fontSize"
                label="字体大小"
              >
                <Radio.Group>
                  <Radio value="small">小</Radio>
                  <Radio value="medium">中</Radio>
                  <Radio value="large">大</Radio>
                </Radio.Group>
              </Form.Item>
              
              <Form.Item
                name="animationLevel"
                label="动画效果"
              >
                <Radio.Group>
                  <Radio value="none">无</Radio>
                  <Radio value="minimal">最小</Radio>
                  <Radio value="moderate">适中</Radio>
                  <Radio value="full">全部</Radio>
                </Radio.Group>
              </Form.Item>
            </StyledCard>
          </Panel>
          
          <Panel 
            header={
              <span>
                <BookOutlined style={{ marginRight: 8 }} />
                学习设置
              </span>
            } 
            key="learning"
          >
            <StyledCard>
              <Form.Item
                name="dailyGoalMinutes"
                label="每日学习目标（分钟）"
              >
                <InputNumber min={5} max={240} step={5} />
              </Form.Item>
              
              <Form.Item
                name="weeklyGoalDays"
                label="每周学习天数"
              >
                <InputNumber min={1} max={7} />
              </Form.Item>
              
              <Form.Item
                name="reminderTime"
                label="提醒时间"
              >
                <Select>
                  <Option value="morning">早上 (8:00)</Option>
                  <Option value="noon">中午 (12:00)</Option>
                  <Option value="afternoon">下午 (15:00)</Option>
                  <Option value="evening">晚上 (20:00)</Option>
                </Select>
              </Form.Item>
              
              <Form.Item
                name="difficultyLevel"
                label="难度级别"
              >
                <Radio.Group>
                  <Radio value="easy">简单</Radio>
                  <Radio value="medium">中等</Radio>
                  <Radio value="hard">困难</Radio>
                  <Radio value="adaptive">自适应</Radio>
                </Radio.Group>
              </Form.Item>
            </StyledCard>
          </Panel>
        </Collapse>
        
        <Divider />
        
        <Form.Item>
          <Space>
            <Button 
              type="primary" 
              htmlType="submit" 
              icon={<SaveOutlined />}
              loading={loading}
            >
              保存设置
            </Button>
            <Button 
              onClick={handleReset}
            >
              重置为默认
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Settings;