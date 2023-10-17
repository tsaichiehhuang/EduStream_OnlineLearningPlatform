import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import Header from '@/components/header'

export default function File() {
    const docs = [
        {
            uri: 'https://health99.hpa.gov.tw/storage/pdf/materials/22104.pdf',
        },
        { uri: './範例.jpeg' }, // Local File
        { uri: './1111 設計理論與方法 Week 1 (1).pptx' },
        { uri: './東京五天.pdf' },
    ]

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
