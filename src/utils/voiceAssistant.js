// 语音助手工具函数

// 检查浏览器是否支持语音合成
export const isSpeechSynthesisSupported = () => {
  return 'speechSynthesis' in window;
};

// 检查浏览器是否支持语音识别
export const isSpeechRecognitionSupported = () => {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};

// 获取可用的语音
export const getAvailableVoices = () => {
  if (!isSpeechSynthesisSupported()) {
    return [];
  }
  
  return window.speechSynthesis.getVoices().filter(voice => 
    voice.lang.startsWith('zh') || voice.lang.startsWith('en')
  );
};

// 语音合成（文本转语音）
export const speak = (text, options = {}) => {
  if (!isSpeechSynthesisSupported()) {
    console.error('当前浏览器不支持语音合成');
    return false;
  }
  
  // 停止当前正在播放的语音
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // 设置语音参数
  utterance.volume = options.volume !== undefined ? options.volume / 100 : 1; // 音量 (0 到 1)
  utterance.rate = options.rate !== undefined ? options.rate : 1; // 语速 (0.1 到 10)
  utterance.pitch = options.pitch !== undefined ? options.pitch : 1; // 音调 (0 到 2)
  
  // 设置语言
  utterance.lang = options.language || 'zh-CN';
  
  // 设置声音
  if (options.voice) {
    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(v => v.name === options.voice);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
  } else {
    // 尝试找到中文女声
    const voices = window.speechSynthesis.getVoices();
    const chineseVoice = voices.find(v => 
      v.lang.startsWith('zh') && v.name.includes('Female')
    );
    if (chineseVoice) {
      utterance.voice = chineseVoice;
    }
  }
  
  // 事件处理
  if (options.onStart) {
    utterance.onstart = options.onStart;
  }
  
  if (options.onEnd) {
    utterance.onend = options.onEnd;
  }
  
  if (options.onError) {
    utterance.onerror = options.onError;
  }
  
  // 播放语音
  window.speechSynthesis.speak(utterance);
  
  return true;
};

// 初始化语音识别
export const initSpeechRecognition = (options = {}) => {
  if (!isSpeechRecognitionSupported()) {
    console.error('当前浏览器不支持语音识别');
    return null;
  }
  
  // 创建语音识别实例
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  // 设置参数
  recognition.lang = options.language || 'zh-CN';
  recognition.continuous = options.continuous !== undefined ? options.continuous : false;
  recognition.interimResults = options.interimResults !== undefined ? options.interimResults : false;
  recognition.maxAlternatives = options.maxAlternatives || 1;
  
  // 设置事件处理函数
  if (options.onResult) {
    recognition.onresult = options.onResult;
  }
  
  if (options.onStart) {
    recognition.onstart = options.onStart;
  }
  
  if (options.onEnd) {
    recognition.onend = options.onEnd;
  }
  
  if (options.onError) {
    recognition.onerror = options.onError;
  }
  
  return recognition;
};

// 开始语音识别
export const startListening = (recognition) => {
  if (!recognition) {
    console.error('语音识别未初始化');
    return false;
  }
  
  try {
    recognition.start();
    return true;
  } catch (error) {
    console.error('启动语音识别失败:', error);
    return false;
  }
};

// 停止语音识别
export const stopListening = (recognition) => {
  if (!recognition) {
    console.error('语音识别未初始化');
    return false;
  }
  
  try {
    recognition.stop();
    return true;
  } catch (error) {
    console.error('停止语音识别失败:', error);
    return false;
  }
};

// 生成鼓励语音消息
export const generateMotivationalMessage = (userData, context = 'general') => {
  const messages = {
    general: [
      '加油！你正在变得更好！',
      '坚持就是胜利，继续努力！',
      '你的进步令人印象深刻！',
      '每一步都在接近你的目标！',
      '今天的努力，明天的收获！'
    ],
    achievement: [
      '恭喜你解锁了新成就！真棒！',
      '太厉害了！你获得了新的成就徽章！',
      '你的努力得到了回报，新成就已解锁！',
      '又一个里程碑！继续保持这样的势头！',
      '成就达成！你正在成为学习大师！'
    ],
    streak: [
      `连续学习${userData.streak}天了，真是令人印象深刻！`,
      `${userData.streak}天的学习streak！你的毅力值得表扬！`,
      `连续${userData.streak}天不间断学习，这就是成功的秘诀！`,
      `坚持的力量！已经连续学习${userData.streak}天了！`,
      `${userData.streak}天的学习streak！你正在培养一个强大的习惯！`
    ],
    levelUp: [
      `恭喜晋升到${userData.level}级！你正变得越来越强！`,
      `等级提升至${userData.level}级！你的知识库在不断扩大！`,
      `太棒了！你现在是${userData.level}级学习者了！`,
      `升级到${userData.level}级！你的努力没有白费！`,
      `${userData.level}级达成！继续挑战下一个高度！`
    ],
    lowActivity: [
      '今天还没开始学习呢，来完成一个小任务吧！',
      '已经好几天没有学习记录了，现在开始还不晚！',
      '短暂的休息后，是时候重新投入学习了！',
      '保持学习习惯很重要，今天安排一点学习时间吧！',
      '别让学习streak中断，今天抽点时间学习吧！'
    ]
  };
  
  // 根据上下文选择消息类别
  const categoryMessages = messages[context] || messages.general;
  
  // 随机选择一条消息
  const randomIndex = Math.floor(Math.random() * categoryMessages.length);
  return categoryMessages[randomIndex];
};

// 生成进度反馈语音消息
export const generateProgressFeedback = (userData, learningData) => {
  const { subjects } = learningData;
  
  // 计算总体进度
  const totalProgress = subjects.reduce((sum, subject) => sum + subject.progress, 0) / subjects.length;
  
  // 找出进度最高和最低的学科
  let highestSubject = subjects[0];
  let lowestSubject = subjects[0];
  
  subjects.forEach(subject => {
    if (subject.progress > highestSubject.progress) {
      highestSubject = subject;
    }
    if (subject.progress < lowestSubject.progress) {
      lowestSubject = subject;
    }
  });
  
  // 生成反馈消息
  let feedback = `你的总体学习进度已达到${Math.round(totalProgress)}%。`;
  
  // 添加最强和最弱学科的反馈
  feedback += `在${highestSubject.name}方面表现最好，已完成${highestSubject.progress}%。`;
  
  if (lowestSubject.progress < 50) {
    feedback += `建议多关注${lowestSubject.name}，当前进度为${lowestSubject.progress}%。`;
  }
  
  // 添加激励性结束语
  feedback += '继续保持，你正在变得更优秀！';
  
  return feedback;
};

// 处理语音命令
export const processVoiceCommand = (command) => {
  // 转换为小写并去除多余空格
  const normalizedCommand = command.toLowerCase().trim();
  
  // 定义命令关键词和对应的操作
  const commandPatterns = [
    {
      keywords: ['显示', '打开', '查看'],
      subjects: ['仪表盘', '主页', '首页', '概览'],
      action: { type: 'NAVIGATE', target: '/' }
    },
    {
      keywords: ['显示', '打开', '查看'],
      subjects: ['学习计划', '计划', '日程'],
      action: { type: 'NAVIGATE', target: '/learning-plan' }
    },
    {
      keywords: ['显示', '打开', '查看'],
      subjects: ['成就', '徽章', '奖励'],
      action: { type: 'NAVIGATE', target: '/achievements' }
    },
    {
      keywords: ['显示', '打开', '查看'],
      subjects: ['排行榜', '排名', '竞争'],
      action: { type: 'NAVIGATE', target: '/leaderboard' }
    },
    {
      keywords: ['显示', '打开', '查看'],
      subjects: ['个人资料', '资料', '信息'],
      action: { type: 'NAVIGATE', target: '/profile' }
    },
    {
      keywords: ['显示', '打开', '查看'],
      subjects: ['设置', '配置', '选项'],
      action: { type: 'NAVIGATE', target: '/settings' }
    },
    {
      keywords: ['开始', '创建', '生成'],
      subjects: ['学习计划', '计划', '日程'],
      action: { type: 'GENERATE_PLAN' }
    },
    {
      keywords: ['开始', '记录'],
      subjects: ['学习', '学习会话', '学习时间'],
      action: { type: 'START_STUDY_SESSION' }
    },
    {
      keywords: ['结束', '停止', '完成'],
      subjects: ['学习', '学习会话', '学习时间'],
      action: { type: 'END_STUDY_SESSION' }
    },
    {
      keywords: ['显示', '告诉我'],
      subjects: ['进度', '学习进度', '完成情况'],
      action: { type: 'SHOW_PROGRESS' }
    },
    {
      keywords: ['显示', '告诉我'],
      subjects: ['建议', '推荐', '学习建议'],
      action: { type: 'SHOW_RECOMMENDATIONS' }
    }
  ];
  
  // 检查命令是否匹配任何模式
  for (const pattern of commandPatterns) {
    const hasKeyword = pattern.keywords.some(keyword => 
      normalizedCommand.includes(keyword)
    );
    
    const hasSubject = pattern.subjects.some(subject => 
      normalizedCommand.includes(subject)
    );
    
    if (hasKeyword && hasSubject) {
      return pattern.action;
    }
  }
  
  // 如果没有匹配的命令
  return { type: 'UNKNOWN_COMMAND', originalCommand: command };
};