# AI学习动力引擎

一个基于AI的学习动力引擎，通过数据分析、个性化学习计划和游戏化激励系统，提升学习效率和动力。

## 核心功能

### 1. 学生数据分析模块
- 学习习惯追踪
- 兴趣分析
- 学习进度监控
- 可视化数据看板

### 2. 个性化学习计划生成器
- 基于AI算法的学习计划推荐
- 自适应学习路径
- 智能时间管理
- 学习目标设定与跟踪

### 3. 游戏化激励系统
- 积分奖励机制
- 成就解锁系统
- 实时排行榜
- 徽章收集

### 4. 语音交互功能
- 鼓励性语音反馈
- 学习进度语音提醒
- 语音控制命令
- 个性化语音助手

### 5. 校园特色主题
- 可配置不同高校风格
- 清华严谨模式
- 华工创新模式
- 其他校园主题

## 技术栈

- 前端框架: React
- UI组件库: Ant Design
- 状态管理: Redux Toolkit
- 路由管理: React Router
- 图表可视化: Recharts
- 样式解决方案: Styled Components
- 本地存储: LocalStorage API
- 语音交互: Web Speech API

## 安装与运行

### 安装依赖
```bash
cd ai-learning-engine
npm install
```

### 启动开发服务器
```bash
npm start
```

### 构建生产版本
```bash
npm run build
```

## 项目结构

```
ai-learning-engine/
├── public/                 # 静态资源
├── src/                    # 源代码
│   ├── assets/             # 图片、图标等资源
│   ├── components/         # 可复用组件
│   │   ├── layout/         # 布局组件
│   │   ├── voice/          # 语音交互组件
│   │   └── ...
│   ├── hooks/              # 自定义React Hooks
│   ├── pages/              # 页面组件
│   ├── services/           # API服务
│   ├── store/              # Redux状态管理
│   │   ├── slices/         # Redux切片
│   │   └── index.js        # Store配置
│   ├── utils/              # 工具函数
│   ├── App.js              # 应用入口组件
│   ├── index.js            # 应用入口文件
│   └── routes.js           # 路由配置
├── package.json            # 项目依赖
└── README.md               # 项目说明
```

## 特性亮点

1. **数据驱动学习**: 通过AI分析学习数据，提供个性化学习建议
2. **游戏化体验**: 将学习过程游戏化，增强学习动力
3. **多模态交互**: 支持文本、语音等多种交互方式
4. **校园文化融合**: 根据不同高校特色定制学习体验
5. **本地优先**: 所有数据存储在本地，保护用户隐私

## 未来计划

- [ ] 添加社交学习功能
- [ ] 支持学习资源共享
- [ ] 开发移动端应用
- [ ] 增加更多校园主题
- [ ] 集成第三方学习资源

## 贡献指南

欢迎提交问题和功能请求！如果您想贡献代码，请遵循以下步骤：

1. Fork 项目
2. 创建您的特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开一个 Pull Request

## 许可证

MIT