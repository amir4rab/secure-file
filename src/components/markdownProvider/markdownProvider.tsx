import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism } from '@mantine/prism';
import { TypographyStylesProvider } from '@mantine/core';
type Language =
    | "markup"    | "bash"    | "clike"    | "c"    | "cpp"    | "css"    | "javascript"    | "jsx"    | "coffeescript"    | "actionscript"    | "css-extr"    | "diff"    | "git"    | "go"    | "graphql"    | "handlebars"    | "json"    | "less"    | "makefile"    | "markdown"    | "objectivec"    | "ocaml"    | "python"    | "reason"    | "sass"    | "scss"    | "sql"    | "stylus"    | "tsx" | "typescript" | "wasm" | "yaml";

type Props = {
  markdown: string
}

function MarkdownProvider({ markdown }:Props) {
  return (
    <TypographyStylesProvider>
      <ReactMarkdown
        components={{
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <Prism
                withLineNumbers
                language={ match[1] as Language }
              >{ children[0] as string }</Prism>
            ) : (
              <code className={className}>
                {children}
              </code>
            )
          }
        }}
      >
        { markdown }
      </ReactMarkdown>
    </TypographyStylesProvider>
  )
}

export default MarkdownProvider