# Egg-NCOV

> Egg-Enterprise-Boilerplate

## 1 简介

> Egg-NCOV原本是一个基于SpringBoot框架的疫情数据爬虫项目，支持爬取国外、全国、省份、城市、区/县的疫情数据。远端服务已不再提供数据

本项目是一个基于Egg.js开发的demo，旨在展示完整的企业级开发规范和最佳实践。

## 2 技术架构 [ todo-list ]

### 2.1 后端技术栈

- 核心框架：Egg.js
- 数据库：MySQL
- ORM：Sequelize
- 缓存：Redis
- 文档：Swagger/OpenAPI/JsDoc
- 日志：ELK Stack

### 2.2 安全体系

- JWT/Session 认证
- RBAC 权限控制
- XSS 防御
- CSRF 防御
- SQL注入防御
- 请求限流
- 数据加密

### 2.3 规范与最佳实践

- RESTful API 设计规范
- 统一响应格式
- 统一错误处理
- 代码规范（ESLint + Prettier）
- Git 提交规范（Conventional Commits）
- 单元测试（Jest）
- 持续集成/持续部署（CI/CD）
- https协议、Nginx代理、Shell脚本

## 3 项目结构

### 3.1 基础架构层

- 统一响应格式处理
- 统一异常处理机制
- 请求参数验证中间件
- 日志记录中间件

### 3.2 数据库设计

- 完整的数据库表设计（特别是 RBAC 相关表）
- 数据库索引优化
- 软删除实现

### 3.3 接口开发顺序建议

基础设施搭建:

- 统一响应格式
- 全局异常处理
- 参数验证
- 日志系统

用户认证体系:

- 登录/注册接口
- JWT/Session 实现
- 认证中间件

RBAC权限系统:

- 用户管理
- 角色管理
- 权限管理
- 权限验证中间件

业务接口开发

- RESTful API 实现
- 接口文档生成

性能优化

- Redis 缓存接入
- 数据库优化
- 接口性能优化

安全加固

- XSS 防御
- CSRF 防御
- 请求限流

### 3.4 其他补充

- 添加单元测试覆盖
- 引入 Docker 容器化
- 配置 CI/CD 流程
- 添加性能监控
- 实现接口限流
- 添加数据库审计日志

### 3.5 文档建设

- API 文档
- 数据库设计文档
- 部署文档
- 开发规范文档

## 4 开发计划和优先级（动态删减）

### 4.1 第一阶段：基础框架搭建（核心）

1. 项目初始化
   - 目录结构规范
   - ESLint + Prettier 配置
   - Git 提交规范配置
   - 开发环境配置

2. 基础设施搭建
   - 统一响应格式封装
   - 全局异常处理
   - 参数验证中间件
   - 日志记录中间件
   - Swagger/OpenAPI 文档集成

3. 数据库设计与ORM
   - 设计核心数据表（用户、角色、权限等）
   - Sequelize 配置与模型定义
   - 数据库迁移脚本
   - 索引优化、慢日志

### 4.2 第二阶段：核心功能实现（重要）

1. 用户认证体系
   - 登录/注册接口
   - JWT 实现
   - 认证中间件
   - 密码加密处理

2. RBAC权限系统
   - 用户管理 CRUD
   - 角色管理 CRUD
   - 权限管理 CRUD
   - 权限验证中间件

3. RESTful API实现
   - 统一的API版本控制
   - 请求参数验证
   - 响应数据序列化
   - 分页查询封装

### 4.3 第三阶段：性能与安全（必要）

1. Redis集成
   - 缓存中间件
   - 热点数据缓存
   - 缓存更新策略
   - 分布式锁实现

2. 安全防护
   - XSS防御中间件
   - CSRF防御
   - SQL注入防护
   - 请求限流实现

### 4.4 第四阶段：质量保障（加分项）

1. 单元测试
   - 控制器测试
   - 服务层测试
   - 中间件测试
   - 工具函数测试

2. 性能优化
   - 数据库查询优化
   - 接口响应优化
   - 内存泄漏检测
   - 性能监控接入

### 4.5 第五阶段：部署相关（可选）

1. Docker支持
   - Dockerfile编写
   - docker-compose配置
   - 多环境部署方案

2. CI/CD配置
   - GitHub Actions配置
   - 自动化测试
   - 自动化部署

## 5 RBAC建设

### 用户管理接口

1 用户认证类

- POST /api/v1/auth/login           - 用户登录
- POST /api/v1/auth/logout          - 用户登出
- GET  /api/v1/auth/info            - 获取当前登录用户信息（包含角色和权限）
- POST /api/v1/auth/change-password - 修改密码

2 用户管理类

- GET    /api/v1/users            - 获取用户列表（支持分页、搜索）
- POST   /api/v1/users            - 创建新用户
- GET    /api/v1/users/:id        - 获取指定用户详情
- PUT    /api/v1/users/:id        - 更新用户信息
- DELETE /api/v1/users/:id        - 删除用户（软删除）
- POST   /api/v1/users/:id/status - 启用/禁用用户
- GET    /api/v1/users/:id/roles  - 获取用户的角色列表
- POST   /api/v1/users/:id/roles  - 分配用户角色

### 角色管理接口

- GET    /api/v1/roles                    - 获取角色列表
- POST   /api/v1/roles                    - 创建新角色
- GET    /api/v1/roles/:id                - 获取指定角色详情
- PUT    /api/v1/roles/:id                - 更新角色信息
- DELETE /api/v1/roles/:id                - 删除角色
- POST   /api/v1/roles/:id/status         - 启用/禁用角色
- GET    /api/v1/roles/:id/permissions    - 获取角色的权限列表
- POST   /api/v1/roles/:id/permissions    - 分配角色权限

### 权限管理接口

- GET    /api/v1/permissions              - 获取权限列表（树形结构）
- POST   /api/v1/permissions              - 创建新权限
- GET    /api/v1/permissions/:id          - 获取指定权限详情
- PUT    /api/v1/permissions/:id          - 更新权限信息
- DELETE /api/v1/permissions/:id          - 删除权限
- POST   /api/v1/permissions/:id/status   - 启用/禁用权限
