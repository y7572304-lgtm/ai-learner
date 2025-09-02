import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { selectThemeSettings } from './store/slices/settingsSlice';
import { initializeUser } from './store/slices/userSlice';
import { initializeLearningData } from './store/slices/learningSlice';
import { initializeAchievements } from './store/slices/achievementsSlice';
import { initializeLeaderboards } from './store/slices/leaderboardSlice';
import AppLayout from './components/layout/AppLayout';
import AppRoutes from './routes';
import zhCN from 'antd/lib/locale/zh_CN';
import { getThemeConfig } from './utils/themeConfig';
import { loadUserData } from './utils/localStorage';
import './App.css';

const App = () => {
  const dispatch = useDispatch();
  const themeSettings = useSelector(selectThemeSettings);
  
  // 初始化应用数据
  useEffect(() => {
    // 从本地存储加载用户数据
    const userData = loadUserData();
    
    // 初始化各模块数据
    dispatch(initializeUser(userData));
    dispatch(initializeLearningData());
    dispatch(initializeAchievements());
    dispatch(initializeLeaderboards());
  }, [dispatch]);
  
  // 获取主题配置
  const themeConfig = getThemeConfig(themeSettings.theme);
  
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm: themeSettings.enableDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: themeConfig.primaryColor,
          borderRadius: 6,
          fontSize: themeSettings.fontSize === 'small' ? 14 : 
                   themeSettings.fontSize === 'large' ? 16 : 15,
        },
        components: {
          Button: {
            borderRadius: 4,
          },
          Card: {
            borderRadius: 8,
          }
        }
      }}
    >
      <Router>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </Router>
    </ConfigProvider>
  );
};

export default App;