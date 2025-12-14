# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个浏览器扩展项目（空白新建标签页），使用 React + TypeScript + Vite 构建，用于替换浏览器默认的新建标签页。

## 开发命令

```bash
# 安装依赖
pnpm install

# 启动开发服务器
npm run dev

# 构建生产版本（会先进行 TypeScript 类型检查）
npm run build

# 运行 ESLint 检查
npm run lint

# 预览构建结果
npm run preview
```

## 项目架构

### 技术栈
- **框架**: React 19 + TypeScript 5.8
- **构建工具**: Vite 7.0
- **样式**: UnoCSS（原子化 CSS）+ Less
- **状态管理**: Zustand（带持久化）
- **动画**: Motion（Framer Motion 替代品）
- **UI**: Styled Components + React Icons

### 目录结构要点
- `public/manifest.json`: 浏览器扩展配置文件（Manifest V3）
- `src/home/`: 主页面入口（不是传统的 App.tsx）
- `src/components/`: React 组件
- `src/stores/`: Zustand 状态存储（themeStore.ts、historyStore.ts）
- `src/lib/`: 工具函数（搜索引擎配置、日期处理等）
- `src/plugins/emitter.ts`: 事件发射器（mitt 封装）

### 核心功能模块
1. **搜索系统**：支持多搜索引擎切换（Bing、夸克、百度、Yandex、Google、DuckDuckGo）
2. **主题系统**：深色/浅色主题，使用 UnoCSS 预设主题变量
3. **历史记录**：搜索历史保存和管理
4. **玻璃拟态设计**：使用 backdrop-filter 实现毛玻璃效果

### 浏览器扩展特性
- 使用 `chrome_url_overrides.newtab` 覆盖新标签页
- Manifest V3 规范
- 无特殊权限要求，无后台脚本

### 关键配置
- TypeScript 使用项目引用（tsconfig.app.json 用于应用代码）
- UnoCSS 配置了自定义主题变量（--color-bg、--color-text）
- Vite 配置简洁，主要集成了 React 和 UnoCSS 插件

## 注意事项

1. 这是一个浏览器扩展项目，构建产物需要加载到浏览器中测试
2. 主入口是 `src/home/index.tsx`，不是传统的 `src/App.tsx`
3. 使用 pnpm 作为包管理器（有 pnpm-lock.yaml）
4. 状态持久化使用 Zustand 的 persist 中间件
5. 动画效果使用 Motion 库，支持弹性动画和过渡效果