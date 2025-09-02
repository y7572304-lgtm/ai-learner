import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { SoundOutlined, AudioMutedOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectVoiceSettings } from '../../store/slices/settingsSlice';

const VoiceAssistant = () => {
  const voiceSettings = useSelector(selectVoiceSettings);
  const [isListening, setIsListening] = useState(false);
  
  // 语音助手功能仅在启用时显示
  if (!voiceSettings.enableVoiceAssistant) {
    return null;
  }
  
  const toggleListening = () => {
    setIsListening(!isListening);
    // 这里可以添加实际的语音识别逻辑
  };
  
  return (
    <Tooltip title={isListening ? "点击停止语音助手" : "点击启动语音助手"}>
      <Button
        type="text"
        icon={isListening ? <SoundOutlined /> : <AudioMutedOutlined />}
        onClick={toggleListening}
        className={isListening ? 'voice-assistant-active' : ''}
        style={{ 
          color: '#fff', 
          marginRight: 16,
          backgroundColor: isListening ? 'rgba(255, 255, 255, 0.2)' : 'transparent'
        }}
      />
    </Tooltip>
  );
};

export default VoiceAssistant;