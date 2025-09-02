import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: {
    enableNotifications: true,
    notificationFrequency: 'medium',
    enableSoundAlerts: true,
    enableProgressNotifications: true,
    enableAchievementNotifications: true
  },
  privacy: {
    shareProgress: true,
    participateInLeaderboard: true,
    showRealName: false,
    dataCollection: true
  },
  voice: {
    enableVoiceAssistant: true,
    voiceGender: 'female',
    voiceSpeed: 1,
    voiceVolume: 80,
    enableVoiceCommands: true
  },
  theme: {
    theme: 'tsinghua',
    enableDarkMode: false,
    fontSize: 'medium',
    animationLevel: 'moderate'
  },
  learning: {
    dailyGoalMinutes: 60,
    weeklyGoalDays: 5,
    reminderTime: 'evening',
    difficultyLevel: 'medium'
  },
  themes: [
    { id: 'tsinghua', name: '清华严谨模式', isNew: false },
    { id: 'scut', name: '华工创新模式', isNew: true },
    { id: 'pku', name: '北大人文模式', isNew: false },
    { id: 'default', name: '默认模式', isNew: false }
  ]
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateNotificationSettings: (state, action) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },
    updatePrivacySettings: (state, action) => {
      state.privacy = { ...state.privacy, ...action.payload };
    },
    updateVoiceSettings: (state, action) => {
      state.voice = { ...state.voice, ...action.payload };
    },
    updateThemeSettings: (state, action) => {
      state.theme = { ...state.theme, ...action.payload };
    },
    updateLearningSettings: (state, action) => {
      state.learning = { ...state.learning, ...action.payload };
    },
    resetSettings: (state) => {
      return initialState;
    }
  }
});

export const {
  updateNotificationSettings,
  updatePrivacySettings,
  updateVoiceSettings,
  updateThemeSettings,
  updateLearningSettings,
  resetSettings
} = settingsSlice.actions;

export const selectSettings = (state) => state.settings;
export const selectThemeSettings = (state) => state.settings.theme;
export const selectVoiceSettings = (state) => state.settings.voice;
export const selectPrivacySettings = (state) => state.settings.privacy;
export const selectThemes = (state) => state.settings.themes;

export default settingsSlice.reducer;