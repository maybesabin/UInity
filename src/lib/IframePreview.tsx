"use client"

import DomPurify from "dompurify"
import { useEffect, useRef } from "react"

// Helper function to convert className to class for HTML rendering
const convertClassNameToClass = (htmlString: string) => {
    return htmlString.replace(/className=/g, 'class=')
}

const IframePreview = ({ code }: { code: string }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null)

    useEffect(() => {
        const iframe = iframeRef.current
        if (!iframe) return

        const htmlContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Preview</title>
                    <script src="https://cdn.tailwindcss.com"></script>
                    <style>
                        body { 
                            margin: 0; 
                            padding: 16px; 
                            font-family: system-ui, -apple-system, sans-serif;
                        }
                    </style>
                </head>
                <body>
                    ${DomPurify.sanitize(convertClassNameToClass(code))}
                </body>
                </html>
            `

        const blob = new Blob([htmlContent], { type: 'text/html' })
        const url = URL.createObjectURL(blob)
        iframe.src = url

        return () => {
            URL.revokeObjectURL(url)
        }
    }, [code])

    return (
        <iframe
            ref={iframeRef}
            className="w-full h-32 border-0 rounded"
            title="Code Preview"
            sandbox="allow-scripts"
        />
    )
}

export default IframePreview