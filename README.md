# ncov-seey

This is a simple project based on Egg.js and RBAC model, which is in line with the development specifications.

## tech

- Egg.js (Node v18.17.1)
- MySQL
- Redis
- Docker
- 云Linux服务器

## Development phase

1. 2025.01.06
    - GitHub创建dev分支和main分支

## rule of git commit

- `feat`: 新增功能（feature），当你添加了一个新的功能时使用此类型。
    - 示例：`feat: 增加用户登录功能`
- `fix`: 修复 bug，当你解决了一个问题或修复了一个错误时使用此类型。
    - 示例：`fix: 修复用户登录时密码验证错误`
- `docs`: 文档（documentation），当你对文档进行修改时使用此类型，包括 README、代码注释等。
    - 示例：`docs: 完善用户登录功能的 API 文档`
- `style`: 代码格式调整，不影响代码逻辑，例如缩进、空格、分号的添加或删除等。
    - 示例：`style: 调整用户登录页面的 CSS 代码格式`
- `refactor`: 代码重构，既不新增功能，也不修复 bug，只是对代码结构进行调整。
    - 示例：`refactor: 重构用户登录逻辑，提高代码可读性`
- `test`: 测试相关，当你添加或修改测试用例时使用此类型。
    - 示例：`test: 为用户登录功能添加单元测试`
- `chore`: 杂项，例如构建过程或辅助工具的变动，不涉及 src 或 test 文件。
    - 示例：`chore: 更新构建工具版本`

```
feat(login): 支持微信登录

增加微信登录功能，使用微信开放平台的 OAuth 2.0 接口进行授权，
并在用户登录成功后将用户信息存储到数据库中。
```
