import { createSlice } from '@reduxjs/toolkit';
import { loadLearningData, saveLearningData } from '../../utils/localStorage';

const initialState = {
  learningData: {
    stats: {
      totalStudyTime: 450, // 总学习时间（小时）
      averageDailyTime: 4.5, // 平均每日学习时间（小时）
      consecutiveDays: 12, // 连续学习天数
      completedTasks: 85, // 已完成任务数
      efficiency: 85 // 学习效率（百分比）
    },
    trends: {
      daily: [3.5, 4.2, 5.0, 4.8, 3.9, 5.5, 4.5], // 最近7天每日学习时间
      weekly: [28, 32, 35, 30, 33], // 最近5周每周学习时间
      monthly: [120, 135, 142, 128] // 最近4个月每月学习时间
    },
    subjects: [
      { id: 'math', name: '数学', progress: 85, lastStudied: '2023-07-30' },
      { id: 'english', name: '英语', progress: 70, lastStudied: '2023-07-29' },
      { id: 'physics', name: '物理', progress: 90, lastStudied: '2023-07-28' },
      { id: 'chemistry', name: '化学', progress: 65, lastStudied: '2023-07-27' },
      { id: 'biology', name: '生物', progress: 75, lastStudied: '2023-07-26' },
      { id: 'history', name: '历史', progress: 60, lastStudied: '2023-07-25' }
    ],
    activities: [
      { id: 1, subject: '高等数学', activity: '完成了微积分练习', time: '2023-07-30 14:30', tag: '作业' },
      { id: 2, subject: '英语', activity: '背诵了50个单词', time: '2023-07-30 11:20', tag: '背诵' },
      { id: 3, subject: '物理', activity: '观看了力学视频课程', time: '2023-07-29 19:45', tag: '视频' },
      { id: 4, subject: '编程', activity: '完成了Python项目', time: '2023-07-29 16:10', tag: '项目' },
      { id: 5, subject: '化学', activity: '参加了在线测验', time: '2023-07-28 10:30', tag: '测验' }
    ],
    strengths: ['数学问题解决', '物理概念理解', '编程实践'],
    weaknesses: ['英语口语表达', '化学方程式记忆', '历史年代记忆'],
    interests: ['人工智能', '量子物理', '古代文明'],
    learningPlan: {
      daily: [
        { id: 'd1', subject: '数学', duration: 90, priority: 'high', completed: false },
        { id: 'd2', subject: '英语', duration: 60, priority: 'medium', completed: false },
        { id: 'd3', subject: '物理', duration: 45, priority: 'medium', completed: false }
      ],
      weekly: [
        { id: 'w1', subject: '数学', tasks: ['完成习题集', '观看视频课程', '小组讨论'], completed: [true, false, false] },
        { id: 'w2', subject: '英语', tasks: ['阅读文章', '写作练习', '口语训练'], completed: [true, true, false] },
        { id: 'w3', subject: '物理', tasks: ['实验报告', '概念复习', '问题解答'], completed: [false, false, false] }
      ],
      monthly: [
        { id: 'm1', subject: '数学', goal: '掌握微积分基本概念', progress: 65 },
        { id: 'm2', subject: '英语', goal: '提高口语流利度', progress: 40 },
        { id: 'm3', subject: '物理', goal: '理解量子力学基础', progress: 30 }
      ]
    },
    recommendations: [
      { id: 'r1', type: 'resource', title: '高效学习方法指南', description: '基于您的学习习惯推荐', link: '#' },
      { id: 'r2', type: 'course', title: '英语口语强化训练', description: '针对您的弱点定制', link: '#' },
      { id: 'r3', type: 'schedule', title: '优化学习时间分配', description: '根据您的效率高峰期调整', link: '#' }
    ]
  }
};

export const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    initializeLearningData: (state) => {
      const savedData = loadLearningData();
      if (savedData) {
        state.learningData = savedData;
      }
    },
    refreshAnalytics: (state) => {
      // 在实际应用中，这里可能会从API获取最新的学习数据
      // 或者基于用户的最新活动更新分析数据
      return state;
    },
    updateLearningPlan: (state, action) => {
      state.learningData.learningPlan = {
        ...state.learningData.learningPlan,
        ...action.payload
      };
      saveLearningData(state.learningData);
    },
    selectLearningPlan: (state) => state.learningData.learningPlan,
    selectSubjects: (state) => state.learningData.subjects,
    selectRecommendations: (state) => state.learningData.recommendations,
    generateAIRecommendations: (state, action) => {
      // 在实际应用中，这里可能会调用AI服务来生成个性化推荐
      // 现在我们只是简单地更新推荐列表
      const newRecommendations = [
        { id: 'r4', type: 'technique', title: '记忆力提升技巧', description: '基于您的学习模式定制', link: '#' },
        { id: 'r5', type: 'resource', title: '物理概念可视化工具', description: '帮助理解复杂概念', link: '#' },
        { id: 'r6', type: 'schedule', title: '考试备战计划', description: '为即将到来的考试优化时间', link: '#' }
      ];
      
      state.learningData.recommendations = [
        ...state.learningData.recommendations,
        ...newRecommendations
      ];
      saveLearningData(state.learningData);
    }
  }
});

export const { 
  initializeLearningData, 
  refreshAnalytics, 
  updateLearningPlan,
  generateAIRecommendations
} = learningSlice.actions;

export const selectLearningData = (state) => state.learning.learningData;
export const selectLearningStats = (state) => state.learning.learningData.stats;
export const selectLearningTrends = (state) => state.learning.learningData.trends;
export const selectStrengths = (state) => state.learning.learningData.strengths;
export const selectWeaknesses = (state) => state.learning.learningData.weaknesses;
export const selectInterests = (state) => state.learning.learningData.interests;
export const selectLearningPlan = (state) => state.learning.learningData.learningPlan;
export const selectSubjects = (state) => state.learning.learningData.subjects;
export const selectRecommendations = (state) => state.learning.learningData.recommendations;

export default learningSlice.reducer;