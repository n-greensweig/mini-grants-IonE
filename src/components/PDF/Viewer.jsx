import { PDFViewer } from '@react-pdf/renderer';
import Document from './Document.jsx'


function Viewer () {
    return (
        <PDFViewer>
            <Document />
        </PDFViewer>
    )
}

export default Viewer;