# toutiao

> 基于Vue2.0仿照今日头条的移动端项目

源码地址：[toutiao_Vue2.0](https://github.com/Huahua-Chen/toutiao_Vue2.0)

预览地址：[toutiao_Vue2.0](https://huahua-chen.github.io/demos/toutiao)

## 前言

先占个坑位。  

之前打算做个东西熟悉vue的使用，由于自己蛮喜欢刷手机看看新闻的，借鉴了其他同学的项目（链接在下面），自己也做了一个。项目中还有许多可以完善的地方，不足之处希望小伙伴们可以issue，我会在这里更新。目前还没有全面地测试该项目，有问题提问，大家一起学习。

## 技术栈

1. 主要用到：vue、vuex、vue-router
2. 移动端布局：flexble.js
3. 其他: jsonp、axios、iView、vue-lazyload、moment

## 功能

- 各类新闻的查看
- 本地收藏新闻
- 新闻的搜索
- 待...

## 效果
![移动端](https://github.com/Huahua-Chen/images/blob/master/images_inBlog/toutiao_code.png?raw=true)

移动端可以直接扫描，或者在chrome的device toolbard打开[传送门](https://huahua-chen.github.io/demos/toutiao)

![entry](https://github.com/Huahua-Chen/images/blob/master/images_inBlog/toutiao_entry.gif?raw=true)

![collect](https://github.com/Huahua-Chen/images/blob/master/images_inBlog/toutiao_collect.gif?raw=true)

![search](https://github.com/Huahua-Chen/images/blob/master/images_inBlog/toutiao_search.gif?raw=true)

## 目录
```
|- src
   |- assets
      |- image  // 项目图片
      |- style
         |- common.scss  // 移动端的单位的转换
         |- global.scss  // 全局样式
         |- newsList.scss  // 新闻列表的样式
         |- transition.scss  // 过渡样式
   |- components  // 组件
      |- Back.vue  // 返回
      |- Comment.vue  // 评论
      |- Footer.vue  // 页脚
      |- HomeNav.vue  // 新闻类型导航
      |- Loading.vue  // 加载
      |- Loadingmore.vue  // 加载更多
      |- Nav.vue  // 导航
      |- Newslist.vue  // 新闻列表
      |- Top.vue  // 返回顶部
      |- Warning.vue  // 出错提醒
   |- pages  // 主体页面
      |- About.vue // 信息页
      |- Collect.vue  // 收藏页
      |- Content.vue  // 文章页
      |- Home.vue  // 主页
      |- Search.vue  // 收藏页
      |- Session.vue  // 段子页
   |- router  // 路由
   |- store  // 状态管理
   |- App.vue
   |- main.js  // 入口文件
|- static
   |- collect.json  // 初始收藏
   |- imgerror.jpg  // 懒加载错误图片
   |- imgloading.jpg  // 懒加载中图片
```
更多细节在源码中会有一些注释
## API
1. 获取新闻：`https://m.toutiao.com/list/?tag=新闻类型&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=时间`

2. 获取文章：`https://m.toutiao.com/i新闻ID/info/'`

3. 获取段子：`https://www.toutiao.com/api/article/feed/?category=essay_joke&utm_source=toutiao&widen=1&max_behot_time=1500114422&max_behot_time_tmp=1500114422&tadrequire=true&as=A1F52966E9EEF00&cp=59692E6FD0E09E1`

4. 搜索： `https://www.toutiao.com/search_content/?offset=相对位置&format=json&keyword=关键词&autoload=true&count=20&cur_tab=1`

还可以参考[今日头条Api分析](https://github.com/iMeiji/Toutiao/wiki/%E4%BB%8A%E6%97%A5%E5%A4%B4%E6%9D%A1Api%E5%88%86%E6%9E%90)

## 最后

本项目作为自己的学习记录，还有许多需要改进的地方，也希望可以帮到有需要的小伙伴，一起进步。

Ps：我不介意有好多好多star[捂脸]

## 参考

[hcy1996的项目](https://github.com/hcy1996/vue-toutiao)

[vue-lazyload实现图片懒加载](https://github.com/hilongjw/vue-lazyload)

[jsonp跨域获取数据](https://github.com/webmodules/jsonp)

[flexible.js淘宝的移动端处理](https://github.com/amfe/article/issues/17)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
