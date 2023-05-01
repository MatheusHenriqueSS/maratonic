import { useContext, useState } from 'react'

// Markdown Libraries
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// fonts
import { Roboto_Slab, Roboto_Mono } from '@next/font/google'
const slab = Roboto_Slab({
    variable: '--slab', subsets : ['latin']
})
const mono = Roboto_Mono({
    variable: '--mono', subsets : ['latin']
})


function MarkDown() {
    const [ content, setContent ] = useState("")

    return (
        <main className={` `}>
            {/* markdown editor pane */}
            <div
                className={` ${mono.variable} font-mono `}
            >
                

                {/* markdown edit text area */}
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>

            {/* markdown preview pane */}
            <div
                className={``}
            >
                

                {/* markdown preview text */}
                <div
                    className={` ${
                        slab.variable
                    } font-sans `}
                >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </main>
    )
}

export default MarkDown