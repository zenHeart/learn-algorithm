// 简单的设置验证脚本（ES 模块）
import fs from 'fs'
import path from 'path'

console.log('🔍 验证项目设置...\n')

// 检查关键文件
const requiredFiles = [
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'src/App.tsx',
  'src/index.css',
  '.sites/config/defineConfig.ts',
  '.sites/types/config.ts'
]

let allFilesExist = true

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}`)
  } else {
    console.log(`❌ ${file} - 文件不存在`)
    allFilesExist = false
  }
})

console.log('\n📁 检查目录结构...')

const requiredDirs = [
  'src',
  'src/components',
  'src/hooks',
  '.sites',
  '.sites/config',
  '.sites/types',
  'public'
]

requiredDirs.forEach(dir => {
  if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    console.log(`✅ ${dir}/`)
  } else {
    console.log(`❌ ${dir}/ - 目录不存在`)
    allFilesExist = false
  }
})

console.log('\n🎯 验证结果:')
if (allFilesExist) {
  console.log('✅ 所有文件和目录都存在')
  console.log('🎉 项目设置验证通过!')
} else {
  console.log('❌ 部分文件或目录缺失')
}

console.log('\n📋 后续步骤:')
console.log('1. 运行 `npm install` 或 `pnpm install` 安装依赖')
console.log('2. 运行 `npm run dev` 启动开发服务器')  
console.log('3. 打开浏览器访问 http://localhost:3000')
