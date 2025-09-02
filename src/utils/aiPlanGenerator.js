// AI学习计划生成器

// 基于用户数据和学习历史生成个性化学习计划
export const generateLearningPlan = (userData, learningData) => {
  // 提取用户偏好
  const { preferences, subjects } = userData;
  const { studyTime, studyDuration, breakInterval } = preferences;
  
  // 提取学习数据
  const { subjects: subjectData, studySessions } = learningData;
  
  // 分析学习习惯和模式
  const habits = analyzeStudyHabits(studySessions);
  
  // 分析学科进度和掌握情况
  const progress = analyzeSubjectProgress(subjectData);
  
  // 生成每日目标
  const dailyGoals = generateDailyGoals(habits, progress, preferences);
  
  // 生成每周目标
  const weeklyGoals = generateWeeklyGoals(habits, progress, preferences);
  
  // 生成每月目标
  const monthlyGoals = generateMonthlyGoals(habits, progress, preferences);
  
  return {
    dailyGoals,
    weeklyGoals,
    monthlyGoals,
  };
};

// 分析学习习惯
const analyzeStudyHabits = (studySessions) => {
  // 如果没有学习记录，返回默认值
  if (!studySessions || studySessions.length === 0) {
    return {
      preferredTime: 'morning',
      averageDuration: 60,
      mostProductiveSubject: null,
      consistencyScore: 0,
    };
  }
  
  // 计算学习时间偏好
  const timeDistribution = studySessions.reduce((acc, session) => {
    const hour = new Date(session.date).getHours();
    if (hour >= 5 && hour < 12) {
      acc.morning += 1;
    } else if (hour >= 12 && hour < 18) {
      acc.afternoon += 1;
    } else if (hour >= 18 && hour < 22) {
      acc.evening += 1;
    } else {
      acc.night += 1;
    }
    return acc;
  }, { morning: 0, afternoon: 0, evening: 0, night: 0 });
  
  // 找出最常学习的时间段
  const preferredTime = Object.keys(timeDistribution).reduce((a, b) => 
    timeDistribution[a] > timeDistribution[b] ? a : b
  );
  
  // 计算平均学习时长
  const totalDuration = studySessions.reduce((sum, session) => sum + session.duration, 0);
  const averageDuration = Math.round(totalDuration / studySessions.length);
  
  // 计算最高效的学科
  const subjectEfficiency = {};
  studySessions.forEach(session => {
    if (!subjectEfficiency[session.subject]) {
      subjectEfficiency[session.subject] = {
        totalEfficiency: 0,
        count: 0,
      };
    }
    subjectEfficiency[session.subject].totalEfficiency += session.efficiency;
    subjectEfficiency[session.subject].count += 1;
  });
  
  let mostProductiveSubject = null;
  let highestEfficiency = 0;
  
  Object.keys(subjectEfficiency).forEach(subject => {
    const avgEfficiency = subjectEfficiency[subject].totalEfficiency / subjectEfficiency[subject].count;
    if (avgEfficiency > highestEfficiency) {
      highestEfficiency = avgEfficiency;
      mostProductiveSubject = subject;
    }
  });
  
  // 计算学习一致性得分 (0-100)
  // 简单实现：过去7天中有学习记录的天数比例
  const last7Days = new Set();
  const today = new Date();
  
  studySessions.forEach(session => {
    const sessionDate = new Date(session.date);
    const daysDiff = Math.floor((today - sessionDate) / (1000 * 60 * 60 * 24));
    if (daysDiff >= 0 && daysDiff < 7) {
      last7Days.add(session.date.split('T')[0]);
    }
  });
  
  const consistencyScore = Math.round((last7Days.size / 7) * 100);
  
  return {
    preferredTime,
    averageDuration,
    mostProductiveSubject,
    consistencyScore,
  };
};

// 分析学科进度
const analyzeSubjectProgress = (subjects) => {
  if (!subjects || subjects.length === 0) {
    return {
      weakestSubject: null,
      strongestSubject: null,
      averageProgress: 0,
      needsAttention: [],
    };
  }
  
  let weakestSubject = subjects[0];
  let strongestSubject = subjects[0];
  let totalProgress = 0;
  const needsAttention = [];
  
  subjects.forEach(subject => {
    totalProgress += subject.progress;
    
    if (subject.progress < weakestSubject.progress) {
      weakestSubject = subject;
    }
    
    if (subject.progress > strongestSubject.progress) {
      strongestSubject = subject;
    }
    
    // 查找需要关注的主题
    subject.topics.forEach(topic => {
      if (topic.progress < 50 || topic.mastery === 'low') {
        needsAttention.push({
          subject: subject.name,
          topic: topic.name,
          progress: topic.progress,
          mastery: topic.mastery,
        });
      }
    });
  });
  
  const averageProgress = Math.round(totalProgress / subjects.length);
  
  return {
    weakestSubject: weakestSubject.name,
    strongestSubject: strongestSubject.name,
    averageProgress,
    needsAttention,
  };
};

// 生成每日目标
const generateDailyGoals = (habits, progress, preferences) => {
  const goals = [];
  
  // 添加弱势学科的学习目标
  if (progress.weakestSubject) {
    goals.push({
      id: '1',
      title: `学习${progress.weakestSubject}`,
      description: `专注于提高${progress.weakestSubject}的理解和掌握`,
      duration: Math.min(preferences.studyDuration, 60),
      priority: 'high',
      completed: false,
    });
  }
  
  // 添加需要关注的主题
  if (progress.needsAttention.length > 0) {
    const topic = progress.needsAttention[0];
    goals.push({
      id: '2',
      title: `复习${topic.subject}的${topic.topic}`,
      description: `重点关注${topic.topic}的关键概念和应用`,
      duration: Math.min(preferences.studyDuration, 45),
      priority: 'high',
      completed: false,
    });
  }
  
  // 添加巩固强势学科的目标
  if (progress.strongestSubject) {
    goals.push({
      id: '3',
      title: `巩固${progress.strongestSubject}`,
      description: `做一些${progress.strongestSubject}的高级练习题`,
      duration: Math.min(preferences.studyDuration, 30),
      priority: 'medium',
      completed: false,
    });
  }
  
  // 添加休息提醒
  goals.push({
    id: '4',
    title: '休息时间',
    description: `每学习${preferences.studyDuration}分钟后休息${preferences.breakInterval}分钟`,
    duration: preferences.breakInterval,
    priority: 'medium',
    completed: false,
    isBreak: true,
  });
  
  return goals;
};

// 生成每周目标
const generateWeeklyGoals = (habits, progress, preferences) => {
  const goals = [];
  
  // 提高整体进度目标
  goals.push({
    id: '1',
    title: '提高整体学习进度',
    description: `将平均学习进度从${progress.averageProgress}%提高到${Math.min(progress.averageProgress + 5, 100)}%`,
    progress: 0,
    target: 5,
    priority: 'high',
    completed: false,
  });
  
  // 针对弱势学科的目标
  if (progress.weakestSubject) {
    goals.push({
      id: '2',
      title: `提高${progress.weakestSubject}的掌握度`,
      description: `完成${progress.weakestSubject}的至少3个主题`,
      progress: 0,
      target: 3,
      priority: 'high',
      completed: false,
    });
  }
  
  // 学习一致性目标
  goals.push({
    id: '3',
    title: '保持学习一致性',
    description: `本周至少学习5天，每天至少${Math.min(preferences.studyDuration, 30)}分钟`,
    progress: 0,
    target: 5,
    priority: 'medium',
    completed: false,
  });
  
  // 复习目标
  goals.push({
    id: '4',
    title: '全面复习',
    description: '对本周学习的内容进行全面复习',
    progress: 0,
    target: 1,
    priority: 'medium',
    completed: false,
  });
  
  return goals;
};

// 生成每月目标
const generateMonthlyGoals = (habits, progress, preferences) => {
  const goals = [];
  
  // 主要学习目标
  goals.push({
    id: '1',
    title: '全面提升学习水平',
    description: `在所有学科上取得显著进步，平均提高10%`,
    progress: 0,
    target: 10,
    priority: 'high',
    completed: false,
  });
  
  // 弱势学科转强势
  if (progress.weakestSubject) {
    goals.push({
      id: '2',
      title: `攻克${progress.weakestSubject}`,
      description: `将${progress.weakestSubject}从弱势学科转变为强势学科`,
      progress: 0,
      target: 100,
      priority: 'high',
      completed: false,
    });
  }
  
  // 学习习惯养成
  goals.push({
    id: '3',
    title: '养成良好学习习惯',
    description: `每周至少学习5天，提高学习一致性得分至${Math.min(habits.consistencyScore + 20, 100)}`,
    progress: habits.consistencyScore,
    target: Math.min(habits.consistencyScore + 20, 100),
    priority: 'medium',
    completed: false,
  });
  
  // 知识应用目标
  goals.push({
    id: '4',
    title: '知识实际应用',
    description: '完成一个将所学知识应用到实际问题的项目',
    progress: 0,
    target: 100,
    priority: 'medium',
    completed: false,
  });
  
  return goals;
};

// 生成学习建议
export const generateLearningRecommendations = (userData, learningData) => {
  // 提取用户偏好和学习数据
  const { subjects: userSubjects } = userData;
  const { subjects, studySessions } = learningData;
  
  const recommendations = [];
  
  // 分析学科进度
  const progress = analyzeSubjectProgress(subjects);
  
  // 为需要关注的主题生成建议
  progress.needsAttention.forEach((topic, index) => {
    if (index < 3) { // 限制最多3个建议
      recommendations.push({
        id: `rec-${index + 1}`,
        subject: topic.subject,
        topic: topic.topic,
        reason: `进度较低(${topic.progress}%)，掌握程度: ${topic.mastery}`,
        resources: generateResourcesForTopic(topic.subject, topic.topic),
      });
    }
  });
  
  // 如果建议不足3个，添加一个强化建议
  if (recommendations.length < 3 && progress.strongestSubject) {
    recommendations.push({
      id: `rec-${recommendations.length + 1}`,
      subject: progress.strongestSubject,
      topic: '高级应用',
      reason: '进一步强化已掌握的知识',
      resources: generateResourcesForTopic(progress.strongestSubject, '高级应用'),
    });
  }
  
  return recommendations;
};

// 为主题生成学习资源
const generateResourcesForTopic = (subject, topic) => {
  // 这里应该连接到实际的资源数据库
  // 现在使用模拟数据
  const resourceTypes = ['video', 'interactive', 'text', 'quiz'];
  const resources = [];
  
  // 生成2-3个资源
  const count = Math.floor(Math.random() * 2) + 2;
  
  for (let i = 0; i < count; i++) {
    const type = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];
    resources.push({
      id: `${subject}-${topic}-${i}`.replace(/\s+/g, '-').toLowerCase(),
      type,
      title: `${subject} - ${topic} ${type === 'video' ? '视频教程' : 
        type === 'interactive' ? '互动练习' : 
        type === 'text' ? '学习资料' : '测验'}`,
      url: '#',
    });
  }
  
  return resources;
};

// 检查成就解锁条件
export const checkAchievementConditions = (userData, learningData, achievements) => {
  const unlockedAchievements = [];
  
  // 检查每个成就的条件
  achievements.forEach(achievement => {
    if (!achievement.unlocked) {
      const unlocked = evaluateAchievementCondition(achievement, userData, learningData);
      if (unlocked) {
        unlockedAchievements.push(achievement.id);
      }
    }
  });
  
  return unlockedAchievements;
};

// 评估单个成就的解锁条件
const evaluateAchievementCondition = (achievement, userData, learningData) => {
  // 根据成就ID或标题判断条件
  switch (achievement.id) {
    case '1': // 学习先锋
      return userData.streak >= 7;
    case '2': // 数学大师
      const mathSubject = learningData.subjects.find(s => s.name === '数学');
      if (mathSubject) {
        const allTopicsHighMastery = mathSubject.topics.every(t => t.progress >= 80);
        return allTopicsHighMastery;
      }
      return false;
    case '3': // 学习狂人
      return learningData.studySessions.some(s => s.duration >= 300); // 5小时 = 300分钟
    case '4': // 全能学者
      return learningData.subjects.every(s => s.progress >= 50);
    default:
      return false;
  }
};