// .sites 目录的环境声明文件

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test'
      [key: string]: string | undefined
    }
  }
  
  // 声明 process 对象
  const process: {
    env: NodeJS.ProcessEnv
    argv: string[]
    cwd(): string
    exit(code?: number): never
  }
}

// 为 import.meta 扩展类型
interface ImportMeta {
  url: string
}

export {}
