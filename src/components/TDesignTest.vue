import { Button, Tag, Space } from 'tdesign-vue-next'

<template>
  <div class="test-container">
    <Button theme="primary">TDesign 按钮</Button>
    <Space>
      <Tag theme="primary">标签</Tag>
      <Tag theme="success">成功</Tag>
      <Tag theme="warning">警告</Tag>
    </Space>
  </div>
</template>

<script setup lang="ts">
// 组件逻辑
</script>

<style scoped>
.test-container {
  padding: 20px;
}
</style>
