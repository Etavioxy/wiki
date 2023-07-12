// render.test.ts
import { render } from './src/utils/renderMarkdown'
import { test, expect } from 'vitest'

// 定义一个测试用例
test('render a string', async () => {
  // 编译一个字符串
  const html = render('# Hello World')
  // 断言它的结果是否符合预期
  expect(html).toBe('<h1>Hello World</h1>')
})
