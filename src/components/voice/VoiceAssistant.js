import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from 'antd';
import { SoundOutlined, AudioMutedOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectVoiceSettings } from '../../store/slices/settingsSlice';

const VoiceAssistant = () => {
  const voiceSettings = useSelector(selectVoiceSettings);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  // 励志句子数组
  const inspirationalSentences = [
    '每一次努力都是向梦想迈进的一步！',
    '坚持不懈，你将创造奇迹！',
    '相信自己，你比想象中更强大！',
    '今天的小进步，明天的大成功！',
    '勇敢追梦，世界因你而不同！',
  ];

  // 语音助手功能仅在启用时显示
  if (!voiceSettings.enableVoiceAssistant) {
    return null;
  }

  // 初始化语音识别
  useEffect(() => {
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recog = new SpeechRecognition();
      recog.lang = 'zh-CN'; // 设置为中文
      recog.interimResults = false; // 不返回中间结果
      recog.maxAlternatives = 1; // 返回最佳匹配结果

      // 当检测到语音时触发
      recog.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        sayPredefinedSentence();
      };

      // 语音识别错误处理
      recog.onerror = (event) => {
        console.error('语音识别错误:', event.error);
        setIsListening(false); // 出错时停止监听
      };

      // 语音识别结束时
      recog.onend = () => {
        setIsListening(false); // 停止监听
      };

      setRecognition(recog);
    } else {
      console.warn('浏览器不支持 Web Speech API');
    }
  }, []);

  // 随机输出励志句子
  const sayPredefinedSentence = () => {
    const sentence = inspirationalSentences[Math.floor(Math.random() * inspirationalSentences.length)];
    console.log(sentence); // 在控制台输出随机励志句子
    // 使用 SpeechSynthesis API 读出句子
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(sentence);
      utterance.lang = 'zh-CN';
      window.speechSynthesis.speak(utterance);
    }
  };

  // 切换监听状态
  const toggleListening = () => {
    if (!recognition) return;

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
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
        disabled={!recognition} // 如果浏览器不支持语音识别，禁用按钮
      />
    </Tooltip>
  );
};

export default VoiceAssistant;
