import { useState, useEffect } from 'react'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import Header from '@/components/header'
import Cookies from 'js-cookie'

export default function File() {
    const [filePath, setFilePath] = useState<string | null>('')

    useEffect(() => {
        if (filePath === '') {
            setFilePath(Cookies.get('filePath'))
            console.log('filePath:', filePath)
        }
    }, [filePath])
    const docs = [{ uri: filePath }]

    return (
        <>
            <Header toggleTheme={() => {}} theme={null} />
            <div className="w-full flex justify-center items-center border border-black border-solid">
                <div className="w-[800px] border border-black border-solid">
                    <DocViewer
                        documents={docs}
                        pluginRenderers={DocViewerRenderers}
                        className="w-[500px] border border-black border-solid"
                    />
                </div>
            </div>
        </>
    )
}
