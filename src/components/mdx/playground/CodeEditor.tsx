import React, { useEffect, useRef } from 'react'
import { EditorView } from '@codemirror/view'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

export interface CodeEditorProps {
  value: string
  language?: 'javascript' | 'typescript'
  readOnly?: boolean
  onChange?: (next: string) => void
}

export function CodeEditor({
  value,
  language = 'javascript',
  readOnly,
  onChange,
}: CodeEditorProps) {
  const hostRef = useRef<HTMLDivElement | null>(null)
  const viewRef = useRef<EditorView | null>(null)

  useEffect(() => {
    if (!hostRef.current) return
    // 让编辑器高度撑满父容器
    const fullHeightTheme = EditorView.theme({
      '&': { height: '100%' },
      '.cm-scroller': { height: '100%' },
    })

    const extensions = [oneDark, fullHeightTheme]
    if (language === 'javascript' || language === 'typescript') {
      extensions.push(javascript({ typescript: language === 'typescript' }))
    }
    if (readOnly) {
      extensions.push(EditorView.editable.of(false))
    }

    const view = new EditorView({
      doc: value,
      extensions: [
        ...extensions,
        EditorView.updateListener.of(vu => {
          if (vu.docChanged && onChange) {
            onChange(vu.state.doc.toString())
          }
        }),
      ],
      parent: hostRef.current,
    })
    viewRef.current = view
    return () => {
      view.destroy()
      viewRef.current = null
    }
  }, [])

  useEffect(() => {
    const view = viewRef.current
    if (!view) return
    const current = view.state.doc.toString()
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      })
    }
  }, [value])

  return (
    <div
      ref={hostRef}
      className='h-full w-full rounded-none'
      style={{ height: '100%', minHeight: 380 }}
    />
  )
}

export default CodeEditor
