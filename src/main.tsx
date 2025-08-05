import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { MDXProvider } from '@/components/mdx/MDXProvider'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { router } from './router'
import './index.css'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github.css'
import 'highlight.js/styles/github-dark.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <MDXProvider>
        <RouterProvider router={router} />
      </MDXProvider>
    </ErrorBoundary>
  </StrictMode>
)
