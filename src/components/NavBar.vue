<style scoped>
.app-name {
  margin-left: 8px;
  font-weight: bold;
}
.t-head-menu {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
<template>
  <t-head-menu>
    <!-- Logo 或品牌名称 -->
    <template #logo>
      <router-link to="/">
        <t-icon name="logo-github" />
        <!-- 替换为你的 Logo -->
        <span class="app-name">My App</span>
      </router-link>
    </template>

    <!-- 导航菜单项 -->
    <t-menu-item value="/home">
      <template #icon>
        <t-icon name="home" />
      </template>
      首页
    </t-menu-item>
    <t-menu-item value="/about">
      <template #icon>
        <t-icon name="user" />
      </template>
      关于我们
    </t-menu-item>
    <t-submenu value="more">
      <template #icon>
        <t-icon name="ellipsis" />
      </template>
      <template #title>更多</template>
      <t-menu-item value="/docs">文档</t-menu-item>
      <t-menu-item value="/contact">联系我们</t-menu-item>
    </t-submenu>

    <!-- 右侧附加内容（如用户头像） -->
    <template #operations>
      <t-button theme="default" variant="text">
        <t-icon name="user-circle" />
        登录
      </t-button>
    </template>
  </t-head-menu>
</template>
