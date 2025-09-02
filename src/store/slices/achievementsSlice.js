import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  achievements: [
    {
      id: 'ach1',
      title: '学习启航',
      description: '完成第一次学习任务',
      icon: 'rocket',
      unlocked: true,
      unlockedAt: '2023-01-16',
      progress: 100,
      reward: {
        points: 10,
        badge: 'beginner'
      }
    },
    {
      id: 'ach2',
      title: '坚持不懈',
      description: '连续学习7天',
      icon: 'fire',
      unlocked: true,
      unlockedAt: '2023-01-22',
      progress: 100,
      reward: {
        points: 50,
        badge: 'persistent'
      }
    },
    {
      id: 'ach3',
      title: '学习达人',
      description: '累计学习时间达到10小时',
      icon: 'clock',
      unlocked: false,
      progress: 60,
      reward: {
        points: 100,
        badge: 'master'
      }
    },
    {
      id: 'ach4',
      title: '全能学者',
      description: '在所有学科中获得优秀成绩',
      icon: 'star',
      unlocked: false,
      progress: 40,
      reward: {
        points: 200,
        badge: 'scholar'
      }
    }
  ],
  badges: [
    {
      id: 'badge1',
      name: '初学者',
      tier: 'bronze',
      icon: 'rocket',
      obtained: true
    },
    {
      id: 'badge2',
      name: '坚持者',
      tier: 'silver',
      icon: 'fire',
      obtained: true
    },
    {
      id: 'badge3',
      name: '学习大师',
      tier: 'gold',
      icon: 'clock',
      obtained: false
    },
    {
      id: 'badge4',
      name: '学者',
      tier: 'platinum',
      icon: 'star',
      obtained: false
    }
  ]
};

export const achievementsSlice = createSlice({
  name: 'achievements',
  initialState,
  reducers: {
    initializeAchievements: (state) => {
      // 初始化成就数据，可以从本地存储加载
      return state;
    }
  }
});

export const { initializeAchievements } = achievementsSlice.actions;

export const selectAchievements = (state) => state.achievements.achievements;
export const selectBadges = (state) => state.achievements.badges;
export const selectUnlockedAchievements = (state) => 
  state.achievements.achievements.filter(a => a.unlocked);
export const selectLockedAchievements = (state) => 
  state.achievements.achievements.filter(a => !a.unlocked);

export default achievementsSlice.reducer;