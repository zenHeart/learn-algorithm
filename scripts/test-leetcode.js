#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取命令行参数
const args = process.argv.slice(2);
const testNumber = args[0];

if (!testNumber) {
   console.log('用法: pnpm test:leetcode <编号>');
   console.log('示例: pnpm test:leetcode 332');
   console.log('示例: pnpm test:leetcode 1');
   console.log('示例: pnpm test:leetcode 20');
   process.exit(1);
}

// 查找匹配的目录
const leetcodeDir = path.resolve(__dirname, '../docs/leetcode');
const directories = fs.readdirSync(leetcodeDir, { withFileTypes: true })
   .filter(dirent => dirent.isDirectory())
   .map(dirent => dirent.name)
   .filter(dir => {
      // 过滤掉非数字开头的目录
      const firstChar = dir.charAt(0);
      return firstChar >= '0' && firstChar <= '9';
   });

// 查找匹配编号的目录
const matchingDirs = directories.filter(dir => {
   // 支持多种匹配模式：
   // 1. 完全匹配: 332 -> 332.xxx
   // 2. 前缀匹配: 1 -> 1.two-sum, 10.roman-to-integer
   // 3. 部分匹配: 20 -> 20.valid-parentheses, 200.number-of-islands

   const dirNumber = dir.split('.')[0];
   return dirNumber === testNumber || dir.startsWith(testNumber + '.');
}).filter(dir => {
   // 只包含有测试文件的目录
   const testFile = path.join(leetcodeDir, dir, 'index.test.js');
   return fs.existsSync(testFile);
});

if (matchingDirs.length === 0) {
   console.log(`❌ 未找到编号为 "${testNumber}" 的 leetcode 题目`);
   console.log('\n可用的题目编号:');

   // 显示所有可用的编号
   const allNumbers = directories
      .map(dir => dir.split('.')[0])
      .filter((num, index, arr) => arr.indexOf(num) === index) // 去重
      .sort((a, b) => parseInt(a) - parseInt(b));

   allNumbers.forEach(num => {
      const count = directories.filter(dir => dir.startsWith(num + '.')).length;
      console.log(`  ${num} (${count} 题)`);
   });

   process.exit(1);
}

console.log(`🔍 找到 ${matchingDirs.length} 个匹配的题目:`);
matchingDirs.forEach(dir => {
   console.log(`  📁 ${dir}`);
});

// 构建测试命令
const testPatterns = matchingDirs.map(dir => `docs/leetcode/${dir}/*.test.js`);
const testCommand = `vitest ${testPatterns.join(' ')}`;

console.log(`\n🚀 运行测试命令: ${testCommand}\n`);

try {
   // 执行测试命令
   execSync(testCommand, {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..')
   });
} catch (error) {
   console.error('❌ 测试执行失败');
   process.exit(1);
}
