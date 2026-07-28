import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string;
}

export const posts: Post[] = [
  {
    slug: "about-this-blog",
    title: "关于这个博客",
    date: "2026.07.28",
    readTime: "5 分钟阅读",
    excerpt: "一个由 AI 辅助构建的密码学博客，记录一个初学者的兴趣驱动之旅。",
    content: `
这是一个关于密码学与计算机科学的个人博客。

整个网站由 AI 辅助构建——从界面设计到交互实现，从配色方案到动画细节，每一个环节都有 AI 的深度参与。说起来有点奇妙，你此刻正在浏览的这个页面，它的代码、布局、甚至是这段文字本身，都是人与 AI 协作的产物。

我并不是经验丰富的开发者，而是一名对技术和数学充满好奇的编程爱好者，在密码学领域也刚刚起步。这个博客纯粹是兴趣驱动的产物——我对密码学、数学和计算机科学交汇处的那些优雅结构充满好奇，于是就有了这个地方，用来记录学习过程中的思考和碎片笔记。

密码学是一门迷人的学科。从古希腊的凯撒密码，到如今保护着数十亿通信的椭圆曲线加密，人类对"秘密"的追求从未停止。而零知识证明、同态加密、量子密码学等前沿方向，又在不断拓展着"可能"的边界。

如果你也对这方面感兴趣，欢迎一起交流探讨。这个博客虽然简陋，但每一篇内容都是认真思考后的沉淀。

## 关于我

一个对技术和数学充满好奇的初学者。不懂的东西很多，但觉得探索未知的过程本身就很迷人。

目前在学习椭圆曲线密码学和零知识证明，偶尔也会写点关于编程语言理论和分布式系统的东西。

## 技术栈

- Next.js + TypeScript + Tailwind CSS
- 设计和开发全程 AI 辅助（借助 Codex 完成）

学习之路还很长，但迈出第一步总是最有趣的。
    `.trim(),
  },
];
