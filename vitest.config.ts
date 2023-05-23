import { defineConfig } from 'vitest/config'

export default defineConfig({
  files: 'test/**/*.test.ts', // 测试文件的匹配模式
  env: {
    browser: true, // 使用浏览器环境
    node: false // 不使用node环境
  }
})
