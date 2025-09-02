import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: 'user1',
  name: '学习者',
  avatar: '',
  email: 'user@example.com',
  totalPoints: 1250,
  level: 5,
  joinDate: '2023-01-15',
  notifications: [
    {
      id: 'notif1',
      title: '完成每日目标',
      content: '恭喜你完成了今天的学习目标！',
      time: '2023-05-10 15:30',
      read: false
    },
    {
      id: 'notif2',
      title: '新成就解锁',
      content: '你解锁了"学习达人"成就！',
      time: '2023-05-09 10:15',
      read: true
    }
  ]
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeUser: (state, action) => {
      if (action.payload) {
        return { ...state, ...action.payload };
      }
    },
    markNotificationAsRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.notifications.find(n => n.id === notificationId);
      if (notification) {
        notification.read = true;
      }
    }
  }
});

export const { initializeUser, markNotificationAsRead } = userSlice.actions;

export const selectUser = (state) => state.user;
export const selectNotifications = (state) => state.user.notifications;

export default userSlice.reducer;