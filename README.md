# Lcpt Blog

## 如何查看网站

打开终端，进入项目目录，输入npm run dev回车，打开 `http://localhost:3000`。

关闭方法：终端ctrl+c。

## 如何修改内容

所有需要改的文件都在 `app/` 和 `components/` 文件夹里：

| 文件 | 作用 |
|---|---|
| `app/page.tsx` | 博客文章列表（标题、日期、摘要在这里改） |
| `app/globals.css` | 颜色、字体、动画等样式 |
| `components/Hero.tsx` | 首页大标题区域（Lcpt 主视觉） |
| `components/Navbar.tsx` | 顶部导航栏 |
| `components/BlogCard.tsx` | 单篇文章卡片的样式 |
| `components/Footer.tsx` | 底部信息 |
| `app/layout.tsx` | 页面整体布局 |

改了文件后保存，浏览器会自动刷新，不需要手动重启。

## 技术栈

Next.js + TypeScript + Tailwind CSS
