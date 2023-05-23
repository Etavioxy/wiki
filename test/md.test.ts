import md from '../src/scripts/md.ts'
import { describe, expect, it } from 'vitest';

describe('bounce', function () {
  it('should render', function () {
    var result = md.render('这是一个::bounce::跳动::bounce::的文字。');
    expect(result).toBe('<p>这是一个<div class="_anime_bounce">跳动</div>的文字。</p>\n');
  });
});
