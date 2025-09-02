import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  leaderboards: {
    daily: [
      { id: 'user1', rank: 1, name: '学习者', avatar: '', points: 1250 },
      { id: 'user2', rank: 2, name: '张三', avatar: '', points: 1150 },
      { id: 'user3', rank: 3, name: '李四', avatar: '', points: 1050 },
      { id: 'user4', rank: 4, name: '王五', avatar: '', points: 950 },
      { id: 'user5', rank: 5, name: '赵六', avatar: '', points: 850 }
    ],
    weekly: [
      { id: 'user2', rank: 1, name: '张三', avatar: '', points: 5600 },
      { id: 'user1', rank: 2, name: '学习者', avatar: '', points: 5400 },
      { id: 'user3', rank: 3, name: '李四', avatar: '', points: 4800 },
      { id: 'user5', rank: 4, name: '赵六', avatar: '', points: 4200 },
      { id: 'user4', rank: 5, name: '王五', avatar: '', points: 3900 }
    ],
    monthly: [
      { id: 'user3', rank: 1, name: '李四', avatar: '', points: 18500 },
      { id: 'user2', rank: 2, name: '张三', avatar: '', points: 17800 },
      { id: 'user1', rank: 3, name: '学习者', avatar: '', points: 16200 },
      { id: 'user4', rank: 4, name: '王五', avatar: '', points: 15400 },
      { id: 'user5', rank: 5, name: '赵六', avatar: '', points: 14900 }
    ]
  },
  userRanking: {
    daily: { rank: 1, total: 100 },
    weekly: { rank: 2, total: 150 },
    monthly: { rank: 3, total: 200 }
  },
  categories: [
    { id: 'daily', name: '日榜' },
    { id: 'weekly', name: '周榜' },
    { id: 'monthly', name: '月榜' }
  ],
  activeCategory: 'daily'
};

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    initializeLeaderboards: (state) => {
      // 初始化排行榜数据，可以从本地存储加载
      return state;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    refreshLeaderboards: (state) => {
      // 刷新排行榜数据，实际应用中可能需要从API获取数据
      return state;
    }
  }
});

export const { initializeLeaderboards, setActiveCategory, refreshLeaderboards } = leaderboardSlice.actions;

export const selectLeaderboards = (state) => state.leaderboard.leaderboards;
export const selectUserRanking = (state) => state.leaderboard.userRanking;
export const selectCategories = (state) => state.leaderboard.categories;
export const selectActiveCategory = (state) => state.leaderboard.activeCategory;

export default leaderboardSlice.reducer;