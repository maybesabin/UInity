"use client"

import { useEffect } from "react"
import Prism from "prismjs"
import "prismjs/components/prism-jsx"
type CodeBlockProps = {
    code: string
    language?: string
}

const CodeBlock = ({ code, language = "javascript" }: CodeBlockProps) => {
    useEffect(() => {
        Prism.highlightAll()
    }, [code])

    return (
        <pre className="rounded-md p-4 overflow-auto bg-[#1e1e1e] text-sm text-white">
            <code className={`language-${language}`}>{code}</code>
        </pre>
    )
}

export default CodeBlock
