// 本地存储工具

const STORAGE_KEYS = {
  USER_DATA: 'ai_learning_engine_user',
  LEARNING_DATA: 'ai_learning_engine_learning',
  ACHIEVEMENTS: 'ai_learning_engine_achievements',
  SETTINGS: 'ai_learning_engine_settings',
  LEADERBOARD: 'ai_learning_engine_leaderboard'
};

/**
 * 保存用户数据到本地存储
 * @param {Object} userData - 用户数据
 */
export const saveUserData = (userData) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
  } catch (error) {
    console.error('保存用户数据失败:', error);
  }
};

/**
 * 从本地存储加载用户数据
 * @returns {Object|null} 用户数据或null
 */
export const loadUserData = () => {
  try {
    const userData = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('加载用户数据失败:', error);
    return null;
  }
};

/**
 * 保存学习数据到本地存储
 * @param {Object} learningData - 学习数据
 */
export const saveLearningData = (learningData) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LEARNING_DATA, JSON.stringify(learningData));
  } catch (error) {
    console.error('保存学习数据失败:', error);
  }
};

/**
 * 从本地存储加载学习数据
 * @returns {Object|null} 学习数据或null
 */
export const loadLearningData = () => {
  try {
    const learningData = localStorage.getItem(STORAGE_KEYS.LEARNING_DATA);
    return learningData ? JSON.parse(learningData) : null;
  } catch (error) {
    console.error('加载学习数据失败:', error);
    return null;
  }
};

/**
 * 保存成就数据到本地存储
 * @param {Object} achievements - 成就数据
 */
export const saveAchievements = (achievements) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
  } catch (error) {
    console.error('保存成就数据失败:', error);
  }
};

/**
 * 从本地存储加载成就数据
 * @returns {Object|null} 成就数据或null
 */
export const loadAchievements = () => {
  try {
    const achievements = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return achievements ? JSON.parse(achievements) : null;
  } catch (error) {
    console.error('加载成就数据失败:', error);
    return null;
  }
};

/**
 * 保存设置到本地存储
 * @param {Object} settings - 设置数据
 */
export const saveSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('保存设置失败:', error);
  }
};

/**
 * 从本地存储加载设置
 * @returns {Object|null} 设置数据或null
 */
export const loadSettings = () => {
  try {
    const settings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settings ? JSON.parse(settings) : null;
  } catch (error) {
    console.error('加载设置失败:', error);
    return null;
  }
};

/**
 * 保存排行榜数据到本地存储
 * @param {Object} leaderboard - 排行榜数据
 */
export const saveLeaderboard = (leaderboard) => {
  try {
    localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(leaderboard));
  } catch (error) {
    console.error('保存排行榜数据失败:', error);
  }
};

/**
 * 从本地存储加载排行榜数据
 * @returns {Object|null} 排行榜数据或null
 */
export const loadLeaderboard = () => {
  try {
    const leaderboard = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    return leaderboard ? JSON.parse(leaderboard) : null;
  } catch (error) {
    console.error('加载排行榜数据失败:', error);
    return null;
  }
};

/**
 * 清除所有本地存储数据
 */
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('清除数据失败:', error);
  }
};

export default {
  saveUserData,
  loadUserData,
  saveLearningData,
  loadLearningData,
  saveAchievements,
  loadAchievements,
  saveSettings,
  loadSettings,
  saveLeaderboard,
  loadLeaderboard,
  clearAllData
};