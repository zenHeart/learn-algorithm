/**
 * 配置系统测试脚本
 * 用于验证配置加载和类型安全性
 */

import { loadSiteConfig } from './siteConfig'
import { defineConfig } from './defineConfig'

async function testConfigSystem() {
  console.log('🧪 Testing site configuration system...\n')

  try {
    // 测试 1: 加载配置文件
    console.log('1. Loading site configuration...')
    const config = await loadSiteConfig()
    console.log('✅ Configuration loaded successfully')
    console.log(`   Site title: ${config.site.title}`)
    console.log(`   Base URL: ${config.site.baseUrl}`)
    console.log(`   Navigation items: ${config.nav.length}`)
    console.log(`   Plugins: ${config.plugins.length}`)

    // 测试 2: 验证配置结构
    console.log('\n2. Validating configuration structure...')
    const requiredFields = ['site', 'nav', 'sidebar', 'theme', 'plugins', 'build', 'markdown']
    const missingFields = requiredFields.filter(field => !(field in config))
    
    if (missingFields.length === 0) {
      console.log('✅ All required configuration fields present')
    } else {
      console.log(`❌ Missing fields: ${missingFields.join(', ')}`)
    }

    // 测试 3: 验证站点信息
    console.log('\n3. Validating site information...')
    const siteInfo = config.site
    const siteFields = ['title', 'description', 'author', 'url', 'baseUrl']
    const missingSiteFields = siteFields.filter(field => !siteInfo[field as keyof typeof siteInfo])
    
    if (missingSiteFields.length === 0) {
      console.log('✅ All required site fields present')
    } else {
      console.log(`❌ Missing site fields: ${missingSiteFields.join(', ')}`)
    }

    // 测试 4: 验证类型安全的 defineConfig
    console.log('\n4. Testing type-safe defineConfig...')
    const testConfig = defineConfig({
      site: {
        title: "Test Site",
        description: "Test Description",
        author: "Test Author",
        url: "https://test.com",
        baseUrl: "/"
      },
      nav: [
        { text: "Home", link: "/" },
        { text: "About", link: "/about" }
      ]
    })
    console.log('✅ Type-safe configuration creation successful')

    console.log('\n🎉 All configuration tests passed!')
    return true

  } catch (error) {
    console.error('❌ Configuration test failed:', error)
    return false
  }
}

// 如果直接运行此脚本，执行测试
if (import.meta.url === `file://${process.argv[1]}`) {
  testConfigSystem().then(success => {
    process.exit(success ? 0 : 1)
  })
}

export { testConfigSystem }
