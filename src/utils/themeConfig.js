// 主题配置工具

/**
 * 获取主题配置
 * @param {string} themeName - 主题名称
 * @returns {Object} 主题配置对象
 */
export const getThemeConfig = (themeName) => {
  const themes = {
    tsinghua: {
      name: '清华严谨模式',
      primaryColor: '#660874',
      secondaryColor: '#9c27b0',
      accentColor: '#d05ce3',
      fontFamily: '"Microsoft YaHei", sans-serif',
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      headerBackground: '#660874',
      siderBackground: '#4a0454',
      layoutBackground: '#f0f2f5'
    },
    scut: {
      name: '华工创新模式',
      primaryColor: '#c62828',
      secondaryColor: '#e53935',
      accentColor: '#ff5252',
      fontFamily: '"PingFang SC", sans-serif',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      headerBackground: '#c62828',
      siderBackground: '#b71c1c',
      layoutBackground: '#f5f5f5'
    },
    pku: {
      name: '北大人文模式',
      primaryColor: '#162447',
      secondaryColor: '#1f4068',
      accentColor: '#e43f5a',
      fontFamily: '"Noto Serif SC", serif',
      borderRadius: '2px',
      boxShadow: '0 1px 4px rgba(0, 0, 0, 0.2)',
      headerBackground: '#162447',
      siderBackground: '#0d1b36',
      layoutBackground: '#f8f8f8'
    },
    default: {
      name: '默认模式',
      primaryColor: '#1890ff',
      secondaryColor: '#096dd9',
      accentColor: '#40a9ff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      borderRadius: '4px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      headerBackground: '#1890ff',
      siderBackground: '#096dd9',
      layoutBackground: '#f0f2f5'
    }
  };
  
  return themes[themeName] || themes.default;
};

/**
 * 获取所有可用主题
 * @returns {Array} 主题列表
 */
export const getAllThemes = () => {
  return [
    { id: 'tsinghua', name: '清华严谨模式', isNew: false },
    { id: 'scut', name: '华工创新模式', isNew: true },
    { id: 'pku', name: '北大人文模式', isNew: false },
    { id: 'default', name: '默认模式', isNew: false }
  ];
};

/**
 * 应用主题到DOM
 * @param {string} themeName - 主题名称
 * @param {boolean} darkMode - 是否启用暗黑模式
 */
export const applyTheme = (themeName, darkMode = false) => {
  const theme = getThemeConfig(themeName);
  const root = document.documentElement;
  
  // 设置CSS变量
  root.style.setProperty('--primary-color', theme.primaryColor);
  root.style.setProperty('--secondary-color', theme.secondaryColor);
  root.style.setProperty('--accent-color', theme.accentColor);
  root.style.setProperty('--font-family', theme.fontFamily);
  root.style.setProperty('--border-radius', theme.borderRadius);
  root.style.setProperty('--box-shadow', theme.boxShadow);
  
  // 添加主题类名
  document.body.className = '';
  document.body.classList.add(`theme-${themeName}`);
  
  // 暗黑模式
  if (darkMode) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
};

export default {
  getThemeConfig,
  getAllThemes,
  applyTheme
};