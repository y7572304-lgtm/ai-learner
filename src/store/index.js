import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import learningReducer from './slices/learningSlice';
import achievementsReducer from './slices/achievementsSlice';
import settingsReducer from './slices/settingsSlice';
import leaderboardReducer from './slices/leaderboardSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    learning: learningReducer,
    achievements: achievementsReducer,
    settings: settingsReducer,
    leaderboard: leaderboardReducer
  }
});

export default store;